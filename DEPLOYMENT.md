# 🚀 Hướng dẫn Deploy Đầy Đủ - InnoJSC Recruitment

> **Hướng dẫn chi tiết từng bước cho người mới**
> Thời gian ước tính: 30-45 phút

---

## 📋 Checklist Chuẩn Bị

Trước khi bắt đầu, đảm bảo bạn có:

- [ ] Tài khoản GitHub (đã có code trong repo)
- [ ] Tài khoản Google (để tạo Firebase project)
- [ ] Node.js đã cài (version 18+) - Kiểm tra: `node --version`
- [ ] Git đã cài - Kiểm tra: `git --version`
- [ ] Trình duyệt web (Chrome/Firefox/Edge)
- [ ] Email công ty InnoJSC (để gửi thông báo ứng tuyển)

---

## 🎯 Tổng Quan Kiến Trúc

```
┌─────────────────┐
│   End Users     │ (Người tìm việc)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│     Vercel      │ ← Frontend (Next.js)
│   (Hosting)     │    • Trang chủ
└────────┬────────┘    • Chi tiết job
         │              • Form ứng tuyển
         │
         ▼
┌─────────────────┐
│    Firebase     │ ← Backend
│                 │    • Firestore (Database)
│  ┌───────────┐  │    • Storage (CV files)
│  │ Firestore │  │    • Functions (Email)
│  │  Storage  │  │    • Auth (Admin login)
│  │ Functions │  │
│  │   Auth    │  │
│  └───────────┘  │
└─────────────────┘
         ▲
         │
┌────────┴────────┐
│   HR Admin      │
│   (/admin)      │
└─────────────────┘
```

---

# PHẦN 1️⃣: Setup Firebase (20 phút)

Firebase sẽ lưu trữ:
- **Firestore Database**: Danh sách jobs, ứng tuyển
- **Storage**: File CV của ứng viên
- **Authentication**: Đăng nhập admin
- **Functions**: Gửi email thông báo

## Bước 1.1: Tạo Firebase Project

1. **Mở trình duyệt**, truy cập: https://console.firebase.google.com

2. **Đăng nhập** bằng tài khoản Google

3. **Click "Add project"** (hoặc "Thêm dự án")

4. **Nhập tên project**: `innojsc-recruitment`
   - Click "Continue" (Tiếp tục)

5. **Google Analytics**:
   - Bật hoặc tắt tùy ý (không bắt buộc)
   - Click "Create project" (Tạo dự án)

6. **Đợi ~30 giây** cho Firebase khởi tạo

7. **Click "Continue"** khi thấy "Your new project is ready"

✅ Bạn đã tạo xong Firebase project!

---

## Bước 1.2: Setup Firestore Database

1. **Trong Firebase Console**, tìm menu bên trái → Click **"Firestore Database"**

2. **Click "Create database"** (Tạo cơ sở dữ liệu)

3. **Chọn location**:
   - Chọn `asia-southeast1 (Singapore)` (gần Việt Nam nhất)
   - Click "Next"

4. **Security rules**:
   - Chọn **"Start in production mode"**
   - Click "Enable"
   - ⚠️ Chúng ta sẽ update rules sau

5. **Đợi database khởi tạo** (~20 giây)

✅ Database đã sẵn sàng!

---

## Bước 1.3: Setup Firebase Storage

1. **Trong menu trái**, Click **"Storage"**

2. **Click "Get started"**

3. **Security rules**:
   - Giữ nguyên default → Click "Next"

4. **Location**:
   - Chọn cùng location với Firestore (`asia-southeast1`)
   - Click "Done"

5. **Đợi khởi tạo** (~10 giây)

✅ Storage đã sẵn sàng lưu CV!

---

## Bước 1.4: Setup Firebase Authentication

1. **Trong menu trái**, Click **"Authentication"**

2. **Click "Get started"**

3. **Tab "Sign-in method"** → Click **"Email/Password"**

