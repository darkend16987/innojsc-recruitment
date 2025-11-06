/**
 * Seed Script for InnoJSC Recruitment
 *
 * This script adds sample job data to Firestore.
 *
 * Usage:
 * 1. Make sure you have .env.local with Firebase config
 * 2. Run: npx ts-node scripts/seed-jobs.ts
 *
 * Note: This uses client-side Firebase SDK
 */

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Firebase config from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

// Sample job data
const SAMPLE_JOBS = [
  {
    title: 'Senior Frontend Developer (ReactJS)',
    department: 'Phòng Công nghệ',
    position: 'Senior',
    expertise: 'Frontend',
    experience: 3,
    jobType: 'Full-time',
    salary: {
      min: 2000,
      max: 3000,
      currency: 'USD',
      display: 'Up to $3000',
    },
    tags: ['HOT', 'ƯU TIÊN NGOẠI NGỮ'],
    location: 'Hà Nội',
    description: `
      <h3 class="text-lg font-semibold text-gray-800 mb-2">Mô tả công việc</h3>
      <ul class="list-disc list-inside space-y-1 text-gray-700">
        <li>Phát triển các tính năng mới cho sản phẩm sử dụng React.js và Next.js</li>
        <li>Tối ưu hóa hiệu suất và trải nghiệm người dùng</li>
        <li>Làm việc với UI/UX designer và backend team để đảm bảo tích hợp mượt mà</li>
        <li>Review code và hỗ trợ các thành viên khác trong nhóm</li>
        <li>Nghiên cứu và áp dụng các công nghệ mới để cải thiện quy trình phát triển</li>
      </ul>
    `,
    requirements: `
      <h3 class="text-lg font-semibold text-gray-800 mb-2">Yêu cầu ứng viên</h3>
      <ul class="list-disc list-inside space-y-1 text-gray-700">
        <li>Ít nhất 3 năm kinh nghiệm làm việc với React.js</li>
        <li>Thành thạo JavaScript (ES6+), TypeScript</li>
        <li>Có kinh nghiệm làm việc với Redux, Context API, React Query</li>
        <li>Hiểu biết về Next.js và SSR/SSG</li>
        <li>Kỹ năng tiếng Anh đọc hiểu tốt</li>
        <li>Có khả năng làm việc độc lập và theo nhóm</li>
      </ul>
    `,
    benefits: `
      <h3 class="text-lg font-semibold text-gray-800 mb-2">Quyền lợi</h3>
      <ul class="list-disc list-inside space-y-1 text-gray-700">
        <li>Mức lương cạnh tranh, thưởng dự án, lương tháng 13</li>
        <li>Môi trường làm việc năng động, chuyên nghiệp</li>
        <li>Bảo hiểm sức khỏe cao cấp cho nhân viên và gia đình</li>
        <li>Cơ hội thăng tiến và phát triển nghề nghiệp rõ ràng</li>
        <li>Du lịch công ty hàng năm, team building định kỳ</li>
        <li>Làm việc với các dự án quốc tế</li>
      </ul>
    `,
    publishedAt: new Date().toISOString(),
    status: 'published',
  },
  {
    title: 'Backend Developer (NodeJS/NestJS)',
    department: 'Phòng Công nghệ',
    position: 'Middle',
    expertise: 'Backend',
    experience: 2,
    jobType: 'Full-time',
    salary: {
      min: 1500,
      max: 2500,
      currency: 'USD',
      display: '$1500 - $2500',
    },
    tags: ['TUYỂN DỤNG GẤP'],
    location: 'TP.HCM',
    description: `
      <h3 class="text-lg font-semibold text-gray-800 mb-2">Mô tả công việc</h3>
      <ul class="list-disc list-inside space-y-1 text-gray-700">
        <li>Phát triển và bảo trì hệ thống API cho các dự án của công ty</li>
        <li>Thiết kế database schema và tối ưu hóa query</li>
        <li>Tích hợp với các dịch vụ bên thứ ba (payment, SMS, email, etc.)</li>
        <li>Viết unit tests và integration tests</li>
        <li>Tham gia vào việc review code và cải thiện chất lượng code</li>
      </ul>
    `,
    requirements: `
      <h3 class="text-lg font-semibold text-gray-800 mb-2">Yêu cầu ứng viên</h3>
      <ul class="list-disc list-inside space-y-1 text-gray-700">
        <li>2+ năm kinh nghiệm làm việc với NodeJS</li>
        <li>Có kinh nghiệm với NestJS hoặc ExpressJS</li>
        <li>Thành thạo MongoDB, PostgreSQL hoặc MySQL</li>
        <li>Hiểu biết về RESTful API và GraphQL</li>
        <li>Có kiến thức về Docker và CI/CD</li>
        <li>Kỹ năng giải quyết vấn đề tốt</li>
      </ul>
    `,
    benefits: `
      <h3 class="text-lg font-semibold text-gray-800 mb-2">Quyền lợi</h3>
      <ul class="list-disc list-inside space-y-1 text-gray-700">
        <li>Lương thưởng hấp dẫn, review tăng lương 6 tháng/lần</li>
        <li>Bảo hiểm đầy đủ theo luật lao động</li>
        <li>Làm việc từ thứ 2 đến thứ 6, nghỉ cuối tuần</li>
        <li>Được đào tạo và phát triển kỹ năng chuyên môn</li>
        <li>Du lịch hàng năm, team building định kỳ</li>
        <li>Môi trường làm việc thân thiện, năng động</li>
      </ul>
    `,
    publishedAt: new Date().toISOString(),
    status: 'published',
  },
  {
    title: 'Business Analyst (BA)',
    department: 'Phòng Phân tích Nghiệp vụ',
    position: 'Junior',
    expertise: 'BA',
    experience: 1,
    jobType: 'Full-time',
    salary: {
      min: 800,
      max: 1500,
      currency: 'USD',
      display: '$800 - $1500',
    },
    tags: [],
    location: 'Hà Nội',
    description: `
      <h3 class="text-lg font-semibold text-gray-800 mb-2">Mô tả công việc</h3>
      <ul class="list-disc list-inside space-y-1 text-gray-700">
        <li>Thu thập và phân tích yêu cầu từ khách hàng</li>
        <li>Viết tài liệu đặc tả yêu cầu (Requirements Specification)</li>
        <li>Làm việc với team phát triển để đảm bảo sản phẩm đáp ứng yêu cầu</li>
        <li>Hỗ trợ test và UAT với khách hàng</li>
        <li>Tham gia vào việc đào tạo người dùng cuối</li>
      </ul>
    `,
    requirements: `
      <h3 class="text-lg font-semibold text-gray-800 mb-2">Yêu cầu ứng viên</h3>
      <ul class="list-disc list-inside space-y-1 text-gray-700">
        <li>Tốt nghiệp chuyên ngành CNTT, Kinh tế hoặc liên quan</li>
        <li>1+ năm kinh nghiệm làm BA (hoặc sinh viên mới ra trường xuất sắc)</li>
        <li>Kỹ năng giao tiếp tốt, có khả năng làm việc với nhiều bên</li>
        <li>Có kiến thức cơ bản về phát triển phần mềm</li>
        <li>Biết sử dụng các công cụ như Jira, Confluence</li>
        <li>Tiếng Anh giao tiếp cơ bản</li>
      </ul>
    `,
    benefits: `
      <h3 class="text-lg font-semibold text-gray-800 mb-2">Quyền lợi</h3>
      <ul class="list-disc list-inside space-y-1 text-gray-700">
        <li>Môi trường làm việc linh hoạt, cơ hội học hỏi nhiều</li>
        <li>Được đào tạo bài bản về quy trình BA chuyên nghiệp</li>
        <li>Lương thưởng cạnh tranh theo năng lực</li>
        <li>Cơ hội làm việc với các dự án lớn, đa dạng</li>
        <li>Bảo hiểm xã hội đầy đủ</li>
        <li>Team building và các hoạt động ngoại khóa</li>
      </ul>
    `,
    publishedAt: new Date().toISOString(),
    status: 'published',
  },
  {
    title: 'Mobile Developer (React Native)',
    department: 'Phòng Công nghệ',
    position: 'Middle',
    expertise: 'Mobile',
    experience: 2,
    jobType: 'Full-time',
    salary: {
      min: 1500,
      max: 2500,
      currency: 'USD',
      display: '$1500 - $2500',
    },
    tags: ['HOT'],
    location: 'Remote',
    description: `
      <h3 class="text-lg font-semibold text-gray-800 mb-2">Mô tả công việc</h3>
      <ul class="list-disc list-inside space-y-1 text-gray-700">
        <li>Phát triển ứng dụng mobile đa nền tảng với React Native</li>
        <li>Tối ưu hóa hiệu suất ứng dụng trên iOS và Android</li>
        <li>Tích hợp API và các dịch vụ backend</li>
        <li>Phối hợp với designers để implement UI/UX</li>
        <li>Maintain và cải thiện code base hiện có</li>
      </ul>
    `,
    requirements: `
      <h3 class="text-lg font-semibold text-gray-800 mb-2">Yêu cầu ứng viên</h3>
      <ul class="list-disc list-inside space-y-1 text-gray-700">
        <li>2+ năm kinh nghiệm phát triển ứng dụng React Native</li>
        <li>Thành thạo JavaScript/TypeScript</li>
        <li>Có kinh nghiệm với Redux, MobX hoặc Context API</li>
        <li>Hiểu biết về Native modules (iOS/Android)</li>
        <li>Có kinh nghiệm deploy app lên App Store và Google Play</li>
        <li>Am hiểu về performance optimization</li>
      </ul>
    `,
    benefits: `
      <h3 class="text-lg font-semibold text-gray-800 mb-2">Quyền lợi</h3>
      <ul class="list-disc list-inside space-y-1 text-gray-700">
        <li>Làm việc remote 100% hoặc hybrid</li>
        <li>Lương thưởng cạnh tranh, review 6 tháng/lần</li>
        <li>Trang thiết bị làm việc đầy đủ (Macbook Pro, màn hình)</li>
        <li>Flexible working hours</li>
        <li>Budget cho học tập và phát triển cá nhân</li>
        <li>Bảo hiểm sức khỏe cao cấp</li>
      </ul>
    `,
    publishedAt: new Date().toISOString(),
    status: 'published',
  },
  {
    title: 'DevOps Engineer',
    department: 'Phòng Công nghệ',
    position: 'Senior',
    expertise: 'DevOps',
    experience: 3,
    jobType: 'Full-time',
    salary: {
      min: 2000,
      max: 3500,
      currency: 'USD',
      display: '$2000 - $3500',
    },
    tags: ['ƯU TIÊN NGOẠI NGỮ'],
    location: 'Hà Nội',
    description: `
      <h3 class="text-lg font-semibold text-gray-800 mb-2">Mô tả công việc</h3>
      <ul class="list-disc list-inside space-y-1 text-gray-700">
        <li>Thiết kế và quản lý hạ tầng cloud (AWS/GCP/Azure)</li>
        <li>Xây dựng và maintain CI/CD pipelines</li>
        <li>Monitoring và logging hệ thống</li>
        <li>Tối ưu hóa chi phí và hiệu suất infrastructure</li>
        <li>Security hardening và compliance</li>
        <li>Hỗ trợ development team về infrastructure issues</li>
      </ul>
    `,
    requirements: `
      <h3 class="text-lg font-semibold text-gray-800 mb-2">Yêu cầu ứng viên</h3>
      <ul class="list-disc list-inside space-y-1 text-gray-700">
        <li>3+ năm kinh nghiệm làm DevOps/SRE</li>
        <li>Thành thạo Docker, Kubernetes</li>
        <li>Có kinh nghiệm với AWS/GCP/Azure</li>
        <li>Biết sử dụng Terraform, Ansible, hoặc CloudFormation</li>
        <li>Am hiểu về CI/CD tools (Jenkins, GitLab CI, GitHub Actions)</li>
        <li>Kiến thức về monitoring tools (Prometheus, Grafana, ELK)</li>
        <li>Tiếng Anh giao tiếp tốt</li>
      </ul>
    `,
    benefits: `
      <h3 class="text-lg font-semibold text-gray-800 mb-2">Quyền lợi</h3>
      <ul class="list-disc list-inside space-y-1 text-gray-700">
        <li>Mức lương top market, bonus theo hiệu suất</li>
        <li>Làm việc với công nghệ hiện đại nhất</li>
        <li>Budget cho certifications (AWS, GCP, Kubernetes)</li>
        <li>Flexible working time và location</li>
        <li>Bảo hiểm sức khỏe cao cấp cho cả gia đình</li>
        <li>Cơ hội làm việc với các dự án quốc tế</li>
      </ul>
    `,
    publishedAt: new Date().toISOString(),
    status: 'published',
  },
];

async function seedJobs() {
  console.log('🌱 Starting to seed job data...\n');

  try {
    for (const job of SAMPLE_JOBS) {
      const docRef = await addDoc(collection(db, 'jobs'), job);
      console.log(`✅ Added job: ${job.title} (ID: ${docRef.id})`);
    }

    console.log(`\n✨ Successfully seeded ${SAMPLE_JOBS.length} jobs!`);
    console.log('\n📝 You can now view these jobs on your recruitment website.');
  } catch (error) {
    console.error('❌ Error seeding jobs:', error);
    throw error;
  }
}

// Run the seed function
seedJobs()
  .then(() => {
    console.log('\n🎉 Seed completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Seed failed:', error);
    process.exit(1);
  });
