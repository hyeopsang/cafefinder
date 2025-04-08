import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/redux/store";
import { Place } from "../types/place-type";
import { useMarkers } from "./utils/useMarkers";
import { useCurrentLocation } from "./utils/useCurrentLocation"
import SearchBar from "./ui/search-bar";
import CafeSwiper from "./ui/cafe-swiper";
import MenuModal from "../widget/side-bar/menu-modal";
import LocationButton from "./ui/location-button";
import BoundSearch from "./ui/bound-search";
import Map from "./ui/map";
import AlertModal from "../widget/side-bar/alert-modal";
interface User {
  [key: string]: any;
}
interface StateType {
  isAuthenticated: boolean;
  user: User | null;
  auth: {
    user: User | null;
  };
}
interface MenuProps {
  onClose: () => void;
}

interface AuthState {
  user: User | null;
}
function KakaoMap() {
  const auth: AuthState = useSelector((state: StateType) => state.auth);
    const userInfo = auth.user?.properties || null;
  const places = useSelector((state: RootState) => state.places) as Place[];
  console.log("places", places)
  const [isOpen, setIsOpen] = useState(false);
  const [showReGps, setShowReGps] = useState(false);
  const { markers } = useMarkers();
  const currentLocation = useCurrentLocation();
  console.log(places)
  return (
    <div className="relative h-svh mx-auto min-w-[320px] max-w-[480px] overflow-hidden">
      <Map />
      <SearchBar
        setIsOpen={setIsOpen}
        currentLocation={currentLocation!}
      />
      <div className="absolute bottom-5 w-full h-fit bg-white">
        <CafeSwiper
          places={places}
          markers={markers}
        />
      </div>
      
      <LocationButton />
      <BoundSearch setShowReGps={setShowReGps} showReGps={showReGps} />
      {
        userInfo ?
          (isOpen && <MenuModal onClose={() => setIsOpen(false)}/>)
        : (isOpen && <AlertModal onClose={() => setIsOpen(false)}/>)
      }
    </div>
  );
}

export default KakaoMap;
