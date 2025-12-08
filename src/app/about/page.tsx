import React, { useState, useEffect, useRef } from 'react';
import { Award, ChevronUp, ChevronDown, MapPin, Info, ArrowRight, Menu } from 'lucide-react';

// --- MOCK COMPONENTS (Thay thế cho import từ Next.js) ---

const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 h-20 flex items-center justify-between px-4 lg:px-8 transition-all duration-300">
    <div className="flex items-center gap-2">
      {/* Logo giả lập */}
      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-xl">I</div>
      <span className="text-2xl font-bold text-blue-900 tracking-tight">INNO</span>
    </div>
    <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-gray-600 uppercase tracking-wide">
      <span className="text-blue-600 cursor-pointer">Về chúng tôi</span>
      <span className="hover:text-blue-600 cursor-pointer transition-colors">Lĩnh vực hoạt động</span>
      <span className="hover:text-blue-600 cursor-pointer transition-colors">Dự án</span>
      <span className="hover:text-blue-600 cursor-pointer transition-colors">Tin tức</span>
      <span className="hover:text-blue-600 cursor-pointer transition-colors">Tuyển dụng</span>
    </nav>
    <button className="lg:hidden p-2 text-gray-600">
      <Menu className="w-6 h-6" />
    </button>
  </header>
);

const Footer = () => (
  <footer className="bg-slate-900 text-white py-16 mt-auto">
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="col-span-1 md:col-span-2">
        <div className="text-2xl font-bold mb-4">INNO JSC</div>
        <p className="text-slate-400 max-w-sm leading-relaxed">
          Công ty Cổ phần INNO - Nhà tư vấn thiết kế chuyên nghiệp hàng đầu Việt Nam.
        </p>
      </div>
      <div>
        <h4 className="font-bold mb-4 text-slate-200">Liên hệ</h4>
        <p className="text-slate-400 text-sm mb-2">Hà Nội: 39 Thượng Thụy, Phú Thượng, Tây Hồ</p>
        <p className="text-slate-400 text-sm">TP.HCM: 37 Nguyễn Văn Hưởng, Thảo Điền</p>
      </div>
      <div>
        <h4 className="font-bold mb-4 text-slate-200">Kết nối</h4>
        <div className="flex gap-4">
          <div className="w-8 h-8 bg-slate-700 rounded-full hover:bg-blue-600 transition-colors cursor-pointer"></div>
          <div className="w-8 h-8 bg-slate-700 rounded-full hover:bg-blue-600 transition-colors cursor-pointer"></div>
          <div className="w-8 h-8 bg-slate-700 rounded-full hover:bg-blue-600 transition-colors cursor-pointer"></div>
        </div>
      </div>
    </div>
    <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500 text-sm">
      © 2024 INNO JSC. All rights reserved.
    </div>
  </footer>
);

