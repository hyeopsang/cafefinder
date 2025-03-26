import { useParams, Link } from "react-router";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReviewModal from "../ui/review-modal";
import { useReviews } from "../api"; 
import OtherReview from "./other-review";
import MyReview from "./my-review";
import useReviewColor from "../utils/useReviewColor";
import { Review, Place } from "../types";
import PlaceInfo from "./place-info";
import { Button } from "../components/ui/button";
import { ChevronLeft } from "lucide-react";

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

  const places = useSelector((state: { places: Place[] }) => state.places);
  const auth = useSelector((state: { auth: User }) => state.auth);
  const userId = auth?.user?.id ?? null;

  const place = places.find((p) => p.id === id);

  const { data: reviews = [] } = useReviews(place?.id || "");

  if (!places.length || !place) {
    return <p>카페 데이터를 불러오는 중입니다...</p>;
  }

  const userReviews = reviews.filter((review) => review.userId === userId);
  const otherReviews = reviews.filter((review) => review.userId !== userId);
  const reviewColor = useReviewColor(reviews);
  console.log(reviewColor);
  const reviewCategories = [
    { label: "맛", color: reviewColor.taste },
    { label: "분위기", color: reviewColor.mood },
    { label: "친절도", color: reviewColor.kind },
    { label: "편안함", color: reviewColor.comfort },
    { label: "와이파이", color: reviewColor.wifi },
    { label: "주차공간", color: reviewColor.parking },
  ];

  const onClickModal = (review: Review | null) => {
    setSelectedReview(review);
    setIsModal(true);
  };

  return (
    <div className="h-svh mx-auto flex flex-col min-w-[375px] max-w-[428px] gap-0 bg-white py-4 text-[#212121]">
      <Link to="/">
      <div className="w-fit flex justify-center p-2 rounded-full bg-buttonRed">
        <ChevronLeft className="text-white" />
      </div>
      </Link>
      <PlaceInfo place={place} />
      <div className="grid grid-cols-3 py-8 px-16 gap-6 text-sm font-bold text-[#212121]">
        {reviewCategories.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <p>{item.label}</p>
            <span className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></span>
          </div>
        ))}
      </div>
      <div className="flex w-full flex-col gap-8 py-4">
        {userId ? (
          <MyReview reviews={userReviews} onClickModal={onClickModal} />
        ) : (
          <div className="flex flex-col gap-2 items-center py-4 border rounded-xl border-neutral-300">
            <p className="text-sm font-medium text-slate-600">리뷰를 작성하려면 로그인이 필요해요!</p>
            <Button asChild className="bg-buttonRed text-white font-normal shadow-none drop-shadow-none">
              <Link to="/login">Login</Link>
            </Button>
          </div>
        )}
        <OtherReview reviews={otherReviews} />
      </div>
      {isModal && (
        <ReviewModal
          setIsModal={setIsModal}
          placeId={place.id}
          placeName={place.place_name}
          data={selectedReview}
        />
      )}
    </div>
  );
}
