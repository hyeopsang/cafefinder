import { useEffect, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/redux/store";

export function useMapCenterChanged(setShowReGps: React.Dispatch<React.SetStateAction<boolean>>) {
    const map = useSelector((state: RootState) => state.map.map);
    const isListenerAttached = useRef(false); // 이벤트 중복 등록 방지

    const handleCenterChanged = useCallback(() => {
        console.log('useMapCenterChanged', map?.getCenter());
        setShowReGps(true);
    }, [setShowReGps]);

    useEffect(() => {
        if (!map || isListenerAttached.current) return; 

        kakao.maps.event.addListener(map, "center_changed", handleCenterChanged);
        isListenerAttached.current = true;

        return () => {
            kakao.maps.event.removeListener(map, "center_changed", handleCenterChanged);
            isListenerAttached.current = false;
        };
    }, [map, handleCenterChanged]);

    return { map };
}
