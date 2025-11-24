// src/App.jsx
import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider, useAuth } from "./routes/AuthProvider";

import Login from "./pages/login/Login";
import DashboardAdmin from "./pages/dashboard/DashboardAdmin";
import Publicaciones from "./pages/dashboard/admin/Publicaciones";
import DashboardClient from "./pages/dashboard/client/DashboardClient";

// Ruta raíz que redirige según auth y rol
function HomeRedirect() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "admin") return <Navigate to="/admin" replace />;
  if (user.role === "client") return <Navigate to="/client" replace />;

  return <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <HashRouter basename="/Pymes">
        <Routes>
          {/* raíz */}
          <Route path="/" element={<HomeRedirect />} />

          {/* login */}
          <Route path="/login" element={<Login />} />

          {/* rutas admin */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<DashboardAdmin />} />
            <Route path="/admin/publicaciones" element={<Publicaciones />} />
          </Route>

          {/* rutas cliente */}
          <Route element={<ProtectedRoute allowedRoles={["client"]} />}>
            <Route path="/client" element={<DashboardClient />} />
          </Route>

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}
