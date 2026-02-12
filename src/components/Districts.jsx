import { useEffect, useState, useCallback } from "react";
import { fetchDistricts, fetchSchools, fetchSchool } from "../api";
import { useNavigate } from "react-router-dom";
import {
  FiMapPin,
  FiSearch,
  FiCompass,
  FiTarget,
  FiNavigation2,
  FiRefreshCw,
  FiArrowLeft,
  FiEye,
  FiPhone,
  FiBook,
  FiFilter,
  FiLoader,
  FiAlertCircle,
} from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function Districts() {
  const [districts, setDistricts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [findingLocation, setFindingLocation] = useState(false);
  const [nearbySchools, setNearbySchools] = useState([]);
  const [viewMode, setViewMode] = useState("districts");
  const [maxDistance, setMaxDistance] = useState(5);
  const [isSearching, setIsSearching] = useState(false);
  const [searchProgress, setSearchProgress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadDistricts();
  }, []);

  const loadDistricts = async () => {
    try {
      setLoading(true);
      const data = await fetchDistricts();
      setDistricts(data);
    } catch {
      toast.error("Failed to load districts");
    } finally {
      setLoading(false);
    }
  };

  // ---------- LOCATION ----------
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }
    setFindingLocation(true);
    toast.loading("Getting your location...", { id: "location" });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
        };
        setUserLocation(loc);
        toast.dismiss("location");
        toast.success("Location found! Now click 'Search Nearby'.");
        setFindingLocation(false);
      },
      (error) => {
        toast.dismiss("location");
        setFindingLocation(false);
        let msg = "Location error";
        if (error.code === 1) msg = "Location access denied";
        else if (error.code === 2) msg = "Location unavailable";
        else if (error.code === 3) msg = "Location request timeout";
        toast.error(msg);
      },
      { enableHighAccuracy: true, timeout: 15000 }
    );
  };

  // ---------- DISTANCE CALC ----------
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // ---------- MAIN SEARCH (ALL DISTRICTS) ----------
  const findNearbySchools = useCallback(async () => {
    if (!userLocation) {
      toast.error("Please get your location first");
      return;
    }
    if (!districts.length) return;

    setIsSearching(true);
    setSearchProgress("Fetching schools from all districts...");
    toast.loading("Searching nearby schools...", { id: "nearbySearch" });

    const allSchools = [];
    let districtsScanned = 0;

    // 🔥 SEARCH EVERY DISTRICT (but limit to first 30 schools per district for speed)
    for (const district of districts) {
      districtsScanned++;
      setSearchProgress(`Scanning district ${districtsScanned}/${districts.length}: ${district}`);
      try {
        const schools = await fetchSchools(district);
        // Take first 30 schools from each district to avoid overload
        const limited = schools.slice(0, 30).map((s) => ({ ...s, district }));
        allSchools.push(...limited);
      } catch (err) {
        console.warn(`Failed to fetch ${district}:`, err);
      }
    }

    if (allSchools.length === 0) {
      toast.dismiss("nearbySearch");
      toast.error("No schools found in any district");
      setIsSearching(false);
      setSearchProgress("");
      return;
    }

    setSearchProgress(`Calculating distances for ${allSchools.length} schools...`);

    // Process schools in batches of 15 to avoid overwhelming the API
    const BATCH_SIZE = 15;
    const withDistance = [];

    for (let i = 0; i < allSchools.length; i += BATCH_SIZE) {
      const batch = allSchools.slice(i, i + BATCH_SIZE);
      await Promise.all(
        batch.map(async (school) => {
          try {
            const details = await fetchSchool(school.udise_code);
            if (details.school?.latitude && details.school?.longitude) {
              const dist = calculateDistance(
                userLocation.lat,
                userLocation.lng,
                details.school.latitude,
                details.school.longitude
              );
              withDistance.push({
                ...school,
                distance: dist,
                latitude: details.school.latitude,
                longitude: details.school.longitude,
                location_url: details.school.location_url,
                pincode: details.school.pincode,
                mobile: details.school.mobile || school.mobile,
              });
            }
          } catch (err) {
            // skip individual school errors
          }
        })
      );
    }

    // 🔥 FILTER BY RADIUS
    const filtered = withDistance.filter((s) => s.distance <= maxDistance);
    const sorted = filtered.sort((a, b) => a.distance - b.distance).slice(0, 20);

    setNearbySchools(sorted);
    setViewMode("nearby");
    toast.dismiss("nearbySearch");
    setSearchProgress("");

    if (sorted.length) {
      toast.success(`Found ${sorted.length} schools within ${maxDistance}km`);
    } else {
      toast.error(`No schools within ${maxDistance}km. Try increasing the radius.`);
    }

    setIsSearching(false);
  }, [userLocation, districts, maxDistance]);

  // ---------- FORMATTING ----------
  const formatDistance = (d) =>
    d < 1 ? `${(d * 1000).toFixed(0)}m` : `${d.toFixed(2)}km`;

  const getDistanceColor = (d) => {
    if (d < 1) return "bg-green-100 text-green-800";
    if (d < 3) return "bg-yellow-100 text-yellow-800";
    if (d < 5) return "bg-orange-100 text-orange-800";
    return "bg-red-100 text-red-800";
  };

  const handleViewDetails = (district, udise) => {
    navigate(`/district/${district}`, { state: { viewSchool: udise } });
  };

  const openDirections = (lat, lng) => {
    if (!userLocation) {
      toast.error("Please get your location first");
      return;
    }
    const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${lat},${lng}&travelmode=driving`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const callSchool = (phone, name) => {
    if (phone && phone.length >= 10) {
      window.location.href = `tel:${phone}`;
    } else {
      toast.error(`No valid phone number for ${name}`);
    }
  };

  const filtered = districts.filter((d) =>
    d.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      {viewMode === "nearby" && (
        <button
          onClick={() => setViewMode("districts")}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 group"
        >
          <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition" />
          <span className="font-semibold">Back to Districts</span>
        </button>
      )}

      {viewMode === "districts" ? (
        <>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Select Your District
          </h1>

          {/* --- LOCATION & SEARCH CARD --- */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-blue-900 flex items-center">
                  <FiCompass className="mr-3" /> Find Schools Near You
                </h3>
                <p className="text-blue-800">
                  {userLocation
                    ? "Your location is ready – now search within the selected radius."
                    : "Get your location, then search for nearby schools."}
                </p>
              </div>

              {/* TWO BUTTONS: Get Location & Search */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={getUserLocation}
                  disabled={findingLocation}
                  className={`px-6 py-3 font-bold rounded-xl flex items-center justify-center ${
                    findingLocation
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : userLocation
                      ? "bg-green-100 text-green-700 border-2 border-green-300 hover:bg-green-200"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {findingLocation ? (
                    <>
                      <FiRefreshCw className="mr-3 animate-spin" /> Finding...
                    </>
                  ) : userLocation ? (
                    <>
                      <FiTarget className="mr-3" /> Set you location 
                    </>
                  ) : (
                    <>
                      <FiCompass className="mr-3" /> search you schools
                    </>
                  )}
                </button>

                {userLocation && (
                  <button
                    onClick={findNearbySchools}
                    disabled={isSearching}
                    className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 flex items-center justify-center"
                  >
                    {isSearching ? (
                      <>
                        <FiLoader className="mr-3 animate-spin" /> Searching...
                      </>
                    ) : (
                      <>
                        <FiSearch className="mr-3" /> Search Nearby
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Location details + radius slider */}
            {userLocation && (
              <div className="mt-4 pt-4 border-t border-blue-200">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <FiTarget className="inline text-green-600 mr-2" />
                    Your location: {userLocation.lat.toFixed(6)},{" "}
                    {userLocation.lng.toFixed(6)}
                    {userLocation.accuracy && (
                      <span className="ml-3 text-xs bg-blue-100 px-2 py-1 rounded">
                        ±{Math.round(userLocation.accuracy)}m
                      </span>
                    )}
                  </div>
                </div>

                {/* Radius slider */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <FiFilter className="mr-2" size={14} />
                      Search radius: {maxDistance} km
                    </label>
                    <button
                      onClick={() => setMaxDistance(5)}
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    >
                      Reset
                    </button>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={maxDistance}
                    onChange={(e) => setMaxDistance(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 km</span>
                    <span>5 km</span>
                    <span>10 km</span>
                    <span>15 km</span>
                    <span>20 km</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Search progress indicator */}
          {isSearching && searchProgress && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center">
              <FiLoader className="animate-spin text-blue-600 mr-3" />
              <span className="text-blue-800">{searchProgress}</span>
            </div>
          )}

          {/* District search input */}
          <div className="max-w-md mx-auto mb-8 relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search districts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <p className="text-gray-600 mb-6">
            Showing <span className="font-semibold">{filtered.length}</span> districts
          </p>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : filtered.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((district) => (
                <div
                  key={district}
                  onClick={() => navigate(`/district/${district}`)}
                  className="bg-white rounded-xl shadow-lg border-2 border-gray-200 hover:border-blue-400 hover:shadow-2xl transition-all cursor-pointer p-6"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-blue-100 rounded-xl mr-4">
                      <FiMapPin className="text-blue-600 text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{district}</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-6">
                    Click to view schools
                  </p>
                  <div className="pt-4 border-t border-gray-100">
                    <span className="text-blue-600 font-medium">
                      View Schools →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600 mb-4">No districts found</p>
              <button
                onClick={() => setSearch("")}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg"
              >
                Clear Search
              </button>
            </div>
          )}
        </>
      ) : (
        /* ---------- NEARBY RESULTS VIEW ---------- */
        <div>
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 mb-6 text-white">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl md:text-3xl font-bold flex items-center">
                <FiTarget className="mr-3" /> Schools Near You
              </h1>
              <span className="bg-white/20 px-4 py-2 rounded-lg text-sm">
                Within {maxDistance}km
              </span>
            </div>
            {nearbySchools.length === 0 && (
              <div className="mt-3 flex items-start bg-white/10 p-4 rounded-lg">
                <FiAlertCircle className="mr-2 flex-shrink-0 mt-0.5" />
                <p>
                  No schools found within {maxDistance}km. 
                  {userLocation && (
                    <> Try <button 
                        onClick={() => { setMaxDistance(10); findNearbySchools(); }}
                        className="underline font-semibold"
                      >increasing the radius</button>.</>
                  )}
                </p>
              </div>
            )}
          </div>

          {nearbySchools.length ? (
            <>
              <div className="mb-4 text-sm text-gray-600">
                Showing {nearbySchools.length} closest schools within {maxDistance}km
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nearbySchools.map((school, idx) => (
                  <div
                    key={school.udise_code}
                    className="bg-white rounded-xl shadow-lg border-2 border-gray-200 hover:shadow-xl transition-all duration-300 p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">
                          {school.school_name}
                          {idx === 0 && (
                            <span className="ml-2 inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded">
                              Closest
                            </span>
                          )}
                        </h3>
                        <div className="flex items-center text-gray-600 mb-2 text-sm">
                          <FiBook className="mr-2" />
                          <span>{school.district || "Unknown District"}</span>
                        </div>
                      </div>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full font-bold text-sm ${getDistanceColor(
                          school.distance
                        )}`}
                      >
                        {formatDistance(school.distance)}
                      </span>
                    </div>

                    <div className="mb-4 space-y-2">
                      <div className="flex items-center text-gray-600 text-sm">
                        <FiPhone className="mr-2" />
                        <span className="break-all">
                          {school.mobile || "Contact N/A"}
                        </span>
                      </div>
                      {school.pincode && (
                        <div className="text-sm text-gray-500">
                          PIN: {school.pincode}
                        </div>
                      )}
                      <div className="text-xs text-gray-500">
                        UDISE: {school.udise_code}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() =>
                            handleViewDetails(school.district, school.udise_code)
                          }
                          className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          <FiEye className="mr-2" size={16} />
                          View Details
                        </button>

                        <div className="flex gap-2">
                          {school.latitude && school.longitude && (
                            <button
                              onClick={() =>
                                openDirections(school.latitude, school.longitude)
                              }
                              className="inline-flex items-center justify-center px-3 py-2 bg-green-100 text-green-700 font-medium rounded-lg hover:bg-green-200 transition-colors text-sm"
                              title="Get directions from your location"
                            >
                              <FiNavigation2 className="mr-1" size={16} />
                              Directions
                            </button>
                          )}
                          {school.mobile && school.mobile.length >= 10 && (
                            <button
                              onClick={() =>
                                callSchool(school.mobile, school.school_name)
                              }
                              className="inline-flex items-center justify-center px-3 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors text-sm"
                              title="Call school"
                            >
                              <FiPhone className="mr-1" size={16} />
                              Call
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <button
                onClick={() => setViewMode("districts")}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                ← Browse by District
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}