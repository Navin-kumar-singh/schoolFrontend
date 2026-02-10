// src/components/HomePage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllSchools, fetchSchool } from "../api";
import {
  FiCompass,
  FiTarget,
  FiNavigation,
  FiNavigation2,
  FiRefreshCw,
  FiAlertCircle,
  FiWifiOff,
  FiMapPin,
  FiPhone,
  FiMap,
  FiEye,
  FiUsers,
  FiSearch,
  FiFilter,
  FiArrowRight,
  FiGlobe,
  FiRadio
} from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function HomePage() {
  const [userLocation, setUserLocation] = useState(null);
  const [findingLocation, setFindingLocation] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [nearbySchools, setNearbySchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSchools, setLoadingSchools] = useState(false);
  const [search, setSearch] = useState("");
  const [filterByDistance, setFilterByDistance] = useState(false);
  const [maxDistance, setMaxDistance] = useState(10);
  const [allSchools, setAllSchools] = useState([]);
  const [enrichedSchools, setEnrichedSchools] = useState([]);
  const [viewMode, setViewMode] = useState('location'); // 'location' or 'search'
  const navigate = useNavigate();

  // Load all schools on component mount
  useEffect(() => {
    loadAllSchools();
  }, []);

  const loadAllSchools = async () => {
    try {
      setLoading(true);
      const schools = await fetchAllSchools();
      setAllSchools(schools);
      toast.success(`${schools.length} schools loaded`);
    } catch (err) {
      toast.error("Failed to load schools");
    } finally {
      setLoading(false);
    }
  };

  // Enrich schools with coordinates
  const enrichSchoolsWithCoordinates = async (schools) => {
    setLoadingSchools(true);
    try {
      const enriched = await Promise.all(
        schools.slice(0, 50).map(async (school) => { // Limit to 50 for performance
          try {
            const schoolDetails = await fetchSchool(school.udise_code);
            return {
              ...school,
              latitude: schoolDetails.school?.latitude,
              longitude: schoolDetails.school?.longitude,
              location_url: schoolDetails.school?.location_url,
              pincode: schoolDetails.school?.pincode,
              district: schoolDetails.school?.district,
              distance: userLocation ? calculateDistance(
                userLocation.lat,
                userLocation.lng,
                schoolDetails.school?.latitude,
                schoolDetails.school?.longitude
              ) : null
            };
          } catch (error) {
            return {
              ...school,
              latitude: null,
              longitude: null,
              location_url: null,
              distance: null
            };
          }
        })
      );
      
      setEnrichedSchools(enriched);
    } catch (error) {
      console.error("Error enriching schools:", error);
    } finally {
      setLoadingSchools(false);
    }
  };

  // Get user's current location
  const getUserLocation = async () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      setLocationError("browser_not_supported");
      return;
    }

    setFindingLocation(true);
    setLocationError(null);
    toast.loading("Getting your location... Please wait");

    const locationOptions = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const userLoc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        };
        
        setUserLocation(userLoc);
        toast.dismiss();
        toast.success("Location found! Finding nearby schools...");
        setFindingLocation(false);
        
        // Enrich schools with coordinates and distances
        await enrichSchoolsWithCoordinates(allSchools);
        
        // Find nearby schools
        findSchoolsNearUser(userLoc);
      },
      (error) => {
        toast.dismiss();
        setFindingLocation(false);
        
        let errorMessage = "";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please enable location services.";
            setLocationError("permission_denied");
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is currently unavailable.";
            setLocationError("position_unavailable");
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            setLocationError("timeout");
            break;
          default:
            errorMessage = "An unknown error occurred.";
            setLocationError("unknown");
            break;
        }
        
        toast.error(errorMessage);
      },
      locationOptions
    );
  };

  // Retry location with different settings
  const retryLocationWithLowAccuracy = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }

    setFindingLocation(true);
    setLocationError(null);
    toast.loading("Retrying with low accuracy mode...");

    const lowAccuracyOptions = {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 60000
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLoc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        };
        
        setUserLocation(userLoc);
        toast.dismiss();
        toast.success("Location found with low accuracy!");
        setFindingLocation(false);
        
        findSchoolsNearUser(userLoc);
      },
      (error) => {
        toast.dismiss();
        setFindingLocation(false);
        toast.error("Still unable to get location.");
      },
      lowAccuracyOptions
    );
  };

  // Calculate distance between two coordinates in kilometers
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (!lat1 || !lon1 || !lat2 || !lon2) return null;
    
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Find schools near user's location
  const findSchoolsNearUser = (userLoc) => {
    const schoolsWithDistance = enrichedSchools
      .filter(school => school.latitude && school.longitude)
      .map(school => ({
        ...school,
        distance: calculateDistance(userLoc.lat, userLoc.lng, school.latitude, school.longitude)
      }))
      .filter(school => school.distance !== null)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 10); // Get top 10 nearest schools

    setNearbySchools(schoolsWithDistance);
    setViewMode('location');
    
    toast.success(`Found ${schoolsWithDistance.length} schools near you`);
  };

  // Get distance color based on km
  const getDistanceColor = (distance) => {
    if (!distance) return "bg-gray-100 text-gray-800";
    if (distance < 1) return "bg-green-100 text-green-800";
    if (distance < 3) return "bg-yellow-100 text-yellow-800";
    if (distance < 5) return "bg-orange-100 text-orange-800";
    return "bg-red-100 text-red-800";
  };

  // Format distance display
  const formatDistance = (distance) => {
    if (!distance) return "N/A";
    if (distance < 1) return `${(distance * 1000).toFixed(0)} m`;
    return `${distance.toFixed(2)} km`;
  };

  // Open directions from user to school
  const openDirections = (schoolLat, schoolLng, schoolName) => {
    if (!userLocation) {
      toast.error("Please get your location first");
      return;
    }

    if (!schoolLat || !schoolLng) {
      toast.error("School location not available");
      return;
    }

    const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${schoolLat},${schoolLng}&travelmode=driving`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Open school map
  const openSchoolMap = (locationUrl, schoolName) => {
    if (locationUrl) {
      window.open(locationUrl, '_blank', 'noopener,noreferrer');
    } else {
      toast.error(`No map available for ${schoolName}`);
    }
  };

  // Call a school
  const callSchool = (phoneNumber, schoolName) => {
    if (phoneNumber && phoneNumber.length >= 10) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      toast.error(`No valid phone number for ${schoolName}`);
    }
  };

  // Filter schools for search view
  const filteredSchools = allSchools.filter(school => 
    school.school_name.toLowerCase().includes(search.toLowerCase()) ||
    school.udise_code.toLowerCase().includes(search.toLowerCase()) ||
    school.district?.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 20); // Limit to 20 results for performance

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find Schools Near Your Location
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Get your current location to discover schools nearby with distances, contact details, and directions.
          </p>
        </div>

        {/* Main Action Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl sm:rounded-3xl border-2 border-blue-200 p-6 sm:p-8 md:p-10 mb-8 sm:mb-12 shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-3 flex items-center">
                <FiCompass className="mr-3 text-blue-600" size={28} />
                Discover Nearby Schools
              </h2>
              <p className="text-blue-800 text-lg">
                Click the button below to find schools within your vicinity. We'll show you the closest schools with distances and directions.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={getUserLocation}
                disabled={findingLocation}
                className={`inline-flex items-center justify-center px-6 sm:px-8 py-4 font-bold rounded-xl sm:rounded-2xl transition-colors text-lg shadow-lg ${
                  findingLocation
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : userLocation
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : locationError
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {findingLocation ? (
                  <>
                    <FiRadio className="mr-3 animate-spin" size={24} />
                    Finding Location...
                  </>
                ) : userLocation ? (
                  <>
                    <FiTarget className="mr-3" size={24} />
                    Find More Schools
                  </>
                ) : locationError ? (
                  <>
                    <FiAlertCircle className="mr-3" size={24} />
                    Try Again
                  </>
                ) : (
                  <>
                    <FiCompass className="mr-3" size={24} />
                    Get My Location
                  </>
                )}
              </button>

              {locationError === "timeout" && (
                <button
                  onClick={retryLocationWithLowAccuracy}
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-4 bg-orange-500 text-white font-bold rounded-xl sm:rounded-2xl hover:bg-orange-600 transition-colors shadow-lg text-lg"
                >
                  <FiWifiOff className="mr-3" size={24} />
                  Low Accuracy Mode
                </button>
              )}
            </div>
          </div>

          {/* Location Info */}
          {userLocation && (
            <div className="mt-6 pt-6 border-t border-blue-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <FiTarget className="text-green-600 mr-3" size={20} />
                    <span className="font-semibold text-green-800 text-lg">
                      Your Current Location
                    </span>
                    {userLocation.accuracy && (
                      <span className="ml-3 text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                        Accuracy: ±{Math.round(userLocation.accuracy)}m
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <p className="font-mono text-sm text-gray-600 bg-white p-2 rounded-lg">
                      {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}
                    </p>
                    <a
                      href={`https://www.google.com/maps?q=${userLocation.lat},${userLocation.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center"
                    >
                      <FiMap className="mr-1" />
                      View on Map
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setViewMode(viewMode === 'location' ? 'search' : 'location')}
                    className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    {viewMode === 'location' ? 'Search Schools' : 'Show Nearby Schools'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* View Toggle */}
        <div className="mb-6">
          <div className="flex bg-gray-100 p-1 rounded-xl w-fit mx-auto">
            <button
              onClick={() => setViewMode('location')}
              className={`px-6 py-3 rounded-lg font-medium text-lg transition-colors flex items-center ${
                viewMode === 'location' 
                  ? 'bg-white text-blue-600 shadow-md' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiTarget className="mr-2" />
              Nearby Schools
            </button>
            <button
              onClick={() => setViewMode('search')}
              className={`px-6 py-3 rounded-lg font-medium text-lg transition-colors flex items-center ${
                viewMode === 'search' 
                  ? 'bg-white text-blue-600 shadow-md' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FiSearch className="mr-2" />
              Search All Schools
            </button>
          </div>
        </div>

        {/* SEARCH VIEW */}
        {viewMode === 'search' && (
          <div className="mb-8">
            {/* Search Bar */}
            <div className="relative mb-6">
              <FiSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search schools by name, UDISE code, or district..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-16 pr-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 shadow-sm"
              />
            </div>

            {/* Search Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSchools.map((school) => (
                <div
                  key={school.udise_code}
                  onClick={() => navigate(`/school/${school.udise_code}`)}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {school.school_name}
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <FiMapPin className="mr-2" />
                        <span className="text-sm">{school.district || 'Unknown District'}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600">
                        <FiPhone className="mr-2" />
                        <span className="text-sm">{school.mobile || 'Contact not available'}</span>
                      </div>
                      
                      <div className="pt-3 border-t border-gray-100">
                        <span className="inline-flex items-center text-blue-600 font-medium">
                          View Details <FiArrowRight className="ml-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {search && filteredSchools.length === 0 && (
              <div className="text-center py-12">
                <FiSearch className="text-gray-400 text-4xl mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No schools found matching "{search}"</p>
              </div>
            )}
          </div>
        )}

        {/* NEARBY SCHOOLS VIEW */}
        {viewMode === 'location' && userLocation && nearbySchools.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center mb-4 sm:mb-0">
                <FiTarget className="mr-3 text-green-600" />
                Schools Near Your Location
              </h2>
              <div className="flex items-center gap-4">
                <span className="px-4 py-2 bg-green-100 text-green-800 font-bold rounded-full text-lg">
                  {nearbySchools.length} schools found
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="filterDistance"
                    checked={filterByDistance}
                    onChange={(e) => setFilterByDistance(e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded"
                  />
                  <label htmlFor="filterDistance" className="text-gray-700 font-medium">
                    Filter by distance
                  </label>
                </div>
              </div>
            </div>

            {/* Distance Filter */}
            {filterByDistance && (
              <div className="bg-white rounded-xl p-6 mb-6 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-lg font-medium text-gray-700 flex items-center">
                    <FiFilter className="mr-3" />
                    Maximum distance: {maxDistance} km
                  </label>
                  <button
                    onClick={() => setMaxDistance(10)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Reset
                  </button>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>1 km</span>
                  <span>10 km</span>
                  <span>25 km</span>
                  <span>50 km</span>
                </div>
              </div>
            )}

            {/* Schools Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {nearbySchools
                .filter(school => !filterByDistance || (school.distance && school.distance <= maxDistance))
                .map((school, index) => (
                <div
                  key={school.udise_code}
                  className="bg-white rounded-xl shadow-lg border-2 border-gray-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-300"
                >
                  <div className="p-6">
                    {/* Header with school name and distance */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
                      <div className="flex-1 mb-4 sm:mb-0">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                          {school.school_name}
                          {index === 0 && (
                            <span className="ml-3 inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-bold rounded-full">
                              Closest
                            </span>
                          )}
                        </h3>
                        <div className="flex items-center text-gray-600">
                          <FiMapPin className="mr-2" />
                          <span className="text-sm">{school.district || 'Unknown District'}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-bold mb-2 ${getDistanceColor(school.distance)}`}>
                          <FiNavigation className="mr-2" />
                          {formatDistance(school.distance)}
                        </span>
                        <span className="text-sm text-gray-500">from your location</span>
                      </div>
                    </div>

                    {/* School Details */}
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FiPhone className="text-gray-400 mr-2" />
                          <span className="font-medium">{school.mobile || 'Contact not available'}</span>
                        </div>
                        {school.mobile && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              callSchool(school.mobile, school.school_name);
                            }}
                            className="px-4 py-2 bg-green-100 text-green-700 font-medium rounded-lg hover:bg-green-200 transition-colors"
                          >
                            Call
                          </button>
                        )}
                      </div>

                      {school.pincode && (
                        <div className="flex items-center text-gray-600">
                          <FiMapPin className="mr-2" />
                          <span>PIN: {school.pincode}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-100">
                      <button
                        onClick={() => navigate(`/school/${school.udise_code}`)}
                        className="flex-1 flex items-center justify-center px-4 py-3 bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <FiEye className="mr-2" />
                        View Details
                      </button>
                      
                      <div className="flex gap-3">
                        <button
                          onClick={() => openDirections(school.latitude, school.longitude, school.school_name)}
                          className="flex-1 flex items-center justify-center px-4 py-3 bg-green-50 text-green-700 font-medium rounded-lg hover:bg-green-100 transition-colors"
                        >
                          <FiNavigation2 className="mr-2" />
                          Directions
                        </button>
                        
                        <button
                          onClick={() => openSchoolMap(school.location_url, school.school_name)}
                          className="flex-1 flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          <FiMap className="mr-2" />
                          Map
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State for filtered results */}
            {filterByDistance && nearbySchools.filter(school => school.distance && school.distance <= maxDistance).length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <FiFilter className="text-gray-400 text-4xl mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No schools found within {maxDistance} km</p>
                <button
                  onClick={() => setFilterByDistance(false)}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Remove Filter
                </button>
              </div>
            )}

            {/* Legend */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Distance Legend</h4>
              <div className="flex flex-col sm:flex-row flex-wrap gap-6 text-gray-600">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                  <span>Less than 1 km</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full mr-3"></div>
                  <span>1 - 3 km</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-orange-500 rounded-full mr-3"></div>
                  <span>3 - 5 km</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                  <span>More than 5 km</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Location State */}
        {viewMode === 'location' && !userLocation && (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <FiCompass className="text-gray-400 text-5xl mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Started with Your Location</h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
              Click the "Get My Location" button above to find schools near your current position. 
              We'll show you the closest schools with distances and directions.
            </p>
            <button
              onClick={getUserLocation}
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors text-lg shadow-lg"
            >
              <FiCompass className="inline mr-2" />
              Get My Location
            </button>
          </div>
        )}

        {/* Browse Districts Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Browse Schools by District</h2>
              <p className="text-gray-600">Explore schools organized by district for easier navigation</p>
            </div>
            <a
              href="/districts"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors mt-4 sm:mt-0"
            >
              <FiGlobe className="mr-2" />
              View All Districts
            </a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {['Delhi', 'Mumbai', 'Bangalore', 'Chennai'].map((district) => (
              <div
                key={district}
                onClick={() => navigate(`/district/${district}`)}
                className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg mr-4">
                    <FiMapPin className="text-blue-600 text-xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{district}</h3>
                </div>
                <p className="text-gray-500 text-sm mb-4">Browse schools in {district} district</p>
                <span className="inline-flex items-center text-blue-600 font-medium">
                  View Schools <FiArrowRight className="ml-1" />
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* How to Use Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">How to Use</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                <FiCompass className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">1. Get Your Location</h3>
              <p className="text-gray-600">Click the "Get My Location" button to allow location access</p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
                <FiTarget className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2. Find Nearby Schools</h3>
              <p className="text-gray-600">View the nearest schools with distances from your location</p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-full mb-4">
                <FiNavigation className="text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">3. Get Directions</h3>
              <p className="text-gray-600">Click "Directions" to open Google Maps with navigation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}