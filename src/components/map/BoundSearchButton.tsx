import { useEffect, useState } from 'react';
import { useMap } from '@vis.gl/react-google-maps';
import { useBoundSearch } from './useBoundSearch';
import { cn } from '@/lib/utils';
import { fetchPlaceDetails } from '@/api/placeApi';
import { useMarkerStore } from '@/app/zustand/useMarkerStore';
import { usePlaceStore } from '@/app/zustand/usePlaceStore';
export default function BoundSearchButton() {
  const { setPlaces, openListModal, places } = usePlaceStore((state) => state);
  const { searchInBounds } = useBoundSearch();
  const [mapCenter, setMapCenter] = useState(false);
  const map = useMap();
  const handleSearchBounds = async () => {
    const filteredPlaces = await searchInBounds();
    console.log('A. searchInBounds 결과 (filteredPlaces):', filteredPlaces);
    if (!filteredPlaces || filteredPlaces.length === 0) {
      setPlaces([]);
      openListModal();
      return;
    }

    const markerIds = filteredPlaces.map((place: any) => place.id);

    if (markerIds.length > 0) {
      try {
        const Place = await fetchPlaceDetails(markerIds);
      } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
        setPlaces([]);
      }
    }
    openListModal();
  };

  useEffect(() => {
    if (!map) return;

    const handleDragStart = () => setMapCenter(true);
    const handleIdle = () => setMapCenter(false);

    map.addListener('dragstart', handleDragStart);
    map.addListener('idle', handleIdle);

    return () => {
      google.maps.event.clearListeners(map, 'dragstart');
      google.maps.event.clearListeners(map, 'idle');
    };
  }, [map]);

  return (
    <button
      className={cn(
        'absolute top-20 left-1/2 z-50 -translate-x-1/2 rounded-full bg-white px-5 py-2 text-xs font-semibold text-purple-600 opacity-60 hover:opacity-100 hover:shadow-xs active:opacity-100 active:hover:shadow-xs',
        mapCenter && 'hidden',
      )}
      onClick={handleSearchBounds}
    >
      현재 위치 검색
    </button>
  );
}
