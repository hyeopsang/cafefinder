import { useEffect, useState } from 'react';
import { useMap } from '@vis.gl/react-google-maps';
import { useBoundSearch } from './useBoundSearch';
import { cn } from '@/lib/utils';
export default function BoundSearchButton() {
  const { searchInBounds } = useBoundSearch();
  const [mapCenter, setMapCenter] = useState(false);
  const map = useMap();

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
        'absolute top-20 left-1/2 z-50 -translate-x-1/2 rounded-full bg-white px-5 py-2 text-xs font-semibold text-purple-600 opacity-60 hover:opacity-100 hover:shadow-xs',
        mapCenter && 'hidden',
      )}
      onClick={searchInBounds}
    >
      현재 위치 검색
    </button>
  );
}
