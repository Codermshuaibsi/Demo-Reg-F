// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // check JWT

  if (!token) {
    // redirect to login if not authenticated
    return <Navigate to="/" replace />;
  }

  return children; // render protected content
};

export default ProtectedRoute;
