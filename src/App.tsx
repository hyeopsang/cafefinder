import { RouterProvider } from "react-router";
import { AppRouter } from "./AppRouter";
import { RefProvider } from "./context/RefContext";

export default function App() {
  return (
    <RefProvider>
      <RouterProvider router={AppRouter} />
    </RefProvider>
  );
}
