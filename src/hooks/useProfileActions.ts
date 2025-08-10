'use client'

import { useCallback } from "react"
import { profileService } from "@/lib/profileService"
import { useProfile } from "@/context/ProfileContext"
import { ProfileFilters, CreateProfilePayload, UpdateProfilePayload } from "../types/profile"

export function useProfileActions() {
  const { dispatch } = useProfile();

  const fetchAllProfiles = useCallback(async (filters?: ProfileFilters) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const data = await profileService.getAllProfiles(filters);
      dispatch({ 
        type: 'SET_PROFILES', 
        payload: { 
          profiles: data.results, 
          pagination: { count: data.count, next: data.next, previous: data.previous } 
        } 
      });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch profiles' });
      console.error('Error fetching profiles:', error);
    }
  }, [dispatch]);

  const fetchAvailableCandidates = useCallback(async (filters?: ProfileFilters) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const data = await profileService.getAvailableCandidates(filters);
      dispatch({ 
        type: 'SET_AVAILABLE_CANDIDATES', 
        payload: { 
          profiles: data.results, 
          pagination: { count: data.count, next: data.next, previous: data.previous } 
        } 
      });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch available candidates' });
      console.error('Error fetching available candidates:', error);
    }
  }, [dispatch]);

  const fetchMyProfile = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const profile = await profileService.getMyProfile();
      dispatch({ type: 'SET_MY_PROFILE', payload: profile });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch your profile' });
      console.error('Error fetching my profile:', error);
    }
  }, [dispatch]);

  const createProfile = useCallback(async (data: CreateProfilePayload) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const profile = await profileService.createProfile(data);
      dispatch({ type: 'SET_MY_PROFILE', payload: profile });
      return profile;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to create profile' });
      console.error('Error creating profile:', error);
      throw error;
    }
  }, [dispatch]);

  const updateMyProfile = useCallback(async (data: UpdateProfilePayload) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const profile = await profileService.updateMyProfile(data);
      dispatch({ type: 'UPDATE_PROFILE', payload: profile });
      return profile;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update profile' });
      console.error('Error updating profile:', error);
      throw error;
    }
  }, [dispatch]);

  // const uploadProfileImage = useCallback(async (id: number, file: File) => {
  //   try {
  //     dispatch({ type: 'SET_LOADING', payload: true });
  //     dispatch({ type: 'SET_ERROR', payload: null });
      
  //     const profile = await profileService.uploadProfileImage(id, file);
  //     dispatch({ type: 'UPDATE_PROFILE', payload: profile });
  //     return profile;
  //   } catch (error) {
  //     dispatch({ type: 'SET_ERROR', payload: 'Failed to upload profile image' });
  //     console.error('Error uploading profile image:', error);
  //     throw error;
  //   }
  // }, [dispatch]);

  // const uploadResume = useCallback(async (id: number, file: File) => {
  //   try {
  //     dispatch({ type: 'SET_LOADING', payload: true });
  //     dispatch({ type: 'SET_ERROR', payload: null });
      
  //     const profile = await profileService.uploadResume(id, file);
  //     dispatch({ type: 'UPDATE_PROFILE', payload: profile });
  //     return profile;
  //   } catch (error) {
  //     dispatch({ type: 'SET_ERROR', payload: 'Failed to upload resume' });
  //     console.error('Error uploading resume:', error);
  //     throw error;
  //   }
  // }, [dispatch]);

  const deleteProfile = useCallback(async (id: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      await profileService.deleteProfile(id);
      dispatch({ type: 'DELETE_PROFILE', payload: id });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete profile' });
      console.error('Error deleting profile:', error);
      throw error;
    }
  }, [dispatch]);

  const setFilters = useCallback((filters: ProfileFilters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  }, [dispatch]);

  const resetFilters = useCallback(() => {
    dispatch({ type: 'RESET_FILTERS' });
  }, [dispatch]);

  return {
    fetchAllProfiles,
    fetchAvailableCandidates,
    fetchMyProfile,
    createProfile,
    updateMyProfile,
    // uploadProfileImage,
    // uploadResume,
    deleteProfile,
    setFilters,
    resetFilters,
  };
}