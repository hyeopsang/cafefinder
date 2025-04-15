// router/index.tsx 또는 AppRouter.tsx
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import KakaoMap from "../map";
import PhotoTab from "../place/ui/photo-tab";
import ReviewTab from "../place/ui/review-tab";
import PlaceLayoutPage from "../place/ui";
import Auth from "../kakao-login/logging";
import Login from "../kakao-login/login";
import ReviewList from "../profile/ui/review-list";
import LikeList from "../Like/like-list";

const RouterInfo = [
  {
    path: "/",
    children: [
      {
        index: true,
        element: <KakaoMap />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "auth/kakao/callback",
        element: <Auth />,
      },
      {
        path: "my-review",
        element: (
          <ProtectedRoute>
            <ReviewList />
          </ProtectedRoute>
        ),
      },
      {
        path: "book-mark",
        element: <LikeList />,
      },
      {
        path: "place/:id",
        element: <PlaceLayoutPage />, // 탭과 함께 공통 레이아웃 제공
        children: [
          {
            index: true,
            element: <ReviewTab />, // 기본 탭은 리뷰로 설정
          },
          {
            path: "review",
            element: <ReviewTab />,
          },
          {
            path: "photo",
            element: <PhotoTab />,
          },
        ],
      },
    ],
  },
];

export const AppRouter = createBrowserRouter(RouterInfo);
