"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Profile } from "../../../types/profile";
import { profileService } from "@/lib/profileService";
import Image from "next/image";
import { Briefcase, MapPin, Link as LinkIcon } from "lucide-react";

const ProfileDetail: React.FC = () => {
  const { id } = useParams();
  console.log("id from params:", id);

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch profile when ID changes
  useEffect(() => {
  if (!id) return;

  async function fetchProfile() {
    try {
      const res = await profileService.getAllProfiles(); // fetch all profiles
      const profiles = Array.isArray(res.data)
        ? res.data
        : res.data.results; // handle paginated API responses

      const foundProfile = profiles.find((p: Profile) => p.id === Number(id));
      setProfile(foundProfile || null);
    } catch (err) {
      console.error(err);
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  }

  fetchProfile();
}, [id]);


  if (loading) return <p className="p-4">Loading Profile...</p>;
  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (!profile) return <p className="p-4">Profile Not Found</p>;

  const {
    user,
    profile_image_url,
    job_title,
    city,
    country,
    bio,
    skills_list,
    expected_salary_min,
    expected_salary_max,
    website_url,
    linkedin_url,
    github_url,
  } = profile;

  return (
    <main className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Image
          src={profile_image_url || "/default-avatar.png"}
          alt={user.username}
          width={96}
          height={96}
          className="rounded-full object-cover border"
        />
        <div>
          <h1 className="text-2xl font-bold">
            {user.full_name || user.username}
          </h1>
          <p className="text-gray-600 flex items-center gap-1">
            <Briefcase className="w-4 h-4" />
            {job_title || "No job title"}
          </p>
          <p className="text-gray-500 flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            {city}, {country}
          </p>
        </div>
      </div>

      {/* About */}
      {bio && (
        <Section title="About">
          <p className="text-gray-700">{bio}</p>
        </Section>
      )}

      {/* Skills */}
      {skills_list?.length ? (
        <Section title="Skills">
          <div className="flex flex-wrap gap-2 mt-2">
            {skills_list.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm border"
              >
                {skill}
              </span>
            ))}
          </div>
        </Section>
      ) : null}

      {/* Expected Salary */}
      {(expected_salary_min || expected_salary_max) && (
        <Section title="Expected Salary">
          <p className="text-gray-700">
            {expected_salary_min || "?"} - {expected_salary_max || "?"}
          </p>
        </Section>
      )}

      {/* Links */}
      {(website_url || linkedin_url || github_url) && (
        <Section title="Links">
          <div className="flex flex-col gap-1 mt-2">
            {website_url && (
              <ExternalLink href={website_url}>Website</ExternalLink>
            )}
            {linkedin_url && (
              <ExternalLink href={linkedin_url}>LinkedIn</ExternalLink>
            )}
            {github_url && (
              <ExternalLink href={github_url}>GitHub</ExternalLink>
            )}
          </div>
        </Section>
      )}
    </main>
  );
};

/** Simple reusable section wrapper */
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <section>
    <h2 className="text-lg font-semibold">{title}</h2>
    <div className="mt-1">{children}</div>
  </section>
);

/** Reusable external link */
const ExternalLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 text-blue-600 hover:underline"
  >
    <LinkIcon className="w-4 h-4" /> {children}
  </a>
);

export default ProfileDetail;
