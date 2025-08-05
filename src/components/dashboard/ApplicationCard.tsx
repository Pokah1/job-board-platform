"use client";
import { Application } from "@/hooks/types/applications";

const ApplicationCard = ({ job, status, applied_at }: Application) => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow hover:shadow-lg transition">
      <h3 className="text-lg font-semibold">{job.title}</h3>
      <p className="text-sm text-gray-400">{job.company_name}</p>
      <p className="text-sm text-gray-500">{job.location}</p>
      <p className="text-sm text-gray-500">Applied: {new Date(applied_at).toLocaleDateString()}</p>
      <span
        className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
          status === "pending"
            ? "bg-yellow-500/20 text-yellow-400"
            : status === "reviewed"
            ? "bg-blue-500/20 text-blue-400"
            : status === "shortlisted"
            ? "bg-purple-500/20 text-purple-400"
            : status === "rejected"
            ? "bg-red-500/20 text-red-400"
            : "bg-green-500/20 text-green-400"
        }`}
      >
        {status}
      </span>
    </div>
  );
}


export default ApplicationCard;
