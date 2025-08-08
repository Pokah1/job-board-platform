'use client'

import { ProfileProvider } from "@/context/ProfileContext";
import { ProfileList } from "@/components/profiles/ProfileList";


export default function CandidatesPage() {
  return (
    <ProfileProvider>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Available Candidates</h1>
          <p className="mt-2 text-foreground">
            Find talented candidates who are actively looking for opportunities
          </p>
        </div>
        
        <ProfileList type="candidates" />
      </div>
    </ProfileProvider>
  );
}
