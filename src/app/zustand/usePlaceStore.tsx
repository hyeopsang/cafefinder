import type { Tables } from '@/database.types';

type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface OpeningTime {
  day: WeekDay;
  hour: number;
  minute: number;
}

export interface Period {
  open: OpeningTime;
  close: OpeningTime;
}

export interface OpeningHours {
  openNow: boolean;
  periods: Period[];
  nextCloseTime: string;
  weekdayDescriptions: string[];
}

interface ParkingOptions {
  freeParkingLot: boolean;
  freeStreetParrking?: boolean;
}

interface ReviewText {
  text: string;
  languageCode: string;
}

interface AuthorAttribution {
  uri: string;
  photoUri: string;
  displayName: string;
}

export interface PlaceReview {
  name: string;
  text: ReviewText;
  rating: number;
  publishTime: string;
  originalText: ReviewText;
  googleMapsUri: string;
  flagContentUri: string;
  authorAttribution: AuthorAttribution;
  relativePublishTimeDescription: string;
}

type PlaceRow = Tables<'places'>;

export interface Place
  extends Omit<
    PlaceRow,
    'opening_hours' | 'parking_options' | 'reviews' | 'created_at' | 'updated_at'
  > {
  id: string;
  allow_dogs: boolean;
  lat: number;
  lng: number;
  phone_number: string;
  opening_hours?: OpeningHours;
  parking_options: ParkingOptions | null;
  reviews: PlaceReview[] | null;
  photo_urls: string[];
  created_at: string;
  updated_at: string;
  place_id: string;
}

interface PlaceStoreType {
  places: Place[] | null;

  isListModalOpen: boolean;

  setPlaces: (places: Place[] | null) => void;
  clearPlaces: () => void;
  getPlaceById: (placeId: string) => Place | undefined;

  openListModal: () => void;
  closeListModal: () => void;
}

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const usePlaceStore = create<PlaceStoreType>()(
  persist(
    (set, get) => ({
      places: [],
      isListModalOpen: false,

      setPlaces: (newPlaces: Place[] | null) => {
        set({ places: newPlaces });
      },

      clearPlaces: () => {
        set({ places: [] });
      },

      getPlaceById: (placeId: string) => {
        return get().places?.find((p: Place) => p.place_id === placeId);
      },

      openListModal: () => {
        set({ isListModalOpen: true });
      },

      closeListModal: () => {
        set({ isListModalOpen: false });
      },
    }),
    {
      name: 'places-storage',
    },
  ),
);
