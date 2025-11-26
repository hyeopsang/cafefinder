import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { fetchUlsanPolygon } from '@/api/FetchUlsanPolygon';

type LatLng = { lat: number; lng: number };

const UlsanPolygonContext = createContext<LatLng[] | undefined>(undefined);

export function UlsanPolygonProvider({ children }: { children: ReactNode }) {
  const [coords, setCoords] = useState<LatLng[] | undefined>(undefined);

  useEffect(() => {
    fetchUlsanPolygon().then(setCoords);
  }, []);

  return <UlsanPolygonContext.Provider value={coords}>{children}</UlsanPolygonContext.Provider>;
}

export function useUlsanPolygon() {
  return useContext(UlsanPolygonContext);
}
