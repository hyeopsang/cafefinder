import { cancel, search, menu } from "./assets";
import { useSearch } from "../utils/useSearch";

interface SearchFormProps {
  onMenu: (value: boolean) => void;
  currentLocation: kakao.maps.LatLng;
}

const SearchForm = ({ currentLocation, onMenu }: SearchFormProps) => {
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
      className="absolute left-1/2 top-5 z-10 flex h-fit min-w-[365px] max-w-[418px] -translate-x-1/2 justify-between gap-0 rounded-[15px] bg-white shadow-md"
      id="search_form"
      onSubmit={handleSearch}
    >
      <button className="h-[55px] p-[15px]" onClick={() => onMenu(true)}>
        <img className="w-[25px]" src={"/images/menu.png"} alt="Menu" />
      </button>
      <input
        type="text"
        id="keyword"
        size={15}
        className="w-[calc(100%-140px)] bg-white outline-none"
        value={searchTxt}
        onChange={onChangeTxt}
        placeholder="검색"
      />
      {searchTxt && (
        <div className="z-20 flex w-[30px] items-center px-[5px]">
          <img
            src={"/images/cancel.png"}
            onClick={handleCancel}
            alt="Cancel"
          />
        </div>
      )}
      <button className="h-[55px] p-[15px]" type="submit">
        <img className="w-[25px]" src={"/images/search.png"} alt="Search" />
      </button>
    </form>
  );
};

export default SearchForm;
