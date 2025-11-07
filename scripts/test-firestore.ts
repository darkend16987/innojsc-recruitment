import 'dotenv/config';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

console.log('🔍 Testing Firestore connection...\n');
console.log('Firebase Config:');
console.log('  Project ID:', firebaseConfig.projectId);
console.log('  Auth Domain:', firebaseConfig.authDomain);
console.log('  Storage Bucket:', firebaseConfig.storageBucket);
console.log('');

try {
  // Initialize Firebase
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  const db = getFirestore(app);

  console.log('✅ Firebase initialized successfully');
  console.log('');

  // Try to write a simple test document
  console.log('🧪 Attempting to write test document to Firestore...');

  const testDocRef = doc(db, 'test_connection', 'test_doc');

  setDoc(testDocRef, {
    message: 'Hello from test script',
    timestamp: new Date().toISOString(),
  })
    .then(() => {
      console.log('✅ SUCCESS! Firestore write successful!');
      console.log('');
      console.log('Your Firebase project is working correctly.');
      console.log('The error might be in the settings data itself.');
      console.log('');
      process.exit(0);
    })
    .catch((error) => {
      console.log('❌ FAILED! Firestore write error:');
      console.log('');
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.log('');

      if (error.code === 'permission-denied') {
        console.log('💡 Solution:');
        console.log('   1. Go to Firebase Console: https://console.firebase.google.com/');
        console.log('   2. Select project: innojsc-career');
        console.log('   3. Go to Firestore Database');
        console.log('   4. Click "Rules" tab');
        console.log('   5. Change rules to (TEMPORARY FOR TESTING):');
        console.log('');
        console.log('      rules_version = \'2\';');
        console.log('      service cloud.firestore {');
        console.log('        match /databases/{database}/documents {');
        console.log('          match /{document=**} {');
        console.log('            allow read, write: if true;  // Allow all for testing');
        console.log('          }');
        console.log('        }');
        console.log('      }');
        console.log('');
      } else if (error.code === 'invalid-argument') {
        console.log('💡 This error usually means:');
        console.log('   1. Firestore is not enabled in your Firebase project');
        console.log('   2. OR Storage bucket URL format is incorrect');
        console.log('');
        console.log('Solutions:');
        console.log('   A. Enable Firestore:');
        console.log('      - Go to https://console.firebase.google.com/');
        console.log('      - Select "innojsc-career" project');
        console.log('      - Click "Firestore Database" in left menu');
        console.log('      - Click "Create database"');
        console.log('      - Choose "Start in test mode" (temporary)');
        console.log('      - Select location (asia-southeast1 recommended)');
        console.log('');
        console.log('   B. Try different Storage Bucket format:');
        console.log('      In your .env.local, try changing:');
        console.log('      FROM: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=innojsc-career.firebasestorage.app');
        console.log('      TO:   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=innojsc-career.appspot.com');
        console.log('');
      }

      process.exit(1);
    });
} catch (error: any) {
  console.error('❌ Firebase initialization error:', error.message);
  process.exit(1);
}
