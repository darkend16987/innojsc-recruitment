'use client';

import { useState, useEffect } from 'react';
import { getPublishedJobs } from '@/lib/firestore-helpers';
import { Job } from '@/types/job';
import JobCard from '@/components/JobCard';
import ApplyModal from '@/components/ApplyModal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/components/Toast';
import { List, LayoutGrid, Search } from 'lucide-react';

export default function HomePage() {
  const toast = useToast();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchTerm, setSearchTerm] = useState('');

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [selectedJobTitle, setSelectedJobTitle] = useState<string>('');

  // Filter states
  const [filters, setFilters] = useState({
    location: '',
    jobType: '',
    expertise: '',
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const jobsData = await getPublishedJobs();
      setJobs(jobsData);
      if (jobsData.length > 0) {
        toast.success(`Đã tải ${jobsData.length} việc làm`);
      }
    } catch (err) {
      setError('Không thể tải danh sách việc làm. Vui lòng thử lại sau.');
      toast.error('Không thể tải danh sách việc làm');
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (jobId: string, jobTitle: string) => {
    setSelectedJobId(jobId);
    setSelectedJobTitle(jobTitle);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedJobId('');
    setSelectedJobTitle('');
  };

  // Filter jobs based on selected filters and search term
  const filteredJobs = jobs.filter(job => {
    // Text search
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        job.title.toLowerCase().includes(search) ||
        job.department.toLowerCase().includes(search) ||
        job.description.toLowerCase().includes(search) ||
        job.expertise.toLowerCase().includes(search);
      if (!matchesSearch) return false;
    }

    // Filters
    if (filters.location && job.location !== filters.location) return false;
    if (filters.jobType && job.jobType !== filters.jobType) return false;
    if (filters.expertise && job.expertise !== filters.expertise) return false;

    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-1/4">
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Bộ lọc</h3>
              <div className="space-y-4">
                {/* Location Filter */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Địa điểm</h4>
                  <div className="space-y-2">
                    {['Hà Nội', 'TP.HCM', 'Remote'].map(location => (
                      <label key={location} className="flex items-center">
                        <input
                          type="radio"
                          name="location"
                          value={location}
                          checked={filters.location === location}
                          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                          className="rounded text-blue-600"
                        />
                        <span className="ml-2 text-sm text-gray-700">{location}</span>
                      </label>
                    ))}
                    <button
                      onClick={() => setFilters({ ...filters, location: '' })}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Xóa bộ lọc
                    </button>
                  </div>
                </div>

                {/* Job Type Filter */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Loại công việc</h4>
                  <div className="space-y-2">
                    {['Full-time', 'Part-time', 'Intern', 'Contract'].map(type => (
                      <label key={type} className="flex items-center">
                        <input
                          type="radio"
                          name="jobType"
                          value={type}
                          checked={filters.jobType === type}
                          onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
                          className="rounded text-blue-600"
                        />
                        <span className="ml-2 text-sm text-gray-700">{type}</span>
                      </label>
                    ))}
                    <button
                      onClick={() => setFilters({ ...filters, jobType: '' })}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Xóa bộ lọc
                    </button>
                  </div>
                </div>

                {/* Expertise Filter */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Chuyên môn</h4>
                  <div className="space-y-2">
                    {['Frontend', 'Backend', 'BA', 'DevOps', 'Mobile'].map(expertise => (
                      <label key={expertise} className="flex items-center">
                        <input
                          type="radio"
                          name="expertise"
                          value={expertise}
                          checked={filters.expertise === expertise}
                          onChange={(e) => setFilters({ ...filters, expertise: e.target.value })}
                          className="rounded text-blue-600"
                        />
                        <span className="ml-2 text-sm text-gray-700">{expertise}</span>
                      </label>
                    ))}
                    <button
                      onClick={() => setFilters({ ...filters, expertise: '' })}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Xóa bộ lọc
                    </button>
                  </div>
                </div>

                {/* Clear All Filters */}
                <button
                  onClick={() => setFilters({ location: '', jobType: '', expertise: '' })}
                  className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Xóa tất cả bộ lọc
                </button>
              </div>
            </div>
          </aside>

          {/* Job List */}
          <main className="w-full md:w-3/4">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên công việc, chuyên môn..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Header with View Mode Toggle */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Tìm thấy <span className="text-blue-600">{filteredJobs.length}</span> việc làm
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Xem:</span>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md ${
                    viewMode === 'list'
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md ${
                    viewMode === 'grid'
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-800">{error}</p>
                <button
                  onClick={fetchJobs}
                  className="mt-2 text-sm text-red-600 hover:underline font-medium"
                >
                  Thử lại
                </button>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && filteredJobs.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">Không tìm thấy việc làm phù hợp</p>
                <button
                  onClick={() => setFilters({ location: '', jobType: '', expertise: '' })}
                  className="mt-4 text-blue-600 hover:underline"
                >
                  Xóa bộ lọc
                </button>
              </div>
            )}

            {/* Job Cards */}
            {!loading && !error && filteredJobs.length > 0 && (
              <div
                className={
                  viewMode === 'list'
                    ? 'space-y-4'
                    : 'grid grid-cols-1 lg:grid-cols-2 gap-4'
                }
              >
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onApply={handleApply}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />

      {/* Apply Modal */}
      {isModalOpen && (
        <ApplyModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          jobId={selectedJobId}
          jobTitle={selectedJobTitle}
        />
      )}
    </div>
  );
}
