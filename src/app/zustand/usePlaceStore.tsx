//------------------------------------------------------------
// 1) Supabase auto-generated 타입 가져오기
//------------------------------------------------------------
import type { Tables } from '@/database.types';

//------------------------------------------------------------
// 2) 너가 사용하려고 만든 타입 정의
//------------------------------------------------------------

// Opening Hours 타입
type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface OpeningTime {
  day: WeekDay;
  hour: number;
  minute: number;
}

interface Period {
  open: OpeningTime;
  close: OpeningTime;
}

export interface OpeningHours {
  openNow: boolean;
  periods: Period[];
  nextCloseTime: string;
  weekdayDescriptions: string[];
}

// Parking Options 타입
interface ParkingOptions {
  freeParkingLot: boolean;
  freeStreetParrking?: boolean;
}

// Reviews 타입
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

//------------------------------------------------------------
// 3) Supabase places Row 기반 Place 타입 확장
//------------------------------------------------------------

// Supabase에서 자동 생성된 Row 타입
type PlaceRow = Tables<'places'>;

// 앱에서 쓰는 최종 Place 타입 (Json 필드는 파싱된 타입으로 재정의)
export interface Place
  extends Omit<
    PlaceRow,
    'opening_hours' | 'parking_options' | 'reviews' | 'created_at' | 'updated_at'
  > {
  opening_hours: OpeningHours | null;
  parking_options: ParkingOptions | null;
  reviews: PlaceReview[] | null;

  created_at: Date | null;
  updated_at: Date | null;
}

//------------------------------------------------------------
// 4) Zustand Store 타입 정의
//------------------------------------------------------------
interface PlaceStoreType {
  places: Place[] | null;

  isListModalOpen: boolean;

  setPlaces: (places: Place[] | null) => void;
  clearPlaces: () => void;
  getPlaceById: (placeId: string) => Place | undefined;

  openListModal: () => void;
  closeListModal: () => void;
}

//------------------------------------------------------------
// 5) Zustand Store 구현
//------------------------------------------------------------
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export const usePlaceStore = create<PlaceStoreType>()(
  persist(
    immer((set, get) => ({
      places: [],
      isListModalOpen: false,

      setPlaces: (newPlaces) => {
        set((state) => {
          state.places = newPlaces;
        });
      },

      clearPlaces: () =>
        set((state) => {
          state.places = [];
        }),

      getPlaceById: (placeId) => {
        return get().places?.find((p) => p.place_id === placeId);
      },

      openListModal: () =>
        set((state) => {
          state.isListModalOpen = true;
        }),

      closeListModal: () =>
        set((state) => {
          state.isListModalOpen = false;
        }),
    })),
    {
      name: 'places-storage',
    },
  ),
);
