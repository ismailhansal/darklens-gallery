
import { Link } from 'react-router-dom';
import AnimatedImage from './AnimatedImage';
import { Category } from '@/lib/data';

interface CategoryCardProps {
  category: Category;
  index: number;
}

const CategoryCard = ({ category, index }: CategoryCardProps) => {
  return (
    <Link 
      to={`/portfolio/${category.slug}`}
      className="group block"
    >
      <div className="overflow-hidden mb-4">
        <AnimatedImage
          src={category.coverImage}
          alt={category.name}
          delay={index * 150}
          className="transform group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <h3 className="text-lg font-display mb-2 transition-colors duration-300 group-hover:text-white">
        {category.name}
      </h3>
      <p className="text-white/60 text-sm mb-2">{category.description}</p>
      <span className="text-xs text-white/40">{category.photos.length} photos</span>
    </Link>
  );
};

export default CategoryCard;
