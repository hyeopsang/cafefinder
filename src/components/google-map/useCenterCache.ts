import { useEffect, useRef } from 'react';
import { useMap } from '@vis.gl/react-google-maps';

export function useCenterCache() {
  const map = useMap();
  const lastCenterRef = useRef<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (!map) return;

    const listener = map.addListener('idle', () => {
      const c = map.getCenter();
      lastCenterRef.current = { lat: c.lat(), lng: c.lng() };
    });

    return () => listener.remove();
  }, [map]);

  return lastCenterRef;
}
