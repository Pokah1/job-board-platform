// components/dashboard/JobStatsOverview.tsx
import type { JobStats } from "../../../types/dashboard";


interface JobStatsOverviewProps {
  stats: JobStats;
}

export function JobStatsOverview({ stats }: JobStatsOverviewProps) {
  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(salary);
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-indigo-600">Total Jobs</h3>
          <p className="text-2xl font-bold text-indigo-900">{stats.total_jobs}</p>
        </div>
        
        <div className="bg-emerald-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-emerald-600">Total Applications</h3>
          <p className="text-2xl font-bold text-emerald-900">{stats.total_applications}</p>
        </div>
      </div>

      {/* Employment Type Distribution */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Employment Types</h4>
        <div className="space-y-2">
          {stats.employment_type_distribution.map((item) => (
            <div key={item.employment_type} className="flex justify-between items-center">
              <span className="text-sm text-gray-600 capitalize">
                {item.employment_type.replace('_', ' ')}
              </span>
              <span className="text-sm font-medium text-gray-900">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Average Salary by Level */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Average Salary by Level</h4>
        <div className="space-y-2">
          {stats.average_salary_by_level.map((item) => (
            <div key={item.experience_level} className="flex justify-between items-center">
              <span className="text-sm text-gray-600 capitalize">
                {item.experience_level.replace('_', ' ')}
              </span>
              <span className="text-sm font-medium text-gray-900">
                {formatSalary(item.avg_salary)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}