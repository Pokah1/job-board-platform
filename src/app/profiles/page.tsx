"use client";

import ProfileList from "@/components/profiles/ProfileList";

const ProfilesPage = () => {
return (
    <main className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Profiles</h1>
        <ProfileList />
    </main>
)
}

export default ProfilesPage