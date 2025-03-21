import { useCallback, useEffect, useState } from "react";
import { getDistanceFromLatLonInKm } from "../../utils/getDistanceFromLatLonInKm";
import { useDispatch } from "react-redux";
import { setPlaces } from "../../app/redux/placesSlice";
import { useMarkers } from "./useMarkers";
import { useMapContext } from "../../app/context/MapContext";
import { usePlaceContext } from "../../app/context/PlaceContext";

export function useSearch(currentLocation: kakao.maps.LatLng) {
  const [searchTxt, setSearchTxt] = useState("");
  const { map, setMap } = useMapContext();
  const { place, setPlace } = usePlaceContext();
  const dispatch = useDispatch();
  const { displayCafeMarkers } = useMarkers();

  const performSearch = useCallback(async () => {
    if (!place || !map || !currentLocation) return;
  
    const keyword = searchTxt.trim();
    console.log("Searching with keyword: ", keyword); // 검색 키워드가 제대로 전달되는지 확인
  
    place.keywordSearch(keyword, (data, status) => {
      console.log("API Response:", data, status); // API 응답을 확인
      if (status === kakao.maps.services.Status.OK) {
        const cafeData = data.filter(
          (place) =>
            place.category_group_code === "CE7" || place.place_name.includes("카페")
        );
        console.log("Filtered cafeData:", cafeData); // 필터링된 카페 데이터 확인
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
      } else {
        console.log("API call failed with status: ", status); // 실패 시 상태 확인
      }
    }, {
      location: map.getCenter(),
      sort: kakao.maps.services.SortBy.DISTANCE,
    });
  }, [dispatch, place, map, displayCafeMarkers, currentLocation, searchTxt]);
  
  console.log("performSearch: ", performSearch);  // performSearch가 제대로 반환되는지 확인

  return { performSearch, setSearchTxt, searchTxt };
}
