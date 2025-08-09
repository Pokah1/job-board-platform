"use client"

import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import api from "@/lib/api"
import type { Job, Category } from "../../types/jobs"
import type { Filters, JobsContextType } from "../../types/filter"

const JobsContext = createContext<JobsContextType | undefined>(undefined)

export function useJobs() {
  const context = useContext(JobsContext)
  if (!context) {
    throw new Error("useJobs must be used within a JobsProvider")
  }
  return context
}

export function JobsProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFiltersState] = useState<Filters>({})
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [hasPreviousPage, setHasPreviousPage] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Ensure client-side only
  useEffect(() => {
    setMounted(true)
  }, [])

  // Fetch categories once after mounting
  useEffect(() => {
    if (!mounted) return

    async function fetchCategories() {
      try {
        const response = await api.get("api/categories/")
        setCategories(response.data.results || [])
      } catch (err) {
        console.error("Error fetching categories:", err)
      }
    }
    fetchCategories()
  }, [mounted])

  const fetchJobs = useCallback(
    async (page = 1, newFilters = filters) => {
      if (!mounted) return

      setLoading(true)
      setError(null)

      try {
        const params: Record<string, string> = { page: page.toString() }

        if (newFilters.category) params.category = newFilters.category
        if (newFilters.location) params.location = newFilters.location
        if (newFilters.experience) params.experience_level = newFilters.experience
        if (newFilters.search) params.search = newFilters.search

        const response = await api.get("api/jobs/", { params })
        const data = response.data

        setJobs(data.results || [])
        setTotalCount(data.count)
        setCurrentPage(page)
        setHasNextPage(!!data.next)
        setHasPreviousPage(!!data.previous)
      } catch (err) {
        setError("Failed to load jobs. Please try again.")
        console.error("Error fetching jobs:", err)
      } finally {
        setLoading(false)
      }
    },
    [filters, mounted],
  )

  const applyFilters = useCallback(
    (newFilters: Filters) => {
      setFiltersState(newFilters)
      fetchJobs(1, newFilters)
    },
    [fetchJobs],
  )

  const clearFilters = useCallback(() => {
    const emptyFilters: Filters = {}
    setFiltersState(emptyFilters)
    fetchJobs(1, emptyFilters)
  }, [fetchJobs])

  // Initial fetch after mounting
  useEffect(() => {
    if (mounted) {
      fetchJobs(1)
    }
  }, [mounted, fetchJobs])

  const value: JobsContextType = {
    jobs,
    categories,
    loading,
    error,
    filters,
    totalCount,
    currentPage,
    hasNextPage,
    hasPreviousPage,
    setFilters: setFiltersState,
    clearFilters,
    fetchJobs,
    applyFilters,
  }

  return React.createElement(JobsContext.Provider, { value }, children)
}
