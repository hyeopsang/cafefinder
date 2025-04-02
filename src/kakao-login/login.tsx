import { KAKAO_AUTH_URL } from "../config";

export default function Login() {
  return (
    <div className="relative flex h-svh min-w-[375px] max-w-[428px] flex-col items-center justify-center gap-[15px] overflow-hidden bg-white">
      <h2 className="text-center text-[32px] font-bold text-[#212121]">
        Cafe Finder
      </h2>
      <div className="absolute bottom-[30px] px-[30px]">
        <a href={KAKAO_AUTH_URL}>
          <img src="./images/kakaologin.png" />
        </a>
      </div>
    </div>
  );
}
