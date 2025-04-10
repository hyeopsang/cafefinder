import { Review } from "../../types";
import ReviewItem from "../../ui/review-item";

interface OtherReviewProps {
    reviews: Review[];
  }

export default function OtherReview ({ reviews }: OtherReviewProps) {
    return (
        <>
          {reviews.length > 0 ? (
            reviews.map((review, id) => (
              <ReviewItem key={id} review={review}/>
            ))
          ) : (
              <p className="text-sm rounded-2xl bg-neutral-100 py-4 w-full text-center">작성된 리뷰가 없어요</p>

          )}
        </>
    )
}
