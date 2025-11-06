// src/lib/firestore.ts
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, Job, Application } from './firebase-config';

// ===== JOB FUNCTIONS =====

/**
 * Get all published jobs (for homepage)
 * Can be used with Next.js ISR for SEO optimization
 */
export async function getPublishedJobs(filters?: {
  location?: string;
  jobType?: string;
  expertise?: string;
}): Promise<Job[]> {
  try {
    const jobsRef = collection(db, 'jobs');
    let q = query(
      jobsRef,
      where('status', '==', 'published'),
      orderBy('publishedAt', 'desc')
    );

    // Apply filters if provided
    if (filters?.location) {
      q = query(q, where('location', '==', filters.location));
    }
    if (filters?.jobType) {
      q = query(q, where('jobType', '==', filters.jobType));
    }
    if (filters?.expertise) {
      q = query(q, where('expertise', '==', filters.expertise));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Job[];
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}

/**
 * Get a single job by ID (for detail page)
 */
export async function getJobById(jobId: string): Promise<Job | null> {
  try {
    const docRef = doc(db, 'jobs', jobId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      } as Job;
    }
    return null;
  } catch (error) {
    console.error('Error fetching job:', error);
    return null;
  }
}

/**
 * Get related jobs (same expertise or location)
 */
export async function getRelatedJobs(
  currentJobId: string,
  expertise: string,
  location: string,
  limitCount: number = 3
): Promise<Job[]> {
  try {
    const jobsRef = collection(db, 'jobs');
    const q = query(
      jobsRef,
      where('status', '==', 'published'),
      where('expertise', '==', expertise),
      orderBy('publishedAt', 'desc'),
      limit(limitCount + 1) // +1 to filter out current job
    );

    const snapshot = await getDocs(q);
    const jobs = snapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter(job => job.id !== currentJobId);

    return jobs.slice(0, limitCount) as Job[];
  } catch (error) {
    console.error('Error fetching related jobs:', error);
    return [];
  }
}

// ===== APPLICATION FUNCTIONS =====

/**
 * Upload CV to Firebase Storage
 */
export async function uploadCV(file: File, applicantName: string): Promise<string> {
  try {
    // Generate unique filename
    const timestamp = Date.now();
    const sanitizedName = applicantName.replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `cvs/${sanitizedName}_${timestamp}_${file.name}`;

    const storageRef = ref(storage, filename);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error('Error uploading CV:', error);
    throw new Error('Không thể tải lên CV. Vui lòng thử lại.');
  }
}

/**
 * Submit job application
 */
export async function submitApplication(
  jobId: string,
  jobTitle: string,
  applicantData: {
    name: string;
    email: string;
    phone: string;
  },
  cvFile: File
): Promise<string> {
  try {
    // 1. Upload CV first
    const cvUrl = await uploadCV(cvFile, applicantData.name);

    // 2. Create application document
    const application: Omit<Application, 'id'> = {
      jobId,
      jobTitle,
      applicantName: applicantData.name,
      applicantEmail: applicantData.email,
      applicantPhone: applicantData.phone,
      cvUrl,
      appliedAt: new Date().toISOString(),
    };

    const docRef = await addDoc(collection(db, 'applications'), application);

    return docRef.id;
  } catch (error) {
    console.error('Error submitting application:', error);
    throw new Error('Không thể gửi đơn ứng tuyển. Vui lòng thử lại.');
  }
}

/**
 * Get all applications for a specific job (for admin)
 */
export async function getApplicationsByJob(jobId: string): Promise<Application[]> {
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
    console.error('Error fetching applications:', error);
    return [];
  }
}
