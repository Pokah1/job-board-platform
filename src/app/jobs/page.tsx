"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import JobCard from "@/components/jobs/JobCard";
import { Job } from "@/types/jobs";

export default function JobsPage() {
  const { token } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    fetch("http://127.0.0.1:8000/api/jobs/", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch jobs");
        return res.json();
      })
      .then(data => {
      console.log("Jobs API response:", data); // <-- Log response here
      setJobs(data.results);
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