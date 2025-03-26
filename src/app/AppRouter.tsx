import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import KakaoMap from "../map";
import PlaceReviewPage from "../place";
import Auth from "../kakao-login/logging";
import Login from "../kakao-login/login";
import ReviewList from "../profile/ui/review-list";
import BookMark from "../bookmark/book-mark";
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
          <BookMark />
        ),
      }
    ],
  },
];

export const AppRouter = createBrowserRouter(RouterInfo);
