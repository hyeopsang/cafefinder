import { RouterProvider } from "react-router";
import { AppRouter } from "./app/AppRouter";
import { RefProvider } from "./app/context/RefContext";
import { PlaceProvider } from "./app/context/PlaceContext";
import { MapProvider } from "./app/context/MapContext";

export default function App() {
  return (
    <RefProvider>
        <PlaceProvider>
          <MapProvider>
            <RouterProvider router={AppRouter} />
          </MapProvider>
        </PlaceProvider>
    </RefProvider>
  );
}
