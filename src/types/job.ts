export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  jobType: string;
  expertise: string;
  description: string;
  requirements: string[];
  benefits: string[];
  salary: string;
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
