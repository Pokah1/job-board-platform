"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Filters } from "../../../types/filter";
import { Input } from "../ui/input";
import { Button } from "../ui/button";



const JobFilterPanel = ({onApplyFilters} : {onApplyFilters: (filters:Filters) => void}) => {
     const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);


   // Fetch categories dynamically
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get("api/categories/");
        setCategories(data.results || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const applyFilters = () => {
    onApplyFilters({category, location, experience});
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg space-y-4">
      {/* Category */}
      <div>
        <label className="block text-sm text-gray-400">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm text-gray-400">Location</label>
        <Input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Remote"
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
      </div>

      {/* Experience */}
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

      {/* Apply Button */}
      <Button
        onClick={applyFilters}
        className="w-full bg-blue-500 py-2 rounded-lg hover:bg-blue-600"
      >
        Apply Filters
      </Button>
    </div>
  )
}

export default JobFilterPanel