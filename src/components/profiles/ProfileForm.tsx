"use client";

import { useState, useEffect } from "react";
import { useProfile } from "@/context/ProfileContext";
import { CreateProfilePayload, UpdateProfilePayload } from "../../../types/profile";
import { profileService } from "@/lib/profileService";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
// import { User, MapPin, Briefcase, FileText, Image as ImageIcon } from "lucide-react";

interface ProfileFormProps {
  mode: "create" | "edit";
  onSuccess?: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ mode, onSuccess }) => {
  const { myProfile, createProfile, updateMyProfile, fetchMyProfile, loading } = useProfile();

  const [formData, setFormData] = useState<UpdateProfilePayload>({
    bio: "",
    job_title: "",
    city: "",
    country: "",
    expected_salary_min: undefined,
    expected_salary_max: undefined,
    skills: "",
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [resume, setResume] = useState<File | null>(null);

  useEffect(() => {
    if (mode === "edit" && myProfile) {
      setFormData({
        bio: myProfile.bio || "",
        job_title: myProfile.job_title || "",
        city: myProfile.city || "",
        country: myProfile.country || "",
        expected_salary_min: myProfile.expected_salary_min || undefined,
        expected_salary_max: myProfile.expected_salary_max || undefined,
        skills: myProfile.skills || "",
      });
    }
  }, [mode, myProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let updatedProfile = null;

    if (mode === "create") {
      updatedProfile = await createProfile(formData as CreateProfilePayload);
    } else {
      updatedProfile = await updateMyProfile(formData);
    }

    if (updatedProfile) {
      try {
        if (profileImage) await profileService.uploadProfileImage(updatedProfile.id, profileImage);
        if (resume) await profileService.uploadResume(updatedProfile.id, resume);
      } catch (err) {
        console.error("Error uploading files", err);
      }

      await fetchMyProfile();
      if (onSuccess) onSuccess();
    }
  };

  return (
   <div className="max-w-4xl mx-auto bg-background shadow-lg rounded-xl overflow-hidden border border-gray-200">
  <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-6 p-8">
    
    {/* Left column */}
    <div className="space-y-6">
      <div>
        <label className="text-sm font-semibold text-gray-700">Bio</label>
        <textarea
          name="bio"
          rows={5}
          placeholder="Tell us about yourself..."
          value={formData.bio || ""}
          onChange={handleChange}
          className="mt-2 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-700">Job Title</label>
        <Input
          type="text"
          name="job_title"
          placeholder="e.g. Senior Software Engineer"
          value={formData.job_title || ""}
          onChange={handleChange}
          className="mt-2 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold text-gray-700">City</label>
          <input
            type="text"
            name="city"
            value={formData.city || ""}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700">Country</label>
          <Input
            type="text"
            name="country"
            value={formData.country || ""}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          />
        </div>
      </div>
    </div>

    {/* Right column */}
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold text-gray-700">Salary Min</label>
          <Input
            type="number"
            name="expected_salary_min"
            value={formData.expected_salary_min || ""}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-gray-700">Salary Max</label>
          <input
            type="number"
            name="expected_salary_max"
            value={formData.expected_salary_max || ""}
            onChange={handleChange}
            className="mt-2 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-700">Skills</label>
        <Input
          type="text"
          name="skills"
          placeholder="e.g. React, TypeScript, Node.js"
          value={formData.skills || ""}
          onChange={handleChange}
          className="mt-2 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-700">Profile Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
          className="mt-2 w-full"
        />
      </div>

      <div>
        <label className="text-sm font-semibold text-gray-700">Resume</label>
        <Input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResume(e.target.files?.[0] || null)}
          className="mt-2 w-full"
        />
      </div>
    </div>
  </form>

  {/* Sticky footer */}
  <div className="sticky bottom-0 bg-gray-500 border-t p-4 flex justify-end">
    <Button
      type="submit"
      disabled={loading}
      className="px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent/15 transition disabled:bg-gray-400"
    >
      {loading ? "Saving..." : mode === "create" ? "Create Profile" : "Update Profile"}
    </Button>
  </div>
</div>

  );
};

export default ProfileForm;
