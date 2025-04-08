import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setMap } from "../../app/redux/mapSlice";
import { setSearch } from "../../app/redux/searchSlice";
export default function initializeMap() {
  const dispatch = useDispatch();
  const mapContainerRef = useRef(null);

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

          // 새로운 카카오맵 객체 생성
          const newMap = new kakao.maps.Map(mapContainerRef.current, {
            center: currentPos,
            level: 6,
          });

          const markerImage = new kakao.maps.MarkerImage(
            "/images/user.png",
            new kakao.maps.Size(40, 40),
            { offset: new kakao.maps.Point(20, 40) }
          );

          // 현재 위치 마커 추가
          new kakao.maps.Marker({
            map: newMap,
            position: currentPos,
            title: "현재 위치",
            image: markerImage,
            zIndex: 999,
          });

          const newPs = new kakao.maps.services.Places();
          dispatch(setMap(newMap)); // Redux로 map 상태 설정
          dispatch(setSearch(newPs)); // PlaceContext 유지
        },
        (error) => {
          console.error("현재 위치를 가져오는 데 실패했습니다:", error);
        }
      );
    } else {
      console.error("이 브라우저에서는 Geolocation이 지원되지 않습니다.");
    }
  }, [dispatch, setSearch]);

  return mapContainerRef;
}
