// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


/* import DashboardClient from "./pages/DashboardClient"; */
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./routes/AuthProvider";
import Login from "./pages/login/Login";
import DashboardAdmin from "./pages/dashboard/DashboardAdmin";
import Publicaciones from "./pages/dashboard/admin/Publicaciones";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}

          <Route path="/login" element={<Login />} />

          {/* Rutas protegidas para Admin */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<DashboardAdmin />} />
            <Route path="/admin/publicaciones" element={<Publicaciones />} />
          </Route>

          {/* Rutas protegidas para Cliente */}
          <Route element={<ProtectedRoute allowedRoles={["client"]} />}>
            {/*  <Route path="/client" element={<DashboardClient />} /> */}
          </Route>
          {/* fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
