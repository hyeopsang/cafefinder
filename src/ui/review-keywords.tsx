import KeywordSelector from "./keyword-selector"

interface ReviewKeywordsProps {
  onNext: () => void
  updatedKeywords: (keywords: string[]) => void
  keywords: string[]
}

export default function ReviewKeywords({ onNext, updatedKeywords, keywords } : ReviewKeywordsProps){
    return (
      <section>
        <button onClick={onNext}>건너뛰기</button>
        <KeywordSelector
        selected={keywords || []}
        onChange={updatedKeywords}
        />  
      </section>
    )
}