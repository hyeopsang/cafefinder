import { Place } from "../../types"
import { Phone, SquareArrowOutUpLeft } from "lucide-react"
import PlaceSave from "./place-save"
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
                <p>카카오 맵으로 이동하기</p>
            </a>
        </div>
    )
} 
