'use client'

import { ProfileProvider } from '@/context/ProfileContext';
import { ProfileList } from '@/components/profiles/ProfileList';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ProfilesPage() {
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

