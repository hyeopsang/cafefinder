import { useEffect, useState } from 'react';
import { Map, AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import { useUserLocation } from './useUserLocation';
import UlsanMask from './UlsanMask';
import MyLocationButton from './MyLocationButton';
import { useUlsanBounds } from './useUlsanBounds';
import CafeMarker from './CafeMarker';
import { useMarkerStore } from '@/app/zustand/useMarkerStore';
import BoundSearchButton from './BoundSearchButton';
import MapWithCluster from './MapWithCluster';

export default function GoogleMap() {
  const markers = useMarkerStore((state) => state.markers);
  const currentPosition = useUserLocation();
  const defaultCenter = { lat: 35.539, lng: 129.3114 };
  const ulsanBounds = useUlsanBounds();
  const map = useMap();
  const [showMarker, setShowMarker] = useState(true);

  useEffect(() => {
    if (!map) return;

    const listener = map.addListener('zoom_changed', () => {
      const currentZoom = map.getZoom();
      if (!currentZoom) return;

      setShowMarker(currentZoom >= 12);
    });

    return () => google.maps.event.removeListener(listener);
  }, [map]);
  return (
    <Map
      defaultCenter={defaultCenter}
      defaultZoom={15}
      mapId={import.meta.env.VITE_GOOGLE_MAPS_ID}
      disableDefaultUI
      gestureHandling="greedy"
      restriction={
        ulsanBounds && {
          latLngBounds: ulsanBounds,
          strictBounds: true,
        }
      }
      clickableIcons={false}
      maxZoom={18}
      minZoom={10}
      className="h-[calc(100%+22px)] w-full"
    >
      <UlsanMask />
      {currentPosition && <AdvancedMarker position={currentPosition} />}
      <MyLocationButton position={currentPosition} />
      <BoundSearchButton />
      {showMarker && <CafeMarker locations={markers} />}
      {!showMarker && <MapWithCluster locations={markers.map((m) => m.location)} />}
    </Map>
  );
}
