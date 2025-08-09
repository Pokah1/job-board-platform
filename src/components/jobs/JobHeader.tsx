"use client"

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { useJobs } from "@/context/JobsContext"
import { Briefcase, Search, ArrowLeft } from "lucide-react"

interface JobHeaderProps {
  onToggleFilter: () => void
  showFilters: boolean
}

export default function JobHeader({ onToggleFilter, showFilters }: JobHeaderProps) {
  const router = useRouter()
  const { totalCount, loading, filters } = useJobs()

  const activeCount = Object.values(filters).filter((value) => {
    return value !== undefined && value !== null && value !== ""
  }).length

  return (
    <div className="bg-background border-b sticky top-0 z-10 px-6 py-6 ">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Back to Dashboard button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-1 bg-accent/30" 
          >
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </Button>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <Briefcase className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Job Opportunities</h1>
              <p className="text-gray-200 text-sm">
                {loading ? "Loading..." : `${totalCount.toLocaleString()} jobs available`}
                {activeCount > 0 && <span className="text-blue-600 font-medium"> (filtered)</span>}
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={onToggleFilter}
          className={`flex items-center gap-2 ${
            showFilters ? "bg-primary text-white" : "bg-white border text-gray-700"
          }`}
        >
          <Search className="w-5 h-5" />
          Filters
          {activeCount > 0 && (
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                showFilters ? "bg-white/20" : "bg-blue-100 text-blue-600"
              }`}
            >
              {activeCount}
            </span>
          )}
        </Button>
      </div>
    </div>
  )
}
