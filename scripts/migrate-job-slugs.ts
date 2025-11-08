/**
 * Migration script: Add slug field to existing jobs
 * Run this ONCE after deploying slug feature
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { generateUniqueSlug } from '../src/lib/slug';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function migrateJobSlugs() {
  console.log('🔄 Starting job slug migration...\n');

  try {
    const jobsRef = collection(db, 'jobs');
    const snapshot = await getDocs(jobsRef);

    console.log(`📊 Found ${snapshot.size} jobs to process\n`);

    let updated = 0;
    let skipped = 0;
    let errors = 0;

    for (const jobDoc of snapshot.docs) {
      const jobData = jobDoc.data();
      const jobId = jobDoc.id;

      // Skip if already has slug
      if (jobData.slug) {
        console.log(`⏭️  [${jobId}] Already has slug: ${jobData.slug}`);
        skipped++;
        continue;
      }

      try {
        // Generate slug from title
        const slug = generateUniqueSlug(jobData.title || 'untitled-job');

        // Update job with slug
        await updateDoc(doc(db, 'jobs', jobId), { slug });

        console.log(`✅ [${jobId}] "${jobData.title}"\n   → ${slug}`);
        updated++;
      } catch (error) {
        console.error(`❌ [${jobId}] Error:`, error);
        errors++;
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📈 Migration Summary:');
    console.log(`   ✅ Updated: ${updated}`);
    console.log(`   ⏭️  Skipped: ${skipped}`);
    console.log(`   ❌ Errors: ${errors}`);
    console.log('='.repeat(60) + '\n');

    if (errors === 0) {
      console.log('🎉 Migration completed successfully!\n');
    } else {
      console.warn('⚠️  Migration completed with errors. Please review.\n');
    }

  } catch (error) {
    console.error('💥 Fatal error during migration:', error);
    process.exit(1);
  }

  process.exit(0);
}

// Run migration
migrateJobSlugs();
