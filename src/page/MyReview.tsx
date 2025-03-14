import "../styles/MyReview.css";
import { Link } from "react-router";
import { useUserReviews } from "../entity/review";
import { useSelector } from "react-redux";

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
  const formatTimestamp = (timestamp: any) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    return date.toLocaleString(); 
  };
  

  return (
    <div className="min-w-[375px] max-w-[428px] h-svh">
      <Link to={"/map"}>
        <img src={"./images/back.png"} />
      </Link>
      <h2>내가 쓴 리뷰</h2>
      {reviews && reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id}>
            <p className="placeName">{review.content.placeName}</p>
            <p>{formatTimestamp(review.createdAt)}</p>
            <p>{review.content.text || "No text"}</p>
          </div>
        ))
      ) : (
        <div>작성된 리뷰가 없어요ㅠ</div>
      )}
    </div>
  );
}
