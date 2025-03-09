const BASE_URL = "http://localhost:5000/api";

export const getAllStudents = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/teachers/students`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch students");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getStudentMarks = async (token, id) => {
  const response = await fetch(`${BASE_URL}/teachers/students/${id}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch student marks");
  }
  return await response.json(); // This includes marks inside "subjects"
};

export const getStudentById = (token, id) => {
  return new Promise((resolve, reject) => {
    fetch(`${BASE_URL}/teachers/students/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || "Failed to fetch student");
          });
        }
        return response.json();
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const updateStudent = async (token, id, studentData) => {
  try {
    const response = await fetch(`${BASE_URL}/teachers/students/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(studentData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update student");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteStudent = (token, id, callback) => {
  fetch(`${BASE_URL}/teachers/students/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((data) => {
          throw new Error(data.message || "Failed to delete student");
        });
      }
      return response.json();
    })
    .then((data) => callback(null, data))
    .catch((error) => callback(error, null));
};
