import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/redux/store";
import { Place } from "./types/index";
import { useMarkers } from "./utils/useMarkers";
import { useCurrentLocation } from "./utils/useCurrentLocation"
import SearchBar from "./ui/search-bar";
import CafeSwiper from "./ui/cafe-swiper";
import Menu from "../widget/side-bar/Menu";
import LocationButton from "./ui/location-button";
import BoundSearch from "./ui/bound-search";
import Map from "./ui/map";

let map: google.maps.Map | null = null; // 전역 변수로 선언
let center: google.maps.LatLng | null = null; // 전역 변수로 선언

function KakaoMap() {
  const places = useSelector((state: RootState) => state.places);
  const [isOpen, setIsOpen] = useState(false);
  const [showReGps, setShowReGps] = useState(false);
  const { markers } = useMarkers();
  const currentLocation = useCurrentLocation();
  return (
    <div className="relative h-svh mx-auto min-w-[375px] max-w-[428px] overflow-hidden">
      {isOpen && <Menu isOpen={isOpen} setIsOpen={setIsOpen}/>}
      <Map />
      <SearchBar
        setIsOpen={setIsOpen}
        currentLocation={currentLocation!}
      />
      <div className="absolute bottom-5 w-full h-fit bg-white">
        <CafeSwiper
          places={places}
          markers={markers}
        />
      </div>
      
      <LocationButton />
      <BoundSearch setShowReGps={setShowReGps} showReGps={showReGps} />
    </div>
  );
}

export default KakaoMap;
