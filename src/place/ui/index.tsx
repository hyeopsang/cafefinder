// pages/place/place-layout-page.tsx
import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ChevronLeft } from "lucide-react";
import PlaceInfo from "./place-info";
import { Place } from "../../types";
import PlaceNav from "./place-nav";
export default function PlaceLayout() {
  const { id } = useParams();
  const places = useSelector((state: { places?: Place[] }) => state.places ?? []);
  const place = places.find((p) => p.id === id);
  const location = useLocation();

  if (!places.length || !place) {
    return <p>카페 데이터를 불러오는 중입니다...</p>;
  }

  return (
    <div className="h-svh overflow-y-scroll mx-auto flex flex-col min-w-mobile max-w-mobile bg-white font-medium text-base py-3 text-neutral-900">
      <Link to="/">
        <ChevronLeft className="w-10" />
      </Link>
      <PlaceInfo place={place} />
      <div className="w-full flex flex-col">
        <PlaceNav id={place.id} />
        <Outlet key={location.pathname}/>
      </div>
    </div>
  );
}