// --- DATA ---
const AWARDS_DATA = {
  2016: [
    { project: 'LANDMARK 81', award: 'Giải thưởng Asia Pacific Property Awards: Đạt giải "Tòa nhà cao tầng tốt nhất Việt Nam"' },
    { project: 'LANDMARK 81', award: 'Giải thưởng International Property Awards: Đạt giải "Tòa nhà cao tầng tốt nhất thế giới"' },
    { project: 'FLC QUY NHƠN BEACH & GOLF RESORT', award: 'Giải thưởng VietNam Property Awards: Đạt giải "Thiết kế kiến trúc khách sạn độc đáo nhất Việt Nam"' },
  ],
  2017: [
    { project: 'VINHOMES METROPOLIS', award: 'Giải thưởng Asia Pacific Property Awards: Đạt giải "Tổ hợp cao tầng xuất sắc nhất khu vực"' },
  ],
  2019: [
    { project: 'FLC QUY NHƠN BEACH & GOLF RESORT', award: 'Giải thưởng World Travel Awards 2019: Đạt giải "Khách sạn hội nghị hàng đầu châu Á"; Đạt giải "Khu nghỉ dưỡng biển hàng đầu Việt Nam"' },
    { project: 'VINHOMES OCEAN PARK', award: 'Giải thưởng Asia Pacific Property Awards: Đạt giải "Dự Án Phức Hợp Tốt Nhất Việt Nam"' },
  ],
  2020: [
    { project: 'VINHOMES OCEAN PARK', award: 'Giải thưởng Smart City Awards: Đạt giải "Thành Phố Thông Minh 2020"' },
    { project: 'QHCT 1:500 KĐT DU LỊCH - DỊCH VỤ XUÂN YÊN', award: 'Giải thưởng Quy hoạch Quốc Gia, hạng Đồng' },
    { project: 'QHCT 1:500 KĐT DỊCH VỤ DU LỊCH XUÂN ĐAN - XUÂN PHỔ', award: 'Giải thưởng Quy hoạch Quốc Gia, hạng Đồng' },
  ],
  2021: [
    { project: 'DIAMOND CROWN HẢI PHÒNG', award: 'Giải thưởng Dot Property Vietnam Awards: Đạt giải "Dự án căn hộ và khách sạn cao cấp có thiết kế mang tính biểu tượng đẹp nhất Việt Nam 2021"' },
    { project: 'TECHNO PARK TOWER', award: 'Giải Quốc tế IBcon Digie Awards 2021: Đạt giải "Trung tâm công nghệ thông minh nhất"' },
    { project: 'HAPPY CENTRAL ONE', award: 'Giải thưởng PropertyGuru Việt Nam 2021: Đạt giải "Dự án căn hộ tốt nhất Bình Dương"' },
  ],
  2022: [
    { project: 'VINHOMES OCEAN PARK', award: 'Giải thưởng Kiến Trúc Quốc Gia 2022 - 2023: hạng Bạc Hạng mục "KIẾN TRÚC CẢNH QUAN - THIẾT KẾ ĐÔ THỊ"' },
    { project: 'QHPK 1:2000 BẾN ĐÌNH - VŨNG TÀU', award: 'Giải thưởng Quy hoạch Quốc Gia, hạng Vàng' },
  ],
  2023: [
    { project: 'PARKCITY HANOI', award: 'Giải nhất toàn quốc, giải vàng Châu Á Cuộc thi thiết kế hệ thống điều hòa không khí "HVAC DESIGN AWARD ASIA"' },
    { project: 'THE LUMI', award: 'Giải thưởng PropertyGuru Việt Nam 2023: Lumi Hanoi - Dự án căn hộ cao cấp xuất sắc (Hà Nội)' },
  ],
  2024: [
    { project: 'ORIENTAL SQUARE BY OSI', award: 'Giải thưởng PropertyGuru Việt Nam 2024: Dự án văn phòng xuất sắc nhất' },
    { project: 'THE SENIQUE HANOI', award: 'Giải thưởng PropertyGuru Việt Nam 2024: Dự án căn hộ cao cấp xuất sắc (Hà Nội)' },
    { project: 'THE SYCAMORE BINH DUONG', award: 'Giải thưởng PropertyGuru Việt Nam 2024: Dự án căn hộ xuất sắc (Bình Dương)' },
    { project: 'SUN WORLD BA DEN MOUNTAIN', award: 'Giải Bạc Châu Á Cuộc thi "Media International HVAC Contest Design Awards List"' },
    { project: 'VAN HO INTER-AGENCY', award: 'Giải thưởng Kiến Trúc Quốc Gia 2024 - 2025: hạng Đồng Hạng mục "KIẾN TRÚC CÔNG CỘNG"' },
    { project: 'TRỤC THÙY VÂN, TP VŨNG TÀU', award: 'Giải thưởng Quy hoạch Quốc Gia, hạng Vàng' },
  ],
};

const YEARS = [2016, 2017, 2019, 2020, 2021, 2022, 2023, 2024];

