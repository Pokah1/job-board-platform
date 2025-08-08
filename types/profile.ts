export interface Profile {
 
  user: {
    id: number;
    username: string;
    email: string;
    full_name?: string;
    date_joined: string;
  };
  bio: string;
  age: number | null;
  gender: string;
  city: string;
  country: string;
  job_title: string;
  company: string;
  experience_level: string;
  expected_salary_min: string | null;
  expected_salary_max: string | null;
  skills_list: string[]; 
  education: string;
  certifications: string;
  profile_image_url: string | null;
  linkedin_url: string;
  github_url: string;
  website_url: string;
  is_available_for_hire: boolean;
  
}


export interface CreateProfilePayload {
  bio: string;
  age?: number | null;
  gender: string;
  city: string;
  country: string;
  job_title: string;
  company: string;
  experience_level: string;
  expected_salary_min?: string | null;
  expected_salary_max?: string | null;
  skills_list: string[];
  education: string;
  certifications: string;
  linkedin_url: string;
  github_url: string;
  website_url: string;
  is_available_for_hire: boolean;
  profile_image_url?: string | null;
}

export interface UpdateProfilePayload {
  bio?: string;
  age?: number | null;
  gender?: string;
  city?: string;
  country?: string;
  job_title?: string;
  company?: string;
  experience_level?: string;
  expected_salary_min?: string | null;
  expected_salary_max?: string | null;
  skills_list?: string[];
  education?: string;
  certifications?: string;
  linkedin_url?: string;
  github_url?: string;
  website_url?: string;
  is_available_for_hire?: boolean;
  profile_image_url?: string | null;
}

export interface PaginatedProfiles {
  count: number;
  next: string | null;
  previous: string | null;
  results: Profile[];
}

export interface ProfileStats {
  total_profiles: number;
  public_profiles: number;
  available_candidates: number;
  experience_distribution: {
    entry: number;
    mid: number;
    senior: number;
    lead: number;
  };
  average_expected_salary: number;
}

export interface MyProfileStats {
  profile_views: number;
  applications_sent: number;
  applications_received: number;
  profile_completion_percentage: number;
}

export interface ProfileFilters {
  search?: string;
  experience_level?: string;
  city?: string;
  country?: string;
  is_available_for_hire?: boolean;
  skills?: string;
  page?: number;
  page_size?: number;
}

export interface UploadResponse {
  message: string;
  file_url: string;
}