4. **Enable Email/Password**:
   - Bật toggle đầu tiên (Email/Password)
   - KHÔNG bật "Email link" (toggle thứ 2)
   - Click "Save"

✅ Admin có thể đăng nhập bằng email/password!

---

## Bước 1.5: Lấy Firebase Config

1. **Trong Firebase Console**, click icon ⚙️ (Settings) góc trên trái → **"Project settings"**

2. **Scroll xuống** → Phần **"Your apps"**

3. **Click icon Web** `</>`
   - App nickname: `innojsc-recruitment-web`
   - KHÔNG tick "Also set up Firebase Hosting"
   - Click "Register app"

4. **Copy Firebase config** (sẽ thấy đoạn code như này):
   ```javascript
   const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "innojsc-recruitment.firebaseapp.com",
     projectId: "innojsc-recruitment",
     storageBucket: "innojsc-recruitment.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123"
   };
   ```

5. **LƯU LẠI** các giá trị này (sẽ dùng sau)

6. **Click "Continue to console"**

✅ Đã lấy được Firebase config!

---

## Bước 1.6: Update Firestore Security Rules

**Tại sao**: Cho phép public đọc jobs, admin quản lý, users ứng tuyển

1. **Firestore Database** → Tab **"Rules"**

2. **XÓA HẾT** code cũ, paste code mới:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper function kiểm tra admin
    function isAdmin() {
      // THAY YOUR_ADMIN_UID bằng UID thật sau khi tạo admin
      return request.auth != null && (
        request.auth.uid == 'YOUR_ADMIN_UID'
        // Thêm admin khác: || request.auth.uid == 'ADMIN_UID_2'
      );
    }

    // Jobs: Public đọc, Admin ghi
    match /jobs/{jobId} {
      allow read: if true;
      allow create, update, delete: if isAdmin();
    }

    // Applications: Public tạo, Admin đọc/xóa
    match /applications/{applicationId} {
      allow read, delete: if isAdmin();
      allow create: if true;
      allow update: if false;
    }

    // Settings: Public đọc (cho dropdowns), Admin ghi
    match /settings/{settingId} {
      allow read: if true;
      allow write: if isAdmin();
    }
  }
}
```

3. **Click "Publish"**

⚠️ **LƯU Ý**: Sau khi tạo admin user (bước 3.4), phải quay lại đây thay `YOUR_ADMIN_UID`!

---

## Bước 1.7: Update Storage Security Rules

1. **Storage** → Tab **"Rules"**

2. **XÓA HẾT** code cũ, paste code mới:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // CVs: Public upload, Admin đọc
    match /cvs/{fileName} {
      allow read: if request.auth != null; // Admin đã login
      allow write: if request.resource.size < 5 * 1024 * 1024 // Max 5MB
                   && request.resource.contentType.matches(
                     'application/pdf|application/msword|application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                   );
    }
  }
}
```

3. **Click "Publish"**

✅ Firebase backend đã setup xong!

---

# PHẦN 2️⃣: Clone Project & Setup Local (5 phút)

## Bước 2.1: Clone Repository

1. **Mở Terminal/Command Prompt**

2. **Di chuyển** đến thư mục muốn lưu project:
   ```bash
   cd Desktop  # Hoặc thư mục khác
   ```

3. **Clone repo**:
   ```bash
   git clone https://github.com/darkend16987/innojsc-recruitment.git
   cd innojsc-recruitment
   ```

4. **Checkout branch đúng**:
   ```bash
   git checkout claude/code-review-logic-check-011CUs8kUCmcc9YnEutNQKHk
   ```

✅ Code đã về máy!

---

## Bước 2.2: Cài Dependencies

```bash
npm install
```

**Đợi 2-3 phút** cho npm tải packages (~400MB)

✅ Dependencies đã cài xong!

---

## Bước 2.3: Tạo File Environment Variables

