import { useEffect, useState } from 'react';
import { fetchUlsanPolygon } from '@/api/FetchUlsanPolygon';

type LatLng = { lat: number; lng: number };

export function useUlsanBounds() {
  const [bounds, setBounds] = useState<google.maps.LatLngBoundsLiteral | null>(null);

  useEffect(() => {
    const load = async () => {
      const ulsan: LatLng[] = await fetchUlsanPolygon();

      const lats = ulsan.map((c) => c.lat);
      const lngs = ulsan.map((c) => c.lng);

      setBounds({
        north: Math.max(...lats) + 0.05,
        south: Math.min(...lats) - 0.1,
        east: Math.max(...lngs) + 0.05,
        west: Math.min(...lngs) - 0.05,
      });
    };
    load();
  }, []);

  return bounds;
}
