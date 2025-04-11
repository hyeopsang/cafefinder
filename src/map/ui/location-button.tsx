import { useMoveToCurrentLocation } from "../utils/useMoveToLocation";
import { LocateFixed } from "lucide-react";
export default function LocationButton() {
  const moveToLocation = useMoveToCurrentLocation(); // 커스텀 훅 사용

  return (
    <div
      className="absolute right-[5%] bg-white rounded-full top-22 z-30 aspect-square shadow-md w-9 flex justify-center items-center"
      id="centerOnMyLocation"
      onClick={moveToLocation} // 이벤트 핸들러에 함수 전달
    >
      <LocateFixed className="w-5" />
    </div>
  );
}
