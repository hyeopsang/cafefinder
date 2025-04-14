interface ReviewProps {
    text: string,
    handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default function ReviewText({text, handleTextChange} : ReviewProps){
    return (
        <>
        <h2 className="font-semibold text-base m-0">리뷰</h2>
        <textarea
          value={text}
          onChange={handleTextChange}
          minLength={3}
          maxLength={100}
          placeholder="100자 미만"
          className="w-[80%] h-[135px] mx-auto border p-2 text-neutral-900 rounded-md"
        />
        </>
    )
}