import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { useState } from "react";
import { useReviews } from "../../api";
import ReviewModal from "../../ui/review-modal";
import MyReview from "./my-review";
import OtherReview from "./other-review";
import { Review } from "../../types";
import { Link } from "react-router-dom";
import { Place } from "../../types";
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
  interface MenuProps {
    onClose: () => void;
  }
  
  interface AuthState {
    user: User | null;
  }


export default function ReviewTab() {
  const { id } = useParams();
  const places = useSelector((state: { places?: Place[] }) => state.places ?? []);
  const auth = useSelector((state: { auth?: User }) => state.auth ?? { user: null });
  const userId = auth?.user?.id ?? null;
  const place = places.find((p) => p.id === id);
  const { data: reviews = [], isLoading, error } = useReviews(place?.id || "");

  const [isModal, setIsModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  // Filter reviews based on userId
  const userReviews = reviews.filter((review) => review.userId === userId);
  const otherReviews = reviews.filter((review) => review.userId !== userId);

  // Modal toggle function
  const onClickModal = (review: Review | null) => {
    setSelectedReview(review);
    setIsModal(true);
  };

  if (isLoading) return <div className="p-4">리뷰를 불러오는 중입니다...</div>;
  if (error) return <div className="p-4 text-red-500">에러가 발생했습니다.</div>;

  return (
    <div className="flex flex-col items-center bg-neutral-300 gap-2">
      {userId ? (
        <MyReview reviews={userReviews} onClickModal={onClickModal} />
      ) : (
        <div className="w-full p-4 flex flex-col items-left gap-2 text-base font-semibold bg-white">
            <div className="w-full h-[100px] flex justify-center gap-4 items-center overflow-hidden">
              <p>로그인하고<br/><span className="text-blue-600 w-1/2">{place.place_name}</span>에서<br/> 경험을 나눠주세요!</p>
              <img className="w-1/2" src="/images/review.png"/>
            </div>
            
            <Link to="/login" className="mx-auto w-full text-blue-500 text-sm font-normal bg-blue-100 button-style">
            로그인 화면으로 이동하기
          </Link>
          </div>
      )}
      <OtherReview reviews={otherReviews} />

      {/* ReviewModal will always be rendered, it will be empty when not active */}
      {isModal && selectedReview && (
        <ReviewModal onClose={() => setIsModal(false)} placeId={id!} placeName="" data={selectedReview} />
      )}
    </div>
  );
}

