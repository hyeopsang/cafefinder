import { useMoveToCurrentLocation } from "../utils/useMoveToLocation";

export default function LocationButton() {
  const moveToLocation = useMoveToCurrentLocation(); // 커스텀 훅 사용

  return (
    <div
      className="absolute right-[30px] top-30 z-30 aspect-square w-[40px]"
      id="centerOnMyLocation"
      onClick={moveToLocation} // 이벤트 핸들러에 함수 전달
    >
      <img src={"/images/gps.svg"} alt="Center on my location" className="drop-shadow-lg"/>
    </div>
  );
}
