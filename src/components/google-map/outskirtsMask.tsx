import { useEffect } from 'react';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { fetchUlsanPolygon } from '@/api/FetchUlsanPolygon';

export default function UlsanMask() {
  const map = useMap();
  const geometry = useMapsLibrary('geometry');

  useEffect(() => {
    if (!map || !geometry) return;

    const load = async () => {
      const ulsan = await fetchUlsanPolygon();

      const worldBounds = [
        { lat: 43, lng: 124 },
        { lat: 43, lng: 132 },
        { lat: 33, lng: 132 },
        { lat: 33, lng: 124 },
      ];
      const ulsanReverse = ulsan.reverse();

      new google.maps.Polygon({
        paths: [worldBounds, ulsanReverse],
        strokeOpacity: 0,
        fillColor: '#000000',
        fillOpacity: 0.4,
        clickable: false,
        map,
      });
    };

    load();
  }, [map, geometry]);

  return null;
}
