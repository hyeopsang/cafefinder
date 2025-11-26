// router/index.tsx 또는 AppRouter.tsx
import { createBrowserRouter } from 'react-router-dom';
import Auth from '../kakao-login/logging';
import Login from '../kakao-login/login';
import Layout from '@/components/layout';
import Home from '@/page/home';
import MapPage from '@/page/map-page';

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
        element: <MapPage />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'auth/kakao/callback',
        element: <Auth />,
      },
    ],
  },
];

export const routes = createBrowserRouter(RouterInfo);
