import { useEffect, useCallback } from "react";
import { useKakaoMap } from "./useKakaoMap";

export default function Map ({ setShowReGps }: { setShowReGps: React.Dispatch<React.SetStateAction<boolean>> }){

  const handleCenterChanged = useCallback(() => {
      setShowReGps(true);
    }, []);
    
  const { map } = useKakaoMap();

  useEffect(() => {
      if (map) {
        kakao.maps.event.addListener(map, "center_changed", handleCenterChanged);
        map.setLevel(5);
          
        return () => {
          kakao.maps.event.removeListener(map, "center_changed", handleCenterChanged);
        };
      }
    }, [map, handleCenterChanged]);

    return (
        <div id="map" style={{ width: "100%", height: "100vh" }} />
    )
}