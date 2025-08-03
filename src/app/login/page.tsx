"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext"; // ✅ Named import now works
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginPage = () => {
  const { login } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(username, password);
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
      <form
        onSubmit={handleSubmit}
        className="bg-foreground shadow-lg rounded-lg p-6 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-background">Login</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded-full w-full p-2 mb-3"
          required
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded-full w-full p-2 mb-3"
          required
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white p-2 rounded hover:bg-accent"
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        <p className="mt-4 text-sm">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-primary hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
