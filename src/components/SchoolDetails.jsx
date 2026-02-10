// // // src/components/SchoolDetails.jsx
// // import { useParams, useNavigate } from "react-router-dom";
// // import { useEffect, useState } from "react";
// // import { fetchSchool } from "../api";
// // import {
// //   FiArrowLeft,
// //   FiPhone,
// //   FiMapPin,
// //   FiNavigation,
// //   FiGlobe,
// //   FiUsers,
// //   FiStar,
// //   FiMail,
// //   FiHome,
// // } from "react-icons/fi";
// // import { toast } from "react-hot-toast";

// // export default function SchoolDetails() {
// //   const { udise } = useParams();
// //   const [data, setData] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     if (udise) {
// //       loadSchoolDetails();
// //     }
// //   }, [udise]);

// //   const loadSchoolDetails = async () => {
// //     try {
// //       setLoading(true);
// //       const schoolData = await fetchSchool(udise);
// //       setData(schoolData);
// //       toast.success("School details loaded");
// //     } catch (err) {
// //       toast.error("Failed to load school details");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //           <div className="animate-pulse">
// //             <div className="h-8 w-32 bg-gray-200 rounded mb-8"></div>
// //             <div className="h-64 bg-gray-200 rounded-2xl mb-10"></div>
// //             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //               <div className="lg:col-span-2">
// //                 <div className="h-96 bg-gray-200 rounded-2xl mb-8"></div>
// //                 <div className="h-64 bg-gray-200 rounded-2xl"></div>
// //               </div>
// //               <div className="h-48 bg-gray-200 rounded-2xl"></div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!data) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
// //         <div className="text-center">
// //           <h2 className="text-2xl font-bold text-gray-900 mb-4">School not found</h2>
// //           <button
// //             onClick={() => navigate(-1)}
// //             className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
// //           >
// //             Go Back
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const { school, nearby } = data;

// //   return (
// //     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
// //         {/* Back Button */}
// //         <button
// //           onClick={() => navigate(-1)}
// //           className="flex items-center text-blue-600 hover:text-blue-800 mb-8 group transition-colors"
// //         >
// //           <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
// //           <span className="font-semibold">Back to Schools</span>
// //         </button>

// //         {/* School Header */}
// //         <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-8 md:p-10 mb-10 text-white shadow-2xl">
// //           <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
// //             <div className="flex-1">
// //               <div className="flex items-center mb-4">
// //                 <FiStar className="mr-3 text-yellow-300" />
// //                 <span className="text-sm font-semibold uppercase tracking-wider">
// //                   SCHOOL DETAILS
// //                 </span>
// //               </div>
// //               <h1 className="text-4xl md:text-5xl font-bold mb-6">
// //                 {school.school_name}
// //               </h1>
// //               <div className="flex flex-wrap gap-3">
// //                 <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
// //                   <FiHome className="mr-2" />
// //                   <span className="font-medium">{school.district}</span>
// //                 </div>
// //                 <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
// //                   <span className="font-medium">UDISE: {school.udise_code}</span>
// //                 </div>
// //               </div>
// //             </div>
// //             <a
// //               href={school.location_url}
// //               target="_blank"
// //               rel="noopener noreferrer"
// //               className="mt-6 md:mt-0 inline-flex items-center px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
// //             >
// //               <FiNavigation className="mr-3 text-xl" />
// //               Open in Google Maps
// //             </a>
// //           </div>
// //         </div>

// //         {/* Main Content */}
// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //           {/* Left Column - School Info */}
// //           <div className="lg:col-span-2 space-y-8">
// //             {/* School Information Card */}
// //             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
// //               <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
// //                 <FiGlobe className="mr-3 text-blue-600" />
// //                 School Information
// //               </h2>

// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// //                 {/* Contact Information */}
// //                 <div>
// //                   <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Details</h3>
// //                   <div className="space-y-4">
// //                     <div className="flex items-start">
// //                       <FiPhone className="text-gray-400 mt-1 mr-3" />
// //                       <div>
// //                         <p className="text-sm text-gray-500">Phone Number</p>
// //                         <p className="text-lg font-semibold">{school.mobile}</p>
// //                       </div>
// //                     </div>
// //                     <div className="flex items-start">
// //                       <FiMapPin className="text-gray-400 mt-1 mr-3" />
// //                       <div>
// //                         <p className="text-sm text-gray-500">Location</p>
// //                         <p className="text-gray-700 mb-1">{school.pincode}</p>
// //                         <a
// //                           href={school.location_url}
// //                           target="_blank"
// //                           rel="noopener noreferrer"
// //                           className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
// //                         >
// //                           <FiNavigation className="mr-2" />
// //                           View on Google Maps
// //                         </a>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* School Details */}
// //                 <div>
// //                   <h3 className="text-lg font-semibold text-gray-800 mb-4">School Details</h3>
// //                   <div className="space-y-4">
// //                     <div>
// //                       <p className="text-sm text-gray-500">District</p>
// //                       <p className="text-lg font-semibold">{school.district}</p>
// //                     </div>
// //                     <div>
// //                       <p className="text-sm text-gray-500">PIN Code</p>
// //                       <p className="text-lg font-semibold">{school.pincode}</p>
// //                     </div>
// //                     <div>
// //                       <p className="text-sm text-gray-500">Coordinates</p>
// //                       <p className="font-mono text-gray-700">
// //                         {school.latitude}, {school.longitude}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Nearby Schools */}
// //             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
// //               <div className="flex items-center justify-between mb-8">
// //                 <h2 className="text-2xl font-bold text-gray-900 flex items-center">
// //                   <FiUsers className="mr-3 text-blue-600" />
// //                   Nearby Schools
// //                   <span className="ml-4 px-4 py-1 bg-blue-100 text-blue-700 font-bold rounded-full">
// //                     {nearby.length} schools
// //                   </span>
// //                 </h2>
// //               </div>

