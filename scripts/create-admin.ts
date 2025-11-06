import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import * as readline from 'readline';

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
const auth = getAuth(app);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function createAdmin() {
  console.log('\n🔐 Create Admin User for InnoJSC Recruitment\n');

  try {
    const email = await question('Enter admin email: ');
    const password = await question('Enter admin password (min 6 characters): ');

    if (!email || !email.includes('@')) {
      console.error('❌ Invalid email address');
      rl.close();
      process.exit(1);
    }

    if (!password || password.length < 6) {
      console.error('❌ Password must be at least 6 characters');
      rl.close();
      process.exit(1);
    }

    console.log('\n⏳ Creating admin user...');

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log('\n✅ Admin user created successfully!');
    console.log(`📧 Email: ${user.email}`);
    console.log(`🆔 UID: ${user.uid}`);
    console.log('\n💡 You can now login at: /admin/login');
    console.log('\n⚠️  IMPORTANT: Update Firestore Security Rules to restrict admin access:');
    console.log(`   - Add this UID to your admin list: ${user.uid}`);
    console.log('   - See SETUP.md for security rules configuration\n');

    rl.close();
    process.exit(0);
  } catch (error: any) {
    console.error('\n❌ Error creating admin user:', error.message);

    if (error.code === 'auth/email-already-in-use') {
      console.error('   This email is already registered.');
    } else if (error.code === 'auth/invalid-email') {
      console.error('   The email address is invalid.');
    } else if (error.code === 'auth/weak-password') {
      console.error('   The password is too weak. Use at least 6 characters.');
    }

    rl.close();
    process.exit(1);
  }
}

createAdmin();
