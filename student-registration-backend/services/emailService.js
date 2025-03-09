const transporter = require("../config/email");

exports.sendRegistrationEmail = async (email, firstName) => {
  const mailOptions = {
    from: process.env.EMAIL_USER || "your-email@gmail.com",
    to: email,
    subject: "Registration Successful",
    text: `Dear ${firstName}, 
    
    Welcome to our Student Registration System! Your account has been successfully created.
    
    You can now log in to update your profile and manage your course marks.
    
    Best regards,
    Student Registration Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Registration email sent to:", email);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};
