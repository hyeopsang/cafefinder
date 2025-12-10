import { type Place } from '@/app/zustand/usePlaceStore';
import { Sheet } from 'react-modal-sheet';

interface PlaceModalProps {
  onClose: () => void;
  places: Place[] | null;
}

export default function PlaceModal({ onClose, places }: PlaceModalProps) {
  return (
    <>
      <Sheet.Container className="mx-auto w-full max-w-3xl rounded-t-xl bg-white shadow-xl">
        <Sheet.Header className="flex w-full justify-center py-2">
          <div className="h-1.5 w-12 rounded-full bg-gray-300" />
        </Sheet.Header>
        <Sheet.Content className="h-full overflow-y-auto p-4">
          {places?.map((place) => (
            <p key={place.id} className="py-1 text-sm text-gray-600">
              {place.name}
            </p>
          ))}
        </Sheet.Content>
      </Sheet.Container>

      <Sheet.Backdrop onTap={onClose} />
    </>
  );
}
