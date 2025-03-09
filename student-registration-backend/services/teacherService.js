const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Teacher = require("../../models/Teacher");
const Student = require("../../models/Student");

exports.registerTeacher = async (teacherData) => {
  // Check if email already exists
  const emailExists = await Teacher.findOne({ email: teacherData.email });
  if (emailExists) {
    throw new Error("Email already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(teacherData.password, salt);

  // Create new teacher
  const teacher = new Teacher({
    ...teacherData,
    password: hashedPassword,
  });

  return await teacher.save();
};

exports.loginTeacher = async (email, password) => {
  // Check if teacher exists
  const teacher = await Teacher.findOne({ email });
  if (!teacher) {
    throw new Error("Invalid email or password");
  }

  // Check password
  const validPassword = await bcrypt.compare(password, teacher.password);
  if (!validPassword) {
    throw new Error("Invalid email or password");
  }

  // Create and assign token
  const token = jwt.sign(
    { userId: teacher._id, userType: "teacher" },
    process.env.JWT_SECRET || "your_jwt_secret",
    { expiresIn: "1h" }
  );

  return token;
};

exports.getAllStudents = async () => {
  return await Student.find().select("-password");
};

exports.getStudentById = async (studentId) => {
  const student = await Student.findById(studentId).select("-password");
  if (!student) {
    throw new Error("Student not found");
  }
  return student;
};

exports.updateStudent = async (studentId, updateData) => {
  const student = await Student.findByIdAndUpdate(
    studentId,
    { $set: updateData },
    { new: true }
  );

  if (!student) {
    throw new Error("Student not found");
  }

  return student;
};

exports.deleteStudent = async (studentId) => {
  const student = await Student.findByIdAndDelete(studentId);
  if (!student) {
    throw new Error("Student not found");
  }
  return true;
};
