// app/profiles/create/page.tsx
"use client";

import  ProfileForm  from "@/components/profiles/ProfileForm";

export default function CreateProfilePage() {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create Profile</h1>
      <ProfileForm mode="create"/>
    </main>
  );
}
