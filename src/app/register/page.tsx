"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RegisterPage = () => {
  const { register } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    full_name: "",
    phone_number: "",
    address: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
        await register(formData);
        router.push("/login");
    } catch (err: unknown) {
  console.error("Registration error:", err);

  if (typeof err === "object" && err !== null && "error" in (err as Record<string, unknown>)) {
  setError((err as { error: string }).error);
}
 else if (typeof err === "object" && err !== null) {
    const messages = Object.values(err as Record<string, string[]>)
      .flat()
      .join("\n");
    setError(messages);
  } else {
    setError("Registration failed");
  }
}finally {
    setLoading(false);
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <form
        onSubmit={handleSubmit}
        className="bg-foreground shadow-lg rounded-lg p-6 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-background">Register</h2>

        {error && <div className="bg-red-100 text-red-700 p-2 mb-3 rounded">  {error.split("\n").map((msg, idx) => (
      <p key={idx}>{msg}</p>
    ))}</div>}

        <Input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="border rounded-full w-full p-2 mb-3"
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border rounded-full w-full p-2 mb-3"
          required
        />
        <Input
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          className="border rounded-full w-full p-2 mb-3"
        />
        <Input
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          className="border rounded-full w-full p-2 mb-3"
        />
        <Input
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          className="border rounded-full w-full p-2 mb-3"
        />
        <Input
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          className="border rounded-full w-full p-2 mb-3"
        />
        <Input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="border rounded-full w-full p-2 mb-3"
        />
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white p-2 rounded hover:bg-accent"
        >
          {loading ? "Registering..." : "Register"}
        </Button>
        <p className="mt-4 text-sm text-accent">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
