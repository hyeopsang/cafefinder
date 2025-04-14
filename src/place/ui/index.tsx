import { useParams, Link } from "react-router";
import { useSelector } from "react-redux";
import { useState } from "react";
import ReviewModal from "../../ui/review-modal";
import { useReviews } from "../../api"; 
import OtherReview from "./other-review";
import MyReview from "./my-review";
import useReviewColor from "../../utils/useReviewColor";
import { Review, Place } from "../../types";
import PlaceInfo from "./place-info";
import { ChevronLeft } from "lucide-react";
import PhotoPreview from "../../ui/photo-preview";

interface User {
  [key: string]: any;
}

export interface StateType {
  isAuthenticated: boolean;
  user: User | null;
}

export default function PlaceReviewPage() {
  const [isModal, setIsModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const { id } = useParams(); 

  const places = useSelector((state: { places?: Place[] }) => state.places ?? []);
  const auth = useSelector((state: { auth?: User }) => state.auth ?? { user: null });
  const userId = auth?.user?.id ?? null;

  const place = places.find((p) => p.id === id);
  const { data: reviews = [] } = useReviews(place?.id || "");
  const photos = reviews.reduce((acc, review) => {
    if (Array.isArray(review.content.imageUrls) && review.content.imageUrls.length > 0) {
      return [...acc, ...review.content.imageUrls];
    }
    return acc;
  }, []);  
  console.log(photos);
  if (!places.length || !place) {
    return <p>카페 데이터를 불러오는 중입니다...</p>;
  }

  const userReviews = reviews.filter((review) => review.userId === userId);
  const otherReviews = reviews.filter((review) => review.userId !== userId);
  const reviewColor = useReviewColor(reviews);
  console.log(reviewColor)

  const onClickModal = (review: Review | null) => {
    setSelectedReview(review);
    setIsModal(true);
  };
  if (!places || places.length === 0) {
    return <p>카페 데이터를 불러오는 중입니다...</p>;
  }
  console.log(reviews)

  return (
    <div className="h-svh overflow-y-scroll mx-auto flex flex-col min-w-mobile max-w-mobile bg-white font-medium text-base py-3 text-neutral-900">
      <Link to="/">
        <ChevronLeft className="w-10" />
      </Link>
      <PlaceInfo place={place} />
      <div className="w-full flex flex-col gap-2 px-3">
      <PhotoPreview photos={photos} id={place.id} />
      <div className="flex w-full flex-col items-center gap-1 pt-2">
      <h2 className="text-base font-semibold pb-1">리뷰</h2>
      {userId ? (
          <MyReview reviews={userReviews} onClickModal={onClickModal} />
        ) : (
          <div className="w-full flex flex-col gap-2 py-4 items-center border rounded-2xl border-neutral-300">
            <p className="text-slate-600 text-xs pb-2">리뷰를 작성하려면 로그인이 필요해요</p>
            <Link to="/login" className="button-style bg-neutral-900 text-white w-[80%]">로그인 화면으로 이동하기</Link>
          </div>
        )}
        <OtherReview reviews={otherReviews} />
      </div>
      </div>
      {isModal && (
        <ReviewModal
          onClose={() => setIsModal(false)}
          placeId={place.id}
          placeName={place.place_name}
          data={selectedReview}
        />
      )}
    </div>
  );
}
