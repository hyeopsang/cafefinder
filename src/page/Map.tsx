import { useState } from 'react';
import GoogleMap from '@/components/map/GoogleMap';
import SearchTrigger from '@/components/map/SearchTrigger';
import SearchModal from '@/components/map/SearchModal';

import { AnimatePresence } from 'motion/react';
import PlaceModal from '@/components/map/PlaceModal';
import { Sheet } from 'react-modal-sheet';
import { usePlaceStore } from '@/app/zustand/usePlaceStore';

export default function Map() {
  const [searchText, setSearchText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { isListModalOpen, closeListModal } = usePlaceStore((state) => state);
  return (
    <div className="relative h-full w-full overflow-hidden">
      <GoogleMap />
      <SearchTrigger text={searchText} onOpen={() => setIsOpen(true)} />
      <AnimatePresence>
        {isOpen && (
          <SearchModal
            value={searchText}
            onChange={setSearchText}
            onClose={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
      <Sheet
        unstyled
        disableDrag={false}
        isOpen={isListModalOpen}
        onClose={closeListModal}
        initialSnap={1}
        snapPoints={[0, 0.09, 0.35, 1]}
        disableDismiss
        prefersReducedMotion={true}
        detent="content"
        className="z-20! overflow-hidden overflow-x-hidden"
      >
        <PlaceModal />
      </Sheet>
    </div>
  );
}
