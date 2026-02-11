// // src/components/Schools.jsx
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { fetchSchools, fetchSchool } from "../api";
// import {
//   FiArrowLeft, FiPhone, FiSearch, FiMapPin, FiBook, FiNavigation, FiNavigation2,
//   FiCompass, FiTarget, FiRefreshCw, FiAlertCircle, FiMap, FiEye, FiLoader,
//   FiStar, FiHome, FiUsers, FiFilter
// } from "react-icons/fi";
// import { toast } from "react-hot-toast";

// export default function Schools() {
//   const { name } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
  
//   // ---------- List data ----------
//   const [schools, setSchools] = useState([]);
//   const [filteredSchools, setFilteredSchools] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);

//   // ---------- Enriched schools with coordinates & distance ----------
//   const [enrichedSchools, setEnrichedSchools] = useState([]);
//   const [loadingDistances, setLoadingDistances] = useState(false);

//   // ---------- Detail view state ----------
//   const [selectedUdise, setSelectedUdise] = useState(null);
//   const [selectedSchool, setSelectedSchool] = useState(null);
//   const [loadingDetails, setLoadingDetails] = useState(false);

//   // ---------- User location (shared) ----------
//   const [userLocation, setUserLocation] = useState(null);
//   const [findingLocation, setFindingLocation] = useState(false);
//   const [locationError, setLocationError] = useState(null);

//   // ---------- Nearby from user (detail view only) ----------
//   const [nearbyFromUser, setNearbyFromUser] = useState([]);

//   // ---------- Distance filter & sort (list view) ----------
//   const [filterByDistance, setFilterByDistance] = useState(false);
//   const [sortByDistance, setSortByDistance] = useState(false);
//   const [maxDistance, setMaxDistance] = useState(10);

//   // ---------- Check for school to open from Districts ----------
//   useEffect(() => {
//     if (location.state?.viewSchool) {
//       handleViewDetails(location.state.viewSchool);
//       window.history.replaceState({}, document.title);
//     }
//   }, [location.state]);

//   // ---------- Load schools for this district ----------
//   useEffect(() => {
//     if (name) {
//       loadSchools();
//     }
//   }, [name]);

//   const loadSchools = async () => {
//     try {
//       setLoading(true);
//       const data = await fetchSchools(name);
//       setSchools(data);
//       setFilteredSchools(data);
//       toast.success(`${data.length} schools found`);
      
//       // If we already have user location, enrich immediately
//       if (userLocation) {
//         await enrichSchoolsWithDistances(data, userLocation);
//       }
//     } catch {
//       toast.error("Failed to load schools");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------- Enrich schools with coordinates & distances ----------
//   const enrichSchoolsWithDistances = async (schoolsList, userLoc) => {
//     setLoadingDistances(true);
//     try {
//       const enriched = await Promise.all(
//         schoolsList.map(async (school) => {
//           try {
//             const details = await fetchSchool(school.udise_code);
//             if (details.school?.latitude && details.school?.longitude) {
//               const distance = calculateDistance(
//                 userLoc.lat, userLoc.lng,
//                 details.school.latitude, details.school.longitude
//               );
//               return {
//                 ...school,
//                 latitude: details.school.latitude,
//                 longitude: details.school.longitude,
//                 location_url: details.school.location_url,
//                 pincode: details.school.pincode,
//                 mobile: details.school.mobile || school.mobile,
//                 distance
//               };
//             }
//           } catch {
//             // fallback – no coordinates
//           }
//           return {
//             ...school,
//             latitude: null,
//             longitude: null,
//             distance: null
//           };
//         })
//       );
//       setEnrichedSchools(enriched);
//     } catch (error) {
//       console.error("Error enriching schools:", error);
//       toast.error("Could not calculate distances for all schools");
//     } finally {
//       setLoadingDistances(false);
//     }
//   };

//   // ---------- Calculate distance (Haversine) ----------
//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     if (!lat1 || !lon1 || !lat2 || !lon2) return null;
//     const R = 6371;
//     const dLat = (lat2 - lat1) * Math.PI / 180;
//     const dLon = (lon2 - lon1) * Math.PI / 180;
//     const a =
//       Math.sin(dLat / 2) ** 2 +
//       Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
//       Math.sin(dLon / 2) ** 2;
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c;
//   };

//   // ---------- Get user location (list view) ----------
//   const getUserLocation = async () => {
//     if (!navigator.geolocation) {
//       toast.error("Geolocation not supported");
//       setLocationError("browser_not_supported");
//       return;
//     }

//     setFindingLocation(true);
//     setLocationError(null);
//     toast.loading("Getting your location...");

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const loc = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//           accuracy: position.coords.accuracy
//         };
//         setUserLocation(loc);
//         toast.dismiss();
//         toast.success("Location found! Calculating distances...");
//         setFindingLocation(false);
        
//         // Enrich all schools with distances
//         await enrichSchoolsWithDistances(schools, loc);
//       },
//       (error) => {
//         toast.dismiss();
//         setFindingLocation(false);
//         let msg = "Location error";
//         if (error.code === 1) { msg = "Permission denied"; setLocationError("permission_denied"); }
//         else if (error.code === 2) { msg = "Location unavailable"; setLocationError("position_unavailable"); }
//         else if (error.code === 3) { msg = "Timeout"; setLocationError("timeout"); }
//         toast.error(msg);
//       },
//       { enableHighAccuracy: true, timeout: 15000 }
//     );
//   };

//   // ---------- Format distance ----------
//   const formatDistance = (d) => {
//     if (!d) return "N/A";
//     return d < 1 ? `${(d * 1000).toFixed(0)}m` : `${d.toFixed(2)}km`;
//   };
//   const getDistanceColor = (d) => {
//     if (!d) return "bg-gray-100 text-gray-800";
//     if (d < 1) return "bg-green-100 text-green-800";
//     if (d < 3) return "bg-yellow-100 text-yellow-800";
//     if (d < 5) return "bg-orange-100 text-orange-800";
//     return "bg-red-100 text-red-800";
//   };

