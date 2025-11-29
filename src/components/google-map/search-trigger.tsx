import Search from '@/assets/search.svg?react';

interface Props {
  text: string;
  onOpen: () => void;
}

export default function SearchTrigger({ text, onOpen }: Props) {
  return (
    <button
      onClick={onOpen}
      className="absolute top-3 left-1/2 z-50 flex w-[calc(100%-40px)] -translate-x-1/2 items-center gap-3 rounded-lg bg-white p-3 text-sm shadow-sm"
    >
      <Search className="h-5 w-5 text-gray-800" />
      <input
        placeholder="어떤 카페를 찾으시나요?
      "
        className="pointer-events-none flex-1 text-left text-gray-500"
        value={text}
        readOnly
      ></input>
    </button>
  );
}
