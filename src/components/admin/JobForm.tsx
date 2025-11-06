'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Job } from '@/types/job';
import { createJob, updateJob } from '@/lib/admin-firestore';
import { useToast } from '@/components/Toast';
import { Save, X, AlertCircle } from 'lucide-react';

interface JobFormProps {
  job?: Job;
  mode: 'create' | 'edit';
}

export default function JobForm({ job, mode }: JobFormProps) {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: job?.title || '',
    department: job?.department || '',
    location: job?.location || 'Hà Nội',
    jobType: job?.jobType || 'Full-time',
    expertise: job?.expertise || 'Junior',
    description: job?.description || '',
    requirements: job?.requirements || [],
    benefits: job?.benefits || [],
    salary: job?.salary || '',
    status: job?.status || 'draft',
  });

  // For managing list inputs
  const [requirementInput, setRequirementInput] = useState('');
  const [benefitInput, setBenefitInput] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addRequirement = () => {
    if (requirementInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        requirements: [...prev.requirements, requirementInput.trim()],
      }));
      setRequirementInput('');
    }
  };

  const removeRequirement = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  };

  const addBenefit = () => {
    if (benefitInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        benefits: [...prev.benefits, benefitInput.trim()],
      }));
      setBenefitInput('');
    }
  };

  const removeBenefit = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      toast.error('Vui lòng nhập tiêu đề công việc');
      return;
    }

    if (!formData.department.trim()) {
      toast.error('Vui lòng nhập phòng ban');
      return;
    }

    if (!formData.description.trim()) {
      toast.error('Vui lòng nhập mô tả công việc');
      return;
    }

    if (formData.requirements.length === 0) {
      toast.error('Vui lòng thêm ít nhất 1 yêu cầu');
      return;
    }

    setLoading(true);

    try {
      const jobData = {
        ...formData,
        publishedAt: job?.publishedAt || new Date().toISOString(),
      };

      if (mode === 'create') {
        const newJobId = await createJob(jobData);
        toast.success('Tạo job thành công!');
        router.push(`/admin/jobs`);
      } else if (mode === 'edit' && job?.id) {
        await updateJob(job.id, jobData);
        toast.success('Cập nhật job thành công!');
        router.push(`/admin/jobs`);
      }
    } catch (error) {
      console.error('Error saving job:', error);
      toast.error('Không thể lưu job');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (
      confirm(
        'Bạn có chắc muốn hủy? Các thay đổi chưa lưu sẽ bị mất.'
      )
    ) {
      router.push('/admin/jobs');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Thông tin cơ bản
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tiêu đề công việc <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="VD: Senior Frontend Developer"
              required
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phòng ban <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="VD: Phát triển sản phẩm"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Địa điểm <span className="text-red-500">*</span>
            </label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="Hà Nội">Hà Nội</option>
              <option value="TP.HCM">TP.HCM</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loại hình <span className="text-red-500">*</span>
            </label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          {/* Expertise */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cấp bậc <span className="text-red-500">*</span>
            </label>
            <select
              name="expertise"
              value={formData.expertise}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="Intern">Intern</option>
              <option value="Junior">Junior</option>
              <option value="Mid-level">Mid-level</option>
              <option value="Senior">Senior</option>
              <option value="Lead">Lead</option>
            </select>
          </div>

          {/* Salary */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mức lương
            </label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="VD: 20-30 triệu VND hoặc Thỏa thuận"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trạng thái <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="draft">Nháp</option>
              <option value="published">Đăng công khai</option>
              <option value="closed">Đã đóng</option>
            </select>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Mô tả công việc
        </h2>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={8}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Mô tả chi tiết về công việc, trách nhiệm, và môi trường làm việc..."
          required
        />
        <p className="mt-2 text-sm text-gray-500">
          Hỗ trợ định dạng markdown. Sử dụng ** cho in đậm, * cho in nghiêng, - cho danh sách.
        </p>
      </div>

      {/* Requirements */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Yêu cầu công việc
        </h2>

        {/* Add Requirement */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={requirementInput}
            onChange={(e) => setRequirementInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addRequirement();
              }
            }}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Nhập một yêu cầu..."
          />
          <button
            type="button"
            onClick={addRequirement}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Thêm
          </button>
        </div>

        {/* Requirements List */}
        {formData.requirements.length > 0 ? (
          <ul className="space-y-2">
            {formData.requirements.map((req, index) => (
              <li
                key={index}
                className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg"
              >
                <span className="flex-1">{req}</span>
                <button
                  type="button"
                  onClick={() => removeRequirement(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <AlertCircle className="w-8 h-8 mx-auto mb-2" />
            <p>Chưa có yêu cầu nào. Hãy thêm ít nhất 1 yêu cầu.</p>
          </div>
        )}
      </div>

      {/* Benefits */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quyền lợi</h2>

        {/* Add Benefit */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={benefitInput}
            onChange={(e) => setBenefitInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addBenefit();
              }
            }}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Nhập một quyền lợi..."
          />
          <button
            type="button"
            onClick={addBenefit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Thêm
          </button>
        </div>

        {/* Benefits List */}
        {formData.benefits.length > 0 ? (
          <ul className="space-y-2">
            {formData.benefits.map((benefit, index) => (
              <li
                key={index}
                className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg"
              >
                <span className="flex-1">{benefit}</span>
                <button
                  type="button"
                  onClick={() => removeBenefit(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>Chưa có quyền lợi nào. Thêm quyền lợi để thu hút ứng viên.</p>
          </div>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end gap-3 sticky bottom-0 bg-white border-t border-gray-200 p-4 -mx-6 -mb-6 rounded-b-lg">
        <button
          type="button"
          onClick={handleCancel}
          disabled={loading}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          Hủy
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Đang lưu...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {mode === 'create' ? 'Tạo Job' : 'Cập nhật'}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
