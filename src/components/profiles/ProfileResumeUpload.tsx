"use client";

import { useProfile } from "@/context/ProfileContext";
import React, { useState } from "react";
import { profileService } from "@/lib/profileService";

interface ResumeUploadProps {
    profileId: number;
}

const ProfileResumeUpload: React.FC<ResumeUploadProps> = ({ profileId }) => {
const { loading } = useProfile();
const [file,setFile] = useState<File | null>(null);
const [uploading, setUploading] = useState(false);

const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    try {
        await profileService.uploadResume(profileId, file);
        alert("Resume upload!");
    } catch (err) {
        console.error("Upload failed", err);
        alert("Upload failed");
    } finally {
        setUploading(false);
    }
};

return (
    <div className="flex items-center gap-2">
      <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button
        onClick={handleUpload}
        disabled={!file || uploading || loading}
        className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        {uploading ? "Uploading..." : "Upload Resume"}
      </button>
    </div>
  );
}

export default ProfileResumeUpload