"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { JobsProvider, useJobs } from "@/context/JobsContext"
import JobCard from "@/components/jobs/JobCard"
import JobHeader from "@/components/jobs/JobHeader"
import JobFilterPanel from "@/components/jobs/JobFilterPanel"
import { Button } from "@/components/ui/button"

// This component uses the JobsContext, so it must be inside JobsProvider
function JobsContent() {
  const { jobs, loading, error, currentPage, hasNextPage, hasPreviousPage, fetchJobs } = useJobs()
  const [showFilters, setShowFilters] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Fix hydration by ensuring client-side only rendering
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <Button onClick={() => fetchJobs(1)}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-foreground">
      <JobHeader onToggleFilter={() => setShowFilters(!showFilters)} showFilters={showFilters} />

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters */}
          {showFilters && (
            <div className="w-80 flex-shrink-0">
              <div className="sticky top-24">
                <JobFilterPanel onClose={() => setShowFilters(false)} />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin text-4xl mb-4">⏳</div>
                <p className="text-gray-600">Loading jobs...</p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters.</p>
                <Button onClick={() => setShowFilters(true)}>Adjust Filters</Button>
              </div>
            ) : (
              <>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {jobs.map((job) => (
                    <JobCard key={job.id} {...job} />
                  ))}
                </div>

                {/* Pagination */}
                {(hasNextPage || hasPreviousPage) && (
                  <div className="flex justify-center gap-4 mt-8 pt-8 border-t">
                    <Button
                      onClick={() => fetchJobs(currentPage - 1)}
                      disabled={!hasPreviousPage}
                      className="bg-white border text-gray-700"
                    >
                      ← Previous
                    </Button>
                    <span className="px-4 py-2 text-gray-600">Page {currentPage}</span>
                    <Button
                      onClick={() => fetchJobs(currentPage + 1)}
                      disabled={!hasNextPage}
                      className="bg-white border text-gray-700"
                    >
                      Next →
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// This is the main page component that handles auth and provides context
export default function JobsPage() {
  const { token } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    if (token === undefined) return // Still loading
    if (token === null) router.push("/login") // No token, redirect
  }, [token, router, mounted])

  // Show loading while mounting or checking auth
  if (!mounted || token === undefined) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  // If no token, don't render anything (redirect will happen)
  if (token === null) return null

  // Wrap the content with JobsProvider
  return (
    <JobsProvider>
      <JobsContent />
    </JobsProvider>
  )
}
