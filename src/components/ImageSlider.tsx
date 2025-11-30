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
    <div className="image-slider-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={images.length > 1}
        className="rounded-lg"
        style={{ height: `${height}px` }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full bg-gray-100">
              <Image
                src={image}
                alt={`${alt} ${index + 1}`}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .image-slider-container .swiper-button-next,
        .image-slider-container .swiper-button-prev {
          color: #c9202c;
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .image-slider-container .swiper-button-next:after,
        .image-slider-container .swiper-button-prev:after {
          font-size: 20px;
          font-weight: bold;
        }

        .image-slider-container .swiper-pagination-bullet {
          background: #c9202c;
          opacity: 0.5;
        }

        .image-slider-container .swiper-pagination-bullet-active {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
