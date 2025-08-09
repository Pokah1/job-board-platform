"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
   const [success, setSuccess] = useState(false);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(null);
  setLoading(true);

  try {
    await register(formData);
    setSuccess(true);
    setTimeout(() => {
      router.push("/login");
    }, 2000);
  } catch (err: unknown) {
    console.error("Registration error:", err);

    if (
      typeof err === "object" &&
      err !== null &&
      "response" in (err as Record<string, unknown>)
    ) {
      const data = (err as { response?: { data?: unknown } }).response?.data;

      if (data && typeof data === "object") {
        // If API returns field-specific errors { username: ["error"], password: ["error"] }
        const messages = Object.values(data as Record<string, string[]>)
          .flat()
          .join("\n");
        setError(messages || "Registration failed");
      } else {
        setError("Registration failed");
      }
    } else if (
      typeof err === "object" &&
      err !== null &&
      "message" in (err as Record<string, unknown>)
    ) {
      setError(String((err as { message?: string }).message || "Registration failed"));
    } else {
      setError("Registration failed");
    }
  } finally {
    setLoading(false);
  }
};

 
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-full max-w-md">
          <div className="bg-card shadow-lg rounded-lg p-8 border text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Registration Successful!</h2>
            <p className="text-muted-foreground mb-4">
              Your account has been created successfully. Redirecting to login...
            </p>
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    
    <div className="min-h-screen flex items-center justify-center bg-background py-8">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-card shadow-lg rounded-lg p-6 border"
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground">Create Account</h2>
            <p className="text-muted-foreground mt-2">Join us today</p>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md mb-4">
              {error.split("\n").map((msg, idx) => (
                <p key={idx} className="text-sm">{msg}</p>
              ))}
            </div>
          )}

          <div className="space-y-3">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-foreground mb-1">
                Username *
              </label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                className="w-full"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
                Password *
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className="w-full"
                required
                disabled={loading}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-foreground mb-1">
                  First Name
                </label>
                <Input
                  id="first_name"
                  name="first_name"
                  type="text"
                  placeholder="First name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="w-full"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-foreground mb-1">
                  Last Name
                </label>
                <Input
                  id="last_name"
                  name="last_name"
                  type="text"
                  placeholder="Last name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="w-full"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-foreground mb-1">
                Full Name
              </label>
              <Input
                id="full_name"
                name="full_name"
                type="text"
                placeholder="Full name (auto-filled)"
                value={formData.full_name}
                onChange={handleChange}
                className="w-full bg-muted/50"
                disabled={loading}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Auto-filled from first and last name
              </p>
            </div>

            <div>
              <label htmlFor="phone_number" className="block text-sm font-medium text-foreground mb-1">
                Phone Number
              </label>
              <Input
                id="phone_number"
                name="phone_number"
                type="tel"
                placeholder="Your phone number"
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-foreground mb-1">
                Address
              </label>
              <Input
                id="address"
                name="address"
                type="text"
                placeholder="Your address"
                value={formData.address}
                onChange={handleChange}
                className="w-full"
                disabled={loading}
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-6"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating account...
              </span>
            ) : (
              "Create Account"
            )}
          </Button>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link 
                href="/auth/login" 
                className="text-primary hover:text-primary/80 font-medium hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
