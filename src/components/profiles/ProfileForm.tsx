"use client";

import React, { useState, useEffect } from "react";
import { useProfile } from "@/context/ProfileContext";
import { UpdateProfilePayload, CreateProfilePayload } from "../../../types/profile";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface ProfileFormProps {
    mode: "create" | "edit";
}

const ProfileForm: React.FC<ProfileFormProps> = ({ mode }) => {
const {myProfile, createProfile, updateMyProfile, fetchMyProfile, loading} = useProfile();

const [formData, setFormData] = useState<UpdateProfilePayload>({
    bio: "",
    job_title: "",
    city: "",
    country: "",
    expected_salary_min: undefined,
    expected_salary_max: undefined,
    skills: "",
});

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
    setFormData((prev) => ({...prev, [name]: value}));
};

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "create") {
        await createProfile(formData as CreateProfilePayload);
    } else {
        await updateMyProfile(formData);
        fetchMyProfile();
    }
};

return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
        <textarea 
        name="bio" 
        placeholder="Bio"
        value={formData.bio || ""}
        onChange={handleChange}
        className="w-full bprder p-2 rounded" 
        />
        <Input 
        type="text"
        name="city"
        placeholder="City"
        value={formData.city || ""}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        />
        <Input 
        type="text"
         name="country"
        placeholder="Country"
        value={formData.country || ""}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        />
        <Input 
        type="number"
        name="expected_salary_min"
        placeholder="Expected Salary Min"
        value={formData.expected_salary_min || ""}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        />
        <Input 
        type="number"
         name="expected_salary_max"
        placeholder="Expected Salary Max"
        value={formData.expected_salary_max || ""}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        />
        <Input 
        type="text"
         name="skills"
        placeholder="Skills (comma separated)"
        value={formData.skills || ""}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        />

        <Button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
        {loading ? "Saving..." : mode === "create" ? "Create Profile" : "Update Profile"}
        </Button>

        
    </form>
)
}

export default ProfileForm