interface ReviewRepostProps {
    onClickModal: () => void;
}

export default function ReviewRepost({ onClickModal } : ReviewRepostProps) {
    return (
        <button className="w-fit button-style-s px-4 bg-neutral-900 text-white font-medium shadow-none" onClick={onClickModal}>
            수정
        </button>
    )
}
