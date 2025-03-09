const { validationResult } = require("express-validator");
const teacherService = require("../services/teacherService");

exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const teacher = await teacherService.registerTeacher(req.body);

    res.status(201).json({
      message: "Teacher registered successfully",
      teacherId: teacher._id,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const token = await teacherService.loginTeacher(
      req.body.email,
      req.body.password
    );

    res.header("x-auth-token", token).json({
      message: "Login successful",
      token,
      userType: "teacher",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const teacher = await Teacher.findOne({ email });

//     if (!teacher)
//       return res.status(400).json({ message: "Invalid credentials" });

//     const isMatch = await bcrypt.compare(password, teacher.password);
//     if (!isMatch)
//       return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign(
//       { userId: teacher._id, userType: "teacher" },
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );

//     res.json({ token, message: "Login successful", userType: "teacher" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

exports.getAllStudents = async (req, res) => {
  try {
    if (req.userType !== "teacher") {
      return res.status(403).json({ message: "Access denied. Not a teacher." });
    }

    const students = await teacherService.getAllStudents();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    if (req.userType !== "teacher") {
      return res.status(403).json({ message: "Access denied. Not a teacher." });
    }

    const student = await teacherService.getStudentById(req.params.id);
    res.json(student);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    if (req.userType !== "teacher") {
      return res.status(403).json({ message: "Access denied. Not a teacher." });
    }

    const updatedStudent = await teacherService.updateStudent(
      req.params.id,
      req.body
    );

    res.json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    if (req.userType !== "teacher") {
      return res.status(403).json({ message: "Access denied. Not a teacher." });
    }

    await teacherService.deleteStudent(req.params.id);

    res.json({
      message: "Student deleted successfully",
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
