"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  image?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: (payload: {
    name: string;
    email: string;
    image?: string;
  }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMe = async () => {
      const token = localStorage.getItem("trailnest_token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      } catch {
        localStorage.removeItem("trailnest_token");
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, []);

  const handleAuthSuccess = (token: string, userData: AuthUser) => {
    localStorage.setItem("trailnest_token", token);
    setUser(userData);
  };

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    handleAuthSuccess(res.data.token, res.data.user);
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await api.post("/auth/register", { name, email, password });
    handleAuthSuccess(res.data.token, res.data.user);
  };

  const loginWithGoogle = async (payload: {
    name: string;
    email: string;
    image?: string;
  }) => {
    const res = await api.post("/auth/google", payload);
    handleAuthSuccess(res.data.token, res.data.user);
  };

  const logout = () => {
    localStorage.removeItem("trailnest_token");
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, loginWithGoogle, logout }}
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
