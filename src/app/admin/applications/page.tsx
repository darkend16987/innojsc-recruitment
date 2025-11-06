'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { getAllApplications, deleteApplication } from '@/lib/admin-firestore';
import { getJobById } from '@/lib/firestore-helpers';
import { useToast } from '@/components/Toast';
import {
  Mail,
  Phone,
  Download,
  Trash2,
  Calendar,
  Briefcase,
  User,
  ExternalLink,
  Filter,
} from 'lucide-react';

interface Application {
  id: string;
  jobId: string;
  fullName: string;
  email: string;
  phone: string;
  coverLetter: string;
  cvUrl: string;
  appliedAt: string;
  status: 'pending' | 'reviewed' | 'rejected';
}

interface ApplicationWithJob extends Application {
  jobTitle?: string;
}

export default function AdminApplicationsPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <ApplicationsContent />
      </AdminLayout>
    </ProtectedRoute>
  );
}

function ApplicationsContent() {
  const [applications, setApplications] = useState<ApplicationWithJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'reviewed' | 'rejected'>('all');
  const toast = useToast();

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      const data = await getAllApplications();

      // Load job titles for each application
      const applicationsWithJobs = await Promise.all(
        data.map(async (app) => {
          try {
            const job = await getJobById(app.jobId);
            return {
              ...app,
              jobTitle: job?.title || 'N/A',
            };
          } catch {
            return {
              ...app,
              jobTitle: 'N/A',
            };
          }
        })
      );

      setApplications(applicationsWithJobs);
    } catch (error) {
      console.error('Error loading applications:', error);
      toast.error('Không thể tải danh sách ứng tuyển');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (appId: string, fullName: string) => {
    if (
      !confirm(
        `Bạn có chắc muốn xóa hồ sơ của "${fullName}"? Hành động này không thể hoàn tác.`
      )
    ) {
      return;
    }

    try {
      await deleteApplication(appId);
      toast.success('Đã xóa hồ sơ thành công');
      setApplications(applications.filter((app) => app.id !== appId));
    } catch (error) {
      console.error('Error deleting application:', error);
      toast.error('Không thể xóa hồ sơ');
    }
  };

  const filteredApplications = applications.filter((app) => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Chờ xem xét
          </span>
        );
      case 'reviewed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Đã xem xét
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Đã từ chối
          </span>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải danh sách ứng tuyển...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Ứng tuyển</h1>
          <p className="text-gray-600 mt-1">
            Tổng cộng {applications.length} hồ sơ ứng tuyển
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1 inline-flex gap-1">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          Tất cả ({applications.length})
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            filter === 'pending'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          Chờ xem xét ({applications.filter((a) => a.status === 'pending').length})
        </button>
        <button
          onClick={() => setFilter('reviewed')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            filter === 'reviewed'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          Đã xem xét ({applications.filter((a) => a.status === 'reviewed').length})
        </button>
        <button
          onClick={() => setFilter('rejected')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            filter === 'rejected'
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          Đã từ chối ({applications.filter((a) => a.status === 'rejected').length})
        </button>
      </div>

      {/* Applications List */}
      {filteredApplications.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Chưa có hồ sơ nào
          </h3>
          <p className="text-gray-600">
            {filter === 'all'
              ? 'Chưa có ai ứng tuyển. Khi có hồ sơ mới, chúng sẽ xuất hiện ở đây.'
              : `Không có hồ sơ nào ở trạng thái "${filter}"`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApplications.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                {/* Applicant Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {app.fullName}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <Briefcase className="w-4 h-4" />
                        <span className="font-medium">{app.jobTitle}</span>
                        {getStatusBadge(app.status)}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <a
                        href={`mailto:${app.email}`}
                        className="hover:text-blue-600 break-all"
                      >
                        {app.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <a
                        href={`tel:${app.phone}`}
                        className="hover:text-blue-600"
                      >
                        {app.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 sm:col-span-2">
                      <Calendar className="w-4 h-4 flex-shrink-0" />
                      Ứng tuyển:{' '}
                      {new Date(app.appliedAt).toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>

                  {app.coverLetter && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        Thư xin việc:
                      </p>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {app.coverLetter}
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex lg:flex-col gap-2">
                  <a
                    href={app.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium whitespace-nowrap"
                  >
                    <Download className="w-4 h-4" />
                    Tải CV
                  </a>
                  <a
                    href={`/jobs/${app.jobId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium whitespace-nowrap"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Xem Job
                  </a>
                  <button
                    onClick={() => handleDelete(app.id, app.fullName)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium whitespace-nowrap"
                  >
                    <Trash2 className="w-4 h-4" />
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
