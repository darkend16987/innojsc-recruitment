// src/lib/admin-firestore.ts
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase-config';
import { Job, Application } from '@/types/job';

// ===== ADMIN JOB FUNCTIONS =====

/**
 * Get all jobs (including drafts) - Admin only
 */
export async function getAllJobs(): Promise<Job[]> {
  try {
    const jobsRef = collection(db, 'jobs');
    const q = query(jobsRef, orderBy('publishedAt', 'desc'));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Job[];
  } catch (error) {
    console.error('Error fetching all jobs:', error);
    throw new Error('Không thể tải danh sách jobs');
  }
}

/**
 * Create new job
 */
export async function createJob(jobData: Omit<Job, 'id'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'jobs'), {
      ...jobData,
      publishedAt: jobData.publishedAt || new Date().toISOString(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating job:', error);
    throw new Error('Không thể tạo job mới');
  }
}

/**
 * Update existing job
 */
export async function updateJob(jobId: string, jobData: Partial<Job>): Promise<void> {
  try {
    const jobRef = doc(db, 'jobs', jobId);
    await updateDoc(jobRef, jobData);
  } catch (error) {
    console.error('Error updating job:', error);
    throw new Error('Không thể cập nhật job');
  }
}

/**
 * Delete job
 */
export async function deleteJob(jobId: string): Promise<void> {
  try {
    const jobRef = doc(db, 'jobs', jobId);
    await deleteDoc(jobRef);
  } catch (error) {
    console.error('Error deleting job:', error);
    throw new Error('Không thể xóa job');
  }
}

/**
 * Change job status
 */
export async function updateJobStatus(
  jobId: string,
  status: 'published' | 'draft' | 'closed'
): Promise<void> {
  try {
    const jobRef = doc(db, 'jobs', jobId);
    await updateDoc(jobRef, { status });
  } catch (error) {
    console.error('Error updating job status:', error);
    throw new Error('Không thể cập nhật trạng thái');
  }
}

// ===== ADMIN APPLICATION FUNCTIONS =====

/**
 * Get all applications
 */
export async function getAllApplications(): Promise<Application[]> {
  try {
    const appsRef = collection(db, 'applications');
    const q = query(appsRef, orderBy('appliedAt', 'desc'));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Application[];
  } catch (error) {
    console.error('Error fetching applications:', error);
    throw new Error('Không thể tải danh sách ứng tuyển');
  }
}

/**
 * Get applications by job ID
 */
export async function getApplicationsByJobId(jobId: string): Promise<Application[]> {
  try {
    const appsRef = collection(db, 'applications');
    const q = query(
      appsRef,
      where('jobId', '==', jobId),
      orderBy('appliedAt', 'desc')
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Application[];
  } catch (error) {
    console.error('Error fetching applications by job:', error);
    return [];
  }
}

/**
 * Delete application
 */
export async function deleteApplication(applicationId: string): Promise<void> {
  try {
    const appRef = doc(db, 'applications', applicationId);
    await deleteDoc(appRef);
  } catch (error) {
    console.error('Error deleting application:', error);
    throw new Error('Không thể xóa đơn ứng tuyển');
  }
}

// ===== STATISTICS =====

/**
 * Get dashboard statistics
 */
export async function getDashboardStats(): Promise<{
  totalJobs: number;
  publishedJobs: number;
  draftJobs: number;
  closedJobs: number;
  totalApplications: number;
  recentApplications: Application[];
}> {
  try {
    const [jobs, applications] = await Promise.all([
      getAllJobs(),
      getAllApplications(),
    ]);

    return {
      totalJobs: jobs.length,
      publishedJobs: jobs.filter(j => j.status === 'published').length,
      draftJobs: jobs.filter(j => j.status === 'draft').length,
      closedJobs: jobs.filter(j => j.status === 'closed').length,
      totalApplications: applications.length,
      recentApplications: applications.slice(0, 10),
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw new Error('Không thể tải thống kê');
  }
}
