import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { useUserLocation } from './useUserLocation';
import { useUlsanBounds } from './useUlsanBounds';
import { useCenterCache } from './useCenterCache';

import UlsanMask from './outskirtsMask';
import MyLocationButton from './my-location-button';

export default function GoogleMap() {
  const currentPosition = useUserLocation();
  const ulsanBounds = useUlsanBounds();
  const lastCenterRef = useCenterCache(); // 사용은 다음 단계에 가능

  const defaultCenter = { lat: 35.539, lng: 129.3114 };

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={['geometry']}>
      <div className="relative">
        <Map
          defaultCenter={defaultCenter}
          defaultZoom={15}
          restriction={
            ulsanBounds && {
              latLngBounds: ulsanBounds,
              strictBounds: true,
            }
          }
          mapId={import.meta.env.VITE_GOOGLE_MAPS_ID}
          disableDefaultUI
          gestureHandling="greedy"
          className="h-dvh w-full"
        >
          <UlsanMask />
          {currentPosition && <AdvancedMarker position={currentPosition} />}
          <MyLocationButton position={currentPosition} />
        </Map>
      </div>
    </APIProvider>
  );
}