const FLOOR_DATA = [
  {
    id: 'f7',
    label: 'Tầng 7',
    name: 'Ban Lãnh Đạo & Điều Hành',
    departments: ['Ban lãnh đạo', 'Phòng IBIM', 'Marketing', 'IT', 'Đào tạo'],
    description: 'Trung tâm điều hành chiến lược và các phòng ban hỗ trợ then chốt.',
    color: 'bg-red-50'
  },
  {
    id: 'f6',
    label: 'Tầng 6',
    name: 'Khối Kiến Trúc & Nội Thất',
    departments: ['Phòng Kiến trúc (AS) 1', 'Phòng Kiến trúc (AS) 8', 'Phòng Nội thất INNO'],
    description: 'Không gian sáng tạo dành cho các nhóm thiết kế chuyên sâu.',
    color: 'bg-orange-50'
  },
  {
    id: 'f5',
    label: 'Tầng 5',
    name: 'Khối Kiến Trúc & Cảnh Quan',
    departments: ['Phòng Kiến trúc (AS) 3, 4, 10', 'Phòng Cảnh quan (LS) 1', 'Phòng BIM 1'],
    description: 'Tổ hợp thiết kế kiến trúc đa năng và quy hoạch cảnh quan.',
    color: 'bg-yellow-50'
  },
  {
    id: 'f4',
    label: 'Tầng 4',
    name: 'Khối Kết Cấu & Kiến Trúc',
    departments: ['Phòng Kết cấu (SS) 1, 2, 3', 'Phòng Kiến trúc (AS) 11'],
    description: 'Khu vực kỹ thuật chuyên sâu về kết cấu công trình.',
    color: 'bg-green-50'
  },
  {
    id: 'f3',
    label: 'Tầng 3',
    name: 'Tiện Ích & Sinh Hoạt Chung',
    departments: ['INNO Club', 'Không gian sinh hoạt chung', 'Căng tin'],
    description: 'Nơi kết nối, thư giãn và tái tạo năng lượng cho CBNV.',
    color: 'bg-teal-50'
  },
  {
    id: 'f2',
    label: 'Tầng 2',
    name: 'Khối Kỹ Thuật MEP & Dự Toán',
    departments: ['Phòng MEP (Cơ điện, Nước, HVAC)', 'PCCC', 'Phòng Dự toán'],
    description: 'Trung tâm kỹ thuật cơ điện và kiểm soát chi phí.',
    color: 'bg-blue-50'
  },
  {
    id: 'f_mezz',
    label: 'Tầng Lửng',
    name: 'Hội Nghị & Sự Kiện',
    departments: ['Meeting Hall', 'Phòng hội thảo'],
    description: 'Không gian tổ chức các sự kiện lớn và đào tạo nội bộ.',
    color: 'bg-indigo-50'
  },
  {
    id: 'f1',
    label: 'Tầng 1',
    name: 'Khối Văn Phòng Hỗ Trợ',
    departments: ['Hành chính - Nhân sự', 'Kế toán - Tài chính', 'Đấu thầu - Hợp đồng'],
    description: 'Bộ mặt đón tiếp và vận hành các thủ tục hành chính.',
    color: 'bg-purple-50'
  },
  {
    id: 'f_base',
    label: 'Tầng Hầm',
    name: 'Khu Vực Hậu Cần',
    departments: ['Khu vực để xe máy', 'Kỹ thuật tòa nhà'],
    description: 'Không gian tiện ích dành cho phương tiện đi lại.',
    color: 'bg-gray-50'
  }
];

// --- UTILS ---

const CountUpNumber = ({ end, suffix = '', duration = 2000, className = '' }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const easeOut = (x) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x));

      setCount(Math.floor(easeOut(percentage) * end));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return <span ref={countRef} className={`tabular-nums ${className}`}>{count}{suffix}</span>;
};

// --- INTERACTIVE COMPONENT ---

