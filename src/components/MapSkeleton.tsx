export default function MapSkeleton() {
  return (
    <div className="relative h-full w-full bg-gray-100">
      <div className="top-3 left-1/2 h-11 w-[calc(100%-40px)] -translate-x-1/2 rounded-2xl bg-gray-200 p-3">
        <div className="rounded-full bg-gray-100 p-1.5"></div>
      </div>
    </div>
  );
}
