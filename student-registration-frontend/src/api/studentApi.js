const BASE_URL = "http://localhost:5000/api";

export const getStudentProfile = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/students/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch profile");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const updateStudentProfile = (token, profileData) => {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/students/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profileData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || "Failed to update profile");
          });
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const updateStudentMarks = async (token, subjects) => {
  try {
    const response = await fetch(`${BASE_URL}/students/update-marks`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ subjects }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update marks");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const uploadProfilePicture = (token, formData, callback) => {
  fetch(`${BASE_URL}/students/upload-profile-picture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          throw new Error(data.message || "Failed to upload profile picture");
        });
      }
      return response.json();
    })
    .then((data) => callback(null, data))
    .catch((error) => callback(error, null));
};
