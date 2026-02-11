




// // import { useEffect, useState } from "react";
// // import { fetchDistricts, fetchSchools, fetchSchool } from "../api";
// // import { useNavigate } from "react-router-dom";
// // import { 
// //   FiMapPin, 
// //   FiSearch,
// //   FiCompass,
// //   FiTarget,
// //   FiNavigation,
// //   FiNavigation2,
// //   FiRefreshCw,
// //   FiAlertCircle,
// //   FiWifiOff,
// //   FiFilter,
// //   FiX,
// //   FiMap,
// //   FiEye,
// //   FiLoader,
// //   FiUsers,
// //   FiHome,
// //   FiBook,
// //   FiPhone,
// //   FiArrowLeft
// // } from "react-icons/fi";
// // import { toast } from "react-hot-toast";

// // export default function Districts() {
// //   const [data, setData] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [loading, setLoading] = useState(true);
// //   const [userLocation, setUserLocation] = useState(null);
// //   const [findingLocation, setFindingLocation] = useState(false);
// //   const [locationError, setLocationError] = useState(null);
// //   const [nearbySchools, setNearbySchools] = useState([]);
// //   const [loadingNearbySchools, setLoadingNearbySchools] = useState(false);
// //   const [viewMode, setViewMode] = useState('districts'); // 'districts' or 'nearbySchools'
// //   const [selectedDistrictForSchools, setSelectedDistrictForSchools] = useState(null);
// //   const nav = useNavigate();

// //   useEffect(() => {
// //     loadDistricts();
// //   }, []);

// //   const loadDistricts = async () => {
// //     try {
// //       setLoading(true);
// //       const districts = await fetchDistricts();
// //       setData(districts);
// //     } catch (error) {
// //       toast.error("Failed to load districts");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Get user's current location
// //   const getUserLocation = async () => {
// //     if (!navigator.geolocation) {
// //       toast.error("Geolocation is not supported by your browser");
// //       setLocationError("browser_not_supported");
// //       return;
// //     }

// //     setFindingLocation(true);
// //     setLocationError(null);
// //     toast.loading("Getting your location...");

// //     const locationOptions = {
// //       enableHighAccuracy: true,
// //       timeout: 15000,
// //       maximumAge: 0
// //     };

// //     navigator.geolocation.getCurrentPosition(
// //       async (position) => {
// //         const userLoc = {
// //           lat: position.coords.latitude,
// //           lng: position.coords.longitude,
// //           accuracy: position.coords.accuracy,
// //           timestamp: position.timestamp
// //         };
        
// //         setUserLocation(userLoc);
// //         toast.dismiss();
// //         toast.success("Location found! Finding nearby schools...");
// //         setFindingLocation(false);
        
// //         // Find nearby schools
// //         await findNearbySchools(userLoc);
// //       },
// //       (error) => {
// //         toast.dismiss();
// //         setFindingLocation(false);
        
// //         let errorMessage = "";
        
// //         switch (error.code) {
// //           case error.PERMISSION_DENIED:
// //             errorMessage = "Location access denied. Please enable location services.";
// //             setLocationError("permission_denied");
// //             break;
// //           case error.POSITION_UNAVAILABLE:
// //             errorMessage = "Location information is currently unavailable.";
// //             setLocationError("position_unavailable");
// //             break;
// //           case error.TIMEOUT:
// //             errorMessage = "Location request timed out.";
// //             setLocationError("timeout");
// //             break;
// //           default:
// //             errorMessage = "An unknown error occurred.";
// //             setLocationError("unknown");
// //             break;
// //         }
        
// //         toast.error(errorMessage);
// //       },
// //       locationOptions
// //     );
// //   };

// //   // Calculate distance between two coordinates in kilometers
// //   const calculateDistance = (lat1, lon1, lat2, lon2) => {
// //     const R = 6371; // Earth's radius in kilometers
// //     const dLat = (lat2 - lat1) * Math.PI / 180;
// //     const dLon = (lon2 - lon1) * Math.PI / 180;
// //     const a = 
// //       Math.sin(dLat/2) * Math.sin(dLat/2) +
// //       Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
// //       Math.sin(dLon/2) * Math.sin(dLon/2);
// //     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
// //     return R * c;
// //   };

// //   // Find schools near user's location
// //   const findNearbySchools = async (userLoc) => {
// //     if (!data || data.length === 0) {
// //       toast.error("No district data available");
// //       return;
// //     }

// //     setLoadingNearbySchools(true);
// //     toast.loading("Searching for nearby schools...");

// //     try {
// //       const allSchools = [];
      
// //       // Limit to first 5 districts for performance (or use a backend API for this)
// //       const districtsToSearch = data.slice(0, 5);
      
// //       // Fetch schools from each district
// //       for (const district of districtsToSearch) {
// //         try {
// //           const schools = await fetchSchools(district);
// //           // Add district name to each school
// //           const schoolsWithDistrict = schools.map(school => ({
// //             ...school,
// //             district
// //           }));
// //           allSchools.push(...schoolsWithDistrict);
// //         } catch (error) {
// //           console.warn(`Failed to fetch schools for district ${district}:`, error);
// //         }
// //       }

