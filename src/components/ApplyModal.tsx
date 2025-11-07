// src/components/ApplyModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { submitApplication } from '@/lib/firestore-helpers';
import { getSettings, SystemSettings } from '@/lib/settings';
import { useToast } from './Toast';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
  jobTitle: string;
}

export default function ApplyModal({
  isOpen,
  onClose,
  jobId,
  jobTitle,
}: ApplyModalProps) {
  const toast = useToast();
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    expertise: '',
    yearsOfExperience: '',
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Load settings for dropdowns
  useEffect(() => {
    if (isOpen) {
      loadSettings();
    }
  }, [isOpen]);

  const loadSettings = async () => {
    try {
      const data = await getSettings();
      setSettings(data);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        setError('Chỉ chấp nhận file PDF hoặc Word (.doc, .docx)');
        return;
      }
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Kích thước file không được vượt quá 5MB');
        return;
      }
      setCvFile(file);
      setError('');
    }
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('Vui lòng nhập họ tên');
      return false;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Vui lòng nhập email hợp lệ');
      return false;
    }
    if (!formData.phone.trim() || !/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      setError('Vui lòng nhập số điện thoại hợp lệ (10-11 số)');
      return false;
    }
    if (!cvFile) {
      setError('Vui lòng tải lên CV của bạn');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError('');

    try {
      await submitApplication(jobId, jobTitle, formData, cvFile!);
      setSuccess(true);
      toast.success('Ứng tuyển thành công! Chúng tôi sẽ liên hệ bạn sớm.');

      // Auto close after 2 seconds
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Có lỗi xảy ra. Vui lòng thử lại.';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      position: '',
      expertise: '',
      yearsOfExperience: ''
    });
    setCvFile(null);
    setError('');
    setSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-6 m-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Ứng tuyển</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isSubmitting}
          >
            <X size={24} />
          </button>
        </div>

        {/* Job Title */}
        <div className="mb-6 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Vị trí ứng tuyển:</p>
          <p className="font-semibold text-gray-900">{jobTitle}</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 font-medium">
              ✓ Ứng tuyển thành công! Chúng tôi sẽ liên hệ bạn sớm.
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Form */}
        {!success && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Nguyễn Văn A"
                disabled={isSubmitting}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="email@example.com"
                disabled={isSubmitting}
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0987654321"
                disabled={isSubmitting}
              />
            </div>

            {/* Position (Optional) */}
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                Vị trí <span className="text-gray-400 text-xs">(Không bắt buộc)</span>
              </label>
              <select
                id="position"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubmitting || !settings}
              >
                <option value="">-- Chọn vị trí --</option>
                {settings?.positions.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>
            </div>

            {/* Expertise (Optional) */}
            <div>
              <label htmlFor="expertise" className="block text-sm font-medium text-gray-700 mb-1">
                Chuyên môn <span className="text-gray-400 text-xs">(Không bắt buộc)</span>
              </label>
              <select
                id="expertise"
                name="expertise"
                value={formData.expertise}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubmitting || !settings}
              >
                <option value="">-- Chọn chuyên môn --</option>
                {settings?.expertiseLevels.map((exp) => (
                  <option key={exp} value={exp}>
                    {exp}
                  </option>
                ))}
              </select>
            </div>

            {/* Years of Experience (Optional) */}
            <div>
              <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-1">
                Số năm kinh nghiệm <span className="text-gray-400 text-xs">(Không bắt buộc)</span>
              </label>
              <select
                id="yearsOfExperience"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isSubmitting}
              >
                <option value="">-- Chọn số năm --</option>
                <option value="Dưới 1 năm">Dưới 1 năm</option>
                <option value="1-2 năm">1-2 năm</option>
                <option value="3-5 năm">3-5 năm</option>
                <option value="5-10 năm">5-10 năm</option>
                <option value="Trên 10 năm">Trên 10 năm</option>
              </select>
            </div>

            {/* CV Upload */}
            <div>
              <label htmlFor="cv" className="block text-sm font-medium text-gray-700 mb-1">
                CV của bạn <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                id="cv"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                disabled={isSubmitting}
              />
              <p className="mt-1 text-xs text-gray-500">
                Chấp nhận: PDF, Word (.doc, .docx) - Tối đa 5MB
              </p>
              {cvFile && (
                <p className="mt-2 text-sm text-green-600">
                  ✓ Đã chọn: {cvFile.name}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={isSubmitting}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Đang gửi...' : 'Gửi ứng tuyển'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
