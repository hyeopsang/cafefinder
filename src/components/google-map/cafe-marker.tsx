import { AdvancedMarker } from '@vis.gl/react-google-maps';
import Marker from '@/assets/cafemarker.svg?react';
import { useMarkerStore } from '@/app/zustand/useMarkerStore';
import { cn } from '@/lib/utils';
interface MarkerLocation {
  id: string;
  location: { lat: number; lng: number };

  name: string;
}

interface MapMarkerProps {
  locations: MarkerLocation[];
}

export default function CafeMarker({ locations }: MapMarkerProps) {
  const selectedMarkerId = useMarkerStore((state) => state.selectedMarkerId);
  const setSelectedMarkerId = useMarkerStore((state) => state.setSelectedMarkerId);

  return (
    <>
      {locations.map((marker) => {
        const isSelected = marker.id === selectedMarkerId;

        return (
          <AdvancedMarker
            key={marker.id}
            position={marker.location}
            title={marker.name}
            onClick={() => setSelectedMarkerId(marker.id)}
            zIndex={isSelected ? 100 : 1}
          >
            <Marker
              className={cn(
                'h-10 w-10 transition-transform duration-150',
                isSelected && 'z-500 scale-125',
              )}
            />
          </AdvancedMarker>
        );
      })}
    </>
  );
}
