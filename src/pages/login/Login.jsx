// src/pages/Login.jsx
import { useState } from "react";
import { Mail, Lock, UserCog, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../routes/AuthProvider";

export default function Login() {
  const [role, setRole] = useState("admin");
  const [animateKey, setAnimateKey] = useState(0);

  const [email, setEmail] = useState(role === "admin" ? "admin@empresa.com" : "cliente@ejemplo.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const switchRole = (newRole) => {
    if (newRole !== role) {
      setRole(newRole);
      setAnimateKey((prev) => prev + 1);
      // Cambia placeholder / email por defecto cuando se cambia rol
      setEmail(newRole === "admin" ? "admin@empresa.com" : "cliente@ejemplo.com");
      setPassword("");
      setError(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    // Llamada al fake-login del contexto
    const result = login({ email: email.trim(), password });

    if (!result.ok) {
      setError(result.message);
      return;
    }

    // Redirigir según rol
    const userRole = result.user.role;
    if (userRole === "admin") {
      navigate("/admin", { replace: true });
    } else {
      navigate("/client", { replace: true });
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white p-12 flex-col gap-10 justify-center">
        <div className="flex items-center gap-3 select-none">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">P</div>
          <h2 className="text-2xl font-bold tracking-wide text-white">Karos.com</h2>
        </div>
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
            Plataforma PYME<br />Impulsa tu crecimiento
          </h1>
          <p className="mt-6 text-gray-300 text-lg max-w-md">
            Gestiona tus ventas, clientes y operaciones con eficiencia y tecnología moderna.
          </p>
        </div>
      </div>

      <div className="flex w-full md:w-1/2 items-center justify-center p-10 bg-gray-50">
        <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md border border-gray-200">
          <h2 className="text-3xl font-extrabold text-center text-slate-900 mb-8">
            {role === "admin" ? "Panel Administrativo" : "Bienvenido"}
          </h2>

          <div className="flex space-x-2 bg-slate-200 p-1 rounded-xl mb-8">
            <button
              onClick={() => switchRole("client")}
              className={`flex-1 py-2 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${role === "client"
                ? "bg-blue-800 text-white shadow-md"
                : "text-slate-700 hover:bg-slate-300"
                }`}
            >
              <User size={18} /> Cliente
            </button>
            <button
              onClick={() => switchRole("admin")}
              className={`flex-1 py-2 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${role === "admin"
                ? "bg-blue-800 text-white shadow-md"
                : "text-slate-700 hover:bg-slate-300"
                }`}
            >
              <UserCog size={18} /> Admin
            </button>
          </div>

          <div key={animateKey} className="transition-all duration-500 transform animate-fade-slide">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-slate-500" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl placeholder-slate-500 focus:ring-2 focus:ring-blue-800 outline-none shadow-sm bg-white"
                  placeholder={role === "admin" ? "admin@empresa.com" : "cliente@ejemplo.com"}
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-3 text-slate-500" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl placeholder-slate-500 focus:ring-2 focus:ring-blue-800 outline-none shadow-sm bg-white"
                  placeholder="••••••••"
                />
              </div>

              {role === "client" && (
                <p className="text-sm text-slate-600">
                  ¿Eres cliente potencial?{" "}
                  <span className="text-blue-800 font-semibold hover:underline cursor-pointer">Contáctanos</span>
                </p>
              )}

              {error && <p className="text-sm text-red-600">{error}</p>}

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-white text-lg shadow-md bg-blue-800 hover:bg-blue-900 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                {role === "admin" ? "Ingresar al Panel" : "Iniciar Sesión"}
              </button>
            </form>

            {role === "client" && (
              <p className="text-center text-slate-600 text-sm mt-6">
                ¿No tienes cuenta?{" "}
                <span className="text-blue-800 hover:underline cursor-pointer">Regístrate</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
