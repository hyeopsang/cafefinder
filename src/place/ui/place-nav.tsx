// components/place/place-tab-nav.tsx
import { Link, useLocation } from "react-router-dom";
export default function PlaceNav({ id }: { id: string }) {
  const location = useLocation();

  const isActive = (tab: string) => location.pathname.includes(tab);
  return (
    <div className="flex border-b border-neutral-300">
      <Link
        to={`/place/${id}/review`}
        className={`w-1/2 text-center py-2 px-4 text-sm font-semibold ${
          isActive("review")
            ? "border-b-2 border-neutral-900 text-neutral-900"
            : "text-neutral-500"
        }`}
      >
        리뷰
      </Link>
      <Link
        to={`/place/${id}/photo`}
        className={`w-1/2 text-center py-2 px-4 text-sm font-semibold ${
          isActive("photo")
            ? "border-b-2 border-neutral-900 text-neutral-900"
            : "text-neutral-500"
        }`}
      >
        사진
      </Link>
    </div>
  );
}
