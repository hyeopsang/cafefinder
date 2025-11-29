import { motion } from 'motion/react';
import Search from '@/assets/search.svg?react';
import { useMap } from '@vis.gl/react-google-maps';
import { useState } from 'react';

import { fetchPlaceDetails } from '@/api/placeApi';

interface PlaceResult {
  id: string;
  displayName: { text: string };
  location: google.maps.LatLng;
  businessStatus: string;
}

interface SearchModalProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

export default function SearchModal({ value, onChange, onClose }: SearchModalProps) {
  const map = useMap();
  const [results, setResults] = useState<PlaceResult[]>([]);

  const handleSearch = async () => {
    if (!value || !map) return;

    const currentBounds = map.getBounds();

    if (!currentBounds) {
      console.error('맵 경계 정보를 가져올 수 없습니다.');
      return;
    }

    const { Place } = (await google.maps.importLibrary('places')) as any;

    const request = {
      textQuery: value,
      fields: ['id', 'displayName', 'location', 'businessStatus'],
      includedType: 'cafe',
      useStrictTypeFiltering: true,
      locationRestriction: currentBounds,
      isOpenNow: false,
      language: 'ko',
      maxResultCount: 8,
      region: 'kr',
    };

    try {
      const { places } = await Place.searchByText(request);

      setResults(places || []);
    } catch (err) {
      console.error('검색 에러:', err);
    }
  };

  const handleSelect = (place: PlaceResult) => {
    if (map && place.location) {
      map.setCenter(place.location);
      map.setZoom(16);
    }

    fetchPlaceDetails(place.id);
    onClose();
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
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        transition={{ duration: 0.15, ease: 'easeInOut' }}
        className="relative inset-x-0 top-0 h-[calc(100%-100px)] w-full rounded-t-2xl bg-white p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 입력 영역 */}
        <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="상호명을 입력해주세요"
            className="flex-1 outline-none placeholder:text-sm"
            autoFocus
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch}>
            <Search className="h-6 w-6 text-purple-600" />
          </button>
        </div>

        <ul className="mt-4 max-h-[70%] space-y-2 overflow-y-auto">
          {results.length > 0 ? (
            results.map((place) => (
              <li
                key={place.id}
                className="cursor-pointer rounded-md border p-3 hover:bg-gray-100"
                onClick={() => handleSelect(place)}
              >
                <p className="font-medium">{place.displayName.text}</p>
                <p className="text-xs text-gray-500">{place.businessStatus}</p>
              </li>
            ))
          ) : (
            <li className="p-3 text-center text-gray-500">
              {value ? '검색 결과가 없습니다.' : '검색어를 입력해주세요.'}
            </li>
          )}
        </ul>
      </motion.div>
    </motion.div>
  );
}
