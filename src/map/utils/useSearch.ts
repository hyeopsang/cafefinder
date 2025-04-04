import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/redux/store";
import { setPlaces } from "../../app/redux/placesSlice";
import { useDispatch } from "react-redux";
export function useSearch() {
  const dispatch = useDispatch();
  const [searchTxt, setSearchTxt] = useState(""); // 검색어 상태 추가
  const [loading, setLoading] = useState(false);
  const places = useSelector((state: RootState) => state.places);
  const map = useSelector((state: RootState) => state.map.map);
  const performSearch = useCallback(async (searchTxt: string, currentLocation: google.maps.LatLng) => {
    if (!searchTxt || !currentLocation) {
      console.warn("검색어 또는 현재 위치가 없습니다.");
      return;
    }

    setLoading(true);
    try {
      // Google Maps 라이브러리 불러오기
      const placesLib = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
      const markerLib = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
      const coreLib = await google.maps.importLibrary("core") as google.maps.CoreLibrary;

      if (!placesLib || !markerLib || !coreLib) {
        throw new Error("Google Maps 라이브러리 로드 실패");
      }

      const { Place } = placesLib;
      const { AdvancedMarkerElement } = markerLib;
      const { LatLngBounds } = coreLib;

      const request = {
        textQuery: searchTxt,
        fields: ["displayName", "location"],
        includedType: "cafe",
        locationBias: currentLocation,
        isOpenNow: true,
        language: "ko",
        maxResultCount: 8,
        minRating: 3.2,
        region: "kr",
      };

      //@ts-ignore
      const { places } = await Place.searchByText(request);
      if (places.length) {
        console.log(places);
        const mappedPlaces = places.map((place) => ({
          id: place.id,
          displayName: place.displayName,
          location: place.location,
        }));
        dispatch(setPlaces(mappedPlaces));

        if (!map) {
          console.warn("맵이 로드되지 않았습니다.");
          return;
        }

        const bounds = new LatLngBounds();
        places.forEach((place) => {
          new AdvancedMarkerElement({
            map,
            position: place.location,
            title: place.displayName,
          });
          bounds.extend(place.location as google.maps.LatLng);
        });

        map.fitBounds(bounds);
      } else {
        console.log("검색 결과 없음");
      }
    } catch (error) {
      console.error("검색 오류:", error);
    } finally {
      setLoading(false);
    }
  }, [map]);

  return { performSearch, searchTxt, setSearchTxt };
}
