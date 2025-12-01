import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Liên hệ - InnoJSC Careers',
  description: 'Liên hệ với đội ngũ tuyển dụng InnoJSC. Chúng tôi sẵn sàng hỗ trợ bạn với mọi thắc mắc về cơ hội nghề nghiệp.',
};

const CONTACT_INFO = {
  email: 'ahr@innojsc.com',
  hotline: '0243 2121 776',
  website: 'https://innojsc.com',
  addresses: [
    {
      name: 'Văn phòng Hà Nội',
      detail: '39 Thượng Thụy, Phú Thượng',
      mapUrl: 'https://maps.google.com/?q=39+Thượng+Thụy,+Phú+Thượng,+Hà+Nội',
    },
    {
      name: 'Văn phòng TP.HCM',
      detail: 'A01.03, Khu căn hộ Hoàng Anh River View, 37 Nguyễn Văn Hưởng, phường Thảo Điền',
      mapUrl: 'https://maps.google.com/?q=37+Nguyễn+Văn+Hưởng,+Thảo+Điền,+Thủ+Đức',
    },
  ],
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary to-red-700 text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Liên hệ với chúng tôi</h1>
            <p className="text-xl text-red-100 max-w-2xl mx-auto">
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
            </p>
          </div>
        </section>

        {/* Contact Information & Form */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Thông tin liên hệ
              </h2>

              {/* Email Card */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="ml-4 flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600 mb-2">
                      Gửi email cho chúng tôi bất cứ lúc nào
                    </p>
                    <a
                      href={`mailto:${CONTACT_INFO.email}`}
                      className="text-primary hover:text-primary/80 font-medium"
                    >
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="ml-4 flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Hotline</h3>
                    <p className="text-gray-600 mb-2">Thứ 2 - Thứ 6, 9:00 - 18:00</p>
                    <a
                      href={`tel:${CONTACT_INFO.hotline}`}
                      className="text-green-600 hover:text-green-700 font-medium"
                    >
                      {CONTACT_INFO.hotline}
                    </a>
                  </div>
                </div>
              </div>

              {/* Address Cards */}
              {CONTACT_INFO.addresses.map((addr, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-purple-600" />
                      </div>
                    </div>
                    <div className="ml-4 flex-grow">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {addr.name}
                      </h3>
                      <p className="text-gray-600 mb-3">{addr.detail}</p>
                      <a
                        href={addr.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                      >
                        Xem trên bản đồ →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Gửi tin nhắn</h2>
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <form
                  action={`mailto:${CONTACT_INFO.email}`}
                  method="GET"
                  className="space-y-6"
                >
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Nguyễn Văn A"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="from"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="email@example.com"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Chủ đề <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Câu hỏi về tuyển dụng"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Nội dung <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="body"
                      rows={6}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      placeholder="Nhập nội dung tin nhắn của bạn..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center shadow-sm"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Gửi tin nhắn
                  </button>

                  <p className="text-sm text-gray-500 text-center">
                    Chúng tôi sẽ phản hồi trong vòng 24 giờ làm việc
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Câu hỏi thường gặp
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Làm sao để ứng tuyển vào InnoJSC?
                </h3>
                <p className="text-gray-600">
                  Bạn có thể xem danh sách các vị trí tuyển dụng tại{' '}
                  <Link href="/" className="text-primary hover:underline">
                    trang chủ
                  </Link>{' '}
                  và click &quot;Ứng tuyển&quot; trên vị trí bạn quan tâm.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Quy trình tuyển dụng mất bao lâu?
                </h3>
                <p className="text-gray-600">
                  Quy trình tuyển dụng thường mất từ 2-4 tuần, bao gồm: Xét duyệt hồ sơ →
                  Phỏng vấn kỹ thuật → Phỏng vấn văn hóa → Thông báo kết quả.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Tôi có thể làm việc từ xa không?
                </h3>
                <p className="text-gray-600">
                  Một số vị trí hỗ trợ làm việc remote hoặc hybrid. Vui lòng kiểm tra mô tả
                  công việc hoặc liên hệ HR để biết thêm chi tiết.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
