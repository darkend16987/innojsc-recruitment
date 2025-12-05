'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MapPin, Award, ChevronUp, ChevronDown, Building2, Users, Trophy, Briefcase, Calendar } from 'lucide-react';

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
    { project: 'TECHNO PARK TOWER', award: 'Đạt chứng chỉ "Công trình xanh LEED Platinum"' },
    { project: 'HAPPY CENTRAL ONE', award: 'Giải thưởng PropertyGuru Việt Nam 2021: Đạt giải "Dự án căn hộ tốt nhất Bình Dương"' },
  ],
  2022: [
    { project: 'VINHOMES OCEAN PARK', award: 'Giải thưởng Kiến Trúc Quốc Gia 2022 - 2023: hạng Bạc Hạng mục "KIẾN TRÚC CẢNH QUAN - THIẾT KẾ ĐÔ THỊ"' },
    { project: 'QHPK 1:2000 BẾN ĐÌNH - VŨNG TÀU', award: 'Giải thưởng Quy hoạch Quốc Gia, hạng Vàng' },
    { project: 'QHCT 1:500 03 KHU CAPITAL LAND - BẮC GIANG', award: 'Giải thưởng Quy hoạch Quốc Gia, hạng Bạc' },
    { project: 'QHCT 1:500 KHU LNG CÀ NÁ', award: 'Giải thưởng Quy hoạch Quốc Gia, hạng Bạc' },
  ],
  2023: [
    { project: 'PARKCITY HANOI', award: 'Giải nhất toàn quốc, giải vàng Châu Á Cuộc thi thiết kế hệ thống điều hòa không khí "HVAC DESIGN AWARD ASIA"' },
    { project: 'TECHNO PARK TOWER', award: 'Top 10 toàn quốc, giải nhì Châu Á Cuộc thi "Media International HVAC Contest Design Awards List"' },
    { project: 'THE LUMI', award: 'Giải thưởng PropertyGuru Việt Nam 2023: Lumi Hanoi - Dự án căn hộ cao cấp xuất sắc (Hà Nội); Thiết kế kiến trúc căn hộ cao cấp xuất sắc; Thiết kế cảnh quan căn hộ xuất sắc' },
    { project: 'SUN WORLD BA DEN MOUNTAIN', award: 'Giải thưởng Dot Property Awards 2023: Đạt giải "Khu du lịch có thiết kế cảnh quan đẹp nhất Việt Nam 2023"' },
  ],
  2024: [
    { project: 'ORIENTAL SQUARE BY OSI', award: 'Giải thưởng PropertyGuru Việt Nam 2024: Dự án văn phòng xuất sắc nhất' },
    { project: 'ORIENTAL SQUARE BY OSI', award: 'Giải thưởng PropertyGuru Việt Nam 2024: Best Office Development' },
    { project: 'THE SENIQUE HANOI', award: 'Giải thưởng PropertyGuru Việt Nam 2024: Dự án căn hộ cao cấp xuất sắc (Hà Nội)' },
    { project: 'THE SYCAMORE BINH DUONG', award: 'Giải thưởng PropertyGuru Việt Nam 2024: Dự án căn hộ xuất sắc (Bình Dương)' },
    { project: 'THE SYCAMORE BINH DUONG', award: 'Giải thưởng PropertyGuru Việt Nam 2024: Dự án nhà ở xuất sắc (Bình Dương)' },
    { project: 'SUN WORLD BA DEN MOUNTAIN', award: 'Giải Bạc Châu Á Cuộc thi "Media International HVAC Contest Design Awards List"' },
    { project: 'VAN HO INTER-AGENCY', award: 'Giải thưởng Kiến Trúc Quốc Gia 2024 - 2025: hạng Đồng Hạng mục "KIẾN TRÚC CÔNG CỘNG"' },
    { project: 'TRỤC THÙY VÂN, TP VŨNG TÀU', award: 'Giải thưởng Quy hoạch Quốc Gia, hạng Vàng' },
    { project: 'QHC TP. PHAN RANG THÁP CHÀM', award: 'Giải thưởng Quy hoạch Quốc Gia, hạng Vàng' },
    { project: 'QHCT 1/500 KHU ĐÔ THỊ PHƯỚC VĨNH TÂY', award: 'Giải thưởng Quy hoạch Quốc Gia, hạng Vàng' },
    { project: 'QHPK 1/2000 KHU VỰC SỐ 3 THUỘC QUY HOẠCH CHUNG XÂY DỰNG KHU DU LỊCH VEN BIỂN PHÍA NAM TỈNH NINH THUẬN', award: 'Giải thưởng Quy hoạch Quốc Gia, hạng Bạc' },
    { project: 'QHCT 1/500 KHÓM 5, CÀ MAU', award: 'Giải thưởng Quy hoạch Quốc Gia, hạng Vàng' },
  ],
};

