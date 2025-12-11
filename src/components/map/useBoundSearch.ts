import { useMap } from "@vis.gl/react-google-maps";
import { useMarkerStore } from "@/app/zustand/useMarkerStore";

const ULSA_ADDRESS_PREFIX = '울산광역시';

export function useBoundSearch() {
    const setMarker = useMarkerStore((state) => state.setMarkers)
    const addMarker = useMarkerStore((state) => state.addMarker);
    const map = useMap();
    

    const searchInBounds = async () => {
        if (!map) return []; 

        const currentBounds = map.getBounds();
        if (!currentBounds) return [];
        
        const { Place } = (await google.maps.importLibrary("places")) as any;
        setMarker([])
        
        const request = {
            textQuery: "카페",
            fields: ['id', 'location', 'formattedAddress'], 
            includedType: 'cafe',
            useStrictTypeFiltering: true,
            
            locationRestriction: currentBounds, 
            
            language: 'ko',
            region: 'kr',
            maxResultCount: 10,
            };
            
        try {
            const { places } = await Place.searchByText(request);
            console.log(places)
            const filteredPlaces = places.filter((place: any) => {
                const address = place.formattedAddress;
                
                if (address && address.startsWith(ULSA_ADDRESS_PREFIX)) {
                    return true;
                }
                return false;
            });
            
            filteredPlaces.forEach((place: any) => {
            addMarker({
                id: place.id,
                location: place.location,
            });
            });
            
            console.log(
                "총 검색 결과:", places.length, 
                " / 울산 주소 필터링 결과:", filteredPlaces.length
            );

            return filteredPlaces; 

        } catch (error) {
        console.error("검색 에러:", error);
        throw error;
        }
  };

  return { searchInBounds };
}