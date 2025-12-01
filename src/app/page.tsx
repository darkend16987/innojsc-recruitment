'use client';

import { useState, useEffect } from 'react';
import { getPublishedJobs } from '@/lib/firestore-helpers';
import { Job } from '@/types/job';
import JobCard from '@/components/JobCard';
import ApplyModal from '@/components/ApplyModal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/components/Toast';
import { List, LayoutGrid, Search, MapPin } from 'lucide-react';

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

  // Location filter (only location now)
  const [selectedLocation, setSelectedLocation] = useState<string>('');

  const locations = ['Hà Nội', 'TP.Hồ Chí Minh'];

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

  // Filter jobs based on selected location and search term
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

    // Location filter
    if (selectedLocation && job.location !== selectedLocation) return false;

    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Cơ hội nghề nghiệp tại <span className="text-primary">INNO</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Khám phá các vị trí tuyển dụng và gia nhập đội ngũ chuyên gia hàng đầu trong lĩnh vực tư vấn thiết kế
          </p>
        </div>

        {/* Location Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={() => setSelectedLocation('')}
            className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
              selectedLocation === ''
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-primary hover:text-primary'
            }`}
          >
            <MapPin size={18} />
            Tất cả địa điểm
          </button>
          {locations.map((location) => (
            <button
              key={location}
              onClick={() => setSelectedLocation(location)}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                selectedLocation === location
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-primary hover:text-primary'
              }`}
            >
              <MapPin size={18} />
              {location}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên công việc, phòng ban, chuyên môn..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm text-lg"
            />
          </div>
        </div>

        {/* Header with View Mode Toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Tìm thấy <span className="text-primary">{filteredJobs.length}</span> việc làm
            {selectedLocation && <span className="text-gray-600"> tại {selectedLocation}</span>}
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Chế độ xem:</span>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
              title="List view"
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
              title="Grid view"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <p className="text-red-800 text-lg">{error}</p>
            <button
              onClick={fetchJobs}
              className="mt-3 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Thử lại
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredJobs.length === 0 && (
          <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
            <div className="max-w-md mx-auto">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-xl mb-2">Không tìm thấy việc làm phù hợp</p>
              <p className="text-gray-400 mb-6">Thử điều chỉnh bộ lọc hoặc tìm kiếm khác</p>
              <button
                onClick={() => {
                  setSelectedLocation('');
                  setSearchTerm('');
                }}
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Xóa bộ lọc
              </button>
            </div>
          </div>
        )}

        {/* Job Cards */}
        {!loading && !error && filteredJobs.length > 0 && (
          <div
            className={
              viewMode === 'list'
                ? 'space-y-8'
                : 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'
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