import { Sheet } from 'react-modal-sheet';
import PlaceList from './PlaceList';
import { usePlaceStore } from '@/app/zustand/usePlaceStore';

export default function PlaceModal() {
  const { places } = usePlaceStore((state) => state);
  return (
    <>
      <Sheet.Container
        style={{
          boxShadow: '0 -16px 32px -36px rgb(0 0 0 / 0.3), 0 16px 32px -36px rgb(0 0 0 / 0.3)',
        }}
        className="left-1/2! w-full max-w-3xl -translate-x-1/2 overflow-x-hidden overscroll-contain rounded-t-xl bg-white"
      >
        <Sheet.Header className="flex w-full justify-center pt-4 pb-2">
          <div className="h-1.5 w-12 rounded-full bg-gray-300" />
        </Sheet.Header>
        <Sheet.Content disableDrag className="h-full overflow-y-auto p-4">
          <PlaceList places={places} />
        </Sheet.Content>
      </Sheet.Container>
    </>
  );
}
