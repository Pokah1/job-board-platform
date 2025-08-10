"use client";

import { Profile } from "../../types/profile";
import Image from "next/image";
import Link from "next/link";
import { SquarePen, Trash2 } from 'lucide-react';

interface ProfileCardProps {
  profile: Profile;
  showActions?: boolean;
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
}


export function ProfileCard({ profile, showActions = false, onDelete, onEdit }: ProfileCardProps) {
  const formatSalary = (min?: string | null, max?: string | null) => {
    if (!min && !max) return 'Salary not specified';
    if (min && max) return `$${min} - $${max}`;
    return `$${min || max}`;
  };

  const getExperienceLabel = (level: string) => {
    const labels = {
      entry: 'Entry Level',
      mid: 'Mid Level',
      senior: 'Senior Level',
      lead: 'Lead/Principal'
    };
    return labels[level as keyof typeof labels] || level || 'Not specified';
  };

  // Handle missing or invalid profile data 
  if (!profile) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-gray-600 text-center">Profile data unavailable</p>
      </div>
    );
  }

  // Handle missing user data
  const userName = profile.user?.full_name || profile.user?.username || 'Anonymous User';
  const profileId = profile.user?.id;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* Card Header */}
      <div className="p-6">
        {/* Profile Image and Basic Info */}
        <div className="flex flex-col items-center text-center mb-4">
          <div className="relative mb-3">
            {profile.profile_image_url ? (
              <Image
                src={profile.profile_image_url || "/placeholder.svg"}
                alt={`${userName}'s profile`}
                width={80}
                height={80}
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-100"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center border-2 border-gray-100">
                <span className="text-white text-2xl font-semibold">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            
            {/* Availability Badge */}
            {profile.is_available_for_hire && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            )}
          </div>

          <h3 className="text-lg font-semibold text-gray-900 truncate w-full">
            {userName}
          </h3>
          
          <p className="text-sm text-gray-600 truncate w-full">
            {profile.job_title || 'No job title'}
          </p>
          
          {profile.company && (
            <p className="text-xs text-gray-500 truncate w-full">
              at {profile.company}
            </p>
          )}
        </div>

        {/* Skills */}
        {profile.skills_list && profile.skills_list.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1 justify-center">
              {profile.skills_list.slice(0, 2).map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"
                >
                  {skill}
                </span>
              ))}
              {profile.skills_list.length > 2 && (
                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200">
                  +{profile.skills_list.length - 2}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Location & Experience */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-center text-xs text-gray-500">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">
              {profile.city || 'Unknown'}, {profile.country || 'Unknown'}
            </span>
          </div>
          
          <div className="flex items-center justify-center text-xs text-gray-500">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 002 2M8 6v2a2 2 0 002 2h4a2 2 0 002-2V6" />
            </svg>
            <span>{getExperienceLabel(profile.experience_level)}</span>
          </div>

          {profile.age && (
            <div className="flex items-center justify-center text-xs text-gray-500">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{profile.age} years old</span>
            </div>
          )}
        </div>

        {/* Salary Expectation */}
        <div className="text-center mb-4">
          <div className="text-sm font-medium text-gray-700">
            {formatSalary(profile.expected_salary_min, profile.expected_salary_max)}
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          {profileId ? (
            <Link
              href={`/profiles/${profileId}`}
              className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              View Profile
            </Link>
          ) : (
            <span className="flex-1 bg-gray-300 text-gray-500 text-center py-2 px-4 rounded-md text-sm">
              No ID available
            </span>
          )}
          
          {showActions && (
            <div className="flex space-x-2 ml-2">
              {onEdit && profileId && (
                <button
                  onClick={() => onEdit(profileId)}
                  className="p-2 text-accent
                  hover:text-accent/90 hover:bg-accent/5 rounded-md transition-colors"
                  title="Edit Profile"
                >
                  <SquarePen />
                </button>
              )}
              
              {onDelete && profileId && (
                <button
                  onClick={() => onDelete(profileId)}
                  className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                  title="Delete Profile"
                >
                  <Trash2 />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}