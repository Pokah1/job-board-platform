import type { Job, Category } from "./jobs"

export interface Filters {
  category?: string
  location?: string
  experience?: string
  search?: string
}

export interface JobsContextType {
  jobs: Job[]
  categories: Category[]
  loading: boolean
  error: string | null
  filters: Filters
  totalCount: number
  currentPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  setFilters: (filters: Filters) => void
  clearFilters: () => void
  fetchJobs: (page?: number) => Promise<void>
  applyFilters: (newFilters: Filters) => void // Changed from Promise<void> to void
}
