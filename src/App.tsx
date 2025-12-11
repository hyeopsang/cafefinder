import { RouterProvider } from 'react-router';
import { routes } from '@/app/Routes';
import { UlsanPolygonProvider } from './app/context/UlsanPolygonContext';
import { APIProvider } from '@vis.gl/react-google-maps';

export default function App() {
  return (
    <UlsanPolygonProvider>
      <APIProvider
        apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        libraries={['geometry', 'places']}
      >
        <RouterProvider router={routes} />
      </APIProvider>
    </UlsanPolygonProvider>
  );
}
