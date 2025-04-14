import ReviewPhoto from "./review-photo";
import ReviewText from "./review-text";

interface ReviewFormProps {
    onPrev: () => void
    text: string
    handleImagesChange: (files: File[]) => void
    handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default function ReviewForm ({onPrev, text, handleImagesChange, handleTextChange} : ReviewFormProps) {
    return (
        <section>
            <button onClick={onPrev}>뒤로가기</button>
            <ReviewPhoto onChange={handleImagesChange}/>
            <ReviewText  text={text} handleTextChange={handleTextChange}/> 
        </section>
        
    )
}