import React from "react";
import { Navigate } from "react-router";
import { isAuthenticated } from "./auth";

const ProtectedRoute = ({ children }) => {
  const auth = isAuthenticated();

  if (!auth) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
