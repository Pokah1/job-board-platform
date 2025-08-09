"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import api from "@/lib/api"
import type { Job } from "../../../types/jobs"
import type { JobApplication } from "../../../types/applications"
import {
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  FileText,
  X,
} from "lucide-react"

interface JobApplicationModalProps {
  job: Job
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function JobApplicationModal({ job, isOpen, onClose, onSuccess }: JobApplicationModalProps) {
  const [coverLetter, setCoverLetter] = useState("")
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [uploadingResume, setUploadingResume] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleResumeUpload = async (profileId: number) => {
    if (!resumeFile) return true

    setUploadingResume(true)
    try {
      const formData = new FormData()
      formData.append("resume", resumeFile)

      await api.post(`account/profiles/${profileId}/upload_resume/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      return true
    } catch (err) {
      console.error("Error uploading resume:", err)
      if (err instanceof Error) {
        setError(`Failed to upload resume: ${err.message}`)
      } else {
        setError("Failed to upload resume. Please try again.")
      }
      return false
    } finally {
      setUploadingResume(false)
    }
  }

  const handleSubmitApplication = async () => {
    if (!coverLetter.trim()) {
      setError("Please write a cover letter")
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const applicationData: JobApplication = {
        job_id: job.id,
        cover_letter: coverLetter.trim(),
      }

      console.log("Submitting application data:", applicationData)
      const response = await api.post("api/applications/", applicationData)
      console.log("Application response:", response.data)

      if (resumeFile) {
        console.log("Attempting to upload resume...")
        const profileId = 1 // TODO: Replace with actual profile ID from auth or context
        const resumeUploaded = await handleResumeUpload(profileId)
        if (!resumeUploaded) {
          setSubmitting(false)
          return
        }
      }

      onSuccess()
      onClose()
      resetForm()
    } catch (err) {
      console.error("Error submitting application:", err)
      let errorMessage = "Failed to submit application. "

      if (err instanceof Error) {
        errorMessage += err.message
      } else if (typeof err === "object" && err !== null && "response" in err) {
        const axiosError = err as { response?: { data?: unknown; status?: number } }
        if (axiosError.response?.data) {
          if (typeof axiosError.response.data === "object" && axiosError.response.data !== null) {
            const data = axiosError.response.data as Record<string, unknown>
            if ("message" in data && typeof data.message === "string") {
              errorMessage += data.message
            } else if ("error" in data && typeof data.error === "string") {
              errorMessage += data.error
            } else {
              errorMessage += JSON.stringify(data)
            }
          } else {
            errorMessage += String(axiosError.response.data)
          }
        } else {
          errorMessage += `Server error (${axiosError.response?.status || "unknown"})`
        }
      } else {
        errorMessage += "Unknown error occurred"
      }

      setError(errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  const resetForm = () => {
    setCoverLetter("")
    setResumeFile(null)
    setError(null)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-background">Apply for {job.title}</h2>
            <p className="text-gray-600">
              {job.company_name} • {job.location}
            </p>
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <X size={28} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {/* Job Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-background">Job Summary</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p className="flex items-center gap-1">
                <MapPin size={16} /> {job.location}
              </p>
              <p className="flex items-center gap-1">
                <Briefcase size={16} /> {job.category.name}
              </p>
              <p className="flex items-center gap-1">
                <Clock size={16} /> {job.employment_type}
              </p>
              {job.salary_min && job.salary_max && (
                <p className="flex items-center gap-1">
                  <DollarSign size={16} /> ${Number.parseFloat(job.salary_min).toLocaleString()} - ${Number.parseFloat(job.salary_max).toLocaleString()}
                </p>
              )}
            </div>
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Letter <span className="text-red-500">*</span>
            </label>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Tell us why you're interested in this position and why you'd be a great fit..."
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 min-h-[200px] resize-y text-background"
              required
            />
            <p className="text-sm text-gray-500 mt-1">{coverLetter.length} characters</p>
          </div>

          {/* Resume Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Resume (Optional)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {resumeFile ? (
                <div className="space-y-2">
                  <div className="text-green-600 flex items-center justify-center gap-2">
                    <FileText size={20} />
                    <span>{resumeFile.name}</span>
                  </div>
                  <div className="text-sm text-gray-500">{(resumeFile.size / 1024 / 1024).toFixed(2)} MB</div>
                  <button
                    onClick={() => setResumeFile(null)}
                    className="text-red-500 hover:text-red-700 text-sm underline"
                  >
                    Remove file
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-gray-400 flex items-center justify-center">
                    <FileText size={48} />
                  </div>
                  <div>
                    <label className="cursor-pointer text-blue-600 hover:text-blue-700 underline">
                      Choose resume file
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-sm text-gray-500">PDF, DOC, or DOCX (Max 10MB)</p>
                </div>
              )}
            </div>
          </div>

          {/* Debug Info (remove in production) */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm">
            <p className="text-background"><strong>Debug Info:</strong></p>
            <p className="text-background">Job ID: {job.id}</p>
            <p className="text-background">Cover Letter Length: {coverLetter.length}</p>
            <p className="text-background">Resume File: {resumeFile ? resumeFile.name : "None"}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button onClick={handleClose} className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200">
              Cancel
            </Button>
            <Button
              onClick={handleSubmitApplication}
              disabled={submitting || !coverLetter.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              {submitting ? (uploadingResume ? "Uploading Resume..." : "Submitting...") : "Submit Application"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
