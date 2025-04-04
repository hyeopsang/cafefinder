import { useRef, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { getReview } from "../../api";
import { Place } from "../types";
import { RootState } from "../../app/redux/store";
import { useRefContext } from "../../app/context/RefContext";

export const useMarkers = () => {
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
  const placesRaw = useSelector((state: RootState) => state.places);
  const places = Array.isArray(placesRaw) ? placesRaw : [];
    const map = useSelector((state: RootState) => state.map.map);
  const { swiperRef } = useRefContext();

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((marker) => marker.map = null);
    markersRef.current = [];
  }, []);

  const addMarker = useCallback(
    async (place: Place, placeIndex: number) => {
      if (!map) return null;

      try {
        const reviews = await getReview(place.id);
        const hasReview = Array.isArray(reviews) && reviews.length > 0;

        const { Place: GPlace } = await google.maps.importLibrary("places") as google.maps.PlacesLibrary;
        const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

        const gPlace = new GPlace({ id: place.id });
        await gPlace.fetchFields({ fields: ['location', 'displayName', 'svgIconMaskURI', 'iconBackgroundColor'] });

        const pin = new PinElement({
          background: gPlace.iconBackgroundColor || (hasReview ? '#7B4B94' : '#999'),
          glyph: new URL(String(gPlace.svgIconMaskURI)),
        });

        const marker = new AdvancedMarkerElement({
          map,
          position: gPlace.location,
          content: pin.element,
          title: gPlace.displayName,
        });

        marker.addListener("gmp-click", () => {
          map.panTo(marker.position);
          if (swiperRef.current) {
            swiperRef.current.slideTo(placeIndex);
          }
        });

        markersRef.current.push(marker);
        return marker;
      } catch (error) {
        console.error(`Error creating marker for place ${place.id}:`, error);
        return null;
      }
    },
    [map, swiperRef],
  );

  const updateMarkers = useCallback(async () => {
    try {
      clearMarkers();

      const markerPromises = places.map(async (place, index) => {
        return addMarker(place, index);
      });

      await Promise.all(markerPromises);
    } catch (error) {
      console.error("Error updating markers:", error);
    }
  }, [clearMarkers, addMarker, places]);

  useEffect(() => {
    if (!map) return;
    if (places.length > 0) {
      updateMarkers();
    } else {
      clearMarkers();
    }
  }, [map, places, updateMarkers, clearMarkers]);

  const displayCafeMarkers = async (cafeData: Place[]) => {
    if (!map) return;

    const { LatLngBounds } = await google.maps.importLibrary("core") as google.maps.CoreLibrary;
    const bounds = new LatLngBounds();

    cafeData.forEach((place, index) => {
      if (place.location) {
        bounds.extend(place.location);
      }
      addMarker(place, index);
    });

    if (cafeData.length > 2) {
      map.fitBounds(bounds);
    }
  };

  return {
    markers: markersRef.current,
    clearMarkers,
    displayCafeMarkers,
    updateMarkers,
  };
};
