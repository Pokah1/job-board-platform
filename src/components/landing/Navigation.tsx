"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <header>
      <nav className="relative z-10 px-6 py-4 bg-background">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Talentra logo" width={70} height={30} />
            <span className="text-2xl font-bold text-brand">Talentra</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Browse Jobs</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Companies</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <Button variant="outline" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button variant="accent">Post a Job</Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
export default Navigation;
