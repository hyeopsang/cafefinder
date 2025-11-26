import BannerSlide from '@/components/banner';
import Header from '@/components/header';
import RecommendList from '@/components/recommend-list';

export default function Home() {
  return (
    <section className="h-[calc(100%+150px)]">
      <Header />
      <BannerSlide />
      <RecommendList />
      <RecommendList />
    </section>
  );
}
