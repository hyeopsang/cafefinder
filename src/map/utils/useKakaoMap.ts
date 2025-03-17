import { useState, useEffect } from "react";
import { setMap } from "../../app/redux/mapSlice";
import { useSelector } from "react-redux";
const { kakao } = window;

export const useKakaoMap = () => {
  const [ps, setPs] = useState<kakao.maps.services.Places | null>(null);
  const map = useSelector((state: kakao.maps.Map) => state);
  useEffect(() => {
    const initializeMap = () => {
      const mapContainer = document.getElementById("map");

      if (!mapContainer) {
        console.error("Map container not found");
        return;
      }

      if (!map) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const lat = position.coords.latitude;
              const lng = position.coords.longitude;
              const currentPos = new kakao.maps.LatLng(lat, lng);

              // 새로운 맵 객체 생성
              const newMap = new kakao.maps.Map(mapContainer, {
                center: currentPos, // 현재 위치로 맵 초기화
                level: 6,
              });

              const markerImage = new kakao.maps.MarkerImage(
                "/images/gomgom.png", 
                new kakao.maps.Size(35, 35),
                { offset: new kakao.maps.Point(20, 40) },
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
              setPs(newPs);   // Places 객체 상태로 설정

            },
            (error) => {
              console.error("현재 위치를 가져오는 데 실패했습니다:", error);
            }
          );
        } else {
          console.error("이 브라우저에서는 Geolocation이 지원되지 않습니다.");
        }
      }
    };

    initializeMap(); // 맵 초기화 함수 실행
  }, []);

  // 현재 위치로 이동하는 함수
  const moveToCurrentLocation = () => {
    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const currentPos = new kakao.maps.LatLng(lat, lng);
          map.panTo(currentPos); // 맵의 중심을 현재 위치로 이동

          // 이동 후 마커 추가
          const markerImage = new kakao.maps.MarkerImage(
            "/assets/gomgom.png",
            new kakao.maps.Size(35, 35),
            { offset: new kakao.maps.Point(20, 40) },
          );

          new kakao.maps.Marker({
            map: map, // 이미 초기화된 map 객체 사용
            position: currentPos,
            title: "현재 위치",
            image: markerImage,
            zIndex: 999,
          });
        },
        () => {
          console.error("현재 위치를 가져오는 데 실패했습니다.");
        }
      );
    } else {
      console.error("이 브라우저에서는 Geolocation이 지원되지 않습니다.");
    }
  };

  return { map, ps, moveToCurrentLocation }; // 위치 이동 함수 반환
};
