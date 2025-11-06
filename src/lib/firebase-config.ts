// src/lib/firebaseConfig.ts
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase (singleton pattern)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };

// TypeScript Types
export interface Job {
  id?: string;
  title: string;
  department: string;
  position: 'Junior' | 'Middle' | 'Senior' | 'Manager' | 'Director';
  expertise: string;
  experience: number;
  jobType: 'Full-time' | 'Part-time' | 'Intern' | 'Contract';
  salary: {
    min: number;
    max: number;
    currency: 'VND' | 'USD';
    display: string;
  };
  tags: string[];
  location: 'Hà Nội' | 'TP.HCM' | 'Remote';
  description: string;
  requirements: string;
  benefits: string;
  publishedAt: string;
  status: 'published' | 'draft' | 'closed';
}

export interface Application {
  id?: string;
  jobId: string;
  jobTitle: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  cvUrl: string;
  appliedAt: string;
}