//   // ---------- List view filter & sort (with distances) ----------
//   useEffect(() => {
//     // Use enriched schools if available and userLocation exists
//     const source = (enrichedSchools.length && userLocation) ? enrichedSchools : schools;
    
//     let result = [...source];

//     // Apply search
//     if (search) {
//       result = result.filter(s =>
//         s.school_name.toLowerCase().includes(search.toLowerCase()) ||
//         s.udise_code.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     // Apply distance filter (only if userLocation exists and we have distances)
//     if (filterByDistance && userLocation && enrichedSchools.length) {
//       result = result.filter(s => s.distance !== null && s.distance <= maxDistance);
//     }

//     // Apply sorting
//     if (sortByDistance && userLocation && enrichedSchools.length) {
//       result.sort((a, b) => {
//         if (!a.distance) return 1;
//         if (!b.distance) return -1;
//         return a.distance - b.distance;
//       });
//     } else {
//       // Default sort by name
//       result.sort((a, b) => a.school_name.localeCompare(b.school_name));
//     }

//     setFilteredSchools(result);
//   }, [schools, enrichedSchools, userLocation, search, filterByDistance, sortByDistance, maxDistance]);

//   // ---------- Detail view functions (unchanged) ----------
//   const handleViewDetails = async (udise) => {
//     setSelectedUdise(udise);
//     setLoadingDetails(true);
//     try {
//       const data = await fetchSchool(udise);
//       setSelectedSchool(data);
//     } catch {
//       toast.error("Failed to load school details");
//       setSelectedUdise(null);
//     } finally {
//       setLoadingDetails(false);
//     }
//   };

//   const closeDetails = () => {
//     setSelectedUdise(null);
//     setSelectedSchool(null);
//     setNearbyFromUser([]);
//   };

//   // ---------- Detail view location & nearby (unchanged) ----------
//   const getUserLocationForDetail = () => {
//     if (!navigator.geolocation) {
//       toast.error("Geolocation not supported");
//       setLocationError("browser_not_supported");
//       return;
//     }
//     setFindingLocation(true);
//     setLocationError(null);
//     toast.loading("Getting your location...");

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const loc = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//           accuracy: position.coords.accuracy
//         };
//         setUserLocation(loc);
//         toast.dismiss();
//         toast.success("Location found!");
//         setFindingLocation(false);
//         if (selectedSchool) findNearbyFromUser(loc);
//       },
//       (error) => {
//         toast.dismiss();
//         setFindingLocation(false);
//         let msg = "Location error";
//         if (error.code === 1) { msg = "Permission denied"; setLocationError("permission_denied"); }
//         else if (error.code === 2) { msg = "Location unavailable"; setLocationError("position_unavailable"); }
//         else if (error.code === 3) { msg = "Timeout"; setLocationError("timeout"); }
//         toast.error(msg);
//       },
//       { enableHighAccuracy: true, timeout: 15000 }
//     );
//   };

//   const findNearbyFromUser = (userLoc) => {
//     if (!selectedSchool?.nearby) return;
//     const all = [
//       { ...selectedSchool.school, distance: calculateDistance(userLoc.lat, userLoc.lng, selectedSchool.school.latitude, selectedSchool.school.longitude) },
//       ...selectedSchool.nearby.map(s => ({
//         ...s,
//         distance: calculateDistance(userLoc.lat, userLoc.lng, s.latitude, s.longitude)
//       }))
//     ].filter(s => s.distance !== null).sort((a, b) => a.distance - b.distance).slice(0, 5);
//     setNearbyFromUser(all);
//   };

//   const openDirections = (lat, lng, name, e) => {
//     e?.stopPropagation();
//     if (!userLocation) { toast.error("Get your location first"); return; }
//     window.open(`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${lat},${lng}&travelmode=driving`);
//   };

//   const openMap = (url, name, e) => {
//     e?.stopPropagation();
//     if (url) window.open(url);
//     else toast.error(`No map for ${name}`);
//   };

//   const callSchool = (phone, name, e) => {
//     e?.stopPropagation();
//     if (phone?.length >= 10) window.location.href = `tel:${phone}`;
//     else toast.error(`No valid number for ${name}`);
//   };

//   // ---------- Render ----------
//   if (loading) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <div className="animate-pulse space-y-4">
//           <div className="h-8 w-32 bg-gray-200 rounded"></div>
//           <div className="h-40 bg-gray-200 rounded-2xl"></div>
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {[...Array(6)].map((_, i) => <div key={i} className="h-40 bg-gray-200 rounded-xl"></div>)}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ---- DETAIL VIEW (unchanged) ----
//   if (selectedUdise && selectedSchool) {
//     const { school, nearby } = selectedSchool;
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
//         <button
//           onClick={closeDetails}
//           className="flex items-center text-blue-600 hover:text-blue-800 mb-6 group"
//         >
//           <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition" />
//           <span className="font-semibold">Back to {decodeURIComponent(name)} Schools</span>
//         </button>

//         {/* School Header */}
//         <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-8 text-white shadow-xl">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
//             <div>
//               <div className="flex items-center mb-3">
//                 <FiStar className="mr-2 text-yellow-300" /> SCHOOL DETAILS
//               </div>
//               <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 break-words">{school.school_name}</h1>
//               <div className="flex flex-wrap gap-2">
//                 <span className="bg-white/20 px-3 py-1 rounded-full text-sm"><FiHome className="inline mr-1" /> {school.district}</span>
//                 <span className="bg-white/20 px-3 py-1 rounded-full text-sm">UDISE: {school.udise_code}</span>
//                 <span className="bg-white/20 px-3 py-1 rounded-full text-sm">PIN: {school.pincode}</span>
//               </div>
//             </div>
//             <div className="flex flex-col gap-2 mt-4 md:mt-0 w-full md:w-auto">
//               <a
//                 href={school.location_url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100"
//               >
//                 <FiNavigation className="mr-2" /> Open in Maps
//               </a>
//               <button
//                 onClick={getUserLocationForDetail}
//                 disabled={findingLocation}
//                 className={`inline-flex items-center justify-center px-6 py-3 font-bold rounded-xl ${
//                   findingLocation ? 'bg-gray-400 text-white cursor-not-allowed' :
//                   userLocation ? 'bg-green-500 text-white hover:bg-green-600' :
//                   locationError ? 'bg-red-500 text-white hover:bg-red-600' :
//                   'bg-orange-500 text-white hover:bg-orange-600'
//                 }`}
//               >
//                 {findingLocation ? <><FiRefreshCw className="mr-2 animate-spin" /> Finding...</> :
//                  userLocation ? <><FiTarget className="mr-2" /> Location Found</> :
//                  <><FiCompass className="mr-2" /> Get My Location</>}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Location error help */}
//         {locationError && !userLocation && (
//           <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-8">
//             <p className="text-red-800 font-medium">⚠️ Location access issue. Please enable location and try again.</p>
//           </div>
//         )}

