
const keywordList = {
  "음식/가격": [
    "커피가 맛있어요",
    "음료가 맛있어요",
    "디저트가 맛있어요",
    "빵이 맛있어요",
    "가성비가 좋아요",
    "비싼 만큼 가치있어요",
    "종류가 다양해요",
  ],
  분위기: [
    "인테리어가 좋아요",
    "사진이 잘 나와요",
    "대화하기 좋아요",
    "집중하기 좋아요",
    "뷰가 좋아요",
    "매장이 넓어요",
    "아늑해요",
    "야외공간이 멋져요",
    "음악이 좋아요",
    "분위기가 좋아요",
  ],
  기타: [
    "친절해요",
    "매장이 청결해요",
    "화장실이 깨끗해요",
    "주차공간이 넓어요",
    "좌석이 편해요",
    "반려동물과 가기 좋아요",
  ],
};

interface KeywordSelectorProps {
  selected: string[];
  onChange: (updated: string[]) => void;
}

export default function KeywordSelector({ selected, onChange }: KeywordSelectorProps) {
  const handleToggle = (keyword: string) => {
    const isSelected = selected.includes(keyword);
    if(!isSelected && selected.length >= 8) return
    const updated = isSelected
      ? selected.filter((k) => k !== keyword)
      : [...selected, keyword];
    onChange(updated);
  };

  const handleRemove = (keyword: string) => {
    const updated = selected.filter((k) => k !== keyword);
    onChange(updated);
  };

  return (
    <section aria-label="리뷰 키워드 선택" className="w-[80%] mx-auto space-y-4 whitespace-nowrap">
      <h2 className="text-base font-semibold m-0 pb-1">카페에 어울리는 키워드를 선택해주세요!</h2>
      <p className="text-neutral-400 m-0 pb-2">(최대 8개)</p>
      {selected.length > 0 && (
        <div>
          <h3 className="font-semibold text-neutral-700 mb-1">선택된 키워드</h3>
          <ul className="flex flex-wrap gap-2">
            {selected.map((keyword) => (
              <li
                key={keyword}
                className="w-fit text-xs px-3 py-2 bg-white border border-neutral-200 hover:bg-gray-100 rounded-full"
              >
                # {keyword}
                <button
                  onClick={() => handleRemove(keyword)}
                  className="ml-2 text-xs text-red-500 hover:text-red-700"
                  aria-label={`키워드 제거: ${keyword}`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {Object.entries(keywordList).map(([category, keywords]) => (
        <fieldset key={category} className="border-t border-neutral-200 mx-auto rounded">
          <legend className="font-semibold text-sm px-2">{category}</legend>
          <ul className="flex flex-wrap justify-center gap-2 pt-2">
            {keywords.map((keyword) => {
              const isSelected = selected.includes(keyword);
              const buttonClass = isSelected
                ? "w-fit text-xs px-3 py-2 border bg-blue-100 text-blue-500 border-blue-500 rounded-full"
                : "w-fit text-xs px-3 py-2 bg-white text-netural-900 border border-neutral-200 hover:bg-gray-100 rounded-full";

              return (
                <li key={keyword}>
                  <button
                    type="button"
                    onClick={() => handleToggle(keyword)}
                    className={buttonClass}
                  >
                    # {keyword}
                  </button>
                </li>
              );
            })}
          </ul>
        </fieldset>
      ))}
    </section>
  );
}
