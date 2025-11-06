# InnoJSC Recruitment - Setup Guide

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Firebase account

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Configuration

#### 2.1 Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore Database
4. Enable Storage
5. Set up Firestore Security Rules (see below)

#### 2.2 Get Firebase Config
1. Go to Project Settings > General
2. Scroll down to "Your apps" section
3. Click on Web app icon (</>)
4. Copy the firebaseConfig object

#### 2.3 Create Environment File
```bash
cp .env.example .env.local
```

Fill in your Firebase credentials in `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Firestore Security Rules

Go to Firestore Database > Rules and add:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Jobs collection - Read: Public, Write: Admin only
    match /jobs/{jobId} {
      allow read: if true;
      allow write: if false; // Only admin via Firebase Console or Functions
    }

    // Applications collection - Write: Public (for applying), Read: Admin only
    match /applications/{applicationId} {
      allow read: if false; // Only admin
      allow create: if true; // Anyone can apply
      allow update, delete: if false;
    }
  }
}
```

### 4. Storage Security Rules

Go to Storage > Rules and add:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // CV uploads
    match /cvs/{fileName} {
      allow read: if false; // Only admin via Firebase Console
      allow write: if request.resource.size < 5 * 1024 * 1024 // 5MB
                   && request.resource.contentType.matches('application/pdf|application/msword|application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    }
  }
}
```

### 5. Seed Sample Data (Optional)

```bash
npm run seed
```

This will add 5 sample job postings to your Firestore.

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

## 🔧 Firebase Functions Setup (Email Notifications)

### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
```

### 2. Login to Firebase

```bash
firebase login
```

### 3. Initialize Functions

```bash
cd functions
npm install
```

### 4. Set Environment Variables for Functions

```bash
# For Gmail (Option 1)
firebase functions:config:set email.user="your-email@gmail.com" email.password="your-app-password"

# For Custom SMTP (Option 2 - InnoJSC)
firebase functions:config:set \
  smtp.host="mail90162.maychuemail.com" \
  smtp.port="465" \
  email.user="your-email@innojsc.com" \
  email.password="your-password"
```

### 5. Deploy Functions

```bash
firebase deploy --only functions
```

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Deploy to Firebase Hosting

```bash
npm run build
firebase deploy --only hosting
```

## 🏗️ Project Structure

```
innojsc-recruitment/
├── src/
│   ├── app/
│   │   ├── jobs/[id]/     # Job detail page
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Homepage
│   ├── components/
│   │   ├── ApplyModal.tsx # Application modal
│   │   └── JobCard.tsx    # Job card component
│   └── lib/
│       ├── firebase-config.ts     # Firebase initialization
│       └── firestore-helpers.ts   # Firestore helper functions
├── functions/             # Firebase Cloud Functions
│   └── src/
│       └── index.ts       # Email notification function
├── scripts/
│   └── seed-jobs.ts       # Database seeding script
└── public/                # Static assets
```

## 🔑 Key Features

- ✅ Job listing with filters (location, type, expertise)
- ✅ Job detail page with related jobs
- ✅ Apply modal with CV upload
- ✅ Email notifications to HR (via Firebase Functions)
- ✅ Responsive design
- ✅ Loading states and error handling
- ✅ SEO optimized

## 🐛 Troubleshooting

### Build Errors

If you see import path errors, make sure file names match exactly:
- `firebase-config.ts` (not `firebaseConfig.ts`)
- `firestore-helpers.ts` (not `firestore.ts`)

### Firebase Connection Issues

1. Check `.env.local` exists and has correct values
2. Verify Firebase project is active
3. Check browser console for specific errors

### Deployment Issues

1. Make sure all environment variables are set
2. Check build logs for errors
3. Verify Firebase project permissions

## 📧 Support

For issues or questions, contact: ahr@innojsc.com

## 📄 License

Copyright © 2025 InnoJSC. All rights reserved.