//         {/* Main content grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left column - School info & Nearby */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Nearby from user (if location) */}
//             {userLocation && nearbyFromUser.length > 0 && (
//               <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
//                 <h2 className="text-xl font-bold text-green-900 flex items-center mb-4">
//                   <FiTarget className="mr-2" /> Schools Near You
//                 </h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {nearbyFromUser.map((s, i) => (
//                     <div key={s.udise_code || i} className="bg-white p-4 rounded-lg border">
//                       <div className="flex justify-between">
//                         <h3 className="font-semibold text-gray-900 line-clamp-2">{s.school_name}</h3>
//                         <span className={`px-2 py-1 rounded-full text-xs font-bold ${getDistanceColor(s.distance)}`}>
//                           {formatDistance(s.distance)}
//                         </span>
//                       </div>
//                       <div className="mt-2 flex gap-2">
//                         {s.udise_code !== school.udise_code && (
//                           <button onClick={() => handleViewDetails(s.udise_code)} className="text-xs bg-blue-50 px-3 py-1 rounded">
//                             View
//                           </button>
//                         )}
//                         <button onClick={(e) => openDirections(s.latitude, s.longitude, s.school_name, e)} className="text-xs bg-green-50 px-3 py-1 rounded">
//                           Directions
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* School Information Card */}
//             <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
//                 <FiBook className="mr-3 text-blue-600" /> School Information
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h3 className="font-semibold text-gray-800 mb-3">Contact</h3>
//                   <div className="space-y-3">
//                     <div className="flex items-start">
//                       <FiPhone className="text-gray-400 mt-1 mr-3" />
//                       <div>
//                         <p className="text-sm text-gray-500">Phone</p>
//                         <p className="font-semibold">{school.mobile}</p>
//                         <button onClick={(e) => callSchool(school.mobile, school.school_name, e)} className="mt-1 px-3 py-1 bg-green-100 text-green-700 text-sm rounded">
//                           Call
//                         </button>
//                       </div>
//                     </div>
//                     <div className="flex items-start">
//                       <FiMapPin className="text-gray-400 mt-1 mr-3" />
//                       <div>
//                         <p className="text-sm text-gray-500">Location</p>
//                         <p className="font-semibold">PIN: {school.pincode}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-800 mb-3">Details</h3>
//                   <div className="space-y-3">
//                     <div>
//                       <p className="text-sm text-gray-500">District</p>
//                       <p className="font-semibold">{school.district}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500">Coordinates</p>
//                       <p className="font-mono text-sm break-all">
//                         {school.latitude?.toFixed(6)}, {school.longitude?.toFixed(6)}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Nearby Schools (from API) */}
//             <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
//                 <FiUsers className="mr-3 text-blue-600" /> Nearby Schools
//               </h2>
//               {nearby?.length ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                   {nearby.map((ns) => (
//                     <div key={ns.udise_code} className="border-2 rounded-lg p-4 hover:shadow-md">
//                       <div className="flex justify-between">
//                         <h3 className="font-bold text-gray-900 line-clamp-2">{ns.school_name}</h3>
//                         <span className={`px-2 py-1 rounded-full text-xs font-bold ${
//                           ns.distance_km < 1 ? 'bg-green-100' : ns.distance_km < 2 ? 'bg-yellow-100' : 'bg-blue-100'
//                         }`}>
//                           {ns.distance_km} km
//                         </span>
//                       </div>
//                       <div className="mt-2 text-sm text-gray-600 flex items-center">
//                         <FiPhone className="mr-1" size={12} /> {ns.mobile}
//                       </div>
//                       <div className="mt-3 flex gap-2">
//                         <button onClick={() => handleViewDetails(ns.udise_code)} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded">
//                           View
//                         </button>
//                         <button onClick={(e) => openMap(ns.location_url, ns.school_name, e)} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded">
//                           Map
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-500">No nearby schools found.</p>
//               )}
//             </div>
//           </div>

//           {/* Right column - Quick Actions */}
//           <div className="space-y-6">
//             <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
//               <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
//               <div className="space-y-3">
//                 <button onClick={closeDetails} className="w-full flex items-center justify-center px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50">
//                   <FiArrowLeft className="mr-2" /> Back to List
//                 </button>
//                 <button onClick={getUserLocationForDetail} className="w-full flex items-center justify-center px-4 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600">
//                   <FiCompass className="mr-2" /> Get My Location
//                 </button>
//                 <button onClick={(e) => callSchool(school.mobile, school.school_name, e)} className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">
//                   <FiPhone className="mr-2" /> Call School
//                 </button>
//                 <a href={school.location_url} target="_blank" rel="noopener noreferrer" className="block w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
//                   <FiNavigation className="mr-2" /> Get Directions
//                 </a>
//                 {userLocation && (
//                   <button onClick={(e) => openDirections(school.latitude, school.longitude, school.school_name, e)} className="w-full flex items-center justify-center px-4 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600">
//                     <FiNavigation2 className="mr-2" /> Directions from You
//                   </button>
//                 )}
//               </div>
//             </div>
         
