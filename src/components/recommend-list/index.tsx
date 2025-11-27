import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import RecommendItem from './recommend-item';

const recommendCafeList = [
  { name: '몬드제과', image: './images/cafe1.jpg', location: '울산 남구 왕생로144번길 11 1층' },
  {
    name: '도우트리',
    image: './images/cafe2.jpg',
    location: '울산 울주군 서생면 해맞이로 962 도우트리 베이커리카페',
  },
  {
    name: '초석로스터스 삼산',
    image: './images/cafe3.jpg',
    location: '울산 남구 왕생로72번길 20 2층',
  },
  { name: '메이즈메이즈', image: './images/cafe4.jpg', location: '울산 남구 돋질로306번길 30' },
  { name: '우딬', image: './images/cafe5.jpg', location: '울산 남구 돋질로306번길 30' },
  {
    name: '밀리언하우스 울산 삼산점',
    image: './images/cafe6.jpg',
    location: '울산 남구 삼산중로 88 1층, 2층',
  },
  { name: 'BCD', image: './images/cafe7.jpg', location: '울산 중구 화진4길 91-2 복합문화공간 BCD' },
  { name: '르옹드 하우스', image: './images/cafe8.jpg', location: '울산 남구 중앙로 309 1층' },
  {
    name: 'AHOVE',
    image: './images/cafe9.jpg',
    location: '울산 울주군 범서읍 대리로 143-11 카페 AHOVE',
  },
  {
    name: '인얼스커피 울산동구점',
    image: './images/cafe10.jpg',
    location: '울산 동구 해수욕장7길 5',
  },
  {
    name: '이층카페',
    image: './images/cafe11.jpg',
    location: '울산 울주군 온양읍 용당내광로 398 이층카페',
  },
];

export default function RecommendList() {
  return (
    <div className="pt-8">
      <p className="mb-3 w-full px-3 text-base font-semibold">요즘 핫한 카페</p>

      <Swiper
        modules={[FreeMode]}
        freeMode={true}
        spaceBetween={0}
        slidesPerView="auto"
        className="w-full"
      >
        {recommendCafeList.map((cafe, id) => (
          <SwiperSlide key={id} style={{ width: 'auto' }}>
            <RecommendItem
              placeName={cafe.name}
              placeImage={cafe.image}
              placeLocation={cafe.location}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
