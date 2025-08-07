"use client";

import React, { useState, useEffect } from "react";
import { useProfile } from "@/context/ProfileContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ProfileForm from "./ProfileForm";
import { Button } from "../ui/button";
import Link from "next/link";

const ProfileList: React.FC = () => {
  const { profiles, loading, error, fetchProfiles, myProfile, fetchMyProfile } = useProfile();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchProfiles();
    fetchMyProfile();
  }, [fetchProfiles, fetchMyProfile]);

  if (loading) return <p>Loading profiles...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!profiles.length) return <p>No profiles found.</p>;

  return (
    <main className="space-y-4">
      {profiles.map((profile) => {
        const isMyProfile = myProfile && profile.user.id === myProfile.user.id;

        return (
          <div key={profile.user.id} className="relative">
            {/* Clickable Card */}
            <Link 
              href={`/profiles/${profile.user.id}`} 
              className="block p-4 border rounded-lg shadow-sm hover:shadow-md transition bg-white"
            >
              <h2 className="text-lg font-semibold">{profile.user.username}</h2>
              <p className="text-sm text-gray-500">{profile.job_title || "No Job Title"}</p>
              <p className="text-sm">{profile.city}, {profile.country}</p>
              <p className="text-sm">{profile.company}</p>
            </Link>

            {/* Edit button for own profile */}
            {isMyProfile && (
              <div className="absolute top-4 right-4">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Edit Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Edit Your Profile</DialogTitle>
                    </DialogHeader>
                    <ProfileForm
                      mode="edit"
                      onSuccess={() => {
                        fetchProfiles();
                        fetchMyProfile();
                        setOpen(false);
                      }}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </div>
        );
      })}
    </main>
  );
};

export default ProfileList;
