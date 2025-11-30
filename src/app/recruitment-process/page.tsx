'use client';

import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FileText, Search, MessageCircle, CheckCircle, UserPlus } from 'lucide-react';

const PROCESS_STEPS = [
  {
    icon: FileText,
    title: 'Nộp hồ sơ',
    description: 'Ứng viên gửi CV và thông tin liên hệ qua website Career, email tuyển dụng: ahr@innojsc.com hoặc các kênh tuyển dụng của INNO.',
    color: 'blue'
  },
  {
    icon: Search,
    title: 'Sàng lọc hồ sơ',
    description: 'Bộ phận Nhân sự xem xét CV, đánh giá năng lực, kinh nghiệm và sự phù hợp với vị trí. Những hồ sơ phù hợp sẽ được mời bước tiếp theo.',
    color: 'purple'
  },
  {
    icon: MessageCircle,
    title: 'Phỏng vấn',
    description: 'Ứng viên sẽ tham gia một vòng phỏng vấn tổng hợp với Nhân sự, lãnh đạo phụ trách và Trưởng bộ môn, đánh giá năng lực, kỹ năng chuyên môn, sự phù hợp văn hóa và tiềm năng phát triển lâu dài.',
    color: 'green'
  },
  {
    icon: CheckCircle,
    title: 'Kiểm tra năng lực/thử thách (nếu có)',
    description: 'Một số vị trí sẽ yêu cầu bài tập chuyên môn hoặc tình huống thực tế để đánh giá khả năng thực hành của ứng viên.',
    color: 'orange'
  },
  {
    icon: UserPlus,
    title: 'Nhận việc & onboarding',
    description: 'Ứng viên đạt yêu cầu sẽ nhận thư mời làm việc và được hướng dẫn onboarding, nhanh chóng hòa nhập với môi trường INNO và các dự án.',
    color: 'red'
  }
];

export default function RecruitmentProcessPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-red-700 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Quy trình tuyển dụng tại INNO
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Chúng tôi muốn đảm bảo mỗi ứng viên đều có trải nghiệm minh bạch, chuyên nghiệp và thân thiện khi ứng tuyển tại INNO
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <section className="mb-20">
          {/* Giảm p-8 xuống p-4 trên mobile */}
          <div className="bg-white rounded-lg shadow-md p-4 md:p-8 border border-gray-200">
            <div className="relative aspect-video">
                <Image
                  src="/images/recruitment/timeline/Quytrinh.webp"
                  alt="Quy trình tuyển dụng INNO"
                  fill
                  className="object-contain rounded-lg"
                  sizes="(max-width: 768px) 100vw, 1200px"
                />
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Các bước trong quy trình
          </h2>

          <div className="space-y-8">
            {PROCESS_STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Connecting Line */}
                  {index < PROCESS_STEPS.length - 1 && (
                    <div className="absolute left-8 top-20 w-0.5 h-full bg-gray-200 -z-10"></div>
                  )}

                  <div className="flex gap-6 items-start">
                    {/* Step Number & Icon */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white shadow-lg">
                          <Icon className="w-8 h-8" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-primary rounded-full flex items-center justify-center font-bold text-primary">
                          {index + 1}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-white rounded-lg shadow-md p-6 border border-gray-200">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Tips for Applicants */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Lưu ý dành cho ứng viên
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Chuẩn bị hồ sơ
              </h3>
              <p className="text-blue-800">
                CV rõ ràng, portfolio (nếu có), bằng cấp/chứng chỉ liên quan
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Thời gian phản hồi
              </h3>
              <p className="text-green-800">
                Chúng tôi sẽ liên hệ trong vòng 7–10 ngày làm việc
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
                Phỏng vấn online
              </h3>
              <p className="text-purple-800">
                Có thể tổ chức qua Zoom hoặc Google Meet trong một số trường hợp
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h3 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Giờ làm việc
              </h3>
              <p className="text-orange-800">
                Thứ 2-6 + 2 buổi sáng Thứ 7 cách tuần, 8:30-18:00 (linh hoạt cho thực tập sinh)
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-20">
          <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Liên hệ tuyển dụng
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                <a href="mailto:ahr@innojsc.com" className="text-primary hover:underline">
                  ahr@innojsc.com
                </a>
              </div>

              <div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Hotline</h3>
                <p className="text-gray-700">0243 2121 776</p>
              </div>

              <div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Website</h3>
                <a href="https://innojsc.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  innojsc.com
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-gradient-to-r from-primary to-red-700 text-white rounded-2xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Sẵn sàng ứng tuyển?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Khám phá các vị trí tuyển dụng đang mở và gửi hồ sơ của bạn ngay hôm nay
          </p>
          <a
            href="/"
            className="inline-block px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Xem vị trí tuyển dụng
          </a>
        </section>
      </div>

      <Footer />
    </div>
  );
}