// //       // Now get coordinates for schools and calculate distances
// //       const schoolsWithDistance = [];
      
// //       // Limit to first 30 schools for performance
// //       const limitedSchools = allSchools.slice(0, 30);
      
// //       for (const school of limitedSchools) {
// //         try {
// //           // Try to get school details with coordinates
// //           const schoolDetails = await fetchSchool(school.udise_code);
// //           if (schoolDetails.school && schoolDetails.school.latitude && schoolDetails.school.longitude) {
// //             const distance = calculateDistance(
// //               userLoc.lat,
// //               userLoc.lng,
// //               schoolDetails.school.latitude,
// //               schoolDetails.school.longitude
// //             );
            
// //             schoolsWithDistance.push({
// //               ...school,
// //               distance,
// //               latitude: schoolDetails.school.latitude,
// //               longitude: schoolDetails.school.longitude,
// //               location_url: schoolDetails.school.location_url,
// //               pincode: schoolDetails.school.pincode
// //             });
// //           }
// //         } catch (error) {
// //           console.warn(`Could not get coordinates for school ${school.udise_code}:`, error);
// //         }
// //       }

// //       // Sort by distance and get top 10
// //       const sortedSchools = schoolsWithDistance
// //         .sort((a, b) => a.distance - b.distance)
// //         .slice(0, 10);

// //       setNearbySchools(sortedSchools);
// //       setViewMode('nearbySchools');
// //       toast.dismiss();
      
// //       if (sortedSchools.length > 0) {
// //         toast.success(`Found ${sortedSchools.length} schools near you`);
// //       } else {
// //         toast.error("No schools with location data found nearby");
// //       }
// //     } catch (error) {
// //       toast.dismiss();
// //       toast.error("Failed to find nearby schools");
// //       console.error("Error finding nearby schools:", error);
// //     } finally {
// //       setLoadingNearbySchools(false);
// //     }
// //   };

// //   // Get distance color based on km
// //   const getDistanceColor = (distance) => {
// //     if (!distance) return "bg-gray-100 text-gray-800";
// //     if (distance < 1) return "bg-green-100 text-green-800";
// //     if (distance < 3) return "bg-yellow-100 text-yellow-800";
// //     if (distance < 5) return "bg-orange-100 text-orange-800";
// //     return "bg-red-100 text-red-800";
// //   };

// //   // Format distance display
// //   const formatDistance = (distance) => {
// //     if (!distance) return "N/A";
// //     if (distance < 1) return `${(distance * 1000).toFixed(0)} m`;
// //     return `${distance.toFixed(2)} km`;
// //   };

// //   // Open directions from user to school
// //   const openDirections = (schoolLat, schoolLng, schoolName, e) => {
// //     if (e) e.stopPropagation();
// //     if (!userLocation) {
// //       toast.error("Please get your location first");
// //       return;
// //     }

// //     const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${schoolLat},${schoolLng}&travelmode=driving`;
// //     window.open(url, '_blank', 'noopener,noreferrer');
// //   };

// //   // Open school map
// //   const openSchoolMap = (locationUrl, schoolName, e) => {
// //     if (e) e.stopPropagation();
// //     if (locationUrl) {
// //       window.open(locationUrl, '_blank', 'noopener,noreferrer');
// //     } else {
// //       toast.error(`No map available for ${schoolName}`);
// //     }
// //   };

// //   // Call a school
// //   const callSchool = (phoneNumber, schoolName, e) => {
// //     if (e) e.stopPropagation();
// //     if (phoneNumber && phoneNumber.length >= 10) {
// //       window.location.href = `tel:${phoneNumber}`;
// //     } else {
// //       toast.error(`No valid phone number for ${schoolName}`);
// //     }
// //   };

// //   // Show schools from a specific district
// //   const showDistrictSchools = (district) => {
// //     setSelectedDistrictForSchools(district);
// //     setViewMode('districtSchools');
// //   };

// //   const filteredDistricts = data.filter(district =>
// //     district.toLowerCase().includes(search.toLowerCase())
// //   );

// //   return (
// //     <div className="animate-fade-in min-h-screen bg-gradient-to-b from-gray-50 to-white">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         {/* Back Button for District Schools View */}
// //         {(viewMode === 'districtSchools' || viewMode === 'nearbySchools') && (
// //           <button
// //             onClick={() => {
// //               if (viewMode === 'districtSchools') {
// //                 setViewMode('districts');
// //                 setSelectedDistrictForSchools(null);
// //               } else {
// //                 setViewMode('districts');
// //               }
// //             }}
// //             className="flex items-center text-blue-600 hover:text-blue-800 mb-6 group transition-colors"
// //           >
// //             <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
// //             <span className="font-semibold">
// //               Back to {viewMode === 'districtSchools' ? 'All Districts' : 'Districts'}
// //             </span>
// //           </button>
// //         )}

// //         {/* Page Header */}
// //         {viewMode === 'districts' && (
// //           <div className="mb-8 text-center">
// //             <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
// //               Select Your District
// //             </h1>
// //             <p className="text-gray-600 max-w-2xl mx-auto">
// //               {/* Browse schools by district. Select a district to view all schools in that area. */}
// //             </p>
// //           </div>
// //         )}

