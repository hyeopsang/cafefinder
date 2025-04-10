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
        <>
        <h1 className="text-center text-lg font-semibold">{place.place_name}</h1>
        <p className="text-center p-2">{place.address_name}</p>
        <div className="mx-auto flex w-fit gap-6">
            <a href={place.place_url}>
                <SquareArrowOutUpLeft className="w-5 h-5" />
            </a>
        {place.phone.length === 0 ? null : (
            <a href={`tel:${place.phone}`}>
                <Phone className="w-5 h-5" />
            </a>

        )}
        <PlaceSave place={place}/>
        </div>
        </>
    )
} 
