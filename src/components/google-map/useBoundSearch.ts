import { useMap } from "@vis.gl/react-google-maps";
import { useMarkerStore } from "@/app/zustand/useMarkerStore";

export function useBoundSearch() {
    const setMarker = useMarkerStore((state) => state.setMarkers)
    const addMarker = useMarkerStore((state) => state.addMarker);
    const map = useMap();

    const searchInBounds = async () => {
        if (!map) return;

        const bounds = map.getBounds();
        if (!bounds) return;
        const { Place } = (await google.maps.importLibrary("places")) as any;
        setMarker([])
        const request = {
            textQuery: "카페",
            fields: ['id', 'location'],
            includedType: 'cafe',
            useStrictTypeFiltering: true,
            locationRestriction: bounds,
            language: 'ko',
            region: 'kr',
            maxResultCount: 5,
            };
        try {
            const { places } = await Place.searchByText(request);
            places.forEach((place: any) => {
            addMarker({
                id: place.id,
                location: place.location,
            });
            });
            console.log(places);

        } catch (error) {
        console.error("검색 에러:", error);
        throw error;
        }
  };

  return { searchInBounds };
}
