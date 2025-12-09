'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageSlider from '@/components/ImageSlider';
import { GraduationCap, Users, Award } from 'lucide-react';

// Danh sách ảnh lộ trình đào tạo sinh viên
const STUDENT_TRAINING_IMAGES = Array.from({ length: 8 }, (_, i) => `/images/recruitment/student-training/${i + 1}.webp`);

export default function InternshipOpportunityPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="relative py-24 sm:py-32 flex items-center justify-center min-h-[400px]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/recruitment/hero/internship-hero.webp"
            alt="Cơ hội thực tập tại INNO"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay màu đen mờ */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Nội dung text */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Cơ hội thực tập tại INNO
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Nơi sinh viên trở thành chuyên gia - Khởi đầu sự nghiệp vững chắc
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Introduction Section */}
        <section className="mb-20">
          <div className="flex items-center justify-center mb-8">
            <GraduationCap className="w-12 h-12 text-primary mr-4" />
            <h2 className="text-3xl font-bold text-gray-900">Chương trình thực tập tại INNO</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <p className="text-gray-700 leading-relaxed text-lg text-center mb-8">
              Hàng năm, INNO luôn có chương trình đào tạo - học việc - thử việc dành cho sinh viên chuyên ngành các trường đại học. Với tính thực chiến cao cùng với sự hỗ trợ của các chuyên gia đầu ngành, chương trình đã chứng minh có thể giúp các bạn sinh viên học hỏi kỹ năng và làm quen với môi trường làm việc chuyên nghiệp.
            </p>
          </div>

          {/* Key Highlights */}
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Dự án thực tế</h3>
              <p className="text-gray-600">
                Tham gia trực tiếp vào các dự án lớn, học hỏi từ thực tế
              </p>
            </div>

            <div className="text-center bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Mentor chuyên nghiệp</h3>
              <p className="text-gray-600">
                Được hướng dẫn bởi các chuyên gia đầu ngành
              </p>
            </div>

            <div className="text-center bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Cơ hội chính thức hóa</h3>
              <p className="text-gray-600">
                Thực tập sinh xuất sắc sẽ được xem xét tuyển dụng
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* FULL WIDTH SLIDER SECTION - Lộ trình đào tạo */}
      <section className="mb-20">
        <div className="text-center mb-8 container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Lộ trình đào tạo dành cho sinh viên
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Chương trình được thiết kế bài bản, giúp sinh viên phát triển toàn diện từ kiến thức chuyên môn đến kỹ năng làm việc
          </p>
        </div>

        <div className="w-full">
          <ImageSlider
            images={STUDENT_TRAINING_IMAGES}
            alt="Lộ trình đào tạo dành cho sinh viên tại INNO"
            height={600}
          />
        </div>
      </section>

      {/* Back to Container for CTA */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Benefits Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Quyền lợi thực tập sinh
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Hỗ trợ tài chính</h3>
                  <p className="text-gray-600 text-sm">Trợ cấp thực tập hàng tháng</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Chứng nhận</h3>
                  <p className="text-gray-600 text-sm">Giấy chứng nhận thực tập chính thức</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Đào tạo chuyên sâu</h3>
                  <p className="text-gray-600 text-sm">Tham gia các khóa đào tạo nội bộ</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Môi trường năng động</h3>
                  <p className="text-gray-600 text-sm">Làm việc cùng team trẻ, sáng tạo</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Văn phòng hiện đại</h3>
                  <p className="text-gray-600 text-sm">Trang thiết bị và cơ sở vật chất tốt</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Hoạt động ngoại khóa</h3>
                  <p className="text-gray-600 text-sm">Team building, sự kiện, câu lạc bộ</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-gradient-to-r from-primary to-red-700 text-white rounded-2xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Sẵn sàng bắt đầu hành trình thực tập?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Tham gia chương trình thực tập tại INNO và khởi đầu sự nghiệp vững chắc
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Xem vị trí thực tập
          </Link>
        </section>
      </div>

      <Footer />
    </div>
  );
}
