import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { setMap } from "../../app/redux/mapSlice";

export default function MapComponent() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeMap = async () => {
      const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

      if (!navigator.geolocation) {
        console.error("이 브라우저에서는 Geolocation이 지원되지 않습니다.");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          if (mapContainerRef.current) {
            const map = new Map(mapContainerRef.current, {
              zoom: 20,
              center: currentPos,
              mapId: "DEMO_MAP_ID",
            });

            new AdvancedMarkerElement({
              map,
              position: currentPos,
              title: "현재 위치",
            });

            dispatch(setMap(map));
          }
        },
        (error) => {
          console.error("현재 위치를 가져오는 데 실패했습니다:", error);
        }
      );
    };

    initializeMap();
  }, [dispatch]);

  return (
<div
      id="map"
      ref={mapContainerRef}
      style={{ width: "100%", height: "100vh" }}
    />  );
}
