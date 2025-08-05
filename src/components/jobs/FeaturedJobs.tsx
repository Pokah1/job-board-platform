"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { Job } from "@/hooks/types/jobs";
import JobCard from "./JobCard";
import { Input } from "../ui/input";
import { Button } from "../ui/button";


export default function FeaturedJobs({ limit }: {limit?: number}) {
  const { token } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  

  const [filters, setFilters] = useState({
    salary_min:"",
    salary_max: "",
    location: "",
    company: "",
    employment_type: "",
    experience_level: "",
    category: "",
    search: "",
    ordering: "",
  })

  const handleFilterChange = (
    e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const fetchJobs = useCallback(async () => {
        if (!token) return;

        setLoading(true);
        setError(null);

        try {
            const queryParams = new URLSearchParams(
                Object.fromEntries(
                    Object.entries(filters).filter(entry => entry[1])
                )
            );

            if (limit) queryParams.append("limit", String(limit));

            const res = await fetch(
                `http://127.0.0.1:8000/api/jobs/featured/?${queryParams}`,
                {headers: {Authorization: `Bearer ${token}`}}
            );

            if (!res.ok) throw new Error("Failed to fetch featured jobs");

            const data = await res.json();
            setJobs(data.results || []);
        } catch {
            setError("Failed to load featured jobs");
        } finally {
            setLoading(false);
        }
    }, [filters, token, limit]);

    useEffect(() => {
        fetchJobs();
    }, [fetchJobs]);
  
  return (
    <main>
      <h2 className="text-2xl font-bold mb-6">Featured Jobs</h2>

      {/* Filters */}
      <section  className="grid md:grid-cols-4 gap-4 mb-6 bg-gray-900 p-4 rounded-lg">
        <Input 
          name="serach"
          value={filters.search}
          onChange={handleFilterChange}
          placeholder="Search ..."
          className="p-2 rounded bg-gray-800 text-foreground border border-gray-700"
        />
        <Input 
          name="locatio"
          value={filters.location}
          onChange={handleFilterChange}
          placeholder="Locatiom ..."
          className="p-2 rounded bg-gray-800 text-foreground border border-gray-700"
        />
        <select 
        name="emplyment_type"
        value={filters.employment_type}
        onChange={handleFilterChange}
        className="p-2 rounded bg-gray-800 text-foreground border border-gray-700"
        >
            <option value="">Employment Typ</option>
            <option value="">Full-Time</option>
            <option value="">Part-Time</option>
            <option value="">Contract</option>
            <option value="">Intenship</option>
            <option value="">Remote</option>
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
      </section>

      {/* Results */}
      {loading && <p>Loading featured jobs...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && jobs.length === 0 && (
        <p className="text-gray-400">No featured jobs found.</p>
      )}

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </section>
    </main>
  );
}
