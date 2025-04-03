export default function Login() {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=code`;

  return (
    <div className="relative flex h-svh min-w-mobile max-w-mobile flex-col items-center justify-center gap-[15px] overflow-hidden bg-white">
      <h2 className="text-center text-4xl font-bold text-neutral-900">
        카페 찾기
      </h2>
      <div className="absolute bottom-[30px] right-0 left-0">
        <a href={KAKAO_AUTH_URL}>
          <img src="./images/kakaologin.png" />
        </a>
      </div>
    </div>
  );
}
