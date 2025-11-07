import 'dotenv/config';
import { initializeSettings } from '../src/lib/settings';

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

// Validate Firebase config
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check if all required config values are present
const missingVars = Object.entries(firebaseConfig)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  console.error('❌ Error: Missing Firebase environment variables:');
  missingVars.forEach(varName => console.error(`  - ${varName}`));
  console.error('\n💡 Please create a .env.local file with your Firebase config.');
  console.error('   See .env.example or DEPLOYMENT.md for instructions.\n');
  process.exit(1);
}

// Note: Firebase is automatically initialized when settings.ts imports firebase-config.ts
// No need to initialize it here

async function seedSettings() {
  console.log('🌱 Seeding system settings...\n');

  try {
    await initializeSettings();

    console.log('\n✅ Settings seeded successfully!');
    console.log('\nDefault settings have been created:');
    console.log('  • 20 Departments (Ban giám đốc, Kiến trúc, BIM, MEP...)');
    console.log('  • 13 Positions (Giám đốc, Kiến trúc sư, Kỹ sư, Nhân viên...)');
    console.log('  • 2 Locations (Hà Nội, TP.HCM)');
    console.log('  • 6 Job Types (Toàn thời gian, Part-time, Thực tập...)');
    console.log('  • 6 Expertise Levels (Thực tập → Junior → Mid-Level → Senior → Expert)');
    console.log('  • 60+ Skills (AutoCAD, Revit, Etabs, BIM, MS Project, Photoshop...)');
    console.log('\n💡 You can manage these settings in the Admin Panel at /admin/settings\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error seeding settings:', error);
    process.exit(1);
  }
}

seedSettings();
