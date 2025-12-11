interface ThumbnailProps {
  url: string;
}

export default function Thumbnail({ url }: ThumbnailProps) {
  return (
    <div className="aspect-square w-30 overflow-hidden rounded-xl">
      <img src={url} alt="카페 이미지" className="h-full w-full object-cover" />
    </div>
  );
}
