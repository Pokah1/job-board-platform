"use client"

import type { Job } from "../../../types/jobs"
import { formatSalary, getExperienceLabel, getEmploymentTypeStyle } from "@/lib/job-utils"

export default function JobCard(job: Job) {
  return (
    <div className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-all hover:-translate-y-1 p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">{job.title}</h3>
          <p className="text-gray-600 mt-1">🏢 {job.company_name}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEmploymentTypeStyle(job.employment_type)}`}>
          {job.employment_type}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4 text-sm text-gray-600">
        <p>📍 {job.location}</p>
        <p>
          💼 {job.category.name} • {getExperienceLabel(job.experience_level)}
        </p>
        {job.salary_min && job.salary_max && (
          <p className="text-green-600 font-medium">💰 {formatSalary(job.salary_min, job.salary_max)}</p>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 border-t text-xs text-gray-500">
        <div className="flex gap-4">
          <span>📅 {job.days_posted} days ago</span>
          <span>👥 {job.application_count} applicants</span>
        </div>
        <a href={`/jobs/${job.id}`}>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors">
            View Details
          </button>
        </a>
      </div>
    </div>
  )
}
