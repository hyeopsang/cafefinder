import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import KakaoMap from "../map";
import PlaceReviewPage from "../place/ui";
import Auth from "../kakao-login/logging";
import Login from "../kakao-login/login";
import ReviewList from "../profile/ui/review-list";
import LikeList from "../Like/like-list";
import Photo from "../ui/photo-page";
const RouterInfo = [
  {
    path: "/",
    children: [
      {
        path: "/",
        index: true,
        element: (
            <KakaoMap />
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/my-review",
        element: (
          <ProtectedRoute>
            <ReviewList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/auth/kakao/callback",
        element: <Auth />,
      },
      {
        path: "/place/:id",
        element: (
          <PlaceReviewPage />
        ),
      },
      {
        path: "/book-mark",
        element: (
          <LikeList />
        ),
      },
      {
        path: "/place/:id/photo",
        element: (
          <Photo />
        )
      }
    ],
  },
];

export const AppRouter = createBrowserRouter(RouterInfo);