1. **Copy file mẫu**:
   ```bash
   cp .env.example .env.local
   ```

2. **Mở file `.env.local`** bằng text editor (VSCode, Notepad++, etc.)

3. **Điền Firebase config** (từ Bước 1.5):

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=AIza...  # ← Paste từ Firebase config
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=innojsc-recruitment.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=innojsc-recruitment
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=innojsc-recruitment.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
   NEXT_PUBLIC_SITE_URL=http://localhost:3000  # ← Tạm thời local, sẽ đổi sau
   ```

4. **Lưu file**

✅ Environment variables đã setup!

---

## Bước 2.4: Test Chạy Local (Tùy chọn)

**Để chắc chắn mọi thứ hoạt động:**

```bash
npm run dev
```

**Mở trình duyệt**: http://localhost:3000

- Nếu thấy trang homepage → ✅ OK!
- Nếu lỗi → Kiểm tra lại `.env.local`

**Tắt server**: Nhấn `Ctrl + C` trong terminal

---

# PHẦN 3️⃣: Deploy lên Vercel (10 phút)

Vercel sẽ host frontend (Next.js), tự động build & deploy mỗi khi push code.

## Bước 3.1: Tạo Tài Khoản Vercel

1. **Truy cập**: https://vercel.com/signup

2. **Click "Continue with GitHub"**

3. **Authorize Vercel** truy cập GitHub repos

4. **Đăng nhập thành công** → Vào Vercel Dashboard

---

## Bước 3.2: Import Project từ GitHub

1. **Click "Add New..."** → **"Project"**

2. **Tìm repo `innojsc-recruitment`**
   - Nếu không thấy → Click "Adjust GitHub App Permissions" → Grant access

3. **Click "Import"** bên cạnh repo name

4. **Configure Project**:
   - **Project Name**: `innojsc-recruitment` (hoặc tùy ý)
   - **Framework Preset**: Next.js (auto-detect)
   - **Root Directory**: `.` (giữ nguyên)
   - **Build Command**: `npm run build` (auto)
   - **Output Directory**: `.next` (auto)

5. **ĐỪNG CLICK DEPLOY** - Cần thêm Environment Variables trước!

---

## Bước 3.3: Thêm Environment Variables

**Trong màn hình Configure Project:**

1. **Mở rộng "Environment Variables"**

2. **Thêm từng biến**:

   | Key | Value |
   |-----|-------|
   | `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIza...` (từ Firebase config) |
   | `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `innojsc-recruitment.firebaseapp.com` |
   | `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `innojsc-recruitment` |
   | `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `innojsc-recruitment.appspot.com` |
   | `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `123456789` |
   | `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:123456789:web:abc123` |

   **Cách thêm mỗi biến**:
   - Nhập **Key** vào ô trên
   - Nhập **Value** vào ô dưới
   - Click **Add**

3. **QUAN TRỌNG**: Chưa thêm `NEXT_PUBLIC_SITE_URL` (sẽ có sau khi deploy)

---

## Bước 3.4: Deploy!

1. **Click "Deploy"** (nút xanh to)

2. **Đợi build** (~2-3 phút)
   - Xem logs real-time
   - Nếu có lỗi → Check Environment Variables

3. **Khi thấy "Congratulations!"** → ✅ Deploy thành công!

4. **Click "Continue to Dashboard"**

---

## Bước 3.5: Lấy Production URL

1. **Trong Project Dashboard**, thấy URL dạng:
   ```
   https://innojsc-recruitment-abc123.vercel.app
   ```

2. **COPY URL này**

3. **Quay lại Settings** → **Environment Variables**

4. **Thêm biến mới**:
   - Key: `NEXT_PUBLIC_SITE_URL`
   - Value: `https://innojsc-recruitment-abc123.vercel.app` (URL vừa copy)
   - Click **Add**

