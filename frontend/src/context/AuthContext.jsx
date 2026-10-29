import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // Rehydrate user from token on mount
  useEffect(() => {
    const bootstrap = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await api.get("/api/auth/me");
        setUser(data.user ?? data);
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    bootstrap();
  }, [token]);

  // Listen to global 401
  // Rehydrate user from token on mount
useEffect(() => {
  const bootstrap = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const { data } = await api.get("/api/auth/me");
      setUser(data.data);          // { _id, name, email }
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  bootstrap();
}, [token]);

const persist = (payload) => {
  // payload = { _id, name, email, token }
  localStorage.setItem("token", payload.token);
  localStorage.setItem(
    "user",
    JSON.stringify({
      _id: payload._id,
      name: payload.name,
      email: payload.email,
    })
  );
  setToken(payload.token);
  setUser({ _id: payload._id, name: payload.name, email: payload.email });
};

const login = async (email, password) => {
  const { data } = await api.post("/api/auth/login", { email, password });
  persist(data.data);          // unwrap .data
};

const register = async (name, email, password) => {
  const { data } = await api.post("/api/auth/register", {
    name,
    email,
    password,
  });
  persist(data.data);          // unwrap .data
};
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}