const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");
const { authenticateUser } = require("../middlewares/auth");
const { validateTeacher } = require("../middlewares/validation");

// Public routes
router.post("/register", validateTeacher, teacherController.register);
router.post("/login", teacherController.login);

// Protected routes
router.get("/students", authenticateUser, teacherController.getAllStudents);
router.get("/students/:id", authenticateUser, teacherController.getStudentById);
router.put("/students/:id", authenticateUser, teacherController.updateStudent);
router.delete(
  "/students/:id",
  authenticateUser,
  teacherController.deleteStudent
);

module.exports = router;
