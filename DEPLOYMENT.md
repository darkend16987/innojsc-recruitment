# 🚀 Deployment Guide - InnoJSC Recruitment

## ⚠️ QUAN TRỌNG: Chọn Strategy Deployment

Vì chúng ta đã **REMOVE** `output: 'export'` từ `next.config.js` để hỗ trợ SSR, bạn có **2 options**:

---

## 📌 OPTION 1: Deploy lên Vercel (RECOMMENDED ⭐)

**Ưu điểm:**
- ✅ Native support Next.js SSR
- ✅ Setup cực kỳ đơn giản
- ✅ Auto CI/CD khi push code
- ✅ Free tier rất hào phóng
- ✅ CDN toàn cầu

**Nhược điểm:**
- Firebase Functions phải deploy riêng

### Bước 1: Deploy Frontend lên Vercel

1. **Push code lên GitHub** (đã làm ✅)

2. **Kết nối Vercel:**
   - Truy cập [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Chọn repository `innojsc-recruitment`
   - Vercel sẽ tự detect Next.js

3. **Thêm Environment Variables:**
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=xxx
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
   NEXT_PUBLIC_FIREBASE_APP_ID=xxx
   ```

4. **Deploy!** 🎉
   - Click "Deploy"
   - Xong! Website sẽ live trong vài phút

### Bước 2: Deploy Firebase Functions (Email Service)

```bash
# 1. Cài Firebase CLI (nếu chưa có)
npm install -g firebase-tools

# 2. Login
firebase login

# 3. Cài dependencies cho Functions
cd functions
npm install

# 4. Setup email config
firebase functions:config:set \
  email.user="noreply@innojsc.com" \
  email.password="your_app_password" \
  smtp.host="mail90162.maychuemail.com" \
  smtp.port="465"

# 5. Deploy Functions
firebase deploy --only functions

# 6. Quay lại root directory
cd ..
```

**✅ XONG!**
- Frontend: `https://your-project.vercel.app`
- Functions: Tự động chạy khi có application mới

---

## 📌 OPTION 2: Deploy Full Stack lên Firebase

**Ưu điểm:**
- ✅ All-in-one trên Firebase
- ✅ Functions và Hosting cùng project

**Nhược điểm:**
- ⚠️ Phức tạp hơn, cần setup thêm
- ⚠️ Next.js SSR trên Firebase Hosting cần Cloud Functions
- ⚠️ Tốn nhiều quota hơn

### Cách 1: Static Export (Đơn giản nhưng mất SSR)

**Nếu bạn OK với việc mất SSR**, restore static export:

1. **Update `next.config.js`:**
   ```javascript
   const nextConfig = {
     output: 'export',  // Thêm lại dòng này
     images: {
       unoptimized: true,
     },
     trailingSlash: true,
   };
   ```

2. **Build:**
   ```bash
   npm run build
   # Next.js sẽ tạo thư mục "out"
   ```

3. **Deploy:**
   ```bash
   # Deploy Functions + Hosting
   firebase deploy
   ```

### Cách 2: Next.js với Firebase Hosting + Functions (Phức tạp)

Cần setup Next.js server rendering với Cloud Functions. Hướng dẫn:
- https://firebase.google.com/docs/hosting/frameworks/nextjs

**KHÔNG RECOMMEND** vì phức tạp và tốn nhiều resources.

---

## 🎯 RECOMMENDATION

### ✅ Chọn OPTION 1 (Vercel + Firebase Functions)

**Lý do:**
1. Đơn giản, nhanh, ít lỗi
2. Tận dụng SSR của Next.js
3. Vercel chuyên cho Next.js
4. Firebase vẫn chạy Functions cho email
5. Free tier đủ dùng

### 📝 Tóm tắt bước cần làm:

**Một lần duy nhất:**
1. ✅ Deploy frontend lên Vercel (5 phút)
2. ✅ Setup email config cho Firebase Functions
3. ✅ Deploy functions lên Firebase

**Mỗi lần update code:**
1. Push code lên GitHub
2. Vercel tự động deploy frontend
3. Nếu sửa Functions: `firebase deploy --only functions`

---

## 🔧 Troubleshooting

### Lỗi: "Firebase app not initialized"
- Kiểm tra environment variables trên Vercel
- Rebuild project

### Lỗi: "Functions not deployed"
```bash
firebase deploy --only functions
```

### Lỗi: Email không gửi được
1. Check Functions logs:
   ```bash
   firebase functions:log
   ```
2. Verify email config:
   ```bash
   firebase functions:config:get
   ```

---

## 📊 Monitoring

### Frontend (Vercel)
- Dashboard: https://vercel.com/dashboard
- Logs: Vercel Dashboard > Your Project > Deployments

### Backend (Firebase)
- Console: https://console.firebase.google.com
- Functions logs: Firebase Console > Functions > Logs
- Firestore data: Firebase Console > Firestore Database

---

## 💰 Chi phí dự kiến

### Free Tier:
- **Vercel**: 100GB bandwidth/tháng (đủ cho ~10k visits)
- **Firebase Functions**: 2M invocations/tháng
- **Firestore**: 50k reads, 20k writes/ngày
- **Storage**: 5GB

**Kết luận:** Hoàn toàn FREE cho traffic nhỏ-trung bình!

---

## 📞 Support

Nếu gặp vấn đề, liên hệ: ahr@innojsc.com
