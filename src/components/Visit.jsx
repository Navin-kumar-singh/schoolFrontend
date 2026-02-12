import { useEffect, useState } from "react";
import { fetchAllSchools, toggleVisited } from "../api";
import { FiCheck, FiX, FiArrowLeft, FiLoader } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Visit() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadAllSchools();
  }, []);

  const loadAllSchools = async () => {
    try {
      setLoading(true);
      const data = await fetchAllSchools();
      setSchools(data);
    } catch {
      toast.error("Failed to load schools");
    } finally {
      setLoading(false);
    }
  };

  const handleVisitToggle = async (udise, visited) => {
    try {
      await toggleVisited(udise, visited);
      setSchools((prev) =>
        prev.map((s) => (s.udise_code === udise ? { ...s, visited } : s))
      );
      toast.success(visited ? "Marked as visited" : "Removed from visited");
    } catch {
      toast.error("Failed to update visited status");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-8 flex justify-center items-center">
        <div className="text-center">
          <FiLoader className="animate-spin text-blue-600 text-4xl mx-auto mb-4" />
          <p className="text-gray-600">Loading schools...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6 group"
      >
        <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition" />
        <span className="font-semibold">Back</span>
      </button>

      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-8 text-white shadow-xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
          Manage Visited Schools
        </h1>
        <p className="text-white/90">
          Mark schools as visited – they will be hidden from district listings and nearby searches
        </p>
      </div>

      <div className="mb-6">
        <p className="text-gray-600">
          Showing <span className="font-semibold">{schools.length}</span> schools
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {schools.map((school) => {
          const isVisited = school.visited;
          return (
            <div
              key={school.udise_code}
              className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {school.school_name}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                UDISE: {school.udise_code}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                District: {school.district}{" "}
                {school.pincode && `• PIN: ${school.pincode}`}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => handleVisitToggle(school.udise_code, true)}
                  disabled={isVisited}
                  className={`flex-1 inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    isVisited
                      ? "bg-green-100 text-green-800 cursor-default"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  <FiCheck className="mr-2" />
                  {isVisited ? "Visited" : "Mark Visited"}
                </button>
                <button
                  onClick={() => handleVisitToggle(school.udise_code, false)}
                  disabled={!isVisited}
                  className={`flex-1 inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    !isVisited
                      ? "bg-gray-100 text-gray-400 cursor-default"
                      : "bg-red-600 text-white hover:bg-red-700"
                  }`}
                >
                  <FiX className="mr-2" />
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}