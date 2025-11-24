// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider, useAuth } from "./routes/AuthProvider";

import Login from "./pages/login/Login";
import DashboardAdmin from "./pages/dashboard/DashboardAdmin";
import Publicaciones from "./pages/dashboard/admin/Publicaciones";
import DashboardClient from "./pages/dashboard/client/DashboardClient";

// Ruta raíz que redirige según auth y rol
function HomeRedirect() {
  const { user } = useAuth(); // suponiendo que tu AuthProvider expone user

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirige según rol
  if (user.role === "admin") return <Navigate to="/admin" replace />;
  if (user.role === "client") return <Navigate to="/client" replace />;

  // fallback
  return <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </AuthProvider>
  );
}
