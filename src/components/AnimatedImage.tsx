
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  delay?: number;
}

const AnimatedImage = ({ 
  src, 
  alt, 
  className, 
  aspectRatio = "aspect-[4/3]",
  delay = 0 
}: AnimatedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const currentElement = document.getElementById(src);
    if (currentElement) observer.observe(currentElement);
    
    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, [src]);

  return (
    <div 
      id={src}
      className={cn(
        "image-container overflow-hidden bg-muted", 
        aspectRatio,
        className
      )}
    >
      {isInView && (
        <>
          <div className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-500 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}></div>
          <img
            src={src}
            alt={alt}
            className={cn(
              "object-cover w-full h-full transition-all duration-700",
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
            )}
            style={{ animationDelay: `${delay}ms` }}
            onLoad={() => setIsLoaded(true)}
          />
        </>
      )}
    </div>
  );
};

export default AnimatedImage;
