import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  getAllStudents,
  deleteStudent,
  getStudentById,
} from "../../api/teacherApi";
import MarksModal from "../../components/MarksModal";

const StudentList = ({ onEditStudent }) => {
  const { token } = useContext(AuthContext);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, [token]);

  const fetchStudents = async () => {
    try {
      const data = await getAllStudents(token);
      setStudents(data);
      setLoading(false);
    } catch (error) {
      setError("Failed to load students: " + error.message);
      setLoading(false);
    }
  };

  const handleDelete = (studentId) => {
    setDeleteConfirm(studentId);
  };

  const handleShowMarks = async (studentId) => {
    try {
      const studentData = await getStudentById(token, studentId);
      setMarks(studentData.subjects); // Extracting subjects & marks
      console.log(studentData);
      setSelectedStudent(studentData); // Storing selected student info
    } catch (error) {
      setError("Failed to load marks: " + error.message);
    }
  };

  const closeMarksModal = () => {
    setSelectedStudent(null);
    setMarks([]);
  };

  const confirmDelete = (studentId) => {
    // Using callback
    deleteStudent(token, studentId, (error, data) => {
      if (error) {
        setError(error.message);
        return;
      }

      setStudents(students.filter((student) => student._id !== studentId));
      setDeleteConfirm(null);
    });
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  if (loading) {
    return <div className="text-center py-4">Loading students...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">Student List</h2>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 m-4 rounded">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Age
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.firstName} {student.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {deleteConfirm === student._id ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => confirmDelete(student._id)}
                          className="text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={cancelDelete}
                          className="text-gray-700 bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded text-xs"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => onEditStudent(student)}
                          className="text-white bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleShowMarks(student._id)}
                          className="text-white bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-xs"
                        >
                          Show Marks
                        </button>
                        <button
                          onClick={() => handleDelete(student._id)}
                          className="text-white bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedStudent && (
        <MarksModal
          student={selectedStudent}
          marks={marks}
          onClose={closeMarksModal}
        />
      )}
    </div>
  );
};

export default StudentList;
