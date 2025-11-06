import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Home, Search, Briefcase } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-blue-100 rounded-full mb-6">
              <Search className="w-16 h-16 text-blue-600" />
            </div>
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Không tìm thấy trang
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Home className="w-5 h-5 mr-2" />
              Về trang chủ
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Briefcase className="w-5 h-5 mr-2" />
              Xem việc làm
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">Có thể bạn đang tìm kiếm:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/"
                className="text-sm text-blue-600 hover:underline"
              >
                Danh sách việc làm
              </Link>
              <span className="text-gray-300">•</span>
              <a
                href="https://innojsc.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                Về InnoJSC
              </a>
              <span className="text-gray-300">•</span>
              <Link
                href="/contact"
                className="text-sm text-blue-600 hover:underline"
              >
                Liên hệ
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
