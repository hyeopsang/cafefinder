import { useEffect } from "react";
import { useMarkers } from "./useMarkers";
import { getDistanceFromLatLonInKm } from "../../utils/getDistanceFromLatLonInKm";
import { useDispatch } from "react-redux";
import { setPlaces } from "../../app/redux/placesSlice";
import { useSelector } from "react-redux";
import { useMapContext } from "../../app/context/MapContext";
import { usePlaceContext } from "../../app/context/PlaceContext";
export function useBoundSearch(
  setShowReGps: React.Dispatch<React.SetStateAction<boolean>>
) {
  const dispatch = useDispatch();
  const { map, setMap } = useMapContext();
  const { place, setPlace } = usePlaceContext();
  const { clearMarkers, displayCafeMarkers } = useMarkers();
  const handleMapMove = () => {
    setShowReGps(true);
  };
  useEffect(() => {
    if (!map) return;

    kakao.maps.event.addListener(map, "center_changed", handleMapMove);

    return () => {
      kakao.maps.event.removeListener(map, "center_changed", handleMapMove);
    };
  }, [map]);

  const searchCafesInBounds = () => {
    
    setShowReGps(false)

    if (!map || !place) return;
    clearMarkers();
    setShowReGps(false)
    const bounds = map.getBounds();
    const swLatLng = bounds.getSouthWest();
    const neLatLng = bounds.getNorthEast();
    const center = map.getCenter();

    place.categorySearch(
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
                  targetLocation.getLng()
                ) * 1000;
              return { ...place, distance };
            })
          );

          dispatch(setPlaces(placesWithDistance));
          displayCafeMarkers(placesWithDistance);
        }
      },
      {
        bounds: new kakao.maps.LatLngBounds(swLatLng, neLatLng),
      }
    );
  };

  return { searchCafesInBounds };
}