// //               {nearby.length > 0 ? (
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                   {nearby.map((nearbySchool, index) => (
// //                     <div
// //                       key={nearbySchool.udise_code}
// //                       className={`border-2 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-200 ${
// //                         nearbySchool.preferred === "yes"
// //                           ? "border-green-200 bg-green-50"
// //                           : "border-gray-200"
// //                       }`}
// //                     >
// //                       <div className="flex justify-between items-start mb-4">
// //                         <div className="flex-1">
// //                           <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
// //                             {nearbySchool.school_name}
// //                           </h3>
// //                           <div className="flex items-center text-gray-600 mb-3">
// //                             <FiPhone className="mr-2" />
// //                             <span>{nearbySchool.mobile}</span>
// //                           </div>
// //                         </div>
// //                         <div className="ml-4">
// //                           <span
// //                             className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${
// //                               nearbySchool.distance_km < 2
// //                                 ? "bg-green-100 text-green-800"
// //                                 : "bg-blue-100 text-blue-800"
// //                             }`}
// //                           >
// //                             {nearbySchool.distance_km} km
// //                           </span>
// //                         </div>
// //                       </div>
// //                       <div className="flex justify-between items-center">
// //                         <span className="text-sm text-gray-500">
// //                           UDISE: {nearbySchool.udise_code}
// //                         </span>
// //                         {nearbySchool.preferred === "yes" && (
// //                           <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
// //                             Preferred
// //                           </span>
// //                         )}
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               ) : (
// //                 <div className="text-center py-12 bg-gray-50 rounded-xl">
// //                   <FiUsers className="text-gray-400 text-4xl mx-auto mb-4" />
// //                   <p className="text-gray-600 text-lg">No nearby schools found</p>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Right Column - Actions & Map */}
// //           <div className="space-y-8">
// //             {/* Quick Actions */}
// //             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
// //               <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
// //               <div className="space-y-4">
// //                 <button
// //                   onClick={() => navigate(-1)}
// //                   className="w-full flex items-center justify-center px-6 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
// //                 >
// //                   <FiArrowLeft className="mr-3" />
// //                   Back to Schools List
// //                 </button>
// //                 <a
// //                   href={`tel:${school.mobile}`}
// //                   className="block w-full flex items-center justify-center px-6 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
// //                 >
// //                   <FiPhone className="mr-3" />
// //                   Call School
// //                 </a>
// //                 <a
// //                   href={school.location_url}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className="block w-full flex items-center justify-center px-6 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
// //                 >
// //                   <FiNavigation className="mr-3" />
// //                   Get Directions
// //                 </a>
// //               </div>
// //             </div>

// //             {/* Map Preview */}
// //             <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 p-8">
// //               <h3 className="text-xl font-bold text-blue-900 mb-4">Location Preview</h3>
// //               <p className="text-blue-800 mb-6">
// //                 This school is located in {school.district}. Click the map link below for exact location.
// //               </p>
// //               <a
// //                 href={school.location_url}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
// //               >
// //                 <FiMapPin className="mr-3" />
// //                 Open Full Map
// //               </a>
// //             </div>

// //             {/* Information */}
// //             <div className="bg-gray-50 rounded-2xl border border-gray-300 p-8">
// //               <h3 className="text-lg font-bold text-gray-900 mb-4">About This Data</h3>
// //               <p className="text-gray-700 mb-4">
// //                 School information is sourced from official databases and includes verified contact details.
// //               </p>
// //               <div className="text-sm text-gray-500">
// //                 <p>Last updated: {new Date().toLocaleDateString()}</p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }




// // src/components/SchoolDetails.jsx
// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { fetchSchool } from "../api";
// import {
//   FiArrowLeft,
//   FiPhone,
//   FiMapPin,
//   FiNavigation,
//   FiGlobe,
//   FiUsers,
//   FiStar,
//   FiExternalLink,
//   FiHome,
// } from "react-icons/fi";
// import { toast } from "react-hot-toast";

// export default function SchoolDetails() {
//   const { udise } = useParams();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (udise) {
//       loadSchoolDetails();
//     }
//   }, [udise]);

//   const loadSchoolDetails = async () => {
//     try {
//       setLoading(true);
//       const schoolData = await fetchSchool(udise);
//       setData(schoolData);
//       toast.success("School details loaded");
//     } catch (err) {
//       toast.error("Failed to load school details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to open map for a nearby school
//   const openSchoolMap = (locationUrl, schoolName) => {
//     if (locationUrl) {
//       window.open(locationUrl, '_blank', 'noopener,noreferrer');
//     } else {
//       toast.error(`No map available for ${schoolName}`);
//     }
//   };

//   // Function to call a school
//   const callSchool = (phoneNumber, schoolName) => {
//     if (phoneNumber && phoneNumber.length >= 10) {
//       window.location.href = `tel:${phoneNumber}`;
//     } else {
//       toast.error(`No valid phone number for ${schoolName}`);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="animate-pulse">
//             <div className="h-8 w-32 bg-gray-200 rounded mb-8"></div>
//             <div className="h-64 bg-gray-200 rounded-2xl mb-10"></div>
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               <div className="lg:col-span-2">
//                 <div className="h-96 bg-gray-200 rounded-2xl mb-8"></div>
//                 <div className="h-64 bg-gray-200 rounded-2xl"></div>
//               </div>
//               <div className="h-48 bg-gray-200 rounded-2xl"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!data) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">School not found</h2>
//           <button
//             onClick={() => navigate(-1)}
//             className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const { school, nearby } = data;

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Back Button */}
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center text-blue-600 hover:text-blue-800 mb-8 group transition-colors"
//         >
//           <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
//           <span className="font-semibold">Back to Schools</span>
//         </button>

//         {/* School Header */}
//         <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-8 md:p-10 mb-10 text-white shadow-2xl">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
//             <div className="flex-1">
//               <div className="flex items-center mb-4">
//                 <FiStar className="mr-3 text-yellow-300" />
//                 <span className="text-sm font-semibold uppercase tracking-wider">
//                   SCHOOL DETAILS
//                 </span>
//               </div>
//               <h1 className="text-4xl md:text-5xl font-bold mb-6">
//                 {school.school_name}
//               </h1>
//               <div className="flex flex-wrap gap-3">
//                 <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
//                   <FiHome className="mr-2" />
//                   <span className="font-medium">{school.district}</span>
//                 </div>
//                 <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
//                   <span className="font-medium">UDISE: {school.udise_code}</span>
//                 </div>
//                 <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
//                   <span className="font-medium">PIN: {school.pincode}</span>
//                 </div>
//               </div>
//             </div>
//             <a
//               href={school.location_url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="mt-6 md:mt-0 inline-flex items-center px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
//             >
//               <FiNavigation className="mr-3 text-xl" />
//               Open in Google Maps
//             </a>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - School Info */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* School Information Card */}
//             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
//                 <FiGlobe className="mr-3 text-blue-600" />
//                 School Information
//               </h2>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 {/* Contact Information */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Details</h3>
//                   <div className="space-y-4">
//                     <div className="flex items-start">
//                       <FiPhone className="text-gray-400 mt-1 mr-3" />
//                       <div>
//                         <p className="text-sm text-gray-500">Phone Number</p>
//                         <p className="text-lg font-semibold">{school.mobile}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-start">
//                       <FiMapPin className="text-gray-400 mt-1 mr-3" />
//                       <div>
//                         <p className="text-sm text-gray-500">Location</p>
//                         <p className="text-gray-700 mb-2">PIN: {school.pincode}</p>
//                         <a
//                           href={school.location_url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
//                         >
//                           <FiNavigation className="mr-2" />
//                           View on Google Maps
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* School Details */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-4">School Details</h3>
//                   <div className="space-y-4">
//                     <div>
//                       <p className="text-sm text-gray-500">District</p>
//                       <p className="text-lg font-semibold">{school.district}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500">PIN Code</p>
//                       <p className="text-lg font-semibold">{school.pincode}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500">Coordinates</p>
//                       <p className="font-mono text-gray-700 text-sm">
//                         {school.latitude?.toFixed(6)}, {school.longitude?.toFixed(6)}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Nearby Schools */}
//             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
//               <div className="flex items-center justify-between mb-8">
//                 <h2 className="text-2xl font-bold text-gray-900 flex items-center">
//                   <FiUsers className="mr-3 text-blue-600" />
//                   Nearby Schools
//                   <span className="ml-4 px-4 py-1 bg-blue-100 text-blue-700 font-bold rounded-full">
//                     {nearby.length} schools nearby
//                   </span>
//                 </h2>
//               </div>

//               {nearby.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {nearby.map((nearbySchool, index) => (
//                     <div
//                       key={nearbySchool.udise_code}
//                       className={`border-2 rounded-xl p-6 hover:shadow-xl transition-all duration-200 cursor-pointer group ${
//                         nearbySchool.preferred === "yes"
//                           ? "border-green-300 bg-green-50 hover:bg-green-100"
//                           : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
//                       }`}
//                       onClick={() => openSchoolMap(nearbySchool.location_url, nearbySchool.school_name)}
//                       title={`Click to view ${nearbySchool.school_name} on map`}
//                     >
//                       <div className="flex justify-between items-start mb-4">
//                         <div className="flex-1">
//                           <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600">
//                             {nearbySchool.school_name}
//                           </h3>
//                           <div className="flex items-center text-gray-600 mb-3">
//                             <FiPhone className="mr-2" />
//                             <span 
//                               className="hover:text-blue-600 transition-colors"
//                               onClick={(e) => {
//                                 e.stopPropagation();
//                                 callSchool(nearbySchool.mobile, nearbySchool.school_name);
//                               }}
//                               title={`Call ${nearbySchool.mobile}`}
//                             >
//                               {nearbySchool.mobile}
//                             </span>
//                           </div>
//                         </div>
//                         <div className="ml-4">
//                           <span
//                             className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${
//                               nearbySchool.distance_km < 1
//                                 ? "bg-green-100 text-green-800"
//                                 : nearbySchool.distance_km < 2
//                                 ? "bg-yellow-100 text-yellow-800"
//                                 : "bg-blue-100 text-blue-800"
//                             }`}
//                           >
//                             {nearbySchool.distance_km} km
//                           </span>
//                         </div>
//                       </div>
                      
//                       <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
//                         <div className="flex items-center">
//                           <span className="text-sm text-gray-500">
//                             UDISE: {nearbySchool.udise_code}
//                           </span>
//                           {nearbySchool.preferred === "yes" && (
//                             <span className="ml-3 inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
//                               <FiStar className="mr-1" size={10} />
//                               Preferred
//                             </span>
//                           )}
//                         </div>
//                         <div className="flex items-center text-blue-600 group-hover:text-blue-800">
//                           <FiExternalLink className="mr-1" />
//                           <span className="text-sm font-medium">View Map</span>
//                         </div>
//                       </div>
                      
//                       {/* Quick Actions Row */}
//                       <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             navigate(`/school/${nearbySchool.udise_code}`);
//                           }}
//                           className="text-sm text-blue-600 hover:text-blue-800 font-medium"
//                           title={`View details of ${nearbySchool.school_name}`}
//                         >
//                           View Details →
//                         </button>
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             window.open(nearbySchool.location_url, '_blank', 'noopener,noreferrer');
//                           }}
//                           className="text-sm text-gray-600 hover:text-blue-600 font-medium flex items-center"
//                           title="Open map in new tab"
//                         >
//                           <FiExternalLink className="mr-1" size={12} />
//                           Open Map
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-12 bg-gray-50 rounded-xl">
//                   <FiUsers className="text-gray-400 text-4xl mx-auto mb-4" />
//                   <p className="text-gray-600 text-lg">No nearby schools found</p>
//                 </div>
//               )}
              
//               {/* Legend */}
//               <div className="mt-8 pt-6 border-t border-gray-200">
//                 <div className="flex flex-wrap gap-4 text-sm text-gray-600">
//                   <div className="flex items-center">
//                     <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
//                     <span>Distance &lt; 1 km</span>
//                   </div>
//                   <div className="flex items-center">
//                     <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
//                     <span>Distance 1-2 km</span>
//                   </div>
//                   <div className="flex items-center">
//                     <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
//                     <span>Distance &gt; 2 km</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Actions & Map */}
//           <div className="space-y-8">
//             {/* Quick Actions */}
//             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
//               <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
//               <div className="space-y-4">
//                 <button
//                   onClick={() => navigate(-1)}
//                   className="w-full flex items-center justify-center px-6 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
//                 >
//                   <FiArrowLeft className="mr-3" />
//                   Back to Schools List
//                 </button>
//                 <button
//                   onClick={() => callSchool(school.mobile, school.school_name)}
//                   className="w-full flex items-center justify-center px-6 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
//                 >
//                   <FiPhone className="mr-3" />
//                   Call School
//                 </button>
//                 <a
//                   href={school.location_url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="block w-full flex items-center justify-center px-6 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
//                 >
//                   <FiNavigation className="mr-3" />
//                   Get Directions
//                 </a>
//               </div>
//             </div>

//             {/* Map Preview */}
//             <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 p-8">
//               <h3 className="text-xl font-bold text-blue-900 mb-4">Location Preview</h3>
//               <div className="mb-6">
//                 <p className="text-blue-800 mb-2">
//                   <strong>Current School:</strong>
//                 </p>
//                 <p className="text-blue-700 mb-4">
//                   {school.school_name}
//                 </p>
//                 <div className="space-y-2 text-sm text-blue-800">
//                   <p><strong>District:</strong> {school.district}</p>
//                   <p><strong>PIN:</strong> {school.pincode}</p>
//                   <p><strong>Coordinates:</strong></p>
//                   <p className="font-mono text-xs">{school.latitude?.toFixed(6)}, {school.longitude?.toFixed(6)}</p>
//                 </div>
//               </div>
//               <a
//                 href={school.location_url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
//               >
//                 <FiMapPin className="mr-3" />
//                 Open Full Map
//               </a>
//             </div>

//             {/* Information */}
//             <div className="bg-gray-50 rounded-2xl border border-gray-300 p-8">
//               <h3 className="text-lg font-bold text-gray-900 mb-4">About This Data</h3>
//               <p className="text-gray-700 mb-4">
//                 School information is sourced from official databases and includes verified contact details.
//               </p>
//               <div className="text-sm text-gray-500 space-y-2">
//                 <p><strong>Mobile Numbers:</strong> Click to call the school directly</p>
//                 <p><strong>Nearby Schools:</strong> Click any school card to view its location on map</p>
//                 <p><strong>Distance Colors:</strong> Green (&lt;1km), Yellow (1-2km), Blue (&gt;2km)</p>
//                 <p className="mt-4"><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// // src/components/SchoolDetails.jsx
// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { fetchSchool } from "../api";
// import {
//   FiArrowLeft,
//   FiPhone,
//   FiMapPin,
//   FiNavigation,
//   FiGlobe,
//   FiUsers,
//   FiStar,
//   FiExternalLink,
//   FiHome,
//   FiEye,
// } from "react-icons/fi";
// import { toast } from "react-hot-toast";

// export default function SchoolDetails() {
//   const { udise } = useParams();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (udise) {
//       loadSchoolDetails();
//     }
//   }, [udise]);

//   const loadSchoolDetails = async () => {
//     try {
//       setLoading(true);
//       const schoolData = await fetchSchool(udise);
//       setData(schoolData);
//       toast.success("School details loaded");
//     } catch (err) {
//       toast.error("Failed to load school details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to open map for a nearby school
//   const openSchoolMap = (locationUrl, schoolName) => {
//     if (locationUrl) {
//       window.open(locationUrl, '_blank', 'noopener,noreferrer');
//     } else {
//       toast.error(`No map available for ${schoolName}`);
//     }
//   };

//   // Function to call a school
//   const callSchool = (phoneNumber, schoolName) => {
//     if (phoneNumber && phoneNumber.length >= 10) {
//       window.location.href = `tel:${phoneNumber}`;
//     } else {
//       toast.error(`No valid phone number for ${schoolName}`);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="animate-pulse">
//             <div className="h-8 w-32 bg-gray-200 rounded mb-8"></div>
//             <div className="h-64 bg-gray-200 rounded-2xl mb-10"></div>
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               <div className="lg:col-span-2">
//                 <div className="h-96 bg-gray-200 rounded-2xl mb-8"></div>
//                 <div className="h-64 bg-gray-200 rounded-2xl"></div>
//               </div>
//               <div className="h-48 bg-gray-200 rounded-2xl"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!data) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">School not found</h2>
//           <button
//             onClick={() => navigate(-1)}
//             className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const { school, nearby } = data;

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Back Button */}
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center text-blue-600 hover:text-blue-800 mb-8 group transition-colors"
//         >
//           <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
//           <span className="font-semibold">Back to Schools</span>
//         </button>

//         {/* School Header */}
//         <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-8 md:p-10 mb-10 text-white shadow-2xl">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
//             <div className="flex-1">
//               <div className="flex items-center mb-4">
//                 <FiStar className="mr-3 text-yellow-300" />
//                 <span className="text-sm font-semibold uppercase tracking-wider">
//                   SCHOOL DETAILS
//                 </span>
//               </div>
//               <h1 className="text-4xl md:text-5xl font-bold mb-6">
//                 {school.school_name}
//               </h1>
//               <div className="flex flex-wrap gap-3">
//                 <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
//                   <FiHome className="mr-2" />
//                   <span className="font-medium">{school.district}</span>
//                 </div>
//                 <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
//                   <span className="font-medium">UDISE: {school.udise_code}</span>
//                 </div>
//                 <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
//                   <span className="font-medium">PIN: {school.pincode}</span>
//                 </div>
//               </div>
//             </div>
//             <a
//               href={school.location_url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="mt-6 md:mt-0 inline-flex items-center px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
//             >
//               <FiNavigation className="mr-3 text-xl" />
//               Open in Google Maps
//             </a>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column - School Info */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* School Information Card */}
//             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
//                 <FiGlobe className="mr-3 text-blue-600" />
//                 School Information
//               </h2>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 {/* Contact Information */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Details</h3>
//                   <div className="space-y-4">
//                     <div className="flex items-start">
//                       <FiPhone className="text-gray-400 mt-1 mr-3" />
//                       <div>
//                         <p className="text-sm text-gray-500">Phone Number</p>
//                         <div className="flex items-center">
//                           <p className="text-lg font-semibold mr-3">{school.mobile}</p>
//                           <button
//                             onClick={() => callSchool(school.mobile, school.school_name)}
//                             className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-lg hover:bg-green-200 transition-colors"
//                             title="Call this school"
//                           >
//                             Call
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex items-start">
//                       <FiMapPin className="text-gray-400 mt-1 mr-3" />
//                       <div>
//                         <p className="text-sm text-gray-500">Location</p>
//                         <p className="text-gray-700 mb-2">PIN: {school.pincode}</p>
//                         <a
//                           href={school.location_url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 font-medium rounded-lg hover:bg-blue-200 transition-colors"
//                         >
//                           <FiNavigation className="mr-2" />
//                           View on Google Maps
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* School Details */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-800 mb-4">School Details</h3>
//                   <div className="space-y-4">
//                     <div>
//                       <p className="text-sm text-gray-500">District</p>
//                       <p className="text-lg font-semibold">{school.district}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500">PIN Code</p>
//                       <p className="text-lg font-semibold">{school.pincode}</p>
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-500">Coordinates</p>
//                       <p className="font-mono text-gray-700 text-sm">
//                         {school.latitude?.toFixed(6)}, {school.longitude?.toFixed(6)}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Nearby Schools */}
//             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
//               <div className="flex items-center justify-between mb-8">
//                 <h2 className="text-2xl font-bold text-gray-900 flex items-center">
//                   <FiUsers className="mr-3 text-blue-600" />
//                   Nearby Schools
//                   <span className="ml-4 px-4 py-1 bg-blue-100 text-blue-700 font-bold rounded-full">
//                     {nearby.length} schools nearby
//                   </span>
//                 </h2>
//               </div>

//               {nearby.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {nearby.map((nearbySchool, index) => (
//                     <div
//                       key={nearbySchool.udise_code}
//                       className={`border-2 rounded-xl p-6 hover:shadow-md transition-all duration-200 ${
//                         nearbySchool.preferred === "yes"
//                           ? "border-green-300 bg-green-50"
//                           : "border-gray-200 bg-white"
//                       }`}
//                     >
//                       <div className="flex justify-between items-start mb-4">
//                         <div className="flex-1">
//                           <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
//                             {nearbySchool.school_name}
//                           </h3>
//                           <div className="flex items-center text-gray-600 mb-3">
//                             <FiPhone className="mr-2" />
//                             <div className="flex items-center">
//                               <span className="mr-3">{nearbySchool.mobile}</span>
//                               <button
//                                 onClick={() => callSchool(nearbySchool.mobile, nearbySchool.school_name)}
//                                 className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded hover:bg-gray-200 transition-colors"
//                                 title={`Call ${nearbySchool.mobile}`}
//                               >
//                                 Call
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="ml-4">
//                           <span
//                             className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${
//                               nearbySchool.distance_km < 1
//                                 ? "bg-green-100 text-green-800"
//                                 : nearbySchool.distance_km < 2
//                                 ? "bg-yellow-100 text-yellow-800"
//                                 : "bg-blue-100 text-blue-800"
//                             }`}
//                             title={`${nearbySchool.distance_km} kilometers away`}
//                           >
//                             {nearbySchool.distance_km} km
//                           </span>
//                         </div>
//                       </div>
                      
//                       <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
//                         <div className="flex items-center">
//                           <span className="text-sm text-gray-500">
//                             UDISE: {nearbySchool.udise_code}
//                           </span>
//                           {nearbySchool.preferred === "yes" && (
//                             <span className="ml-3 inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
//                               <FiStar className="mr-1" size={10} />
//                               Preferred
//                             </span>
//                           )}
//                         </div>
//                       </div>
                      
//                       {/* Action Buttons */}
//                       <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
//                         <button
//                           onClick={() => navigate(`/school/${nearbySchool.udise_code}`)}
//                           className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100 transition-colors"
//                           title={`View details of ${nearbySchool.school_name}`}
//                         >
//                           <FiEye className="mr-2" />
//                           View Details
//                         </button>
                        
//                         <button
//                           onClick={() => openSchoolMap(nearbySchool.location_url, nearbySchool.school_name)}
//                           className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
//                           title="Open map in new tab"
//                         >
//                           <FiMapPin className="mr-2" />
//                           Open Map
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-12 bg-gray-50 rounded-xl">
//                   <FiUsers className="text-gray-400 text-4xl mx-auto mb-4" />
//                   <p className="text-gray-600 text-lg">No nearby schools found</p>
//                 </div>
//               )}
              
//               {/* Legend */}
//               <div className="mt-8 pt-6 border-t border-gray-200">
//                 <h4 className="text-sm font-semibold text-gray-700 mb-3">Distance Legend</h4>
//                 <div className="flex flex-wrap gap-4 text-sm text-gray-600">
//                   <div className="flex items-center">
//                     <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
//                     <span>Distance &lt; 1 km</span>
//                   </div>
//                   <div className="flex items-center">
//                     <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
//                     <span>Distance 1-2 km</span>
//                   </div>
//                   <div className="flex items-center">
//                     <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
//                     <span>Distance &gt; 2 km</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Actions & Map */}
//           <div className="space-y-8">
//             {/* Quick Actions */}
//             <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
//               <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
//               <div className="space-y-4">
//                 <button
//                   onClick={() => navigate(-1)}
//                   className="w-full flex items-center justify-center px-6 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
//                 >
//                   <FiArrowLeft className="mr-3" />
//                   Back to Schools List
//                 </button>
//                 <button
//                   onClick={() => callSchool(school.mobile, school.school_name)}
//                   className="w-full flex items-center justify-center px-6 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
//                 >
//                   <FiPhone className="mr-3" />
//                   Call School ({school.mobile})
//                 </button>
//                 <a
//                   href={school.location_url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="block w-full flex items-center justify-center px-6 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
//                 >
//                   <FiNavigation className="mr-3" />
//                   Get Directions
//                 </a>
//               </div>
//             </div>

//             {/* Map Preview */}
//             <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 p-8">
//               <h3 className="text-xl font-bold text-blue-900 mb-4">Location Preview</h3>
//               <div className="mb-6">
//                 <div className="flex items-center mb-3">
//                   <FiMapPin className="text-blue-600 mr-2" />
//                   <p className="font-semibold text-blue-800">Current School Location</p>
//                 </div>
//                 <div className="space-y-2 text-sm text-blue-800 bg-white/50 p-4 rounded-lg">
//                   <p><strong>Name:</strong> {school.school_name}</p>
//                   <p><strong>District:</strong> {school.district}</p>
//                   <p><strong>PIN:</strong> {school.pincode}</p>
//                   <p><strong>Coordinates:</strong></p>
//                   <p className="font-mono text-xs bg-blue-100 p-2 rounded">
//                     {school.latitude?.toFixed(6)}, {school.longitude?.toFixed(6)}
//                   </p>
//                 </div>
//               </div>
//               <a
//                 href={school.location_url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md"
//               >
//                 <FiNavigation className="mr-3" />
//                 Open in Google Maps
//               </a>
//             </div>

//             {/* Information */}
//             {/* <div className="bg-gray-50 rounded-2xl border border-gray-300 p-8">
//               <h3 className="text-lg font-bold text-gray-900 mb-4">Information</h3>
//               <div className="space-y-3 text-sm text-gray-600">
//                 <div className="flex items-start">
//                   <div className="bg-blue-100 text-blue-600 rounded-full p-1 mr-3">
//                     <FiEye size={14} />
//                   </div>
//                   <p><strong>View Details:</strong> Click to see complete school information</p>
//                 </div>
//                 <div className="flex items-start">
//                   <div className="bg-green-100 text-green-600 rounded-full p-1 mr-3">
//                     <FiPhone size={14} />
//                   </div>
//                   <p><strong>Call Button:</strong> Calls the school directly</p>
//                 </div>
//                 <div className="flex items-start">
//                   <div className="bg-gray-100 text-gray-600 rounded-full p-1 mr-3">
//                     <FiMapPin size={14} />
//                   </div>
//                   <p><strong>Open Map:</strong> Opens school location in Google Maps</p>
//                 </div>
//                 <div className="pt-4 mt-4 border-t border-gray-200 text-xs text-gray-500">
//                   <p>Data updated: {new Date(school.updatedAt || Date.now()).toLocaleDateString()}</p>
//                 </div>
//               </div>
//             </div> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




















// // src/components/SchoolDetails.jsx
// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { fetchSchool } from "../api";
// import {
//   FiArrowLeft,
//   FiPhone,
//   FiMapPin,
//   FiNavigation,
//   FiGlobe,
//   FiUsers,
//   FiStar,
//   FiExternalLink,
//   FiHome,
//   FiEye,
// } from "react-icons/fi";
// import { toast } from "react-hot-toast";

// export default function SchoolDetails() {
//   const { udise } = useParams();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (udise) {
//       loadSchoolDetails();
//     }
//   }, [udise]);

//   const loadSchoolDetails = async () => {
//     try {
//       setLoading(true);
//       const schoolData = await fetchSchool(udise);
//       setData(schoolData);
//       toast.success("School details loaded");
//     } catch (err) {
//       toast.error("Failed to load school details");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to open map for a nearby school
//   const openSchoolMap = (locationUrl, schoolName) => {
//     if (locationUrl) {
//       window.open(locationUrl, '_blank', 'noopener,noreferrer');
//     } else {
//       toast.error(`No map available for ${schoolName}`);
//     }
//   };

//   // Function to call a school
//   const callSchool = (phoneNumber, schoolName) => {
//     if (phoneNumber && phoneNumber.length >= 10) {
//       window.location.href = `tel:${phoneNumber}`;
//     } else {
//       toast.error(`No valid phone number for ${schoolName}`);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//         <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
//           <div className="animate-pulse">
//             <div className="h-6 sm:h-8 w-24 sm:w-32 bg-gray-200 rounded mb-6 sm:mb-8"></div>
//             <div className="h-48 sm:h-56 md:h-64 bg-gray-200 rounded-xl sm:rounded-2xl mb-6 sm:mb-8 md:mb-10"></div>
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
//               <div className="lg:col-span-2">
//                 <div className="h-64 sm:h-72 md:h-96 bg-gray-200 rounded-xl sm:rounded-2xl mb-6 sm:mb-8"></div>
//                 <div className="h-48 sm:h-56 md:h-64 bg-gray-200 rounded-xl sm:rounded-2xl"></div>
//               </div>
//               <div className="h-40 sm:h-48 bg-gray-200 rounded-xl sm:rounded-2xl"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!data) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
//         <div className="text-center max-w-md">
//           <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">School not found</h2>
//           <button
//             onClick={() => navigate(-1)}
//             className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const { school, nearby } = data;

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
//         {/* Back Button */}
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center text-blue-600 hover:text-blue-800 mb-4 sm:mb-6 md:mb-8 group transition-colors text-sm sm:text-base"
//         >
//           <FiArrowLeft className="mr-1 sm:mr-2 group-hover:-translate-x-1 transition-transform" size={18} />
//           <span className="font-semibold">Back to Schools</span>
//         </button>

//         {/* School Header */}
//         <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 mb-6 sm:mb-8 md:mb-10 text-white shadow-xl sm:shadow-2xl">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
//             <div className="flex-1 w-full">
//               <div className="flex items-center mb-3 sm:mb-4">
//                 <FiStar className="mr-2 sm:mr-3 text-yellow-300" size={18} />
//                 <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider">
//                   SCHOOL DETAILS
//                 </span>
//               </div>
//               <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 break-words">
//                 {school.school_name}
//               </h1>
//               <div className="flex flex-wrap gap-2 sm:gap-3">
//                 <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm">
//                   <FiHome className="mr-1 sm:mr-2" size={14} />
//                   <span className="font-medium">{school.district}</span>
//                 </div>
//                 <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm">
//                   <span className="font-medium">UDISE: {school.udise_code}</span>
//                 </div>
//                 <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm">
//                   <span className="font-medium">PIN: {school.pincode}</span>
//                 </div>
//               </div>
//             </div>
//             <a
//               href={school.location_url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="mt-4 md:mt-0 w-full md:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-white text-blue-600 font-bold rounded-lg sm:rounded-xl hover:bg-gray-100 transition-colors shadow-lg text-sm sm:text-base"
//             >
//               <FiNavigation className="mr-2 sm:mr-3" size={18} />
//               Open in Maps
//             </a>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
//           {/* Left Column - School Info */}
//           <div className="lg:col-span-2 space-y-4 sm:space-y-6 md:space-y-8">
//             {/* School Information Card */}
//             <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 md:p-8">
//               <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
//                 <FiGlobe className="mr-2 sm:mr-3 text-blue-600" size={20} />
//                 School Information
//               </h2>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
//                 {/* Contact Information */}
//                 <div>
//                   <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Contact Details</h3>
//                   <div className="space-y-3 sm:space-y-4">
//                     <div className="flex items-start">
//                       <FiPhone className="text-gray-400 mt-0.5 sm:mt-1 mr-2 sm:mr-3" size={18} />
//                       <div className="flex-1">
//                         <p className="text-xs sm:text-sm text-gray-500">Phone Number</p>
//                         <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
//                           <p className="text-base sm:text-lg font-semibold break-all">{school.mobile}</p>
//                           <button
//                             onClick={() => callSchool(school.mobile, school.school_name)}
//                             className="px-2 sm:px-3 py-1 bg-green-100 text-green-700 text-xs sm:text-sm font-medium rounded-lg hover:bg-green-200 transition-colors w-full sm:w-auto"
//                             title="Call this school"
//                           >
//                             Call
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex items-start">
//                       <FiMapPin className="text-gray-400 mt-0.5 sm:mt-1 mr-2 sm:mr-3" size={18} />
//                       <div className="flex-1">
//                         <p className="text-xs sm:text-sm text-gray-500">Location</p>
//                         <p className="text-gray-700 mb-2 text-sm sm:text-base">PIN: {school.pincode}</p>
//                         <a
//                           href={school.location_url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="inline-flex items-center justify-center sm:justify-start px-3 sm:px-4 py-2 bg-blue-100 text-blue-700 font-medium rounded-lg hover:bg-blue-200 transition-colors text-sm w-full sm:w-auto"
//                         >
//                           <FiNavigation className="mr-2" size={16} />
//                           View on Maps
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* School Details */}
//                 <div>
//                   <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">School Details</h3>
//                   <div className="space-y-3 sm:space-y-4">
//                     <div>
//                       <p className="text-xs sm:text-sm text-gray-500">District</p>
//                       <p className="text-base sm:text-lg font-semibold">{school.district}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs sm:text-sm text-gray-500">PIN Code</p>
//                       <p className="text-base sm:text-lg font-semibold">{school.pincode}</p>
//                     </div>
//                     <div>
//                       <p className="text-xs sm:text-sm text-gray-500">Coordinates</p>
//                       <p className="font-mono text-gray-700 text-xs sm:text-sm break-all">
//                         {school.latitude?.toFixed(6)}, {school.longitude?.toFixed(6)}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Nearby Schools */}
//             <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 md:p-8">
//               <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 md:mb-8">
//                 <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center mb-2 sm:mb-0">
//                   <FiUsers className="mr-2 sm:mr-3 text-blue-600" size={20} />
//                   Nearby Schools
//                 </h2>
//                 <span className="px-3 py-1 bg-blue-100 text-blue-700 font-bold rounded-full text-sm sm:text-base">
//                   {nearby.length} schools nearby
//                 </span>
//               </div>

