// components/dashboard/CategoryStatsList.tsx
import type { CategoryStats } from "../../types/dashboard";

interface CategoryStatsListProps {
  categories: CategoryStats[];
}

export function CategoryStatsList({ categories }: CategoryStatsListProps) {
  const sortedCategories = [...categories].sort((a, b) => b.job_count - a.job_count);

  return (
    <div className="space-y-3">
      {sortedCategories.map((category) => (
        <div key={category.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div>
            <h4 className="text-sm font-medium text-gray-900">{category.name}</h4>
          </div>
          <div className="text-right">
            <span className="text-sm font-semibold text-gray-700">{category.job_count}</span>
            <p className="text-xs text-gray-500">jobs</p>
          </div>
        </div>
      ))}
      
      {categories.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          <p className="text-sm">No categories available</p>
        </div>
      )}
    </div>
  );
}
