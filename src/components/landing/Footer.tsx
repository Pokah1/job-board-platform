import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";
import { Input } from "../ui/input";

export default function Footer() {
  return (
    <footer className="bg-background/90 border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Section */}
        <div className="flex flex-col items-start space-y-4">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Talentra Logo" width={40} height={20} />
            <span className="text-2xl font-bold text-foreground">Talentra</span>
          </Link>
          <p className="text-muted-foreground max-w-xs">
            Connecting talented professionals with amazing opportunities across Africa and beyond.
          </p>
          <div className="flex space-x-4">
            <Link href="https://github.com/your-repo" aria-label="GitHub">
              <Github className="w-6 h-6 text-foreground hover:text-accent  transition" />
            </Link>
            <Link href="https://twitter.com/your-handle" aria-label="Twitter">
              <Twitter className="w-6 h-6 text-foreground hover:text-accent  transition" />
            </Link>
            <Link href="https://linkedin.com/company/your-company" aria-label="LinkedIn">
              <Linkedin className="w-6 h-6 text-foreground hover:text-accent transition" />
            </Link>
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-2 gap-8 text-sm text-muted-foreground">
          <div className="flex flex-col space-y-2">
            <h4 className="text-foreground font-semibold">Company</h4>
            <Link href="/about" className="hover:text-foreground transition">About Us</Link>
            <Link href="/careers" className="hover:text-foreground transition">Careers</Link>
            <Link href="/blog" className="hover:text-foreground transition">Blog</Link>
            <Link href="/contact" className="hover:text-foreground transition">Contact</Link>
          </div>
          <div className="flex flex-col space-y-2">
            <h4 className="text-foreground font-semibold">Resources</h4>
            <Link href="/jobs" className="hover:text-foreground transition">Browse Jobs</Link>
            <Link href="/categories" className="hover:text-foreground transition">Categories</Link>
            <Link href="/faq" className="hover:text-foreground transition">FAQ</Link>
            <Link href="/support" className="hover:text-foreground transition">Support</Link>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-foreground font-semibold">Subscribe</h4>
          <p className="text-muted-foreground">Get the latest job postings and news.</p>
          <form className="flex flex-col sm:flex-row sm:items-center gap-2">
            <Input
              type="email"
              placeholder="Your email"
              className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-700"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="bg-accent text-background px-4 py-2 rounded-lg hover:bg-accent/90 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="mt-12 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Talentra. All rights reserved.
      </div>
    </footer>
  );
}
