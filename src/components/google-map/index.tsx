import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { useUserLocation } from './useUserLocation';
import UlsanMask from './UlsanMask';
import MyLocationButton from './my-location-button';

interface Props {
  searchText: string;
}

export default function GoogleMap({ searchText }: Props) {
  const currentPosition = useUserLocation();
  const defaultCenter = { lat: 35.539, lng: 129.3114 };

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} libraries={['geometry']}>
      <Map
        defaultCenter={defaultCenter}
        defaultZoom={15}
        mapId={import.meta.env.VITE_GOOGLE_MAPS_ID}
        disableDefaultUI
        gestureHandling="greedy"
        className="h-[calc(100%+22px)] w-full"
      >
        <UlsanMask />
        {currentPosition && <AdvancedMarker position={currentPosition} />}
        <MyLocationButton position={currentPosition} />
      </Map>
    </APIProvider>
  );
}
