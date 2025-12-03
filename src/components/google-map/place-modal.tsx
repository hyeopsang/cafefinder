import { Sheet } from 'react-modal-sheet';

interface PlaceModalProps {
  onClose: () => void;
}

export default function PlaceModal({ onClose }: PlaceModalProps) {
  return (
    <>
      <Sheet.Container className="mx-auto w-full max-w-3xl rounded-t-xl bg-white shadow-xl">
        {/* Handle */}
        <Sheet.Header className="flex w-full justify-center py-2">
          <div className="h-1.5 w-12 rounded-full bg-gray-300" />
        </Sheet.Header>

        {/* Content */}
        <Sheet.Content className="h-full overflow-y-auto p-4">
          <h2 className="text-lg font-bold">카페명</h2>
          {[...Array(20)].map((_, i) => (
            <p key={i} className="py-1 text-sm text-gray-600">
              내용 {i + 1}
            </p>
          ))}
        </Sheet.Content>
      </Sheet.Container>

      <Sheet.Backdrop onTap={onClose} />
    </>
  );
}
