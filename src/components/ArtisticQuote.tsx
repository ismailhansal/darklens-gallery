
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Orbit } from 'lucide-react';

const ArtisticQuote = () => {
  const quoteRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    
    if (quoteRef.current) {
      observer.observe(quoteRef.current);
    }
    
    // Track mouse movement for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      if (quoteRef.current) {
        observer.unobserve(quoteRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Split quote text for character animation
  const quoteText = "Photography is the story I fail to put into words. Through my lens, I capture not just images, but emotions, memories, and the beauty of fleeting moments.";
  const words = quoteText.split(' ');

  return (
    <section ref={quoteRef} className="py-24 px-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute left-0 top-0 w-full h-full">
        <div 
          className="absolute top-0 right-0 w-40 md:w-80 h-40 md:h-80 rounded-full bg-white/5 blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
            transition: 'transform 0.2s linear'
          }}
        ></div>
        <div 
          className="absolute bottom-0 left-0 w-60 md:w-96 h-60 md:h-96 rounded-full bg-white/5 blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
            transition: 'transform 0.2s linear'
          }}
        ></div>
      </div>
      
      {/* Futuristic grid lines */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-10">
        <div className="w-full h-full grid grid-cols-8 opacity-30">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border-r border-white/10 h-full"></div>
          ))}
        </div>
        <div className="w-full h-full grid grid-rows-8 opacity-30">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border-b border-white/10 w-full"></div>
          ))}
        </div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 30 - 15],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      <div className="max-w-screen-lg mx-auto relative">
        <motion.div 
          className="w-20 h-[1px] bg-white/20 mx-auto mb-12"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isVisible ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        ></motion.div>
        
        <blockquote className="text-center">
          <div className="text-xl md:text-3xl font-display font-light leading-relaxed md:leading-relaxed mb-8 overflow-hidden">
            {isVisible && (
              <motion.div className="flex flex-wrap justify-center">
                {words.map((word, index) => (
                  <motion.span
                    key={index}
                    className="inline-block mx-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.03 * index,
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </div>
          
          <motion.footer 
            className="text-white/60"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <div className="flex items-center justify-center mb-2">
              <div className="w-6 h-[1px] bg-white/20 mr-4"></div>
              <Sparkles className="w-4 h-4 text-white/40 animate-soft-pulse" />
              <div className="w-6 h-[1px] bg-white/20 ml-4"></div>
            </div>
            <span className="block font-display">— Ismail Hansal</span>
            <span className="text-sm text-white/40">Visual Storyteller</span>
          </motion.footer>
        </blockquote>
        
        <motion.div 
          className="w-20 h-[1px] bg-white/20 mx-auto mt-12"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isVisible ? 1 : 0 }}
          transition={{ duration: 1, delay: 1.7 }}
        ></motion.div>
      </div>
      
      {/* Animated circular element */}
      <div className="absolute right-10 bottom-10 opacity-20">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Orbit className="w-20 h-20 text-white/30" />
        </motion.div>
      </div>
    </section>
  );
};

export default ArtisticQuote;
