
import { useRef, useEffect, useState } from 'react';

const ArtisticQuote = () => {
  const quoteRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
    
    return () => {
      if (quoteRef.current) {
        observer.unobserve(quoteRef.current);
      }
    };
  }, []);

  return (
    <section ref={quoteRef} className="py-24 px-6 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute left-0 top-0 w-full h-full">
        <div className="absolute top-0 right-0 w-40 md:w-80 h-40 md:h-80 rounded-full bg-white/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-60 md:w-96 h-60 md:h-96 rounded-full bg-white/5 blur-3xl"></div>
      </div>
      
      <div className="max-w-screen-lg mx-auto relative">
        <div className="w-20 h-[1px] bg-white/20 mx-auto mb-12 transform transition-transform duration-1000 delay-300"
          style={{
            transform: isVisible ? 'scaleX(1)' : 'scaleX(0)'
          }}
        ></div>
        
        <blockquote className="text-center">
          <p 
            className="text-xl md:text-3xl font-display font-light leading-relaxed md:leading-relaxed mb-8 overflow-hidden"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 1s ease, transform 1s ease'
            }}
          >
            "Photography is the story I fail to put into words. Through my lens, I capture not just images,<br className="hidden md:block" /> but emotions, memories, and the beauty of fleeting moments."
          </p>
          
          <footer 
            className="text-white/60 overflow-hidden"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 1s ease 0.3s, transform 1s ease 0.3s'
            }}
          >
            <span className="block font-display">— Ismail Hansal</span>
            <span className="text-sm text-white/40">Visual Storyteller</span>
          </footer>
        </blockquote>
        
        <div className="w-20 h-[1px] bg-white/20 mx-auto mt-12 transform transition-transform duration-1000 delay-300"
          style={{
            transform: isVisible ? 'scaleX(1)' : 'scaleX(0)'
          }}
        ></div>
      </div>
    </section>
  );
};

export default ArtisticQuote;
