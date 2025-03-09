// Helper function to remove sensitive fields
exports.removeSensitiveFields = (document, fields = ["password"]) => {
  const obj = document.toObject ? document.toObject() : { ...document };

  fields.forEach((field) => {
    if (obj[field]) delete obj[field];
  });

  return obj;
};

// Error handler
exports.errorHandler = (error) => {
  console.error("Error:", error);
  const status = error.statusCode || 500;
  const message = error.message || "Something went wrong";
  return { status, message };
};

// Format validation errors
exports.formatValidationErrors = (errors) => {
  const formattedErrors = {};
  errors.forEach((error) => {
    formattedErrors[error.param] = error.msg;
  });
  return formattedErrors;
};