// //         {/* District Schools Header */}
// //         {viewMode === 'districtSchools' && selectedDistrictForSchools && (
// //           <div className="mb-8">
// //             <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 mb-6 text-white shadow-xl">
// //               <h1 className="text-2xl md:text-3xl font-bold mb-2">
// //                 Schools in {selectedDistrictForSchools}
// //               </h1>
// //               <p className="text-white/90">
// //                 Browse all schools in {selectedDistrictForSchools} district
// //               </p>
// //             </div>
// //           </div>
// //         )}

// //         {/* Nearby Schools Header */}
// //         {viewMode === 'nearbySchools' && (
// //           <div className="mb-8">
// //             <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 mb-6 text-white shadow-xl">
// //               <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center">
// //                 <FiTarget className="mr-3" />
// //                 Schools Near Your Location
// //               </h1>
// //               <p className="text-white/90">
// //                 Showing schools closest to your current location
// //               </p>
// //             </div>
// //           </div>
// //         )}

// //         {/* Location Control Section (Show only in districts view) */}
// //         {viewMode === 'districts' && (
// //           <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 p-6 mb-8">
// //             <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
// //               <div className="flex-1">
// //                 <h3 className="text-xl font-bold text-blue-900 mb-2 flex items-center">
// //                   <FiCompass className="mr-3" />
// //                   Find Schools Near Your Location
// //                 </h3>
// //                 <p className="text-blue-800">
// //                   Get your current location to find schools closest to you
// //                 </p>
// //               </div>
// //               <div className="flex flex-col sm:flex-row gap-3">
// //                 <button
// //                   onClick={getUserLocation}
// //                   disabled={findingLocation || loadingNearbySchools}
// //                   className={`inline-flex items-center justify-center px-6 py-3 font-bold rounded-xl transition-colors ${
// //                     findingLocation || loadingNearbySchools
// //                       ? 'bg-gray-400 text-white cursor-not-allowed'
// //                       : userLocation
// //                       ? 'bg-green-500 text-white hover:bg-green-600'
// //                       : locationError
// //                       ? 'bg-red-500 text-white hover:bg-red-600'
// //                       : 'bg-blue-600 text-white hover:bg-blue-700'
// //                   }`}
// //                 >
// //                   {findingLocation ? (
// //                     <>
// //                       <FiRefreshCw className="mr-3 animate-spin" />
// //                       Finding...
// //                     </>
// //                   ) : loadingNearbySchools ? (
// //                     <>
// //                       <FiLoader className="mr-3 animate-spin" />
// //                       Searching Schools...
// //                     </>
// //                   ) : userLocation ? (
// //                     <>
// //                       <FiTarget className="mr-3" />
// //                       Location Found
// //                     </>
// //                   ) : locationError ? (
// //                     <>
// //                       <FiAlertCircle className="mr-3" />
// //                       Try Again
// //                     </>
// //                   ) : (
// //                     <>
// //                       <FiCompass className="mr-3" />
// //                       Find Nearby Schools
// //                     </>
// //                   )}
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Location Info */}
// //             {userLocation && (
// //               <div className="mt-6 pt-6 border-t border-blue-200">
// //                 <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
// //                   <div className="flex-1">
// //                     <div className="flex items-center mb-2">
// //                       <FiTarget className="text-green-600 mr-2" />
// //                       <span className="font-semibold text-green-800">
// //                         Your Current Location
// //                       </span>
// //                       {userLocation.accuracy && (
// //                         <span className="ml-3 text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
// //                           Accuracy: ±{Math.round(userLocation.accuracy)}m
// //                         </span>
// //                       )}
// //                     </div>
// //                     <p className="font-mono text-sm text-gray-600">
// //                       {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}
// //                     </p>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         )}

// //         {/* NEARBY SCHOOLS VIEW */}
// //         {viewMode === 'nearbySchools' && (
// //           <div className="mb-8">
// //             {loadingNearbySchools ? (
// //               <div className="text-center py-12">
// //                 <FiLoader className="animate-spin text-blue-600 text-4xl mx-auto mb-4" />
// //                 <p className="text-gray-600">Searching for schools near you...</p>
// //               </div>
// //             ) : nearbySchools.length > 0 ? (
// //               <>
// //                 {/* User Location Info */}
// //                 {userLocation && (
// //                   <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-6 border-2 border-green-200">
// //                     <div className="flex items-center justify-between mb-4">
// //                       <div>
// //                         <div className="flex items-center mb-2">
// //                           <FiMapPin className="text-green-600 mr-2" />
// //                           <span className="font-semibold text-green-800">Your Location</span>
// //                         </div>
// //                         <p className="text-sm text-gray-600">
// //                           {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
// //                         </p>
// //                       </div>
// //                       <div className="text-right">
// //                         <p className="text-sm font-semibold text-green-800">
// //                           {nearbySchools.length} schools found
// //                         </p>
// //                         <p className="text-xs text-gray-500">Within 50km radius</p>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 )}

