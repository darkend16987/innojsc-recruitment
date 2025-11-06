'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { getDashboardStats } from '@/lib/admin-firestore';
import { useToast } from '@/components/Toast';
import {
  Briefcase,
  Users,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';

interface DashboardStats {
  totalJobs: number;
  publishedJobs: number;
  draftJobs: number;
  closedJobs: number;
  totalApplications: number;
  pendingApplications: number;
  reviewedApplications: number;
  rejectedApplications: number;
}

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <DashboardContent />
      </AdminLayout>
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
      toast.error('Không thể tải thống kê');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thống kê...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">Không thể tải dữ liệu thống kê</p>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Tổng số Jobs',
      value: stats.totalJobs,
      icon: Briefcase,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Jobs đang đăng',
      value: stats.publishedJobs,
      icon: CheckCircle,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Jobs nháp',
      value: stats.draftJobs,
      icon: Clock,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Jobs đã đóng',
      value: stats.closedJobs,
      icon: XCircle,
      color: 'bg-gray-500',
      textColor: 'text-gray-600',
      bgColor: 'bg-gray-50',
    },
  ];

  const applicationCards = [
    {
      title: 'Tổng ứng tuyển',
      value: stats.totalApplications,
      icon: Users,
      color: 'bg-purple-500',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Chờ xem xét',
      value: stats.pendingApplications,
      icon: AlertCircle,
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Đã xem xét',
      value: stats.reviewedApplications,
      icon: FileText,
      color: 'bg-indigo-500',
      textColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      title: 'Đã từ chối',
      value: stats.rejectedApplications,
      icon: XCircle,
      color: 'bg-red-500',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Chào mừng đến Admin Panel</h1>
        <p className="text-blue-100">
          Quản lý tin tuyển dụng và ứng viên của InnoJSC
        </p>
      </div>

      {/* Job Statistics */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Thống kê Jobs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${card.bgColor} ${card.textColor} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">{card.title}</h3>
                <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Application Statistics */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Thống kê Ứng tuyển
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {applicationCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${card.bgColor} ${card.textColor} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">{card.title}</h3>
                <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/jobs/new"
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all hover:border-blue-300 group"
          >
            <div className="flex items-center gap-4">
              <div className="bg-blue-50 text-blue-600 p-3 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Đăng Job mới</h3>
                <p className="text-sm text-gray-600">Tạo tin tuyển dụng mới</p>
              </div>
            </div>
          </a>

          <a
            href="/admin/jobs"
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all hover:border-green-300 group"
          >
            <div className="flex items-center gap-4">
              <div className="bg-green-50 text-green-600 p-3 rounded-lg group-hover:bg-green-600 group-hover:text-white transition-colors">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Quản lý Jobs</h3>
                <p className="text-sm text-gray-600">Xem và chỉnh sửa jobs</p>
              </div>
            </div>
          </a>

          <a
            href="/admin/applications"
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all hover:border-purple-300 group"
          >
            <div className="flex items-center gap-4">
              <div className="bg-purple-50 text-purple-600 p-3 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Xem ứng tuyển</h3>
                <p className="text-sm text-gray-600">Quản lý hồ sơ ứng viên</p>
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* System Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">
              Hệ thống hoạt động tốt
            </h3>
            <p className="text-sm text-blue-800">
              Tất cả các chức năng đang hoạt động bình thường. Bạn có thể quản lý jobs
              và ứng tuyển một cách thuận tiện.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
