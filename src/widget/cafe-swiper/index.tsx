import "../styles/CafeSwiper.css";
import "swiper/swiper.css";

import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { useRefContext } from "../../app/context/RefContext";
import { Place } from "../../types";

const { kakao } = window;

interface CafeSwiperProps {
  places: Place[];
  map: any;
  markers: any[];
}

export const CafeSwiper: React.FC<CafeSwiperProps> = ({ places, map, markers }) => {
  const { swiperRef } = useRefContext(); 

  const handleSlideChange = (swiper: SwiperType) => {
    const activePlace = places[swiper.activeIndex];

    if (activePlace) {
      const newCenter = new kakao.maps.LatLng(Number(activePlace.y), Number(activePlace.x));
      map.panTo(newCenter);

      const marker = markers[activePlace.placeIndex!];
      if (marker) {
        kakao.maps.event.trigger(marker, "click");
      }
    }
  };

  return (
    <div className="fixed bottom-[15px] z-10 min-w-[375px] max-w-[428px] text-[#212121]">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        centeredSlides={true}
        loop={false}
        onSwiper={(swiper) => {
          swiperRef.current = swiper; // ✅ Context에서 가져온 swiperRef 사용
        }}
        onSlideChange={handleSlideChange}
      >
        {places.map((place, id) => (
          <SwiperSlide key={id}>
            <Link to={`/detail/${id}`}>
              <div
                className="mx-auto w-[calc(100%-60px)] rounded-[15px] bg-white p-[15px] shadow-md"
                style={{ cursor: "default" }}
              >
                <div className="flex flex-col gap-[10px] text-[16px] font-medium">
                  <h5 className="text-[18px] font-bold">{place.place_name}</h5>
                  <p className="distance">{Number(place.distance).toFixed(2)} m</p>
                  <p className="address">{place.address_name}</p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

