'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { TrendingUp, Users, BookOpen, Award } from 'lucide-react';

export default function CareerPathPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="relative py-24 sm:py-32 flex items-center justify-center min-h-[400px]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/recruitment/hero/career-path-hero.webp"
            alt="Lộ trình phát triển tại INNO"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay màu đen mờ giúp text trắng dễ đọc hơn */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Nội dung text đặt lên trên (z-10) */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Lộ trình phát triển tại INNO
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Từ thực tập sinh đến chuyên gia - Hành trình phát triển bản thân cùng INNO
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Career Path Diagram - UPDATED */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Lộ trình nghề nghiệp
          </h2>
          {/* Ảnh hiển thị full, bo góc, có bóng, bỏ khung trắng - Style giống trang About */}
          <div className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-white">
            <Image
              src="/images/recruitment/career-path/career.webp"
              alt="Sơ đồ lộ trình phát triển nghề nghiệp tại INNO"
              width={1920}
              height={1080}
              className="w-full h-auto object-contain"
            />
          </div>
        </section>

        {/* Training Opportunities */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Cơ hội đào tạo tại INNO
          </h2>

          {/* Training Programs */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Program 1 */}
            <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-primary">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Đào tạo hòa nhập & gắn kết
                  </h3>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Khi bước chân vào INNO, mỗi nhân viên mới sẽ luôn được chào đón nồng nhiệt và hướng dẫn từng bước để làm quen với văn hóa công ty, các phòng ban và quy trình dự án. Chương trình hội nhập giúp bạn tích hợp nhanh, kết nối đồng nghiệp và phát huy năng lực tối đa ngay từ những ngày đầu tiên.
              </p>
            </div>

            {/* Program 2 */}
            <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-primary">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Đào tạo học tập & phát triển
                  </h3>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                INNO tổ chức các chương trình đào tạo về chuyên môn, kỹ năng mềm, quản lý dự án và BIM, được thiết kế riêng cho từng nhóm nhân viên. Mục tiêu là giúp bạn nâng cao năng lực, tự tin xử lý dự án thực tế và mở rộng cơ hội phát triển nghề nghiệp.
              </p>
            </div>

            {/* Program 3 */}
            <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-primary">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Đào tạo và phát triển đội ngũ
                  </h3>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Chúng tôi tin vào việc phát triển nhân sự tiềm năng, chuẩn bị đội ngũ kế thừa cho các vị trí chủ chốt. Nhân viên sẽ được hướng dẫn, mentoring và thử thách để có thể đảm nhận vai trò lãnh đạo trong tương lai và gắn bó lâu dài với công ty.
              </p>
            </div>

            {/* Program 4 */}
            <div className="bg-white rounded-lg shadow-md p-8 border-l-4 border-primary">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Ươm mầm nhân tài
                  </h3>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Với mục tiêu nuôi dưỡng và phát triển nhân tài, INNO mang đến những chương trình thực tập và trải nghiệm dành cho sinh viên, thực tập sinh. Tại INNO, bạn sẽ có cơ hội tham gia trực tiếp vào các dự án thực tế, quy mô lớn, từ đó khám phá sở thích nghề nghiệp, trau dồi kỹ năng chuyên môn và tích lũy kinh nghiệm thực tiễn trong ngành xây dựng – thiết kế.
              </p>
              <a
                href="#"
                className="inline-flex items-center text-primary hover:underline font-medium"
              >
                Xem chương trình sinh viên →
              </a>
            </div>
          </div>

          {/* Training Images */}
          <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              Các buổi đào tạo nội bộ, lớp học Tiếng Anh...
            </h3>
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">Image slider - Training sessions</p>
                <p className="text-sm text-gray-500 mt-2">
                  Upload ảnh vào: /public/images/recruitment/training/
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Highlights */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Điểm nổi bật trong lộ trình phát triển
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Lộ trình rõ ràng</h3>
              <p className="text-gray-600">
                Từ Thực tập sinh → Nhân viên → Chuyên viên → Trưởng nhóm → Trưởng phòng
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Đào tạo liên tục</h3>
              <p className="text-gray-600">
                Chương trình INNO Academy với các khóa học chuyên môn và kỹ năng mềm
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Mentoring</h3>
              <p className="text-gray-600">
                Được hướng dẫn bởi các chuyên gia hàng đầu trong từng lĩnh vực
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-gradient-to-r from-primary to-red-700 text-white rounded-2xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Bắt đầu hành trình phát triển của bạn
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Tham gia INNO và xây dựng sự nghiệp vững chắc trong lĩnh vực tư vấn thiết kế
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Khám phá cơ hội nghề nghiệp
          </Link>
        </section>
      </div>

      <Footer />
    </div>
  );
}