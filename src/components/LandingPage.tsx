import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Search,
  MapPin,
  Briefcase,
  Users,
  Globe,
  TrendingUp,
} from "lucide-react";
import heroImage from "@/app/assets/Hero-Image.jpg";

import Link from "next/link";
import Image from "next/image";

const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image src="/logo.png" alt="business logo" width={70} height={30} />
            <span className="text-2xl font-bold text-brand">Talentra</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Browse Jobs
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Companies
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Button variant="outline"><a href="/login">Sign In</a></Button>
            <Button variant="accent">Post a Job</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Find Your Next{" "}
                  <span className="text-primary">Opportunity</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Connect with top companies across Africa and globally.
                  Discover remote, hybrid, and on-site opportunities that match
                  your skills.
                </p>
              </div>

              {/* Search Bar */}
              <div className="bg-card rounded-lg p-6 shadow-lg border">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Job title or keywords"
                      className="pl-10"
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input placeholder="Location or remote" className="pl-10" />
                  </div>
                  <Button className="w-full">Search Jobs</Button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 py-3">
                  Browse Jobs
                </Button>
                <Button
                  variant="accent"
                  size="lg"
                  className="text-lg px-8 py-3"
                >
                  Post a Job
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">5K+</div>
                  <div className="text-sm text-muted-foreground">
                    Active Jobs
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">200+</div>
                  <div className="text-sm text-muted-foreground">Companies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">15K+</div>
                  <div className="text-sm text-muted-foreground">
                    Professionals
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative z-10">
                <Image
                  src={heroImage}
                  alt="Diverse professionals working together"
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 bg-card p-4 rounded-lg shadow-lg border z-20">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">
                      95% Success Rate
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Job Placements
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-card p-4 rounded-lg shadow-lg border z-20">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Globe className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">50+ Countries</div>
                    <div className="text-xs text-muted-foreground">
                      Global Reach
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose <span className="text-brand">Talentra?</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We connect talented professionals with amazing opportunities
              across the continent and beyond.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Quality Jobs
              </h3>
              <p className="text-muted-foreground">
                Hand-picked opportunities from top companies across various
                industries and locations.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Diverse Community
              </h3>
              <p className="text-muted-foreground">
                Join a vibrant community of professionals from all backgrounds
                and experience levels.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Global Opportunities
              </h3>
              <p className="text-muted-foreground">
                Access remote, hybrid, and on-site positions with companies
                worldwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