// //                 {/* Nearby Schools Grid */}
// //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //                   {nearbySchools.map((school, index) => (
// //                     <div
// //                       key={school.udise_code || index}
// //                       className="bg-white rounded-xl shadow-lg border-2 border-gray-200 hover:shadow-xl transition-all duration-300"
// //                     >
// //                       <div className="p-6">
// //                         {/* School Header with Distance */}
// //                         <div className="flex justify-between items-start mb-4">
// //                           <div className="flex-1">
// //                             <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">
// //                               {school.school_name}
// //                               {index === 0 && (
// //                                 <span className="ml-2 inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded">
// //                                   Closest
// //                                 </span>
// //                               )}
// //                             </h3>
// //                             <div className="flex items-center text-gray-600 mb-2 text-sm">
// //                               <FiBook className="mr-2" />
// //                               <span>{school.district || "Unknown District"}</span>
// //                             </div>
// //                           </div>
// //                           <span
// //                             className={`inline-flex items-center px-3 py-1 rounded-full font-bold ${getDistanceColor(school.distance)}`}
// //                           >
// //                             {formatDistance(school.distance)}
// //                           </span>
// //                         </div>

// //                         {/* School Details */}
// //                         <div className="mb-4">
// //                           <div className="flex items-center text-gray-600 mb-2">
// //                             <FiPhone className="mr-2" />
// //                             <span className="text-sm">{school.mobile || "Contact N/A"}</span>
// //                           </div>
// //                           {school.pincode && (
// //                             <div className="text-sm text-gray-500">
// //                               PIN: {school.pincode}
// //                             </div>
// //                           )}
// //                           <div className="text-xs text-gray-500 mt-1">
// //                             UDISE: {school.udise_code}
// //                           </div>
// //                         </div>

// //                         {/* Action Buttons */}
// //                         <div className="pt-4 border-t border-gray-100">
// //                           <div className="flex flex-col sm:flex-row gap-2">
// //                             <button
// //                               onClick={() => nav(`/school/${school.udise_code}`)}
// //                               className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
// //                             >
// //                               <FiEye className="mr-2" />
// //                               View Details
// //                             </button>
                            
// //                             <div className="flex gap-2">
// //                               {school.latitude && school.longitude && (
// //                                 <button
// //                                   onClick={(e) => openDirections(school.latitude, school.longitude, school.school_name, e)}
// //                                   className="inline-flex items-center justify-center px-3 py-2 bg-green-100 text-green-700 font-medium rounded-lg hover:bg-green-200 transition-colors text-sm"
// //                                 >
// //                                   <FiNavigation2 className="mr-1" />
// //                                   Directions
// //                                 </button>
// //                               )}
// //                               {school.location_url && (
// //                                 <button
// //                                   onClick={(e) => openSchoolMap(school.location_url, school.school_name, e)}
// //                                   className="inline-flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors text-sm"
// //                                 >
// //                                   <FiMap className="mr-1" />
// //                                   Map
// //                                 </button>
// //                               )}
// //                             </div>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </>
// //             ) : (
// //               <div className="text-center py-16">
// //                 <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
// //                   <FiCompass className="text-gray-400 text-3xl" />
// //                 </div>
// //                 <h3 className="text-2xl font-bold text-gray-900 mb-3">
// //                   No Schools Found Nearby
// //                 </h3>
// //                 <p className="text-gray-600 max-w-md mx-auto mb-8">
// //                   We couldn't find any schools with location data near your current location.
// //                   Try viewing schools by district instead.
// //                 </p>
// //                 <button
// //                   onClick={() => setViewMode('districts')}
// //                   className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
// //                 >
// //                   Browse by District
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         )}

// //         {/* DISTRICT SCHOOLS VIEW */}
// //         {viewMode === 'districtSchools' && selectedDistrictForSchools && (
// //           <div className="mb-8">
// //             {/* This would be a simplified version of the Schools component for one district */}
// //             <div className="text-center py-12">
// //               <p className="text-gray-600 mb-4">
// //                 This would show all schools from {selectedDistrictForSchools} district
// //               </p>
// //               <button
// //                 onClick={() => nav(`/district/${selectedDistrictForSchools}`)}
// //                 className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
// //               >
// //                 View All Schools in {selectedDistrictForSchools}
// //               </button>
// //             </div>
// //           </div>
// //         )}

// //         {/* DISTRICTS VIEW (Default) */}
// //         {viewMode === 'districts' && (
// //           <>
// //             {/* Search Bar */}
// //             <div className="max-w-md mx-auto mb-8">
// //               <div className="relative">
// //                 <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
// //                 <input
// //                   type="text"
// //                   placeholder="Search districts..."
// //                   value={search}
// //                   onChange={(e) => setSearch(e.target.value)}
// //                   className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
// //                 />
// //               </div>
// //             </div>

// //             {/* Stats */}
// //             <div className="mb-6 flex items-center justify-between">
// //               <p className="text-gray-600">
// //                 Showing <span className="font-semibold">{filteredDistricts.length}</span> districts
// //               </p>
// //               {userLocation && (
// //                 <button
// //                   onClick={() => setViewMode('nearbySchools')}
// //                   className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 text-sm font-medium rounded-lg hover:bg-green-200 transition-colors"
// //                 >
// //                   <FiTarget className="mr-2" />
// //                   View Nearby Schools
// //                 </button>
// //               )}
// //             </div>

