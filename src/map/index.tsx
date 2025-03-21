import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/redux/store";
import { Place } from "../types/place-type";
import { useMarkers } from "./utils/useMarkers";
import { useInitializeMap } from "./utils/useInitializeMap";
import { useCurrentLocation } from "./utils/useCurrentLocation"
import SearchBar from "./ui/search-bar";
import CafeSwiper from "./ui/cafe-swiper";
import Menu from "../widget/side-bar/Menu";
import "../styles/KakaoMap.css";
import LocationButton from "./ui/location-button";
import BoundSearch from "./ui/bound-search";
import Map from "./ui/map";

function KakaoMap() {
  useInitializeMap();
  const places = useSelector((state: RootState) => state.places) as Place[];
  const [menu, setMenu] = useState(false);
  const [showReGps, setShowReGps] = useState(false);
  const { markers } = useMarkers();
  const currentLocation = useCurrentLocation();
  console.log(places)
  return (
    <div className="relative h-svh mx-auto min-w-[375px] max-w-[428px] overflow-hidden">
      {menu && <Menu onMenu={setMenu} />}
      <Map />
      <SearchBar
        onMenu={setMenu}
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
