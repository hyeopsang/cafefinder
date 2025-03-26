import "swiper/css";
import "../../styles/CafeSwiper.css";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { useRefContext } from "../../app/context/RefContext";
import { Place } from "../../types";
import { useSelector } from "react-redux";
import { useMapContext } from "../../app/context/MapContext";
const { kakao } = window;

interface CafeSwiperProps {
  places: Place[];
  markers: any[];
}

const CafeSwiper: React.FC<CafeSwiperProps> = ({ places, markers }) => {
  const { swiperRef } = useRefContext(); 
  const { map, setMap } = useMapContext();

  const handleSlideChange = (swiper: SwiperType) => {
    const activePlace = places[swiper.activeIndex];

    if (activePlace) {
      const newCenter = new kakao.maps.LatLng(Number(activePlace.y), Number(activePlace.x));
      map!.panTo(newCenter);

      const marker = markers[activePlace.placeIndex!];
      if (marker) {
        kakao.maps.event.trigger(marker, "click");
      }
    }
  };

  return (
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
        {places.map((place) => (
          <SwiperSlide key={place.id}>
            <Link to={`/place/${place.id}`}>
              <div
                className="mx-auto w-[calc(100%-60px)] rounded-xl bg-white p-5 shadow-md"
                style={{ cursor: "default" }}
              >
                <div className="flex flex-col gap-[10px] text-md font-medium">
                  <h5 className="text-lg font-bold">{place.place_name}</h5>
                  <p className="distance">{Number(place.distance).toFixed(2)} m</p>
                  <p className="address">{place.address_name}</p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
  );
};
export default CafeSwiper;
