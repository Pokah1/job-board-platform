import api from "./api";
import { CreateProfilePayload,
  UpdateProfilePayload,
  Profile,
  PaginatedProfiles,
//   ProfileStats,
//   MyProfileStats,
  UpdateAccountPayload, } from "../../types/profile";

export const profileService = {
/** -------- GET -------- */
    getAllProfiles: (params?: Record<string, string | number | boolean | undefined>) =>
    api.get<PaginatedProfiles>("/account/profiles/", { params }),

     getAvailableCandidates: (params?: Record<string, string | number | boolean | undefined>) =>
    api.get<PaginatedProfiles>("/account/profiles/available_candidates/", { params }),

     getMyProfile: () => api.get<Profile>("/account/profiles/my_profile/"),

  getProfileById: (id: number) =>
  api.get<Profile>(`/account/profiles/${id}/`).then(res => res.data),


  getMyStats: () => api.get("/account/profiles/my_stats/"),

  getProfileStats: () => api.get("/account/profiles/profile_stats/"),

  /** -------- CREATE / UPDATE -------- */
  createProfile: (data: CreateProfilePayload) =>
    api.post<Profile>("/account/profiles/", data),

  updateMyProfile: (data: UpdateProfilePayload) =>
    api.put<Profile>("/account/profiles/my_profile/", data),

  patchMyProfile: (data: Partial<UpdateProfilePayload>) =>
    api.patch<Profile>("/account/profiles/my_profile/", data),

  updateAccount: (data: UpdateAccountPayload) =>
    api.put<Profile>("/account/profiles/update_account/", data),

  patchAccount: (data: Partial<UpdateAccountPayload>) =>
    api.patch<Profile>("/account/profiles/update_account/", data),

  updateProfileById: (id: number, data: UpdateProfilePayload) =>
    api.put<Profile>(`/account/profiles/${id}/`, data),

  patchProfileById: (id: number, data: Partial<UpdateProfilePayload>) =>
    api.patch<Profile>(`/account/profiles/${id}/`, data),

  /** -------- UPLOAD -------- */
  uploadProfileImage: (id: number, file: File) => {
    const formData = new FormData();
    formData.append("profile_image", file);
    return api.post<Profile>(`/account/profiles/${id}/upload_profile_image/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  uploadResume: (id: number, file: File) => {
    const formData = new FormData();
    formData.append("resume", file);
    return api.post<Profile>(`/account/profiles/${id}/upload_resume/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

   /** -------- DELETE -------- */
    deleteProfile: (id: number) => api.delete<void>(`/account/profiles/${id}/`),
}