import KeywordSelector from "./keyword-selector"

interface ReviewKeywordsProps {
  onNext: () => void
  updatedKeywords: (keywords: string[]) => void
  keywords: string[]
}

export default function ReviewKeywords({ onNext, updatedKeywords, keywords } : ReviewKeywordsProps){
    return (
      <section>
        <button className="w-[80%] button-style bg-blue-100 text-base text-blue-500" onClick={onNext}>건너뛰기</button>  
        <KeywordSelector
        selected={keywords || []}
        onChange={updatedKeywords}
        />
        <button className="w-[80%] button-style bg-blue-100 text-base text-blue-500" onClick={onNext}>다음으로</button>  
      </section>
    )
}