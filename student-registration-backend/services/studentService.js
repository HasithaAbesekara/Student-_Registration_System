const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const emailService = require("./emailService");

exports.registerStudent = async (studentData) => {
  // Check if email already exists
  const emailExists = await Student.findOne({ email: studentData.email });
  if (emailExists) {
    throw new Error("Email already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(studentData.password, salt);

  // Create new student
  const student = new Student({
    ...studentData,
    password: hashedPassword,
  });

  const savedStudent = await student.save();

  // Send registration email
  await emailService.sendRegistrationEmail(
    savedStudent.email,
    savedStudent.firstName
  );

  return savedStudent;
};

exports.loginStudent = async (email, password) => {
  // Check if student exists
  const student = await Student.findOne({ email });
  if (!student) {
    throw new Error("Invalid email or password");
  }

  // Check password
  const validPassword = await bcrypt.compare(password, student.password);
  if (!validPassword) {
    throw new Error("Invalid email or password");
  }

  // Create and assign token
  const token = jwt.sign(
    { userId: student._id, userType: "student" },
    process.env.JWT_SECRET || "your_jwt_secret",
    { expiresIn: "1h" }
  );

  return token;
};

exports.updateProfile = async (studentId, updateData) => {
  return await Student.findByIdAndUpdate(
    studentId,
    { $set: updateData },
    { new: true }
  );
};

exports.updateProfilePicture = async (studentId, filePath) => {
  return await Student.findByIdAndUpdate(
    studentId,
    { profilePicture: filePath },
    { new: true }
  );
};

exports.updateMarks = async (studentId, subjects) => {
  return await Student.findByIdAndUpdate(
    studentId,
    { subjects: subjects },
    { new: true }
  );
};
