
import Hero from '@/components/Hero';
import FeaturedWork from '@/components/FeaturedWork';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ArtisticQuote from '@/components/ArtisticQuote';
import FuturisticCanvas from '@/components/FuturisticCanvas';
import PhotographyOrb from '@/components/PhotographyOrb';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white relative">
      <FuturisticCanvas />
      <Navigation />
      <Hero />
      <ArtisticQuote />
      <PhotographyOrb />
      <FeaturedWork />
      <Footer />
    </div>
  );
};

export default Index;
