import type { ProfileStats, CandidateProfile } from "../../types/dashboard";


interface DashboardOverviewProps {
  profileStats: ProfileStats;
  availableCandidates: CandidateProfile[];
}

export function DashboardOverview({ profileStats, availableCandidates }: DashboardOverviewProps) {
  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(salary);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-blue-600">Total Public Profiles</h3>
        <p className="text-2xl font-bold text-blue-900">{profileStats.total_public_profiles}</p>
      </div>
      
      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-green-600">Available Candidates</h3>
        <p className="text-2xl font-bold text-green-900">{profileStats.available_candidates}</p>
      </div>
      
      <div className="bg-purple-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-purple-600">Average Expected Salary</h3>
        <p className="text-2xl font-bold text-purple-900">
          {formatSalary(profileStats.average_expected_salary)}
        </p>
      </div>
      
      <div className="bg-orange-50 p-4 rounded-lg">
        <h3 className="text-sm font-medium text-orange-600">Recent Candidates</h3>
        <p className="text-2xl font-bold text-orange-900">{availableCandidates.length}</p>
      </div>
    </div>
  );
}