5. **Trigger Redeploy**:
   - Tab **Deployments** → Click nút 3 chấm ⋮ của deployment mới nhất
   - Click **Redeploy** → Confirm
   - Đợi ~1 phút

✅ Website đã LIVE tại URL Vercel!

---

# PHẦN 4️⃣: Khởi Tạo Dữ Liệu (10 phút)

## Bước 4.1: Seed Settings (Bắt buộc)

**Tại sao**: Tạo danh sách dropdown cho admin (departments, positions, skills...)

**Trong terminal** (ở thư mục project):

```bash
npm run seed-settings
```

**Kết quả**:
```
✅ Settings seeded successfully!

Default settings have been created:
  • Departments: Phát triển sản phẩm, Công nghệ, Kinh doanh...
  • Locations: Hà Nội, TP.HCM, Đà Nẵng, Remote, Hybrid
  • Job Types: Full-time, Part-time, Contract, Internship
  • Expertise Levels: Intern, Fresher, Junior, Mid-level, Senior...
  • Skills: React, Vue.js, Angular, Node.js, Python...
```

**Kiểm tra**:
1. Vào Firebase Console → Firestore Database
2. Thấy collection `settings` → document `system`
3. Có các field: departments, locations, jobTypes, etc.

✅ Settings đã có!

---

## Bước 4.2: Tạo Admin User (Bắt buộc)

**Tại sao**: Admin login vào `/admin` để quản lý jobs

```bash
npm run create-admin
```

**Nhập thông tin** (theo prompt):
```
Enter admin email: hr@innojsc.com
Enter admin password: ******** (tối thiểu 6 ký tự)
```

**Kết quả**:
```
✅ Admin user created successfully!
📧 Email: hr@innojsc.com
🆔 UID: abc123xyz789...  ← LƯU LẠI CÁI NÀY!
```

**⚠️ QUAN TRỌNG - Cập nhật Firestore Rules:**

1. **COPY UID** (dạng `abc123xyz789...`)

2. **Vào Firebase Console** → **Firestore Database** → **Rules**

3. **Tìm dòng**:
   ```javascript
   request.auth.uid == 'YOUR_ADMIN_UID'
   ```

4. **THAY `YOUR_ADMIN_UID` bằng UID thật**, ví dụ:
   ```javascript
   request.auth.uid == 'abc123xyz789...'
   ```

5. **Click "Publish"**

✅ Admin đã có quyền truy cập!

---

## Bước 4.3: Seed Sample Jobs (Tùy chọn)

**Tạo 5 jobs mẫu** để test:

```bash
npm run seed
```

**Kết quả**: Thấy 5 jobs trong Firestore:
- Senior Frontend Developer
- Backend Developer (Node.js)
- Business Analyst
- Mobile Developer (React Native)
- DevOps Engineer

**Kiểm tra trên website**:
1. Mở: `https://your-vercel-url.vercel.app`
2. Thấy 5 jobs hiển thị

✅ Data mẫu đã có!

---

# PHẦN 5️⃣: Testing & Verification (5 phút)

## Test 1: Homepage

**Truy cập**: `https://your-vercel-url.vercel.app`

✅ Checklist:
- [ ] Logo và menu hiển thị
- [ ] Thấy danh sách jobs (nếu đã seed)
- [ ] Filter hoạt động (location, job type...)
- [ ] Search bar hoạt động

---

## Test 2: Job Detail

**Click vào 1 job** từ homepage

✅ Checklist:
- [ ] Tiêu đề, description hiển thị đầy đủ
- [ ] Info grid: Location, Job Type, Experience, Salary
- [ ] Position badge và Expertise badge
- [ ] Tags/Skills hiển thị
- [ ] Nút "Ứng tuyển ngay" hiển thị

---

## Test 3: Apply Form

**Click "Ứng tuyển ngay"**

✅ Checklist:
- [ ] Modal mở ra
- [ ] Form có: Họ tên, Email, SĐT, Thư xin việc, Upload CV
- [ ] Upload CV chỉ chấp nhận PDF/DOC/DOCX
- [ ] Submit thành công → Toast "Ứng tuyển thành công!"

