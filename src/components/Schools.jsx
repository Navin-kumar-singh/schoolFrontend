// // // src/components/Schools.jsx
// // import { useParams, useNavigate } from "react-router-dom";
// // import { useEffect, useState } from "react";
// // import { fetchSchools } from "../api";
// // import { FiArrowLeft, FiPhone, FiSearch, FiMapPin, FiBook, FiExternalLink } from "react-icons/fi";
// // import { toast } from "react-hot-toast";

// // export default function Schools() {
// //   const { name } = useParams();
// //   const [data, setData] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [loading, setLoading] = useState(true);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     if (name) {
// //       loadSchools();
// //     }
// //   }, [name]);

// //   const loadSchools = async () => {
// //     try {
// //       setLoading(true);
// //       const schools = await fetchSchools(name);
// //       setData(schools);
// //       toast.success(`${schools.length} schools found`);
// //     } catch (err) {
// //       toast.error("Failed to load schools");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const filteredSchools = data.filter(
// //     (school) =>
// //       school.school_name.toLowerCase().includes(search.toLowerCase()) ||
// //       school.udise_code.toLowerCase().includes(search.toLowerCase())
// //   );

// //   return (
// //     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         {/* Back Button */}
// //         <button
// //           onClick={() => navigate(-1)}
// //           className="flex items-center text-blue-600 hover:text-blue-800 mb-8 group transition-colors"
// //         >
// //           <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
// //           <span className="font-semibold">Back to Districts</span>
// //         </button>

// //         {/* District Header */}
// //         <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 mb-10 text-white shadow-xl">
// //           <div className="flex flex-col md:flex-row md:items-center justify-between">
// //             <div>
// //               <div className="flex items-center mb-3">
// //                 <FiMapPin className="mr-3 text-white/80" />
// //                 <span className="text-sm font-semibold uppercase tracking-wider">
// //                   DISTRICT
// //                 </span>
// //               </div>
// //               <h1 className="text-4xl md:text-5xl font-bold mb-4">
// //                 {decodeURIComponent(name)}
// //               </h1>
// //               <p className="text-white/90 text-lg">
// //                 {/* Browse all schools in this district */}
// //               </p>
// //             </div>
// //             <div className="mt-6 md:mt-0">
// //               <div className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm rounded-xl">
// //                 <FiBook className="mr-3 text-xl" />
// //                 <span className="font-bold">School Directory</span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Search and Stats */}
// //         <div className="mb-10">
// //           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
// //             <div>
// //               <h2 className="text-2xl font-bold text-gray-900">All Schools</h2>
// //               <p className="text-gray-600 mt-1">
// //                 {loading ? "Loading..." : `${filteredSchools.length} schools found`}
// //               </p>
// //             </div>
// //           </div>

// //           {/* Search Bar */}
// //           <div className="relative">
// //             <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
// //             <input
// //               type="text"
// //               placeholder="Search schools by name or UDISE code..."
// //               value={search}
// //               onChange={(e) => setSearch(e.target.value)}
// //               className="w-full pl-14 pr-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 shadow-sm"
// //               aria-label="Search schools"
// //             />
// //           </div>
// //         </div>

// //         {/* Loading State */}
// //         {loading && (
// //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //             {[...Array(6)].map((_, i) => (
// //               <div
// //                 key={i}
// //                 className="h-40 bg-gray-200 rounded-2xl animate-pulse"
// //               ></div>
// //             ))}
// //           </div>
// //         )}

// //         {/* Schools Grid */}
// //         {!loading && (
// //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //             {filteredSchools.map((school) => (
// //               <div
// //                 key={school.udise_code}
// //                 onClick={() => navigate(`/school/${school.udise_code}`)}
// //                 className="group bg-white rounded-2xl shadow-lg border-2 border-gray-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 cursor-pointer"
// //                 role="button"
// //                 tabIndex={0}
// //                 onKeyDown={(e) => {
// //                   if (e.key === 'Enter' || e.key === ' ') {
// //                     navigate(`/school/${school.udise_code}`);
// //                   }
// //                 }}
// //               >
// //                 <div className="p-6">
// //                   {/* School Name */}
// //                   <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2">
// //                     {school.school_name}
// //                   </h3>

// //                   {/* UDISE Code */}
// //                   <div className="mb-4">
// //                     <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 text-sm font-medium rounded-full">
// //                       UDISE: {school.udise_code}
// //                     </span>
// //                   </div>

// //                   {/* Location Link */}
// //                   {school.location_url && (
// //                     <div className="mb-5">
// //                       <a
// //                         href={school.location_url}
// //                         target="_blank"
// //                         rel="noopener noreferrer"
// //                         onClick={(e) => e.stopPropagation()}
// //                         className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
// //                       >
// //                         <FiExternalLink className="mr-2" />
// //                         View on Map
// //                       </a>
// //                     </div>
// //                   )}

// //                   {/* Footer */}
// //                   <div className="pt-5 border-t border-gray-100 flex justify-between items-center">
// //                     <div className="flex items-center text-gray-600">
// //                       <FiPhone className="mr-2" />
// //                       <span className="font-medium">
// //                         {school.mobile || "Contact  available"}
// //                       </span>
// //                     </div>
// //                     <span className="text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
// //                       View Details →
// //                     </span>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}

