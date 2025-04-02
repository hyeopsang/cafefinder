export default function Login() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=code`;

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
