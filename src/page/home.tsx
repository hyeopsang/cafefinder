import BannerSlide from '@/components/banner';
import Header from '@/components/header';
import RecommendList from '@/components/recommend-list';

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
