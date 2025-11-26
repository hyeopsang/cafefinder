interface RecommendItemProps {
  placeImage: string; // 이미지 URL
  placeName: string; // 카페 이름
  placeLocation: string; // 위치/주소
}
export default function RecommendItem({
  placeImage,
  placeName,
  placeLocation,
}: RecommendItemProps) {
  return (
    <li className="flex w-34 flex-col items-center gap-2 truncate overflow-hidden p-2">
      <div className="aspect-square w-30 overflow-hidden rounded-xl">
        <img src={placeImage} alt={placeName} className="h-full w-full object-cover" />
      </div>
      <div className="flex w-full flex-col items-start justify-center">
        <p className="w-full truncate text-sm font-semibold">{placeName}</p>
        <p className="w-full truncate text-xs text-gray-500">{placeLocation}</p>
      </div>
    </li>
  );
}
