import { useState } from "react";
import { FileText, Users, Package, LogOut } from "lucide-react";

import InventarioSection from "../../inventarios/InventarioSection";
import PublicacionesCliente from "./PublicacionesCliente";
import ForoClient from "../../foros/ForoClient";
import ClientProductos from "../../inventarios/ClientProductos";
import { useAuth } from "../../../routes/AuthProvider";

export default function DashboardClient({ onLogout }) {
  // ------------- OBTENER DATOS DESDE LOCALSTORAGE ----------------
  const [posts] = useState(() => JSON.parse(localStorage.getItem("posts")) || []);
  const [forums] = useState(() => JSON.parse(localStorage.getItem("forums")) || []);
  const [items] = useState(() => JSON.parse(localStorage.getItem("inventario")) || []);

  const [activeSection, setActiveSection] = useState(null);
  const { logout } = useAuth();


  return (
    <div className="min-h-screen bg-gray-50 relative">

      {/* ------------------------ BOTÓN CERRAR SESIÓN ------------------------ */}
      <button
        onClick={logout}
        className="absolute top-4 right-4 flex items-center gap-2 bg-red-600 text-white px-4 py-2 
                   rounded-lg shadow-md hover:bg-red-700 transition z-50"
      >
        <LogOut size={18} />
        <span className="text-sm font-medium">Cerrar sesión</span>
      </button>

      {/* ------------------------ HERO ------------------------ */}
      <div className="bg-white shadow-sm border-b border-gray-200 py-14 px-8 text-center bg-gradient-to-br from-slate-900 via-slate-800 to-black">
        <h1 className="text-4xl font-bold text-white">Plataforma PYME
        </h1>
        <p className="text-white mt-3 text-lg">
          Gestiona tus ventas, clientes y operaciones con eficiencia y tecnología moderna.
        </p>
      </div>

      {/* ------------------------ SECCIONES PRINCIPALES ------------------------ */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Publicaciones */}
          <div
            onClick={() => setActiveSection("publicaciones")}
            className="p-8 bg-white shadow-lg rounded-2xl border border-gray-200 cursor-pointer hover:shadow-xl transition"
          >
            <FileText className="text-indigo-600 mb-4" size={40} />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Publicaciones</h2>
            <p className="text-gray-600">
              Mira todas las publicaciones creadas por los administradores.
            </p>
            <p className="mt-4 text-indigo-600 font-medium">
              {posts?.length} publicaciones disponibles →
            </p>
          </div>

          {/* Foros */}
          <div
            onClick={() => setActiveSection("foros")}
            className="p-8 bg-white shadow-lg rounded-2xl border border-gray-200 cursor-pointer hover:shadow-xl transition"
          >
            <Users className="text-indigo-600 mb-4" size={40} />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Foros</h2>
            <p className="text-gray-600">
              Participa en los foros creados por la comunidad.
            </p>
            <p className="mt-4 text-indigo-600 font-medium">
              {forums?.length} foros activos →
            </p>
          </div>

          {/* Productos */}
          <div
            onClick={() => setActiveSection("productos")}
            className="p-8 bg-white shadow-lg rounded-2xl border border-gray-200 cursor-pointer hover:shadow-xl transition"
          >
            <Package className="text-indigo-600 mb-4" size={40} />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Productos</h2>
            <p className="text-gray-600">
              Mira todos los productos disponibles en el inventario.
            </p>
            <p className="mt-4 text-indigo-600 font-medium">
              {items?.length} productos cargados →
            </p>
          </div>

        </div>
      </div>

      {/* ------------------------ CONTENIDO DINÁMICO ------------------------ */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        {activeSection === "publicaciones" && (
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 mt-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Todas las Publicaciones</h2>
            <PublicacionesCliente posts={posts} />
          </div>
        )}

        {activeSection === "foros" && (
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 mt-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Foros activos</h2>
            <ForoClient forums={forums} />
          </div>
        )}

        {activeSection === "productos" && (
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 mt-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Inventario disponible</h2>
            <ClientProductos items={items} />
          </div>
        )}
      </div>
    </div>
  );
}
