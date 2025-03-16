import { useCallback, useEffect, useState } from "react";
import { useKakaoMap } from "./utils/useKakaoMap";
import { getCurrentLocation, getDistanceFromLatLonInKm } from "../utils/locationUtils";
import { useDispatch } from "react-redux";
import { setPlaces } from "../app/redux/placesSlice";
import { useMarkers } from "./useMarkers";

export function useSearch(currentLocation : kakao.maps.LatLng){
    const [searchTxt, setSearchTxt] = useState("");
    const { ps, map } = useKakaoMap();
    const dispatch = useDispatch();
    const { displayCafeMarkers } = useMarkers(map!);

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

    return { performSearch }
} 

