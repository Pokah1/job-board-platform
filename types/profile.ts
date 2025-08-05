// types/profile.ts
export interface UserBasic {
  id: number;
  username: string;
  email: string;
  full_name?: string;
}

export interface Profile {
  id: number;
  user: UserBasic;
  bio: string;
  date_of_birth?: string;
  gender?: string;
  phone_number?: string;
  address?: string;
  city?: string;
  country?: string;
  postal_code?: string;
  job_title?: string;
  company?: string;
  experience_level?: "entry" | "mid" | "senior" | "expert";
  expected_salary_min?: string;
  expected_salary_max?: string;
  skills?: string;
  skills_list?: string[];
  education?: string;
  certifications?: string;
  profile_image_url?: string;
  resume_url?: string;
  linkedin_url?: string;
  github_url?: string;
  website_url?: string;
  is_profile_public: boolean;
  is_available_for_hire: boolean;
  created_at: string;
  updated_at: string;
}

export interface PaginatedProfiles {
  count: number;
  next: string | null;
  previous: string | null;
  results: Profile[];
}

export type CreateProfilePayload = Omit<Profile, "id" | "user" | "created_at" | "updated_at">;
export type UpdateProfilePayload = Partial<CreateProfilePayload>;

/** Account update payload */
export interface UpdateAccountPayload {
  username?: string;
  email?: string;
  password?: string;
}

/** Stats types */
export interface MyProfileStats {
  total_views: number;
  total_applications: number;
  total_shortlists: number;
}

export interface ProfileStats {
  total_profiles: number;
  available_for_hire: number;
  unavailable_for_hire: number;
}
