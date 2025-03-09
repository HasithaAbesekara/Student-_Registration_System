import React from "react";
import StudentDetail from "./StudentDetail";

const StudentEditModal = ({ student, token, isOpen, onClose, onUpdate }) => {
  if (!isOpen) return null;

  return (
    <StudentDetail
      student={student}
      token={token}
      onClose={onClose}
      onUpdate={onUpdate}
    />
  );
};

export default StudentEditModal;
