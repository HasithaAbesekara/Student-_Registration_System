import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getStudentProfile } from "../../api/studentApi";
import MarksForm from "../../components/student/MarksForm";

const Dashboard = () => {
  const { token, setCurrentUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getStudentProfile(token);
        setProfile(data);
        setCurrentUser(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to load profile: " + error.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, setCurrentUser]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl font-semibold">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-md">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Student Dashboard</h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4">
            Welcome, {profile?.firstName} {profile?.lastName}!
          </h2>
          <p className="text-gray-600">
            This is your student dashboard where you can update your information
            and manage your academic records.
          </p>
        </div>

        <MarksForm />
      </div>
    </div>
  );
};

export default Dashboard;
