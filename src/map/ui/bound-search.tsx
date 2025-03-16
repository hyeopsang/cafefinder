import { useBoundSearch } from "../utils/useBoundSearch";

interface BoundSearchProps {
    setSearchTxt: React.Dispatch<React.SetStateAction<string>>;
    setShowReGps: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BoundSearch({ setSearchTxt, setShowReGps }: BoundSearchProps) {
    const { searchCafesInBounds } = useBoundSearch(setSearchTxt, setShowReGps);

    return (
        <div className="reGps" onClick={searchCafesInBounds}>
            <p>현재 위치에서 검색</p>
        </div>
    );
}
