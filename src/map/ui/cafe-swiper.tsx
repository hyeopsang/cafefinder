import "swiper/css";
import "../../styles/CafeSwiper.css";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { useRefContext } from "../../app/context/RefContext";
import { Place } from "../../types/place-type";
import { useSelector } from "react-redux";
import { RootState } from "../../app/redux/store";

interface CafeSwiperProps {
  places: Place[];
  markers: google.maps.marker.AdvancedMarkerElement[];
}

const CafeSwiper: React.FC<CafeSwiperProps> = ({ markers }) => {
  const { swiperRef } = useRefContext();
  const map = useSelector((state: RootState) => state.map.map);
  const places = useSelector((state: RootState) => state.places);
  const handleSlideChange = (swiper: SwiperType) => {
    const activePlace = places[swiper.activeIndex];

    if (activePlace && map) {
      const lat = Number(activePlace.location.lat);
      const lng = Number(activePlace.location.lng);

      const newCenter = new google.maps.LatLng(lat, lng);
      map.panTo(newCenter);

      const marker = markers[swiper.activeIndex];
      if (marker) {
        google.maps.event.trigger(marker, "click");
      }
    }
  };
  console.log("places", places);
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
      {
        places.map((place, id) => (
          <SwiperSlide key={id}>
            <Link to={`/place/${place.id}`}>
              <div
                className="mx-auto w-[calc(100%-40px)] rounded-xl bg-white p-5 shadow-md overflow-hidden"
                style={{ cursor: "default" }}
              >
                <div className="flex flex-col gap-[10px] text-md font-medium">
                  <h5 className="text-lg font-bold">{place.displayName}</h5>
                  <p className="distance">
                    {`Lat: ${place.location.lat}, Lng: ${place.location.lng}`}
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default CafeSwiper;
