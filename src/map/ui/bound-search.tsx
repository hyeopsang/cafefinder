import { useBoundSearch } from "../utils/useBoundSearch";

interface BoundSearchProps {
    setSearchTxt: React.Dispatch<React.SetStateAction<string>>;
    setShowReGps: React.Dispatch<React.SetStateAction<boolean>>;
    showReGps: boolean; // ✅ showReGps 상태를 props로 받음
}

export default function BoundSearch({ setSearchTxt, setShowReGps, showReGps }: BoundSearchProps) {
    const { searchCafesInBounds } = useBoundSearch(setSearchTxt, setShowReGps);
    console.log("BoundSearch 렌더링됨, showReGps:", showReGps);

    return (
        <div 
            className="reGps" 
            onClick={searchCafesInBounds} 
            style={{ opacity: showReGps ? 1 : 0, transition: "opacity 0.3s ease-in-out" }} // ✅ UI에서만 감춤
        >
            <p>현재 위치에서 검색</p>
        </div>
    );
}
