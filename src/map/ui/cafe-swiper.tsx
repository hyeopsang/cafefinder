import "swiper/css";
import "../../styles/CafeSwiper.css";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { useRefContext } from "../../app/context/RefContext";
import { Place } from "../../types";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/redux/store";
import { setMap } from "../../app/redux/mapSlice";
const { kakao } = window;

interface CafeSwiperProps {
  places: Place[];
  markers: any[];
}

const CafeSwiper: React.FC<CafeSwiperProps> = ({ places, markers }) => {
  const { swiperRef } = useRefContext(); 
  const dispatch = useDispatch();
  const map = useSelector((state: RootState) => state.map.map);

  const handleSlideChange = (swiper: SwiperType) => {
    const activePlace = places[swiper.activeIndex];

    if (activePlace && map) {
      const newCenter = new kakao.maps.LatLng(Number(activePlace.y), Number(activePlace.x));
      map.panTo(newCenter);

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
          swiperRef.current = swiper; 
        }}
        onSlideChange={handleSlideChange}
      >
        {places.map((place) => (
          <SwiperSlide key={place.id}>
            <Link to={`/place/${place.id}`}>
              <div
                className="mx-auto w-[90%] rounded-2xl bg-white text-neutral-900 p-4 font-medium text-base shadow-md"
                style={{ cursor: "default" }}
              >
                <div className="flex flex-col gap-2">
                  <h5 className="text-lg font-semibold">{place.place_name}</h5>
                  <p>{Number(place.distance).toFixed(2)} m</p>
                  <p>{place.address_name}</p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
  );
};
export default CafeSwiper;
