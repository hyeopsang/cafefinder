import { useKakaoMap } from "../utils/useKakaoMap"

export default function LocationButton () {
    const { moveToCurrentLocation } = useKakaoMap();
    return (
        <div
        className="absolute right-[30px] top-[180px] z-30 aspect-square w-[40px] rounded-[30px] bg-white shadow-md"
        id="centerOnMyLocation"
        onClick={moveToCurrentLocation}
        >
        <img src={"./images/gps.png"} alt="Center on my location" />
      </div>
    )
}