// //         {/* Empty State */}
// //         {!loading && filteredSchools.length === 0 && (
// //           <div className="text-center py-16">
// //             <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
// //               <FiSearch className="text-gray-400 text-3xl" />
// //             </div>
// //             <h3 className="text-2xl font-bold text-gray-900 mb-3">
// //               No schools found
// //             </h3>
// //             <p className="text-gray-600 max-w-md mx-auto mb-8">
// //               No schools match your search in {decodeURIComponent(name)}
// //             </p>
// //             <button
// //               onClick={() => setSearch("")}
// //               className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
// //             >
// //               Clear Search
// //             </button>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }




// // src/components/Schools.jsx
// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { fetchSchools } from "../api";
// import { 
//   FiArrowLeft, 
//   FiPhone, 
//   FiSearch, 
//   FiMapPin, 
//   FiBook, 
//   FiExternalLink, 
//   FiCompass,
//   FiTarget,
//   FiNavigation,
//   FiNavigation2,
//   FiRefreshCw,
//   FiAlertCircle,
//   FiWifiOff,
//   FiFilter,
//   FiX,
//   FiMap
// } from "react-icons/fi";
// import { toast } from "react-hot-toast";

// export default function Schools() {
//   const { name } = useParams();
//   const [data, setData] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [userLocation, setUserLocation] = useState(null);
//   const [findingLocation, setFindingLocation] = useState(false);
//   const [locationError, setLocationError] = useState(null);
//   const [filterByDistance, setFilterByDistance] = useState(false);
//   const [sortByDistance, setSortByDistance] = useState(false);
//   const [maxDistance, setMaxDistance] = useState(10); // Default 10km
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (name) {
//       loadSchools();
//     }
//   }, [name]);

//   const loadSchools = async () => {
//     try {
//       setLoading(true);
//       const schools = await fetchSchools(name);
//       setData(schools);
//       toast.success(`${schools.length} schools found`);
//     } catch (err) {
//       toast.error("Failed to load schools");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Get user's current location
//   const getUserLocation = () => {
//     if (!navigator.geolocation) {
//       toast.error("Geolocation is not supported by your browser");
//       setLocationError("browser_not_supported");
//       return;
//     }

//     setFindingLocation(true);
//     setLocationError(null);
//     toast.loading("Getting your location... Please wait");

//     const locationOptions = {
//       enableHighAccuracy: true,
//       timeout: 15000,
//       maximumAge: 0
//     };

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const userLoc = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//           accuracy: position.coords.accuracy,
//           timestamp: position.timestamp
//         };
        
//         setUserLocation(userLoc);
//         toast.dismiss();
//         toast.success("Location found!");
//         setFindingLocation(false);
//       },
//       (error) => {
//         toast.dismiss();
//         setFindingLocation(false);
        
//         let errorMessage = "";
        
//         switch (error.code) {
//           case error.PERMISSION_DENIED:
//             errorMessage = "Location access denied. Please enable location services.";
//             setLocationError("permission_denied");
//             break;
//           case error.POSITION_UNAVAILABLE:
//             errorMessage = "Location information is currently unavailable.";
//             setLocationError("position_unavailable");
//             break;
//           case error.TIMEOUT:
//             errorMessage = "Location request timed out.";
//             setLocationError("timeout");
//             break;
//           default:
//             errorMessage = "An unknown error occurred.";
//             setLocationError("unknown");
//             break;
//         }
        
//         toast.error(errorMessage);
//       },
//       locationOptions
//     );
//   };

//   // Retry location with different settings
//   const retryLocationWithLowAccuracy = () => {
//     if (!navigator.geolocation) {
//       toast.error("Geolocation not supported");
//       return;
//     }

//     setFindingLocation(true);
//     setLocationError(null);
//     toast.loading("Retrying with low accuracy mode...");

//     const lowAccuracyOptions = {
//       enableHighAccuracy: false,
//       timeout: 10000,
//       maximumAge: 60000
//     };

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const userLoc = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//           accuracy: position.coords.accuracy,
//           timestamp: position.timestamp
//         };
        
//         setUserLocation(userLoc);
//         toast.dismiss();
//         toast.success("Location found with low accuracy!");
//         setFindingLocation(false);
//       },
//       (error) => {
//         toast.dismiss();
//         setFindingLocation(false);
//         toast.error("Still unable to get location.");
//       },
//       lowAccuracyOptions
//     );
//   };

//   // Calculate distance between two coordinates in kilometers
//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const R = 6371; // Earth's radius in kilometers
//     const dLat = (lat2 - lat1) * Math.PI / 180;
//     const dLon = (lon2 - lon1) * Math.PI / 180;
//     const a = 
//       Math.sin(dLat/2) * Math.sin(dLat/2) +
//       Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
//       Math.sin(dLon/2) * Math.sin(dLon/2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//     return R * c;
//   };

//   // Get distance color based on km
//   const getDistanceColor = (distance) => {
//     if (distance < 1) return "bg-green-100 text-green-800";
//     if (distance < 3) return "bg-yellow-100 text-yellow-800";
//     if (distance < 5) return "bg-orange-100 text-orange-800";
//     return "bg-red-100 text-red-800";
//   };

//   // Open directions from user to school
//   const openDirections = (schoolLat, schoolLng, schoolName, e) => {
//     if (e) e.stopPropagation();
//     if (!userLocation) {
//       toast.error("Please get your location first");
//       return;
//     }

//     const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${schoolLat},${schoolLng}&travelmode=driving`;
//     window.open(url, '_blank', 'noopener,noreferrer');
//   };

//   // Filter and sort schools
//   const processedSchools = data
//     .map(school => {
//       if (userLocation && school.latitude && school.longitude) {
//         const distance = calculateDistance(
//           userLocation.lat,
//           userLocation.lng,
//           school.latitude,
//           school.longitude
//         );
//         return { ...school, distance };
//       }
//       return { ...school, distance: null };
//     })
//     .filter(school => {
//       if (!filterByDistance || !userLocation) return true;
//       if (!school.distance) return false;
//       return school.distance <= maxDistance;
//     })
//     .filter(school => 
//       school.school_name.toLowerCase().includes(search.toLowerCase()) ||
//       school.udise_code.toLowerCase().includes(search.toLowerCase())
//     )
//     .sort((a, b) => {
//       if (sortByDistance && userLocation) {
//         if (a.distance === null) return 1;
//         if (b.distance === null) return -1;
//         return a.distance - b.distance;
//       }
//       return a.school_name.localeCompare(b.school_name);
//     });

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
//         {/* Back Button */}
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center text-blue-600 hover:text-blue-800 mb-4 sm:mb-6 md:mb-8 group transition-colors text-sm sm:text-base"
//         >
//           <FiArrowLeft className="mr-1 sm:mr-2 group-hover:-translate-x-1 transition-transform" size={18} />
//           <span className="font-semibold">Back to Districts</span>
//         </button>

//         {/* District Header */}
//         <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 md:mb-10 text-white shadow-xl">
//           <div className="flex flex-col md:flex-row md:items-center justify-between">
//             <div className="flex-1">
//               <div className="flex items-center mb-3">
//                 <FiMapPin className="mr-3 text-white/80" />
//                 <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider">
//                   DISTRICT
//                 </span>
//               </div>
//               <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
//                 {decodeURIComponent(name)}
//               </h1>
//               <p className="text-white/90 text-sm sm:text-base">
//                 Browse all schools in this district
//               </p>
//             </div>
//             <div className="mt-6 md:mt-0">
//               <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl">
//                 <FiBook className="mr-2 sm:mr-3" size={18} />
//                 <span className="font-bold text-sm sm:text-base">School Directory</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Location Section */}
//         <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl border-2 border-blue-200 p-4 sm:p-6 mb-6 sm:mb-8">
//           <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
//             <div className="flex-1">
//               <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-2 flex items-center">
//                 <FiCompass className="mr-2 sm:mr-3" size={20} />
//                 Find Schools Near You
//               </h3>
//               <p className="text-blue-800 text-sm sm:text-base">
//                 Get your current location to see nearby schools and get directions
//               </p>
//             </div>
//             <div className="flex flex-col sm:flex-row gap-3">
//               <button
//                 onClick={getUserLocation}
//                 disabled={findingLocation}
//                 className={`inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 font-bold rounded-lg sm:rounded-xl transition-colors text-sm sm:text-base ${
//                   findingLocation
//                     ? 'bg-gray-400 text-white cursor-not-allowed'
//                     : userLocation
//                     ? 'bg-green-500 text-white hover:bg-green-600'
//                     : locationError
//                     ? 'bg-red-500 text-white hover:bg-red-600'
//                     : 'bg-blue-600 text-white hover:bg-blue-700'
//                 }`}
//               >
//                 {findingLocation ? (
//                   <>
//                     <FiRefreshCw className="mr-2 sm:mr-3 animate-spin" size={18} />
//                     Finding...
//                   </>
//                 ) : userLocation ? (
//                   <>
//                     <FiTarget className="mr-2 sm:mr-3" size={18} />
//                     Location Found
//                   </>
//                 ) : locationError ? (
//                   <>
//                     <FiAlertCircle className="mr-2 sm:mr-3" size={18} />
//                     Try Again
//                   </>
//                 ) : (
//                   <>
//                     <FiCompass className="mr-2 sm:mr-3" size={18} />
//                     Get My Location
//                   </>
//                 )}
//               </button>

//               {locationError === "timeout" && (
//                 <button
//                   onClick={retryLocationWithLowAccuracy}
//                   className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 text-white font-bold rounded-lg sm:rounded-xl hover:bg-orange-600 transition-colors text-sm sm:text-base"
//                 >
//                   <FiWifiOff className="mr-2 sm:mr-3" size={18} />
//                   Low Accuracy
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Location Info & Controls */}
//           {userLocation && (
//             <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-blue-200">
//               <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
//                 <div className="flex-1">
//                   <div className="flex items-center mb-2">
//                     <FiTarget className="text-green-600 mr-2" size={18} />
//                     <span className="font-semibold text-green-800 text-sm sm:text-base">
//                       Your Current Location
//                     </span>
//                     {userLocation.accuracy && (
//                       <span className="ml-3 text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
//                         Accuracy: ±{Math.round(userLocation.accuracy)}m
//                       </span>
//                     )}
//                   </div>
//                   <p className="font-mono text-xs sm:text-sm text-gray-600 break-all">
//                     {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}
//                   </p>
//                 </div>

