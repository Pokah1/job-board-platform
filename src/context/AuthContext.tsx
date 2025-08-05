"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { RegistrationData } from "@/hooks/types/auth";
import api from "@/lib/api";
import { AxiosError } from "axios";

interface User {
  id: number;
  username: string;
  full_name?: string | null;
  email?: string | null;
}

interface LoginResponse {
  access: string;
  refresh?: string;
  user: User;
  remember_me?: boolean;
  expires_in?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (data: RegistrationData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // ✅ Load saved token/user on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser) as User);
  }, []);

  // ✅ Login - calls your /auth/login/ endpoint
  const login = async (username: string, password: string, rememberMe = false) => {
    try {
      const res = await api.post<LoginResponse>("/auth/login/", {
        username,
        password,
        remember_me: rememberMe,
      });

      const data = res.data;

      // Save token & user
      localStorage.setItem("token", data.access);
      if (data.refresh) {
        localStorage.setItem("refresh", data.refresh);
      }
      localStorage.setItem("user", JSON.stringify(data.user));

      setToken(data.access);
      setUser(data.user);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        console.error("Login failed:", error.response.data);
        throw new Error(
          (error.response.data as { error?: string }).error || "Login failed"
        );
      }
      throw error;
    }
  };

  // ✅ Register
  const register = async (formData: RegistrationData): Promise<void> => {
    try {
      const res = await api.post<{ message?: string; error?: string }>(
        "/auth/register/",
        formData
      );

      if (res.status !== 200 && res.status !== 201) {
        throw new Error(res.data.error || "Registration failed");
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        console.error("Registration failed:", error.response.data);
        throw new Error(
          (error.response.data as { error?: string }).error ||
            "Registration failed"
        );
      }
      throw error;
    }
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
