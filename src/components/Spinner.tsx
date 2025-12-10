import { Player } from '@lottiefiles/react-lottie-player';

export default function Spinner() {
  return <Player src="./images/loading.json" autoplay loop speed={1}></Player>;
}
