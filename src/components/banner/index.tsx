import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import Banner from '@/assets/banner.svg?react';
import Banner2 from '@/assets/banner2.svg?react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import BannerItem from './bannerItem';

const BannerList = [
  { img: Banner, text: 'ROUGHT ROASTERS에서 새롭게 리뉴얼 된 RR1 시즈널 블렌드를 즐겨보세요!' },
  { img: Banner2, text: '오늘 오보드나타의 파사삭.. 촉촉 에그타르트 어떠신가요?' },
];

export default function BannerSlide() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      pagination={{ clickable: true }}
      autoplay={{ delay: 4000 }}
      speed={2500}
      loop={true}
      spaceBetween={0}
      slidesPerView={1}
    >
      {BannerList.map((banner, id) => (
        <SwiperSlide key={id}>
          <BannerItem bannerImg={banner.img} bannerText={banner.text} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
