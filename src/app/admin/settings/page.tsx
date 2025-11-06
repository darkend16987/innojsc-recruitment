'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import {
  getSettings,
  addSettingItem,
  removeSettingItem,
  updateSettingItem,
  SystemSettings,
} from '@/lib/settings';
import { useToast } from '@/components/Toast';
import {
  Settings as SettingsIcon,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Building2,
  MapPin,
  Briefcase,
  Award,
  Code,
} from 'lucide-react';

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <SettingsContent />
      </AdminLayout>
    </ProtectedRoute>
  );
}

function SettingsContent() {
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const data = await getSettings();
      setSettings(data);
    } catch (error) {
      console.error('Error loading settings:', error);
      toast.error('Không thể tải cấu hình');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
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
        <p className="text-red-800">Không thể tải cấu hình hệ thống</p>
      </div>
    );
  }

  const categories: Array<{
    key: keyof SystemSettings;
    title: string;
    description: string;
    icon: any;
    color: string;
  }> = [
    {
      key: 'departments',
      title: 'Phòng ban',
      description: 'Danh sách các phòng ban trong công ty',
      icon: Building2,
      color: 'blue',
    },
    {
      key: 'positions',
      title: 'Chức vụ',
      description: 'Các chức danh công việc (Nhân viên, Trưởng phòng...)',
      icon: Award,
      color: 'indigo',
    },
    {
      key: 'locations',
      title: 'Địa điểm',
      description: 'Các địa điểm làm việc',
      icon: MapPin,
      color: 'green',
    },
    {
      key: 'jobTypes',
      title: 'Loại công việc',
      description: 'Các loại hình công việc (Full-time, Part-time...)',
      icon: Briefcase,
      color: 'purple',
    },
    {
      key: 'expertiseLevels',
      title: 'Cấp bậc',
      description: 'Các cấp độ kinh nghiệm',
      icon: Award,
      color: 'orange',
    },
    {
      key: 'skills',
      title: 'Kỹ năng / Tags',
      description: 'Danh sách kỹ năng và công nghệ',
      icon: Code,
      color: 'pink',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="p-3 bg-blue-100 rounded-lg">
          <SettingsIcon className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cấu hình hệ thống</h1>
          <p className="text-gray-600 mt-1">
            Quản lý các danh mục cho tin tuyển dụng. Các thay đổi sẽ áp dụng ngay lập tức.
          </p>
        </div>
      </div>

      {/* Info Alert */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <SettingsIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-semibold mb-1">Lưu ý quan trọng:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Các thay đổi ở đây sẽ ảnh hưởng đến tất cả tin tuyển dụng mới</li>
              <li>Không nên xóa mục đang được sử dụng trong các tin tuyển dụng hiện có</li>
              <li>Tất cả thành viên HR sẽ thấy cùng một danh sách</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Settings Categories */}
      <div className="grid grid-cols-1 gap-6">
        {categories.map((category) => (
          <SettingCategory
            key={category.key}
            categoryKey={category.key}
            title={category.title}
            description={category.description}
            icon={category.icon}
            color={category.color}
            items={settings[category.key]}
            onUpdate={loadSettings}
          />
        ))}
      </div>
    </div>
  );
}

interface SettingCategoryProps {
  categoryKey: keyof SystemSettings;
  title: string;
  description: string;
  icon: any;
  color: string;
  items: string[];
  onUpdate: () => void;
}

function SettingCategory({
  categoryKey,
  title,
  description,
  icon: Icon,
  color,
  items,
  onUpdate,
}: SettingCategoryProps) {
  const [newItem, setNewItem] = useState('');
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200',
    pink: 'bg-pink-50 text-pink-600 border-pink-200',
  };

  const handleAdd = async () => {
    if (!newItem.trim()) {
      toast.error('Vui lòng nhập giá trị');
      return;
    }

    if (items.includes(newItem.trim())) {
      toast.error('Giá trị này đã tồn tại');
      return;
    }

    try {
      setLoading(true);
      await addSettingItem(categoryKey, newItem.trim());
      toast.success('Đã thêm thành công');
      setNewItem('');
      onUpdate();
    } catch (error) {
      console.error('Error adding item:', error);
      toast.error('Không thể thêm mục');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (item: string) => {
    if (!confirm(`Bạn có chắc muốn xóa "${item}"?`)) {
      return;
    }

    try {
      setLoading(true);
      await removeSettingItem(categoryKey, item);
      toast.success('Đã xóa thành công');
      onUpdate();
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Không thể xóa mục');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (item: string) => {
    setEditingItem(item);
    setEditValue(item);
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setEditValue('');
  };

  const handleUpdate = async (oldItem: string) => {
    if (!editValue.trim()) {
      toast.error('Vui lòng nhập giá trị');
      return;
    }

    if (editValue.trim() === oldItem) {
      cancelEdit();
      return;
    }

    if (items.includes(editValue.trim())) {
      toast.error('Giá trị này đã tồn tại');
      return;
    }

    try {
      setLoading(true);
      await updateSettingItem(categoryKey, oldItem, editValue.trim());
      toast.success('Đã cập nhật thành công');
      cancelEdit();
      onUpdate();
    } catch (error) {
      console.error('Error updating item:', error);
      toast.error('Không thể cập nhật');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className={`p-2 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-600">{description}</p>
          <p className="text-xs text-gray-500 mt-1">
            Tổng cộng: {items.length} mục
          </p>
        </div>
      </div>

      {/* Add New Item */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAdd();
            }
          }}
          placeholder={`Thêm ${title.toLowerCase()} mới...`}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={loading}
        />
        <button
          onClick={handleAdd}
          disabled={loading || !newItem.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Thêm
        </button>
      </div>

      {/* Items List */}
      {items.length > 0 ? (
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {editingItem === item ? (
                <>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleUpdate(item);
                      } else if (e.key === 'Escape') {
                        cancelEdit();
                      }
                    }}
                    className="flex-1 px-3 py-1.5 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={loading}
                    autoFocus
                  />
                  <button
                    onClick={() => handleUpdate(item)}
                    disabled={loading}
                    className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors"
                    title="Lưu"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={cancelEdit}
                    disabled={loading}
                    className="p-2 text-gray-600 hover:bg-gray-200 rounded transition-colors"
                    title="Hủy"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1 font-medium text-gray-900">{item}</span>
                  <button
                    onClick={() => startEdit(item)}
                    disabled={loading}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="Sửa"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    disabled={loading}
                    className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Xóa"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">Chưa có mục nào. Hãy thêm mục đầu tiên.</p>
        </div>
      )}
    </div>
  );
}
