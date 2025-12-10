import { motion } from 'motion/react';
import Search from '@/assets/search.svg?react';
import Coffee from '@/assets/coffee.svg?react';
import { useMap } from '@vis.gl/react-google-maps';
import { useState, useEffect } from 'react';
import { fetchPlaceDetails } from '@/api/placeApi';
import { useMarkerStore } from '@/app/zustand/useMarkerStore';
import { useUlsanBounds } from './useUlsanBounds';
import Spinner from '../Spinner';
import { usePlaceStore } from '@/app/zustand/usePlaceStore';

interface PlaceResult {
  id: string;
  displayName: string;
  formattedAddress: string;
  location: { lat: number; lng: number };
}

interface SearchModalProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

const DEBOUNCE_DELAY = 600;
const RECENT_KEY = 'recent_searches';

const getRecentSearches = (): string[] => {
  const stored = localStorage.getItem(RECENT_KEY);
  return stored ? JSON.parse(stored) : [];
};

const addRecentSearch = (keyword: string) => {
  const existing = getRecentSearches().filter((k) => k !== keyword);
  const updated = [keyword, ...existing].slice(0, 10);
  localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
};

const clearRecentSearches = () => {
  localStorage.removeItem(RECENT_KEY);
};

export default function SearchModal({ value, onChange, onClose }: SearchModalProps) {
  const addMarker = useMarkerStore((state) => state.addMarker);
  const { setPlaces, openListModal } = usePlaceStore((state) => state);
  const bounds = useUlsanBounds();
  const map = useMap();
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [recent, setRecent] = useState<string[]>(getRecentSearches());
  const handleSearch = async () => {
    if (!value || value.trim().length < 2 || !map) return;
    setLoading(true);

    if (!bounds) {
      console.error('맵 경계 정보를 가져올 수 없습니다.');
      setLoading(false);
      return;
    }

    const { Place } = (await google.maps.importLibrary('places')) as any;

    const request = {
      textQuery: value,
      fields: ['id', 'displayName', 'formattedAddress', 'location'],
      includedType: 'cafe',
      useStrictTypeFiltering: true,
      locationRestriction: bounds,
      rankPreference: 'RELEVANCE',

      language: 'ko',
      region: 'kr',
      maxResultCount: 8,
    };

    try {
      const { places } = await Place.searchByText(request);
      setResults(places || []);
      console.log(places);
    } catch (err) {
      console.error('검색 에러:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!value || value.trim().length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      handleSearch();
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [value]);

  const handleSelect = async (place: PlaceResult) => {
    addRecentSearch(place.displayName);
    setRecent(getRecentSearches());
    setPlaces([]);
    addMarker({
      id: place.id,
      location: place.location,
    });

    if (map && place.location) {
      map.setCenter(place.location);
      map.setZoom(16);
    }

    const selectedPlace = await fetchPlaceDetails(place.id);
    setPlaces(selectedPlace);
    openListModal();
    onClose();
  };

  const clickRecent = (keyword: string) => {
    onChange(keyword);
    setRecent(getRecentSearches());
  };

  const resetRecent = () => {
    clearRecentSearches();
    setRecent([]);
  };

  return (
    <motion.div
      className="absolute inset-0 z-60 mx-auto flex w-full max-w-3xl items-end justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />

      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="relative inset-x-0 top-0 h-[calc(100%-100px)] w-full overflow-hidden rounded-t-xl bg-white pt-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b-4 p-5">
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="상호명을 입력해주세요"
            className="flex-1 outline-none placeholder:text-sm"
          />
          <button onClick={handleSearch}>
            <Search className="h-6 w-6 text-purple-600" />
          </button>
        </div>

        {!loading && results.length === 0 && !value && (
          <div className="border-b p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-base font-semibold">최근 검색어</p>
              {recent.length > 0 && (
                <button
                  className="rounded-full border px-2 py-1 text-xs text-gray-600"
                  onClick={resetRecent}
                >
                  전체삭제
                </button>
              )}
            </div>

            <ul className="flex flex-wrap justify-center gap-2">
              {recent.length === 0 ? (
                <p className="text-sm text-gray-400">기록이 없습니다.</p>
              ) : (
                recent.map((item) => (
                  <li
                    key={item}
                    className="cursor-pointer rounded-full border border-gray-300 px-3 py-1 text-xs hover:bg-gray-100"
                    onClick={() => clickRecent(item)}
                  >
                    {item}
                  </li>
                ))
              )}
            </ul>
          </div>
        )}

        <ul className="mt-4 max-h-[70%] space-y-3 overflow-y-auto">
          {loading ? (
            <div className="flex gap-2">
              <Spinner />
              <p className="text-sm">검색 중...</p>
            </div>
          ) : results.length > 0 ? (
            results.map((place) => (
              <li
                key={place.id}
                className="flex cursor-pointer items-center gap-3 px-3 hover:bg-gray-100"
                onClick={() => handleSelect(place)}
              >
                <Coffee className="h-5 w-5" />
                <div className="flex-1">
                  <p className="text-base font-medium">{place.displayName}</p>
                  <p className="text-xs text-gray-500">{place.formattedAddress}</p>
                </div>
              </li>
            ))
          ) : (
            value &&
            value.length >= 2 && (
              <li className="p-3 text-center text-sm font-bold text-purple-300">
                검색 결과가 없습니다.
              </li>
            )
          )}
        </ul>
      </motion.div>
    </motion.div>
  );
}
