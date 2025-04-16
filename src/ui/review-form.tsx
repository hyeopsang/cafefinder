import ReviewPhoto from "./review-photo";
import ReviewText from "./review-text";

interface ReviewFormProps {
    onPrev: () => void
    text: string
    images: string[]
    handleImagesChange: (files: File[]) => void
    handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default function ReviewForm ({onPrev, text, images, handleImagesChange, handleTextChange} : ReviewFormProps) {
    return (
        <section>
            <button className="w-[80%] button-style bg-blue-100 text-base text-blue-500" onClick={onPrev}>이전으로</button>  
            <ReviewPhoto onChange={handleImagesChange} exitImages={images}/>
            <ReviewText  text={text} handleTextChange={handleTextChange}/> 
        </section>
        
    )
}
