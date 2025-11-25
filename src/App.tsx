import { RouterProvider } from 'react-router';
import { routes } from './app/routes';
import { RefProvider } from './app/context/RefContext';

export default function App() {
  return (
    <RefProvider>
      <RouterProvider router={routes} />
    </RefProvider>
  );
}
