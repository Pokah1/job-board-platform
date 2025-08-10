"use client"

import Link from "next/link"
import type { Job } from "../../types/jobs"
import { formatSalary, getExperienceLabel, getEmploymentTypeStyle } from "@/lib/job-utils"
import { Building, MapPin, Briefcase, DollarSign, Calendar, Users } from "lucide-react"

export default function JobCard(job: Job) {
  return (
    <div className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-all hover:-translate-y-1 p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <Link href={`/jobs/${job.id}`}>
            <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">
              {job.title}
            </h3>
          </Link>
          <p className="text-gray-600 mt-1 flex items-center gap-1">
            <Building className="w-4 h-4 text-gray-500" /> {job.company_name}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEmploymentTypeStyle(job.employment_type)}`}>
          {job.employment_type}
        </span>
      </div>

      {/* Details */}
      <div className="space-y-2 mb-4 text-sm text-gray-600">
        <p className="flex items-center gap-1">
          <MapPin className="w-4 h-4 text-gray-500" /> {job.location}
        </p>
        <p className="flex items-center gap-1">
          <Briefcase className="w-4 h-4 text-gray-500" /> {job.category.name} • {getExperienceLabel(job.experience_level)}
        </p>
        {job.salary_min && job.salary_max && (
          <p className="text-green-600 font-medium flex items-center gap-1">
            <DollarSign className="w-4 h-4" /> {formatSalary(job.salary_min, job.salary_max)}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 border-t text-xs text-gray-500">
        <div className="flex gap-4">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> {job.days_posted} days ago
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" /> {job.application_count} applicants
          </span>
        </div>
        <Link href={`/jobs/${job.id}`}>
          <button className="bg-accent hover:bg-accent/70 text-white px-4 py-2 rounded text-sm transition-colors">
            View Details
          </button>
        </Link>
      </div>
    </div>
  )
}
