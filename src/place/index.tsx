import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ReviewForm from "./review-form";
import { getReview } from "../api";
import OtherReview from "./other-review";
import MyReview from "./my-review";
import useReviewColor from "../utils/useReviewColor";
import { Review, Place } from "../types";
import PlaceInfo from "./place-info";

interface User {
  [key: string]: any;
}
export interface StateType {
  isAuthenticated: boolean;
  user: User | null;
}

export default function PlaceReviewPage() {
  const [writeModal, setWriteModal] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  let { id } = useParams(); // ✅ useParams()는 문자열 반환

  const places = useSelector((state: { places: Place[] }) => state.places);
  const auth = useSelector((state: { auth: User }) => state.auth);
  const userId = auth?.user?.id ?? null;

  // ✅ 문자열 ID 비교를 위해 find() 사용
  const place = places.find((p) => p.id === id);

  useEffect(() => {
    if (place) {
      getReview(place.id).then((reviews: Review[]) => {
        setReviews(reviews);
      });
    }
  }, [place, writeModal]);

  console.log("Received ID:", id); // ✅ URL에서 가져온 id 확인
  console.log("Places from Redux:", places); // ✅ Redux에서 가져온 places 데이터 확인
  console.log("Matched Place:", place); // ✅ 찾은 place 정보 확인

  if (!places.length || !place) {
    return <p>카페 데이터를 불러오는 중입니다...</p>;
  }

  const userReviews = reviews.filter((review) => review.userId === userId);
  const otherReviews = reviews.filter((review) => review.userId !== userId);
  const reviewColor = useReviewColor(reviews);

  return (
    <div className="h-svh mx-auto grid min-w-[375px] max-w-[428px] grid-cols-1 gap-[30px] bg-white pb-[60px] text-[#212121]">
      <PlaceInfo reviewColor={reviewColor} place={place} />
      <div className="flex w-full flex-col gap-[30px] px-[50px]">
        <MyReview reviews={userReviews} modal={writeModal} setModal={setWriteModal} />
        <OtherReview reviews={otherReviews} />
      </div>
      {writeModal && (
        <ReviewForm setWriteModal={setWriteModal} placeId={place.id} placeName={place.place_name} />
      )}
    </div>
  );
}
