// components/dashboard/ExperienceDistributionChart.tsx
"use client";

import type { ProfileStats } from "../../../types/dashboard";

interface ExperienceDistributionChartProps {
  data: ProfileStats["experience_level_distribution"];
}

export function ExperienceDistributionChart({ data }: ExperienceDistributionChartProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="space-y-4">
      {data.map((item) => {
        const percentage = total > 0 ? (item.count / total) * 100 : 0;
        
        return (
          <div key={item.experience_level} className="flex items-center space-x-4">
            <div className="w-24 text-sm font-medium text-gray-700 capitalize">
              {item.experience_level.replace('_', ' ')}
            </div>
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="w-16 text-sm text-gray-600 text-right">
              {item.count} ({percentage.toFixed(1)}%)
            </div>
          </div>
        );
      })}
    </div>
  );
}
