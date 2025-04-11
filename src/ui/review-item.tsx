import { useSelector } from "react-redux";
import { Review } from "../types";
import { Button } from "../components/ui/button";
import { formattedTime } from "../utils/fomattedTime";
import ReviewDelete from "./review-delete";
import ReviewRepost from "./review-repost";

interface ReviewItemProps {
    review?: Review;
    onOpen?: () => void
}
interface User {
    [key: string]: any;
}
export default function ReviewItem({ review, onOpen } : ReviewItemProps) {
    const auth = useSelector((state: { auth: User }) => state.auth);
    const userId = auth?.user?.id ?? null;

    return (
        <div
        className="w-full mx-auto flex flex-col items-center gap-2 rounded-2xl p-4 border border-neutral-200 shadow-sm text-sm"
        >
            <p className="font-semibold text-base">{review.content.placeName}</p>
            <p className="text-neutral-500">{formattedTime(review.createdAt)}</p>
            <ul className="w-full flex flex-wrap items-center justify-left gap-2">
                {review.content.keywords.map((keyword, id) =>
                    <li className="w-fit text-xs px-3 py-2 bg-white text-netural-900 border border-neutral-200 rounded-full">
                        # {keyword}
                    </li> 
                )}
            </ul>
            <ul className="w-full flex items-center justify-center gap-2">
               {review.content.imageUrls.map((url, id) => 
                <li className="w-1/3 aspect-square" key={id}>
                    <img className="w-full h-full object-cover" src={url}/>
                </li>
                )} 
            </ul>
            
            <p>{review.content.text}</p>                
            {
                userId === review.userId && (
                    <div className="flex justify-center gap-2">
                    <ReviewRepost onClickModal={onOpen}/>
                    <ReviewDelete review={review} />
                    </div>
                )
            }
        </div>
    )
}
