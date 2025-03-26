
import { Link } from 'react-router-dom';
import AnimatedImage from './AnimatedImage';
import { categories } from '@/lib/data';
import { Camera, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const FeaturedWork = () => {
  const [showItems, setShowItems] = useState(false);
  // Display only the first 3 categories for featured work
  const featuredCategories = categories.slice(0, 3);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowItems(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    const element = document.getElementById('featured-section');
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section id="featured-section" className="py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute left-0 top-0 w-full h-full pointer-events-none">
        <div className="absolute top-40 left-10 w-60 h-60 rounded-full bg-white/5 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-white/5 blur-3xl"></div>
      </div>
      
      <div className="max-w-screen-xl mx-auto relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="relative">
            <div className="w-12 h-[1px] bg-white/20 mb-4"></div>
            <h2 className="text-2xl md:text-4xl font-display font-light mb-4 overflow-hidden">
              {showItems && (
                <span className="inline-block animate-fade-in">
                  Featured Work
                </span>
              )}
            </h2>
            <p className="text-white/60 max-w-lg overflow-hidden">
              {showItems && (
                <span className="inline-block animate-fade-in" style={{animationDelay: '0.2s'}}>
                  A selection of my photography projects across various categories.
                </span>
              )}
            </p>
          </div>
          <Link 
            to="/portfolio" 
            className="mt-6 md:mt-0 text-sm text-white/70 hover:text-white group flex items-center overflow-hidden"
          >
            {showItems && (
              <span className="inline-block animate-fade-in" style={{animationDelay: '0.3s'}}>
                View all projects
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
              </span>
            )}
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {featuredCategories.map((category, index) => (
            <Link 
              key={category.id} 
              to={`/portfolio/${category.slug}`}
              className="group relative"
              style={{
                opacity: showItems ? 1 : 0,
                transform: showItems ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.8s ease-out ${0.2 + index * 0.2}s`
              }}
            >
              <div className="overflow-hidden mb-6 relative">
                <div className="absolute inset-0 bg-black/30 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Camera className="text-white w-10 h-10 transform scale-0 group-hover:scale-100 transition-transform duration-500" />
                </div>
                <AnimatedImage
                  src={category.coverImage}
                  alt={category.name}
                  delay={index * 200}
                  className="transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
              </div>
              
              <div className="relative">
                <h3 className="text-xl font-display font-light mb-2 flex items-center">
                  {category.name}
                  <ArrowUpRight className="ml-2 w-4 h-4 opacity-0 transform translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </h3>
                <p className="text-white/60 text-sm">{category.description}</p>
              </div>
              
              {/* Decorative diagonal lines */}
              <div className="absolute -bottom-2 left-0 w-5 h-[1px] bg-white/20 transform -rotate-45 origin-bottom-left opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute -bottom-2 right-0 w-5 h-[1px] bg-white/20 transform rotate-45 origin-bottom-right opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
