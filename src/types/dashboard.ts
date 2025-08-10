// Core profile types
export interface CandidateProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  location?: string;
  experience_level: string;
  expected_salary?: number;
  skills: string[];
  bio?: string;
  created_at: string;
  updated_at: string;
}

// Profile statistics
export interface ProfileStats {
  total_public_profiles: number;
  available_candidates: number;
  experience_level_distribution: {
    experience_level: string;
    count: number;
  }[];
  average_expected_salary: number;
}

// Category statistics
export interface CategoryStats {
  id: string;
  name: string;
  job_count: number;
}

// Job related types
export interface FeaturedJob {
  id: string;
  title: string;
  description: string;
  company_name: string;
  location: string;
  employment_type: string;
  experience_level: string;
  salary_min?: number;
  salary_max?: number;
  category: {
    id: string;
    name: string;
  };
  user: {
    id: string;
    company_name: string;
  };
  created_at: string;
  updated_at: string;
}

export interface JobStats {
  total_jobs: number;
  total_applications: number;
  employment_type_distribution: {
    employment_type: string;
    count: number;
  }[];
  average_salary_by_level: {
    experience_level: string;
    avg_salary: number;
  }[];
}

// API response wrappers
export interface AvailableCandidatesResponse {
  results: CandidateProfile[];
}
