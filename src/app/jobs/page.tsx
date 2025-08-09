"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import JobCard from "@/components/jobs/JobCard";
import JobHeader from "@/components/jobs/JobHeader";
import { Job } from "../../../types/jobs";
import JobFilterPanel from "@/components/jobs/JobFilterPanel";
import { Filters } from "../../../types/filter";
import api from "@/lib/api";

export default function JobsPage() {
  const { token } = useAuth();
  const router = useRouter();

  // Redirect if not logged in (wait for token to be loaded)
  useEffect(() => {
    if (token === undefined) return; // still loading, do nothing
    if (token === null) router.push("/login"); // no token, redirect to login
  }, [token, router]);

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const fetchJobs = useCallback(
    async (filters?: Filters) => {
      if (!token) return; // do not fetch if no token

      setLoading(true);
      setError(null);

      try {
        const params: Record<string, string> = {};
        if (filters?.category) params.category = filters.category;
        if (filters?.location) params.location = filters.location;
        if (filters?.experience) params.experience_level = filters.experience;

        const res = await api.get("api/jobs", { params });
        setJobs(res.data.results || []);
      } catch {
        setError("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleApplyFilters = (filters: Filters) => {
    fetchJobs(filters);
    setShowFilters(false);
  };

  // While loading auth token
  if (token === undefined) {
    return <p>Loading authentication status...</p>;
  }

  // Authenticated but jobs loading
  if (loading) return <p>Loading jobs...</p>;

  // Error loading jobs
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      {/* Header with filter button */}
      <JobHeader onToggleFilter={() => setShowFilters(!showFilters)} />

      {/* Filters panel */}
      {showFilters && (
        <div className="mb-6">
          <JobFilterPanel onApplyFilters={handleApplyFilters} />
        </div>
      )}

      {/* Jobs grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
    </div>
  );
}
