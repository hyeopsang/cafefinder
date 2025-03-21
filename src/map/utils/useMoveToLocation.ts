import { useMapContext } from "../../app/context/MapContext";

export const useMoveToCurrentLocation = () => {
  const { map } = useMapContext();

  // 현재 위치로 이동하는 함수 정의
  const moveToLocation = () => {
    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const currentPos = new kakao.maps.LatLng(lat, lng);
          map.panTo(currentPos); // 지도 이동

          // 마커 이미지 설정
          const markerImage = new kakao.maps.MarkerImage(
            "/images/user.png",
            new kakao.maps.Size(35, 35),
            { offset: new kakao.maps.Point(20, 40) }
          );

          // 현재 위치 마커 추가
          new kakao.maps.Marker({
            map,
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

  return moveToLocation; // 함수 반환
};
