export interface Job {
  id: number;
  title: string;
  description: string;
  company_name: string;
  location: string;
  employment_type?: string;
  experience_level?: string;
  salary_min?: number;
  salary_max?: number;
  requirements?: string;
  benefits?: string;
  category_id?: number;
  application_deadline?: string;
  created_at?: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}