"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";

const CreateJobPage = () => {
  const { token } = useAuth();

  const [form, setForm] = useState({
    title: "",
    description: "",
    company_name: "",
    location: "",
    employment_type: "",
    experience_level: "",
    salary_min: "",
    salary_max: "",
    requirements: "",
    benefits: "",
    category_id: "",
    application_deadline: "",
  });

  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setMessage("You must be logged in to post a job.");
      return;
    }

    try {
      const res = await api.post("/api/jobs/", {
        ...form,
        salary_min: form.salary_min ? Number(form.salary_min) : null,
        salary_max: form.salary_max ? Number(form.salary_max) : null,
        category_id: Number(form.category_id),
        application_deadline: form.application_deadline || null,
      });

      setMessage(`Job "${res.data.title}" created successfully!`);
    } catch (error) {
      console.error("Failed to create job", error);
      setMessage("Failed to create job");
    }

    // Reset form
    setForm({
      title: "",
      description: "",
      company_name: "",
      location: "",
      employment_type: "",
      experience_level: "",
      salary_min: "",
      salary_max: "",
      requirements: "",
      benefits: "",
      category_id: "",
      application_deadline: "",
    });
  };

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Post a New Job</h2>
      {message && (
        <p className="mb-4 text-center font-medium text-green-500">
          {message}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-lg shadow-lg space-y-6"
      >
        {/* Job Title & Company Name */}
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Job Title"
            required
            className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
          />
          <Input
            name="company_name"
            value={form.company_name}
            onChange={handleChange}
            placeholder="Company Name"
            required
            className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
          />
        </div>

        {/* Location & Category */}
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            required
            className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
          />
          <Input
            type="number"
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            placeholder="Category ID"
            required
            className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
          />
        </div>

        {/* Employment & Experience */}
        <div className="grid md:grid-cols-2 gap-4">
          <select
            name="employment_type"
            value={form.employment_type}
            onChange={handleChange}
            className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
          >
            <option value="">Select Employment Type</option>
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="contract">Contract</option>
            <option value="temporary">Temporary</option>
            <option value="internship">Internship</option>
          </select>

          <select
            name="experience_level"
            value={form.experience_level}
            onChange={handleChange}
            className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
          >
            <option value="">Select Experience Level</option>
            <option value="entry">Entry</option>
            <option value="mid">Mid</option>
            <option value="senior">Senior</option>
            <option value="director">Director</option>
          </select>
        </div>

        {/* Salary Min & Max */}
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            type="number"
            name="salary_min"
            value={form.salary_min}
            onChange={handleChange}
            placeholder="Salary Min"
            className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
          />
          <Input
            type="number"
            name="salary_max"
            value={form.salary_max}
            onChange={handleChange}
            placeholder="Salary Max"
            className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
          />
        </div>

        {/* Dates */}
        <Input
          type="datetime-local"
          name="application_deadline"
          value={form.application_deadline}
          onChange={handleChange}
          className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
        />

        {/* Descriptions */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Job Description"
          required
          rows={4}
          className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
        />
        <textarea
          name="requirements"
          value={form.requirements}
          onChange={handleChange}
          placeholder="Requirements"
          required
          rows={3}
          className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
        />
        <textarea
          name="benefits"
          value={form.benefits}
          onChange={handleChange}
          placeholder="Benefits"
          rows={3}
          className="w-full p-2 border border-gray-700 rounded bg-gray-800 text-white"
        />

        {/* Submit */}
        <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-semibold transition"
        >
          Create Job
        </Button>
      </form>
    </main>
  );
};

export default CreateJobPage;