// //             {/* Loading State */}
// //             {loading ? (
// //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //                 {[...Array(6)].map((_, i) => (
// //                   <div key={i} className="h-48 bg-gray-200 rounded-xl animate-pulse"></div>
// //                 ))}
// //               </div>
// //             ) : (
// //               <>
// //                 {/* Districts Grid */}
// //                 {filteredDistricts.length > 0 ? (
// //                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// //                     {filteredDistricts.map((district) => (
// //                       <div
// //                         key={district}
// //                         className="group bg-white rounded-xl shadow-lg border-2 border-gray-200 hover:shadow-2xl hover:border-blue-400 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
// //                         onClick={() => nav(`/district/${district}`)}
// //                       >
// //                         <div className="p-6">
// //                           <div className="flex items-center mb-4">
// //                             <div className="p-3 bg-blue-100 rounded-xl mr-4 group-hover:bg-blue-200 transition-colors">
// //                               <FiMapPin className="text-blue-600 text-2xl" />
// //                             </div>
// //                             <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
// //                               {district}
// //                             </h3>
// //                           </div>

// //                           <div className="mb-6">
// //                             <p className="text-gray-600 text-sm">
// //                               Click to view all schools in this district
// //                             </p>
// //                           </div>

// //                           <div className="pt-4 border-t border-gray-100">
// //                             <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 group-hover:bg-blue-100">
// //                               View Schools →
// //                             </span>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 ) : (
// //                   <div className="text-center py-16">
// //                     <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
// //                       <FiMapPin className="text-gray-400 text-3xl" />
// //                     </div>
// //                     <h3 className="text-2xl font-bold text-gray-900 mb-3">No districts found</h3>
// //                     <p className="text-gray-600 max-w-md mx-auto mb-8">
// //                       {search ? `No districts match "${search}"` : "No districts available"}
// //                     </p>
// //                     <button
// //                       onClick={() => setSearch("")}
// //                       className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
// //                     >
// //                       Clear Search
// //                     </button>
// //                   </div>
// //                 )}
// //               </>
// //             )}
// //           </>
// //         )}

// //         {/* Location Error Help */}
// //         {locationError && !userLocation && viewMode === 'districts' && (
// //           <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border-2 border-red-200 p-6 mt-8">
// //             <div className="flex items-start">
// //               <FiAlertCircle className="text-red-600 mt-1 mr-3 flex-shrink-0" />
// //               <div className="flex-1">
// //                 <h4 className="font-semibold text-red-900 mb-2">
// //                   Location Access Required
// //                 </h4>
// //                 <p className="text-red-700 mb-3">
// //                   Enable location access to find schools near you.
// //                 </p>
// //                 <div className="flex gap-3">
// //                   <button
// //                     onClick={getUserLocation}
// //                     className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
// //                   >
// //                     <FiRefreshCw className="mr-2" />
// //                     Try Again
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }









// // src/components/Districts.jsx
// import { useEffect, useState } from "react";
// import { fetchDistricts, fetchSchools, fetchSchool } from "../api";
// import { useNavigate } from "react-router-dom";
// import {
//   FiMapPin, FiSearch, FiCompass, FiTarget, FiNavigation2, FiRefreshCw,
//   FiAlertCircle, FiArrowLeft, FiLoader, FiMap, FiEye, FiPhone, FiBook
// } from "react-icons/fi";
// import { toast } from "react-hot-toast";

// export default function Districts() {
//   const [districts, setDistricts] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [userLocation, setUserLocation] = useState(null);
//   const [findingLocation, setFindingLocation] = useState(false);
//   const [nearbySchools, setNearbySchools] = useState([]);
//   const [viewMode, setViewMode] = useState('districts'); // 'districts' or 'nearby'
//   const navigate = useNavigate();

//   useEffect(() => {
//     loadDistricts();
//   }, []);

//   const loadDistricts = async () => {
//     try {
//       setLoading(true);
//       const data = await fetchDistricts();
//       setDistricts(data);
//     } catch {
//       toast.error("Failed to load districts");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ---------- Geolocation ----------
//   const getUserLocation = () => {
//     if (!navigator.geolocation) {
//       toast.error("Geolocation not supported");
//       return;
//     }
//     setFindingLocation(true);
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
//         toast.success("Location found! Searching nearby schools...");
//         setFindingLocation(false);
//         await findNearbySchools(loc);
//       },
//       (error) => {
//         toast.dismiss();
//         setFindingLocation(false);
//         let msg = "Location error";
//         if (error.code === 1) msg = "Location access denied";
//         else if (error.code === 2) msg = "Location unavailable";
//         else if (error.code === 3) msg = "Location request timeout";
//         toast.error(msg);
//       },
//       { enableHighAccuracy: true, timeout: 15000 }
//     );
//   };

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
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

//   const findNearbySchools = async (userLoc) => {
//     if (!districts.length) return;

