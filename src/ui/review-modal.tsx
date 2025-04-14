import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addReview, updateReview } from "../api";
import { useSelector } from "react-redux";
import { Review, ReviewContent } from "../types";
import { RootState } from "../app/redux/store";
import { ChevronLeft, X } from "lucide-react";
import ReviewPhoto from "./review-photo";
import KeywordSelector from "./keyword-selector";
import ModalWrapper from "../widget/side-bar/modal-wrapper";
import "../widget/side-bar/modal-animation.css";
import ReviewText from "./review-text";
import ReviewKeywords from "./review-keywords";
import ReviewForm from "./review-form";
export default function ReviewModal({
  onClose,
  placeId,
  placeName,
  data,
}: {
  onClose: () => void;
  placeId?: string;
  placeName?: string;
  data?: Review;
}) {
  const queryClient = useQueryClient();
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const auth = useSelector((state: RootState) => state.auth);
  const userId = auth.user?.id;

  const initialContent: ReviewContent = data?.content || {
    text: "",
    keywords: [],
    placeName: placeName || "",
    imageUrls: []
  };

  const [reviews, setReviews] = useState<ReviewContent>(initialContent);

  useEffect(() => {
    if (data?.content) {
      setReviews(data.content);
    }
  }, [data]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setReviews((prev) => ({ ...prev, text: e.target.value }));
  };
  const isSubmitDisabled = reviews.text.trim().length < 3;

  // 리뷰 추가/수정 Mutations
  const mutation = useMutation({
    mutationFn: async () => {
      if (data?.id) {
        await updateReview({ placeId: data.placeId, id: data.id, userId, content: reviews, images: selectedImages });
      } else {
        await addReview({ placeId, content: reviews, userId, images: selectedImages });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", placeId] });
      queryClient.invalidateQueries({ queryKey: ["userReviews", userId] });
      alert(data?.id ? "리뷰가 수정되었습니다." : "리뷰 작성이 완료되었습니다.");
      setSubmitStatus("success");
      onClose();
    },
    onError: (error) => {
      setSubmitStatus("error");
      alert("리뷰 저장에 실패하였습니다.");
      console.error("리뷰 저장 오류:", error);
    },
  });
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleImagesChange = (files: File[]) => {
    setSelectedImages(files);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const goToNext = () => setCurrentPage((prev) => prev + 1);
  const goToPrev = () => setCurrentPage((prev) => prev - 1);
  const updatedKeywords = (keywords: string[]) => {
      setReviews((prev) => ({ ...prev, keywords }));
  }
  return (
    <ModalWrapper>
    <div className="slide-in-panel pointer-events-auto overflow-auto text-md mx-auto max-w-[480px] min-w-[320px] flex flex-col rounded-[15px] bg-white pb-4 text-center text-neutral-900 shadow-md h-fit gap-1">
      <button className="p-4 ml-auto" onClick={onClose}>
        <X className="w-5"/>
      </button>
      {currentPage === 1 && (
        <ReviewKeywords updatedKeywords={updatedKeywords} onNext={goToNext} keywords={reviews.keywords} />
      )}
      {currentPage === 2 && (
        <>
        <ReviewForm handleTextChange={handleTextChange} handleImagesChange={handleImagesChange} text={reviews.text} onPrev={goToPrev} />
        <button disabled={isSubmitDisabled} className="text-sm text-white bg-neutral-900 mx-auto button-style w-[80%]" onClick={() => mutation.mutate()}>
                {data?.id ? "수정 완료하기" : "작성 완료하기"}
            </button>
        </>
        
      )}
    </div>
    </ModalWrapper>
  );
}
