"use client";

import ApplicationCard from "./ApplicationCard";
import { Application } from "@/hooks/types/applications";


interface Props {
  applications: Application[];
}


const ApplicationList = ({ applications }: Props) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {applications.map((app) => (
        <ApplicationCard key={app.id} {...app} />
      ))}
    </div>
  );
};

export default ApplicationList;