//               {nearby.length > 0 ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
//                   {nearby.map((nearbySchool, index) => (
//                     <div
//                       key={nearbySchool.udise_code}
//                       className={`border-2 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:shadow-md transition-all duration-200 ${
//                         nearbySchool.preferred === "yes"
//                           ? "border-green-300 bg-green-50"
//                           : "border-gray-200 bg-white"
//                       }`}
//                     >
//                       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4">
//                         <div className="flex-1 mb-3 sm:mb-0">
//                           <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-sm sm:text-base">
//                             {nearbySchool.school_name}
//                           </h3>
//                           <div className="flex items-center text-gray-600 mb-2 text-xs sm:text-sm">
//                             <FiPhone className="mr-1 sm:mr-2" size={14} />
//                             <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
//                               <span className="break-all">{nearbySchool.mobile}</span>
//                               <button
//                                 onClick={() => callSchool(nearbySchool.mobile, nearbySchool.school_name)}
//                                 className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded hover:bg-gray-200 transition-colors w-full sm:w-auto"
//                                 title={`Call ${nearbySchool.mobile}`}
//                               >
//                                 Call
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="ml-0 sm:ml-4">
//                           <span
//                             className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold ${
//                               nearbySchool.distance_km < 1
//                                 ? "bg-green-100 text-green-800"
//                                 : nearbySchool.distance_km < 2
//                                 ? "bg-yellow-100 text-yellow-800"
//                                 : "bg-blue-100 text-blue-800"
//                             }`}
//                             title={`${nearbySchool.distance_km} kilometers away`}
//                           >
//                             {nearbySchool.distance_km} km
//                           </span>
//                         </div>
//                       </div>
                      
