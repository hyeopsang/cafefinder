import { Link } from "react-router";
import { Ban } from "lucide-react";

export default function PhotoPreview ({ photos }: { photos?: string[] }) {
  const previewPhotos = Array.isArray(photos) ? photos.slice(0, 6) : [];

  return (
    <div className="w-full mx-auto">
      <div className="flex justify-center items-center relative">
        <h2 className="text-base font-semibold pb-1">사진</h2>
        {
          previewPhotos.length > 6 && (
            <Link to="/photos" className="absolute right-0 top-[50%] transform translate-y-[-50%]">
              <button>
                더보기
              </button>
            </Link>
          )
        }
      </div>
      {
        previewPhotos.length > 0 
        ? (
          <div className="grid grid-cols-3 border rounded-2xl border-neutral-300 p-2 shadow-inner divide-x divide-y divide-neutral-900">
            {previewPhotos.map((url, id) => (
              <img
                key={id}
                src={url}
                alt={`photo-${id}`}
                className="w-full aspect-square object-cover"
              />
            ))}
          </div>
        )
        : (
          <div className="flex justify-center items-center gap-2 text-sm rounded-2xl bg-neutral-100 text-neutral-400 py-4 w-full text-center">
            <Ban className="w-4 h-4"/><p>사진이 없어요</p>
          </div>
        )
      }
    </div>
  );
}
