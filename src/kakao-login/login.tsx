export default function Login() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=code`;

  return (
    <div className="relative flex h-svh min-w-mobile max-w-mobile flex-col items-center justify-center gap-[15px] overflow-hidden bg-white">
      <img src="./images/textLogo.png" className="absolute top-[20%] w-[50%]"/>
      <div className="w-full">
        <a href={KAKAO_AUTH_URL}>
          <img src="./images/kakaologin.png" className="w-[calc(100%-20px)] mx-auto" />
        </a>
      </div>
    </div>
  );
}
