import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getStudentProfile, updateStudentMarks } from "../../api/studentApi";

const MarksForm = () => {
  const { token } = useContext(AuthContext);
  const [subjects, setSubjects] = useState([
    { name: "Mathematics", mark: "" },
    { name: "Science", mark: "" },
    { name: "History", mark: "" },
    { name: "Geography", mark: "" },
    { name: "English", mark: "" },
    { name: "Computer Science", mark: "" },
    { name: "Physics", mark: "" },
    { name: "Chemistry", mark: "" },
    { name: "Biology", mark: "" },
  ]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const data = await getStudentProfile(token);

        if (data.subjects && data.subjects.length > 0) {
          setSubjects(
            data.subjects.map((subject) => ({
              name: subject.name,
              mark: subject.mark,
            }))
          );
        }
      } catch (error) {
        setError("Failed to load marks: " + error.message);
      }
    };

    fetchMarks();
  }, [token]);

  const handleMarkChange = (index, value) => {
    const newSubjects = [...subjects];
    newSubjects[index].mark = value;
    setSubjects(newSubjects);
  };

  const validateMarks = () => {
    for (const subject of subjects) {
      const mark = parseFloat(subject.mark);
      if (isNaN(mark) || mark < 0 || mark > 100) {
        setError(
          `Invalid mark for ${subject.name}. Must be between 0 and 100.`
        );
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateMarks()) {
      return;
    }

    setLoading(true);

    try {
      // Using async/await
      const data = await updateStudentMarks(token, subjects);

      setSuccess("Marks updated successfully!");
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6">Last Term Marks</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {subjects.map((subject, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {subject.name}
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={subject.mark}
                onChange={(e) => handleMarkChange(index, e.target.value)}
                required
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Marks"}
        </button>
      </form>
    </div>
  );
};

export default MarksForm;
