import { Review } from "../../types";
import ReviewItem from "../../ui/review-item";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { Place } from "../../types";
interface MyReviewProps {
    reviews: Review[];
    onClickModal: (boolean) => void;
  }

export default function MyReview ({reviews, onClickModal} : MyReviewProps) {
  const { id } = useParams();
  const places = useSelector((state: { places?: Place[] }) => state.places ?? []);
  const place = places.find((p) => p.id === id);
    return (
        <>
        {reviews.length > 0 ? (
          <div className="flex w-full flex-col gap-2 text-center">
            {reviews.map((review, id) => (
              <ReviewItem key={id} review={review} onOpen={() => onClickModal(review)}/>
            ))}
          </div>
        ) : (
          <div className="w-full p-4 flex flex-col items-left gap-2 text-base font-semibold bg-white">
            <div className="w-full h-[100px] px-2 flex justify-between gap-4 items-center overflow-hidden">
              <p><span className="text-blue-500 w-1/2">{place.place_name}</span>에서<br/> 경험을 나눠주세요!</p>
              <img className="h-full object-cover" src="/images/review.png"/>
            </div>
            
            <button
            className="mx-auto w-full text-blue-500 text-sm font-normal bg-blue-100 button-style"
            onClick={() => onClickModal(true)}
            >
              리뷰 쓰기
            </button>
          </div>
          
        )}
        </>
    )
}
