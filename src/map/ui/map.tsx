import { useEffect } from "react";
import initializeMap from "../utils/useMap";
import { RootState } from "../../app/redux/store";
import { useSelector } from "react-redux";

export default function Map() {
  const map = useSelector((state: RootState) => state.map.map);
  const mapContainerRef = initializeMap();  

  useEffect(() => {
    if (map) {
      map.setLevel(5); // 맵이 설정되면 레벨 설정
    }
  }, [map]);

  return <div id="map" ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />;
}
