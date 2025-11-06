// src/components/JobCard.tsx
'use client';

import { Job } from '@/lib/firebaseConfig';
import { MapPin, Briefcase, Clock, DollarSign } from 'lucide-react';
import Link from 'next/link';

interface JobCardProps {
  job: Job;
  onApply: (jobId: string, jobTitle: string) => void;
  viewMode?: 'list' | 'grid';
}

export default function JobCard({ job, onApply, viewMode = 'list' }: JobCardProps) {
  const handleApplyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onApply(job.id!, job.title);
  };

  const isGridView = viewMode === 'grid';

  return (
    <Link href={`/jobs/${job.id}`}>
      <div
        className={`bg-white rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200 cursor-pointer ${
          isGridView ? 'p-6' : 'p-6 flex gap-6'
        }`}
      >
        {/* Company Logo Placeholder - chỉ hiện ở list view */}
        {!isGridView && (
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">
                {job.title.charAt(0)}
              </span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1">
          {/* Header with Tags */}
          <div className="mb-3">
            {/* Tags */}
            {job.tags && job.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {job.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 text-xs font-semibold rounded ${
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

            {/* Job Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
              {job.title}
            </h3>

            {/* Department & Position */}
            <div className="flex flex-wrap gap-2 text-sm text-gray-600">
              <span className="font-medium">{job.department}</span>
              <span>•</span>
              <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-700 font-medium">
                {job.position}
              </span>
            </div>
          </div>

          {/* Info Grid */}
          <div className={`grid ${isGridView ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-4'} gap-3 mb-4`}>
            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin size={16} className="text-gray-400" />
              <span>{job.location}</span>
            </div>

            {/* Job Type */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Briefcase size={16} className="text-gray-400" />
              <span>{job.jobType}</span>
            </div>

            {/* Experience */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock size={16} className="text-gray-400" />
              <span>{job.experience > 0 ? `${job.experience}+ năm` : 'Không yêu cầu'}</span>
            </div>

            {/* Salary */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <DollarSign size={16} className="text-gray-400" />
              <span className="font-medium text-blue-600">{job.salary.display}</span>
            </div>
          </div>

          {/* Expertise */}
          {job.expertise && (
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
                {job.expertise}
              </span>
            </div>
          )}

          {/* Description Preview - chỉ hiện ở list view */}
          {!isGridView && (
            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {job.description.replace(/<[^>]*>/g, '').substring(0, 150)}...
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <span className="text-xs text-gray-500">
              Đăng {new Date(job.publishedAt).toLocaleDateString('vi-VN')}
            </span>
            <button
              onClick={handleApplyClick}
              className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ứng tuyển
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
