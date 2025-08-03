"use client";

interface ApplicationCardProps {
  title: string;
  company: string;
  location: string;
  status: "Pending" | "Accepted" | "Rejected";
  salary?: string;
  description?: string;
}

const ApplicationCard = ({ title, company, location, status, salary, description }: ApplicationCardProps) => {
  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow hover:shadow-lg transition">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-400">{company}</p>
      <p className="text-sm text-gray-500">{location}</p>
      <p className="text-sm text-gray-500">{salary}</p>
      <p className="text-sm text-gray-500">{description}</p>
      <span
        className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
          status === "Pending"
            ? "bg-yellow-500/20 text-yellow-400"
            : status === "Accepted"
            ? "bg-green-500/20 text-green-400"
            : "bg-red-500/20 text-red-400"
        }`}
      >
        {status}
      </span>
    </div>
  );
}


export default ApplicationCard;
