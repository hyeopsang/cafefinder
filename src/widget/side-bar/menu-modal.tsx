import "./modal-animation.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../app/redux/authSlice";
import { motion } from "framer-motion";
import { X, Pencil, LogIn, LogOut, MapPin, Bookmark } from 'lucide-react';
import { createPortal } from "react-dom";
import ModalWrapper from "./modal-wrapper";
interface User {
  [key: string]: any;
}
interface StateType {
  isAuthenticated: boolean;
  user: User | null;
  auth: {
    user: User | null;
  };
}
interface MenuProps {
  onClose: () => void;
}

interface AuthState {
  user: User | null;
}

export default function MenuModal({ onClose }: MenuProps) {
  const auth: AuthState = useSelector((state: StateType) => state.auth);
  const dispatch = useDispatch();
  const userInfo = auth.user?.properties || null;
  console.log("userInfo", userInfo);
  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };
  const profileImageUrl = userInfo?.profile_image
    ? userInfo.profile_image.replace("http://", "https://")
    : "/images/profile.svg";

  return(
    <ModalWrapper>
         <div     
      className="slide-in-panel z-50 max-w-[480px] min-w-[320px] mx-auto pointer-events-auto  bg-white p-4 h-full"
    >
        <X className="w-[30px] cursor-pointer ml-auto" onClick={onClose} />
      <div className="mx-auto flex h-full w-full flex-col items-center justify-center ">
            <div className="aspect-square w-[130px] overflow-hidden rounded-full bg-white">
              <img src={profileImageUrl} alt="Profile" />
            </div>
        <div className="w-full flex flex-col items-center gap-4 pt-4">
                <Link to={"/my-review"}>
                  <div className="flex justify-between button-style w-[130px] px-5 text-neutral-900 bg-white">
                    <Pencil size={20}/>
                    <p>나의 리뷰</p>
                  </div>
                </Link>
                <Link to={"/book-mark"}>
                  <div className="flex justify-between px-5 w-[130px]  text-neutral-900 bg-white button-style">
                    <Bookmark size={20}/>
                    <p>북마크</p>
                  </div>
                </Link>
                <a onClick={handleLogout}>
                <div className="flex justify-between px-5 w-[130px] items-center bg-neutral-900 button-style text-white cursor-pointer">
                  <LogOut size={20}/>
                  <p>로그아웃</p>
                </div>      
              </a>
        </div>  
      </div>
    </div>
   
    </ModalWrapper>
  );
}

