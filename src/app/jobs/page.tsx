"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import JobCard from "@/components/jobs/JobCard";
import { Job } from "../../../types/jobs";
import api from "@/lib/api";

export default function JobsPage() {
  const { token } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
   
      setLoading(true);
      setError(null);

      api.get("api/jobs")
      .then((res) => {
         console.log("Jobs API response:", res.data);
        setJobs(res.data.results || []);
      })
      .catch(() => setError("Failed to load jobs"))
    .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map(job => (
        <JobCard key={job.id} {...job} />
      ))}
    </div>
  );
}