//             <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6">
//               <h3 className="text-lg font-bold text-blue-900 mb-3">Location Preview</h3>
//               <p className="text-sm text-blue-800 mb-2"><strong>Name:</strong> {school.school_name}</p>
//               <p className="text-sm text-blue-800 mb-2"><strong>PIN:</strong> {school.pincode}</p>
//               <p className="text-sm text-blue-800 font-mono break-all">{school.latitude?.toFixed(6)}, {school.longitude?.toFixed(6)}</p>
//               {userLocation && (
//                 <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
//                   <p className="text-xs text-green-800 font-mono">Your location: {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ---- LIST VIEW (with full action buttons) ----
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
//       <button
//         onClick={() => navigate(-1)}
//         className="flex items-center text-blue-600 hover:text-blue-800 mb-6 group"
//       >
//         <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition" />
//         <span className="font-semibold">Back to Districts</span>
//       </button>

//       {/* District Header */}
//       <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-8 text-white shadow-xl">
//         <div className="flex flex-col md:flex-row md:items-center justify-between">
//           <div>
//             <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
//               {decodeURIComponent(name)}
//             </h1>
//             <p className="text-white/90">Browse all schools in this district</p>
//           </div>
//           <div className="mt-4 md:mt-0">
//             <span className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
//               <FiBook className="mr-2" />
//               <span className="font-bold">{filteredSchools.length} schools</span>
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* LOCATION CONTROL – exactly like Districts.jsx */}
//       <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 mb-8">
//         <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
//           <div className="flex-1">
//             <h3 className="text-xl font-bold text-blue-900 flex items-center">
//               <FiCompass className="mr-3" /> Find Schools Near Your Location
//             </h3>
//             <p className="text-blue-800">
//               Get your location to see distances, filter and sort by proximity
//             </p>
//           </div>
//           <div className="flex flex-col sm:flex-row gap-3">
//             <button
//               onClick={getUserLocation}
//               disabled={findingLocation || loadingDistances}
//               className={`px-6 py-3 font-bold rounded-xl flex items-center justify-center ${
//                 findingLocation || loadingDistances
//                   ? 'bg-gray-400 text-white cursor-not-allowed'
//                   : userLocation
//                   ? 'bg-green-500 text-white hover:bg-green-600'
//                   : locationError
//                   ? 'bg-red-500 text-white hover:bg-red-600'
//                   : 'bg-blue-600 text-white hover:bg-blue-700'
//               }`}
//             >
//               {findingLocation ? (
//                 <><FiRefreshCw className="mr-3 animate-spin" /> Finding...</>
//               ) : loadingDistances ? (
//                 <><FiLoader className="mr-3 animate-spin" /> Calculating...</>
//               ) : userLocation ? (
//                 <><FiTarget className="mr-3" /> Location Found</>
//               ) : locationError ? (
//                 <><FiAlertCircle className="mr-3" /> Try Again</>
//               ) : (
//                 <><FiCompass className="mr-3" /> Get My Location</>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Location Info */}
//         {userLocation && (
//           <div className="mt-6 pt-6 border-t border-blue-200">
//             <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
//               <div className="flex-1">
//                 <div className="flex items-center mb-2">
//                   <FiTarget className="text-green-600 mr-2" />
//                   <span className="font-semibold text-green-800">
//                     Your Current Location
//                   </span>
//                   {userLocation.accuracy && (
//                     <span className="ml-3 text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
//                       Accuracy: ±{Math.round(userLocation.accuracy)}m
//                     </span>
//                   )}
//                 </div>
//                 <p className="font-mono text-sm text-gray-600">
//                   {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}
//                 </p>
//               </div>

//               {/* Filter & Sort Toggles */}
//               {userLocation && (
//                 <div className="flex flex-wrap gap-4">
//                   <div className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       id="filterDistance"
//                       checked={filterByDistance}
//                       onChange={(e) => setFilterByDistance(e.target.checked)}
//                       className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
//                     />
//                     <label htmlFor="filterDistance" className="text-sm font-medium text-gray-700">
//                       Filter by distance
//                     </label>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       id="sortDistance"
//                       checked={sortByDistance}
//                       onChange={(e) => setSortByDistance(e.target.checked)}
//                       className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
//                     />
//                     <label htmlFor="sortDistance" className="text-sm font-medium text-gray-700">
//                       Sort by distance
//                     </label>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Distance Filter Slider */}
//             {filterByDistance && userLocation && (
//               <div className="mt-4">
//                 <div className="flex items-center justify-between mb-2">
//                   <label className="text-sm font-medium text-gray-700 flex items-center">
//                     <FiFilter className="mr-2" size={14} />
//                     Maximum distance: {maxDistance} km
//                   </label>
//                   <button
//                     onClick={() => setMaxDistance(10)}
//                     className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
//                   >
//                     Reset
//                   </button>
//                 </div>
//                 <input
//                   type="range"
//                   min="1"
//                   max="50"
//                   step="1"
//                   value={maxDistance}
//                   onChange={(e) => setMaxDistance(parseInt(e.target.value))}
//                   className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                 />
//                 <div className="flex justify-between text-xs text-gray-500 mt-1">
//                   <span>1 km</span>
//                   <span>10 km</span>
//                   <span>25 km</span>
//                   <span>50 km</span>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Search Bar */}
//       <div className="mb-8 relative">
//         <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//         <input
//           type="text"
//           placeholder="Search schools by name or UDISE..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
//         />
//       </div>

//       {/* Loading distances indicator */}
//       {loadingDistances && (
//         <div className="flex items-center justify-center mb-6 text-blue-600">
//           <FiLoader className="animate-spin mr-2" />
//           <span>Calculating distances for {schools.length} schools...</span>
//         </div>
//       )}

