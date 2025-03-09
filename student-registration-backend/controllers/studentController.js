const { validationResult } = require("express-validator");
const studentService = require("../services/studentService");

exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const student = await studentService.registerStudent(req.body);

    res.status(201).json({
      message: "Student registered successfully",
      studentId: student._id,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const token = await studentService.loginStudent(
      req.body.email,
      req.body.password
    );

    res.header("x-auth-token", token).json({
      message: "Login successful",
      token,
      userType: "student",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const student = await Student.findOne({ email });

//     if (!student)
//       return res.status(400).json({ message: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, student.password);
//     if (!isMatch)
//       return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign(
//       { userId: student._id, userType: "student" },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     res.json({ token, message: "Login successful", userType: "student" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

exports.getProfile = async (req, res) => {
  try {
    if (req.userType !== "student") {
      return res.status(403).json({ message: "Access denied. Not a student." });
    }

    res.json(req.user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    if (req.userType !== "student") {
      return res.status(403).json({ message: "Access denied. Not a student." });
    }

    const updatedStudent = await studentService.updateProfile(
      req.user._id,
      req.body
    );

    res.json({
      message: "Profile updated successfully",
      student: updatedStudent,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.uploadProfilePicture = async (req, res) => {
  try {
    if (req.userType !== "student") {
      return res.status(403).json({ message: "Access denied. Not a student." });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Please upload a file" });
    }

    const updatedStudent = await studentService.updateProfilePicture(
      req.user._id,
      req.file.path
    );

    res.json({
      message: "Profile picture uploaded successfully",
      profilePicture: updatedStudent.profilePicture,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateMarks = async (req, res) => {
  try {
    if (req.userType !== "student") {
      return res.status(403).json({ message: "Access denied. Not a student." });
    }

    const updatedStudent = await studentService.updateMarks(
      req.user._id,
      req.body.subjects
    );

    res.json({
      message: "Marks updated successfully",
      subjects: updatedStudent.subjects,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
