'use client'

import { ProfileProvider } from "@/context/ProfileContext";
import { ProfileList } from "@/components/profiles/ProfileList";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";


export default function CandidatesPage() {
   const { token } = useAuth();
    const router = useRouter();
  
    useEffect(() => {
      if (token === undefined) return; // loading
      if (token === null) router.push("/login"); // redirect no token
    }, [token, router]);
  
    if (token === undefined) return <p>Loading authentication status...</p>;
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
