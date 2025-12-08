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
const LIFE_AT_INNO_IMAGES = Array.from({ length: 8 }, (_, i) => `/images/recruitment/life-at-inno/${i + 1}.webp`);

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
              INNO Academy phối hợp chặt chẽ với Ban lãnh đạo, các phòng ban và đội ngũ nhân sự để thiết kế những chương trình đào tạo hiệu quả. Chúng tôi mong muốn xây dựng một văn hóa học tập, nơi mọi thành viên đều có cơ hội phát triển. Vì vậy, INNO triển khai và duy trì các khóa đào tạo về <strong className="text-primary">kỹ năng chuyên môn, quản lý dự án, BIM và lãnh đạo</strong>, được thiết kế phù hợp với từng nhóm nhân viên.
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

      {/* SECTION 2: Slider Đào tạo - FULL WIDTH */}
      <section className="bg-gray-900 py-16">
        <div className="container mx-auto px-4 mb-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">
            Hoạt động đào tạo và văn hóa học tập
          </h3>
          <p className="text-gray-400">Hình ảnh thực tế từ các lớp học và workshop tại INNO</p>
        </div>

        {/* Slider tràn viền */}
        <div className="w-full">
          <ImageSlider
            images={TRAINING_IMAGES}
            alt="Hoạt động đào tạo tại INNO"
            height={600}
          />
        </div>
      </section>

      {/* SECTION 3: Cuộc sống tại INNO - FULL WIDTH */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="container mx-auto px-4 mb-10 text-center">
          <div className="flex items-center justify-center mb-4">
            <Users className="w-10 h-10 text-primary mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Cuộc sống tại INNO</h2>
          </div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Life at INNO - Nơi làm việc chuyên nghiệp, môi trường thân thiện, nơi cân bằng giữa công việc và cuộc sống.
          </p>
        </div>

        {/* Slider tràn viền */}
        <div className="w-full">
          <ImageSlider
            images={LIFE_AT_INNO_IMAGES}
            alt="Cuộc sống tại INNO"
            height={600}
          />
        </div>
      </section>

      {/* SECTION 4: Những lợi ích (Trong Container) */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Những lợi ích khi làm việc tại INNO
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {/* Benefit 1 */}
            <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Dự án quy mô lớn</h3>
              <p className="text-gray-600 leading-relaxed">
                Tham gia các dự án biểu tượng quốc gia như Landmark 81, Vinhomes Ocean Park... cơ hội ghi dấu ấn trong sự nghiệp.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Đào tạo chuyên sâu</h3>
              <p className="text-gray-600 leading-relaxed">
                Tiếp cận công nghệ mới nhất (BIM), phương pháp quản lý tiên tiến thông qua INNO Academy.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Môi trường chuyên nghiệp</h3>
              <p className="text-gray-600 leading-relaxed">
                Làm việc cùng đội ngũ chuyên gia hàng đầu, văn hóa cởi mở, tôn trọng và hỗ trợ lẫn nhau.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lộ trình thăng tiến</h3>
              <p className="text-gray-600 leading-relaxed">
                Lộ trình công danh (Career Path) rõ ràng từ thực tập sinh đến các vị trí quản lý cấp cao.
              </p>
            </div>

            {/* Benefit 5 */}
            <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Thu nhập cạnh tranh</h3>
              <p className="text-gray-600 leading-relaxed">
                Lương thưởng hấp dẫn, đánh giá tăng lương định kỳ, thưởng dự án và đầy đủ phúc lợi xã hội.
              </p>
            </div>

            {/* Benefit 6 */}
            <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Văn hóa tích cực</h3>
              <p className="text-gray-600 leading-relaxed">
                Cân bằng cuộc sống với các hoạt động Teambuilding, du lịch, thể thao và các CLB sở thích.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-primary to-red-800 text-white rounded-3xl p-12 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Bạn đã sẵn sàng gia nhập đội ngũ INNO?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Khám phá các vị trí tuyển dụng đang mở và bắt đầu hành trình phát triển sự nghiệp cùng chúng tôi.
            </p>
            <Link
              href="/"
              className="inline-block px-10 py-4 bg-white text-primary font-bold text-lg rounded-full hover:bg-gray-100 transition-all shadow-lg hover:scale-105"
            >
              Xem vị trí tuyển dụng
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}