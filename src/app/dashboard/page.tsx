'use client'

import { useEffect, useState } from 'react';
import { dashboardService } from '@/lib/dashboardServices';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { ExperienceDistributionChart } from '@/components/dashboard/ExperienceDistributionChart';
import { JobStatsOverview } from '@/components/dashboard/JobStatsOverview';
import { CategoryStatsList } from '@/components/dashboard/CategoryStatsList';
import { FeaturedJobsList } from '@/components/dashboard/FeaturedJobsList';

import { 
  CandidateProfile, 
  ProfileStats, 
  CategoryStats, 
  FeaturedJob, 
  JobStats 
} from '../../../types/dashboard';

interface DashboardData {
  availableCandidates: CandidateProfile[];
  profileStats: ProfileStats;
  categoryStats: CategoryStats[];
  featuredJobs: FeaturedJob[];
  jobStats: JobStats;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch all dashboard data in parallel
        const [
          availableCandidatesData,
          profileStats,
          categoryStats,
          featuredJobs,
          jobStats
        ] = await Promise.all([
          dashboardService.getAvailableCandidates(),
          dashboardService.getProfileStats(),
          dashboardService.getCategoryStats(),
          dashboardService.getFeaturedJobs(),
          dashboardService.getJobStats()
        ]);

        // Extract candidates from the results wrapper
        const availableCandidates = availableCandidatesData.results;

        setData({
          availableCandidates,
          profileStats,
          categoryStats,
          featuredJobs,
          jobStats
        });
      } catch (err) {
        console.error('Dashboard data fetch error:', err);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Unable to Load Dashboard
          </h1>
          <p className="text-gray-600 mb-6">
            {error || 'There was an error loading the dashboard data.'}
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-accent">Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Overview of your job board performance and statistics
          </p>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Stats */}
          <div className="lg:col-span-2 space-y-8">
            {/* Dashboard Overview */}
            <div className="bg-foreground rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Profile Overview
                </h2>
                <DashboardOverview 
                  profileStats={data.profileStats}
                  availableCandidates={data.availableCandidates}
                />
              </div>
            </div>

            {/* Experience Distribution Chart */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Experience Level Distribution
                </h2>
                <ExperienceDistributionChart 
                  data={data.profileStats.experience_level_distribution}
                />
              </div>
            </div>

            {/* Job Statistics */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Job Statistics
                </h2>
                <JobStatsOverview stats={data.jobStats} />
              </div>
            </div>
          </div>

          {/* Right Column - Secondary Stats */}
          <div className="space-y-8">
            {/* Category Statistics */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Categories
                </h2>
                <CategoryStatsList categories={data.categoryStats} />
              </div>
            </div>

            {/* Featured Jobs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Featured Jobs
                </h2>
                <FeaturedJobsList jobs={data.featuredJobs} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
