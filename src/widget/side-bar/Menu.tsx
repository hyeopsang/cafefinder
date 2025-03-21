import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../app/redux/authSlice";
import { motion } from "framer-motion";

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
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
}

interface AuthState {
  user: User | null;
}

export default function Menu({ setIsOpen, isOpen }: MenuProps) {
  const auth: AuthState = useSelector((state: StateType) => state.auth);
  const userInfo = auth.user?.properties || {};
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };
  const profileImageUrl = userInfo.profile_image
    ? userInfo.profile_image.replace("http://", "https://")
    : "/images/profile.svg";

  return (
    <motion.div
      initial={{ transform: "translateX(-100%)" }}
      animate={{ transform: isOpen ? "translateX(0%)" : "translateX(-100%)" }}
      exit={{ transform: "translateX(100%)", opacity: 0 }}
      transition={{ type: "keyframes", stiffness: 120 }}
      className="absolute top-0 left-0 z-50 w-full h-svh bg-white p-5 shadow-lg"
    >
      <div className="flex h-[50px] w-full items-center justify-end px-[15px]">
        <img
          className="w-[30px] cursor-pointer"
          src="./images/close.svg"
          alt="닫기"
          onClick={() => setIsOpen(false)}
        />
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="flex w-full flex-col items-center gap-[15px]">
          <div className="aspect-square w-[150px] overflow-hidden rounded-[200px] bg-white">
            <img src={profileImageUrl} alt="Profile" />
          </div>
          <h2 className="text-[24px] text-[#212121]">
            {userInfo.nickname || "Guest"}
          </h2>
        </div>
        <div className="flex flex-col items-center gap-[15px] pt-[15px] text-[24px]">
          {
            userInfo && (
              <Link to={"/myreview"}>
                <p>내가 쓴 리뷰</p>
              </Link>
            )
          }
          
          {
            userInfo ? (
              <a onClick={handleLogout}>
                로그 아웃
              </a>
            )
            : (
              <Link to={"/login"}>
                <p>로그인</p>
              </Link>
            )
          }
          
        </div>
      </div>
    </motion.div>
  );
}

