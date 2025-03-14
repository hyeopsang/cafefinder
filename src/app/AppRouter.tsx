import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import KakaoMap from "../map";
import PlaceReviewPage from "../page/PlaceReview";
import ReviewWrite from "../page/ReviewWrite";
import Auth from "../page/login/Auth";
import Login from "../page/login/Login";
import MyReview from "../page/MyReview";
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
