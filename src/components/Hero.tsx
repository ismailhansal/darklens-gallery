
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);

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
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070')] bg-cover bg-center"></div>
      </div>
      
      <div className="container max-w-screen-xl mx-auto px-6 md:px-12 z-10 pt-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center mb-8">
            <span className="h-px w-8 bg-white/50 mr-3"></span>
            <span className="text-xs uppercase tracking-widest text-white/80 animate-fade-in" style={{animationDelay: '0.5s'}}>Photography Portfolio</span>
            <span className="h-px w-8 bg-white/50 ml-3"></span>
          </div>
          
          <h1 ref={titleRef} className="text-4xl md:text-6xl font-display font-light mb-6 leading-tight">
            Capturing moments that last forever
          </h1>
          
          <p className="text-white/70 mb-8 md:text-lg max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in" style={{animationDelay: '1s'}}>
            Ismail Hansal's photography portfolio, featuring a collection of carefully crafted visual stories across various photographic genres.
          </p>
          
          <Link 
            to="/portfolio" 
            className="inline-block py-3 px-8 border border-white/20 text-sm hover:bg-white hover:text-black transition-all duration-300 opacity-0 animate-fade-in"
            style={{animationDelay: '1.2s'}}
          >
            View Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
