import { useEffect, useRef, useCallback } from "react";
import { useMapContext } from "../../app/context/MapContext";

export function useMapCenterChanged(setShowReGps: React.Dispatch<React.SetStateAction<boolean>>) {
    const { map, setMap } = useMapContext();
    const isListenerAttached = useRef(false); // 이벤트 중복 등록 방지

    const handleCenterChanged = useCallback(() => {
        console.log('useMapCenterChanged', map?.getCenter());
        setShowReGps(true);
    }, [setShowReGps]);

    useEffect(() => {
        if (!map || isListenerAttached.current) return; // ✅ map이 없거나 이미 등록된 경우 실행 X

        kakao.maps.event.addListener(map, "center_changed", handleCenterChanged);
        isListenerAttached.current = true;

        return () => {
            kakao.maps.event.removeListener(map, "center_changed", handleCenterChanged);
            isListenerAttached.current = false;
        };
    }, [map, handleCenterChanged]);

    return { map };
}
