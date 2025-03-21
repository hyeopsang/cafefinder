import { useEffect } from "react";
import { useMapContext } from "../../app/context/MapContext";

export default function Map() {
    const { map } = useMapContext();
    
    useEffect(() => {
        if (map) {
            map.setLevel(5);
        }
    }, [map]);

    return <div id="map" style={{ width: "100%", height: "100vh" }} />;
}
