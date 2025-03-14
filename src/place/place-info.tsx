import { Link } from "react-router"
import { Place } from "../types"
import MyReview from "./my-review"
import OtherReview from "./other-review"

interface ReviewColor {
    taste: string;
    mood: string;
    kind: string;
    comfort: string;
    wifi: string;
    parking: string;
}

interface PlaceInfoProps {
    reviewColor: ReviewColor;
    place: Place;
}

export default function PlaceInfo({ reviewColor, place } : PlaceInfoProps) {
    return (
        <>
        <Link to={"/map"}>
            <img className="w-full object-cover" src={"/images/back.png"} alt="Back" />
        </Link>
        <h1 className="text-center text-[22px] font-bold">{place.place_name}</h1>
        <p className="text-center text-[18px] font-medium">{place.address_name}</p>
        <div className="mx-auto flex w-fit gap-[15px]">
            <a href={place.place_url}>
                <div className="w-[50px] p-[10px]">
                    <img src={"/images/link.png"} />
                </div>
            </a>
        {place.phone.length === 0 ? null : (
            <a href={`tel:${place.phone}`}>
                <div className="w-[50px] p-[10px]">
                <img src={"/images/tel.png"} alt="전화 아이콘" />
                </div>
            </a>
        )}
        </div>
        <div className="px-[50px] grid grid-cols-3 grid-rows-2 gap-[15px] text-[16px] font-bold text-[#212121]">
            <div className="flex aspect-square items-center justify-center rounded-taste" style={{ backgroundColor: reviewColor.taste }}>
            맛
            </div>
            <div className="flex aspect-square items-center justify-center rounded-mood" style={{ backgroundColor: reviewColor.mood }}>
            분위기
            </div>
            <div className="flex aspect-square items-center justify-center rounded-kind" style={{ backgroundColor: reviewColor.kind }}>
            친절도
            </div>
            <div className="flex aspect-square items-center justify-center rounded-comfort" style={{ backgroundColor: reviewColor.comfort }}>
            편안함
            </div>
            <div className="mx-auto flex aspect-square items-center justify-center rounded-wifi" style={{ backgroundColor: reviewColor.wifi }}>
            와이파이
            </div>
            <div className="mx-auto flex aspect-square items-center justify-center rounded-parking" style={{ backgroundColor: reviewColor.parking }}>
            주차공간
            </div>
        </div>
        </>
    )
} 
