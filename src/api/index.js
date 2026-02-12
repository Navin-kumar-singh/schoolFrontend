const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:9000/api";

export const fetchDistricts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/schools/districts`);
    if (!response.ok) throw new Error("Failed to fetch districts");
    return await response.json();
  } catch (error) {
    console.error("Error fetching districts:", error);
    throw error;
  }
};

export const fetchSchools = async (districtName) => {
  try {
    const cleanDistrictName = districtName.trim();
    const response = await fetch(
      `${API_BASE_URL}/schools/district/${encodeURIComponent(cleanDistrictName)}`
    );
    if (!response.ok) throw new Error(`Failed to fetch schools for ${cleanDistrictName}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching schools:", error);
    throw error;
  }
};

export const fetchSchool = async (udiseCode) => {
  try {
    const response = await fetch(`${API_BASE_URL}/schools/${udiseCode}`);
    if (!response.ok) throw new Error(`Failed to fetch school details for ${udiseCode}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching school details:", error);
    throw error;
  }
};

export const fetchAllSchools = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/schools/all`);
    if (!response.ok) throw new Error("Failed to fetch all schools");
    return await response.json();
  } catch (error) {
    console.error("Error fetching all schools:", error);
    throw error;
  }
};

export const toggleVisited = async (udiseCode, visited) => {
  try {
    const response = await fetch(`${API_BASE_URL}/schools/${udiseCode}/visited`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visited }),
    });
    if (!response.ok) throw new Error("Failed to update visited status");
    return await response.json();
  } catch (error) {
    console.error("Error updating visited status:", error);
    throw error;
  }
};