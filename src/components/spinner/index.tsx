import { Player } from '@lottiefiles/react-lottie-player';

export default function Spinner() {
  return (
    <Player
      src="./images/loading.json"
      autoplay
      loop
      speed={1}
      className="fixed top-1/2 left-1/2 z-80 h-20 w-20 -translate-1/2"
    ></Player>
  );
}
