"use client";
import React, { useState } from "react";
import { useProfile } from "@/context/ProfileContext";
import { profileService } from "@/lib/profileService";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface ImageUploadProps {
  profileId: number;
}

const ProfileImageUpload: React.FC<ImageUploadProps> = ({ profileId }) => {
  const { loading } = useProfile();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    try {
      await profileService.uploadProfileImage(profileId, file);
      alert("Profile image uploaded");
    } catch (err) {
      console.error("Upload failed, err", err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <Button
        onClick={handleUpload}
        disabled={!file || uploading || loading}
        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
      ></Button>
    </div>
  );
};

export default ProfileImageUpload;
