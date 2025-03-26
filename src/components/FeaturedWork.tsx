
import { Link } from 'react-router-dom';
import AnimatedImage from './AnimatedImage';
import { categories } from '@/lib/data';
import { Camera, ArrowUpRight, Orbit, Sparkles, CircleDot } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const FeaturedWork = () => {
  const [showItems, setShowItems] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
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
    
    // Track mouse movement for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      if (element) observer.unobserve(element);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Animated variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="featured-section" className="py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute left-0 top-0 w-full h-full pointer-events-none">
        <motion.div 
          className="absolute top-40 left-10 w-60 h-60 rounded-full bg-white/5 blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
            transition: 'transform 0.2s linear'
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-white/5 blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
            transition: 'transform 0.2s linear'
          }}
        ></motion.div>
      </div>
      
      {/* Futuristic grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 grid grid-cols-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-white/40 h-full"></div>
          ))}
        </div>
        <div className="absolute inset-0 grid grid-rows-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-b border-white/40 w-full"></div>
          ))}
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4"
          animate={{
            y: [0, 20, 0],
            rotate: [0, 10, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <CircleDot className="w-16 h-16 text-white" />
        </motion.div>
        
        <motion.div
          className="absolute bottom-1/4 right-1/3"
          animate={{
            y: [0, -15, 0],
            rotate: [0, -15, 0]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Orbit className="w-20 h-20 text-white" />
        </motion.div>
      </div>
      
      <div className="max-w-screen-xl mx-auto relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="relative">
            <div className="flex items-center">
              <motion.div 
                className="w-12 h-[1px] bg-white/20 mb-4"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: showItems ? 1 : 0 }}
                transition={{ duration: 1 }}
              ></motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showItems ? 1 : 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <Sparkles className="w-4 h-4 text-white/40 ml-3 mb-4" />
              </motion.div>
            </div>
            
            <motion.h2 
              className="text-2xl md:text-4xl font-display font-light mb-4 overflow-hidden"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: showItems ? 0 : 50, opacity: showItems ? 1 : 0 }}
              transition={{ duration: 0.8 }}
            >
              Featured Work
            </motion.h2>
            
            <motion.p 
              className="text-white/60 max-w-lg"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: showItems ? 0 : 30, opacity: showItems ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              A selection of my photography projects across various categories.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: showItems ? 1 : 0, x: showItems ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link 
              to="/portfolio" 
              className="mt-6 md:mt-0 text-sm text-white/70 hover:text-white group flex items-center"
            >
              <span className="relative">
                View all projects
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white/40 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>
          </motion.div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={showItems ? "show" : "hidden"}
        >
          {featuredCategories.map((category, index) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Link 
                to={`/portfolio/${category.slug}`}
                className="group relative block overflow-hidden glass-panel p-6 hover:border-white/10 transition-all duration-500"
              >
                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-500">
                  <ArrowUpRight className="w-5 h-5 text-white/70" />
                </div>
                
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
                
                {/* Animated border effect */}
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-white/30 group-hover:w-full transition-all duration-700"></div>
                <div className="absolute top-0 right-0 w-0 h-[1px] bg-white/30 group-hover:w-full transition-all duration-700 origin-right"></div>
                <div className="absolute top-0 left-0 h-0 w-[1px] bg-white/30 group-hover:h-full transition-all duration-700 delay-100"></div>
                <div className="absolute bottom-0 right-0 h-0 w-[1px] bg-white/30 group-hover:h-full transition-all duration-700 delay-100 origin-bottom"></div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Futuristic decorative elements */}
        <div className="mt-20 flex justify-center">
          <motion.div 
            className="w-20 h-[1px] bg-white/10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: showItems ? 1 : 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          ></motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
