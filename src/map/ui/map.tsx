import { useEffect } from "react";
import { useMapCenterChanged } from "../utils/useMapCenterChanged";

export default function Map({ setShowReGps }: { setShowReGps: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { map } = useMapCenterChanged(setShowReGps);

    useEffect(() => {
        if (map) {
            map.setLevel(5);
        }
    }, [map]);

    return <div id="map" style={{ width: "100%", height: "100vh" }} />;
}
