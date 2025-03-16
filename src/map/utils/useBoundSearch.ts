import { useKakaoMap } from "./useKakaoMap";
import { useMarkers } from "./useMarkers";
import { getDistanceFromLatLonInKm } from "../utils/locationUtils";
import { useDispatch } from "react-redux";
import { setPlaces } from "../app/redux/placesSlice";

export function useBoundSearch(setSearchTxt: React.Dispatch<React.SetStateAction<string>>, setShowReGps: React.Dispatch<React.SetStateAction<boolean>>) {
    const dispatch = useDispatch();
    const { map, ps } = useKakaoMap();
    const { clearMarkers } = useMarkers(map!);

    const searchCafesInBounds = () => {
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
