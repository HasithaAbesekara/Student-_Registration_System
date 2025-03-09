import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="container mx-auto px-4 py-12 flex-grow">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            Student Registration System
          </h1>
          <p className="text-xl text-gray-600">
            A comprehensive system for managing student registrations and
            academic records
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              Student Portal
            </h2>
            <p className="text-gray-600 mb-6">
              Register, manage your profile, view and update your academic
              records
            </p>
            <div className="flex flex-col space-y-4">
              <Link
                to="/register"
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Register as Student
              </Link>
              <Link
                to="/login"
                className="border border-blue-600 text-blue-600 py-2 px-4 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Login as Student
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              Teacher Portal
            </h2>
            <p className="text-gray-600 mb-6">
              Access student information, update their details, and manage
              registrations
            </p>
            <div className="flex flex-col space-y-4">
              <Link
                to="/register"
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Register as Teacher
              </Link>
              <Link
                to="/login"
                className="border border-blue-600 text-blue-600 py-2 px-4 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Login as Teacher
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
