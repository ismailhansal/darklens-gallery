
import { Link } from 'react-router-dom';
import AnimatedImage from './AnimatedImage';
import { categories } from '@/lib/data';

const FeaturedWork = () => {
  // Display only the first 3 categories for featured work
  const featuredCategories = categories.slice(0, 3);
  
  return (
    <section className="py-24 px-6 md:px-12">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-light mb-4">Featured Work</h2>
            <p className="text-white/60 max-w-lg">A selection of my photography projects across various categories.</p>
          </div>
          <Link 
            to="/portfolio" 
            className="mt-6 md:mt-0 text-sm text-white/70 hover:text-white group flex items-center"
          >
            View all projects
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {featuredCategories.map((category, index) => (
            <Link 
              key={category.id} 
              to={`/portfolio/${category.slug}`}
              className="group"
            >
              <div className="overflow-hidden mb-6">
                <AnimatedImage
                  src={category.coverImage}
                  alt={category.name}
                  delay={index * 200}
                  className="transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="text-xl font-display font-light mb-2">{category.name}</h3>
              <p className="text-white/60 text-sm">{category.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
