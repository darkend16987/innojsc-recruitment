import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

const CONTACT_INFO = {
  email: 'ahr@innojsc.com',
  hotline: '+84 969 979 391',
  website: 'https://innojsc.com',
  addresses: [
    {
      name: 'Hà Nội',
      detail: '39 Thượng Thụy, Phú Thượng, Tây Hồ, Hà Nội',
    },
    {
      name: 'TP.HCM',
      detail: 'Căn hộ TMDV A01.03, Khu căn hộ Hoàng Anh River View, 37 Nguyễn Văn Hưởng, phường Thảo Điền, TP. Thủ Đức',
    },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Logo & About */}
          <div>
            <div className="mb-4">
              <Logo variant="dark" />
            </div>
            <p className="text-sm mb-4">
              Tham gia cùng chúng tôi để kiến tạo tương lai. Khám phá các cơ hội nghề nghiệp
              hấp dẫn trong lĩnh vực kiến trúc và xây dựng.
            </p>
            <a
              href={CONTACT_INFO.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-sm font-medium"
            >
              Về InnoJSC →
            </a>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Tìm việc làm
                </Link>
              </li>
              <li>
                <a
                  href={CONTACT_INFO.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Website công ty
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Liên hệ với chúng tôi
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Liên hệ</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <Mail className="w-5 h-5 mr-2 flex-shrink-0 text-blue-400" />
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="hover:text-white transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 mr-2 flex-shrink-0 text-blue-400" />
                <a
                  href={`tel:${CONTACT_INFO.hotline}`}
                  className="hover:text-white transition-colors"
                >
                  {CONTACT_INFO.hotline}
                </a>
              </li>
              {CONTACT_INFO.addresses.map((addr) => (
                <li key={addr.name} className="flex items-start">
                  <MapPin className="w-5 h-5 mr-2 flex-shrink-0 text-blue-400" />
                  <div>
                    <strong className="text-white">{addr.name}:</strong>
                    <p className="text-gray-400">{addr.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-center items-center text-sm">
            <p>&copy; {new Date().getFullYear()} InnoJSC. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
