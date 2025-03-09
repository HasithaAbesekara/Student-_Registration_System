import React from "react";

const MarksModal = ({ student, marks, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-lg font-bold mb-4">
          Marks for {student.firstName} {student.lastName}
        </h2>
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Subject</th>
              <th className="px-4 py-2 border">Marks</th>
            </tr>
          </thead>
          <tbody>
            {marks.length > 0 ? (
              marks.map((subject, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{subject.name}</td>
                  <td className="px-4 py-2 border">{subject.mark}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="px-4 py-2 text-center">
                  No marks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MarksModal;
