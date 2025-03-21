import { KAKAO_AUTH_URL } from "../config";
import { kakaologin, logingomgom } from "./assets";  

export default function Login() {
  return (
    <div className="relative flex h-svh min-w-[375px] max-w-[428px] flex-col items-center justify-center gap-[15px] overflow-hidden bg-white">
      <div className="px-[120px]">
        <img src={logingomgom} />
      </div>
      <h2 className="text-center text-[32px] font-bold text-[#212121]">
        Cafe Road
      </h2>
      <div className="absolute bottom-[30px] px-[30px]">
        <a href={KAKAO_AUTH_URL}>
          <img src={kakaologin} />
        </a>
      </div>
    </div>
  );
}
