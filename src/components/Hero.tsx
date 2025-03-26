
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Camera, ChevronDown, Zap, Orbit, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroImages = [
    'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070',
    'https://images.unsplash.com/photo-1540270776932-e72e7c2d11cd?q=80&w=2072',
    'https://images.unsplash.com/photo-1542382257-80dedb725088?q=80&w=2728',
  ];

  useEffect(() => {
    if (titleRef.current) {
      const titleElement = titleRef.current;
      const text = titleElement.innerText;
      titleElement.innerHTML = '';
      
      // Split text into spans with staggered animation
      text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.classList.add('clip-text');
        span.style.setProperty('--index', index.toString());
        span.innerText = char === ' ' ? '\u00A0' : char;
        titleElement.appendChild(span);
      });
    }

    // Auto-slide carousel
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);

    // Track mouse movement for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [heroImages.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background decorations */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          className="absolute w-40 h-40 top-16 left-10 rounded-full bg-white/5 animate-soft-pulse blur-xl"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
            transition: 'transform 0.1s linear'
          }}
        ></div>
        <div 
          className="absolute w-80 h-80 bottom-[-20%] right-[-10%] rounded-full bg-white/10 animate-soft-pulse delay-300 blur-xl"
          style={{
            transform: `translate(${mousePosition.x * -40}px, ${mousePosition.y * -40}px)`,
            transition: 'transform 0.1s linear'
          }}
        ></div>
        <div 
          className="absolute w-60 h-60 top-[30%] right-[20%] rounded-full bg-white/5 animate-soft-pulse delay-700 blur-xl"
          style={{
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
            transition: 'transform 0.1s linear'
          }}
        ></div>
        
        {/* Additional futuristic elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {Array.from({ length: 15 }).map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.5 + 0.3,
                  animation: `pulse ${Math.random() * 3 + 2}s infinite alternate`
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Grid lines */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="w-full h-full grid grid-cols-12 opacity-10">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-r border-white/10 h-full"></div>
            ))}
          </div>
          <div className="w-full h-full grid grid-rows-12 opacity-10">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-b border-white/10 w-full"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Image carousel background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black opacity-70 z-10"></div>
        {heroImages.map((img, idx) => (
          <div 
            key={idx} 
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <motion.div 
              className="h-full w-full bg-cover bg-center" 
              style={{ 
                backgroundImage: `url(${img})`,
                scale: idx === currentSlide ? 1 : 1.1
              }}
              animate={{ 
                scale: idx === currentSlide ? [1.05, 1] : 1.1,
              }}
              transition={{ duration: 7, ease: "easeOut" }}
            />
          </div>
        ))}
      </div>
      
      {/* Content */}
      <div className="container max-w-screen-xl mx-auto px-6 md:px-12 z-10 pt-16">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <motion.div 
            className="flex items-center justify-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <Sparkles className="w-4 h-4 mr-2 animate-soft-pulse text-white/80" />
            <span className="text-xs uppercase tracking-widest text-white/80 animate-fade-in" style={{animationDelay: '0.5s'}}>
              Visual Storyteller
            </span>
            <Sparkles className="w-4 h-4 ml-2 animate-soft-pulse text-white/80" />
          </motion.div>
          
          <h1 ref={titleRef} className="text-5xl md:text-7xl font-display font-light mb-10 leading-tight">
            Capturing moments that last forever
          </h1>
          
          <motion.p 
            className="text-white/70 mb-12 md:text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            Ismail Hansal's photography portfolio, featuring a collection of carefully crafted visual stories across various photographic genres.
          </motion.p>
          
          <motion.div 
            className="flex flex-col md:flex-row items-center justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
          >
            <Link 
              to="/portfolio" 
              className="group relative py-3 px-8 overflow-hidden backdrop-blur-sm border border-white/20 text-sm hover:border-white/40 transition-all duration-300"
            >
              <span className="relative z-10">View Portfolio</span>
              <span className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
              <Camera className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:right-4 transition-all duration-300" />
            </Link>
            
            <Link 
              to="/contact" 
              className="group relative py-3 px-8 overflow-hidden backdrop-blur-sm bg-white/5 text-sm hover:bg-white/10 transition-all duration-300 border border-transparent"
            >
              <span className="relative z-10 flex items-center">
                <Zap className="w-4 h-4 mr-2" /> Get in Touch
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
            </Link>
          </motion.div>
          
          {/* Floating animated elements */}
          <div className="absolute -left-10 top-1/4 opacity-30">
            <motion.div
              animate={{
                y: [0, 15, 0],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Orbit className="w-16 h-16 text-white/30" />
            </motion.div>
          </div>
          
          <div className="absolute -right-10 top-2/3 opacity-30">
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, -5, 0]
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Rocket className="w-14 h-14 text-white/30" />
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll down indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-6 h-6 text-white/50" />
      </motion.div>

      {/* Animated diagonal line decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden z-0">
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-[1px] h-full bg-gradient-to-t from-white/20 via-white/10 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-[1px] h-full bg-gradient-to-t from-white/20 via-white/10 to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
