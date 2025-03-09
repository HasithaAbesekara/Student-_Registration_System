const BASE_URL = "http://localhost:5000/api";

// Using all three methods as required (callback, promise, async/await)
export const registerStudent = async (studentData) => {
  try {
    const response = await fetch(`${BASE_URL}/students/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const loginStudent = (credentials) => {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/students/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || "Login failed");
          });
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const registerTeacher = async (teacherData) => {
  try {
    const response = await fetch(`${BASE_URL}/teachers/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(teacherData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const loginTeacher = (credentials, callback) => {
  fetch(`${BASE_URL}/teachers/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          throw new Error(data.message || "Login failed");
        });
      }
      return response.json();
    })
    .then((data) => callback(null, data))
    .catch((error) => callback(error, null));
};
