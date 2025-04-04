import { useEffect } from "react";
import { useSearch } from "../utils/useSearch";
import { Search, AlignJustify, CircleX } from "lucide-react";

interface SearchFormProps {
  setIsOpen: (value: boolean) => void;
  currentLocation: google.maps.LatLng | null;
}

const SearchForm = ({ currentLocation, setIsOpen }: SearchFormProps) => {
  const { performSearch, setSearchTxt, searchTxt } = useSearch();

  useEffect(() => {
    if (currentLocation) {
      setSearchTxt(""); // 위치 변경 시 검색어 초기화
    }
  }, [currentLocation]);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchTxt.trim() || !currentLocation) return;
    await performSearch(searchTxt, currentLocation);
  };

  const onChangeTxt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTxt(e.target.value);
  };

  const handleCancel = () => {
    setSearchTxt("");
  };

  return (
    <form
      className="absolute left-1/2 top-5 z-10 flex w-[calc(100%-40px)] -translate-x-1/2 items-center justify-between rounded-[15px] bg-white shadow-md"
      id="search_form"
      onSubmit={handleSearch}
    >
      <button type="button" className="p-4" onClick={() => setIsOpen(true)}>
        <AlignJustify className="w-6" />
      </button>

      <input
        type="text"
        id="keyword"
        aria-label="검색어 입력"
        className="flex-grow text-lg bg-white outline-none"
        value={searchTxt}
        onChange={onChangeTxt}
        placeholder="검색"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            const form = document.getElementById("search_form") as HTMLFormElement;
            form?.requestSubmit();
          }
        }}
      />

      <div className="w-6 flex justify-end">
        {searchTxt && (
          <button type="button" onClick={handleCancel} aria-label="검색어 초기화">
            <CircleX className="w-5" />
          </button>
        )}
      </div>

      <button type="submit" className="p-4" disabled={!searchTxt.trim()} aria-label="검색 실행">
        <Search className="w-6" />
      </button>
    </form>
  );
};

export default SearchForm;
