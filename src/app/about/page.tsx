'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, ChevronUp, ChevronDown, MapPin, Info } from 'lucide-react';

// --- DATA: DANH SÁCH GIẢI THƯỞNG ---
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
    { project: 'QHPK 1:2000 KĐT SINH THÁI, DU LỊCH, NGHỈ DƯỠNG & SÂN GOLF TAM NÔNG', award: 'Giải thưởng Quy hoạch Quốc Gia, hạng Đồng' },
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
    id: 'floor7',
    svgId: 'floor7',
    label: 'Tầng 7',
    name: 'Ban Lãnh Đạo & Điều Hành',
    departments: ['Ban lãnh đạo', 'Phòng IBIM', 'Marketing', 'IT', 'Đào tạo'],
    description: 'Trung tâm điều hành chiến lược và các phòng ban hỗ trợ then chốt.',
    color: 'bg-red-50 border-red-100'
  },
  {
    id: 'floor6',
    svgId: 'floor6',
    label: 'Tầng 6',
    name: 'Khối Kiến Trúc & Nội Thất',
    departments: ['Phòng Kiến trúc (AS) 1', 'Phòng Kiến trúc (AS) 8', 'Phòng Nội thất INNO'],
    description: 'Zone 6, căn cứ của các KTS vẽ giỏi, quậy giỏi, quẩy càng ác',
    color: 'bg-orange-50 border-orange-100'
  },
  {
    id: 'floor5',
    svgId: 'floor5',
    label: 'Tầng 5',
    name: 'Khối Kiến Trúc & Cảnh Quan',
    departments: ['Phòng Kiến trúc (AS) 3, 4, 10', 'Phòng Cảnh quan (LS) 1', 'Phòng BIM 1'],
    description: 'Liên minh KTS INNO.',
    color: 'bg-yellow-50 border-yellow-100'
  },
  {
    id: 'floor4',
    svgId: 'floor4',
    label: 'Tầng 4',
    name: 'Khối Kết Cấu & Kiến Trúc',
    departments: ['Phòng Kết cấu (SS) 1, 2, 3', 'Phòng Kiến trúc (AS) 11'],
    description: 'Đại bản doanh Kết cấu INNO.',
    color: 'bg-green-50 border-green-100'
  },
  {
    id: 'floor3',
    svgId: 'floor3',
    label: 'Tầng 3',
    name: 'Tiện Ích & Sinh Hoạt Chung',
    departments: ['INNO Club', 'Không gian sinh hoạt chung', 'Căng tin'],
    description: 'Nơi kết nối, thư giãn và tái tạo năng lượng cho CBNV.',
    color: 'bg-teal-50 border-teal-100'
  },
  {
    id: 'floor2',
    svgId: 'floor2',
    label: 'Tầng 2',
    name: 'Khối Kỹ Thuật MEP & Dự Toán',
    departments: ['Phòng MEP (Cơ điện, Nước, HVAC)', 'PCCC', 'Phòng Dự toán'],
    description: 'Trung tâm MEP và Phòng dự toán xây dựng.',
    color: 'bg-blue-50 border-blue-100'
  },
  {
    id: 'extra-floor',
    svgId: 'extra-floor',
    label: 'Tầng Lửng',
    name: 'Hội Nghị & Sự Kiện',
    departments: ['Meeting Hall', 'Phòng hội thảo'],
    description: 'Không gian tổ chức các sự kiện lớn và đào tạo nội bộ.',
    color: 'bg-indigo-50 border-indigo-100'
  },
  {
    id: 'floor1',
    svgId: 'floor1',
    label: 'Tầng 1',
    name: 'Khối Văn Phòng Hỗ Trợ',
    departments: ['Hành chính - Nhân sự', 'Kế toán - Tài chính', 'Đấu thầu - Hợp đồng'],
    description: 'Bộ mặt đón tiếp và vận hành các thủ tục.',
    color: 'bg-purple-50 border-purple-100'
  },
  {
    id: 'base',
    svgId: 'base',
    label: 'Tầng Hầm',
    name: 'Khu Vực Hậu Cần',
    departments: ['Khu vực để xe máy', 'Kỹ thuật tòa nhà'],
    description: 'Khu vực kỹ thuật và hầm để xe máy cán bộ nhân viên INNO.',
    color: 'bg-gray-50 border-gray-200'
  }
];

/**
 * TỌA ĐỘ CHÍNH XÁC 100% từ file SVG
 */
