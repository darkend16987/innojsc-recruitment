'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import JobForm from '@/components/admin/JobForm';

export default function NewJobPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tạo Job Mới</h1>
            <p className="text-gray-600 mt-1">
              Điền thông tin chi tiết về vị trí tuyển dụng
            </p>
          </div>

          <JobForm mode="create" />
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
