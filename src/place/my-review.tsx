import { Review } from "../types";

interface MyReviewProps {
    reviews: Review[];
    modal: boolean;
    setModal: React.Dispatch<React.SetStateAction<boolean>>
  }

export default function MyReview ({reviews, modal, setModal} : MyReviewProps) {
    return (
        <>
        {reviews.length > 0 ? (
          <div className="flex w-full flex-col gap-[15px] text-center">
            <h2 className="w-full text-[18px] font-bold">내가 쓴 리뷰</h2>
            {reviews.map((review, id) => (
              <div
                className="w-full rounded-[15px] bg-[#fdf4d5] p-[15px] text-[16px] text-[#212121]"
                key={id}
              >
                <p>"{review.content.text}"</p>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="mx-auto cursor-pointer rounded-[15px] bg-[#212121] px-[15px] py-[10px] text-[16px] text-white"
            onClick={() => setModal(!modal)}
          >
            <p>리뷰 작성</p>
          </div>
        )}
        </>
    )
}
