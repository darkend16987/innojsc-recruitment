export interface Job {
  id: string;
  slug?: string; // URL-friendly slug: "kien-truc-su-ha-noi-abc123" (optional for backward compatibility)
  title: string;
  department: string;
  position: string; // Chức vụ: Nhân viên, Trưởng phòng, Phó phòng...
  location: string;
  jobType: string;
  expertise: string; // Cấp bậc: Junior, Senior, Lead...
  experience: number; // Số năm kinh nghiệm (0 = không yêu cầu)
  description: string;
  requirements: string[];
  benefits: string[];
  salary: string; // Text tự do: "20-30 triệu VND" hoặc "Thỏa thuận"
  tags?: string[]; // Skills/tags for this job
  status: 'published' | 'draft' | 'closed';
  publishedAt: string;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string; // Tên job để hiển thị (denormalized for convenience)
  fullName: string;
  email: string;
  phone: string;
  birthYear?: string; // Năm sinh (optional)
  rank?: string; // Cấp bậc: Junior, Senior, Lead... (optional)
  yearsOfExperience?: string; // Số năm kinh nghiệm (optional) - text range like "1-2 năm"
  notes?: string; // Ghi chú thêm từ ứng viên (optional)
  coverLetter?: string; // Optional: thư xin việc/giới thiệu bản thân
  cvUrl: string;
  appliedAt: string;
  status: 'pending' | 'reviewed' | 'rejected';
}