**Kiểm tra trong Firebase**:
1. Firestore → Collection `applications`
2. Thấy document mới với thông tin ứng viên
3. Storage → Folder `cvs` → Thấy file CV

---

## Test 4: Admin Login

**Truy cập**: `https://your-vercel-url.vercel.app/admin/login`

✅ Checklist:
- [ ] Trang login hiển thị
- [ ] Nhập email/password từ Bước 4.2
- [ ] Click "Đăng nhập"
- [ ] Redirect về `/admin/dashboard`

---

## Test 5: Admin Dashboard

**Sau khi login**:

✅ Checklist:
- [ ] Sidebar hiển thị menu: Dashboard, Jobs, Applications, Settings
- [ ] Dashboard hiển thị thống kê (số jobs, applications)
- [ ] Card "Thao tác nhanh" có links

---

## Test 6: Create Job

**Click "Đăng Job mới"** hoặc `/admin/jobs/new`

✅ Checklist:
- [ ] Form có tất cả các field
- [ ] Dropdown: Department, Position, Location, Job Type, Expertise (từ Settings)
- [ ] Tags/Skills: Các nút toggle
- [ ] Requirements/Benefits: Add/remove list items
- [ ] Click "Tạo Job" → Toast "Tạo job thành công!"
- [ ] Redirect về `/admin/jobs`
- [ ] Thấy job mới trong danh sách

---

## Test 7: Settings Management

**Click menu "Cấu hình"** hoặc `/admin/settings`

✅ Checklist:
- [ ] 6 categories hiển thị: Departments, Positions, Locations, Job Types, Expertise, Skills
- [ ] Thêm item mới: Nhập text → Enter → Thấy item mới
- [ ] Sửa item: Click icon Edit → Sửa → Save
- [ ] Xóa item: Click icon Delete → Confirm → Item biến mất

---

# PHẦN 6️⃣: Custom Domain (Tùy chọn)

Nếu muốn dùng domain riêng (vd: `careers.innojsc.com`):

## Bước 6.1: Thêm Domain vào Vercel

1. **Vercel Dashboard** → Project → **Settings** → **Domains**

2. **Click "Add"**

3. **Nhập domain**: `careers.innojsc.com`

4. **Vercel sẽ yêu cầu** thêm DNS records

---

## Bước 6.2: Update DNS

**Tùy theo DNS provider** (Cloudflare, GoDaddy, etc.):

**Add CNAME record**:
- Type: `CNAME`
- Name: `careers` (hoặc subdomain bạn chọn)
- Value: `cname.vercel-dns.com`
- TTL: Auto

**Hoặc A record** (nếu root domain):
- Type: `A`
- Name: `@`
- Value: `76.76.21.21` (Vercel IP)

---

## Bước 6.3: Update Environment Variable

1. **Vercel Settings** → **Environment Variables**

2. **Edit `NEXT_PUBLIC_SITE_URL`**:
   - Old: `https://innojsc-recruitment-abc123.vercel.app`
   - New: `https://careers.innojsc.com`

3. **Redeploy**

✅ Website live tại domain riêng!

---

# 🔧 Troubleshooting

## Lỗi: "Firebase app not initialized"

**Nguyên nhân**: Environment variables chưa đúng

**Cách fix**:
1. Vercel Settings → Environment Variables
2. Kiểm tra tất cả biến `NEXT_PUBLIC_FIREBASE_*`
3. Redeploy

---

## Lỗi: "Permission denied" khi tạo job

**Nguyên nhân**: Chưa update Firestore rules với admin UID

**Cách fix**:
1. Lấy UID từ Firebase Console → Authentication → Users
2. Copy UID của admin
3. Firestore → Rules → Thay `YOUR_ADMIN_UID` bằng UID thật
4. Publish

---

