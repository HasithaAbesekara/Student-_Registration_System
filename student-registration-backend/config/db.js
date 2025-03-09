const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI ||
        "mongodb://localhost:27017/student_registration_system"
    );
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Could not connect to MongoDB", err);
    process.exit(1);
  }
};

module.exports = connectDB;
