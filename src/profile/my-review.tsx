import "../styles/MyReview.css";
import { Link } from "react-router";
import { useUserReviews } from "../api";
import { useSelector } from "react-redux";
import { back } from "./assets";
import { formatTime } from "../utils/fomattedTime";
interface User {
  [key: string]: any;
}
interface StateType {
  isAuthenticated: boolean;
  user: User | null;
  auth: {
    user: User | null;
  };
}
interface AuthState {
  user: User | null;
}

export default function MyReview() {
  const auth: AuthState = useSelector((state: StateType) => state.auth);
  const userId = auth.user?.id;

  const { data: reviews, isLoading, error } = useUserReviews(userId); // userId에 해당하는 리뷰만 가져오기
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading reviews: {error.message}</div>;
  

  return (
    <div className="min-w-[375px] max-w-[428px] h-svh">
      <Link to={"/map"}>
        <img src={"./images/back"} />
      </Link>
      <h2>내가 쓴 리뷰</h2>
      {reviews && reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id}>
            <p className="placeName">{review.content.placeName}</p>
            <p>{formatTime(review.createdAt)}</p>
            <p>{review.content.text || "No text"}</p>
          </div>
        ))
      ) : (
        <div>작성된 리뷰가 없어요ㅠ</div>
      )}
    </div>
  );
}
