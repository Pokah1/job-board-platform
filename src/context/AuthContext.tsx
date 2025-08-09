"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { RegistrationData, LoginFormData, User } from "../../types/auth";
import api from "@/lib/api";
import { AxiosError } from "axios";

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
  login: (data: LoginFormData) => Promise<void>;
  register: (data: RegistrationData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getInitialToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
}

function getInitialUser(): User | null {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    if (storedUser) return JSON.parse(storedUser) as User;
  }
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(getInitialToken());
  const [user, setUser] = useState<User | null>(getInitialUser());

  // Login function
  const login = async ({ username, password, rememberMe }: LoginFormData) => {
    try {
      const res = await api.post<LoginResponse>("/auth/login/", {
        username,
        password,
        remember_me: rememberMe,
      });

      const data = res.data;

      // Save token & user in localStorage
      localStorage.setItem("token", data.access);
      if (data.refresh) {
        localStorage.setItem("refresh", data.refresh);
      }
      localStorage.setItem("user", JSON.stringify(data.user));

      // Update state
      setToken(data.access);
      setUser(data.user);
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        throw new Error(
          (error.response.data as { error?: string }).error || "Login failed"
        );
      }
      throw error;
    }
  };

  // Register function
  const register = async (formData: RegistrationData): Promise<void> => {
    try {
      const res = await api.post<{ message?: string; error?: string; [key: string]: unknown }>(
        "/auth/register/",
        formData
      );

      if (res.status !== 200 && res.status !== 201) {
        throw new Error(res.data.error || "Registration failed");
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        const data = error.response.data as Record<string, string[] | string>;

        let message = "Registration failed";
        for (const value of Object.values(data)) {
          if (Array.isArray(value) && value.length > 0) {
            message = value[0];
            break;
          }
          if (typeof value === "string" && value.trim()) {
            message = value;
            break;
          }
        }

        throw new Error(message);
      }
      throw error;
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      if (token) {
        try {
          await api.post("/auth/logout/");
          // Removed logging here
        } catch {
          // Removed logging here
        }
      }
    } catch {
      // Removed logging here
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
      setToken(null);
      setUser(null);

      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