//                 <div className="flex flex-wrap gap-3">
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
//               </div>

//               {/* Distance Filter Slider */}
//               {filterByDistance && (
//                 <div className="mt-4">
//                   <div className="flex items-center justify-between mb-2">
//                     <label className="text-sm font-medium text-gray-700 flex items-center">
//                       <FiFilter className="mr-2" size={14} />
//                       Maximum distance: {maxDistance} km
//                     </label>
//                     <button
//                       onClick={() => setMaxDistance(10)}
//                       className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
//                     >
//                       Reset
//                     </button>
//                   </div>
//                   <input
//                     type="range"
//                     min="1"
//                     max="50"
//                     step="1"
//                     value={maxDistance}
//                     onChange={(e) => setMaxDistance(parseInt(e.target.value))}
//                     className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
//                   />
//                   <div className="flex justify-between text-xs text-gray-500 mt-1">
//                     <span>1 km</span>
//                     <span>10 km</span>
//                     <span>25 km</span>
//                     <span>50 km</span>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Location Error Help */}
//         {locationError && !userLocation && (
//           <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl sm:rounded-2xl border-2 border-red-200 p-4 sm:p-6 mb-6 sm:mb-8">
//             <div className="flex items-start">
//               <FiAlertCircle className="text-red-600 mt-1 mr-3 flex-shrink-0" size={20} />
//               <div className="flex-1">
//                 <h4 className="font-semibold text-red-900 mb-2 text-sm sm:text-base">
//                   Location Access Required
//                 </h4>
//                 <p className="text-red-700 text-xs sm:text-sm mb-3">
//                   Enable location access to see schools near you and get directions.
//                 </p>
//                 <button
//                   onClick={getUserLocation}
//                   className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
//                 >
//                   <FiRefreshCw className="mr-2" size={14} />
//                   Try Again
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Search and Stats */}
//         <div className="mb-6 sm:mb-8 md:mb-10">
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 sm:mb-6">
//             <div>
//               <h2 className="text-xl sm:text-2xl font-bold text-gray-900">All Schools</h2>
//               <p className="text-gray-600 mt-1 text-sm sm:text-base">
//                 {loading ? "Loading..." : `${processedSchools.length} schools found`}
//                 {userLocation && filterByDistance && ` within ${maxDistance} km`}
//               </p>
//             </div>

