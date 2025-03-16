import { useEffect, useRef, useCallback } from "react";
import { useKakaoMap } from "./useKakaoMap";

export function useMapCenterChanged(setShowReGps: React.Dispatch<React.SetStateAction<boolean>>) {
    const { map } = useKakaoMap();
    const isListenerAttached = useRef(false); // 이벤트 중복 등록 방지

    const handleCenterChanged = useCallback(() => {
        setShowReGps(true);
    }, [setShowReGps]);

    useEffect(() => {
        if (!map || isListenerAttached.current) return; // ✅ map이 없거나 이미 등록된 경우 실행 X

        kakao.maps.event.addListener(map, "center_changed", handleCenterChanged);
        isListenerAttached.current = true; // ✅ 리스너 등록 플래그 설정

        return () => {
            kakao.maps.event.removeListener(map, "center_changed", handleCenterChanged);
            isListenerAttached.current = false; // ✅ 언마운트 시 리스너 플래그 초기화
        };
    }, [map, handleCenterChanged]);

    return { map };
}
