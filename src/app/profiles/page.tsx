"use client";

import { useEffect } from "react";
import { useProfile } from "@/context/ProfileContext";
// import MyProfileCard from "@/components/profiles/MyProfileCard ";
import ProfileList from "@/components/profiles/ProfileList";

const ProfilesPage = () => {
  const { fetchProfiles, fetchMyProfile } = useProfile();

  useEffect(() => {
    fetchMyProfile();
    fetchProfiles();
  }, [fetchMyProfile, fetchProfiles]);

  return (
    <main className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Profiles</h1>
      <section>
        <h2 className="text-2xl font-semibold mb-4">All Profiles</h2>
        <ProfileList />
      </section>
    </main>
  );
};

export default ProfilesPage;
