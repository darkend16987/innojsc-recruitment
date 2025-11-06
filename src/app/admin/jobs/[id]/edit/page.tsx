'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import JobForm from '@/components/admin/JobForm';
import { getJobById } from '@/lib/firestore-helpers';
import { Job } from '@/types/job';
import { useToast } from '@/components/Toast';
import { AlertCircle } from 'lucide-react';

export default function EditJobPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <EditJobContent />
      </AdminLayout>
    </ProtectedRoute>
  );
}

function EditJobContent() {
  const params = useParams();
  const jobId = params.id as string;
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    loadJob();
  }, [jobId]);

  const loadJob = async () => {
    try {
      setLoading(true);
      setError(null);
      const jobData = await getJobById(jobId);

      if (!jobData) {
        setError('Không tìm thấy job');
        toast.error('Không tìm thấy job');
        return;
      }

      setJob(jobData);
    } catch (error) {
      console.error('Error loading job:', error);
      setError('Không thể tải thông tin job');
      toast.error('Không thể tải thông tin job');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin job...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-red-900 mb-1">Lỗi tải dữ liệu</h3>
            <p className="text-red-800">{error || 'Không tìm thấy job'}</p>
            <a
              href="/admin/jobs"
              className="text-red-600 hover:text-red-800 font-medium mt-2 inline-block"
            >
              ← Quay lại danh sách jobs
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Chỉnh sửa Job</h1>
        <p className="text-gray-600 mt-1">
          Cập nhật thông tin cho: <span className="font-medium">{job.title}</span>
        </p>
      </div>

      <JobForm mode="edit" job={job} />
    </div>
  );
}
