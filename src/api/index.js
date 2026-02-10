// // src/api/index.js
// const API_BASE_URL = 'http://localhost:9000/api';

// // Fetch all districts
// export const fetchDistricts = async () => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/schools/districts`);
//     if (!response.ok) {
//       throw new Error('Failed to fetch districts');
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching districts:', error);
//     throw error;
//   }
// };

// // Fetch schools by district name
// export const fetchSchools = async (districtName) => {
//   try {
//     const cleanDistrictName = districtName.trim();
//     const response = await fetch(
//       `${API_BASE_URL}/schools/district/${encodeURIComponent(cleanDistrictName)}`
//     );
    
//     if (!response.ok) {
//       throw new Error(`Failed to fetch schools for ${cleanDistrictName}`);
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching schools:', error);
//     throw error;
//   }
// };

// // Fetch single school details by UDISE code
// export const fetchSchool = async (udiseCode) => {
//   try {
//     const response = await fetch(
//       `${API_BASE_URL}/schools/${udiseCode}`
//     );
    
//     if (!response.ok) {
//       throw new Error(`Failed to fetch school details for ${udiseCode}`);
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching school details:', error);
//     throw error;
//   }
// };

// src/api/index.js
// const API_BASE_URL = 'http://localhost:9000/api';



  const API_BASE_URL='https://schoolbackendforlocation.onrender.com/api'

// Fetch all districts
export const fetchDistricts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/schools/districts`);
    console.log(response, "this is my respone ................................................................................")
    if (!response.ok) {
      throw new Error('Failed to fetch districts');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching districts:', error);
    throw error;
  }
};

// Fetch schools by district name (existing - for Schools.jsx component)
export const fetchSchools = async (districtName) => {
  try {
    const cleanDistrictName = districtName.trim();
    const response = await fetch(
      `${API_BASE_URL}/schools/district/${encodeURIComponent(cleanDistrictName)}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch schools for ${cleanDistrictName}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching schools:', error);
    throw error;
  }
};

// Fetch single school details by UDISE code
export const fetchSchool = async (udiseCode) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/schools/${udiseCode}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch school details for ${udiseCode}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching school details:', error);
    throw error;
  }
};



// Add this function to your existing api.js
export const fetchAllSchools = async () => {
  try {
    // This would be your actual API endpoint that returns all schools
    const response = await fetch(`${API_BASE_URL}/api/schools/all`);
    if (!response.ok) throw new Error('Failed to fetch all schools');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching all schools:', error);
    throw error;
  }
};
// NEW: Fetch schools by district name for DistrictSchools.jsx component
export const fetchSchoolsByDistrict = async (districtName) => {
  try {
    const cleanDistrictName = districtName.trim();
    const response = await fetch(
      `${API_BASE_URL}/schools/district/${encodeURIComponent(cleanDistrictName)}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch district schools for ${cleanDistrictName}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching district schools:', error);
    throw error;
  }
};