//             {/* Active Filters */}
//             {(filterByDistance || sortByDistance) && (
//               <div className="flex flex-wrap gap-2">
//                 {filterByDistance && (
//                   <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
//                     <FiFilter className="mr-1" size={12} />
//                     Filtered: {maxDistance}km
//                   </span>
//                 )}
//                 {sortByDistance && (
//                   <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
//                     <FiNavigation className="mr-1" size={12} />
//                     Sorted by distance
//                   </span>
//                 )}
//                 <button
//                   onClick={() => {
//                     setFilterByDistance(false);
//                     setSortByDistance(false);
//                     setMaxDistance(10);
//                   }}
//                   className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full hover:bg-gray-200"
//                 >
//                   <FiX className="mr-1" size={12} />
//                   Clear filters
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Search Bar */}
//           <div className="relative">
//             <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//             <input
//               type="text"
//               placeholder="Search schools by name or UDISE code..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full pl-12 pr-4 py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 shadow-sm"
//               aria-label="Search schools"
//             />
//           </div>
//         </div>

//         {/* Loading State */}
//         {loading && (
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
//             {[...Array(6)].map((_, i) => (
//               <div
//                 key={i}
//                 className="h-32 sm:h-40 bg-gray-200 rounded-xl sm:rounded-2xl animate-pulse"
//               ></div>
//             ))}
//           </div>
//         )}

//         {/* Schools Grid */}
//         {!loading && (
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
//             {processedSchools.map((school) => (
//               <div
//                 key={school.udise_code}
//                 onClick={() => navigate(`/school/${school.udise_code}`)}
//                 className="group bg-white rounded-xl sm:rounded-2xl shadow-lg border-2 border-gray-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 cursor-pointer"
//                 role="button"
//                 tabIndex={0}
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter' || e.key === ' ') {
//                     navigate(`/school/${school.udise_code}`);
//                   }
//                 }}
//               >
//                 <div className="p-4 sm:p-6">
//                   {/* School Name */}
//                   <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2">
//                     {school.school_name}
//                   </h3>

//                   {/* Distance Badge */}
//                   {userLocation && school.distance !== null && (
//                     <div className="mb-3">
//                       <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold ${getDistanceColor(school.distance)}`}>
//                         <FiNavigation className="mr-1 sm:mr-2" size={12} />
//                         {school.distance.toFixed(2)} km away
//                       </span>
//                     </div>
//                   )}

//                   {/* UDISE Code */}
//                   <div className="mb-4">
//                     <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-gray-100 text-gray-800 text-xs sm:text-sm font-medium rounded-full">
//                       UDISE: {school.udise_code}
//                     </span>
//                   </div>

