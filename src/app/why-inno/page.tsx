'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageSlider from '@/components/ImageSlider';
import { BookOpen, Users, Trophy, TrendingUp, Award } from 'lucide-react';

// Danh sách ảnh đào tạo
const TRAINING_IMAGES = Array.from({ length: 8 }, (_, i) => `/images/recruitment/training/${i + 1}.webp`);

// Danh sách ảnh cuộc sống tại INNO
const LIFE_AT_INNO_IMAGES = Array.from({ length: 7 }, (_, i) => `/images/recruitment/life-at-inno/${i + 1}.webp`);

export default function WhyInnoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section - Full Width */}
      <div className="relative py-24 sm:py-32 flex items-center justify-center min-h-[400px]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/recruitment/hero/why-inno-hero.webp"
            alt="Vì sao chọn INNO"
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
            Vì sao nên chọn INNO?
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            INNO là nơi bạn vừa được thử thách với những dự án quy mô lớn, vừa được hỗ trợ, đào tạo và phát triển bản thân trong một tập thể thân thiện, nhiệt huyết.
          </p>
        </div>
      </div>

      {/* SECTION 1: Giới thiệu Đào tạo & Phát triển (Trong Container) */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center mb-10 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Đào tạo và phát triển</h2>
            <div className="w-20 h-1 bg-primary rounded-full mt-4"></div>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <p className="text-gray-700 leading-relaxed text-lg text-center">
              INNO Academy phối hợp chặt chẽ với Ban lãnh đạo, các phòng ban và đội ngũ nhân sự để thiết kế những chương trình đào tạo hiệu quả. Chúng tôi mong muốn xây dựng một văn hóa học tập, nơi mọi thành viên đều có cơ hội phát triển. Vì vậy, INNO triển khai và duy trì các khóa đào tạo về <strong className="text-primary">kỹ năng chuyên môn, quản lý dự án, BIM và lãnh đạo</strong>, được thiết kế phù hợp với từng nhóm nhân viên, nhằm nâng cao năng lực và đồng hành cùng sự nghiệp của mỗi cá nhân.
            </p>
          </div>

          {/* Training Programs Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Program 1 */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100 group">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Đào tạo hòa nhập & gắn kết
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Chương trình hội nhập giúp bạn tích hợp nhanh, kết nối đồng nghiệp và phát huy năng lực tối đa ngay từ những ngày đầu tiên.
              </p>
            </div>

            {/* Program 2 */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100 group">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Đào tạo học tập & phát triển
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Các chương trình đào tạo về chuyên môn, kỹ năng mềm, quản lý dự án và BIM giúp bạn nâng cao năng lực và tự tin xử lý dự án thực tế.
              </p>
            </div>

            {/* Program 3 */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100 group">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Đào tạo và phát triển đội ngũ
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Hướng dẫn, mentoring và thử thách để nhân viên tiềm năng có thể đảm nhận vai trò lãnh đạo trong tương lai.
              </p>
            </div>

            {/* Program 4 */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-100 group">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Ươm mầm nhân tài
                  </h3>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Chương trình thực tập và trải nghiệm dành cho sinh viên, tạo cơ hội tham gia trực tiếp vào các dự án thực tế quy mô lớn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FULL WIDTH SLIDER SECTION - Hoạt động đào tạo */}
      <section className="mb-20">
        <div className="text-center mb-8 container mx-auto px-4">
          <h3 className="text-xl font-semibold text-gray-900">
            Hoạt động đào tạo và văn hóa học tập
          </h3>
        </div>

        <div className="w-full">
          <ImageSlider
            images={TRAINING_IMAGES}
            alt="Hoạt động đào tạo tại INNO"
            height={700}
          />
        </div>
      </section>

      {/* Life at INNO Section */}
      <section className="mb-20">
        <div className="flex items-center justify-center mb-8 container mx-auto px-4">
          <Users className="w-12 h-12 text-primary mr-4" />
          <h2 className="text-3xl font-bold text-gray-900">Cuộc sống tại INNO</h2>
        </div>

        <p className="text-center text-gray-600 text-lg mb-12 max-w-3xl mx-auto container px-4">
          Life at INNO - Nơi làm việc chuyên nghiệp, môi trường thân thiện
        </p>

        {/* Life at INNO Images Slider */}
        <div className="w-full">
          <ImageSlider
            images={LIFE_AT_INNO_IMAGES}
            alt="Cuộc sống tại INNO"
            height={700}
          />
        </div>
      </section>

      {/* Back to Container for remaining content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Why Join Section - Key Benefits */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Những lợi ích khi làm việc tại INNO
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Dự án quy mô lớn</h3>
              <p className="text-gray-600 leading-relaxed">
                Tham gia các dự án biểu tượng quốc gia như Landmark 81, Vinhomes Ocean Park, các dự án của Vingroup, Sungroup...
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Đào tạo chuyên sâu</h3>
              <p className="text-gray-600 leading-relaxed">
                Chương trình đào tạo INNO Academy với các khóa học về BIM, quản lý dự án, kỹ năng mềm và chuyên môn.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Môi trường chuyên nghiệp</h3>
              <p className="text-gray-600 leading-relaxed">
                Làm việc cùng đội ngũ chuyên gia hàng đầu trong lĩnh vực tư vấn thiết kế, kiến trúc và xây dựng.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Lộ trình thăng tiến rõ ràng</h3>
              <p className="text-gray-600 leading-relaxed">
                Cơ hội phát triển nghề nghiệp với lộ trình từ thực tập sinh đến chuyên gia, lãnh đạo phòng ban.
              </p>
            </div>

            {/* Benefit 5 */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Thu nhập cạnh tranh</h3>
              <p className="text-gray-600 leading-relaxed">
                Mức lương thỏa đáng, thưởng theo hiệu quả công việc, đầy đủ các chế độ bảo hiểm và phúc lợi.
              </p>
            </div>

            {/* Benefit 6 */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Văn hóa doanh nghiệp tích cực</h3>
              <p className="text-gray-600 leading-relaxed">
                Teambuilding, du lịch hè, các sự kiện văn hóa, thể thao và các CLB nội bộ sôi động.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-primary to-red-700 text-white rounded-2xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Bạn đã sẵn sàng gia nhập đội ngũ INNO?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Khám phá các vị trí tuyển dụng đang mở và bắt đầu hành trình phát triển sự nghiệp cùng chúng tôi
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Xem vị trí tuyển dụng
          </Link>
        </section>
      </div>

      <Footer />
    </div>
  );
}