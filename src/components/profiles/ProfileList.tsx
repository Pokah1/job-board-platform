'use client'

import { useEffect, useMemo, useState } from 'react';
import { useProfile } from '@/context/ProfileContext';
import { useProfileActions } from '@/hooks/useProfileActions';
import { ProfileCard } from './ProfileCard ';
import { Pagination } from './Pagination';
import { House, User } from 'lucide-react';
import Link from 'next/link';



interface ProfileListProps {
  type?: 'all' | 'candidates';
  showActions?: boolean;
}


export function ProfileList({ type = 'all', showActions = false }: ProfileListProps) {
  const { state } = useProfile();
  const { fetchAllProfiles, fetchAvailableCandidates, deleteProfile } = useProfileActions();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12); // Show 12 profiles per page

  // Use useMemo to prevent dependency changes on every render
  const profiles = useMemo(() => {
    return type === 'candidates' 
      ? (state.availableCandidates || []) 
      : (state.profiles || []);
  }, [type, state.availableCandidates, state.profiles]);

  // Client-side pagination since API doesn't paginate
  const totalProfiles = profiles.length;
  const totalPages = Math.ceil(totalProfiles / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProfiles = profiles.slice(startIndex, endIndex);

  useEffect(() => {
    console.log('ProfileList useEffect triggered', { type, filters: state.filters });
    
    if (type === 'candidates') {
      fetchAvailableCandidates(state.filters);
    } else {
      fetchAllProfiles(state.filters);
    }
  }, [type, state.filters, fetchAllProfiles, fetchAvailableCandidates]);

  // Reset to page 1 when profiles change
  useEffect(() => {
    setCurrentPage(1);
  }, [profiles.length, state.filters]);

  // Debug logging
  // useEffect(() => {
  //   console.log('ProfileList state:', {
  //     loading: state.loading,
  //     error: state.error,
  //     totalProfiles: profiles.length,
  //     currentPage,
  //     totalPages,
  //     currentProfiles: currentProfiles.length,
  //     pagination: state.pagination
  //   });
  // }, [state, profiles, currentPage, totalPages, currentProfiles]);

  const handleDelete = async (id: number) => {
    if (!id) {
      console.error('Cannot delete profile: ID is undefined');
      alert('Cannot delete profile: Invalid ID');
      return;
    }

    if (window.confirm('Are you sure you want to delete this profile?')) {
      try {
        await deleteProfile(id);
        console.log('Profile deleted successfully:', id);
      } catch (error) {
        console.error('Failed to delete profile:', error);
        alert('Failed to delete profile. Please try again.');
      }
    }
  };

  const handleRefresh = () => {
    console.log('Refreshing profiles...');
    setCurrentPage(1);
    if (type === 'candidates') {
      fetchAvailableCandidates(state.filters);
    } else {
      fetchAllProfiles(state.filters);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (state.loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Loading {type === 'candidates' ? 'Available Candidates' : 'All Profiles'}...
          </h2>
        </div>
        
        {/* Loading Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(12)].map((_, i) => (
            <div key={`loading-${i}`} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="animate-pulse">
                <div className="flex flex-col items-center space-y-4">
                  <div className="rounded-full bg-gray-300 h-16 w-16"></div>
                  <div className="space-y-2 w-full">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/4 mx-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">{state.error}</div>
        <div className="space-x-4">
          <button
            onClick={handleRefresh}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Sticky Home Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          href="/dashboard"
          className="bg-accent hover:bg-accent/40 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
          title="Go to Dashboard"
        >
          <House />
        </Link>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {type === 'candidates' ? 'Available Candidates' : 'All Profiles'}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Showing {startIndex + 1}-{Math.min(endIndex, totalProfiles)} of {totalProfiles} profiles
            {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
          </p>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={handleRefresh}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
          >
            Refresh
          </button>
          {showActions && (
            <button
              onClick={() => {
                console.log('Create new profile clicked');
                alert('Create profile functionality - to be implemented');
              }}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm"
            >
              Create Profile
            </button>
          )}
        </div>
      </div>

      {/* Profiles Grid */}
      {totalProfiles === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
           <User />
          </div>
          <div className="text-gray-500 mb-4">
            {state.loading ? 'Loading profiles...' : 'No profiles found.'}
          </div>
          {!state.loading && (
            <button
              onClick={handleRefresh}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Refresh
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentProfiles.map((profile, index) => (
              <ProfileCard
                key={profile?.user?.id || `profile-${startIndex + index}`}
                profile={profile}
                showActions={showActions}
                onDelete={handleDelete}
                onEdit={(id) => {
                  console.log('Edit profile clicked:', id);
                  alert(`Edit profile ${id} - to be implemented`);
                }}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalCount={totalProfiles}
                pageSize={pageSize}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}