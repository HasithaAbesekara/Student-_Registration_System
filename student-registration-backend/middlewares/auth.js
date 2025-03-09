const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

exports.authenticateUser = async (req, res, next) => {
  try {
    // Get token from 'Authorization' header (Bearer <token>)
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1]; // Extract token after 'Bearer'

    // Verify JWT
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret"
    );

    // Identify user type and fetch user from DB
    if (decoded.userType === "student") {
      req.user = await Student.findById(decoded.userId).select("-password");
      req.userType = "student";
    } else {
      req.user = await Teacher.findById(decoded.userId).select("-password");
      req.userType = "teacher";
    }

    if (!req.user) {
      return res.status(400).json({ message: "User not found" });
    }

    next(); // Move to next middleware or controller
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
