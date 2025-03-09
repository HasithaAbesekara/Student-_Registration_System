import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedToken = localStorage.getItem("token");
    const storedUserType = localStorage.getItem("userType");

    if (storedToken && storedUserType) {
      setToken(storedToken);
      setUserType(storedUserType);
    }

    setLoading(false);
  }, []);

  const login = (userData) => {
    setToken(userData.token);
    setUserType(userData.userType);
    localStorage.setItem("token", userData.token);
    localStorage.setItem("userType", userData.userType);
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    setUserType(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
  };

  const value = {
    currentUser,
    setCurrentUser,
    userType,
    token,
    login,
    logout,
    isAuthenticated: !!token,
    isStudent: userType === "student",
    isTeacher: userType === "teacher",
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