const YEARS = [2016, 2017, 2019, 2020, 2021, 2022, 2023, 2024];

// --- COMPONENTS ---

// Component số nhảy (Animation)
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

    if (countRef.current) {
      observer.observe(countRef.current);
    }

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
      
      // Easing function: easeOutExpo
      const easeOut = (x: number): number => {
        return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
      };

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

  return (
    <span ref={countRef} className={`tabular-nums ${className}`}>
      {count}{suffix}
    </span>
  );
};

export default function AboutPage() {
  const [selectedOffice, setSelectedOffice] = useState<'hanoi' | 'hcm'>('hanoi');
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

  // Drag to scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!timelineRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - timelineRef.current.offsetLeft);
    setScrollLeft(timelineRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

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
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">WELCOME TO INNO</h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
            Chào mừng bạn đến với INNO – nơi những Kiến trúc sư, Kỹ sư và Chuyên gia trẻ có thể không chỉ làm việc, mà còn phát triển và tỏa sáng.
          </p>
        </div>
      </div>

      {/* Intro Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Company Introduction */}
        <section className="max-w-4xl mx-auto mb-20">
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
            <p>
              Tại INNO, chúng tôi tin rằng mỗi công trình không chỉ là bản vẽ – đó là dấu ấn của trí tuệ, sự sáng tạo và tinh thần kiến tạo tương lai.
            </p>
            <p>
              Từ năm 2008, INNO đã phát triển thành một trong những công ty tư vấn thiết kế uy tín nhất Việt Nam, quy tụ mạng lưới chuyên gia hàng đầu trong các lĩnh vực: <strong className="text-primary">Kiến trúc, Quy hoạch, Kết cấu, MEP, PCCC, Nội thất, Cảnh quan, Hạ tầng và Kinh tế xây dựng</strong>.
            </p>
            <p>
              Hơn 17 năm qua, con người INNO tự hào luôn đồng hành, tham gia vào những dự án mang tính biểu tượng quốc gia như <strong>Bitexco Financial Tower, Landmark 81, JW Marriott Hà Nội, Landmark 55</strong>, và nhiều dự án quy mô lớn của Vingroup, Sungroup, MIK, T&T, BRG, Novaland…
            </p>
            <p>
              Chúng tôi không chỉ cung cấp dịch vụ thiết kế – chúng tôi kiến tạo giá trị bền vững, đổi mới tư duy và dẫn đầu trong ứng dụng BIM. Tại INNO, mỗi thành viên là một mảnh ghép quan trọng, góp phần xây dựng nên những công trình làm thay đổi diện mạo đô thị Việt Nam.
            </p>
            <p>
              Với tầm nhìn trở thành đơn vị dẫn đầu trong ngành, INNO không ngừng mở rộng quy mô, tăng tốc đổi mới và nâng cao chất lượng dự án. Chúng tôi tìm kiếm những nhân sự nhiệt huyết, cầu tiến và sẵn sàng đồng hành để cùng tạo ra giá trị mới cho thị trường và cộng đồng.
            </p>
            <p className="text-xl font-semibold text-primary text-center mt-8">
              Gia nhập INNO — Cùng chúng tôi kiến tạo tương lai.
            </p>
          </div>
        </section>
      </div>

      {/* Journey Timeline - Full Width */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Hành trình của INNO</h2>
        
        {/* Draggable Scroll Container */}
        <div className="relative group w-full bg-white border-y border-gray-100">
          <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white px-6 py-2 rounded-full text-sm font-medium z-20 pointer-events-none transition-opacity duration-300 flex items-center gap-2 ${isDown ? 'opacity-0' : 'opacity-100'}`}>
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

        {/* Impressive Numbers Section (UPDATED - CLEAN & MINIMAL) */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Dấu ấn INNO</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
            <p className="text-gray-600 mt-4 text-lg">Những con số biết nói khẳng định vị thế và uy tín</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Main Stat - 500+ Projects */}
            <div className="lg:col-span-12 xl:col-span-4 relative group overflow-hidden bg-gradient-to-br from-primary to-red-800 rounded-3xl p-10 text-white shadow-xl flex flex-col justify-center items-center text-center">
               {/* Decorative Circles */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-all duration-500"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="relative z-10 flex flex-col justify-center h-full">
                {/* Font Heading (Montserrat) for big number */}
                <div className="text-8xl lg:text-9xl font-black mb-2 tracking-tighter" style={{ fontFamily: 'var(--font-montserrat)' }}>
                  <CountUpNumber end={500} suffix="+" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wider mb-2">Dự án</h3>
                <p className="text-white/80 font-medium text-lg">Đã tham gia thực hiện</p>
              </div>
            </div>

            {/* Sub Stats Grid - No Icons, Clean Typography */}
            <div className="lg:col-span-12 xl:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              
              {/* Stat 1 */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group justify-center min-h-[200px]">
                <div className="text-5xl font-bold text-primary mb-3" style={{ fontFamily: 'var(--font-montserrat)' }}>
                  <CountUpNumber end={50} suffix="+" />
                </div>
                <p className="text-gray-600 font-medium text-lg leading-tight">Dự án cấp đặc biệt<br/>& Cấp 1</p>
              </div>

              {/* Stat 2 */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group justify-center min-h-[200px]">
                <div className="text-5xl font-bold text-primary mb-3" style={{ fontFamily: 'var(--font-montserrat)' }}>
                  <CountUpNumber end={30} suffix="+" />
                </div>
                <p className="text-gray-600 font-medium text-lg leading-tight">Giải thưởng<br/>trong & ngoài nước</p>
              </div>

              {/* Stat 3 */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group justify-center min-h-[200px]">
                <div className="text-5xl font-bold text-primary mb-3" style={{ fontFamily: 'var(--font-montserrat)' }}>
                  <CountUpNumber end={17} suffix="+" />
                </div>
                <p className="text-gray-600 font-medium text-lg leading-tight">Năm xây dựng<br/>& phát triển</p>
              </div>

              {/* Stat 4 */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group justify-center min-h-[200px]">
                <div className="text-5xl font-bold text-primary mb-3" style={{ fontFamily: 'var(--font-montserrat)' }}>
                  <CountUpNumber end={100} suffix="+" />
                </div>
                <p className="text-gray-600 font-medium text-lg leading-tight">Khách hàng<br/>& Đối tác</p>
              </div>

              {/* Stat 5 */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group justify-center min-h-[200px]">
                <div className="text-5xl font-bold text-primary mb-3" style={{ fontFamily: 'var(--font-montserrat)' }}>
                  <CountUpNumber end={300} suffix="+" />
                </div>
                <p className="text-gray-600 font-medium text-lg leading-tight">Nhân sự<br/>đang làm việc</p>
              </div>

              {/* Stat 6 */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group justify-center min-h-[200px]">
                <div className="text-5xl font-bold text-primary mb-3" style={{ fontFamily: 'var(--font-montserrat)' }}>
                  <CountUpNumber end={10} suffix="+" />
                </div>
                <p className="text-gray-600 font-medium text-lg leading-tight">Công ty<br/>thành viên & liên kết</p>
              </div>

            </div>
          </div>
        </section>

        {/* Vision, Mission, Core Values */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Tầm nhìn - Sứ mệnh - Giá trị cốt lõi</h2>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Vision */}
            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-primary mb-4">Tầm nhìn</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Trở thành công ty tư vấn thiết kế dẫn đầu về chất lượng và dịch vụ tại Việt Nam
                  </p>
                </div>
                <div className="w-full md:w-64 aspect-square bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <p className="text-gray-400 text-sm">Ảnh Vision</p>
                </div>
              </div>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-primary mb-4">Sứ mệnh</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    Đưa năng lực tư vấn thiết kế của công ty ngang tầm khu vực và tiệm cận các nước tiên tiến trên thế giới
                  </p>
                </div>
                <div className="w-full md:w-64 aspect-square bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <p className="text-gray-400 text-sm">Ảnh Mission</p>
                </div>
              </div>
            </div>

            {/* Core Values */}
            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-primary mb-6 text-center">Giá trị cốt lõi</h3>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-400 text-sm">Ảnh Core Values (ảnh ngang toàn bộ)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Office Locations with Tabs */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Văn phòng của INNO</h2>

          {/* Office Tabs */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setSelectedOffice('hanoi')}
              className={`px-8 py-3 rounded-lg font-medium transition-all ${
                selectedOffice === 'hanoi'
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-primary'
              }`}
            >
              <MapPin className="inline-block w-5 h-5 mr-2" />
              Hà Nội
            </button>
            <button
              onClick={() => setSelectedOffice('hcm')}
              className={`px-8 py-3 rounded-lg font-medium transition-all ${
                selectedOffice === 'hcm'
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-primary'
              }`}
            >
              <MapPin className="inline-block w-5 h-5 mr-2" />
              TP.Hồ Chí Minh
            </button>
          </div>

          {/* Office Content */}
          <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                {selectedOffice === 'hanoi' ? 'Văn phòng Hà Nội' : 'Văn phòng TP.Hồ Chí Minh'}
              </h3>
              <p className="text-gray-600">
                {selectedOffice === 'hanoi'
                  ? '39 Thượng Thụy, Phú Thượng'
                  : 'A01.03, Khu căn hộ Hoàng Anh River View, 37 Nguyễn Văn Hưởng, phường Thảo Điền'}
              </p>
            </div>

            {/* Image Slider Placeholder */}
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-400 text-lg">
                Image slider for {selectedOffice === 'hanoi' ? 'Hanoi' : 'HCM'} office (will use Swiper.js)
              </p>
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">
              📷 Upload ảnh văn phòng vào: /public/images/recruitment/office/{selectedOffice === 'hanoi' ? 'hanoi' : 'hochiminh'}/
            </p>
          </div>
        </section>

        {/* Awards Section with Interactive Year Selector */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Các công trình đạt giải thưởng mà INNO đã thực hiện - tham gia
          </h2>

          <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Year Selector */}
              <div className="md:w-1/4 flex flex-col items-center">
                <div className="flex flex-col items-center gap-4">
                  <button
                    onClick={() => handleYearChange('up')}
                    disabled={selectedYear === YEARS[YEARS.length - 1]}
                    className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label="Next year"
                  >
                    <ChevronUp className="w-8 h-8 text-primary" />
                  </button>

                  <div className="text-6xl font-bold text-primary">
                    {selectedYear}
                  </div>

                  <button
                    onClick={() => handleYearChange('down')}
                    disabled={selectedYear === YEARS[0]}
                    className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label="Previous year"
                  >
                    <ChevronDown className="w-8 h-8 text-primary" />
                  </button>
                </div>
                <div className="mt-6 text-sm text-gray-500 text-center">
                  {YEARS.indexOf(selectedYear) + 1} / {YEARS.length}
                </div>
              </div>

              {/* Awards List */}
              <div className="md:w-3/4">
                <div className="space-y-6 max-h-[600px] overflow-y-auto pr-4">
                  {AWARDS_DATA[selectedYear as keyof typeof AWARDS_DATA]?.map((item, index) => (
                    <div key={index} className="border-l-4 border-primary pl-6 py-2">
                      <h4 className="font-bold text-lg text-gray-900 mb-2 flex items-start gap-2">
                        <Award className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                        {item.project}
                      </h4>
                      <p className="text-gray-700 leading-relaxed">{item.award}</p>
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