## Lỗi: "Failed to upload CV"

**Nguyên nhân**: Storage rules chưa đúng

**Cách fix**:
1. Firebase Console → Storage → Rules
2. Copy rules từ Bước 1.7
3. Publish

---

## Lỗi: "Cannot read settings"

**Nguyên nhân**: Chưa chạy seed-settings

**Cách fix**:
```bash
npm run seed-settings
```

---

## Lỗi: Build failed trên Vercel

**Check logs**:
1. Vercel → Deployments → Click deployment bị lỗi
2. Xem "Build Logs"
3. Tìm dòng màu đỏ

**Thường gặp**:
- TypeScript errors → Fix code, push lại
- Missing env vars → Thêm trong Vercel Settings
- Out of memory → Contact Vercel support

---

# 📊 Monitoring & Maintenance

## Xem Logs

**Vercel (Frontend)**:
- Dashboard → Project → **Runtime Logs**
- Thấy errors từ user

**Firebase (Backend)**:
- Console → Firestore → **Usage** tab
- Console → Storage → **Usage** tab
- Console → Authentication → **Users** tab

---

## Update Code

**Workflow**:
1. Sửa code trên máy local
2. Test: `npm run dev`
3. Commit: `git add . && git commit -m "message"`
4. Push: `git push`
5. **Vercel tự động** detect → build → deploy (2-3 phút)

---

## Backup Dữ Liệu

**Firestore**:
1. Console → Firestore → **Import/Export** tab
2. Export to Cloud Storage bucket
3. Schedule weekly/monthly

**Hoặc dùng Firebase CLI**:
```bash
firebase firestore:export gs://innojsc-recruitment.appspot.com/backups
```

---

# 💰 Chi Phí Dự Kiến

## Free Tier (Đủ cho ~10,000 visits/tháng)

| Service | Free Quota | Giá khi vượt |
|---------|-----------|--------------|
| **Vercel** | 100GB bandwidth, 100GB hours | $20/month Pro |
| **Firestore** | 50k reads, 20k writes/day | $0.06/100k reads |
| **Storage** | 5GB, 1GB download/day | $0.026/GB |
| **Authentication** | Unlimited | Free |

**Kết luận**: Hoàn toàn **MIỄN PHÍ** cho startup/SME!

---

# ✅ Checklist Hoàn Thành

Sau khi làm xong, check lại:

- [ ] Firebase project đã tạo
- [ ] Firestore, Storage, Auth đã enable
- [ ] Firestore rules đã update với admin UID
- [ ] Storage rules đã publish
- [ ] Code đã clone về máy
- [ ] Dependencies đã cài (`npm install`)
- [ ] `.env.local` đã tạo với Firebase config
- [ ] Vercel project đã deploy
- [ ] Environment variables đã thêm trên Vercel
- [ ] `NEXT_PUBLIC_SITE_URL` đã update
- [ ] Settings đã seed (`npm run seed-settings`)
- [ ] Admin user đã tạo (`npm run create-admin`)
- [ ] Admin UID đã update trong Firestore rules
- [ ] Website live và hoạt động
- [ ] Admin login thành công
- [ ] Tạo job thử nghiệm thành công
- [ ] Apply job thử nghiệm thành công
- [ ] Settings management hoạt động

---

# 📞 Support

**Nếu gặp vấn đề**:

1. **Check lại từng bước** trong guide này
2. **Xem Troubleshooting** section
3. **Google error message** (thường có answer trên Stack Overflow)
4. **Liên hệ**: ahr@innojsc.com

---

# 🎉 Chúc Mừng!

Website InnoJSC Recruitment đã LIVE! 🚀

**Next Steps**:
1. Share URL với team để test
2. Tạo admin users cho các HR khác
3. Đăng jobs thật
4. Monitor usage trên Vercel & Firebase
5. Consider custom domain (careers.innojsc.com)

**Happy Hiring! 🎯**
