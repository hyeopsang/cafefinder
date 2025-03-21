import { Review } from "../types";

interface OtherReviewProps {
    reviews: Review[];
  }

export default function OtherReview ({ reviews }: OtherReviewProps) {
    return (
        <>
        <div className="w-full flex-col gap-[15px] rounded-[15px] bg-[#fdf4d5] p-[15px] text-center text-[16px] font-medium text-[#212121]">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index}>
                <p>"{review.content.text}"</p>
              </div>
            ))
          ) : (
            <p>등록된 리뷰가 없어요 ㅠ</p>
          )}
        </div>
        </>
    )
}