//     toast.loading("Searching schools...");
//     const allSchools = [];

//     // Limit to first 3 districts for performance (adjust as needed)
//     for (const district of districts.slice(0, 3)) {
//       try {
//         const schools = await fetchSchools(district);
//         allSchools.push(...schools.map(s => ({ ...s, district })));
//       } catch {
//         // skip
//       }
//     }

//     const withDistance = [];
//     for (const school of allSchools.slice(0, 30)) {
//       try {
//         const details = await fetchSchool(school.udise_code);
//         if (details.school?.latitude && details.school?.longitude) {
//           const dist = calculateDistance(
//             userLoc.lat, userLoc.lng,
//             details.school.latitude, details.school.longitude
//           );
//           withDistance.push({
//             ...school,
//             distance: dist,
//             latitude: details.school.latitude,
//             longitude: details.school.longitude,
//             location_url: details.school.location_url,
//             pincode: details.school.pincode
//           });
//         }
//       } catch {
//         // skip
//       }
//     }

//     const sorted = withDistance.sort((a, b) => a.distance - b.distance).slice(0, 10);
//     setNearbySchools(sorted);
//     setViewMode('nearby');
//     toast.dismiss();
//     toast.success(sorted.length ? `Found ${sorted.length} schools near you` : "No schools found nearby");
//   };

//   const formatDistance = (d) => d < 1 ? `${(d * 1000).toFixed(0)}m` : `${d.toFixed(2)}km`;

//   const filtered = districts.filter(d => d.toLowerCase().includes(search.toLowerCase()));

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
//       {/* Back button when in nearby view */}
//       {viewMode === 'nearby' && (
//         <button
//           onClick={() => setViewMode('districts')}
//           className="flex items-center text-blue-600 hover:text-blue-800 mb-6 group"
//         >
//           <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition" />
//           <span className="font-semibold">Back to Districts</span>
//         </button>
//       )}

//       {viewMode === 'districts' ? (
//         <>
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
//             Select Your District
//           </h1>

//           {/* Location finder */}
//           <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 mb-8">
//             <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
//               <div>
//                 <h3 className="text-xl font-bold text-blue-900 flex items-center">
//                   <FiCompass className="mr-3" /> Find Schools Near You
//                 </h3>
//                 <p className="text-blue-800">Get your location to see nearby schools</p>
//               </div>
//               <button
//                 onClick={getUserLocation}
//                 disabled={findingLocation}
//                 className={`px-6 py-3 font-bold rounded-xl flex items-center justify-center ${
//                   findingLocation ? 'bg-gray-400 text-white cursor-not-allowed' :
//                   userLocation ? 'bg-green-500 text-white hover:bg-green-600' :
//                   'bg-blue-600 text-white hover:bg-blue-700'
//                 }`}
//               >
//                 {findingLocation ? (
//                   <><FiRefreshCw className="mr-3 animate-spin" /> Finding...</>
//                 ) : userLocation ? (
//                   <><FiTarget className="mr-3" /> Location Found</>
//                 ) : (
//                   <><FiCompass className="mr-3" /> Find Nearby Schools</>
//                 )}
//               </button>
//             </div>
//             {userLocation && (
//               <div className="mt-4 pt-4 border-t border-blue-200 text-sm text-gray-600">
//                 <FiTarget className="inline text-green-600 mr-2" />
//                 Your location: {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}
//                 {userLocation.accuracy && <span className="ml-3 text-xs bg-blue-100 px-2 py-1 rounded">±{Math.round(userLocation.accuracy)}m</span>}
//               </div>
//             )}
//           </div>

//           {/* Search */}
//           <div className="max-w-md mx-auto mb-8 relative">
//             <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search districts..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>

//           {/* Stats */}
//           <p className="text-gray-600 mb-6">Showing <span className="font-semibold">{filtered.length}</span> districts</p>

//           {/* Districts grid */}
//           {loading ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {[...Array(6)].map((_, i) => <div key={i} className="h-48 bg-gray-200 rounded-xl animate-pulse" />)}
//             </div>
//           ) : filtered.length ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {filtered.map(district => (
//                 <div
//                   key={district}
//                   onClick={() => navigate(`/district/${district}`)}
//                   className="bg-white rounded-xl shadow-lg border-2 border-gray-200 hover:border-blue-400 hover:shadow-2xl transition-all cursor-pointer p-6"
//                 >
//                   <div className="flex items-center mb-4">
//                     <div className="p-3 bg-blue-100 rounded-xl mr-4">
//                       <FiMapPin className="text-blue-600 text-2xl" />
//                     </div>
//                     <h3 className="text-xl font-bold text-gray-900">{district}</h3>
//                   </div>
//                   <p className="text-gray-600 text-sm mb-6">Click to view schools</p>
//                   <div className="pt-4 border-t border-gray-100">
//                     <span className="text-blue-600 font-medium">View Schools →</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-16">
//               <p className="text-gray-600 mb-4">No districts found</p>
//               <button onClick={() => setSearch("")} className="px-6 py-3 bg-blue-600 text-white rounded-lg">Clear Search</button>
//             </div>
//           )}
//         </>
//       ) : (
//         /* Nearby Schools View */
//         <div>
//           <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 mb-6 text-white">
//             <h1 className="text-2xl md:text-3xl font-bold flex items-center">
//               <FiTarget className="mr-3" /> Schools Near Your Location
//             </h1>
//           </div>

