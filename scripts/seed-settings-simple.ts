import 'dotenv/config';
import { getApps, initializeApp } from 'firebase/app';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

require('dotenv').config({ path: '.env.local' });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

// Simple settings without special characters to test
const SIMPLE_SETTINGS = {
  departments: [
    'Ban giam doc',
    'Kien truc',
    'BIM',
    'Noi that',
    'Canh quan',
    'Ket cau',
    'MEP - Dien',
    'MEP - Cap thoat nuoc',
    'MEP - HVAC',
    'Phong chay chua chay',
    'Ha tang',
    'Hanh chinh',
    'Nhan su',
    'Dao tao',
    'Marketing',
    'IT',
    'Ke toan',
    'Hop dong - Thau',
    'Ke hoach - Dau tu',
    'Tai chinh kinh doanh',
  ],
  positions: [
    'Giam doc',
    'Pho giam doc',
    'Truong phong',
    'Pho phong',
    'Truong nhom',
    'Kien truc su chinh',
    'Kien truc su',
    'Ky su truong',
    'Ky su',
    'Chuyen vien',
    'Nhan vien',
    'Cong tac vien',
    'Thuc tap sinh',
  ],
  locations: ['Ha Noi', 'TP.HCM'],
  jobTypes: ['Toan thoi gian', 'Part-time', 'Cong tac vien', 'Hoc viec', 'Chuyen gia', 'Thuc tap'],
  expertiseLevels: ['Thuc tap', 'Vua tot nghiep', 'Junior', 'Mid-Level', 'Senior', 'Expert'],
  skills: [
    'AutoCAD',
    'Revit',
    'ArchiCAD',
    'SketchUp',
    '3ds Max',
    'V-Ray',
    'Lumion',
    'Enscape',
    'Rhino',
    'Grasshopper',
    'Etabs',
    'SAP2000',
    'Safe',
    'Tekla Structures',
    'STAAD.Pro',
    'AutoCAD MEP',
    'Revit MEP',
    'Navisworks',
    'BIM 360',
    'Solibri',
    'MS Project',
    'Primavera P6',
    'MS Word',
    'MS Excel',
    'MS PowerPoint',
    'Photoshop',
    'Illustrator',
    'InDesign',
    'CorelDRAW',
    'Corona Renderer',
    'KeyShot',
    'Twinmotion',
    'Tieng Anh',
    'Tieng Nhat',
    'Tieng Han',
    'Doc ban ve ky thuat',
    'Thiet ke kien truc',
    'Thiet ke noi that',
    'Thiet ke canh quan',
    'Tinh toan ket cau',
    'Thiet ke MEP',
    'Quan ly du an',
    'Giam sat thi cong',
    'Lap du toan',
    'Lap ho so thau',
    'Nghiem thu cong trinh',
    'BIM Coordinator',
    'BIM Manager',
  ],
};

async function seedSimple() {
  console.log('🌱 Seeding with simplified settings (no special chars)...\n');

  try {
    const settingsRef = doc(db, 'settings', 'system');

    console.log('Writing to Firestore...');
    await setDoc(settingsRef, SIMPLE_SETTINGS);

    console.log('\n✅ Settings seeded successfully!');
    console.log('\nDefault settings created:');
    console.log('  • 20 Departments');
    console.log('  • 13 Positions');
    console.log('  • 2 Locations');
    console.log('  • 6 Job Types');
    console.log('  • 6 Expertise Levels');
    console.log('  • 60+ Skills');
    console.log('\n💡 You can edit these in Admin Panel at /admin/settings to add Vietnamese characters\n');

    process.exit(0);
  } catch (error: any) {
    console.error('\n❌ Error:', error.message);
    console.error('Code:', error.code);
    process.exit(1);
  }
}

seedSimple();
