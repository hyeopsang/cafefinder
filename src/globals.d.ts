// kakao.d.ts 파일을 프로젝트 루트에 추가

declare namespace kakao {
  namespace maps {
    class Map {
      constructor(container: HTMLElement, options: any);
      setLevel(level: number): void;
      setCenter(center: kakao.maps.LatLng | { lat: number, lng: number }): void; // setCenter 추가
      // 다른 필요한 메서드들도 여기에 추가할 수 있습니다.
    }

    namespace services {
      class Places {
        constructor();
        // 필요한 메서드 정의
      }
    }

    namespace event {
      function addListener(map: Map, event: string, callback: () => void): void;
    }

    class LatLng {
      constructor(lat: number, lng: number);
      getLat(): number;
      getLng(): number;
    }
  }
}
declare global {
  interface Window {
    Kakao: any; // window.Kakao를 any로 선언
  }
}

export {};