//                       <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
//                         <div className="flex items-center mb-2 sm:mb-0">
//                           <span className="text-xs sm:text-sm text-gray-500">
//                             UDISE: {nearbySchool.udise_code}
//                           </span>
//                           {nearbySchool.preferred === "yes" && (
//                             <span className="ml-2 inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
//                               <FiStar className="mr-1" size={10} />
//                               Preferred
//                             </span>
//                           )}
//                         </div>
//                       </div>
                      
//                       {/* Action Buttons */}
//                       <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 mt-4 pt-4 border-t border-gray-100">
//                         <button
//                           onClick={() => navigate(`/school/${nearbySchool.udise_code}`)}
//                           className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100 transition-colors text-sm w-full sm:w-auto"
//                           title={`View details of ${nearbySchool.school_name}`}
//                         >
//                           <FiEye className="mr-1 sm:mr-2" size={16} />
//                           View Details
//                         </button>
                        
//                         <button
//                           onClick={() => openSchoolMap(nearbySchool.location_url, nearbySchool.school_name)}
//                           className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors text-sm w-full sm:w-auto"
//                           title="Open map in new tab"
//                         >
//                           <FiMapPin className="mr-1 sm:mr-2" size={16} />
//                           Open Map
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-lg sm:rounded-xl">
//                   <FiUsers className="text-gray-400 text-3xl sm:text-4xl mx-auto mb-3 sm:mb-4" />
//                   <p className="text-gray-600 text-base sm:text-lg">No nearby schools found</p>
//                 </div>
//               )}
              
