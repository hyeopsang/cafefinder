const { kakao } = window;

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        resolve(new kakao.maps.LatLng(userLat, userLng));
      }, reject);
    } else {
      reject(new Error("GPS를 사용할 수 없습니다."));
    }
  });
};
