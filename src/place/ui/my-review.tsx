import { Review } from "../../types";
import ReviewItem from "../../ui/review-item";
interface MyReviewProps {
    reviews: Review[];
    onClickModal: (boolean) => void;
  }

export default function MyReview ({reviews, onClickModal} : MyReviewProps) {

    return (
        <>
        {reviews.length > 0 ? (
          <div className="flex w-full flex-col gap-2 text-center">
            <h2 className="w-full text-md font-bold">내가 쓴 리뷰</h2>
            {reviews.map((review, id) => (
              <ReviewItem key={id} review={review} onOpen={() => onClickModal(review)}/>
            ))}
          </div>
        ) : (
          <div className="w-full py-4 border border-neutral-200 shadow-sm rounded-xl flex items-center text-sm text-neutral-900">
            <button
            className="mx-auto bg-neutral-900 w-[80%] text-white button-style"
            onClick={() => onClickModal(true)}
            >
              리뷰 작성하기
            </button>
          </div>
          
        )}
        </>
    )
}