const InteractiveBuilding = () => {
  const [hoveredFloor, setHoveredFloor] = useState(null);

  const activeFloorId = hoveredFloor;
  const activeFloorData = FLOOR_DATA.find(f => f.id === activeFloorId);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-stretch min-h-[600px] max-w-7xl mx-auto px-4">
      {/* Cột trái: Hình ảnh tương tác */}
      <div className="lg:w-1/2 relative group rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-100">

        <div className="relative w-full h-full min-h-[500px] lg:min-h-[700px] bg-white">

          {/* Thay thế Image Next.js bằng thẻ img thường để tương thích preview */}
          <img
            // ĐƯỜNG DẪN ẢNH: Bạn hãy tạo folder public/images/about/ trong dự án Next.js
            // và lưu file SVG của bạn vào đó với tên: tru-so-inno-mat-cat.svg
            src="/images/about/tru-so-inno-mat-cat.svg"
            alt="Sơ đồ mặt cắt trụ sở INNO"
            className="absolute inset-0 w-full h-full object-contain object-center z-0"
            // Fallback: Nếu không tìm thấy file local (trong môi trường preview này), dùng ảnh demo online
            onError={(e) => {
              e.currentTarget.src = "https://i.imgur.com/k2E7z6v.jpeg";
            }}
          />

          {/* SVG Overlay */}
          <svg
            className="absolute inset-0 w-full h-full cursor-pointer z-10"
            viewBox="0 0 500 1000"
            preserveAspectRatio="none"
          >
            {/* Tầng 7 */}
            <rect
              x="50" y="30" width="400" height="80"
              className="fill-transparent hover:fill-blue-600/20 transition-colors duration-300"
              onMouseEnter={() => setHoveredFloor('f7')}
            />
            {/* Tầng 6 */}
            <rect
              x="50" y="120" width="400" height="90"
              className="fill-transparent hover:fill-blue-600/20 transition-colors duration-300"
              onMouseEnter={() => setHoveredFloor('f6')}
            />
            {/* Tầng 5 */}
            <rect
              x="50" y="220" width="400" height="90"
              className="fill-transparent hover:fill-blue-600/20 transition-colors duration-300"
              onMouseEnter={() => setHoveredFloor('f5')}
            />
            {/* Tầng 4 */}
            <rect
              x="50" y="320" width="400" height="90"
              className="fill-transparent hover:fill-blue-600/20 transition-colors duration-300"
              onMouseEnter={() => setHoveredFloor('f4')}
            />
            {/* Tầng 3 */}
            <rect
              x="50" y="420" width="400" height="90"
              className="fill-transparent hover:fill-blue-600/20 transition-colors duration-300"
              onMouseEnter={() => setHoveredFloor('f3')}
            />
            {/* Tầng 2 */}
            <rect
              x="50" y="520" width="400" height="90"
              className="fill-transparent hover:fill-blue-600/20 transition-colors duration-300"
              onMouseEnter={() => setHoveredFloor('f2')}
            />
            {/* Tầng Lửng */}
            <rect
              x="50" y="620" width="400" height="90"
              className="fill-transparent hover:fill-blue-600/20 transition-colors duration-300"
              onMouseEnter={() => setHoveredFloor('f_mezz')}
            />
            {/* Tầng 1 */}
            <rect
              x="50" y="720" width="400" height="110"
              className="fill-transparent hover:fill-blue-600/20 transition-colors duration-300"
              onMouseEnter={() => setHoveredFloor('f1')}
            />
            {/* Tầng Hầm */}
            <rect
              x="50" y="840" width="400" height="80"
              className="fill-transparent hover:fill-blue-600/20 transition-colors duration-300"
              onMouseEnter={() => setHoveredFloor('f_base')}
            />

            {/* Reset zones */}
            <rect
              x="0" y="0" width="50" height="1000"
              className="fill-transparent"
              onMouseEnter={() => setHoveredFloor(null)}
            />
            <rect
              x="450" y="0" width="50" height="1000"
              className="fill-transparent"
              onMouseEnter={() => setHoveredFloor(null)}
            />
          </svg>

          <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none z-20">
            <span className="bg-slate-900/80 text-white px-4 py-2 rounded-full text-sm backdrop-blur-md shadow-lg border border-white/20">
              Di chuột vào các tầng để xem chi tiết
            </span>
          </div>
        </div>
      </div>

      {/* Cột phải: Thông tin chi tiết */}
      <div className="lg:w-1/2 flex flex-col justify-center">
        <div className={`transition-all duration-300 ease-in-out`}>

          {activeFloorData ? (
            <div className={`h-full p-8 rounded-2xl border border-gray-100 shadow-xl ${activeFloorData.color} transition-all duration-300 animate-in fade-in slide-in-from-right-4`}>
              <div className="inline-block px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded mb-4 shadow-sm">
                {activeFloorData.label}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {activeFloorData.name}
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Chức năng & Phòng ban</h4>
                  <ul className="space-y-3">
                    {activeFloorData.departments.map((dept, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <ArrowRight className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span className="text-lg text-gray-800 font-medium">{dept}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-gray-200/50">
                  <p className="text-gray-600 italic text-lg leading-relaxed">
                    "{activeFloorData.description}"
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <div className="w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center mb-6">
                <Info className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Khám phá Trụ sở INNO</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Di chuyển chuột vào sơ đồ mặt cắt bên trái để xem bố trí các phòng ban chức năng tại trụ sở mới của chúng tôi.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---

export default function AboutPage() {
  const [selectedYear, setSelectedYear] = useState(2024);

  // Timeline drag state
  const timelineRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleYearChange = (direction) => {
    const currentIndex = YEARS.indexOf(selectedYear);
    if (direction === 'up' && currentIndex < YEARS.length - 1) {
      setSelectedYear(YEARS[currentIndex + 1]);
    } else if (direction === 'down' && currentIndex > 0) {
      setSelectedYear(YEARS[currentIndex - 1]);
    }
  };

  const handleMouseDown = (e) => {
    if (!timelineRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - timelineRef.current.offsetLeft);
    setScrollLeft(timelineRef.current.scrollLeft);
  };

  const handleMouseLeave = () => { setIsDown(false); };
  const handleMouseUp = () => { setIsDown(false); };

  const handleMouseMove = (e) => {
    if (!isDown || !timelineRef.current) return;
    e.preventDefault();
    const x = e.pageX - timelineRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    timelineRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-800">
      <Header />

      {/* Hero Section */}
      <div className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 flex items-center justify-center min-h-[500px]">
        <div className="absolute inset-0 z-0">
          {/* Ảnh thay thế */}
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
            alt="Về INNO"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/70 mix-blend-multiply"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 text-white animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">WELCOME TO INNO</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light text-slate-200">
            Nơi những Kiến trúc sư, Kỹ sư và Chuyên gia trẻ không chỉ làm việc, mà còn phát triển và tỏa sáng.
          </p>
        </div>
      </div>

      {/* Intro Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <section className="max-w-4xl mx-auto mb-20">
          <div className="prose prose-lg prose-slate max-w-none leading-relaxed space-y-6 text-justify">
            <p>
              Tại <span className="font-bold text-blue-600">INNO</span>, chúng tôi tin rằng mỗi công trình không chỉ là bản vẽ – đó là dấu ấn của trí tuệ, sự sáng tạo và tinh thần kiến tạo tương lai.
            </p>
            <p>
              Từ năm 2008, INNO đã phát triển thành một trong những công ty tư vấn thiết kế uy tín nhất Việt Nam, quy tụ mạng lưới chuyên gia hàng đầu trong các lĩnh vực: <strong className="text-blue-600">Kiến trúc, Quy hoạch, Kết cấu, MEP, PCCC, Nội thất, Cảnh quan, Hạ tầng và Kinh tế xây dựng</strong>.
            </p>
            <p>
              Hơn 17 năm qua, con người INNO tự hào luôn đồng hành, tham gia vào những dự án mang tính biểu tượng quốc gia như <strong>Bitexco Financial Tower, Landmark 81, JW Marriott Hà Nội, Landmark 55</strong>, và nhiều dự án quy mô lớn của Vingroup, Sungroup, MIK, T&T, BRG, Novaland…
            </p>
            <p className="text-xl font-bold text-blue-600 text-center mt-12 italic border-t border-b border-blue-100 py-6">
              "Gia nhập INNO — Cùng chúng tôi kiến tạo tương lai."
            </p>
          </div>
        </section>
      </div>

      {/* Journey Timeline */}
      <section className="mb-24">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Hành trình phát triển</h2>
        <div className="relative group w-full bg-white border-y border-gray-100 py-8">
          <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 bg-slate-900/80 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-medium z-20 pointer-events-none transition-opacity duration-300 flex items-center gap-2 ${isDown ? 'opacity-0' : 'opacity-100'}`}>
            <span className="animate-pulse">↔</span> Giữ và kéo sang ngang để xem lịch sử
          </div>
          <div
            ref={timelineRef}
            className={`overflow-x-auto scrollbar-hide select-none w-full ${isDown ? 'cursor-grabbing' : 'cursor-grab'}`}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="min-w-[1000px] flex justify-center px-4">
              {/* Placeholder Timeline Image since original was local */}
              <div className="h-[400px] w-full bg-slate-100 rounded-xl flex items-center justify-center border border-dashed border-slate-300">
                <span className="text-slate-400 font-medium">Khu vực hiển thị Timeline (Ảnh quá khổ)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Continued */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Impressive Numbers Section */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">DẤU ẤN INNO</h2>
            <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
            <p className="text-slate-500 mt-4 text-lg">Những con số biết nói khẳng định vị thế và uy tín</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Main Stat */}
            <div className="lg:col-span-12 xl:col-span-4 relative group overflow-hidden bg-gradient-to-br from-blue-700 to-blue-900 rounded-3xl p-10 text-white shadow-2xl flex flex-col justify-center items-center text-center transform hover:scale-[1.02] transition-transform duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-all duration-500"></div>

              <div className="relative z-10 flex flex-col justify-center h-full">
                <div className="text-8xl lg:text-9xl font-black mb-2 tracking-tighter text-white">
                  <CountUpNumber end={500} suffix="+" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wider mb-2 text-blue-100">Dự án</h3>
                <p className="text-blue-200 font-medium text-lg">Đã tham gia thực hiện</p>
              </div>
            </div>

            {/* Sub Stats Grid */}
            <div className="lg:col-span-12 xl:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { end: 50, label: "Dự án cấp đặc biệt & Cấp 1" },
                { end: 30, label: "Giải thưởng trong & ngoài nước" },
                { end: 17, label: "Năm xây dựng & phát triển" },
                { end: 100, label: "Khách hàng & Đối tác" },
                { end: 300, label: "Nhân sự đang làm việc" },
                { end: 10, label: "Công ty thành viên & liên kết" },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group justify-center min-h-[220px]">
                  <div className="text-5xl font-bold text-blue-600 mb-4">
                    <CountUpNumber end={stat.end} suffix="+" />
                  </div>
                  <p className="text-slate-600 font-medium text-lg leading-tight px-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision, Mission, Core Values */}
        <section className="mb-32">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-center hover:border-blue-200 transition-colors">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Tầm nhìn</h3>
              <p className="text-slate-600">Trở thành công ty tư vấn thiết kế dẫn đầu về chất lượng và dịch vụ tại Việt Nam.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-center hover:border-blue-200 transition-colors">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Sứ mệnh</h3>
              <p className="text-slate-600">Đưa năng lực tư vấn thiết kế ngang tầm khu vực và tiệm cận thế giới.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-center hover:border-blue-200 transition-colors">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Giá trị cốt lõi</h3>
              <p className="text-slate-600">Chất lượng - Sáng tạo - Chuyên nghiệp - Tận tâm - Bền vững.</p>
            </div>
          </div>
        </section>

        {/* --- TRỤ SỞ INNO INTERACTIVE --- */}
        <section className="mb-32 scroll-mt-24" id="office-location">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">KHÔNG GIAN LÀM VIỆC</h2>
            <p className="text-slate-500 text-lg flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              Trụ sở chính: 39 Thượng Thụy, Phú Thượng, Tây Hồ, Hà Nội
            </p>
          </div>

          <InteractiveBuilding />

        </section>

        {/* Awards Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Giải thưởng & Thành tựu
          </h2>

          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-slate-100">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 pb-8 md:pb-0 md:pr-8">
                <div className="flex flex-col items-center gap-6">
                  <button onClick={() => handleYearChange('up')} disabled={selectedYear === YEARS[YEARS.length - 1]} className="p-3 rounded-full hover:bg-blue-50 text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"><ChevronUp className="w-10 h-10" /></button>
                  <div className="text-7xl font-black text-blue-600 tracking-tighter">{selectedYear}</div>
                  <button onClick={() => handleYearChange('down')} disabled={selectedYear === YEARS[0]} className="p-3 rounded-full hover:bg-blue-50 text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"><ChevronDown className="w-10 h-10" /></button>
                </div>
              </div>
              <div className="md:w-3/4">
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                  {AWARDS_DATA[selectedYear]?.map((item, index) => (
                    <div key={index} className="group p-6 rounded-xl hover:bg-blue-50 transition-all duration-300 border border-transparent hover:border-blue-100">
                      <h4 className="font-bold text-xl text-slate-900 mb-2 flex items-start gap-3">
                        <Award className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                        {item.project}
                      </h4>
                      <p className="text-slate-600 leading-relaxed pl-9">{item.award}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}