"use client"

import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useJobs } from "@/context/JobsContext"
import { EXPERIENCE_LEVELS } from "@/lib/job-utils"
import type { Filters } from "../../types/filter"
import type { Category } from "../../types/jobs"
import { Search, X } from "lucide-react"

interface JobFilterPanelProps {
  onClose?: () => void
}

export default function JobFilterPanel({ onClose }: JobFilterPanelProps) {
  const { categories, filters, applyFilters, clearFilters, totalCount } = useJobs()
  const [localFilters, setLocalFilters] = useState<Filters>(filters)

  useEffect(() => setLocalFilters(filters), [filters])

  const hasActiveFilters = Object.values(localFilters).some((v) => v && v.length > 0)
  const activeCount = Object.values(localFilters).filter((v) => v && v.length > 0).length

  const handleApply = () => {
    applyFilters(localFilters)
    onClose?.()
  }

  const handleClear = () => {
    setLocalFilters({})
    clearFilters()
  }

  return (
    <div className="bg-white border rounded-lg shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold">Filter Jobs</h3>
          {hasActiveFilters && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{activeCount} active</span>
          )}
        </div>
        <div className="flex gap-2">
          {hasActiveFilters && (
            <button onClick={handleClear} className="text-gray-500 hover:text-gray-700 text-sm underline">
              Clear All
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
          <Input
            placeholder="Job title, company..."
            value={localFilters.search || ""}
            onChange={(e) => setLocalFilters({ ...localFilters, search: e.target.value })}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={localFilters.category || ""}
            onChange={(e) => setLocalFilters({ ...localFilters, category: e.target.value || undefined })}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 bg-background text-foreground"
          >
            <option value="" className="text-background">All Categories</option>
            {categories &&
              categories.map((cat: Category) => (
                <option key={cat.id} value={cat.id.toString()}>
                  {cat.name} ({cat.job_count})
                </option>
              ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <Input
            placeholder="City, country, or Remote"
            value={localFilters.location || ""}
            onChange={(e) => setLocalFilters({ ...localFilters, location: e.target.value })}
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
          <select
            value={localFilters.experience || ""}
            onChange={(e) => setLocalFilters({ ...localFilters, experience: e.target.value || undefined })}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 bg-background text-foreground"
          >
            <option value="">All Levels</option>
            {EXPERIENCE_LEVELS &&
              EXPERIENCE_LEVELS.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3 pt-4 border-t">
        <Button onClick={handleApply} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Apply Filters {totalCount > 0 && `(${totalCount})`}
        </Button>
        {hasActiveFilters && (
          <Button onClick={handleClear} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700">
            Clear All
          </Button>
        )}
      </div>
    </div>
  )
}
