"use client";

import React, { useEffect, useState } from "react";
import { Profile } from "../../../types/profile";
import { profileService } from "@/lib/profileService";
import Image from "next/image";
import Link from "next/link";



interface ProfileDetailProps {
  profileId: number;
}

interface ApiError {
  response?: {
    status: number;
    data?: unknown;
  };
  message?: string;
}

export function ProfileDetail({ profileId }: ProfileDetailProps) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        console.log('Fetching profile with ID:', profileId);
        setLoading(true);
        setError(null);
        setNotFound(false);
        
        const data = await profileService.getProfileById(profileId);
        console.log('Profile fetched successfully:', data);
        setProfile(data);
      } catch (err: unknown) {
        console.log('Profile fetch failed for ID:', profileId, err);
        
        const apiError = err as ApiError;
        
        // Handle 404 errors silently - just show "not found" without error styling
        if (apiError.response?.status === 404) {
          setNotFound(true);
          setError(null); // Don't set error for 404s
        } else if (apiError.response?.status === 401) {
          setError('You are not authorized to view this profile');
        } else if (apiError.response?.status === 403) {
          setError('Access denied to this profile');
        } else {
          // For other errors, show a generic message but don't make it alarming
          setError('Profile details are not available at the moment');
        }
      } finally {
        setLoading(false);
      }
    }

    if (profileId) {
      fetchProfile();
    }
  }, [profileId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="flex space-x-6 mb-8">
            <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
            <div className="flex-1 space-y-4">
              <div className="h-8 bg-gray-300 rounded w-1/3"></div>
              <div className="h-6 bg-gray-300 rounded w-1/2"></div>
              <div className="h-6 bg-gray-300 rounded w-1/4"></div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  // Handle 404 - Profile not found (not an error, just unavailable)
  if (notFound) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            href="/profiles" 
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            ← Back to Profiles
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Profile Details Not Available</h2>
          <p className="text-gray-600 mb-6">
            This profile exists but detailed information is not currently available.
          </p>
          <div className="space-x-4">
            <Link 
              href="/profiles" 
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 inline-block"
            >
              Browse Other Profiles
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Handle other errors (auth, server errors, etc.)
  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            href="/profiles" 
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            ← Back to Profiles
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Unable to Load Profile</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-x-4">
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Try Again
            </button>
            <Link 
              href="/profiles" 
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 inline-block"
            >
              Back to Profiles
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <div className="text-gray-600 mb-4">Profile not found</div>
        <Link href="/profiles" className="text-blue-600 hover:text-blue-800">
          Back to Profiles
        </Link>
      </div>
    );
  }

  const formatSalary = (min?: string | null, max?: string | null) => {
    if (!min && !max) return 'Not specified';
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get user info safely
  const userName = profile.user?.full_name || profile.user?.username || 'Anonymous User';
  const userEmail = profile.user?.email || 'No email provided';

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Back Button */}
      <div className="mb-6">
        <Link 
          href="/profiles" 
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          ← Back to Profiles
        </Link>
      </div>

      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
        <div className="flex items-start space-x-6">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            {profile.profile_image_url ? (
              <Image
                src={profile.profile_image_url || "/placeholder.svg"}
                alt={`${userName}'s profile`}
                width={128}
                height={128}
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-gray-600 text-4xl font-semibold">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* Basic Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {userName}
                </h1>
                <p className="text-xl text-gray-600 mt-1">{profile.job_title || 'No job title specified'}</p>
                {profile.company && (
                  <p className="text-lg text-gray-500 mt-1">at {profile.company}</p>
                )}
                <p className="text-sm text-gray-500 mt-2">@{profile.user.username}</p>
              </div>
              
              {profile.is_available_for_hire && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Available for Hire
                </span>
              )}
            </div>

            <div className="mt-4 flex items-center space-x-6 text-gray-600">
              <span>{profile.city || 'Unknown'}, {profile.country || 'Unknown'}</span>
              <span>•</span>
              <span>{getExperienceLabel(profile.experience_level)}</span>
              {profile.age && (
                <>
                  <span>•</span>
                  <span>{profile.age} years old</span>
                </>
              )}
              <span>•</span>
              <span>{formatSalary(profile.expected_salary_min, profile.expected_salary_max)}</span>
            </div>

            {/* Contact Links */}
            <div className="mt-4 flex space-x-4">
              {profile.linkedin_url && (
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  LinkedIn
                </a>
              )}
              {profile.github_url && (
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  GitHub
                </a>
              )}
              {profile.website_url && (
                <a
                  href={profile.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Website
                </a>
              )}
            </div>

            {/* Member since */}
            <div className="mt-4 text-sm text-gray-500">
              Member since {formatDate(profile.user.date_joined)}
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bio */}
          {profile.bio && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{profile.bio}</p>
            </div>
          )}

          {/* Skills */}
          {profile.skills_list && profile.skills_list.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills_list.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {profile.education && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Education</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{profile.education}</p>
            </div>
          )}

          {/* Certifications */}
          {profile.certifications && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Certifications</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{profile.certifications}</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Info */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-500">Email</span>
                <p className="text-gray-900">{userEmail}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Username</span>
                <p className="text-gray-900">@{profile.user.username}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Location</span>
                <p className="text-gray-900">
                  {profile.city || 'Not specified'}, {profile.country || 'Not specified'}
                </p>
              </div>
              {profile.gender && (
                <div>
                  <span className="text-sm font-medium text-gray-500">Gender</span>
                  <p className="text-gray-900 capitalize">{profile.gender}</p>
                </div>
              )}
            </div>
          </div>

          {/* Profile Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Available for Hire</span>
                <span className={`text-sm font-medium ${profile.is_available_for_hire ? 'text-green-600' : 'text-gray-600'}`}>
                  {profile.is_available_for_hire ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Experience Level</span>
                <span className="text-sm font-medium text-gray-900">
                  {getExperienceLabel(profile.experience_level)}
                </span>
              </div>
              {profile.expected_salary_min || profile.expected_salary_max ? (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Expected Salary</span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatSalary(profile.expected_salary_min, profile.expected_salary_max)}
                  </span>
                </div>
              ) : null}
            </div>
          </div>

          {/* Additional Info */}
          {(profile.linkedin_url || profile.github_url || profile.website_url) && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Links</h3>
              <div className="space-y-2">
                {profile.linkedin_url && (
                  <div>
                    <a
                      href={profile.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      LinkedIn Profile →
                    </a>
                  </div>
                )}
                {profile.github_url && (
                  <div>
                    <a
                      href={profile.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      GitHub Profile →
                    </a>
                  </div>
                )}
                {profile.website_url && (
                  <div>
                    <a
                      href={profile.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Personal Website →
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
