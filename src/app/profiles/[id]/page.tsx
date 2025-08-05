// app/profiles/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import ProfileDetail from "@/components/profiles/ProfileDetail";

export default function ProfileDetailPage() {
  const { id } = useParams();

  if (!id) return <p>Invalid profile ID</p>;

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <ProfileDetail profileId={Number(id)} />
    </main>
  );
}
