export default function HomeSkeleton() {
  return (
    <div>
      <div className="aspect-square w-full bg-gray-200"></div>
      <div className="pt-8">
        <p className="mb-3 w-full px-3 text-base font-semibold">요즘 핫한 카페</p>
        <ul className="flex w-full flex-row items-center gap-4 overflow-hidden pl-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <li key={index} className="flex w-30 shrink-0 flex-col gap-2">
              <div className="aspect-square w-full rounded-2xl bg-gray-200"></div>
              <div className="flex flex-col gap-1">
                <div className="h-4 w-10 rounded-full bg-gray-200"></div>
                <div className="h-4 w-full rounded-full bg-gray-200"></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="pt-8">
        <p className="mb-3 w-full px-3 text-base font-semibold">요즘 핫한 카페</p>
        <ul className="flex w-full flex-row items-center gap-4 overflow-hidden pl-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <li key={index} className="flex w-30 shrink-0 flex-col gap-2">
              <div className="aspect-square w-full rounded-2xl bg-gray-200"></div>
              <div className="flex flex-col gap-1">
                <div className="h-4 w-10 rounded-full bg-gray-200"></div>
                <div className="h-4 w-full rounded-full bg-gray-200"></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
