'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import CategoryBar from '@/components/sections/CategoryBar';
import CategoryCollage from '@/components/sections/CategoryCollage';
import FlashSale from '@/components/sections/FlashSale';
import BestSellers from '@/components/sections/BestSellers';
import BentoDeals from '@/components/sections/BentoDeals';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import NewsletterSection from '@/components/sections/NewsletterSection';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    supabase
      .from('products')
      .select('*, categories(name)')
      .eq('featured', true)
      .limit(4)
      .then(({ data }) => {
        if (data) setFeaturedProducts(data as any);
      });
  }, []);

  return (
    <>
      <CategoryBar />
      <Hero />
      <TrustBar />
      <CategoryCollage />
      <FlashSale />
      <FeaturedProducts products={featuredProducts} />
      <BentoDeals />
      <BestSellers />
      <NewsletterSection />
    </>
  );
}
