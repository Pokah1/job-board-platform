"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { LoginFormData } from "../../../types/auth";


const LoginPage = () => {
  const { login } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState<LoginFormData>({
  username: "",
  password: "",
  rememberMe: false,
});

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (field: keyof LoginFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(formData); 
      router.push("/dashboard");
    } catch (err) {
      console.error("Invalid credentials:", err);
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-card shadow-lg rounded-lg p-8 border"
        >
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-foreground">Welcome Back</h2>
            <p className="text-muted-foreground mt-2">Sign in to your account</p>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md mb-4">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-foreground mb-1">
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) => handleChange("username", e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => handleChange("rememberMe", e.target.checked)}
                className="h-4 w-4 text-primary focus:ring-primary border-input rounded"
                disabled={loading}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground">
                Remember me
              </label>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full mt-6">
            {loading ? "Signing in..." : "Sign In"}
          </Button>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/register"
                className="text-primary hover:text-primary/80 font-medium hover:underline"
              >
                Create one here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
