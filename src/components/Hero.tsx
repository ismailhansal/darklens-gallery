
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Camera, ChevronDown } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
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

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background decorations */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-40 h-40 top-16 left-10 rounded-full bg-white/5 animate-soft-pulse blur-xl"></div>
        <div className="absolute w-80 h-80 bottom-[-20%] right-[-10%] rounded-full bg-white/10 animate-soft-pulse delay-300 blur-xl"></div>
        <div className="absolute w-60 h-60 top-[30%] right-[20%] rounded-full bg-white/5 animate-soft-pulse delay-700 blur-xl"></div>
      </div>

      {/* Image carousel background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black opacity-70 z-10"></div>
        {heroImages.map((img, idx) => (
          <div 
            key={idx} 
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${img})` }}></div>
          </div>
        ))}
      </div>
      
      {/* Content */}
      <div className="container max-w-screen-xl mx-auto px-6 md:px-12 z-10 pt-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center mb-8">
            <Sparkles className="w-4 h-4 mr-2 animate-soft-pulse text-white/80" />
            <span className="text-xs uppercase tracking-widest text-white/80 animate-fade-in" style={{animationDelay: '0.5s'}}>
              Visual Storyteller
            </span>
            <Sparkles className="w-4 h-4 ml-2 animate-soft-pulse text-white/80" />
          </div>
          
          <h1 ref={titleRef} className="text-5xl md:text-7xl font-display font-light mb-10 leading-tight">
            Capturing moments that last forever
          </h1>
          
          <p className="text-white/70 mb-12 md:text-lg max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in" style={{animationDelay: '1s'}}>
            Ismail Hansal's photography portfolio, featuring a collection of carefully crafted visual stories across various photographic genres.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 opacity-0 animate-fade-in" style={{animationDelay: '1.2s'}}>
            <Link 
              to="/portfolio" 
              className="group relative py-3 px-8 overflow-hidden backdrop-blur-sm border border-white/20 text-sm hover:border-white/40 transition-all duration-300"
            >
              <span className="relative z-10">View Portfolio</span>
              <span className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
              <Camera className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:right-4 transition-all duration-300" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white/50" />
      </div>

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
