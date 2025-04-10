import { useParams, Link } from "react-router";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReviewModal from "../../ui/review-modal";
import { useReviews } from "../../api"; 
import OtherReview from "./other-review";
import MyReview from "./my-review";
import useReviewColor from "../../utils/useReviewColor";
import { Review, Place } from "../../types";
import PlaceInfo from "./place-info";
import { Button } from "../../components/ui/button";
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
    <div className="h-svh mx-auto flex flex-col min-w-mobile max-w-mobile bg-white text-sm p-3 text-[#212121]">
      <Link to="/">
        <ChevronLeft className="text-neutral-900" />
      </Link>
      <div className="w-full flex flex-col gap-6 p-3">
      <PlaceInfo place={place} />
      <PhotoPreview photos={photos} />
      <div className="flex w-full flex-col items-center gap-4 pt-2">
        <h2 className="text-sm font-semibold">리뷰</h2>
        {userId ? (
          <MyReview reviews={userReviews} onClickModal={onClickModal} />
        ) : (
          <div className="w-full flex flex-col gap-2 py-7 items-center border rounded-2xl border-neutral-300">
            <p className="font-medium text-slate-600 text-xs pb-2">리뷰를 작성하려면 로그인이 필요해요</p>
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
