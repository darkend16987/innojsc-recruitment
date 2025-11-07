import 'dotenv/config';

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

console.log('🔍 Testing environment variables...\n');

const vars = {
  'NEXT_PUBLIC_FIREBASE_API_KEY': process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN': process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID': process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET': process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID': process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  'NEXT_PUBLIC_FIREBASE_APP_ID': process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

console.log('Environment variables loaded:');
Object.entries(vars).forEach(([key, value]) => {
  if (value) {
    const maskedValue = value.length > 20 ? value.substring(0, 20) + '...' : value;
    console.log(`✅ ${key}: ${maskedValue}`);
  } else {
    console.log(`❌ ${key}: NOT FOUND`);
  }
});

console.log('\n📁 Current working directory:', process.cwd());
console.log('📄 Looking for .env.local at:', process.cwd() + '/.env.local');

// Check if .env.local exists
const fs = require('fs');
const path = require('path');
const envPath = path.join(process.cwd(), '.env.local');

if (fs.existsSync(envPath)) {
  console.log('✅ .env.local file EXISTS');
  const content = fs.readFileSync(envPath, 'utf-8');
  console.log('\n📝 File content preview (first 5 lines):');
  content.split('\n').slice(0, 5).forEach((line: string, i: number) => {
    console.log(`  ${i + 1}: ${line.substring(0, 60)}${line.length > 60 ? '...' : ''}`);
  });
} else {
  console.log('❌ .env.local file NOT FOUND at:', envPath);
}
