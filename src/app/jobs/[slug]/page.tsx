'use client';

import { useState, useEffect, use } from 'react';
// Thêm dòng này vào 👇
import Image from 'next/image'; 
import Link from 'next/link';
import Script from 'next/script';
import { ArrowLeft, MapPin, Briefcase, Clock, DollarSign, Building2, Share2 } from 'lucide-react';

import { getJobById, getJobBySlug, getRelatedJobs } from '@/lib/firestore-helpers';
import { Job } from '@/types/job';
import ApplyModal from '@/components/ApplyModal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/components/Toast';

export default function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // Unwrap params Promise for Next.js 15+
  const { slug } = use(params);

  const toast = useToast();
  const [job, setJob] = useState<Job | null>(null);
  const [relatedJobs, setRelatedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchJobDetail();
  }, [slug]);

  const fetchJobDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try slug first (new URLs), fallback to ID (old URLs for backward compatibility)
      let jobData = await getJobBySlug(slug);

      // If not found by slug, try as ID (backward compatibility)
      if (!jobData) {
        jobData = await getJobById(slug);
      }

      if (!jobData) {
        setError('Không tìm thấy công việc này');
        return;
      }

      setJob(jobData);

      // Fetch related jobs
      const related = await getRelatedJobs(
        jobData.id,
        jobData.expertise,
        jobData.location,
        3
      );
      setRelatedJobs(related);
    } catch (err) {
      setError('Có lỗi xảy ra khi tải thông tin công việc');
      toast.error('Không thể tải thông tin công việc');
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

  const handleShare = async () => {
    if (!job) return;

    const shareData = {
      title: job.title,
      text: `${job.title}${job.salary ? ` - ${job.salary}` : ''}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success('Đã chia sẻ!');
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          copyToClipboard();
        }
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Đã sao chép link!');
  };

  // Generate JobPosting structured data
  const generateJobPostingSchema = (job: Job) => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://careers.innojsc.com';

    const schema: any = {
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      title: job.title,
      description: job.description.replace(/<[^>]*>/g, ''),
      datePosted: job.publishedAt,
      employmentType: job.jobType === 'Full-time' ? 'FULL_TIME' : job.jobType === 'Part-time' ? 'PART_TIME' : job.jobType === 'Intern' ? 'INTERN' : 'CONTRACTOR',
      hiringOrganization: {
        '@type': 'Organization',
        name: 'InnoJSC',
        sameAs: 'https://innojsc.com',
        logo: `${siteUrl}/images/logo.svg`,
      },
      jobLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: job.location === 'Hà Nội' ? 'Hanoi' : job.location === 'TP.HCM' ? 'Ho Chi Minh City' : 'Vietnam',
          addressCountry: 'VN',
        },
      },
    };

    // Add skills if available
    if (job.tags && job.tags.length > 0) {
      schema.skills = job.tags.join(', ');
    }

    // Add experience requirements
    if (job.experience > 0) {
      schema.experienceRequirements = {
        '@type': 'OccupationalExperienceRequirements',
        monthsOfExperience: job.experience * 12,
      };
    }

    return schema;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center px-4">
          <div className="text-center">
            <p className="text-red-600 text-lg mb-4">{error || 'Không tìm thấy công việc'}</p>
            <Link
              href="/"
              className="inline-flex items-center text-primary hover:underline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại trang chủ
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* JobPosting Structured Data */}
      <Script
        id="job-posting-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateJobPostingSchema(job)),
        }}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Back Button */}
        <Link
          href="/"
          className="mb-4 inline-flex items-center text-gray-600 hover:text-primary group"
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
                            : 'bg-red-100 text-primary'
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
                    <span>{job.experience > 0 ? `${job.experience}+ năm kinh nghiệm` : 'Không yêu cầu kinh nghiệm'}</span>
                  </div>
                  {job.salary && (
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign size={18} className="text-primary" />
                      <span className="font-medium text-primary">{job.salary}</span>
                    </div>
                  )}
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

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleApplyClick}
                    className="flex-1 sm:flex-none px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
                  >
                    Ứng tuyển ngay
                  </button>
                  <button
                    onClick={handleShare}
                    className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    title="Chia sẻ"
                  >
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
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
                  <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Quyền lợi</h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed">
                    {job.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Apply Button (Bottom) */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <button
                  onClick={handleApplyClick}
                  className="w-full sm:w-auto px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
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
                      className="ml-2 text-primary hover:underline"
                    >
                      ahr@innojsc.com
                    </a>
                  </div>
                  <div>
                    <strong className="text-gray-700">Hotline:</strong>
                    <span className="ml-2 text-gray-800">0243 2121 776</span>
                  </div>
                  <div>
                    <strong className="text-gray-700">Website:</strong>
                    <a
                      href="https://innojsc.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 text-primary hover:underline"
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
                      A01.03, Khu căn hộ Hoàng Anh River View, 37 Nguyễn Văn Hưởng,
                      phường Thảo Điền
                    </p>
                  </div>
                  <hr className="my-3" />
                  {/* QR Code Section */}
                  <div className="text-center">
                    <strong className="text-gray-700 block mb-3">Liên hệ qua Zalo</strong>
                    <div className="flex justify-center">
                      <div className="relative w-40 h-40 bg-white rounded-lg flex items-center justify-center border border-gray-200 shadow-sm overflow-hidden">
                        <Image
                          src="/images/recruitment/qr-code/zalo-hr-qr.png"
                          alt="Zalo HR QR Code"
                          width={160}
                          height={160}
                          className="rounded-lg object-cover"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Quét mã QR để liên hệ trực tiếp với HR</p>
                  </div>

              {/* Related Jobs */}
              {relatedJobs.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Các việc làm khác
                  </h3>
                  <div className="space-y-4">
                    {relatedJobs.map((relatedJob) => {
                      const relatedJobUrl = relatedJob.slug || relatedJob.id;
                      return (
                        <Link
                          key={relatedJob.id}
                          href={`/jobs/${relatedJobUrl}`}
                          className="block p-4 rounded-md border border-gray-200 hover:bg-gray-50 hover:border-blue-300 transition-colors"
                        >
                          <h4 className="font-medium text-gray-800 hover:text-primary mb-1">
                            {relatedJob.title}
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                            <MapPin size={14} />
                            <span>{relatedJob.location}</span>
                          </div>
                          {relatedJob.salary && (
                            <span className="text-sm font-medium text-primary">
                              {relatedJob.salary}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      <Footer />

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
