"use client";

import ApplicationCard from "./ApplicationCard";

export interface Application {
  title: string;
  company: string;
  location: string;
  status: "Pending" | "Accepted" | "Rejected";
  salary?: string;
  description?: string;
}

const ApplicationList =({ applications }: { applications: Application[] }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {applications.map((job, idx) => (
        <ApplicationCard key={idx} {...job} />

      ))}
    </div>
  );
}

export default ApplicationList
