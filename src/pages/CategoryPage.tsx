
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import ImageGallery from '@/components/ImageGallery';
import Footer from '@/components/Footer';
import { getCategoryBySlug } from '@/lib/data';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = getCategoryBySlug(slug || '');
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!category) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-display font-light mb-6">Category Not Found</h1>
          <Link to="/portfolio" className="text-white/70 hover:text-white underline">
            Return to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <section className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-4">
            <Link 
              to="/portfolio" 
              className="text-sm text-white/60 hover:text-white flex items-center mb-8"
            >
              <span className="mr-2">←</span>
              Back to Portfolio
            </Link>
            
            <h1 className="text-3xl md:text-4xl font-display font-light mb-4">{category.name}</h1>
            <p className="text-white/60 max-w-2xl mb-12">{category.description}</p>
          </div>
          
          <ImageGallery photos={category.photos} />
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
