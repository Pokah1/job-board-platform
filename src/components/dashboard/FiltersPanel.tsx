"use client";

import { useState } from "react";

export interface Filters {
  category: string;
  location: string;
  experience: string;
}

const FilterPanel =({ onApplyFilters }: { onApplyFilters: (filters: Filters) => void })  => {
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");

  const applyFilters = () => {
    onApplyFilters({ category, location, experience });
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg space-y-4">
      <div>
        <label className="block text-sm text-gray-400">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
        >
          <option value="">All</option>
          <option value="engineering">Engineering</option>
          <option value="design">Design</option>
          <option value="marketing">Marketing</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-400">Location</label>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Remote"
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-400">Experience Level</label>
        <select
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
        >
          <option value="">All</option>
          <option value="entry">Entry Level</option>
          <option value="mid">Mid Level</option>
          <option value="senior">Senior Level</option>
        </select>
      </div>

      <button
        onClick={applyFilters}
        className="w-full bg-blue-500 py-2 rounded-lg hover:bg-blue-600"
      >
        Apply Filters
      </button>
    </div>
  );
}

export default FilterPanel;
