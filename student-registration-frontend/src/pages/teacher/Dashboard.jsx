import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import StudentList from "../../components/teacher/StudentList";
import StudentEditModal from "../../components/teacher/StudentEditModal";
import { getAllStudents } from "../../api/teacherApi";

const Dashboard = () => {
  const { token, setCurrentUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getAllStudents(token);
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

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const handleStudentUpdate = () => {
    // This will force the student list to re-fetch data
    setSelectedStudent(null);
  };

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
        <h1 className="text-2xl font-bold mb-8">Teacher Dashboard</h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4">
            Welcome, {profile?.firstName} {profile?.lastName}!
          </h2>
          <p className="text-gray-600">
            This is your teacher dashboard where you can manage student
            information.
          </p>
        </div>

        <StudentList onEditStudent={handleEditStudent} />

        <StudentEditModal
          student={selectedStudent}
          token={token}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onUpdate={handleStudentUpdate}
        />
      </div>
    </div>
  );
};

export default Dashboard;
