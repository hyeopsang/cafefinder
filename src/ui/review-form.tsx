import ReviewPhoto from "./review-photo";
import ReviewText from "./review-text";

interface ReviewFormProps {
    onPrev: () => void
    text: string
    imageUrls: string[]
    newImages: File[]
    handleImagesChange: (files: File[]) => void
    handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default function ReviewForm ({onPrev, text, imageUrls, newImages, handleImagesChange, handleTextChange} : ReviewFormProps) {
    return (
        <section>
            <button className="w-[80%] button-style bg-blue-100 text-base text-blue-500" onClick={onPrev}>이전으로</button>  
            <ReviewPhoto onChange={handleImagesChange} imageUrls={imageUrls} newImages={newImages}/>
            <ReviewText  text={text} handleTextChange={handleTextChange}/> 
        </section>
        
    )
}
