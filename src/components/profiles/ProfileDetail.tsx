"use client";

import React, { useEffect, useState } from "react";
import { useProfile } from "@/context/ProfileContext";
import { Profile } from "../../../types/profile";
import Image from "next/image";

interface ProfileDetailProps {
  profileId: number;
}

const ProfileDetail: React.FC<ProfileDetailProps> = ({ profileId }) => {
  const { loading, error } = useProfile();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await import("@/lib/profileService").then((m) =>
          m.profileService.getProfileById(profileId)
        );
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [profileId]);

  if (loading) return <p>Loading Profile...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!profile) return <p> Profile Not Found</p>;

  return (
    <main className="p-4 border rounded-lg shadow-sm">
      <Image
        src={profile.profile_image_url || "/default-avatar.png"}
        alt={profile.user.username}
        className="w-24 h-24 rounded-full object-cover"
      />
      <h1 className="text-xl font-bold mt-2">{profile.user.username}</h1>
      <p className="text-gray-600">{profile.job_title}</p>
      <p>{profile.bio}</p>
      <p className="text-sm text-gray-500">
        {profile.city}, {profile.country}
      </p>
    </main>
  );
};

export default ProfileDetail;
