"use client";

import { useState } from "react";
// import ProtectedRoute from "@/components/ProtectedRoute";
import ApplicationHeader from "@/components/dashboard/DashboardHeader";
import FilterPanel, { Filters } from "@/components/dashboard/FiltersPanel";
import ApplicationList from "@/components/dashboard/ApplicationsList";
import { Job } from "@/types/jobs";

const DashboardPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({ category: "", location: "", experience: "" });

  // Mock job data
  const [applications] = useState<Job[]>([
     { title: "Frontend Developer", company: "Google", location: "Remote", status: "Pending", salary: "$120k", description: "React, TypeScript" },
  { title: "UI Designer", company: "Figma", location: "San Francisco", status: "Accepted", salary: "$100k", description: "Figma, Adobe XD" },
  { title: "Backend Developer", company: "Amazon", location: "New York", status: "Rejected", salary: "$130k", description: "Node.js, AWS" },
  { title: "Product Manager", company: "Meta", location: "Remote", status: "Pending", salary: "$150k", description: "Agile, Scrum" },
  { title: "DevOps Engineer", company: "Netflix", location: "Los Angeles", status: "Accepted", salary: "$140k", description: "Docker, Kubernetes" },
  { title: "QA Tester", company: "Spotify", location: "London", status: "Pending", salary: "$90k", description: "Manual, Automation" },
    
  ]);

  const toggleFilters = () => setShowFilters((prev) => !prev);

  const applyFilters = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const filteredApplications = applications.filter(app => {
    const matchCategory = !filters.category || app.title.toLowerCase().includes(filters.category.toLowerCase());
    const matchLocation = !filters.location || app.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchExperience = !filters.experience || app.title.toLowerCase().includes(filters.experience.toLowerCase());
    return matchCategory && matchLocation && matchExperience;
  });

  return (
    // <ProtectedRoute>
    <main className="space-y-6">
      <ApplicationHeader onToggleFilter={toggleFilters} />
      {showFilters && <FilterPanel onApplyFilters={applyFilters} />}
      <ApplicationList applications={filteredApplications} />
    </main>
    // </ProtectedRoute>
  );
}
export default DashboardPage;