//               {/* Legend */}
//               <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
//                 <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Distance Legend</h4>
//                 <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
//                   <div className="flex items-center">
//                     <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full mr-1 sm:mr-2"></div>
//                     <span>Distance &lt; 1 km</span>
//                   </div>
//                   <div className="flex items-center">
//                     <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full mr-1 sm:mr-2"></div>
//                     <span>Distance 1-2 km</span>
//                   </div>
//                   <div className="flex items-center">
//                     <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full mr-1 sm:mr-2"></div>
//                     <span>Distance &gt; 2 km</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column - Actions & Map */}
//           <div className="space-y-4 sm:space-y-6 md:space-y-8">
//             {/* Quick Actions */}
//             <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 md:p-8">
//               <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Quick Actions</h3>
//               <div className="space-y-3 sm:space-y-4">
//                 <button
//                   onClick={() => navigate(-1)}
//                   className="w-full flex items-center justify-center px-4 sm:px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors text-sm sm:text-base"
//                 >
//                   <FiArrowLeft className="mr-2 sm:mr-3" size={18} />
//                   Back to List
//                 </button>
//                 <button
//                   onClick={() => callSchool(school.mobile, school.school_name)}
//                   className="w-full flex items-center justify-center px-4 sm:px-6 py-3 bg-green-600 text-white font-semibold rounded-lg sm:rounded-xl hover:bg-green-700 transition-colors text-sm sm:text-base"
//                 >
//                   <FiPhone className="mr-2 sm:mr-3" size={18} />
//                   Call School ({school.mobile})
//                 </button>
//                 <a
//                   href={school.location_url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="block w-full flex items-center justify-center px-4 sm:px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg sm:rounded-xl hover:bg-blue-700 transition-colors text-sm sm:text-base"
//                 >
//                   <FiNavigation className="mr-2 sm:mr-3" size={18} />
//                   Get Directions
//                 </a>
//               </div>
//             </div>

