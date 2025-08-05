"use client"

import React, {useEffect} from "react";
import { useProfile } from "@/context/ProfileContext";

const ProfileList: React.FC = () => {
const {profiles, loading, error, fetchProfiles } = useProfile();

useEffect(() => {
    fetchProfiles();
}, [fetchProfiles]);

if (loading) return <p>Loading Profiles...</p>
if (error) return <p className="text-red-500">{error}</p>;
if (!profiles.length) return <p>No Profiles found..</p>;

return (
    <main className="space-y-4">
        {profiles.map((profile) => (
        <div 
        key={profile.id}
        className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
        >
        <h2 className="text-lg font-semibold">{profile.user.username}</h2>
        <p className="text-sm text-gray-500">{profile.job_title || "No Job Title"}</p>
        <p className="text-sm">{profile.city},{profile.country}</p>
        </div>    
        ))}
    </main>
)
} 

export default ProfileList