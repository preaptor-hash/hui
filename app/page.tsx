import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import CategoryBar from '@/components/sections/CategoryBar';
import CategoryCollage from '@/components/sections/CategoryCollage';
import FlashSale from '@/components/sections/FlashSale';
import BestSellers from '@/components/sections/BestSellers';
import BentoDeals from '@/components/sections/BentoDeals';

export default function Home() {
  return (
    <>
      <CategoryBar />
      <Hero />
      <CategoryCollage />
      <FlashSale />
      <BentoDeals />
      <BestSellers />
      {/* Promotional Split Banners would go here */}
      {/* New Arrivals would go here */}
    </>
  );
}
