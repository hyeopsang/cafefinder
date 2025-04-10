import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addReview, updateReview } from "../api";
import { useSelector } from "react-redux";
import { Review, ReviewContent } from "../types";
import { RootState } from "../app/redux/store";
import { ChevronLeft, X } from "lucide-react";
import UploadImage from "../utils/upload-image";
import KeywordSelector from "./keyword-selector";
import ModalWrapper from "../widget/side-bar/modal-wrapper";
import "../widget/side-bar/modal-animation.css";
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
  return (
    <ModalWrapper>
    <div className="slide-in-panel pointer-events-auto text-md mx-auto max-w-[480px] min-w-[320px] flex gap-2 flex-col rounded-[15px] bg-white pb-4 text-center text-neutral-900 shadow-md h-fit">
      <div className="flex w-full justify-end">
        <button className="p-[15px]" onClick={onClose}>
          <X />
        </button>
      </div>
      <KeywordSelector
        selected={reviews.keywords || []}
        onChange={(updatedKeywords) =>
          setReviews((prev) => ({ ...prev, keywords: updatedKeywords }))
      }
      />        
        <UploadImage onChange={handleImagesChange}/>
        <h2 className="font-semibold text-sm text-neutral-900">한줄 리뷰</h2>
        <textarea
          value={reviews.text}
          onChange={handleTextChange}
          minLength={3}
          maxLength={100}
          placeholder="100자 미만"
          className="w-[80%] h-[135px] mx-auto border px-2 py-1 text-neutral-900 rounded-md"
        />
      <button disabled={isSubmitDisabled} className="text-md text-white bg-neutral-900 mx-auto button-style w-[80%]" onClick={() => mutation.mutate()}>
        {data?.id ? "수정 완료하기" : "작성 완료하기"}
      </button>
    </div>
    </ModalWrapper>
  );
}
