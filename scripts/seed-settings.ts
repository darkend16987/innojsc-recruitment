import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeSettings } from '../src/lib/settings';

// Load environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedSettings() {
  console.log('🌱 Seeding system settings...\n');

  try {
    await initializeSettings();

    console.log('\n✅ Settings seeded successfully!');
    console.log('\nDefault settings have been created:');
    console.log('  • Departments: Phát triển sản phẩm, Công nghệ, Kinh doanh, Marketing, Nhân sự, Kế toán');
    console.log('  • Locations: Hà Nội, TP.HCM, Đà Nẵng, Remote, Hybrid');
    console.log('  • Job Types: Full-time, Part-time, Contract, Internship');
    console.log('  • Expertise Levels: Intern, Fresher, Junior, Mid-level, Senior, Lead, Manager');
    console.log('  • Skills: React, Vue.js, Angular, Node.js, Python, Java, and more...');
    console.log('\n💡 You can manage these settings in the Admin Panel at /admin/settings\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error seeding settings:', error);
    process.exit(1);
  }
}

seedSettings();
