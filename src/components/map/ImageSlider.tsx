import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

interface ImageSliderProps {
  children: React.ReactNode;
  spaceBetween?: number;
  slideWidth?: string;
}

export default function ImageSlider({
  children,
  spaceBetween = 0,
  slideWidth = 'auto',
}: ImageSliderProps) {
  const slides = Array.isArray(children) ? children : [children];

  return (
    <Swiper
      modules={[FreeMode]}
      freeMode
      spaceBetween={spaceBetween}
      touchStartPreventDefault={false}
      slidesPerView="auto"
      className="w-full"
    >
      {slides.map((child, index) => (
        <SwiperSlide key={index} style={{ width: slideWidth }}>
          {child}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