//             {/* Map Preview */}
//             <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl border-2 border-blue-200 p-4 sm:p-6 md:p-8">
//               <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3 sm:mb-4">Location Preview</h3>
//               <div className="mb-4 sm:mb-6">
//                 <div className="flex items-center mb-2 sm:mb-3">
//                   <FiMapPin className="text-blue-600 mr-1 sm:mr-2" size={18} />
//                   <p className="font-semibold text-blue-800 text-sm sm:text-base">Current School Location</p>
//                 </div>
//                 <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-blue-800 bg-white/50 p-3 sm:p-4 rounded-lg">
//                   <p><strong>Name:</strong> {school.school_name}</p>
//                   <p><strong>District:</strong> {school.district}</p>
//                   <p><strong>PIN:</strong> {school.pincode}</p>
//                   <p><strong>Coordinates:</strong></p>
//                   <p className="font-mono text-xs bg-blue-100 p-2 rounded break-all">
//                     {school.latitude?.toFixed(6)}, {school.longitude?.toFixed(6)}
//                   </p>
//                 </div>
//               </div>
//               <a
//                 href={school.location_url}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="inline-flex items-center justify-center w-full px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white font-semibold rounded-lg sm:rounded-xl hover:bg-blue-700 transition-colors shadow-md text-sm sm:text-base"
//               >
//                 <FiNavigation className="mr-2 sm:mr-3" size={18} />
//                 Open in Maps
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }











// src/components/SchoolDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSchool } from "../api";
import {
  FiArrowLeft,
  FiPhone,
  FiMapPin,
  FiNavigation,
  FiGlobe,
  FiUsers,
  FiStar,
  FiHome,
  FiEye,
  FiMap,
  FiNavigation2,
  FiTarget,
  FiRadio,
  FiCompass,
  FiRefreshCw,
  FiAlertCircle,
  FiWifiOff
} from "react-icons/fi";
import { toast } from "react-hot-toast";

