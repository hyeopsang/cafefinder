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
        <div className="pointer-events-auto backdrop-blur-2xl z-50 max-w-[480px] min-w-[320px] h-full flex items-end pb-5">
        <div className="slide-in-panel w-[80%] h-fit py-7 bg-white flex flex-col items-center justify-center rounded-2xl shadow-2xl mx-auto gap-3">
            <img className="w-[50%]" src="./images/Lock.png" alt="로그인 아이콘"/>
            <h2 className="text-xl font-bold pb-2">로그인이 필요해요</h2>
            <Link to={"/login"} className="button-style bg-[#121212] text-white w-[80%]">
                <p>로그인 화면으로 이동하기</p>
            </Link>
            <button className="text-sm text-neutral-900 cursor-pointer" onClick={onClose}>다음에 하기</button>
        </div>
        </div>
        </ModalWrapper>
    )
}