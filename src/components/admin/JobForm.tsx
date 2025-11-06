'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Job } from '@/types/job';
import { createJob, updateJob } from '@/lib/admin-firestore';
import { getSettings, SystemSettings } from '@/lib/settings';
import { useToast } from '@/components/Toast';
import { Save, X, AlertCircle, Tag } from 'lucide-react';

interface JobFormProps {
  job?: Job;
  mode: 'create' | 'edit';
}

export default function JobForm({ job, mode }: JobFormProps) {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [settingsLoading, setSettingsLoading] = useState(true);
  const [settings, setSettings] = useState<SystemSettings | null>(null);

  const [formData, setFormData] = useState({
    title: job?.title || '',
    department: job?.department || '',
    position: job?.position || '',
    location: job?.location || '',
    jobType: job?.jobType || '',
    expertise: job?.expertise || '',
    experience: job?.experience || 0,
    description: job?.description || '',
    requirements: job?.requirements || [],
    benefits: job?.benefits || [],
    tags: job?.tags || [],
    salary: job?.salary || '',
    status: job?.status || 'draft',
  });

  // For managing list inputs
  const [requirementInput, setRequirementInput] = useState('');
  const [benefitInput, setBenefitInput] = useState('');

  // Load settings
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setSettingsLoading(true);
      const data = await getSettings();
      setSettings(data);

      // Set default values if not editing
      if (mode === 'create' && !job) {
        setFormData(prev => ({
          ...prev,
          department: data.departments[0] || '',
          position: data.positions[0] || '',
          location: data.locations[0] || '',
          jobType: data.jobTypes[0] || '',
          expertise: data.expertiseLevels[0] || '',
        }));
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      toast.error('Không thể tải cấu hình. Vui lòng kiểm tra lại.');
    } finally {
      setSettingsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
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
      toast.error('Vui lòng chọn phòng ban');
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

  if (settingsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải cấu hình...</p>
        </div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">
          Không thể tải cấu hình. Vui lòng vào trang Cấu hình để thiết lập.
        </p>
      </div>
    );
  }

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
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">-- Chọn phòng ban --</option>
              {settings.departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-500">
              Không tìm thấy? Thêm ở trang <a href="/admin/settings" className="text-blue-600 hover:underline">Cấu hình</a>
            </p>
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chức vụ <span className="text-red-500">*</span>
            </label>
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">-- Chọn chức vụ --</option>
              {settings.positions.map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
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
              <option value="">-- Chọn địa điểm --</option>
              {settings.locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
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
              <option value="">-- Chọn loại hình --</option>
              {settings.jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
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
              <option value="">-- Chọn cấp bậc --</option>
              {settings.expertiseLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Số năm kinh nghiệm <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              min="0"
              max="50"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
              required
            />
            <p className="mt-1 text-xs text-gray-500">
              Nhập 0 nếu không yêu cầu kinh nghiệm
            </p>
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

      {/* Tags/Skills */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Tag className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-900">
            Kỹ năng / Tags
          </h2>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Chọn các kỹ năng cần thiết cho vị trí này. Giúp ứng viên tìm kiếm chính xác hơn.
        </p>

        {settings.skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {settings.skills.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => toggleTag(skill)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  formData.tags.includes(skill)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            Chưa có kỹ năng nào. Vui lòng thêm ở trang{' '}
            <a href="/admin/settings" className="text-blue-600 hover:underline">
              Cấu hình
            </a>
          </p>
        )}

        {formData.tags.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              Đã chọn ({formData.tags.length}):
            </p>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
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
