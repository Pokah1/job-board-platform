"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <nav className="relative z-10 px-6 py-4 bg-background border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Talentra logo" width={70} height={30} />
            <span className="text-2xl font-bold text-brand">Talentra</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Browse Jobs
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Companies
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Button variant="outline" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button variant="accent">Post a Job</Button>
          </div>

          {/* Mobile Hamburger / Close Button */}
          <button
            className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
            aria-label="Toggle menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X size={24} className="text-muted-foreground" />
            ) : (
              <Menu size={24} className="text-muted-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-4 px-6 pb-6 rounded-xl 
bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-indigo-500/20 
backdrop-blur-xl border border-white/30 shadow-xl ring-1 ring-white/10
">
            <Link
              href="#"
              className="block text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Browse Jobs
            </Link>
            <Link
              href="#"
              className="block text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Companies
            </Link>
            <Link
              href="#"
              className="block text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/login" onClick={() => setIsOpen(false)}>
                Sign In
              </Link>
            </Button>
            <Button variant="accent" className="w-full" onClick={() => setIsOpen(false)}>
              Post a Job
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
