"use client";
import { Job } from "@/hooks/types/jobs";

const JobCard = ({ id, title, company_name, location, salary_min, salary_max, description }: Job) => {
  return (
    <a href={`/jobs/${id}`}>
      <div className="bg-gray-900 p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-400">{company_name}</p>
        <p className="text-sm text-gray-500">{location}</p>
        {(salary_min || salary_max) && (
          <p className="text-sm text-gray-500">
            {salary_min && `$${salary_min}`} - {salary_max && `$${salary_max}`}
          </p>
        )}
        {description && <p className="text-sm text-gray-500 line-clamp-2">{description}</p>}
        <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400">
          View Details
        </span>
      </div>
    </a>
  );
};

export default JobCard;