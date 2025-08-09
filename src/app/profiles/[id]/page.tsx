'use client'

import React, { useEffect } from 'react';
import { ProfileDetail } from '@/components/profiles/ProfileDetail';
import { Link } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface ProfilePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProfilePage({ params }: ProfilePageProps) {
   const { token } = useAuth();
    const router = useRouter();
  
    useEffect(() => {
      if (token === undefined) return; // loading
      if (token === null) router.push("/login"); // redirect no token
    }, [token, router]);
  
    if (token === undefined) return <p>Loading authentication status...</p>;


  const resolvedParams = React.use(params);
  
  console.log('ProfilePage params:', resolvedParams);
  
  const profileId = parseInt(resolvedParams.id);
  
  

  if (!resolvedParams.id || resolvedParams.id === 'undefined') {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="text-red-600 mb-4">Profile ID is undefined</div>
        <p className="text-gray-600 mb-4">
          The profile ID in the URL is missing or invalid.
        </p>
        <Link href="/profiles" className="text-blue-600 hover:text-blue-800">
          Back to Profiles
        </Link>
      </div>
    );
  }

  if (isNaN(profileId)) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="text-red-600 mb-4">Invalid profile ID: {resolvedParams.id}</div>
        <p className="text-gray-600 mb-4">
          The profile ID must be a valid number.
        </p>
        <Link href="/profiles" className="text-blue-600 hover:text-blue-800">
          Back to Profiles
        </Link>
      </div>
    );
  }

  return <ProfileDetail profileId={profileId} />;
}