//                   {/* Location & Direction Buttons */}
//                   <div className="mb-4 flex flex-wrap gap-2">
//                     {school.location_url && (
//                       <a
//                         href={school.location_url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         onClick={(e) => e.stopPropagation()}
//                         className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 text-xs sm:text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors"
//                       >
//                         <FiMap className="mr-2" size={12} />
//                         View on Map
//                       </a>
//                     )}
                    
//                     {userLocation && school.latitude && school.longitude && (
//                       <button
//                         onClick={(e) => openDirections(school.latitude, school.longitude, school.school_name, e)}
//                         className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 text-xs sm:text-sm font-medium rounded-lg hover:bg-green-100 transition-colors"
//                       >
//                         <FiNavigation2 className="mr-2" size={12} />
//                         Get Directions
//                       </button>
//                     )}
//                   </div>

//                   {/* Footer */}
//                   <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
//                     <div className="flex items-center text-gray-600 text-sm">
//                       <FiPhone className="mr-2" size={14} />
//                       <span className="font-medium">
//                         {school.mobile || "Contact available"}
//                       </span>
//                     </div>
//                     <span className="text-blue-600 font-semibold text-sm group-hover:translate-x-2 transition-transform">
//                       View Details →
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Empty State */}
//         {!loading && processedSchools.length === 0 && (
//           <div className="text-center py-8 sm:py-16">
//             <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-100 mb-4 sm:mb-6">
//               <FiSearch className="text-gray-400 text-2xl sm:text-3xl" />
//             </div>
//             <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
//               No schools found
//             </h3>
//             <p className="text-gray-600 max-w-md mx-auto mb-6 sm:mb-8 text-sm sm:text-base">
//               {search ? `No schools match "${search}"` : `No schools found in ${decodeURIComponent(name)}`}
//               {filterByDistance && userLocation && ` within ${maxDistance} km of your location`}
//             </p>
//             <div className="flex flex-col sm:flex-row gap-3 justify-center">
//               <button
//                 onClick={() => setSearch("")}
//                 className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
//               >
//                 Clear Search
//               </button>
//               {(filterByDistance || sortByDistance) && (
//                 <button
//                   onClick={() => {
//                     setFilterByDistance(false);
//                     setSortByDistance(false);
//                     setMaxDistance(10);
//                   }}
//                   className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
//                 >
//                   Clear Filters
//                 </button>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Legend */}
//         {userLocation && !loading && processedSchools.length > 0 && (
//           <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
//             <h4 className="text-sm sm:text-base font-semibold text-gray-700 mb-3 sm:mb-4">Distance Legend</h4>
//             <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
//               <div className="flex items-center">
//                 <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full mr-2"></div>
//                 <span>Less than 1 km</span>
//               </div>
//               <div className="flex items-center">
//                 <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full mr-2"></div>
//                 <span>1 - 3 km</span>
//               </div>
//               <div className="flex items-center">
//                 <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded-full mr-2"></div>
//                 <span>3 - 5 km</span>
//               </div>
//               <div className="flex items-center">
//                 <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full mr-2"></div>
//                 <span>More than 5 km</span>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }








