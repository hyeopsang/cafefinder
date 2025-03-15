import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRefContext } from "../app/context/RefContext";
import { useCallback } from "react";
import { useKakaoMap } from "./useKakaoMap";
import { useMarkers } from "./useMarkers";
import {
  getCurrentLocation,
  getDistanceFromLatLonInKm,
} from "../../shared/utils/locationUtils";
import { setPlaces } from "../app/redux/placesSlice";
import SearchForm from "../../feature/search-bar/ui";
import { CafeSwiper } from "../widget/cafe-swiper";
import Menu from "../widget/side-bar/Menu";
import "../styles/KakaoMap.css";
import { RootState } from "../app/redux/store";
import { Place } from "../../entity/place/model/Place";
import LocationButton from "./location-button";
import BoundSearch from "./bound-search";
import Map from "./map";
type Position = {
  La: number,
  Ma: number
}

const { kakao } = window;

function KakaoMap() {
  const dispatch = useDispatch();
  const places = useSelector((state: RootState) => state.places) as Place[];
  const [menu, setMenu] = useState(false);
  const [searchTxt, setSearchTxt] = useState("");
  const [showReGps, setShowReGps] = useState(false);
  const { map, ps } = useKakaoMap();
  const { markers, displayCafeMarkers } = useMarkers(map!);
   
  const [currentLocation, setCurrentLocation] = useState<kakao.maps.LatLng | null>(null);
  useEffect(() => {
      async () => {
        const location = await getCurrentLocation() as kakao.maps.LatLng;
        setCurrentLocation(location);
      };
    }, []);

const performSearch = useCallback(async () => {
  if (!ps || !map || !currentLocation) return;

  const keyword = searchTxt.trim();
  ps.keywordSearch(keyword, async (data, status) => {
    if (status === kakao.maps.services.Status.OK) {
      const cafeData = data.filter(
        (place) =>
          place.category_group_code === "CE7" || place.place_name.includes("카페")
      );

      const placesWithDistance = cafeData.map((place) => {
        const targetLocation = new kakao.maps.LatLng(Number(place.y), Number(place.x));
        const distance =
          getDistanceFromLatLonInKm(
            currentLocation.getLat(),
            currentLocation.getLng(),
            targetLocation.getLat(),
            targetLocation.getLng()
          ) * 1000;
        return { ...place, distance };
      });

      dispatch(setPlaces(placesWithDistance));
      displayCafeMarkers(placesWithDistance);
    }
  }, {
    location: map.getCenter(),
    sort: kakao.maps.services.SortBy.DISTANCE,
  });
}, [dispatch, ps, map, displayCafeMarkers, currentLocation]);

  const handleSearch = async () => {
    await performSearch();
  };

  return (
    <div className="relative h-svh mx-auto min-w-[375px] max-w-[428px] overflow-hidden">
      {menu && <Menu onMenu={setMenu} />}
      <Map setShowReGps={setShowReGps}/>
      <SearchForm
        onSearch={handleSearch}
        searchTxt={searchTxt}
        setSearchTxt={setSearchTxt}
        onMenu={setMenu}
      />
      <CafeSwiper
        places={places}
        map={map}
        markers={markers}
      />
      <LocationButton />
      {showReGps && (
        <BoundSearch setSearchTxt={setSearchTxt} setShowReGps={setShowReGps}/>
      )}
    </div>
  );
}

export default KakaoMap;
