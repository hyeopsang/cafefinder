import { useRef, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { getReview } from "../api";
import { useRefContext } from "../app/context/RefContext";
import { Place } from "../types";
import { RootState } from "../app/redux/store";

type Position = {
  La: number;
  Ma: number;
}
// 리뷰 상태에 따른 마커 이미지 설정
const MARKER_CONFIG = {
  WITH_REVIEW: {
    imageSrc: `/images/coffee.png`, 
    size: { width: 25, height: 25 },
  },
  NO_REVIEW: {
    imageSrc: `/images/coffeeb.png`,
    size: { width: 25, height: 25 },
  },
};


export const useMarkers = (map: kakao.maps.Map) => {
  const markersRef = useRef<kakao.maps.Marker[]>([]);
  const places = useSelector((state: RootState) => state.places) as Place[];
  const { swiperRef } = useRefContext();

  const createMarkerImage = useCallback((hasReview: boolean) => {
    const config = hasReview
      ? MARKER_CONFIG.WITH_REVIEW
      : MARKER_CONFIG.NO_REVIEW;

    return new window.kakao.maps.MarkerImage(
      config.imageSrc,
      new window.kakao.maps.Size(config.size.width, config.size.height),
      {
        offset: new window.kakao.maps.Point(
          config.size.width / 2,
          config.size.height / 2,
        ),
      },
    );
  }, []);

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
  }, []);

  const addMarker = useCallback(
    async (position: Position, place: any, placeIndex: number) => {
      if (!map) return null;

      try {
        const reviews = await getReview(place.id);

        const hasReview = Array.isArray(reviews) && reviews.length > 0;

        const markerImage = createMarkerImage(hasReview);
        const markerOptions = {
          position: new window.kakao.maps.LatLng(position.La, position.Ma),
          image: markerImage,
          clickable: true,
        };
        console.log(markerOptions)
        const marker = new window.kakao.maps.Marker(markerOptions);
        marker.setMap(map);
        marker.placeIndex = placeIndex;

        window.kakao.maps.event.addListener(marker, "click", () => {
          map.panTo(marker.getPosition());
          if (swiperRef.current) {
            swiperRef.current.slideTo(marker.placeIndex);
          }
        });

        markersRef.current.push(marker);
        return marker;
      } catch (error) {
        console.error(`Error creating marker for place ${place.id}:`, error);
        return null;
      }
    },
    [map, createMarkerImage, swiperRef],
  );

  const updateMarkers = useCallback(async () => {
    try {
      clearMarkers();

      const markerPromises = places.map(async (place, index) => {
        const latLng = new window.kakao.maps.LatLng(Number(place.y), Number(place.x));
        const position: Position = { La: latLng.getLat(), Ma: latLng.getLng() };
        return addMarker(position, place, index);
      });

      await Promise.all(markerPromises);
    } catch (error) {
      console.error("Error updating markers:", error);
    }
  }, [clearMarkers, addMarker, places]);

  useEffect(() => {
    if (places.length > 0) {
      updateMarkers();
    } else {
      clearMarkers();
    }
  }, [places, updateMarkers, clearMarkers]);

   const displayCafeMarkers = async (cafeData: any[]) => {
      if (!map) return;
  
      const bounds = new kakao.maps.LatLngBounds();
  
      cafeData.forEach((place, index) => {
        const position = new kakao.maps.LatLng(place.y, place.x);
        bounds.extend(position);
        const positionObj: Position = { La: place.y, Ma: place.x };
        addMarker(positionObj, place, index);
      });
  
      if (cafeData.length > 2) {
        map.setBounds(bounds);
      }
    };
  
  return {
    markers: markersRef.current,
    clearMarkers,
    displayCafeMarkers,
    updateMarkers,
  };
};
