export interface Job {
  id: string;
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
  fullName: string;
  email: string;
  phone: string;
  coverLetter: string;
  cvUrl: string;
  appliedAt: string;
  status: 'pending' | 'reviewed' | 'rejected';
}
