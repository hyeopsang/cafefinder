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

      // 전세계 큰 사각형
      const worldBounds = [
        { lat: 43, lng: 124 }, // 북서
        { lat: 43, lng: 132 }, // 북동
        { lat: 33, lng: 132 }, // 남동
        { lat: 33, lng: 124 }, // 남서
      ];

      // worldBounds 면적 확인
      const worldLatLngs = worldBounds.map((coord) => new google.maps.LatLng(coord.lat, coord.lng));
      const worldArea = google.maps.geometry.spherical.computeSignedArea(worldLatLngs);

      // ulsan 면적 확인
      const ulsanLatLngs = ulsan.map((coord) => new google.maps.LatLng(coord.lat, coord.lng));
      const ulsanArea = google.maps.geometry.spherical.computeSignedArea(ulsanLatLngs);

      console.log('worldBounds 면적:', worldArea);
      console.log('울산 폴리곤 면적:', ulsanArea);

      const ulsanReverse = ulsan.reverse();

      const mask = new google.maps.Polygon({
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
