import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layout.tsx';
import Home from '@/page/Home.tsx';
import Map from '@/page/Map.tsx';

const RouterInfo = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'map',
        element: <Map />,
      },
    ],
  },
];

export const routes = createBrowserRouter(RouterInfo);
