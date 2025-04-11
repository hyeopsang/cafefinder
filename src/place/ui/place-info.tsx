import { Link } from "react-router"
import { Place } from "../../types"
import MyReview from "./my-review"
import OtherReview from "./other-review"

import { Star, Phone, SquareArrowOutUpLeft } from "lucide-react"
import PlaceSave from "./place-save"
interface ReviewColor {
    taste: string;
    mood: string;
    kind: string;
    comfort: string;
    wifi: string;
    parking: string;
}

interface PlaceInfoProps {
    place: Place;
}

export default function PlaceInfo({ place } : PlaceInfoProps) {
    
    return (
        <div className="pb-4 flex flex-col gap-2">
        <h1 className="text-center text-lg font-semibold">{place.place_name}</h1>
        <PlaceSave place={place}/>
        <p className="pt-1 text-center text-sm">{place.address_name}</p>
            {place.phone.length === 0 ? null : (
            <a href={`tel:${place.phone}`} className="flex justify-center items-center gap-2">
                <Phone className="w-4 h-4 fill-neutral-900" />
                <p>{place.phone}</p>
            </a>
        )}
            <a href={place.place_url} className="flex justify-center items-center gap-2">
                <SquareArrowOutUpLeft className="w-4 h-4" />
                <p>카페 상세 보기</p>
            </a>
        </div>
    )
} 