//           {nearbySchools.length ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {nearbySchools.map((school, idx) => (
//                 <div key={school.udise_code} className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6">
//                   <div className="flex justify-between items-start mb-4">
//                     <h3 className="font-bold text-gray-900 text-lg line-clamp-2 flex-1">
//                       {school.school_name}
//                       {idx === 0 && <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded">Closest</span>}
//                     </h3>
//                     <span className={`px-3 py-1 rounded-full font-bold text-sm ${
//                       school.distance < 1 ? 'bg-green-100 text-green-800' :
//                       school.distance < 3 ? 'bg-yellow-100 text-yellow-800' :
//                       'bg-orange-100 text-orange-800'
//                     }`}>
//                       {formatDistance(school.distance)}
//                     </span>
//                   </div>
//                   <div className="mb-4 space-y-2 text-sm">
//                     <div className="flex items-center text-gray-600">
//                       <FiBook className="mr-2" /> {school.district}
//                     </div>
//                     <div className="flex items-center text-gray-600">
//                       <FiPhone className="mr-2" /> {school.mobile || "N/A"}
//                     </div>
//                   </div>
//                   <div className="pt-4 border-t border-gray-100 flex gap-2">
//                     <button
//                       onClick={() => navigate(`/district/${school.district}`, { state: { viewSchool: school.udise_code } })}
//                       className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
//                     >
//                       <FiEye className="inline mr-2" /> View
//                     </button>
//                     {school.latitude && (
//                       <button
//                         onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${school.latitude},${school.longitude}`)}
//                         className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm"
//                       >
//                         <FiNavigation2 />
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-16">
//               <p className="text-gray-600">No schools with location data found nearby.</p>
//               <button onClick={() => setViewMode('districts')} className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg">
//                 Browse by District
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );


// }

