export default function SchoolDetails() {
  const { udise } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [findingLocation, setFindingLocation] = useState(false);
  const [nearbySchoolsFromUser, setNearbySchoolsFromUser] = useState([]);
  const [showUserNearby, setShowUserNearby] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (udise) {
      loadSchoolDetails();
    }
  }, [udise]);

  const loadSchoolDetails = async () => {
    try {
      setLoading(true);
      const schoolData = await fetchSchool(udise);
      setData(schoolData);
      toast.success("School details loaded");
    } catch (err) {
      toast.error("Failed to load school details");
    } finally {
      setLoading(false);
    }
  };

  // Get user's current location with better error handling
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      setLocationError("browser_not_supported");
      return;
    }

    setFindingLocation(true);
    setLocationError(null);
    toast.loading("Getting your location... Please wait");

    const locationOptions = {
      enableHighAccuracy: true, // Better accuracy
      timeout: 15000, // 15 seconds timeout
      maximumAge: 0 // Don't use cached location
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
        
        // Find nearby schools from user's location
        findSchoolsNearUser(userLoc);
        setFindingLocation(false);
      },
      (error) => {
        toast.dismiss();
        setFindingLocation(false);
        
        let errorMessage = "";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please enable location services in your browser settings.";
            setLocationError("permission_denied");
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is currently unavailable. Please check your network connection.";
            setLocationError("position_unavailable");
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out. Please try again or check your internet connection.";
            setLocationError("timeout");
            break;
          default:
            errorMessage = "An unknown error occurred while getting location.";
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
      enableHighAccuracy: false, // Lower accuracy but faster
      timeout: 10000, // 10 seconds
      maximumAge: 60000 // Use cached location if available (1 minute)
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
        toast.success("Location found with low accuracy!");
        
        findSchoolsNearUser(userLoc);
        setFindingLocation(false);
      },
      (error) => {
        toast.dismiss();
        setFindingLocation(false);
        toast.error("Still unable to get location. Please check your device settings.");
      },
      lowAccuracyOptions
    );
  };

  // Calculate distance between two coordinates in kilometers
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
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
    if (!data || !data.nearby) {
      toast.error("No school data available");
      return;
    }

    // Combine current school and nearby schools
    const allSchools = [
      {
        ...data.school,
        distance_km: calculateDistance(
          userLoc.lat,
          userLoc.lng,
          data.school.latitude,
          data.school.longitude
        )
      },
      ...data.nearby.map(school => ({
        ...school,
        distance_km: calculateDistance(
          userLoc.lat,
          userLoc.lng,
          school.latitude,
          school.longitude
        )
      }))
    ];

    // Sort by distance and get top 5
    const sortedSchools = allSchools
      .sort((a, b) => a.distance_km - b.distance_km)
      .slice(0, 5);

    setNearbySchoolsFromUser(sortedSchools);
    setShowUserNearby(true);
    
    toast.success(`Found ${sortedSchools.length} schools near you`);
  };

  // Function to open map for a nearby school
  const openSchoolMap = (locationUrl, schoolName) => {
    if (locationUrl) {
      window.open(locationUrl, '_blank', 'noopener,noreferrer');
    } else {
      toast.error(`No map available for ${schoolName}`);
    }
  };

  // Function to open directions from user location to school
  const openDirections = (schoolLat, schoolLng, schoolName) => {
    if (!userLocation) {
      toast.error("Please get your location first");
      return;
    }

    const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${schoolLat},${schoolLng}&travelmode=driving`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Function to call a school
  const callSchool = (phoneNumber, schoolName) => {
    if (phoneNumber && phoneNumber.length >= 10) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      toast.error(`No valid phone number for ${schoolName}`);
    }
  };

  // Get location error message
  const getLocationErrorHelp = () => {
    if (!locationError) return null;
    
    const tips = {
      permission_denied: [
        "Click the lock icon (🔒) in your browser's address bar",
        "Select 'Site settings' or 'Permissions'",
        "Allow location access for this site",
        "Refresh the page and try again"
      ],
      position_unavailable: [
        "Check if your device has GPS/Location enabled",
        "Ensure you have internet connection",
        "Try moving to an open area with better signal",
        "Restart your device's location services"
      ],
      timeout: [
        "Check your internet connection",
        "Move to an area with better network coverage",
        "Try using Wi-Fi instead of mobile data",
        "Click 'Try with Low Accuracy' below"
      ],
      browser_not_supported: [
        "Update your browser to the latest version",
        "Try using Chrome, Firefox, or Safari",
        "Enable JavaScript in browser settings",
        "Check if location services are enabled in OS"
      ],
      unknown: [
        "Refresh the page and try again",
        "Clear browser cache and cookies",
        "Try a different browser",
        "Check device location settings"
      ]
    };

    return tips[locationError] || tips.unknown;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          <div className="animate-pulse">
            <div className="h-6 sm:h-8 w-24 sm:w-32 bg-gray-200 rounded mb-6 sm:mb-8"></div>
            <div className="h-48 sm:h-56 md:h-64 bg-gray-200 rounded-xl sm:rounded-2xl mb-6 sm:mb-8 md:mb-10"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              <div className="lg:col-span-2">
                <div className="h-64 sm:h-72 md:h-96 bg-gray-200 rounded-xl sm:rounded-2xl mb-6 sm:mb-8"></div>
                <div className="h-48 sm:h-56 md:h-64 bg-gray-200 rounded-xl sm:rounded-2xl"></div>
              </div>
              <div className="h-40 sm:h-48 bg-gray-200 rounded-xl sm:rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">School not found</h2>
          <button
            onClick={() => navigate(-1)}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const { school, nearby } = data;
  const errorHelp = getLocationErrorHelp();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4 sm:mb-6 md:mb-8 group transition-colors text-sm sm:text-base"
        >
          <FiArrowLeft className="mr-1 sm:mr-2 group-hover:-translate-x-1 transition-transform" size={18} />
          <span className="font-semibold">Back to Schools</span>
        </button>

        {/* School Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 mb-6 sm:mb-8 md:mb-10 text-white shadow-xl sm:shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex-1 w-full">
              <div className="flex items-center mb-3 sm:mb-4">
                <FiStar className="mr-2 sm:mr-3 text-yellow-300" size={18} />
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider">
                  SCHOOL DETAILS
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 break-words">
                {school.school_name}
              </h1>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm">
                  <FiHome className="mr-1 sm:mr-2" size={14} />
                  <span className="font-medium">{school.district}</span>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm">
                  <span className="font-medium">UDISE: {school.udise_code}</span>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm">
                  <span className="font-medium">PIN: {school.pincode}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:gap-3 mt-4 md:mt-0 w-full md:w-auto">
              <a
                href={school.location_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-white text-blue-600 font-bold rounded-lg sm:rounded-xl hover:bg-gray-100 transition-colors shadow-lg text-sm sm:text-base"
              >
                <FiNavigation className="mr-2 sm:mr-3" size={18} />
                Open in Maps
              </a>
              <button
                onClick={getUserLocation}
                disabled={findingLocation}
                className={`w-full md:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 font-bold rounded-lg sm:rounded-xl transition-colors shadow-lg text-sm sm:text-base ${
                  findingLocation
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : userLocation
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : locationError
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-orange-500 text-white hover:bg-orange-600'
                }`}
              >
                {findingLocation ? (
                  <>
                    <FiRadio className="mr-2 sm:mr-3 animate-spin" size={18} />
                    Finding Location...
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
        </div>

        {/* Location Error Help Section */}
        {locationError && !userLocation && (
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl sm:rounded-2xl shadow-lg border-2 border-red-200 p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex items-start mb-4">
              <FiAlertCircle className="text-red-600 mt-1 mr-3 flex-shrink-0" size={24} />
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-red-900 mb-2">
                  Location Access Issue
                </h3>
                <p className="text-red-700 mb-4">
                  {locationError === "permission_denied" && "Location permission was denied."}
                  {locationError === "position_unavailable" && "Location information is unavailable."}
                  {locationError === "timeout" && "Location request timed out."}
                  {locationError === "browser_not_supported" && "Your browser doesn't support location."}
                  {locationError === "unknown" && "Could not get your location."}
                </p>
                
                <div className="bg-white p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Troubleshooting Steps:</h4>
                  <ul className="space-y-2">
                    {errorHelp && errorHelp.map((tip, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-700">
                        <span className="text-red-500 mr-2">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={getUserLocation}
                    className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <FiRefreshCw className="mr-2" size={18} />
                    Try Again
                  </button>
                  
                  {locationError === "timeout" && (
                    <button
                      onClick={retryLocationWithLowAccuracy}
                      className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors text-sm"
                    >
                      <FiWifiOff className="mr-2" size={18} />
                      Try with Low Accuracy
                    </button>
                  )}
                  
                  <button
                    onClick={() => setLocationError(null)}
                    className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors text-sm"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Left Column - School Info */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 md:space-y-8">
            {/* User Location Section - Only shows when location is found */}
            {showUserNearby && userLocation && nearbySchoolsFromUser.length > 0 && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl shadow-lg border-2 border-green-200 p-4 sm:p-6 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-green-900 flex items-center mb-2 sm:mb-0">
                    <FiTarget className="mr-2 sm:mr-3 text-green-600" size={20} />
                    Schools Near Your Location
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-800 font-bold rounded-full text-sm sm:text-base">
                      Your Location
                    </span>
                    <button
                      onClick={() => setShowUserNearby(false)}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Hide
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {nearbySchoolsFromUser.map((nearbySchool, index) => (
                    <div
                      key={nearbySchool.udise_code || `user-nearby-${index}`}
                      className={`border-2 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:shadow-md transition-all duration-200 ${
                        nearbySchool.udise_code === school.udise_code
                          ? 'border-blue-300 bg-blue-50'
                          : 'border-green-200 bg-white'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4">
                        <div className="flex-1 mb-3 sm:mb-0">
                          <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-sm sm:text-base">
                            {nearbySchool.school_name}
                            {nearbySchool.udise_code === school.udise_code && (
                              <span className="ml-2 inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded">
                                Current School
                              </span>
                            )}
                          </h3>
                          <div className="flex items-center text-gray-600 mb-2 text-xs sm:text-sm">
                            <FiPhone className="mr-1 sm:mr-2" size={14} />
                            <span className="break-all">{nearbySchool.mobile}</span>
                          </div>
                        </div>
                        <div className="ml-0 sm:ml-4">
                          <span
                            className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold ${
                              nearbySchool.distance_km < 1
                                ? "bg-green-100 text-green-800"
                                : nearbySchool.distance_km < 3
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-orange-100 text-orange-800"
                            }`}
                            title={`${nearbySchool.distance_km.toFixed(2)} kilometers from you`}
                          >
                            {nearbySchool.distance_km.toFixed(2)} km
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
                        <div className="flex items-center mb-2 sm:mb-0">
                          {nearbySchool.udise_code && (
                            <span className="text-xs sm:text-sm text-gray-500">
                              UDISE: {nearbySchool.udise_code}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 mt-4 pt-4 border-t border-gray-100">
                        {nearbySchool.udise_code && nearbySchool.udise_code !== school.udise_code ? (
                          <button
                            onClick={() => navigate(`/school/${nearbySchool.udise_code}`)}
                            className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100 transition-colors text-sm w-full sm:w-auto"
                          >
                            <FiEye className="mr-1 sm:mr-2" size={16} />
                            View Details
                          </button>
                        ) : (
                          <div className="w-full sm:w-auto"></div>
                        )}
                        
                        <div className="flex gap-2 w-full sm:w-auto">
                          <button
                            onClick={() => openDirections(nearbySchool.latitude, nearbySchool.longitude, nearbySchool.school_name)}
                            className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-green-100 text-green-700 font-medium rounded-lg hover:bg-green-200 transition-colors text-sm flex-1 sm:flex-none"
                            title="Get directions from your location"
                          >
                            <FiNavigation2 className="mr-1 sm:mr-2" size={16} />
                            Directions
                          </button>
                          
                          <button
                            onClick={() => openSchoolMap(nearbySchool.location_url, nearbySchool.school_name)}
                            className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors text-sm flex-1 sm:flex-none"
                          >
                            <FiMap className="mr-1 sm:mr-2" size={16} />
                            Map
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* School Information Card */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 md:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
                <FiGlobe className="mr-2 sm:mr-3 text-blue-600" size={20} />
                School Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                {/* Contact Information */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">Contact Details</h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start">
                      <FiPhone className="text-gray-400 mt-0.5 sm:mt-1 mr-2 sm:mr-3" size={18} />
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm text-gray-500">Phone Number</p>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
                          <p className="text-base sm:text-lg font-semibold break-all">{school.mobile}</p>
                          <button
                            onClick={() => callSchool(school.mobile, school.school_name)}
                            className="px-2 sm:px-3 py-1 bg-green-100 text-green-700 text-xs sm:text-sm font-medium rounded-lg hover:bg-green-200 transition-colors w-full sm:w-auto"
                            title="Call this school"
                          >
                            Call
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FiMapPin className="text-gray-400 mt-0.5 sm:mt-1 mr-2 sm:mr-3" size={18} />
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm text-gray-500">Location</p>
                        <p className="text-gray-700 mb-2 text-sm sm:text-base">PIN: {school.pincode}</p>
                        <a
                          href={school.location_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center sm:justify-start px-3 sm:px-4 py-2 bg-blue-100 text-blue-700 font-medium rounded-lg hover:bg-blue-200 transition-colors text-sm w-full sm:w-auto"
                        >
                          <FiNavigation className="mr-2" size={16} />
                          View on Maps
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* School Details */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">School Details</h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500">District</p>
                      <p className="text-base sm:text-lg font-semibold">{school.district}</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500">PIN Code</p>
                      <p className="text-base sm:text-lg font-semibold">{school.pincode}</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-500">Coordinates</p>
                      <p className="font-mono text-gray-700 text-xs sm:text-sm break-all">
                        {school.latitude?.toFixed(6)}, {school.longitude?.toFixed(6)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nearby Schools */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 md:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center mb-2 sm:mb-0">
                  <FiUsers className="mr-2 sm:mr-3 text-blue-600" size={20} />
                  Nearby Schools
                </h2>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 font-bold rounded-full text-sm sm:text-base">
                  {nearby.length} schools nearby
                </span>
              </div>

              {nearby.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {nearby.map((nearbySchool, index) => (
                    <div
                      key={nearbySchool.udise_code}
                      className={`border-2 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:shadow-md transition-all duration-200 ${
                        nearbySchool.preferred === "yes"
                          ? "border-green-300 bg-green-50"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4">
                        <div className="flex-1 mb-3 sm:mb-0">
                          <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-sm sm:text-base">
                            {nearbySchool.school_name}
                          </h3>
                          <div className="flex items-center text-gray-600 mb-2 text-xs sm:text-sm">
                            <FiPhone className="mr-1 sm:mr-2" size={14} />
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                              <span className="break-all">{nearbySchool.mobile}</span>
                              <button
                                onClick={() => callSchool(nearbySchool.mobile, nearbySchool.school_name)}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded hover:bg-gray-200 transition-colors w-full sm:w-auto"
                                title={`Call ${nearbySchool.mobile}`}
                              >
                                Call
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="ml-0 sm:ml-4">
                          <span
                            className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold ${
                              nearbySchool.distance_km < 1
                                ? "bg-green-100 text-green-800"
                                : nearbySchool.distance_km < 2
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                            title={`${nearbySchool.distance_km} kilometers away`}
                          >
                            {nearbySchool.distance_km} km
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
                        <div className="flex items-center mb-2 sm:mb-0">
                          <span className="text-xs sm:text-sm text-gray-500">
                            UDISE: {nearbySchool.udise_code}
                          </span>
                          {nearbySchool.preferred === "yes" && (
                            <span className="ml-2 inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
                              <FiStar className="mr-1" size={10} />
                              Preferred
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 mt-4 pt-4 border-t border-gray-100">
                        <button
                          onClick={() => navigate(`/school/${nearbySchool.udise_code}`)}
                          className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-blue-50 text-blue-700 font-medium rounded-lg hover:bg-blue-100 transition-colors text-sm w-full sm:w-auto"
                          title={`View details of ${nearbySchool.school_name}`}
                        >
                          <FiEye className="mr-1 sm:mr-2" size={16} />
                          View Details
                        </button>
                        
                        <button
                          onClick={() => openSchoolMap(nearbySchool.location_url, nearbySchool.school_name)}
                          className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors text-sm w-full sm:w-auto"
                          title="Open map in new tab"
                        >
                          <FiMapPin className="mr-1 sm:mr-2" size={16} />
                          Open Map
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-lg sm:rounded-xl">
                  <FiUsers className="text-gray-400 text-3xl sm:text-4xl mx-auto mb-3 sm:mb-4" />
                  <p className="text-gray-600 text-base sm:text-lg">No nearby schools found</p>
                </div>
              )}
              
              {/* Legend */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">Distance Legend</h4>
                <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full mr-1 sm:mr-2"></div>
                    <span>Distance &lt; 1 km</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full mr-1 sm:mr-2"></div>
                    <span>Distance 1-2 km</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full mr-1 sm:mr-2"></div>
                    <span>Distance &gt; 2 km</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Actions & Map */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-4 sm:p-6 md:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Quick Actions</h3>
              <div className="space-y-3 sm:space-y-4">
                <button
                  onClick={() => navigate(-1)}
                  className="w-full flex items-center justify-center px-4 sm:px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors text-sm sm:text-base"
                >
                  <FiArrowLeft className="mr-2 sm:mr-3" size={18} />
                  Back to List
                </button>
                
                <button
                  onClick={getUserLocation}
                  disabled={findingLocation}
                  className={`w-full flex items-center justify-center px-4 sm:px-6 py-3 font-semibold rounded-lg sm:rounded-xl transition-colors text-sm sm:text-base ${
                    findingLocation
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : userLocation
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : locationError
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-orange-500 text-white hover:bg-orange-600'
                  }`}
                >
                  {findingLocation ? (
                    <>
                      <FiRadio className="mr-2 sm:mr-3 animate-spin" size={18} />
                      Finding Location...
                    </>
                  ) : userLocation ? (
                    <>
                      <FiTarget className="mr-2 sm:mr-3" size={18} />
                      Find Schools Near Me
                    </>
                  ) : locationError ? (
                    <>
                      <FiAlertCircle className="mr-2 sm:mr-3" size={18} />
                      Try Get Location
                    </>
                  ) : (
                    <>
                      <FiCompass className="mr-2 sm:mr-3" size={18} />
                      Get My Location
                    </>
                  )}
                </button>
                
                {locationError === "timeout" && (
                  <button
                    onClick={retryLocationWithLowAccuracy}
                    className="w-full flex items-center justify-center px-4 sm:px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg sm:rounded-xl hover:bg-orange-600 transition-colors text-sm sm:text-base"
                  >
                    <FiWifiOff className="mr-2 sm:mr-3" size={18} />
                    Try with Low Accuracy
                  </button>
                )}
                
                <button
                  onClick={() => callSchool(school.mobile, school.school_name)}
                  className="w-full flex items-center justify-center px-4 sm:px-6 py-3 bg-green-600 text-white font-semibold rounded-lg sm:rounded-xl hover:bg-green-700 transition-colors text-sm sm:text-base"
                >
                  <FiPhone className="mr-2 sm:mr-3" size={18} />
                  Call School ({school.mobile})
                </button>
                
                <a
                  href={school.location_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full flex items-center justify-center px-4 sm:px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg sm:rounded-xl hover:bg-blue-700 transition-colors text-sm sm:text-base"
                >
                  <FiNavigation className="mr-2 sm:mr-3" size={18} />
                  Get Directions
                </a>
              </div>
            </div>

            {/* Map Preview */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl border-2 border-blue-200 p-4 sm:p-6 md:p-8">
              <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-3 sm:mb-4">Location Preview</h3>
              <div className="mb-4 sm:mb-6">
                <div className="flex items-center mb-2 sm:mb-3">
                  <FiMapPin className="text-blue-600 mr-1 sm:mr-2" size={18} />
                  <p className="font-semibold text-blue-800 text-sm sm:text-base">Current School Location</p>
                </div>
                <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-blue-800 bg-white/50 p-3 sm:p-4 rounded-lg">
                  <p><strong>Name:</strong> {school.school_name}</p>
                  <p><strong>District:</strong> {school.district}</p>
                  <p><strong>PIN:</strong> {school.pincode}</p>
                  <p><strong>Coordinates:</strong></p>
                  <p className="font-mono text-xs bg-blue-100 p-2 rounded break-all">
                    {school.latitude?.toFixed(6)}, {school.longitude?.toFixed(6)}
                  </p>
                </div>
              </div>
              
              {userLocation && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <FiTarget className="text-green-600 mr-2" size={16} />
                      <p className="font-semibold text-green-800 text-sm">Your Location</p>
                    </div>
                    {userLocation.accuracy && (
                      <span className="text-xs text-green-600">
                        ±{Math.round(userLocation.accuracy)}m
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-green-700 font-mono break-all">
                    {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}
                  </p>
                </div>
              )}
              
              <div className="space-y-3">
                <a
                  href={school.location_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white font-semibold rounded-lg sm:rounded-xl hover:bg-blue-700 transition-colors shadow-md text-sm sm:text-base"
                >
                  <FiNavigation className="mr-2 sm:mr-3" size={18} />
                  Open in Maps
                </a>
                
                {userLocation && (
                  <button
                    onClick={() => openDirections(school.latitude, school.longitude, school.school_name)}
                    className="inline-flex items-center justify-center w-full px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white font-semibold rounded-lg sm:rounded-xl hover:bg-green-700 transition-colors shadow-md text-sm sm:text-base"
                  >
                    <FiNavigation2 className="mr-2 sm:mr-3" size={18} />
                    Directions from You
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}