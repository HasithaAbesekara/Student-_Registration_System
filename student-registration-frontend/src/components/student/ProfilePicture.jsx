import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { uploadProfilePicture } from "../../api/studentApi";

const ProfilePicture = ({ currentPicture, onPictureUpdate }) => {
  const { token } = useContext(AuthContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(currentPicture || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.match("image.*")) {
        setError("Please select an image file");
        return;
      }

      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setError("Please select an image to upload");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    const formData = new FormData();
    formData.append("profilePic", selectedFile);

    // Using callback
    uploadProfilePicture(token, formData, (error, data) => {
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setSuccess("Profile picture uploaded successfully!");
      if (onPictureUpdate) {
        onPictureUpdate(data.profilePicture);
      }
      setLoading(false);
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6">Profile Picture</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <div className="flex flex-col items-center">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-4 bg-gray-200">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Profile Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </div>

        <input
          type="file"
          id="profilePic"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        <label
          htmlFor="profilePic"
          className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md cursor-pointer hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 mb-4"
        >
          Select Image
        </label>

        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          disabled={!selectedFile || loading}
        >
          {loading ? "Uploading..." : "Upload Picture"}
        </button>
      </div>
    </div>
  );
};

export default ProfilePicture;
