import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface MarkerLocation {
  id: string;
  location: { lat: number; lng: number };
  name: string;
}

interface MarkerStoreType {
  markers: MarkerLocation[];
  selectedMarkerId: string | null;

  setMarkers: (newMarkers: MarkerLocation[]) => void;
  addMarker: (marker: MarkerLocation) => void;
  removeMarkerById: (id: string) => void;

  setSelectedMarkerId: (id: string | null) => void;
}

export const useMarkerStore = create<MarkerStoreType>()(
  immer((set) => ({
    markers: [],
    selectedMarkerId: null,

    setMarkers: (newMarkers) => {
      set((state) => {
        state.markers = newMarkers;
        state.selectedMarkerId = null;
      });
    },

    addMarker: (marker) => {
      set((state) => {
        state.markers.push(marker);
      });
    },

    removeMarkerById: (id) => {
      set((state) => {
        state.markers = state.markers.filter((m) => m.id !== id);
        if (state.selectedMarkerId === id) {
          state.selectedMarkerId = null;
        }
      });
    },

    setSelectedMarkerId: (id) => {
      set((state) => {
        state.selectedMarkerId = state.selectedMarkerId === id ? null : id;
      });
    },
  })),
);
