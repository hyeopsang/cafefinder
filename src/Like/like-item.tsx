import { Phone, SquareArrowOutUpLeft } from "lucide-react";
import { Like } from "../types";

interface LikeProps {
    place: Like
}

export default function LikeItem ({place}: LikeProps){
    return (
        <article className="flex justify-between items-center pb-4 border-b border-neutral-200">
            <div className="flex flex-col gap-2 text-sm text-neutral-900">
                <h2 className="font-semibold">{place.content.place_name}</h2>
                <p>{place.content.address_name}</p>
            </div>
            <div className="flex gap-4">
            {place.content.phone.length === 0 ? null : (
            <a href={`tel:${place.content.phone}`} className="flex justify-center items-center gap-2">
                <Phone className="w-4 h-4 fill-neutral-900" />
            </a>
            )}
            <a href={place.content.place_url} className="flex justify-center items-center gap-2">
                <SquareArrowOutUpLeft className="w-4 h-4" />
            </a>
            </div>
        </article>
    )
}