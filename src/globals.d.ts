declare global {
  interface Window {
    Kakao: any,
    kakao: {
      any
      maps: {
        LatLng: typeof kakao.maps.LatLng;
        MarkerImage: typeof Kakao.maps.MarkerImage;
        Size: typeof KakaoMap.maps.Size;
        Point: typeof KakaoMap.maps.Point;
        Marker: typeof kakao.maps.Marker;
        event: typeof kakao.maps.event
      };
    };
  }
}
  export {};  // 이 파일을 모듈로 취급하기 위해 빈 export 추가
  