/** @type {import('next').NextConfig} */
const nextConfig = {
  // Bắt buộc để Next.js xuất ra các file tĩnh (static HTML) vào thư mục 'out'
  output: 'export', 
  
  // Bắt buộc khi dùng 'output: export' để vô hiệu hóa tối ưu hóa ảnh của Next.js
  images: {
    unoptimized: true,
  },
  
  // Thêm dấu / ở cuối đường dẫn (Ví dụ: /jobs/j1/) - tốt hơn cho Hosting
  trailingSlash: true, 
};

module.exports = nextConfig;