"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import api from "@/lib/api"
import type { Job } from "../../../../types/jobs"
import { formatSalary, getExperienceLabel, getEmploymentTypeStyle } from "@/lib/job-utils"
import JobApplicationModal from "@/components/jobs/JobApplication"
// Import lucide-react icons
import { Building, MapPin, DollarSign, ChevronLeft } from "lucide-react"

interface JobDetailsPageProps {
  params: Promise<{ id: string }>
}

export default function JobDetailsPage({ params }: JobDetailsPageProps) {
  const { token } = useAuth()
  const router = useRouter()
  const resolvedParams = use(params) // Unwrap the Promise
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showApplicationModal, setShowApplicationModal] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)

  // Auth check
  useEffect(() => {
    if (token === undefined) return
    if (token === null) router.push("/login")
  }, [token, router])

  // Fetch job details
  useEffect(() => {
    if (!token || !resolvedParams.id) return

    async function fetchJobDetails() {
      setLoading(true)
      setError(null)

      try {
        const response = await api.get(`api/jobs/${resolvedParams.id}/`)
        setJob(response.data)
      } catch (err) {
        setError("Failed to load job details")
        console.error("Error fetching job:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchJobDetails()
  }, [token, resolvedParams.id])

  const handleApplicationSuccess = () => {
    setHasApplied(true)
    // Optionally refresh job data to get updated application count
    if (job) {
      setJob({ ...job, application_count: job.application_count + 1 })
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Loading states
  if (token === undefined || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading ...</p>
        </div>
      </div>
    )
  }

  if (token === null) return null

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error || "Job not found"}</p>
          <Button onClick={() => router.push("/jobs")} className="bg-accent">
            ← Back to Jobs
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center gap-4 mb-4">
              <Button
                onClick={() => router.push("/jobs")}
                className="bg-accent/30 text-gray-700 hover:bg-gray-200 flex items-center gap-2"
              >
                <ChevronLeft size={16} />
                Back to Jobs
              </Button>
            </div>

            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                <div className="flex items-center gap-4 text-gray-600 mb-4">
                  <span className="flex items-center gap-1">
                    <Building size={16} />
                    {job.company_name}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={16} />
                    {job.location}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getEmploymentTypeStyle(
                      job.employment_type,
                    )}`}
                  >
                    {job.employment_type}
                  </span>
                </div>

                {job.salary_min && job.salary_max && (
                  <div className="text-2xl font-semibold text-green-600 mb-4 flex items-center gap-1">
                    <DollarSign size={20} />
                    {formatSalary(job.salary_min, job.salary_max)}
                  </div>
                )}
              </div>

              <div className="text-right">
                {hasApplied ? (
                  <div className="text-center">
                    <div className="bg-green-100 text-green-800 px-6 py-3 rounded-lg mb-2">✓ Application Submitted</div>
                    <p className="text-sm text-gray-500">We&apos;ll be in touch soon!</p>
                  </div>
                ) : (
                  <Button
                    onClick={() => setShowApplicationModal(true)}
                    className="bg-accent hover:bg-accent/70 text-white px-8 py-3 text-lg"
                  >
                    Apply Now
                  </Button>
                )}
                <p className="text-sm text-gray-500 mt-2">
                  {job.application_count} applicant{job.application_count !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Job Description */}
              {job.description && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4 text-background">Job Description</h2>
                  <div className="prose max-w-none text-background">
                    <p>{job.description}</p>
                  </div>
                </div>
              )}

              {/* Requirements */}
              {job.requirements && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4 text-background">Requirements</h2>
                  <div className="prose max-w-none text-background">
                    <p>{job.requirements}</p>
                  </div>
                </div>
              )}

              {/* Benefits */}
              {job.benefits && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4 text-background">Benefits</h2>
                  <div className="prose max-w-none text-background">
                    <p>{job.benefits}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Job Details */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4 text-background">Job Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-500">Category</span>
                    <p className="font-medium text-background">{job.category.name}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Experience Level</span>
                    <p className="font-medium text-background">{getExperienceLabel(job.experience_level)}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Employment Type</span>
                    <p className="font-medium text-background capitalize">{job.employment_type}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Posted</span>
                    <p className="font-medium text-background">{job.days_posted} days ago</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Application Deadline</span>
                    <p className="font-medium text-background">{formatDate(job.application_deadline)}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Posted By</span>
                    <p className="font-medium text-background">@{job.posted_by_username}</p>
                  </div>
                </div>
              </div>

              {/* Category Info */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4 text-background">About {job.category.name}</h3>
                <p className="text-background text-sm mb-3">{job.category.description}</p>
                <p className="text-sm text-gray-500">{job.category.job_count} jobs available in this category</p>
              </div>

              {/* Apply Again */}
              {!hasApplied && (
                <div className="bg-blue-50 rounded-lg p-6 text-center">
                  <h3 className="font-semibold mb-2">Ready to Apply?</h3>
                  <p className="text-sm text-gray-600 mb-4">Don&apos;t miss out on this opportunity!</p>
                  <Button
                    onClick={() => setShowApplicationModal(true)}
                    className="w-full bg-accent hover:bg-accent/70 text-white"
                  >
                    Apply Now
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <JobApplicationModal
        job={job}
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
        onSuccess={handleApplicationSuccess}
      />
    </>
  )
}
