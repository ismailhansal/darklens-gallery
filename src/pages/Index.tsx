
import Hero from '@/components/Hero';
import FeaturedWork from '@/components/FeaturedWork';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <Hero />
      <FeaturedWork />
      <Footer />
    </div>
  );
};

export default Index;
