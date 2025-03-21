import { useEffect } from "react";
import { useMapContext } from "../../app/context/MapContext";
import initializeMap from "../utils/useMap";

export default function Map() {
  const { map } = useMapContext();
  const mapContainerRef = initializeMap();  

  useEffect(() => {
    if (map) {
      map.setLevel(5); // 맵이 설정되면 레벨 설정
    }
  }, [map]);

  return <div id="map" ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />;
}
