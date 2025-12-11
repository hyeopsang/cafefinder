import BannerSlide from '@/components/home/banner/BannerSlide';
import Header from '@/components/Header';
import RecommendList from '@/components/home/recommend/RecommendList';

export default function Home() {
  return (
    <section className="h-dvh">
      <Header />
      <BannerSlide />
      <RecommendList />
      <RecommendList />
    </section>
  );
}