// src/components/Schools.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSchools, fetchSchool } from "../api"; // Import both APIs
import { 
  FiArrowLeft, 
  FiPhone, 
  FiSearch, 
  FiMapPin, 
  FiBook, 
  FiExternalLink, 
  FiCompass,
  FiTarget,
  FiNavigation,
  FiNavigation2,
  FiRefreshCw,
  FiAlertCircle,
  FiWifiOff,
  FiFilter,
  FiX,
  FiMap,
  FiUsers,
  FiEye,
  FiLoader
} from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function Schools() {
  const { name } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [findingLocation, setFindingLocation] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [filterByDistance, setFilterByDistance] = useState(false);
  const [sortByDistance, setSortByDistance] = useState(false);
  const [maxDistance, setMaxDistance] = useState(10);
  const [nearbySchoolsFromUser, setNearbySchoolsFromUser] = useState([]);
  const [showUserNearby, setShowUserNearby] = useState(false);
  const [viewMode, setViewMode] = useState('list');
  const [loadingDistances, setLoadingDistances] = useState(false);
  const [enrichedData, setEnrichedData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (name) {
      loadSchools();
    }
  }, [name]);

  // Load schools with coordinates
  const loadSchools = async () => {
    try {
      setLoading(true);
      const schools = await fetchSchools(name);
      setData(schools);
      
      // Try to enrich data with coordinates
      await enrichSchoolsWithCoordinates(schools);
      
      toast.success(`${schools.length} schools found`);
    } catch (err) {
      toast.error("Failed to load schools");
    } finally {
      setLoading(false);
    }
  };

  // Enrich school data with coordinates
  const enrichSchoolsWithCoordinates = async (schools) => {
    setLoadingDistances(true);
    try {
      const enriched = await Promise.all(
        schools.map(async (school) => {
          try {
            // Try to get detailed school data with coordinates
            const schoolDetails = await fetchSchool(school.udise_code);
            return {
              ...school,
              latitude: schoolDetails.school.latitude,
              longitude: schoolDetails.school.longitude,
              location_url: schoolDetails.school.location_url,
              pincode: schoolDetails.school.pincode,
              district: schoolDetails.school.district,
              // Calculate distance if user location exists
              distance: userLocation ? calculateDistance(
                userLocation.lat,
                userLocation.lng,
                schoolDetails.school.latitude,
                schoolDetails.school.longitude
              ) : null
            };
          } catch (error) {
            console.warn(`Could not fetch coordinates for ${school.udise_code}`, error);
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
      
      setEnrichedData(enriched);
    } catch (error) {
      console.error("Error enriching school data:", error);
      setEnrichedData(schools.map(s => ({ ...s, latitude: null, longitude: null, distance: null })));
    } finally {
      setLoadingDistances(false);
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
        
        // Recalculate distances with new user location
        await updateDistancesWithUserLocation(userLoc);
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

  // Update distances with user location
  const updateDistancesWithUserLocation = async (userLoc) => {
    setLoadingDistances(true);
    try {
      // Update enriched data with distances
      const updatedData = enrichedData.map(school => ({
        ...school,
        distance: school.latitude && school.longitude ? 
          calculateDistance(userLoc.lat, userLoc.lng, school.latitude, school.longitude) : null
      }));
      
      setEnrichedData(updatedData);
      
      // Find nearby schools
      findSchoolsNearUser(updatedData, userLoc);
      setViewMode('nearby');
    } catch (error) {
      console.error("Error updating distances:", error);
    } finally {
      setLoadingDistances(false);
    }
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
  const findSchoolsNearUser = (schools, userLoc) => {
    if (!schools || schools.length === 0) {
      toast.error("No school data available");
      return;
    }

    // Filter schools with valid coordinates and calculate distances
    const schoolsWithDistance = schools
      .filter(school => school.latitude && school.longitude)
      .map(school => ({
        ...school,
        distance: calculateDistance(userLoc.lat, userLoc.lng, school.latitude, school.longitude)
      }))
      .filter(school => school.distance !== null);

    // Sort by distance and get top schools
    const sortedSchools = schoolsWithDistance
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5);

    setNearbySchoolsFromUser(sortedSchools);
    setShowUserNearby(true);
    
    toast.success(`Found ${sortedSchools.length} schools near you`);
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
  const openDirections = (schoolLat, schoolLng, schoolName, e) => {
    if (e) e.stopPropagation();
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
  const openSchoolMap = (locationUrl, schoolName, e) => {
    if (e) e.stopPropagation();
    if (locationUrl) {
      window.open(locationUrl, '_blank', 'noopener,noreferrer');
    } else {
      toast.error(`No map available for ${schoolName}`);
    }
  };

  // Call a school
  const callSchool = (phoneNumber, schoolName, e) => {
    if (e) e.stopPropagation();
    if (phoneNumber && phoneNumber.length >= 10) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      toast.error(`No valid phone number for ${schoolName}`);
    }
  };

  // Filter and sort schools for list view
  const processedSchools = enrichedData
    .filter(school => {
      // Apply distance filter if enabled
      if (filterByDistance && userLocation) {
        if (!school.distance) return false;
        return school.distance <= maxDistance;
      }
      return true;
    })
    .filter(school => 
      school.school_name.toLowerCase().includes(search.toLowerCase()) ||
      school.udise_code.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortByDistance && userLocation) {
        if (!a.distance) return 1;
        if (!b.distance) return -1;
        return a.distance - b.distance;
      }
      return a.school_name.localeCompare(b.school_name);
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4 sm:mb-6 md:mb-8 group transition-colors text-sm sm:text-base"
        >
          <FiArrowLeft className="mr-1 sm:mr-2 group-hover:-translate-x-1 transition-transform" size={18} />
          <span className="font-semibold">Back to Districts</span>
        </button>

        {/* District Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 md:mb-10 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-3">
                <FiMapPin className="mr-3 text-white/80" />
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider">
                  DISTRICT
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                {decodeURIComponent(name)}
              </h1>
              <p className="text-white/90 text-sm sm:text-base">
                Browse all schools in this district
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl">
                <FiBook className="mr-2 sm:mr-3" size={18} />
                <span className="font-bold text-sm sm:text-base">School Directory</span>
              </div>
            </div>
          </div>
        </div>

        {/* Location Control Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl border-2 border-blue-200 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-2 flex items-center">
                <FiCompass className="mr-2 sm:mr-3" size={20} />
                Find Schools Near Your Location
              </h3>
              <p className="text-blue-800 text-sm sm:text-base">
                Get your current location to see nearby schools with distances
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={getUserLocation}
                disabled={findingLocation || loadingDistances}
                className={`inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 font-bold rounded-lg sm:rounded-xl transition-colors text-sm sm:text-base ${
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
                  <>
                    <FiRefreshCw className="mr-2 sm:mr-3 animate-spin" size={18} />
                    Finding...
                  </>
                ) : loadingDistances ? (
                  <>
                    <FiLoader className="mr-2 sm:mr-3 animate-spin" size={18} />
                    Calculating...
                  </>
                ) : userLocation ? (
                  <>
                    <FiTarget className="mr-2 sm:mr-3" size={18} />
                    Location Found
                  </>
                ) : locationError ? (
                  <>
                    <FiAlertCircle className="mr-2 sm:mr-3" size={18} />
                    Try Again
                  </>
                ) : (
                  <>
                    <FiCompass className="mr-2 sm:mr-3" size={18} />
                    Get My Location
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Location Info */}
          {userLocation && (
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-blue-200">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <FiTarget className="text-green-600 mr-2" size={18} />
                    <span className="font-semibold text-green-800 text-sm sm:text-base">
                      Your Current Location
                    </span>
                    {userLocation.accuracy && (
                      <span className="ml-3 text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                        Accuracy: ±{Math.round(userLocation.accuracy)}m
                      </span>
                    )}
                  </div>
                  <p className="font-mono text-xs sm:text-sm text-gray-600 break-all">
                    {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {/* View Toggle */}
                  <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button
                      onClick={() => setViewMode('list')}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        viewMode === 'list' 
                          ? 'bg-white text-blue-600 shadow-sm' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      All Schools
                    </button>
                    <button
                      onClick={() => setViewMode('nearby')}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        viewMode === 'nearby' 
                          ? 'bg-white text-blue-600 shadow-sm' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <FiTarget className="inline mr-1" size={12} />
                      Nearby
                    </button>
                  </div>

                  {/* Filter Options */}
                  {viewMode === 'list' && (
                    <>
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
                    </>
                  )}
                </div>
              </div>

              {/* Distance Filter Slider */}
              {viewMode === 'list' && filterByDistance && (
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

        {/* NEARBY SCHOOLS SECTION */}
        {showUserNearby && userLocation && nearbySchoolsFromUser.length > 0 && viewMode === 'nearby' && (
          <div className="mb-6 sm:mb-8">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl shadow-lg border-2 border-green-200 p-4 sm:p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-green-900 flex items-center mb-2 sm:mb-0">
                  <FiTarget className="mr-2 sm:mr-3 text-green-600" size={20} />
                  Schools Near Your Location
                </h2>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-800 font-bold rounded-full text-sm sm:text-base">
                    {nearbySchoolsFromUser.length} schools nearby
                  </span>
                  <button
                    onClick={() => setViewMode('list')}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Show All Schools
                  </button>
                </div>
              </div>

              <div className="mb-4 p-4 bg-white/70 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <FiMapPin className="text-green-600 mr-2" size={18} />
                    <span className="font-semibold text-green-800">Your Current Location</span>
                  </div>
                  {userLocation.accuracy && (
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                      Accuracy: ±{Math.round(userLocation.accuracy)}m
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  <p>Latitude: {userLocation.lat.toFixed(6)}</p>
                  <p>Longitude: {userLocation.lng.toFixed(6)}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {nearbySchoolsFromUser.map((school, index) => (
                  <div
                    key={school.udise_code || `nearby-${index}`}
                    className={`border-2 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:shadow-md transition-all duration-200 bg-white ${
                      index === 0 ? 'border-blue-300' : 'border-green-200'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4">
                      <div className="flex-1 mb-3 sm:mb-0">
                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-sm sm:text-base">
                          {school.school_name}
                          {index === 0 && (
                            <span className="ml-2 inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded">
                              Closest
                            </span>
                          )}
                        </h3>
                        <div className="flex items-center text-gray-600 mb-2 text-xs sm:text-sm">
                          <FiPhone className="mr-1 sm:mr-2" size={14} />
                          <span className="break-all">{school.mobile || "N/A"}</span>
                        </div>
                      </div>
                      <div className="ml-0 sm:ml-4">
                        <span
                          className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold ${
                            school.distance && school.distance < 1
                              ? "bg-green-100 text-green-800"
                              : school.distance && school.distance < 3
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-orange-100 text-orange-800"
                          }`}
                          title={school.distance ? `${school.distance.toFixed(2)} kilometers from you` : "Distance not available"}
                        >
                          {formatDistance(school.distance)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
                      <div className="flex items-center mb-2 sm:mb-0">
                        {school.udise_code && (
                          <span className="text-xs sm:text-sm text-gray-500">
                            UDISE: {school.udise_code}
                          </span>
                        )}
                        {school.pincode && (
                          <span className="ml-3 text-xs sm:text-sm text-gray-500">
                            PIN: {school.pincode}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 mt-4 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => navigate(`/school/${school.udise_code}`)}
                        className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100 transition-colors text-sm w-full sm:w-auto"
                      >
                        <FiEye className="mr-1 sm:mr-2" size={16} />
                        View Details
                      </button>
                      
                      <div className="flex gap-2 w-full sm:w-auto">
                        {school.latitude && school.longitude && (
                          <button
                            onClick={(e) => openDirections(school.latitude, school.longitude, school.school_name, e)}
                            className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-green-100 text-green-700 font-medium rounded-lg hover:bg-green-200 transition-colors text-sm flex-1 sm:flex-none"
                            title="Get directions from your location"
                          >
                            <FiNavigation2 className="mr-1 sm:mr-2" size={16} />
                            Directions
                          </button>
                        )}
                        
                        {school.location_url && (
                          <button
                            onClick={(e) => openSchoolMap(school.location_url, school.school_name, e)}
                            className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors text-sm flex-1 sm:flex-none"
                          >
                            <FiMap className="mr-1 sm:mr-2" size={16} />
                            Map
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-32 sm:h-40 bg-gray-200 rounded-xl sm:rounded-2xl animate-pulse"
              ></div>
            ))}
          </div>
        )}

        {/* SCHOOLS GRID - LIST VIEW */}
        {!loading && viewMode === 'list' && processedSchools.length > 0 && (
          <>
            <div className="mb-6">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search schools by name or UDISE code..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg sm:rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200 shadow-sm"
                  aria-label="Search schools"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {processedSchools.map((school) => (
                <div
                  key={school.udise_code}
                  onClick={() => navigate(`/school/${school.udise_code}`)}
                  className="group bg-white rounded-xl sm:rounded-2xl shadow-lg border-2 border-gray-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      navigate(`/school/${school.udise_code}`);
                    }
                  }}
                >
                  <div className="p-4 sm:p-6">
                    {/* School Name */}
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2">
                      {school.school_name}
                    </h3>

                    {/* Distance Badge */}
                    {userLocation && school.distance !== null && (
                      <div className="mb-3">
                        <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold ${getDistanceColor(school.distance)}`}>
                          <FiNavigation className="mr-1 sm:mr-2" size={12} />
                          {formatDistance(school.distance)}
                        </span>
                      </div>
                    )}

                    {/* School Details */}
                    <div className="mb-4 space-y-2">
                      <div className="flex items-center">
                        <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-gray-100 text-gray-800 text-xs sm:text-sm font-medium rounded-full">
                          UDISE: {school.udise_code}
                        </span>
                        {school.pincode && (
                          <span className="ml-2 inline-flex items-center px-2 sm:px-3 py-1 bg-blue-50 text-blue-700 text-xs sm:text-sm font-medium rounded-full">
                            PIN: {school.pincode}
                          </span>
                        )}
                      </div>
                      {school.district && (
                        <p className="text-xs sm:text-sm text-gray-600">
                          District: {school.district}
                        </p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      {school.location_url && (
                        <button
                          onClick={(e) => openSchoolMap(school.location_url, school.school_name, e)}
                          className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 text-xs sm:text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <FiMap className="mr-2" size={12} />
                          View Map
                        </button>
                      )}
                      
                      {userLocation && school.latitude && school.longitude && (
                        <button
                          onClick={(e) => openDirections(school.latitude, school.longitude, school.school_name, e)}
                          className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 text-xs sm:text-sm font-medium rounded-lg hover:bg-green-100 transition-colors"
                        >
                          <FiNavigation2 className="mr-2" size={12} />
                          Get Directions
                        </button>
                      )}

                      {school.mobile && (
                        <button
                          onClick={(e) => callSchool(school.mobile, school.school_name, e)}
                          className="inline-flex items-center px-3 py-1 bg-green-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <FiPhone className="mr-2" size={12} />
                          Call School
                        </button>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <div className="flex items-center text-gray-600 text-sm">
                        <FiPhone className="mr-2" size={14} />
                        <span className="font-medium">
                          {school.mobile || "Contact available"}
                        </span>
                      </div>
                      <span className="text-blue-600 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                        View Details →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Empty State */}
        {!loading && ((viewMode === 'list' && processedSchools.length === 0) || 
                     (viewMode === 'nearby' && !showUserNearby)) && (
          <div className="text-center py-8 sm:py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-100 mb-4 sm:mb-6">
              <FiSearch className="text-gray-400 text-2xl sm:text-3xl" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
              {loadingDistances ? "Loading distances..." : "No schools found"}
            </h3>
            <p className="text-gray-600 max-w-md mx-auto mb-6 sm:mb-8 text-sm sm:text-base">
              {viewMode === 'nearby' && !userLocation 
                ? "Get your location to see nearby schools"
                : viewMode === 'nearby'
                ? "No schools with location data found nearby"
                : search 
                  ? `No schools match "${search}"`
                  : `No schools found in ${decodeURIComponent(name)}`
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {viewMode === 'list' && (
                <>
                  <button
                    onClick={() => setSearch("")}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                  >
                    Clear Search
                  </button>
                  <button
                    onClick={() => {
                      setFilterByDistance(false);
                      setSortByDistance(false);
                      setMaxDistance(10);
                    }}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
                  >
                    Clear Filters
                  </button>
                </>
              )}
              {viewMode === 'nearby' && !userLocation && (
                <button
                  onClick={getUserLocation}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                >
                  Get My Location
                </button>
              )}
            </div>
          </div>
        )}

        {/* Legend */}
        {userLocation && !loading && ((viewMode === 'list' && processedSchools.length > 0) || 
                                     (viewMode === 'nearby' && nearbySchoolsFromUser.length > 0)) && (
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
            <h4 className="text-sm sm:text-base font-semibold text-gray-700 mb-3 sm:mb-4">Distance Legend</h4>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full mr-2"></div>
                <span>Less than 1 km</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full mr-2"></div>
                <span>1 - 3 km</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded-full mr-2"></div>
                <span>3 - 5 km</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full mr-2"></div>
                <span>More than 5 km</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}