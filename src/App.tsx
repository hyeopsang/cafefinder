import { RouterProvider } from 'react-router';
import { routes } from './app/routes';
import { RefProvider } from './app/context/RefContext';
import { UlsanPolygonProvider } from './app/context/UlsanPolygonContext';

export default function App() {
  return (
    <UlsanPolygonProvider>
      <RefProvider>
        <RouterProvider router={routes} />
      </RefProvider>
    </UlsanPolygonProvider>
  );
}
