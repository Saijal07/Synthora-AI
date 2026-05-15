import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api
        .get("/user/me")
        .then((res) => setUser(res.data))
        .catch(() => localStorage.clear())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (token, userData) => {
    localStorage.setItem("token", token);
    setUser(userData);
    try {
      const res = await api.get("/user/me");
      setUser(res.data);
    } catch {}
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  const refreshUser = () => {
    return api.get("/user/me").then((res) => {
      setUser(res.data);
      return res.data;
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
