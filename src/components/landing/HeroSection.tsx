"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, TrendingUp, Globe } from "lucide-react";
import dynamic from "next/dynamic";
import heroImage from "@/app/assets/Hero-Image.jpg";

const FeaturedJobs = dynamic(() => import("@/components/jobs/FeaturedJobs"), {
  loading: () => <p className="text-center py-10">Loading Jobs...</p>,
  ssr: false
});

const HeroSection = () => {
  const [showFeatured, setShowFeatured] = useState(false);

  return (
    <section aria-labelledby="hero-heading" className="relative px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
        
        {/* Left */}
        <div className="space-y-8">
          <header>
            <h1 id="hero-heading" className="text-5xl lg:text-6xl font-bold leading-tight">
              Find Your Next <span className="text-primary">Opportunity</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg">
              Connect with top companies across Africa and globally. Discover remote, hybrid, and on-site opportunities that match your skills.
            </p>
          </header>

          {/* Search Bar */}
          <form className="bg-card rounded-lg p-6 shadow-lg border" role="search">
            <div className="grid md:grid-cols-3 gap-4">
              <label className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Job title or keywords" className="pl-10" />
              </label>
              <label className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Location or remote" className="pl-10" />
              </label>
              <Button type="submit" className="w-full">Search Jobs</Button>
            </div>
          </form>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={() => setShowFeatured(true)}>Browse Jobs</Button>
            {showFeatured && <FeaturedJobs limit={6} />}
            <Button variant="accent" size="lg">Post a Job</Button>
          </div>

          {/* Stats */}
          <dl className="grid grid-cols-3 gap-6 pt-8">
            {[
              { label: "Active Jobs", value: "5K+" },
              { label: "Companies", value: "200+" },
              { label: "Professionals", value: "15K+" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <dt className="text-2xl font-bold">{stat.value}</dt>
                <dd className="text-sm text-muted-foreground">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Right Image */}
        <aside className="relative">
          <Image src={heroImage} alt="Diverse professionals" className="w-full h-auto rounded-lg shadow-2xl" />
          <div className="absolute -top-4 -left-4 bg-card p-4 rounded-lg shadow-lg border">
            <TrendingUp className="h-5 w-5 text-primary" />
            <p className="text-sm font-semibold">95% Success Rate</p>
          </div>
          <div className="absolute -bottom-4 -right-4 bg-card p-4 rounded-lg shadow-lg border">
            <Globe className="h-5 w-5 text-accent" />
            <p className="text-sm font-semibold">50+ Countries</p>
          </div>
        </aside>

      </div>
    </section>
  );
}

export default HeroSection
