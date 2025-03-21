import { useState, useEffect } from "react";
import { getCurrentLocation } from "../../utils/locationUtils";

export const useCurrentLocation = () => {
  const [currentLocation, setCurrentLocation] = useState<kakao.maps.LatLng | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      const location = await getCurrentLocation();
      setCurrentLocation(location as kakao.maps.LatLng);
    };

    fetchLocation();
  }, []);

  return currentLocation;
};
