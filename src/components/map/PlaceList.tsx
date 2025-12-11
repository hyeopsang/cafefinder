import type { Place } from '@/app/zustand/usePlaceStore';
import PlaceItem from './PlaceItem';

export default function PlaceList({ places }: { places: Place[] | null }) {
  return (
    <ul className="flex flex-col gap-1">
      {places?.map((place) => (
        <PlaceItem key={place.id} place={place} />
      ))}
    </ul>
  );
}
