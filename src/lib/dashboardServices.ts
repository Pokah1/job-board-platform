import api from "./api";
import {
   AvailableCandidatesResponse,
  ProfileStats,
  CategoryStats,
  FeaturedJob,
  JobStats  
 } from "../../types/dashboard";

export const dashboardService = {
  // Get available candidates
  async getAvailableCandidates() {
    const response = await api.get<AvailableCandidatesResponse>('/account/profiles/available_candidates/');
    return response.data;
  },

  // Get profile statistics
  async getProfileStats() {
    const response = await api.get<ProfileStats>('/account/profiles/profile_stats/');
    return response.data;
  },

  // Get category statistics
  async getCategoryStats() {
    const response = await api.get<CategoryStats[]>('/api/categories/stats/');
    return response.data;
  },

  // Get featured jobs
  async getFeaturedJobs() {
    const response = await api.get<FeaturedJob[]>('/api/jobs/featured/');
    return response.data;
  },

  // Get job statistics
  async getJobStats() {
    const response = await api.get<JobStats>('/api/jobs/stats/');
    return response.data;
  }
};