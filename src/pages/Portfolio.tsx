
import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import CategoryCard from '@/components/CategoryCard';
import Footer from '@/components/Footer';
import { getAllCategories } from '@/lib/data';

const Portfolio = () => {
  const categories = getAllCategories();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <section className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-16">
            <h1 className="text-3xl md:text-4xl font-display font-light mb-6">Portfolio</h1>
            <p className="text-white/60 max-w-2xl">Explore my work across different photography categories. Each collection represents a unique visual approach and creative direction.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {categories.map((category, index) => (
              <CategoryCard 
                key={category.id} 
                category={category} 
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Portfolio;
