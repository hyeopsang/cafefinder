import { useEffect } from "react";
import { useMapContext } from "../../app/context/MapContext";
import { usePlaceContext } from "../../app/context/PlaceContext";

export const useInitializeMap = () => {
  const { map, setMap } = useMapContext();
  const { setPlace } = usePlaceContext();

  useEffect(() => {
    const initializeMap = () => {
      const mapContainer = document.getElementById("map");

      if (!mapContainer) {
        console.error("Map container not found");
        return;
      }

      if (map) return; // 이미 맵이 있으면 초기화 X

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            const currentPos = new kakao.maps.LatLng(lat, lng);

            const newMap = new kakao.maps.Map(mapContainer, {
              center: currentPos,
              level: 6,
            });

            const markerImage = new kakao.maps.MarkerImage(
              "/images/gomgom.png",
              new kakao.maps.Size(35, 35),
              { offset: new kakao.maps.Point(20, 40) }
            );

            new kakao.maps.Marker({
              map: newMap,
              position: currentPos,
              title: "현재 위치",
              image: markerImage,
              zIndex: 999,
            });

            const newPs = new kakao.maps.services.Places();
            setMap(newMap);
            setPlace(newPs);
          },
          (error) => {
            console.error("현재 위치를 가져오는 데 실패했습니다:", error);
          }
        );
      } else {
        console.error("이 브라우저에서는 Geolocation이 지원되지 않습니다.");
      }
    };

    initializeMap();
  }, [map, setMap, setPlace]);
};