//       {/* Schools Grid */}
//       {filteredSchools.length ? (
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {filteredSchools.map((school) => (
//             <div
//               key={school.udise_code}
//               className="bg-white rounded-xl shadow-lg border-2 border-gray-200 hover:border-blue-400 hover:shadow-2xl transition-all cursor-pointer p-6"
//               onClick={() => handleViewDetails(school.udise_code)}
//             >
//               {/* Header with name and distance badge */}
//               <div className="flex justify-between items-start mb-3">
//                 <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 line-clamp-2 flex-1 pr-4">
//                   {school.school_name}
//                 </h3>
//                 {userLocation && school.distance !== null && (
//                   <span className={`px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap ${getDistanceColor(school.distance)}`}>
//                     {formatDistance(school.distance)}
//                   </span>
//                 )}
//               </div>

//               {/* School details: UDISE, PIN */}
//               <div className="mb-3 space-y-1">
//                 <span className="inline-flex px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
//                   UDISE: {school.udise_code}
//                 </span>
//                 {school.pincode && (
//                   <span className="inline-flex ml-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
//                     PIN: {school.pincode}
//                   </span>
//                 )}
//               </div>

//               {/* ACTION BUTTONS – Directions, Map, Call (only if location and coordinates exist) */}
//               {userLocation && school.latitude && school.longitude && (
//                 <div className="flex flex-wrap gap-2 mt-2 mb-3">
//                   {/* Directions button */}
//                   <button
//                     onClick={(e) => openDirections(school.latitude, school.longitude, school.school_name, e)}
//                     className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-700 text-xs font-medium rounded-lg hover:bg-green-200 transition-colors"
//                   >
//                     <FiNavigation2 className="mr-1" size={14} />
//                     Directions
//                   </button>
//                   {/* Map button */}
//                   {school.location_url && (
//                     <button
//                       onClick={(e) => openMap(school.location_url, school.school_name, e)}
//                       className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors"
//                     >
//                       <FiMap className="mr-1" size={14} />
//                       Map
//                     </button>
//                   )}
//                   {/* Call button */}
//                   {school.mobile && school.mobile.length >= 10 && (
//                     <button
//                       onClick={(e) => callSchool(school.mobile, school.school_name, e)}
//                       className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors"
//                     >
//                       <FiPhone className="mr-1" size={14} />
//                       Call
//                     </button>
//                   )}
//                 </div>
//               )}

//               {/* Footer with phone and View Details link */}
//               <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
//                 <span className="text-gray-600 text-sm flex items-center">
//                   <FiPhone className="mr-1" size={14} />
//                   {school.mobile || "Contact N/A"}
//                 </span>
//                 <span className="text-blue-600 font-semibold text-sm group-hover:translate-x-2 transition-transform flex items-center">
//                   View Details <span className="ml-1">→</span>
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-16">
//           <p className="text-gray-600 mb-4">No schools found.</p>
//           <div className="flex gap-3 justify-center">
//             <button onClick={() => setSearch("")} className="px-6 py-3 bg-blue-600 text-white rounded-lg">
//               Clear Search
//             </button>
//             {filterByDistance && (
//               <button onClick={() => setFilterByDistance(false)} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg">
//                 Clear Filter
//               </button>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Distance Legend */}
//       {userLocation && filteredSchools.length > 0 && (
//         <div className="mt-8 pt-6 border-t border-gray-200">
//           <h4 className="text-sm font-semibold text-gray-700 mb-3">Distance Legend</h4>
//           <div className="flex flex-wrap gap-4 text-xs text-gray-600">
//             <div className="flex items-center"><div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div> &lt;1 km</div>
//             <div className="flex items-center"><div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div> 1–3 km</div>
//             <div className="flex items-center"><div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div> 3–5 km</div>
//             <div className="flex items-center"><div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div> &gt;5 km</div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }






// src/components/Schools.jsx
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSchools, fetchSchool } from "../api";
import {
  FiArrowLeft, FiPhone, FiSearch, FiMapPin, FiBook, FiNavigation, FiNavigation2,
  FiCompass, FiTarget, FiRefreshCw, FiAlertCircle, FiMap, FiEye, FiLoader,
  FiStar, FiHome, FiUsers, FiFilter
} from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function Schools() {
  const { name } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // ---------- List data ----------
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // ---------- Enriched schools with coordinates & distance ----------
  const [enrichedSchools, setEnrichedSchools] = useState([]);
  const [loadingDistances, setLoadingDistances] = useState(false);

  // ---------- Detail view state ----------
  const [selectedUdise, setSelectedUdise] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  // ---------- User location (shared) ----------
  const [userLocation, setUserLocation] = useState(null);
  const [findingLocation, setFindingLocation] = useState(false);
  const [locationError, setLocationError] = useState(null);

  // ---------- Nearby from user (detail view only) ----------
  const [nearbyFromUser, setNearbyFromUser] = useState([]);

  // ---------- Distance filter & sort (list view) ----------
  const [filterByDistance, setFilterByDistance] = useState(false);
  const [sortByDistance, setSortByDistance] = useState(false);
  const [maxDistance, setMaxDistance] = useState(10);

  // ---------- Check for school to open from Districts ----------
  useEffect(() => {
    if (location.state?.viewSchool) {
      handleViewDetails(location.state.viewSchool);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // ---------- Load schools for this district ----------
  useEffect(() => {
    if (name) {
      loadSchools();
    }
  }, [name]);

  const loadSchools = async () => {
    try {
      setLoading(true);
      const data = await fetchSchools(name);
      setSchools(data);
      setFilteredSchools(data);
      toast.success(`${data.length} schools found`);
      
      // If we already have user location, enrich immediately
      if (userLocation) {
        await enrichSchoolsWithDistances(data, userLocation);
      }
    } catch {
      toast.error("Failed to load schools");
    } finally {
      setLoading(false);
    }
  };

  // ---------- Enrich schools with coordinates & distances ----------
  const enrichSchoolsWithDistances = async (schoolsList, userLoc) => {
    setLoadingDistances(true);
    try {
      const enriched = await Promise.all(
        schoolsList.map(async (school) => {
          try {
            const details = await fetchSchool(school.udise_code);
            if (details.school?.latitude && details.school?.longitude) {
              const distance = calculateDistance(
                userLoc.lat, userLoc.lng,
                details.school.latitude, details.school.longitude
              );
              return {
                ...school,
                latitude: details.school.latitude,
                longitude: details.school.longitude,
                location_url: details.school.location_url,
                pincode: details.school.pincode,
                mobile: details.school.mobile || school.mobile,
                distance
              };
            }
          } catch {
            // fallback – no coordinates
          }
          return {
            ...school,
            latitude: null,
            longitude: null,
            distance: null
          };
        })
      );
      setEnrichedSchools(enriched);
    } catch (error) {
      console.error("Error enriching schools:", error);
      toast.error("Could not calculate distances for all schools");
    } finally {
      setLoadingDistances(false);
    }
  };

  // ---------- Calculate distance (Haversine) ----------
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (!lat1 || !lon1 || !lat2 || !lon2) return null;
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // ---------- Get user location (list view) ----------
  const getUserLocation = async () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      setLocationError("browser_not_supported");
      return;
    }

    setFindingLocation(true);
    setLocationError(null);
    toast.loading("Getting your location...");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const loc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        };
        setUserLocation(loc);
        toast.dismiss();
        toast.success("Location found! Calculating distances...");
        setFindingLocation(false);
        
        // Enrich all schools with distances
        await enrichSchoolsWithDistances(schools, loc);
        
        // ** UPDATED: Automatically sort by distance (nearest first) **
        setSortByDistance(true);
      },
      (error) => {
        toast.dismiss();
        setFindingLocation(false);
        let msg = "Location error";
        if (error.code === 1) { msg = "Permission denied"; setLocationError("permission_denied"); }
        else if (error.code === 2) { msg = "Location unavailable"; setLocationError("position_unavailable"); }
        else if (error.code === 3) { msg = "Timeout"; setLocationError("timeout"); }
        toast.error(msg);
      },
      { enableHighAccuracy: true, timeout: 15000 }
    );
  };

  // ---------- Format distance ----------
  const formatDistance = (d) => {
    if (!d) return "N/A";
    return d < 1 ? `${(d * 1000).toFixed(0)}m` : `${d.toFixed(2)}km`;
  };
  const getDistanceColor = (d) => {
    if (!d) return "bg-gray-100 text-gray-800";
    if (d < 1) return "bg-green-100 text-green-800";
    if (d < 3) return "bg-yellow-100 text-yellow-800";
    if (d < 5) return "bg-orange-100 text-orange-800";
    return "bg-red-100 text-red-800";
  };

  // ---------- List view filter & sort (with distances) ----------
  useEffect(() => {
    // Use enriched schools if available and userLocation exists
    const source = (enrichedSchools.length && userLocation) ? enrichedSchools : schools;
    
    let result = [...source];

    // Apply search
    if (search) {
      result = result.filter(s =>
        s.school_name.toLowerCase().includes(search.toLowerCase()) ||
        s.udise_code.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply distance filter (only if userLocation exists and we have distances)
    if (filterByDistance && userLocation && enrichedSchools.length) {
      result = result.filter(s => s.distance !== null && s.distance <= maxDistance);
    }

    // Apply sorting
    if (sortByDistance && userLocation && enrichedSchools.length) {
      result.sort((a, b) => {
        if (!a.distance) return 1;
        if (!b.distance) return -1;
        return a.distance - b.distance;
      });
    } else {
      // Default sort by name
      result.sort((a, b) => a.school_name.localeCompare(b.school_name));
    }

    setFilteredSchools(result);
  }, [schools, enrichedSchools, userLocation, search, filterByDistance, sortByDistance, maxDistance]);

  // ---------- Detail view functions (unchanged) ----------
  const handleViewDetails = async (udise) => {
    setSelectedUdise(udise);
    setLoadingDetails(true);
    try {
      const data = await fetchSchool(udise);
      setSelectedSchool(data);
    } catch {
      toast.error("Failed to load school details");
      setSelectedUdise(null);
    } finally {
      setLoadingDetails(false);
    }
  };

  const closeDetails = () => {
    setSelectedUdise(null);
    setSelectedSchool(null);
    setNearbyFromUser([]);
  };

  // ---------- Detail view location & nearby (unchanged) ----------
  const getUserLocationForDetail = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      setLocationError("browser_not_supported");
      return;
    }
    setFindingLocation(true);
    setLocationError(null);
    toast.loading("Getting your location...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        };
        setUserLocation(loc);
        toast.dismiss();
        toast.success("Location found!");
        setFindingLocation(false);
        if (selectedSchool) findNearbyFromUser(loc);
      },
      (error) => {
        toast.dismiss();
        setFindingLocation(false);
        let msg = "Location error";
        if (error.code === 1) { msg = "Permission denied"; setLocationError("permission_denied"); }
        else if (error.code === 2) { msg = "Location unavailable"; setLocationError("position_unavailable"); }
        else if (error.code === 3) { msg = "Timeout"; setLocationError("timeout"); }
        toast.error(msg);
      },
      { enableHighAccuracy: true, timeout: 15000 }
    );
  };

  const findNearbyFromUser = (userLoc) => {
    if (!selectedSchool?.nearby) return;
    const all = [
      { ...selectedSchool.school, distance: calculateDistance(userLoc.lat, userLoc.lng, selectedSchool.school.latitude, selectedSchool.school.longitude) },
      ...selectedSchool.nearby.map(s => ({
        ...s,
        distance: calculateDistance(userLoc.lat, userLoc.lng, s.latitude, s.longitude)
      }))
    ].filter(s => s.distance !== null).sort((a, b) => a.distance - b.distance).slice(0, 5);
    setNearbyFromUser(all);
  };

  const openDirections = (lat, lng, name, e) => {
    e?.stopPropagation();
    if (!userLocation) { toast.error("Get your location first"); return; }
    window.open(`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${lat},${lng}&travelmode=driving`);
  };

  const openMap = (url, name, e) => {
    e?.stopPropagation();
    if (url) window.open(url);
    else toast.error(`No map for ${name}`);
  };

  const callSchool = (phone, name, e) => {
    e?.stopPropagation();
    if (phone?.length >= 10) window.location.href = `tel:${phone}`;
    else toast.error(`No valid number for ${name}`);
  };

  // ---------- Render ----------
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-32 bg-gray-200 rounded"></div>
          <div className="h-40 bg-gray-200 rounded-2xl"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => <div key={i} className="h-40 bg-gray-200 rounded-xl"></div>)}
          </div>
        </div>
      </div>
    );
  }

  // ---- DETAIL VIEW (unchanged) ----
  if (selectedUdise && selectedSchool) {
    const { school, nearby } = selectedSchool;
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        <button
          onClick={closeDetails}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 group"
        >
          <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition" />
          <span className="font-semibold">Back to {decodeURIComponent(name)} Schools</span>
        </button>

        {/* School Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <div className="flex items-center mb-3">
                <FiStar className="mr-2 text-yellow-300" /> SCHOOL DETAILS
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 break-words">{school.school_name}</h1>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm"><FiHome className="inline mr-1" /> {school.district}</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">UDISE: {school.udise_code}</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">PIN: {school.pincode}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-4 md:mt-0 w-full md:w-auto">
              <a
                href={school.location_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100"
              >
                <FiNavigation className="mr-2" /> Open in Maps
              </a>
              <button
                onClick={getUserLocationForDetail}
                disabled={findingLocation}
                className={`inline-flex items-center justify-center px-6 py-3 font-bold rounded-xl ${
                  findingLocation ? 'bg-gray-400 text-white cursor-not-allowed' :
                  userLocation ? 'bg-green-500 text-white hover:bg-green-600' :
                  locationError ? 'bg-red-500 text-white hover:bg-red-600' :
                  'bg-orange-500 text-white hover:bg-orange-600'
                }`}
              >
                {findingLocation ? <><FiRefreshCw className="mr-2 animate-spin" /> Finding...</> :
                 userLocation ? <><FiTarget className="mr-2" /> Location Found</> :
                 <><FiCompass className="mr-2" /> Get My Location</>}
              </button>
            </div>
          </div>
        </div>

        {/* Location error help */}
        {locationError && !userLocation && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-8">
            <p className="text-red-800 font-medium">⚠️ Location access issue. Please enable location and try again.</p>
          </div>
        )}

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - School info & Nearby */}
          <div className="lg:col-span-2 space-y-8">
            {/* Nearby from user (if location) */}
            {userLocation && nearbyFromUser.length > 0 && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                <h2 className="text-xl font-bold text-green-900 flex items-center mb-4">
                  <FiTarget className="mr-2" /> Schools Near You
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {nearbyFromUser.map((s, i) => (
                    <div key={s.udise_code || i} className="bg-white p-4 rounded-lg border">
                      <div className="flex justify-between">
                        <h3 className="font-semibold text-gray-900 line-clamp-2">{s.school_name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${getDistanceColor(s.distance)}`}>
                          {formatDistance(s.distance)}
                        </span>
                      </div>
                      <div className="mt-2 flex gap-2">
                        {s.udise_code !== school.udise_code && (
                          <button onClick={() => handleViewDetails(s.udise_code)} className="text-xs bg-blue-50 px-3 py-1 rounded">
                            View
                          </button>
                        )}
                        <button onClick={(e) => openDirections(s.latitude, s.longitude, s.school_name, e)} className="text-xs bg-green-50 px-3 py-1 rounded">
                          Directions
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* School Information Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FiBook className="mr-3 text-blue-600" /> School Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Contact</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <FiPhone className="text-gray-400 mt-1 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-semibold">{school.mobile}</p>
                        <button onClick={(e) => callSchool(school.mobile, school.school_name, e)} className="mt-1 px-3 py-1 bg-green-100 text-green-700 text-sm rounded">
                          Call
                        </button>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FiMapPin className="text-gray-400 mt-1 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-semibold">PIN: {school.pincode}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">District</p>
                      <p className="font-semibold">{school.district}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Coordinates</p>
                      <p className="font-mono text-sm break-all">
                        {school.latitude?.toFixed(6)}, {school.longitude?.toFixed(6)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nearby Schools (from API) */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <FiUsers className="mr-3 text-blue-600" /> Nearby Schools
              </h2>
              {nearby?.length ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {nearby.map((ns) => (
                    <div key={ns.udise_code} className="border-2 rounded-lg p-4 hover:shadow-md">
                      <div className="flex justify-between">
                        <h3 className="font-bold text-gray-900 line-clamp-2">{ns.school_name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          ns.distance_km < 1 ? 'bg-green-100' : ns.distance_km < 2 ? 'bg-yellow-100' : 'bg-blue-100'
                        }`}>
                          {ns.distance_km} km
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-gray-600 flex items-center">
                        <FiPhone className="mr-1" size={12} /> {ns.mobile}
                      </div>
                      <div className="mt-3 flex gap-2">
                        <button onClick={() => handleViewDetails(ns.udise_code)} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                          View
                        </button>
                        <button onClick={(e) => openMap(ns.location_url, ns.school_name, e)} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          Map
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No nearby schools found.</p>
              )}
            </div>
          </div>

          {/* Right column - Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button onClick={closeDetails} className="w-full flex items-center justify-center px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50">
                  <FiArrowLeft className="mr-2" /> Back to List
                </button>
                <button onClick={getUserLocationForDetail} className="w-full flex items-center justify-center px-4 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600">
                  <FiCompass className="mr-2" /> Get My Location
                </button>
                <button onClick={(e) => callSchool(school.mobile, school.school_name, e)} className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">
                  <FiPhone className="mr-2" /> Call School
                </button>
                <a href={school.location_url} target="_blank" rel="noopener noreferrer" className="block w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
                  <FiNavigation className="mr-2" /> Get Directions
                </a>
                {userLocation && (
                  <button onClick={(e) => openDirections(school.latitude, school.longitude, school.school_name, e)} className="w-full flex items-center justify-center px-4 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600">
                    <FiNavigation2 className="mr-2" /> Directions from You
                  </button>
                )}
              </div>
            </div>
         
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-3">Location Preview</h3>
              <p className="text-sm text-blue-800 mb-2"><strong>Name:</strong> {school.school_name}</p>
              <p className="text-sm text-blue-800 mb-2"><strong>PIN:</strong> {school.pincode}</p>
              <p className="text-sm text-blue-800 font-mono break-all">{school.latitude?.toFixed(6)}, {school.longitude?.toFixed(6)}</p>
              {userLocation && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-xs text-green-800 font-mono">Your location: {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---- LIST VIEW (with full action buttons) ----
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6 group"
      >
        <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition" />
        <span className="font-semibold">Back to Districts</span>
      </button>

      {/* District Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
              {decodeURIComponent(name)}
            </h1>
            <p className="text-white/90">Browse all schools in this district</p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
              <FiBook className="mr-2" />
              <span className="font-bold">{filteredSchools.length} schools</span>
            </span>
          </div>
        </div>
      </div>

      {/* LOCATION CONTROL – exactly like Districts.jsx */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-blue-900 flex items-center">
              <FiCompass className="mr-3" /> Find Schools Near Your Location
            </h3>
            <p className="text-blue-800">
              Get your location to see distances, filter and sort by proximity
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={getUserLocation}
              disabled={findingLocation || loadingDistances}
              className={`px-6 py-3 font-bold rounded-xl flex items-center justify-center ${
                findingLocation || loadingDistances
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : userLocation
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : locationError
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {findingLocation ? (
                <><FiRefreshCw className="mr-3 animate-spin" /> Finding...</>
              ) : loadingDistances ? (
                <><FiLoader className="mr-3 animate-spin" /> Calculating...</>
              ) : userLocation ? (
                <><FiTarget className="mr-3" /> Location Found</>
              ) : locationError ? (
                <><FiAlertCircle className="mr-3" /> Try Again</>
              ) : (
                <><FiCompass className="mr-3" /> Get My Location</>
              )}
            </button>
          </div>
        </div>

        {/* Location Info */}
        {userLocation && (
          <div className="mt-6 pt-6 border-t border-blue-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <FiTarget className="text-green-600 mr-2" />
                  <span className="font-semibold text-green-800">
                    Your Current Location
                  </span>
                  {userLocation.accuracy && (
                    <span className="ml-3 text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                      Accuracy: ±{Math.round(userLocation.accuracy)}m
                    </span>
                  )}
                </div>
                <p className="font-mono text-sm text-gray-600">
                  {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}
                </p>
              </div>

              {/* Filter & Sort Toggles */}
              {userLocation && (
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="filterDistance"
                      checked={filterByDistance}
                      onChange={(e) => setFilterByDistance(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="filterDistance" className="text-sm font-medium text-gray-700">
                      Filter by distance
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="sortDistance"
                      checked={sortByDistance}
                      onChange={(e) => setSortByDistance(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="sortDistance" className="text-sm font-medium text-gray-700">
                      Sort by distance
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Distance Filter Slider */}
            {filterByDistance && userLocation && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <FiFilter className="mr-2" size={14} />
                    Maximum distance: {maxDistance} km
                  </label>
                  <button
                    onClick={() => setMaxDistance(10)}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
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
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 km</span>
                  <span>10 km</span>
                  <span>25 km</span>
                  <span>50 km</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Search Bar */}
      <div className="mb-8 relative">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search schools by name or UDISE..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500"
        />
      </div>

      {/* Loading distances indicator */}
      {loadingDistances && (
        <div className="flex items-center justify-center mb-6 text-blue-600">
          <FiLoader className="animate-spin mr-2" />
          <span>Calculating distances for {schools.length} schools...</span>
        </div>
      )}

      {/* Schools Grid */}
      {filteredSchools.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSchools.map((school) => (
            <div
              key={school.udise_code}
              className="bg-white rounded-xl shadow-lg border-2 border-gray-200 hover:border-blue-400 hover:shadow-2xl transition-all cursor-pointer p-6"
              onClick={() => handleViewDetails(school.udise_code)}
            >
              {/* Header with name and distance badge */}
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 line-clamp-2 flex-1 pr-4">
                  {school.school_name}
                </h3>
                {userLocation && school.distance !== null && (
                  <span className={`px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap ${getDistanceColor(school.distance)}`}>
                    {formatDistance(school.distance)}
                  </span>
                )}
              </div>

              {/* School details: UDISE, PIN */}
              <div className="mb-3 space-y-1">
                <span className="inline-flex px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                  UDISE: {school.udise_code}
                </span>
                {school.pincode && (
                  <span className="inline-flex ml-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                    PIN: {school.pincode}
                  </span>
                )}
              </div>

              {/* ACTION BUTTONS – Directions, Map, Call (only if location and coordinates exist) */}
              {userLocation && school.latitude && school.longitude && (
                <div className="flex flex-wrap gap-2 mt-2 mb-3">
                  {/* Directions button */}
                  <button
                    onClick={(e) => openDirections(school.latitude, school.longitude, school.school_name, e)}
                    className="inline-flex items-center px-3 py-1.5 bg-green-100 text-green-700 text-xs font-medium rounded-lg hover:bg-green-200 transition-colors"
                  >
                    <FiNavigation2 className="mr-1" size={14} />
                    Directions
                  </button>
                  {/* Map button */}
                  {school.location_url && (
                    <button
                      onClick={(e) => openMap(school.location_url, school.school_name, e)}
                      className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <FiMap className="mr-1" size={14} />
                      Map
                    </button>
                  )}
                  {/* Call button */}
                  {school.mobile && school.mobile.length >= 10 && (
                    <button
                      onClick={(e) => callSchool(school.mobile, school.school_name, e)}
                      className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <FiPhone className="mr-1" size={14} />
                      Call
                    </button>
                  )}
                </div>
              )}

              {/* Footer with phone and View Details link */}
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-gray-600 text-sm flex items-center">
                  <FiPhone className="mr-1" size={14} />
                  {school.mobile || "Contact N/A"}
                </span>
                <span className="text-blue-600 font-semibold text-sm group-hover:translate-x-2 transition-transform flex items-center">
                  View Details <span className="ml-1">→</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-600 mb-4">No schools found.</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => setSearch("")} className="px-6 py-3 bg-blue-600 text-white rounded-lg">
              Clear Search
            </button>
            {filterByDistance && (
              <button onClick={() => setFilterByDistance(false)} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg">
                Clear Filter
              </button>
            )}
          </div>
        </div>
      )}

      {/* Distance Legend */}
      {userLocation && filteredSchools.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Distance Legend</h4>
          <div className="flex flex-wrap gap-4 text-xs text-gray-600">
            <div className="flex items-center"><div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div> &lt;1 km</div>
            <div className="flex items-center"><div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div> 1–3 km</div>
            <div className="flex items-center"><div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div> 3–5 km</div>
            <div className="flex items-center"><div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div> &gt;5 km</div>
          </div>
        </div>
      )}
    </div>
  );
}