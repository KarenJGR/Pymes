// src/auth/AuthProvider.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = "app_auth_user";

/*
  Fake users - aquí defines las credenciales de prueba.
  admin: admin@empresa.com / admin123
  client: cliente@ejemplo.com / client123
*/
const fakeUsers = [
  { id: 1, role: "admin", email: "admin@empresa.com", password: "admin123", name: "Admin" },
  { id: 2, role: "client", email: "cliente@ejemplo.com", password: "client123", name: "Cliente" },
];

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
    setInitializing(false);
  }, []);

  const login = ({ email, password }) => {
    // busca en usuarios fake
    const found = fakeUsers.find(u => u.email === email && u.password === password);
    if (!found) {
      return { ok: false, message: "Credenciales inválidas" };
    }
    const safeUser = { id: found.id, role: found.role, email: found.email, name: found.name };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(safeUser));
    setUser(safeUser);
    return { ok: true, user: safeUser };
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  };

  const value = { user, login, logout, initializing };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
