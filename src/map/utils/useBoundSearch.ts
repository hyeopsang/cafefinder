import { useMarkers } from "./useMarkers";
import { getDistanceFromLatLonInKm } from "../../utils/getDistanceFromLatLonInKm";
import { useDispatch, useSelector } from "react-redux";
import { setPlaces } from "../../app/redux/placesSlice";
import { RootState } from "../../app/redux/store";
import { useCallback, useEffect } from "react";

export function useBoundSearch(
  setShowReGps: React.Dispatch<React.SetStateAction<boolean>>
) {
  const dispatch = useDispatch();
  const map = useSelector((state: RootState) => state.map.map);
  const { clearMarkers, displayCafeMarkers } = useMarkers();

  const handleMapMove = () => {
    setShowReGps(true);
  };

  useEffect(() => {
    if (!map) return; // 🛑 map이 없으면 실행하지 않음

    console.log("🗺️ 지도 이동 감지 시작!");
    map.addListener("dragend", handleMapMove);

    // ✅ 언마운트 시 리스너 제거 (clean-up)
    return () => {
      google.maps.event.clearListeners(map, "dragend");
      console.log("🧹 지도 이동 감지 해제!");
    };
  }, [map, handleMapMove]); // ✅ map 또는 handleMapMove가 변경될 때 실행

  const searchCafesInBounds = useCallback(async () => {
    setShowReGps(false);
  
    if (!map) return;
  
    clearMarkers();
    const center = map.getCenter();
    const { SearchNearbyRankPreference } = await google.maps.importLibrary('places') as google.maps.PlacesLibrary;
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    const request = {
      fields: ["displayName", "location"],
      locationRestriction: {
        center: center,
        radius: 500,
      },
      includedPrimaryTypes: ["cafe"],
      maxResultCount: 5,
      rankPreference: SearchNearbyRankPreference.DISTANCE,
      language: "kr",
      region: "kr",

    };
  
    const { places } = await google.maps.places.Place.searchNearby(request);
  
    if (places.length) {
      const { LatLngBounds } = await google.maps.importLibrary("core") as google.maps.CoreLibrary;
      const bounds = new google.maps.LatLngBounds();
  
      const placesWithDistance = places.forEach((place) => {
        new AdvancedMarkerElement({
            map,
            position: place.location,
            title: place.displayName,
        });

        bounds.extend(place.location as google.maps.LatLng);
        console.log(place);
        const placeData = {
          id: place.id,
          displayName: place.displayName,
          location: place.location,
        };
        dispatch(setPlaces([placeData]));
        displayCafeMarkers([placeData]);
    });
    console.log(placesWithDistance);
      map.fitBounds(bounds);
    } else {
      console.log("No results");
    }
  }, [map, dispatch, clearMarkers, displayCafeMarkers, setShowReGps]); 
  

  return { searchCafesInBounds, handleMapMove };
}
