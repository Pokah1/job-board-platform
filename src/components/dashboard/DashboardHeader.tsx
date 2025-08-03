"use client";

import { Filter } from "lucide-react";
import { Button } from "../ui/button";

 const ApplicationHeader = ({ onToggleFilter }: { onToggleFilter: () => void }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Job Applications</h1>
      <Button
        onClick={onToggleFilter}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        <Filter size={18} />
        Filters
      </Button>
    </div>
  );
}
export default ApplicationHeader;
