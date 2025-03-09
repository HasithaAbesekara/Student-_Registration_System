const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const { authenticateUser } = require("../middlewares/auth");
const { validateStudent } = require("../middlewares/validation");
const upload = require("../middlewares/upload");

// Public routes
router.post("/register", validateStudent, studentController.register);
router.post("/login", studentController.login);

// Protected routes
router.get("/profile", authenticateUser, studentController.getProfile);
router.put("/profile", authenticateUser, studentController.updateProfile);
router.post(
  "/upload-profile-picture",
  authenticateUser,
  upload.single("profilePic"),
  studentController.uploadProfilePicture
);
router.put("/update-marks", authenticateUser, studentController.updateMarks);

module.exports = router;
