import { useSelector } from "react-redux";
import { Review } from "../types";
import { formattedTime } from "../utils/fomattedTime";
import ReviewDelete from "./review-delete";
import ReviewRepost from "./review-repost";
import { useLocation } from "react-router";

interface ReviewItemProps {
    review?: Review;
    onOpen?: () => void;
}

interface User {
    [key: string]: any;
}

export default function ReviewItem({ review, onOpen }: ReviewItemProps) {
    const auth = useSelector((state: { auth: User }) => state.auth);
    const userId = auth?.user?.id ?? null;
    const importUrl = useLocation();

    return (
        <div className="w-full mx-auto flex flex-col items-center gap-2 p-4 bg-white shadow-sm text-sm">
            {importUrl.pathname === "/my-review" && <p className="font-semibold">{review.content.placeName}</p>}
            <p className="text-neutral-500">{formattedTime(review.createdAt)}</p>
            <ul className="w-full flex flex-wrap items-center justify-center gap-1">
                {review.content.keywords && review.content.keywords.map((keyword, index) =>
                    <li className="w-fit text-xs text-blue-400 hover:text-blue-500 cursor-pointer" key={keyword}> {/* Assuming `keyword` is unique */}
                        # {keyword}
                    </li>
                )}
            </ul>
            <p>{review.content.text}</p>                
            <ul className="w-full flex items-center justify-center gap-2">
                {review.content.imageUrls.map((url, index) => 
                    <li className="w-1/3 aspect-square" key={url}> {/* Assuming `url` is unique */}
                        <img className="w-full h-full object-cover" src={url} alt="" />
                    </li>
                )}
            </ul>            
            {userId === review.userId && (
                <div className="flex justify-center gap-2">
                    <ReviewRepost onClickModal={onOpen} />
                    <ReviewDelete review={review} />
                </div>
            )}
        </div>
    );
}
