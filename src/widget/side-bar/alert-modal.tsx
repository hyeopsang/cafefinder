import { createPortal } from "react-dom";
import { Link } from "react-router";
interface MenuProps {
    onClose: () => void;
  }
  
export default function AlertModal ({ onClose }: MenuProps) {
    return createPortal(
        <div className="backdrop-blur-2xl absolute bottom-0 left-0 right-0 z-50 w-full h-full flex items-end pb-5">
        <div className="w-[80%] h-fit py-7 bg-white flex flex-col items-center justify-center rounded-2xl shadow-2xl mx-auto gap-3">
            <img className="w-[50%]" src="./images/Lock.png" alt="로그인 아이콘"/>
            <h2 className="text-xl font-bold pb-2">로그인이 필요해요</h2>
            <Link to={"/login"} className="button-style bg-[#121212] text-white w-[80%]">
                <p>로그인 화면으로 이동하기</p>
            </Link>
            <button className="text-sm text-neutral-900 cursor-pointer" onClick={onClose}>다음에 하기</button>
        </div>
        </div>,
        document.getElementById("root")
    )
}