import { useSearch } from "../utils/useSearch";
import { Search, AlignJustify } from "lucide-react";
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
  className="absolute left-1/2 top-5 z-10 flex min-w-[365px] max-w-[418px] -translate-x-1/2 items-center justify-between rounded-[15px] bg-white shadow-md"
  id="search_form"
  onSubmit={handleSearch}
>
  {/* 메뉴 버튼 */}
  <button type="button" className="p-4" onClick={() => setIsOpen(true)}>
    <AlignJustify className="w-6" /> 
  </button>

  {/* 검색 입력창 */}
  <input
    type="text"
    id="keyword"
    className="flex-1 text-lg bg-white outline-none px-2"
    value={searchTxt}
    onChange={onChangeTxt}
    placeholder="검색"
  />

  {/* 입력값이 있을 때만 X 버튼 표시 */}
  {searchTxt && (
    <button type="button" className="p-2" onClick={handleCancel}>
      <img className="w-5" src="/images/cancel.png" alt="Cancel" />
    </button>
  )}

  {/* 검색 버튼 */}
  <button type="submit" className="p-4">
    <Search className="w-6" />
  </button>
</form>

  );
};

export default SearchForm;
