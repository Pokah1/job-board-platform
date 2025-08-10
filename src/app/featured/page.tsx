"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import JobCard from "@/components/jobs/JobCard";
import { Job } from "../../types/jobs";
import api from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FeaturedJobsPage() {
  const { token } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters from API docs
  const [filters, setFilters] = useState({
    salary_min: "",
    salary_max: "",
    location: "",
    company: "",
    employment_type: "",
    experience_level: "",
    category: "",
    search: "",
    ordering: "",
    page: 1, // pagination support
  });

  

const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  console.log(`Filter changed: ${e.target.name} = ${e.target.value}`);
  setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  console.log("Filters after change:", { ...filters, [e.target.name]: e.target.value });
};



 const fetchJobs = useCallback(async () => {
  if (!token) return;

  
  setLoading(true);
  setError(null);
  


  
  try {
    const queryParams = Object.fromEntries(
      Object.entries(filters).filter(([, v]) => v !== "")
    );
    console.log("Query params sent:", queryParams);


    const res = await api.get("/api/jobs/featured/", {
      params: queryParams,
    });

    console.log("Filters sent:", queryParams);
    console.log("API response data:", res.data);

    setJobs(res.data); // <-- update here
  } catch (err) {
    console.error("Failed to fetch featured jobs", err);
    setError("Failed to load featured jobs");
  } finally {
    setLoading(false);
  }
}, [filters, token]);
  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Featured Jobs</h2>

      {/* Filters */}
      <div className="grid md:grid-cols-4 gap-4 mb-6 bg-gray-900 p-4 rounded-lg">
        <Input
          name="search"
          value={filters.search}
          onChange={handleFilterChange}
          placeholder="Search..."
          className="p-2 rounded bg-gray-800 text-white border border-gray-700"
        />
        <Input
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
          placeholder="Location"
          className="p-2 rounded bg-gray-800 text-white border border-gray-700"
        />
        <select
          name="employment_type"
          value={filters.employment_type}
          onChange={handleFilterChange}
          className="p-2 rounded bg-gray-800 text-white border border-gray-700"
        >
          <option value="">Employment Type</option>
          <option value="full_time">Full-Time</option>
          <option value="part_time">Part-Time</option>
          <option value="contract">Contract</option>
          <option value="internship">Internship</option>
          <option value="remote">Remote</option>
        </select>
        <select
          name="experience_level"
          value={filters.experience_level}
          onChange={handleFilterChange}
          className="p-2 rounded bg-gray-800 text-white border border-gray-700"
        >
          <option value="">Experience Level</option>
          <option value="entry">Entry</option>
          <option value="mid">Mid</option>
          <option value="senior">Senior</option>
          <option value="executive">Executive</option>
        </select>
        <Button
          onClick={fetchJobs}
          className="md:col-span-4 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
        >
          Apply Filters
        </Button>
      </div>

      {/* Results */}
      {loading && <p>Loading featured jobs...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && jobs.length === 0 && (
        <p className="text-gray-400">No featured jobs found.</p>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
    </main>
  );
}
