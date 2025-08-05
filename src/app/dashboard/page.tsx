"use client";

import { useState, useEffect } from "react";
// import ProtectedRoute from "@/components/ProtectedRoute";
import ApplicationHeader from "@/components/dashboard/DashboardHeader";
import FilterPanel, { Filters } from "@/components/dashboard/FiltersPanel";
import ApplicationList from "@/components/dashboard/ApplicationsList";
import { Application } from "@/hooks/types/applications";
import api from "@/lib/api";

const DashboardPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({ category: "", location: "", experience: "" });

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
    api
      .get("/api/applications/my_applications/")
      .then((res) => {
        
        setApplications(res.data.results || res.data);
      })
      .catch(() => setError("Failed to load applications"))
      .finally(() => setLoading(false));
  }, []);

  const toggleFilters = () => setShowFilters((prev) => !prev);
  const applyFilters = (newFilters: Filters) => {
    setFilters(newFilters);
  };

   const filteredApplications = applications.filter((app) => {
    const matchCategory =
      !filters.category ||
      app.job.title.toLowerCase().includes(filters.category.toLowerCase());
    const matchLocation =
      !filters.location ||
      app.job.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchExperience =
      !filters.experience ||
      (app.job.experience_level || "")
        .toLowerCase()
        .includes(filters.experience.toLowerCase());
    return matchCategory && matchLocation && matchExperience;
  });

  return (
    // <ProtectedRoute>
    <main className="space-y-6">
      <ApplicationHeader onToggleFilter={toggleFilters} />
      {showFilters && <FilterPanel onApplyFilters={applyFilters} />}

      {loading && <p>Loading applications...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && <ApplicationList applications={filteredApplications} />}
    </main>
    // </ProtectedRoute>
  );
}
export default DashboardPage;