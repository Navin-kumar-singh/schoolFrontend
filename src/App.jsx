// // src/App.jsx
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import Districts from "./components/Districts";
// import Schools from "./components/Schools";
// import SchoolDetails from "./components/SchoolDetails";
// import "./App.css";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
//         {/* Navigation Header */}
//         <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex justify-between items-center h-20">
//               <div className="flex items-center">
//                 <div className="p-3 bg-blue-600 rounded-xl mr-4">
//                   <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
//                       d="M12 14l9-5-9-5-9 5 9 5z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
//                       d="M12 14l9-5-9-5-9 5 9 5z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
//                       d="M12 14v6l9-5M12 20l-9-5" />
//                   </svg>
//                 </div>
//                 <div>
//                   <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                     School Directory
//                   </h1>
//                   <p className="text-sm text-gray-500">Find schools across districts</p>
//                 </div>
//               </div>
//               <div className="hidden md:block">
//                 <nav className="flex space-x-8">
//                   <a href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
//                     Districts
//                   </a>
//                   <span className="text-gray-300">|</span>
//                   <span className="text-gray-500">Search Schools</span>
//                 </nav>
//               </div>
//             </div>
//           </div>
//         </header>

//         <main>
//           <Routes>
//             <Route path="/" element={<Districts />} />
//             <Route path="/district/:name" element={<Schools />} />
//             {/* <Route path="/school/:udise" element={<SchoolDetails />} /> */}
//           </Routes>
//         </main>

//         {/* Footer */}
//         <footer className="bg-gray-900 text-white mt-16">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               <div>
//                 <h3 className="text-xl font-bold mb-4">School Directory</h3>
//                 <p className="text-gray-400">
//                   Comprehensive directory of schools with contact details and locations.
//                 </p>
//               </div>
//               <div>
//                 <h4 className="font-semibold mb-4">Quick Links</h4>
//                 <ul className="space-y-2 text-gray-400">
//                   <li><a href="/" className="hover:text-white transition-colors">All Districts</a></li>
//                   <li><a href="#search" className="hover:text-white transition-colors">Search Schools</a></li>
//                 </ul>
//               </div>
//               <div>
//                 <h4 className="font-semibold mb-4">Contact</h4>
//                 <p className="text-gray-400">
//                   For any queries or updates, please contact the administration.
//                 </p>
//               </div>
//             </div>
//             <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
//               © {new Date().getFullYear()} School Directory. All rights reserved.
//             </div>
//           </div>
//         </footer>

//         <Toaster
//           position="top-right"
//           toastOptions={{
//             duration: 3000,
//             style: {
//               background: '#363636',
//               color: '#fff',
//             },
//             success: {
//               duration: 3000,
//               iconTheme: {
//                 primary: '#10B981',
//                 secondary: '#fff',
//               },
//             },
//             error: {
//               duration: 4000,
//               iconTheme: {
//                 primary: '#EF4444',
//                 secondary: '#fff',
//               },
//             },
//           }}
//         />
//       </div>
//     </BrowserRouter>
//   );
// }











// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Districts from "./components/Districts";
import Schools from "./components/Schools";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center">
                <div className="p-3 bg-blue-600 rounded-xl mr-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M12 14v6l9-5M12 20l-9-5" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    School Directory
                  </h1>
                  <p className="text-sm text-gray-500">Find schools across districts</p>
                </div>
              </div>
              <div className="hidden md:block">
                <nav className="flex space-x-8">
                  <a href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                    Districts
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Districts />} />
            <Route path="/district/:name" element={<Schools />} />
          </Routes>
        </main>

        <footer className="bg-gray-900 text-white mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">School Directory</h3>
                <p className="text-gray-400">
                  Comprehensive directory of schools with contact details and locations.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/" className="hover:text-white transition-colors">All Districts</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Contact</h4>
                <p className="text-gray-400">
                  For any queries or updates, please contact the administration.
                </p>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} School Directory. All rights reserved.
            </div>
          </div>
        </footer>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: { background: '#363636', color: '#fff' },
            success: { duration: 3000, iconTheme: { primary: '#10B981', secondary: '#fff' } },
            error: { duration: 4000, iconTheme: { primary: '#EF4444', secondary: '#fff' } },
          }}
        />
      </div>
    </BrowserRouter>
  );
}