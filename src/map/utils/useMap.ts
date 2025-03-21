import { useEffect, useRef } from "react";
import { useMapContext } from "../../app/context/MapContext";
import { usePlaceContext } from "../../app/context/PlaceContext";

export default function initializeMap() {
  const { map, setMap } = useMapContext();
  const { setPlace } = usePlaceContext();
  const mapContainerRef = useRef(null);  // DOM 요소를 관리하는 ref

  useEffect(() => {
    if (!mapContainerRef.current) {
      console.error("Map container not found");
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const currentPos = new kakao.maps.LatLng(lat, lng);

          // 새로운 맵 객체 생성
          const newMap = new kakao.maps.Map(mapContainerRef.current, {
            center: currentPos, // 현재 위치로 맵 초기화
            level: 6,
          });

          const markerImage = new kakao.maps.MarkerImage(
            "/images/gomgom.png",
            new kakao.maps.Size(35, 35),
            { offset: new kakao.maps.Point(20, 40) }
          );

          // 마커 추가
          new kakao.maps.Marker({
            map: newMap, // 맵 객체
            position: currentPos, // 위치
            title: "현재 위치",
            image: markerImage, // 마커 이미지
            zIndex: 999, // 다른 마커 위로 올라오게 설정
          });

          const newPs = new kakao.maps.services.Places();
          setMap(newMap); // 맵 객체 상태로 설정
          setPlace(newPs);   // Places 객체 상태로 설정
        },
        (error) => {
          console.error("현재 위치를 가져오는 데 실패했습니다:", error);
        }
      );
    } else {
      console.error("이 브라우저에서는 Geolocation이 지원되지 않습니다.");
    }
  }, [setMap, setPlace]);

  return mapContainerRef; // mapContainerRef를 반환
}
