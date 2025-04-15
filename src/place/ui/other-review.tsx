import { Review } from "../../types";
import { useState } from "react";
import ReviewItem from "../../ui/review-item";
import { Ban } from "lucide-react";
interface OtherReviewProps {
    reviews: Review[];
  }

export default function OtherReview ({ reviews }: OtherReviewProps) {
  const keywords = reviews.map(e => e.content.keywords).flat(); 
  const keywordList = [...new Set(keywords)];
  const keywordFilter = (keyword: string | null) => {
    if (!keyword) return reviews;
    return reviews.filter(review => review.content.keywords.includes(keyword));
  };
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);

const filteredReviews: Review[] = keywordFilter(selectedKeyword);
    return (
        <div className="w-full">
          {keywordList && keywordList.length > 0 ?
          <ul className="w-full flex flex-wrap gap-2 py-3 px-2 bg-white border-b">
            {keywordList.map((keyword, id) =>
              <li className="cursor-pointer w-fit text-xs px-3 py-2 bg-white text-netural-900 border border-neutral-200 hover:bg-gray-100 rounded-full" key={id} onClick={() => setSelectedKeyword(keyword)}># {keyword}</li>
            )}
          </ul> : null
          }
          {filteredReviews.length > 0 ? (filteredReviews.map((review) => 
            <ReviewItem key={review.id} review={review} />
          )
          ) : (
            <div className="flex justify-center items-center gap-2 text-sm bg-white text-neutral-900 py-8 w-full text-center">
            <Ban className="w-4 h-4 text-red-500"/><p>리뷰가 존재하지 않아요</p>
          </div>

          )}
        </div>
    )
}
