import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import KakaoMap from "../map";
import PlaceReviewPage from "../place";
import ReviewWrite from "../place/review-form";
import Auth from "../kakao-login/logging";
import Login from "../kakao-login/login";
import MyReview from "../profile/my-review";
const RouterInfo = [
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "/map",
        element: (
          <ProtectedRoute>
            <KakaoMap />
          </ProtectedRoute>
        ),
      },
      {
        path: "/myreview",
        element: (
          <ProtectedRoute>
            <MyReview />
          </ProtectedRoute>
        ),
      },
      {
        path: "/auth/kakao/callback",
        element: <Auth />,
      },
      {
        path: "/map/detail/:id",
        element: (
          <ProtectedRoute>
            <PlaceReviewPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/map/review-write",
        element: (
          <ProtectedRoute>
            <ReviewWrite setWriteModal={() => {}} placeId="somePlaceId" placeName="somePlaceName" />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

export const AppRouter = createBrowserRouter(RouterInfo);
