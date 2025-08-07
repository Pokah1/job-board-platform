"use client"

import React, { createContext, useState, useCallback, useContext } from "react";

import { profileService } from "@/lib/profileService";


import { Profile, CreateProfilePayload, UpdateProfilePayload } from "../../types/profile";

interface ProfileContextValue {
    profiles: Profile[];
    myProfile: Profile | null;
    loading: boolean;
    error: string | null;


    // Profile Actions 
    fetchProfiles: (params?: Record<string, string | number | boolean | undefined>) => Promise<void>;
    fetchMyProfile: () => Promise<void>;
    createProfile: (data: CreateProfilePayload) => Promise<Profile | null>;
    updateMyProfile: (data: UpdateProfilePayload) => Promise<Profile | null>;
    deleteProfile: (id: number) => Promise<boolean>;
}

export const ProfileContext = createContext<ProfileContextValue>({
    profiles: [],
    myProfile: null,
    loading: false,
    error: null,
    fetchProfiles: async () => {},
    fetchMyProfile: async () => {},
    createProfile: async () => null,
    updateMyProfile: async () => null,
    deleteProfile: async () => false, 
});

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [myProfile, setMyProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** Fetch all profiles */
  const fetchProfiles = useCallback(async (params?: Record<string, string | number | boolean | undefined>) => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await profileService.getAllProfiles(params);
      setProfiles(data.results);
    } catch (err) {
        console.error("Failed to load profiles",  err )
      setError("Failed to load profiles");
    } finally {
      setLoading(false);
    }
  }, []);

  /** Fetch my profile */
   const fetchMyProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await profileService.getMyProfile();
      setMyProfile(data);
    } catch (err) {
        console.error("Failed to load your profile", err)
      setError("Failed to load your profile");
    } finally {
      setLoading(false);
    }
  }, []);

   /** Create profile */
   const createProfile = useCallback(async (data: CreateProfilePayload) => {
    try {
      setLoading(true);
      setError(null);
      const res = await profileService.createProfile(data);
      await fetchMyProfile(); // Refresh my profile
      await fetchProfiles(); // Refresh my profile
      return res.data;
    } catch (err) {
        console.error("Failed to create profile", err)
      setError("Failed to create profile");
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchMyProfile, fetchProfiles]);

   

  /** Update profile */
const updateMyProfile = useCallback(async (data: UpdateProfilePayload) => {
  try {
    setLoading(true);
    setError(null);
    const res = await profileService.updateMyProfile(data);
    setMyProfile(res.data);

    // Refresh profiles so list updates immediately
    await fetchProfiles();

    return res.data;
  } catch (err) {
    console.error("Failed to update profile", err);
    setError("Failed to update profile");
    return null;
  } finally {
    setLoading(false);
  }
}, [fetchProfiles]);





  /** Delete profile */
  const deleteProfile = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      await profileService.deleteProfile(id);
      setProfiles(prev => prev.filter(profile => profile.id !== id));
      if (myProfile?.id === id) {
        setMyProfile(null) //this clear profile if its mine
      }
      return true;
    } catch (err) {
        console.error("Failed to delete profile", err)
      setError("Failed to delete profile");
      return false;
    } finally {
      setLoading(false);
    }
  }, [myProfile]);



  return (
    <ProfileContext.Provider
    value={{
         profiles,
        myProfile,
        loading,
        error,
        fetchProfiles,
        fetchMyProfile,
        createProfile,
        updateMyProfile,
        deleteProfile,
    }}
    >
     {children}
    </ProfileContext.Provider>
  )
}


//Hook
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;

}
