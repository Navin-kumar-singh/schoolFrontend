const STORAGE_KEY = "visitedSchools";

export const getVisitedSchools = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const addVisitedSchool = (udise) => {
  const visited = getVisitedSchools();
  if (!visited.includes(udise)) {
    visited.push(udise);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(visited));
  }
};

export const removeVisitedSchool = (udise) => {
  let visited = getVisitedSchools();
  visited = visited.filter((code) => code !== udise);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(visited));
};

export const isSchoolVisited = (udise) => {
  return getVisitedSchools().includes(udise);
};

export const clearVisitedSchools = () => {
  localStorage.removeItem(STORAGE_KEY);
};