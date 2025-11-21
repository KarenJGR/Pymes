// src/auth/ProtectedRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function ProtectedRoute({ allowedRoles }) {
  const { user, initializing } = useAuth();

  if (initializing) return null; // o loader pequeño

  if (!user) {
    // no autenticado -> ir a /login
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // autenticado pero rol no permitido -> redirigir a su dashboard
    const fallback = user.role === "admin" ? "/admin" : "/client";
    return <Navigate to={fallback} replace />;
  }

  // si todo OK, renderiza rutas hijas
  return <Outlet />;
}
