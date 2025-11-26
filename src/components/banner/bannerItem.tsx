import type { ComponentType, SVGProps } from 'react';

type BannerItemProps = {
  bannerImg: ComponentType<SVGProps<SVGSVGElement>>;
  bannerText: string;
};

export default function BannerItem({ bannerImg: BannerImg, bannerText }: BannerItemProps) {
  return (
    <div className="flex aspect-square w-full items-center overflow-hidden">
      <BannerImg className="w-full" />
      <p className="absolute bottom-10 left-8 w-2/3 text-2xl font-semibold whitespace-pre-wrap text-white text-shadow-lg sm:text-3xl">
        {bannerText}
      </p>
    </div>
  );
}
