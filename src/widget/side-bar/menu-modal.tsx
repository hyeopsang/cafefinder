import "./menu-modal.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../app/redux/authSlice";
import { motion } from "framer-motion";
import { X, Pencil, LogIn, LogOut, MapPin, Bookmark } from 'lucide-react';
import { createPortal } from "react-dom";
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

  return createPortal(
    <div     
      className="slide-in-panel absolute top-0 z-50 right-0 left-0 h-full bg-white p-4"
    >
      <div className="w-fit aspect-square flex items-center p-2 text-white rounded-full bg-buttonRed ml-auto">
        <X className="w-[30px] cursor-pointer" onClick={onClose} />
      </div>
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
    </div>,
    document.getElementById("root")
  );
}

