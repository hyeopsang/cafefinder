import { createContext, useState, useContext, ReactNode } from "react";

// MapContext 타입 정의
interface MapContextType {
  map: kakao.maps.Map| undefined; // 상태로 map 관리
  setMap: React.Dispatch<React.SetStateAction<kakao.maps.Map | undefined>>; // map 상태를 변경하는 함수
}

// Context 생성
const MapContext = createContext<MapContextType | null>(null);

interface MapProviderProps {
  children: ReactNode;
}

// Context Provider 컴포넌트
export const MapProvider = ({ children }: MapProviderProps) => {
  const [map, setMap] = useState<kakao.maps.Map | undefined>(undefined); // useState로 map 상태 관리

  return (
    <MapContext.Provider value={{ map, setMap }}>
      {children}
    </MapContext.Provider>
  );
};

// useContext 커스텀 훅
export const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMapContext must be used within a MapProvider");
  }
  return context;
};
