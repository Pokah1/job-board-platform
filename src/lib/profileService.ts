import api from "./api";
import {
  CreateProfilePayload,
  UpdateProfilePayload,
  Profile,
  PaginatedProfiles,
  ProfileStats,
  MyProfileStats,
  ProfileFilters,
} from "../../types/profile";

// Define a custom error type for handled errors
interface HandledError extends Error {
  response?: {
    status: number;
    data?: unknown;
  };
  isHandled?: boolean;
}

// Define the expected API error structure
interface ApiError {
  response?: {
    status: number;
    data?: unknown;
  };
  message?: string;
}

export const profileService = {
  // Fetch all profiles with optional filters
  getAllProfiles: async (filters?: ProfileFilters) => {
    try {
      
      const response = await api.get<PaginatedProfiles>("/account/profiles/", { 
        params: filters 
      });
      console.log('All profiles response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching all profiles:', error);
      throw error;
    }
  },

  // Fetch available candidates
  getAvailableCandidates: async (filters?: ProfileFilters) => {
    try {
      console.log('Fetching available candidates with filters:', filters);
      const response = await api.get<PaginatedProfiles>("/account/profiles/available_candidates/", { 
        params: filters 
      });
      console.log('Available candidates response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching available candidates:', error);
      throw error;
    }
  },

  // Get current user's profile
  getMyProfile: async () => {
    try {
      console.log('Fetching my profile');
      const response = await api.get<Profile>("/account/profiles/my_profile/");
      console.log('My profile response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching my profile:', error);
      throw error;
    }
  },

  // Get specific profile by ID - with graceful 404 handling
  getProfileById: async (id: number) => {
    try {
      console.log('Fetching profile by ID:', id);
      const response = await api.get<Profile>(`/account/profiles/${id}/`);
      console.log('Profile by ID response:', response.data);
      return response.data;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      
      // Handle 404 errors silently - these are expected for some profiles
      if (apiError.response?.status === 404) {
        console.log(`Profile ${id} not found (404) - this is expected for some profiles`);
        
        // Create a properly typed handled error
        const handledError: HandledError = new Error('Profile not found');
        handledError.response = { status: 404 };
        handledError.isHandled = true;
        throw handledError;
      }
      
      // For other errors, log them normally
      console.error('Error fetching profile by ID:', error);
      throw error;
    }
  },

  // Get current user's stats
  getMyStats: async () => {
    try {
      const response = await api.get<MyProfileStats>("/account/profiles/my_stats/");
      return response.data;
    } catch (error) {
      console.error('Error fetching my stats:', error);
      throw error;
    }
  },

  // Get general profile stats
  getProfileStats: async () => {
    try {
      const response = await api.get<ProfileStats>("/account/profiles/profile_stats/");
      return response.data;
    } catch (error) {
      console.error('Error fetching profile stats:', error);
      throw error;
    }
  },

  // Create new profile
  createProfile: async (data: CreateProfilePayload) => {
    try {
      console.log('Creating profile with data:', data);
      const response = await api.post<Profile>("/account/profiles/", data);
      console.log('Create profile response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
  },

  // Update my profile (full update)
  updateMyProfile: async (data: UpdateProfilePayload) => {
    try {
      console.log('Updating my profile with data:', data);
      const response = await api.put<Profile>("/account/profiles/my_profile/", data);
      console.log('Update profile response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating my profile:', error);
      throw error;
    }
  },

  // Partially update my profile
  patchMyProfile: async (data: Partial<UpdateProfilePayload>) => {
    try {
      console.log('Patching my profile with data:', data);
      const response = await api.patch<Profile>("/account/profiles/my_profile/", data);
      console.log('Patch profile response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error patching my profile:', error);
      throw error;
    }
  },

  // Delete profile by ID (admin)
  deleteProfile: async (id: number) => {
    try {
      console.log('Deleting profile with ID:', id);
      await api.delete(`/account/profiles/${id}/`);
      console.log('Profile deleted successfully');
    } catch (error) {
      console.error('Error deleting profile:', error);
      throw error;
    }
  },

  // Upload profile image
  // uploadProfileImage: async (id: number, file: File) => {
  //   try {
  //     console.log('Uploading profile image for ID:', id);
  //     const formData = new FormData();
  //     formData.append("profile_image", file);
  //     const response = await api.post<Profile>(
  //       `/account/profiles/${id}/upload_profile_image/`,
  //       formData,
  //       { headers: { "Content-Type": "multipart/form-data" } }
  //     );
  //     console.log('Upload profile image response:', response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error uploading profile image:', error);
  //     throw error;
  //   }
  // },

  // Upload resume
  // uploadResume: async (id: number, file: File) => {
  //   try {
  //     console.log('Uploading resume for ID:', id);
  //     const formData = new FormData();
  //     formData.append("resume", file);
  //     const response = await api.post<Profile>(
  //       `/account/profiles/${id}/upload_resume/`,
  //       formData,
  //       { headers: { "Content-Type": "multipart/form-data" } }
  //     );
  //     console.log('Upload resume response:', response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error uploading resume:', error);
  //     throw error;
  //   }
  // },
};
