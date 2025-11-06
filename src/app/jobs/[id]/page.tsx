'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getJobById, getRelatedJobs } from '@/lib/firestore-helpers';
import { Job } from '@/lib/firebase-config';
import ApplyModal from '@/components/ApplyModal';
import { ArrowLeft, MapPin, Briefcase, Clock, DollarSign, Building2 } from 'lucide-react';
import Link from 'next/link';

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [relatedJobs, setRelatedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchJobDetail();
  }, [params.id]);

  const fetchJobDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      const jobData = await getJobById(params.id);

      if (!jobData) {
        setError('Không tìm thấy công việc này');
        return;
      }

      setJob(jobData);

      // Fetch related jobs
      const related = await getRelatedJobs(
        params.id,
        jobData.expertise,
        jobData.location,
        3
      );
      setRelatedJobs(related);
    } catch (err) {
      setError('Có lỗi xảy ra khi tải thông tin công việc');
      console.error('Error fetching job detail:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <p className="text-red-600 text-lg mb-4">{error || 'Không tìm thấy công việc'}</p>
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:underline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại trang chủ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">InnoJSC</span>
              <span className="ml-2 text-2xl font-light text-gray-700">Careers</span>
            </Link>
            <div className="hidden md:flex md:space-x-8">
              <Link href="/" className="text-gray-900 hover:text-blue-600 font-medium">
                Việc làm
              </Link>
              <a
                href="https://innojsc.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600"
              >
                Về chúng tôi
              </a>
              <a href="mailto:ahr@innojsc.com" className="text-gray-500 hover:text-blue-600">
                Liên hệ
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Back Button */}
        <Link
          href="/"
          className="mb-4 inline-flex items-center text-gray-600 hover:text-blue-600 group"
        >
          <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">Quay lại danh sách</span>
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Column */}
          <main className="w-full lg:w-2/3">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-200">
              {/* Job Header */}
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  {job.title}
                </h1>

                {/* Tags */}
                {job.tags && job.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          tag === 'HOT'
                            ? 'bg-red-100 text-red-700'
                            : tag === 'TUYỂN DỤNG GẤP'
                            ? 'bg-orange-100 text-orange-700'
                            : tag === 'ƯU TIÊN NGOẠI NGỮ'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Job Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin size={18} className="text-gray-400" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Briefcase size={18} className="text-gray-400" />
                    <span>{job.jobType}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock size={18} className="text-gray-400" />
                    <span>{job.experience > 0 ? `${job.experience}+ năm` : 'Không yêu cầu'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign size={18} className="text-blue-600" />
                    <span className="font-medium text-blue-600">{job.salary.display}</span>
                  </div>
                </div>

                {/* Department & Position */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <Building2 size={18} className="text-gray-400" />
                  <span className="font-medium">{job.department}</span>
                  <span>•</span>
                  <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-700">
                    {job.position}
                  </span>
                </div>

                {/* Apply Button */}
                <button
                  onClick={handleApplyClick}
                  className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Ứng tuyển ngay
                </button>
              </div>

              <hr className="my-8" />

              {/* Job Details */}
              <div className="prose prose-blue max-w-none">
                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Mô tả công việc</h2>
                  <div
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: job.description }}
                  />
                </div>

                {/* Requirements */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Yêu cầu ứng viên</h2>
                  <div
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: job.requirements }}
                  />
                </div>

                {/* Benefits */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Quyền lợi</h2>
                  <div
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: job.benefits }}
                  />
                </div>
              </div>

              {/* Apply Button (Bottom) */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <button
                  onClick={handleApplyClick}
                  className="w-full sm:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Ứng tuyển ngay
                </button>
              </div>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="w-full lg:w-1/3">
            <div className="space-y-6 lg:sticky lg:top-24">
              {/* Contact Info */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Thông tin liên hệ
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <strong className="text-gray-700">Email:</strong>
                    <a
                      href="mailto:ahr@innojsc.com"
                      className="ml-2 text-blue-600 hover:underline"
                    >
                      ahr@innojsc.com
                    </a>
                  </div>
                  <div>
                    <strong className="text-gray-700">Hotline:</strong>
                    <span className="ml-2 text-gray-800">+84 969 979 391</span>
                  </div>
                  <div>
                    <strong className="text-gray-700">Website:</strong>
                    <a
                      href="https://innojsc.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-blue-600 hover:underline"
                    >
                      innojsc.com
                    </a>
                  </div>
                  <hr className="my-3" />
                  <div>
                    <strong className="text-gray-700">Hà Nội:</strong>
                    <p className="text-gray-600 mt-1">
                      39 Thượng Thụy, Phú Thượng, Tây Hồ, Hà Nội
                    </p>
                  </div>
                  <div>
                    <strong className="text-gray-700">TP.HCM:</strong>
                    <p className="text-gray-600 mt-1">
                      Căn hộ TMDV A01.03, Khu căn hộ Hoàng Anh River View, 37 Nguyễn Văn Hưởng,
                      phường Thảo Điền, TP. Thủ Đức
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Jobs */}
              {relatedJobs.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Các việc làm khác
                  </h3>
                  <div className="space-y-4">
                    {relatedJobs.map((relatedJob) => (
                      <Link
                        key={relatedJob.id}
                        href={`/jobs/${relatedJob.id}`}
                        className="block p-4 rounded-md border border-gray-200 hover:bg-gray-50 hover:border-blue-300 transition-colors"
                      >
                        <h4 className="font-medium text-gray-800 hover:text-blue-600 mb-1">
                          {relatedJob.title}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                          <MapPin size={14} />
                          <span>{relatedJob.location}</span>
                        </div>
                        <span className="text-sm font-medium text-blue-600">
                          {relatedJob.salary.display}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">InnoJSC Careers</h3>
              <p className="text-sm">Tham gia cùng chúng tôi để kiến tạo tương lai.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Liên kết</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="hover:text-white">
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <a
                    href="https://innojsc.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    Website công ty
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Liên hệ</h3>
              <ul className="space-y-2 text-sm">
                <li>Email: ahr@innojsc.com</li>
                <li>Hotline: +84 969 979 391</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-sm text-center">
            &copy; {new Date().getFullYear()} InnoJSC. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Apply Modal */}
      {isModalOpen && job && (
        <ApplyModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          jobId={job.id!}
          jobTitle={job.title}
        />
      )}
    </div>
  );
}
