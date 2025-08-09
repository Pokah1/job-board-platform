'use client'

import { useEffect } from 'react';
import { ProfileProvider } from '@/context/ProfileContext';
import { ProfileList } from '@/components/profiles/ProfileList';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function ProfilesPage() {

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
          <h1 className="text-3xl font-bold text-foreground">All Profiles</h1>
          <p className="mt-2 text-foreground">
            Browse through all registered profiles on our platform
          </p>
          <Button>
          <Link href="/profiles/candidates">
           Candidates for Hire
          </Link>
         
          </Button>
        </div>
        
        <ProfileList type="all" showActions={true} />
      </div>
    </ProfileProvider>
  );
}

