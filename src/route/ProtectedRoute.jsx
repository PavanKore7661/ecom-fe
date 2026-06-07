import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check if JWT token exists in localStorage
  const token = localStorage.getItem("token");

  if (!token) {
    // If not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // Else, render the protected page
  return children;
};

export default ProtectedRoute;
