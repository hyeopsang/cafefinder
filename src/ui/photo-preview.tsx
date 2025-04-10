import { Link } from "react-router";

export default function PhotoPreview ({ photos }: { photos?: string[] }) {
  const previewPhotos = Array.isArray(photos) ? photos.slice(0, 6) : [];

  return (
    <div className="w-full mx-auto">
      <div className="flex justify-center items-center relative py-4">
        <h2 className="text-base font-semibold">리뷰 사진</h2>
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
          <p className="text-sm rounded-2xl bg-neutral-100 py-4 w-full text-center">
            사진이 없어요
          </p>
        )
      }
    </div>
  );
}
