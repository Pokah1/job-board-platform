"use client"

import { Button } from "../ui/button"
import { useJobs } from "@/context/JobsContext"

interface JobHeaderProps {
  onToggleFilter: () => void
  showFilters: boolean
}

export default function JobHeader({ onToggleFilter, showFilters }: JobHeaderProps) {
  const { totalCount, loading, filters } = useJobs()

  const activeCount = Object.values(filters).filter((value) => {
    return value !== undefined && value !== null && value !== ""
  }).length

  return (
    <div className="bg-white border-b sticky top-0 z-10 px-6 py-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">💼</div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Job Opportunities</h1>
            <p className="text-gray-600 text-sm">
              {loading ? "Loading..." : `${totalCount.toLocaleString()} jobs available`}
              {activeCount > 0 && <span className="text-blue-600 font-medium"> (filtered)</span>}
            </p>
          </div>
        </div>

        <Button
          onClick={onToggleFilter}
          className={`flex items-center gap-2 ${
            showFilters ? "bg-blue-600 text-white" : "bg-white border text-gray-700"
          }`}
        >
          🔍 Filters
          {activeCount > 0 && (
            <span
              className={`px-2 py-1 rounded-full text-xs ${showFilters ? "bg-white/20" : "bg-blue-100 text-blue-600"}`}
            >
              {activeCount}
            </span>
          )}
        </Button>
      </div>
    </div>
  )
}