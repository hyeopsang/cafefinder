import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/page/Home';
import Map from '@/page/Map';

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
