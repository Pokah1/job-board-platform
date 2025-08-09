export interface JobApplication {
  job_id: number
  cover_letter: string
}

export interface ApplicationResponse {
  id: number
  job_id: number
  cover_letter: string
  status: string
  created_at: string
}