const FLOOR_COORDINATES = [
  { id: 'floor7', x: 147.35, y: 111.03, width: 1208.47, height: 153.36 },
  { id: 'floor6', x: 147.35, y: 273.05, width: 1208.47, height: 109.49 },
  { id: 'floor5', x: 147.35, y: 398.44, width: 1208.47, height: 115.12 },
  { id: 'floor4', x: 147.35, y: 528.45, width: 1208.47, height: 114.92 },
  { id: 'floor3', x: 147.35, y: 658.24, width: 1208.47, height: 114.15 },
  { id: 'floor2', x: 147.35, y: 788.04, width: 1208.47, height: 114.36 },
  { id: 'extra-floor', x: 147.35, y: 917.34, width: 1208.47, height: 103.8 },
  { id: 'floor1', x: 147.35, y: 1035.84, width: 1208.47, height: 107.8 },
  { id: 'base', x: 147.35, y: 1161.03, width: 1208.47, height: 97.33 }
];

// --- UTILS ---

const CountUpNumber = ({ end, suffix = '', duration = 2000, className = '' }: { end: number, suffix?: string, duration?: number, className?: string }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
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
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const easeOut = (x: number): number => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x));

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
  const [hoveredFloor, setHoveredFloor] = useState<string | null>(null);

  const activeFloorData = FLOOR_DATA.find(f => f.id === hoveredFloor);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-stretch min-h-[600px] max-w-7xl mx-auto px-4">
      {/* Cột trái: Hình ảnh tương tác */}
      <div className="lg:w-1/2 relative group rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-100">

        <div className="relative w-full h-full min-h-[500px] lg:min-h-[700px] bg-white">

          {/* Background Image */}
          <Image
            src="/images/about/tru-so-inno-mat-cat3.svg"
            alt="Sơ đồ mặt cắt trụ sở INNO"
            fill
            className="object-contain object-center z-0"
            priority
          />

          {/* SVG Overlay */}
          <svg
            className="absolute inset-0 w-full h-full z-10"
            viewBox="0 0 1573.65 1251.75"
            preserveAspectRatio="xMidYMid meet"
            onMouseLeave={() => setHoveredFloor(null)}
          >
            {/* Render các tầng */}
            {FLOOR_COORDINATES.map((floor) => {
              const floorData = FLOOR_DATA.find(f => f.id === floor.id);
              if (!floorData) return null;

              return (
                <g key={floor.id}>
                  <rect
                    x={floor.x}
                    y={floor.y}
                    width={floor.width}
                    height={floor.height}
                    className="fill-transparent hover:fill-red-600/30 transition-all duration-300 cursor-pointer"
                    style={{
                      stroke: hoveredFloor === floor.id ? '#dc2626' : 'transparent', // red-600
                      strokeWidth: hoveredFloor === floor.id ? 4 : 0
                    }}
                    onMouseEnter={() => setHoveredFloor(floor.id)}
                  />

                  {/* Label hiển thị khi hover */}
                  {hoveredFloor === floor.id && (
                    <text
                      x={floor.x + floor.width / 2}
                      y={floor.y + floor.height / 2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-red-700 font-bold pointer-events-none"
                      style={{ fontSize: '32px', fontFamily: 'var(--font-montserrat)' }}
                    >
                      {floorData.label}
                    </text>
                  )}
                </g>
              );
            })}
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
            <div className={`h-full p-8 rounded-2xl border shadow-xl ${activeFloorData.color} transition-all duration-300 animate-in fade-in slide-in-from-right-4`}>
              <div className="inline-block px-3 py-1 bg-red-700 text-white text-sm font-bold rounded mb-4 shadow-sm">
                {activeFloorData.label}
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight" style={{ fontFamily: 'var(--font-montserrat)' }}>
                {activeFloorData.name}
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Chức năng & Phòng ban</h4>
                  <ul className="space-y-3">
                    {activeFloorData.departments.map((dept, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <ArrowRight className="w-5 h-5 text-red-700 flex-shrink-0 mt-0.5" />
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
                <Info className="w-10 h-10 text-red-700" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-montserrat)' }}>Khám phá Trụ sở INNO</h3>
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
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleYearChange = (direction: 'up' | 'down') => {
    const currentIndex = YEARS.indexOf(selectedYear);
    if (direction === 'up' && currentIndex < YEARS.length - 1) {
      setSelectedYear(YEARS[currentIndex + 1]);
    } else if (direction === 'down' && currentIndex > 0) {
      setSelectedYear(YEARS[currentIndex - 1]);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!timelineRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - timelineRef.current.offsetLeft);
    setScrollLeft(timelineRef.current.scrollLeft);
  };

  const handleMouseLeave = () => { setIsDown(false); };
  const handleMouseUp = () => { setIsDown(false); };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !timelineRef.current) return;
    e.preventDefault();
    const x = e.pageX - timelineRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    timelineRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <div className="relative py-24 sm:py-32 flex items-center justify-center min-h-[400px]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/recruitment/hero/about-hero1.webp"
            alt="Về INNO"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay màu đen mờ */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Nội dung text */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">WELCOME TO INNO</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Nơi những Kiến trúc sư, Kỹ sư và Chuyên gia trẻ không chỉ làm việc, trải nghiệm văn hóa, mà còn phát triển và xây dựng ước mơ của chính mình.
          </p>
        </div>
      </div>

      {/* Intro Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <section className="max-w-4xl mx-auto mb-20">
          <div className="prose prose-lg prose-slate max-w-none leading-relaxed space-y-6 text-justify">
            <p>
              Tại <span className="font-bold text-red-700">INNO</span>, chúng tôi tin rằng mỗi công trình không chỉ là bản vẽ – đó là dấu ấn của trí tuệ, sự sáng tạo và tinh thần kiến tạo tương lai.
            </p>
            <p>
              Từ năm 2008, INNO đã phát triển thành một trong những công ty tư vấn thiết kế uy tín nhất Việt Nam, quy tụ mạng lưới chuyên gia hàng đầu trong các lĩnh vực: <strong className="text-red-700">Kiến trúc, Quy hoạch, Kết cấu, MEP, PCCC, Nội thất, Cảnh quan, Hạ tầng và Kinh tế xây dựng</strong>.
            </p>
            <p>
              Hơn 17 năm qua, con người INNO tự hào luôn đồng hành, tham gia vào những dự án mang tính biểu tượng quốc gia như <strong>Bitexco Financial Tower, Landmark 81, JW Marriott Hà Nội, Landmark 55</strong>, và nhiều dự án quy mô lớn của Vingroup, Sungroup, MIK, T&T, BRG, Novaland…
            </p>
            <p className="text-xl font-bold text-red-700 text-center mt-12 italic border-t border-b border-red-100 py-6" style={{ fontFamily: 'var(--font-montserrat)' }}>
              "Gia nhập INNO — Cùng chúng tôi kiến tạo tương lai."
            </p>
          </div>
        </section>
      </div>

      {/* Journey Timeline */}
      <section className="mb-24">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-12" style={{ fontFamily: 'var(--font-montserrat)' }}>Hành trình phát triển</h2>
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
            <div className="min-w-[1500px] md:min-w-[2000px] lg:min-w-[2500px]">
              <Image
                src="/images/recruitment/timeline/timeline.webp"
                alt="Lịch sử hình thành và phát triển INNO"
                width={6296}
                height={1974}
                className="w-full h-auto object-contain pointer-events-none"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Continued */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Impressive Numbers Section - Styled like Original */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-red-700 mb-4 tracking-tight" style={{ fontFamily: 'var(--font-montserrat)' }}>DẤU ẤN INNO</h2>
            <div className="w-24 h-1.5 bg-red-700 mx-auto rounded-full"></div>
            <p className="text-slate-500 mt-4 text-lg">Những con số biết nói khẳng định vị thế và uy tín</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Main Stat - Cập nhật Gradient Đỏ */}
            <div className="lg:col-span-12 xl:col-span-4 relative group overflow-hidden bg-gradient-to-br from-red-700 to-red-900 rounded-3xl p-10 text-white shadow-2xl flex flex-col justify-center items-center text-center transform hover:scale-[1.02] transition-transform duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-all duration-500"></div>

              <div className="relative z-10 flex flex-col justify-center h-full">
                <div className="text-8xl lg:text-9xl font-black mb-2 tracking-tighter text-white" style={{ fontFamily: 'var(--font-montserrat)' }}>
                  <CountUpNumber end={500} suffix="+" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wider mb-2 text-red-100">Dự án</h3>
                <p className="text-red-200 font-medium text-lg">Đã tham gia thực hiện</p>
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
                  <div className="text-5xl font-bold text-red-700 mb-4" style={{ fontFamily: 'var(--font-montserrat)' }}>
                    <CountUpNumber end={stat.end} suffix="+" />
                  </div>
                  <p className="text-slate-600 font-medium text-lg leading-tight px-2">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision, Mission, Core Values - Styled Text Only with RED Titles */}
        <section className="mb-20">
          <div className="grid md:grid-cols-3 gap-8 mx-auto">
            {/* Tầm nhìn */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-200 group">
              <div className="flex items-start gap-4 mb-4">
                <h3 className="text-2xl font-black text-red-700 mb-6 uppercase tracking-wider border-b-2 border-red-100 pb-4" style={{ fontFamily: 'var(--font-montserrat)' }}>
                  TẦM NHÌN
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed flex-grow">
                  Trở thành công ty tư vấn thiết kế dẫn đầu về chất lượng và dịch vụ tại Việt Nam.
                </p>
              </div>
            </div>

            {/* Sứ mệnh */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-200 group">
              <div className="flex items-start gap-4 mb-4">
                <h3 className="text-2xl font-black text-red-700 mb-6 uppercase tracking-wider border-b-2 border-red-100 pb-4" style={{ fontFamily: 'var(--font-montserrat)' }}>
                  SỨ MỆNH
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed flex-grow">
                  Đưa năng lực tư vấn thiết kế ngang tầm khu vực và tiệm cận thế giới.
                </p>
              </div>
            </div>

            {/* Giá trị cốt lõi */}
            <div className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 border border-gray-200 group">
              <div className="flex items-start gap-4 mb-4">
                <h3 className="text-2xl font-black text-red-700 mb-6 uppercase tracking-wider border-b-2 border-red-100 pb-4" style={{ fontFamily: 'var(--font-montserrat)' }}>
                  GIÁ TRỊ CỐT LÕI
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed flex-grow">
                  8 giá trị văn hóa cốt lõi đặc sắc định hình bản sắc - con người INNO.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Full Width Extra Image Section */}
        <section className="mb-32 rounded-3xl overflow-hidden shadow-2xl relative">
          <div className="relative w-full aspect-[21/9] md:aspect-[24/9]">
            <Image
              src="/images/recruitment/about/company-culture.webp" // Sử dụng ảnh đã có trong thư viện hoặc thay thế bằng ảnh ngang mong muốn
              alt="Văn hóa INNO"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
          </div>
        </section>

        {/* --- TRỤ SỞ INNO INTERACTIVE --- */}
        <section className="mb-32 scroll-mt-24" id="office-location">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'var(--font-montserrat)' }}>KHÔNG GIAN LÀM VIỆC</h2>
            <p className="text-slate-500 text-lg flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5 text-red-700" />
              Trụ sở chính: 39 Thượng Thụy, Phú Thượng, Hà Nội
            </p>
          </div>

          <InteractiveBuilding />

        </section>

        {/* Awards Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12" style={{ fontFamily: 'var(--font-montserrat)' }}>
            Giải thưởng & Thành tựu
          </h2>

          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-slate-100">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 pb-8 md:pb-0 md:pr-8">
                <div className="flex flex-col items-center gap-6">
                  <button onClick={() => handleYearChange('up')} disabled={selectedYear === YEARS[YEARS.length - 1]} className="p-3 rounded-full hover:bg-red-50 text-red-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"><ChevronUp className="w-10 h-10" /></button>
                  <div className="text-7xl font-black text-red-700 tracking-tighter" style={{ fontFamily: 'var(--font-montserrat)' }}>{selectedYear}</div>
                  <button onClick={() => handleYearChange('down')} disabled={selectedYear === YEARS[0]} className="p-3 rounded-full hover:bg-red-50 text-red-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"><ChevronDown className="w-10 h-10" /></button>
                </div>
              </div>
              <div className="md:w-3/4">
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                  {AWARDS_DATA[selectedYear as keyof typeof AWARDS_DATA]?.map((item, index) => (
                    <div key={index} className="group p-6 rounded-xl hover:bg-red-50 transition-all duration-300 border-l-4 border-transparent hover:border-red-700 bg-gray-50/50 hover:bg-red-50/80">
                      <h4 className="font-bold text-xl text-slate-900 mb-2 flex items-start gap-3">
                        <span className="w-2 h-2 rounded-full bg-red-700 mt-2.5 flex-shrink-0"></span>
                        {item.project}
                      </h4>
                      <p className="text-slate-600 leading-relaxed pl-5">{item.award}</p>
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