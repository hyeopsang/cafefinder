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
  const { map, ps, moveToCurrentLocation } = useKakaoMap();
  const { markers, clearMarkers, addMarker } = useMarkers(map!);

  const handleCenterChanged = useCallback(() => {
    setShowReGps(true);
  }, []);
  
  useEffect(() => {
    if (map) {
      kakao.maps.event.addListener(map, "center_changed", handleCenterChanged);
      map.setLevel(5);
      
      return () => {
        kakao.maps.event.removeListener(map, "center_changed", handleCenterChanged);
      };
    }
  }, [map, handleCenterChanged]);
   

  const displayCafeMarkers = async (cafeData: any[]) => {
    if (!map) return;

    const bounds = new kakao.maps.LatLngBounds();

    cafeData.forEach((place, index) => {
      const position = new kakao.maps.LatLng(place.y, place.x);
      bounds.extend(position);
      const positionObj: Position = { La: place.y, Ma: place.x };
      addMarker(positionObj, place, index);
    });

    if (cafeData.length > 2) {
      map.setBounds(bounds);
    }
  };

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
  const searchCafesInBounds = async () => {
    setSearchTxt("");
    if (!map || !ps) return;
    clearMarkers();
    setShowReGps(false);
    const bounds = map.getBounds();
    const swLatLng = bounds.getSouthWest();
    const neLatLng = bounds.getNorthEast();

    const center = map.getCenter(); 

    ps.categorySearch(
      "CE7",
      async (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const cafeData = data.filter((place) => {
            const placePosition = new kakao.maps.LatLng(Number(place.y), Number(place.x));
            return bounds.contain(placePosition);
          });

          const placesWithDistance = await Promise.all(
            cafeData.map(async (place) => {
              const targetLocation = new kakao.maps.LatLng(Number(place.y), Number(place.x));
              const distance =
                getDistanceFromLatLonInKm(
                  center.getLat(),
                  center.getLng(),
                  targetLocation.getLat(),
                  targetLocation.getLng(),
                ) * 1000;
              return { ...place, distance };
            }),
          );
          dispatch(setPlaces(placesWithDistance));
          displayCafeMarkers(placesWithDistance);
        }
      },
      {
        bounds: new kakao.maps.LatLngBounds(swLatLng, neLatLng),
      },
    );
  };

  const handleReGpsSearch = () => {
    searchCafesInBounds();
  };

  

  return (
    <div className="relative h-svh mx-auto min-w-[375px] max-w-[428px] overflow-hidden">
      {menu && <Menu onMenu={setMenu} />}
      <div id="map" style={{ width: "100%", height: "100vh" }} />
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
      <div
        className="absolute right-[30px] top-[180px] z-30 aspect-square w-[40px] rounded-[30px] bg-white shadow-md"
        id="centerOnMyLocation"
        onClick={moveToCurrentLocation}
      >
        <img src={"./images/gps.png"} alt="Center on my location" />
      </div>
      {showReGps && (
        <div className="reGps" onClick={handleReGpsSearch}>
          <p>현재 위치에서 검색</p>
        </div>
      )}
    </div>
  );
}

export default KakaoMap;
