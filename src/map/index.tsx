import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useMarkers } from "./useMarkers";
import { getCurrentLocation } from "../utils/locationUtils";
import SearchForm from "../search-bar";
import { CafeSwiper } from "../widget/cafe-swiper";
import Menu from "../widget/side-bar/Menu";
import "../styles/KakaoMap.css";
import { RootState } from "../app/redux/store";
import { Place } from "../types/place-type";
import LocationButton from "./ui/location-button";
import BoundSearch from "./ui/bound-search";
import Map from "./ui/map";
type Position = {
  La: number,
  Ma: number
}

function KakaoMap() {
  const places = useSelector((state: RootState) => state.places) as Place[];
  const map = useSelector((state: kakao.maps.Map) => state);
  const [menu, setMenu] = useState(false);
  const [searchTxt, setSearchTxt] = useState("");
  const [showReGps, setShowReGps] = useState(true);
  const { markers } = useMarkers();
   
  const [currentLocation, setCurrentLocation] = useState<kakao.maps.LatLng | null>(null);
  useEffect(() => {
      async () => {
        const location = await getCurrentLocation() as kakao.maps.LatLng;
        setCurrentLocation(location);
      };
    }, []);

  return (
    <div className="relative h-svh mx-auto min-w-[375px] max-w-[428px] overflow-hidden">
      {menu && <Menu onMenu={setMenu} />}
      <Map setShowReGps={setShowReGps}/>
      <SearchForm
        searchTxt={searchTxt}
        setSearchTxt={setSearchTxt}
        onMenu={setMenu}
        currentLocation={currentLocation!}
      />
      <CafeSwiper
        places={places}
        map={map}
        markers={markers}
      />
      <LocationButton />
        <BoundSearch setSearchTxt={setSearchTxt} setShowReGps={setShowReGps} showReGps={showReGps}/>
    </div>
  );
}

export default KakaoMap;