// src/components/Districts.jsx
import { useEffect, useState } from "react";
import { fetchDistricts, fetchSchools, fetchSchool } from "../api";
import { useNavigate } from "react-router-dom";
import {
  FiMapPin, FiSearch, FiCompass, FiTarget, FiNavigation2, FiRefreshCw,
  FiAlertCircle, FiArrowLeft, FiLoader, FiMap, FiEye, FiPhone, FiBook,
  FiNavigation
} from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function Districts() {
  const [districts, setDistricts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [findingLocation, setFindingLocation] = useState(false);
  const [nearbySchools, setNearbySchools] = useState([]);
  const [viewMode, setViewMode] = useState('districts'); // 'districts' or 'nearby'
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

  // ---------- Geolocation ----------
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }
    setFindingLocation(true);
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
        toast.success("Location found! Searching nearby schools...");
        setFindingLocation(false);
        await findNearbySchools(loc);
      },
      (error) => {
        toast.dismiss();
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

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
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

  const findNearbySchools = async (userLoc) => {
    if (!districts.length) return;

    toast.loading("Searching schools...");
    const allSchools = [];

    // Limit to first 3 districts for performance (adjust as needed)
    for (const district of districts.slice(0, 3)) {
      try {
        const schools = await fetchSchools(district);
        allSchools.push(...schools.map(s => ({ ...s, district })));
      } catch {
        // skip
      }
    }

    const withDistance = [];
    for (const school of allSchools.slice(0, 30)) {
      try {
        const details = await fetchSchool(school.udise_code);
        if (details.school?.latitude && details.school?.longitude) {
          const dist = calculateDistance(
            userLoc.lat, userLoc.lng,
            details.school.latitude, details.school.longitude
          );
          withDistance.push({
            ...school,
            distance: dist,
            latitude: details.school.latitude,
            longitude: details.school.longitude,
            location_url: details.school.location_url,
            pincode: details.school.pincode,
            mobile: details.school.mobile || school.mobile
          });
        }
      } catch {
        // skip
      }
    }

    const sorted = withDistance.sort((a, b) => a.distance - b.distance).slice(0, 10);
    setNearbySchools(sorted);
    setViewMode('nearby');
    toast.dismiss();
    toast.success(sorted.length ? `Found ${sorted.length} schools near you` : "No schools found nearby");
  };

  const formatDistance = (d) => d < 1 ? `${(d * 1000).toFixed(0)}m` : `${d.toFixed(2)}km`;
  const getDistanceColor = (d) => d < 1 ? 'bg-green-100 text-green-800' : d < 3 ? 'bg-yellow-100 text-yellow-800' : 'bg-orange-100 text-orange-800';

  // ---------- Action Handlers ----------
  const handleViewDetails = (district, udise) => {
    navigate(`/district/${district}`, { state: { viewSchool: udise } });
  };

  const openDirections = (lat, lng, name) => {
    if (!userLocation) {
      toast.error("Please get your location first");
      return;
    }
    const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${lat},${lng}&travelmode=driving`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openSchoolMap = (url, name) => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
    else toast.error(`No map available for ${name}`);
  };

  const callSchool = (phone, name) => {
    if (phone && phone.length >= 10) window.location.href = `tel:${phone}`;
    else toast.error(`No valid phone number for ${name}`);
  };

  const filtered = districts.filter(d => d.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      {/* Back button when in nearby view */}
      {viewMode === 'nearby' && (
        <button
          onClick={() => setViewMode('districts')}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 group"
        >
          <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition" />
          <span className="font-semibold">Back to Districts</span>
        </button>
      )}

      {viewMode === 'districts' ? (
        <>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Select Your District
          </h1>

          {/* Location finder */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-blue-900 flex items-center">
                  <FiCompass className="mr-3" /> Find Schools Near You
                </h3>
                <p className="text-blue-800">Get your location to see nearby schools</p>
              </div>
              <button
                onClick={getUserLocation}
                disabled={findingLocation}
                className={`px-6 py-3 font-bold rounded-xl flex items-center justify-center ${
                  findingLocation ? 'bg-gray-400 text-white cursor-not-allowed' :
                  userLocation ? 'bg-green-500 text-white hover:bg-green-600' :
                  'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {findingLocation ? (
                  <><FiRefreshCw className="mr-3 animate-spin" /> Finding...</>
                ) : userLocation ? (
                  <><FiTarget className="mr-3" /> Location Found</>
                ) : (
                  <><FiCompass className="mr-3" /> Find Nearby Schools</>
                )}
              </button>
            </div>
            {userLocation && (
              <div className="mt-4 pt-4 border-t border-blue-200 text-sm text-gray-600">
                <FiTarget className="inline text-green-600 mr-2" />
                Your location: {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}
                {userLocation.accuracy && <span className="ml-3 text-xs bg-blue-100 px-2 py-1 rounded">±{Math.round(userLocation.accuracy)}m</span>}
              </div>
            )}
          </div>

          {/* Search */}
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

          {/* Stats */}
          <p className="text-gray-600 mb-6">Showing <span className="font-semibold">{filtered.length}</span> districts</p>

          {/* Districts grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <div key={i} className="h-48 bg-gray-200 rounded-xl animate-pulse" />)}
            </div>
          ) : filtered.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map(district => (
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
                  <p className="text-gray-600 text-sm mb-6">Click to view schools</p>
                  <div className="pt-4 border-t border-gray-100">
                    <span className="text-blue-600 font-medium">View Schools →</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600 mb-4">No districts found</p>
              <button onClick={() => setSearch("")} className="px-6 py-3 bg-blue-600 text-white rounded-lg">Clear Search</button>
            </div>
          )}
        </>
      ) : (
        /* ========== NEARBY SCHOOLS VIEW (full action buttons) ========== */
        <div>
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 mb-6 text-white">
            <h1 className="text-2xl md:text-3xl font-bold flex items-center">
              <FiTarget className="mr-3" /> Schools Near Your Location
            </h1>
          </div>

          {nearbySchools.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nearbySchools.map((school, idx) => (
                <div
                  key={school.udise_code}
                  className="bg-white rounded-xl shadow-lg border-2 border-gray-200 hover:shadow-xl transition-all duration-300 p-6"
                >
                  {/* School Header with Distance */}
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
                      className={`inline-flex items-center px-3 py-1 rounded-full font-bold text-sm ${getDistanceColor(school.distance)}`}
                    >
                      {formatDistance(school.distance)}
                    </span>
                  </div>

                  {/* School Details */}
                  <div className="mb-4 space-y-2">
                    <div className="flex items-center text-gray-600 text-sm">
                      <FiPhone className="mr-2" />
                      <span className="break-all">{school.mobile || "Contact N/A"}</span>
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

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex flex-col sm:flex-row gap-2">
                      {/* View Details */}
                      <button
                        onClick={() => handleViewDetails(school.district, school.udise_code)}
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        <FiEye className="mr-2" size={16} />
                        View Details
                      </button>

                      <div className="flex gap-2">
                        {/* Directions */}
                        {school.latitude && school.longitude && (
                          <button
                            onClick={() => openDirections(school.latitude, school.longitude, school.school_name)}
                            className="inline-flex items-center justify-center px-3 py-2 bg-green-100 text-green-700 font-medium rounded-lg hover:bg-green-200 transition-colors text-sm"
                            title="Get directions from your location"
                          >
                            <FiNavigation2 className="mr-1" size={16} />
                            Directions
                          </button>
                        )}

                        {/* Map 
                        // ! map is commented code 
                        */}
                        
                        {/* {school.location_url && (
                          <button
                            onClick={() => openSchoolMap(school.location_url, school.school_name)}
                            className="inline-flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors text-sm"
                            title="Open in Google Maps"
                          >
                            <FiMap className="mr-1" size={16} />
                            Map
                          </button>
                        )} */}

                        {/* Call */}
                        {school.mobile && school.mobile.length >= 10 && (
                          <button
                            onClick={() => callSchool(school.mobile, school.school_name)}
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
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600">No schools with location data found nearby.</p>
              <button onClick={() => setViewMode('districts')} className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg">
                Browse by District
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}