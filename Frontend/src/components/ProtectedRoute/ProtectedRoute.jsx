// src/components/ProtectedRoute/ProtectedRoute.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return null; // Prevent rendering of the protected route
  }

  return element;
};

export default ProtectedRoute;
