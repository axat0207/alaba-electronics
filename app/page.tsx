import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';
import PromotionalBanner from '@/components/sections/PromotionalBanner';
import CategoriesSection from '@/components/sections/CategoriesSection';
import FeaturedProductsSection from '@/components/sections/FeaturedProductsSection';
import DealsSection from '@/components/sections/DealsSection';

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <PromotionalBanner />
      <CategoriesSection />
      <FeaturedProductsSection />
      <DealsSection />
    </Layout>
  );
}
