import ImageSlider from './ImageSlider';
import OpenStatus from './OpenStatus';
import Thumbnail from './Thumbnail';
import type { Place } from '@/app/zustand/usePlaceStore';

export default function PlaceItem({ place }: { place: Place }) {
  const openStatus = place.opening_hours?.openNow;
  const formattedAddress = place.address?.replace('대한민국 울산광역시 ', '');

  return (
    <li className="text- flex flex-col py-2 text-sm text-gray-700">
      <div className="flex items-center gap-2">
        <p className="text-lg font-semibold">{place.name}</p>
        <OpenStatus isOpen={openStatus} />
      </div>
      <div>{formattedAddress}</div>
      <div className="mt-2">
        <ImageSlider spaceBetween={8}>
          {place.photo_urls?.map((url) => (
            <Thumbnail key={url} url={url} />
          ))}
        </ImageSlider>
      </div>
    </li>
  );
}
