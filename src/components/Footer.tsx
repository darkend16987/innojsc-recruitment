import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Linkedin, Youtube } from 'lucide-react';
import Logo from './Logo';

const CONTACT_INFO = {
  email: 'ahr@innojsc.com',
  hotline: '0243 2121 776',
  website: 'https://innojsc.com',
  addresses: [
    {
      name: 'Hà Nội',
      detail: '39 Thượng Thụy, Phú Thượng, Hà Nội',
    },
    {
      name: 'TP. Hồ Chí Minh',
      detail: 'Căn hộ C01.05, Chung cư Hoàng Anh River View, 37 Nguyễn Văn Hưởng, Phường An Khánh, TP Hồ Chí Minh',
    },
  ],
  socials: {
    facebook: 'https://www.facebook.com/congtycophanINNO',
    linkedin: 'https://www.linkedin.com/company/innojsc',
    youtube: 'https://www.youtube.com/@innojsctv',
  }
};

export default function Footer() {
  return (
    // Wrapper div để xử lý background và spacing an toàn hơn
    <div className="w-full bg-[#111827] mt-20" style={{ transform: 'translateZ(0)' }}>
      <footer 
        className="w-full text-gray-300 border-t border-gray-800"
        style={{ borderTopWidth: '1px', borderStyle: 'solid' }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Column 1: Brand Info */}
            <div className="space-y-6">
              <div className="transform origin-left scale-90 sm:scale-100">
                <Logo variant="dark" />
              </div>
              <p className="text-sm leading-relaxed text-gray-400">
                Tiên phong kiến tạo những công trình biểu tượng. Chúng tôi xây dựng môi trường làm việc chuyên nghiệp, nơi tài năng tỏa sáng.
              </p>
              <div className="flex gap-4">
                <a 
                  href={CONTACT_INFO.socials.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a 
                  href={CONTACT_INFO.socials.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a 
                  href={CONTACT_INFO.socials.youtube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all duration-300"
                  aria-label="Youtube"
                >
                  <Youtube size={18} />
                </a>
              </div>
            </div>

            {/* Column 2: Sitemap (Khám phá) */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 tracking-wide">Khám phá</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                    Cơ hội việc làm
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                    Về chúng tôi
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block">
                    Liên hệ với chúng tôi
                  </Link>
                </li>
                <li>
                  <a 
                    href={CONTACT_INFO.website}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                  >
                    Website chính thức
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact HN */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 tracking-wide">Văn phòng Hà Nội</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-gray-400 text-sm">{CONTACT_INFO.addresses[0].detail}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <a href={`tel:${CONTACT_INFO.hotline}`} className="text-gray-400 hover:text-white transition-colors">
                    {CONTACT_INFO.hotline}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-gray-400 hover:text-white transition-colors">
                    {CONTACT_INFO.email}
                  </a>
                </li>
              </ul>
            </div>

             {/* Column 4: Contact HCM */}
             <div>
              <h3 className="text-white font-bold text-lg mb-6 tracking-wide">Văn phòng TP.HCM</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-gray-400 text-sm">{CONTACT_INFO.addresses[1].detail}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <a href={`tel:${CONTACT_INFO.hotline}`} className="text-gray-400 hover:text-white transition-colors">
                    {CONTACT_INFO.hotline}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-8 mt-8 text-center sm:flex sm:justify-between sm:items-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} InnoJSC. Bản quyền thuộc về Công ty CP INNO.
            </p>
            <p className="text-gray-600 text-sm mt-2 sm:mt-0">
              Designed for INNO Careers
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}