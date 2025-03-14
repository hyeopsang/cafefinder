import { Review } from "../../types";

interface OtherReviewProps {
    reviews: Review[];
  }

export default function OtherReview ({ reviews }: OtherReviewProps) {
    return (
        <>
        <h5 className="w-full text-center text-[18px] font-bold">
          다른 사람이 쓴 리뷰
        </h5>
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
