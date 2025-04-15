import { createPortal } from "react-dom";
import "./modal-animation.css"
import { Link } from "react-router";
import ModalWrapper from "./modal-wrapper";
interface MenuProps {
    onClose: () => void;
  }
  
export default function AlertModal ({ onClose }: MenuProps) {
    return (
        <ModalWrapper>
        <div className="pointer-events-auto mx-auto z-50 max-w-[480px] min-w-[320px] h-full flex items-end pb-7 text-sm text-neutral-900">
        <div className="slide-in-panel w-[300px] h-fit px-4 py-6 bg-white flex flex-col items-center justify-center rounded-xl shadow-2xl mx-auto gap-3">
            <img className="w-[50%]" src="./images/Lock.png" alt="로그인 아이콘"/>
            <h2 className="font-semibold pb-2">해당 기능은 로그인이 필요해요</h2>
            <Link to={"/login"} className="button-style bg-blue-100 text-blue-500 w-full">
                <p>로그인 화면으로 이동하기</p>
            </Link>
            <button className="cursor-pointer" onClick={onClose}>다음에 하기</button>
        </div>
        </div>
        </ModalWrapper>
    )
}