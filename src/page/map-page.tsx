import { useState } from 'react';
import GoogleMap from '@/components/google-map';
import SearchTrigger from '@/components/google-map/search-trigger';
import SearchModal from '@/components/google-map/search-modal';

import { AnimatePresence } from 'motion/react';
import PlaceModal from '@/components/google-map/place-modal';
import { Sheet } from 'react-modal-sheet';

export default function MapPage() {
  const [searchText, setSearchText] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <GoogleMap />
      <SearchTrigger text={searchText} onOpen={() => setIsOpen(true)} />
      {/* <AnimatePresence>
        {isOpen && (
          <SearchModal
            value={searchText}
            onChange={setSearchText}
            onClose={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence> */}
      <Sheet
        unstyled
        disableDrag={false}
        className="mx-auto w-full max-w-3xl"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        initialSnap={1}
        snapPoints={[0, 0.2, 0.6, 1]}
        drag="y"
        detent="content"
        disableDismiss
        prefersReducedMotion={true}
        modalEffectThreshold={0.6}
      >
        <PlaceModal onClose={() => setIsOpen(false)} />
      </Sheet>
    </div>
  );
}
