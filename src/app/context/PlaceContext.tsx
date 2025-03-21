import { createContext, useState, useContext, ReactNode } from "react";

// MapContext 타입 정의
interface PlaceContextType {
  place: kakao.maps.services.Places | undefined; // 상태로 map 관리
  setPlace: React.Dispatch<React.SetStateAction<kakao.maps.services.Places | undefined>>; // map 상태를 변경하는 함수
}

// Context 생성
const PlaceContext = createContext<PlaceContextType | null>(null);

interface PlaceProviderProps {
  children: ReactNode;
}

// Context Provider 컴포넌트
export const PlaceProvider = ({ children }: PlaceProviderProps) => {
  const [place, setPlace] = useState<kakao.maps.services.Places | undefined>(undefined); // useState로 map 상태 관리

  return (
    <PlaceContext.Provider value={{ place, setPlace }}>
      {children}
    </PlaceContext.Provider>
  );
};

// useContext 커스텀 훅
export const usePlaceContext = () => {
  const context = useContext(PlaceContext);
  if (!context) {
    throw new Error("useMapContext must be used within a MapProvider");
  }
  return context;
};
