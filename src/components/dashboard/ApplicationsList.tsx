"use client";

import ApplicationCard from "./ApplicationCard";
import { Job } from "@/types/jobs";



const ApplicationList =({ applications }: { applications: Job[] }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {applications.map((job, idx) => (
        <ApplicationCard key={idx} {...job} />

      ))}
    </div>
  );
}

export default ApplicationList
