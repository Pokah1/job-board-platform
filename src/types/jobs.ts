export interface Category {
  id: number
  name: string
  slug: string
  description: string
  is_active: boolean
  created_at: string
  job_count: number
}

export interface Job {
  id: number
  title: string
  company_name: string
  location: string
  employment_type: string
  experience_level: string
  salary_min: string
  salary_max: string
  category: Category
  posted_by_username: string
  is_active: boolean
  application_deadline: string
  created_at: string
  application_count: number
  days_posted: number
  description?: string
  requirements?: string
  benefits?: string
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}
