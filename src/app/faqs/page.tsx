'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    question: 'Tôi có thể nộp hồ sơ ở đâu?',
    answer: 'Bạn có thể nộp CV và thông tin liên hệ trực tiếp trên website Career của INNO, hoặc gửi qua email tuyển dụng chính thức: ahr@innojsc.com'
  },
  {
    question: 'Một bộ hồ sơ ứng tuyển bao gồm những gì nhỉ?',
    answer: 'Hồ sơ ứng tuyển bao gồm:\n1. CV (Curriculum Vitae) của bạn\n2. Portfolio và các bằng cấp/chứng chỉ liên quan (nếu có)'
  },
  {
    question: 'Thời gian phản hồi sau khi nộp hồ sơ là bao lâu?',
    answer: 'Chúng tôi sẽ liên hệ trong vòng 7–10 ngày làm việc để thông báo kết quả. Nếu hồ sơ phù hợp, bạn sẽ được mời tham gia phỏng vấn; nếu chưa phù hợp, chúng tôi vẫn gửi thông báo kết quả trượt để bạn nắm rõ.'
  },
  {
    question: 'Tôi sẽ nhận được gì nếu được tuyển dụng?',
    answer: 'Bạn sẽ nhận thư mời làm việc chính thức và được hướng dẫn onboarding, giúp nhanh chóng hòa nhập với văn hóa, dự án và quy trình làm việc tại INNO.'
  },
  {
    question: 'INNO có chương trình thực tập sinh không?',
    answer: 'Có. Chúng tôi chào đón sinh viên, thực tập sinh tham gia các dự án thực tế, học hỏi từ các chuyên gia và tích lũy kinh nghiệm quý giá trong ngành xây dựng – thiết kế.'
  },
  {
    question: 'Tôi có thể ứng tuyển nếu chưa có kinh nghiệm?',
    answer: 'Chắc chắn! INNO chào đón ứng viên mới ra trường, thực tập sinh và các bạn trẻ tiềm năng. Chúng tôi có chương trình đào tạo, mentoring và trải nghiệm dự án thực tế để bạn phát triển năng lực.'
  },
  {
    question: 'Phỏng vấn có thể thực hiện online không?',
    answer: 'Trong một số trường hợp, phỏng vấn có thể được tổ chức trực tuyến qua Zoom hoặc Google Meet.'
  },
  {
    question: 'Thời gian làm việc tại INNO như thế nào?',
    answer: '- Nhân viên chính thức: từ Thứ 2 – Thứ 6, và 2 buổi sáng Thứ 7 cách tuần, từ 8:30 – 18:00.\n- Thực tập sinh / sinh viên: giờ giấc linh hoạt theo lịch đăng ký với công ty, để phù hợp với việc học và dự án thực tập.'
  },
  {
    question: 'Tôi có được mentoring khi thực tập không?',
    answer: 'Có. Mỗi thực tập sinh sẽ được hướng dẫn bởi trưởng bộ môn, giúp phát triển năng lực và tích lũy kinh nghiệm thực tế.'
  },
  {
    question: 'Tôi có thể trở thành nhân sự chính thức sau khi thực tập không?',
    answer: 'Chắc chắn. INNO ưu tiên tuyển dụng những thực tập sinh xuất sắc, dựa trên năng lực, thái độ và khả năng đóng góp vào dự án.'
  },
  {
    question: 'INNO có các hoạt động gắn kết nhân viên không?',
    answer: 'Có. Chúng tôi tổ chức teambuilding, du lịch hè, sự kiện các dịp lễ tết và các CLB nội bộ, giúp nhân viên kết nối, học hỏi và phát triển trong môi trường thân thiện.'
  }
];

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-red-700 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <HelpCircle className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Câu hỏi thường gặp
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Thắc mắc thường gặp dành cho ứng viên
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">

          {/* FAQs Accordion */}
          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
              >
                {/* Question */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                      <span className="text-primary font-bold text-sm">{index + 1}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 text-primary flex-shrink-0 transition-transform ${
                      openIndex === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Answer */}
                {openIndex === index && (
                  <div className="px-6 pb-5 pl-18">
                    <div className="border-l-2 border-primary/20 pl-6 py-2">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Still Have Questions */}
          <div className="mt-16 text-center bg-white rounded-lg shadow-md p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Nếu bạn vẫn còn thắc mắc?
            </h2>
            <p className="text-gray-600 mb-6">
              Đừng ngại liên hệ với chúng tôi, chúng tôi luôn sẵn sàng hỗ trợ bạn
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:ahr@innojsc.com"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Gửi email cho chúng tôi
              </a>
              <a
                href="tel:02432121776"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary font-semibold rounded-lg border-2 border-primary hover:bg-primary/5 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Gọi hotline: 0243 2121 776
              </a>
            </div>
          </div>

          {/* CTA to Jobs */}
          <div className="mt-12 text-center bg-gradient-to-r from-primary to-red-700 text-white rounded-2xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Bạn đã sẵn sàng ứng tuyển chưa?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Hãy cùng khám phá các vị trí tuyển dụng đang mở tại INNO
            </p>
            <a
              href="/"
              className="inline-block px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Xem vị trí tuyển dụng
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
