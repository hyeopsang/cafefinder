import { Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { useUserLocation } from './useUserLocation';
import UlsanMask from './UlsanMask';
import MyLocationButton from './my-location-button';
import { useUlsanBounds } from './useUlsanBounds';

export default function GoogleMap() {
  const currentPosition = useUserLocation();
  const defaultCenter = { lat: 35.539, lng: 129.3114 };
  const ulsanBounds = useUlsanBounds();
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
          strictBounds: false,
        }
      }
      maxZoom={18}
      minZoom={10}
      className="h-[calc(100%+22px)] w-full"
    >
      <UlsanMask />
      {currentPosition && <AdvancedMarker position={currentPosition} />}
      <MyLocationButton position={currentPosition} />
    </Map>
  );
}
