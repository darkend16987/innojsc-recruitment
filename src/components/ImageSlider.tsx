'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ImageSliderProps {
  images: string[];
  alt: string;
  height?: number;
}

export default function ImageSlider({ images, alt, height = 400 }: ImageSliderProps) {
  // If no images provided, show placeholder
  if (!images || images.length === 0) {
    return (
      <div
        className="bg-gray-100 rounded-lg flex items-center justify-center"
        style={{ height: `${height}px` }}
      >
        <div className="text-center text-gray-400">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p>No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="image-slider-container relative group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0} // No gap between slides for cleaner look
        slidesPerView={1}
        navigation
        pagination={{ 
          clickable: true,
          dynamicBullets: true // Dots nhỏ gọn hơn
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={images.length > 1}
        className="h-full w-full"
        style={{ height: `${height}px` }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full bg-gray-100">
              <Image
                src={image}
                alt={`${alt} ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        /* Button Styles - Chỉ hiện mũi tên, bỏ background */
        .image-slider-container .swiper-button-next,
        .image-slider-container .swiper-button-prev {
          color: #c9202c; /* Màu đỏ thương hiệu */
          background: transparent; /* Nền trong suốt */
          width: 50px; 
          height: 50px;
          border-radius: 0;
          box-shadow: none; /* Bỏ đổ bóng */
          transition: all 0.3s ease;
          opacity: 0; /* Ẩn mặc định */
          display: flex; 
          align-items: center;
          justify-content: center;
        }

        /* Hiện nút khi hover vào container */
        .image-slider-container:hover .swiper-button-next,
        .image-slider-container:hover .swiper-button-prev {
          opacity: 1;
        }

        /* Hover vào chính nút đó -> Tăng nhẹ size + shadow text để nổi hơn */
        .image-slider-container .swiper-button-next:hover,
        .image-slider-container .swiper-button-prev:hover {
          transform: scale(1.2); 
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
        }

        /* Chỉnh lại icon mũi tên to hơn một chút */
        .image-slider-container .swiper-button-next:after,
        .image-slider-container .swiper-button-prev:after {
          font-size: 32px; /* Tăng size icon */
          font-weight: bold;
        }

        /* Pagination Dots */
        .image-slider-container .swiper-pagination-bullet {
          background: #fff;
          opacity: 0.6;
          width: 10px;
          height: 10px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .image-slider-container .swiper-pagination-bullet-active {
          background: #c9202c;
          opacity: 1;
          width: 12px;
          height: 12px;
        }
      `}</style>
    </div>
  );
}