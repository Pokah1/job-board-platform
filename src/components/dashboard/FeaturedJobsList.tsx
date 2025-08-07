import type { FeaturedJob } from "../../../types/dashboard";

interface FeaturedJobsListProps {
  jobs: FeaturedJob[];
}

export function FeaturedJobsList({ jobs }: FeaturedJobsListProps) {
  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return 'Salary not specified';
    
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    
    if (min && max) {
      return `${formatter.format(min)} - ${formatter.format(max)}`;
    }
    
    return formatter.format(min || max || 0);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-4">
      {jobs.slice(0, 5).map((job) => (
        <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">
              {job.title}
            </h4>
            <span className="text-xs text-gray-500 ml-2">
              {formatDate(job.created_at)}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 mb-2">{job.company_name}</p>
          
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {job.category.name}
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
              {job.employment_type.replace('_', ' ')}
            </span>
          </div>
          
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>{job.location}</span>
            <span>{formatSalary(job.salary_min, job.salary_max)}</span>
          </div>
        </div>
      ))}
      
      {jobs.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          <p className="text-sm">No featured jobs available</p>
        </div>
      )}
    </div>
  );
}
