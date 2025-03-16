import { useEffect, useCallback } from "react";
import { useKakaoMap } from "./useKakaoMap";

export function useMapCenterChanged(setShowReGps: React.Dispatch<React.SetStateAction<boolean>>) {
    const { map } = useKakaoMap();

    const handleCenterChanged = useCallback(() => {
        setShowReGps(true);
    }, [setShowReGps]);

    useEffect(() => {
        if (map) {
            kakao.maps.event.addListener(map, "center_changed", handleCenterChanged);
            
            return () => {
                kakao.maps.event.removeListener(map, "center_changed", handleCenterChanged);
            };
        }
    }, [map, handleCenterChanged]);

    return { map };
}
