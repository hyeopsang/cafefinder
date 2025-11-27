import { useState } from 'react';
import GoogleMap from '@/components/google-map';
import SearchTrigger from '@/components/google-map/search-trigger';
import SearchModal from '@/components/google-map/search-modal';

export default function MapPage() {
  const [searchText, setSearchText] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <GoogleMap searchText={searchText} />

      <SearchTrigger text={searchText} onOpen={() => setIsOpen(true)} />

      {isOpen && (
        <SearchModal value={searchText} onChange={setSearchText} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
}
