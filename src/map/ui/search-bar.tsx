import { useSearch } from "../utils/useSearch";
import { Search, AlignJustify, X} from "lucide-react";
interface SearchFormProps {
  setIsOpen: (value: boolean) => void;
  currentLocation: kakao.maps.LatLng;
}

const SearchForm = ({ currentLocation, setIsOpen }: SearchFormProps) => {
  const { performSearch, setSearchTxt, searchTxt } = useSearch(currentLocation);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Search submitted");  // 이 로그가 보이면 클릭 이벤트는 정상 동작
    if (searchTxt.trim() === "") return;
    console.log("Calling performSearch...");  // performSearch가 호출되기 직전
    await performSearch();
  };
  
  

  const onChangeTxt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTxt(e.target.value);
  };

  const handleCancel = () => {
    setSearchTxt("");
  };

  return (
    <form
      className="absolute left-1/2 top-5 z-10 flex w-[90%] -translate-x-1/2 items-center justify-between rounded-xl px-2 py-1 bg-white shadow-md"
      id="search_form"
      onSubmit={handleSearch}
    >
  {/* 메뉴 버튼 */}
  <button type="button" className="p-2" onClick={() => setIsOpen(true)}>
    <AlignJustify className="w-5" /> 
  </button>

  {/* 검색 입력창 */}
  <input
    type="text"
    id="keyword"
    className="flex-grow text-sm bg-white outline-none"
    value={searchTxt}
    onChange={onChangeTxt}
    placeholder="카페명으로 검색"
  />
  
  <div className="w-5 flex justify-end">
    {searchTxt && (
      <button type="button" onClick={handleCancel}>
        <X className="w-5"/>
      </button>
    )}
  </div>

  {/* 검색 버튼 */}
  <button type="submit" className="p-2">
    <Search className="w-5" />
  </button>
</form>

  );
};

export default SearchForm;
