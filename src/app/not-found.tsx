"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Custom404() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait until user is loaded (user can be null or User object)
    if (user !== undefined) {
      setLoading(false);
    }
  }, [user]);

  // While user info is loading, show nothing or spinner
  if (loading) return null;

  // Once loaded, show 404 page with links based on user state
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-purple-600 via-pink-600 to-red-500 text-white px-6">
      <h1 className="text-9xl font-extrabold tracking-widest drop-shadow-lg">404</h1>
      <p className="text-2xl md:text-3xl mt-4 font-semibold drop-shadow-md">
        Oops! Page Not Found
      </p>
      <p className="mt-2 max-w-xl text-center text-pink-200 drop-shadow-sm">
        Looks like you’ve reached a page that either doesn’t exist or is still under construction.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        {user ? (
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-background bg-opacity-20 hover:bg-accent rounded-md font-semibold text-white transition"
          >
            Go to Dashboard
          </Link>
        ) : (
          <Link
            href="/"
            className="px-6 py-3 bg-white bg-opacity-20 hover:bg-opacity-40 rounded-md font-semibold text-white transition"
          >
            Go to Home
          </Link>
        )}

        <Link
          href="/contact"
          className="px-6 py-3 border border-white border-opacity-30 hover:border-opacity-60 rounded-md font-semibold text-white transition"
        >
          Contact Support
        </Link>
      </div>

      <svg
        className="mt-16 w-64 h-64 opacity-30 animate-pulse"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 64 64"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <circle cx="32" cy="32" r="30" strokeDasharray="10 10" />
        <line x1="32" y1="18" x2="32" y2="38" />
        <circle cx="32" cy="48" r="1" fill="currentColor" />
      </svg>
    </main>
  );
}
