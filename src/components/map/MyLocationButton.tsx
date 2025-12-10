import { useMap } from '@vis.gl/react-google-maps';
import Location from '@/assets/location.svg?react';

export default function MyLocationButton({
  position,
}: {
  position: { lat: number; lng: number } | null;
}) {
  const map = useMap();

  const moveToCurrentLocation = () => {
    if (!map || !position) return;
    map.panTo(position);
    map.setZoom(15);
  };

  return (
    <button
      onClick={moveToCurrentLocation}
      className="absolute right-4 bottom-4 z-50 rounded-full bg-white p-2 shadow-md"
    >
      <Location className="h-6 w-6 text-purple-600" />
    </button>
  );
}
