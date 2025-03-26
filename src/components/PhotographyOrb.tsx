
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const PhotographyOrb = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;
    
    // Create rotating images
    const numImages = 6;
    const radius = 150;
    const images = [];
    
    // Sample images
    const imageUrls = [
      'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=400',
      'https://images.unsplash.com/photo-1540270776932-e72e7c2d11cd?q=80&w=400',
      'https://images.unsplash.com/photo-1542382257-80dedb725088?q=80&w=400',
      'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?q=80&w=400',
      'https://images.unsplash.com/photo-1581337361457-4c217f5e67fa?q=80&w=400',
      'https://images.unsplash.com/photo-1455218873509-8097305ee378?q=80&w=400',
    ];
    
    for (let i = 0; i < numImages; i++) {
      const angle = (i / numImages) * Math.PI * 2;
      const x = radius * Math.cos(angle);
      const z = radius * Math.sin(angle);
      
      const img = document.createElement('div');
      img.className = 'absolute transform-gpu transition-all duration-1000';
      img.style.width = '120px';
      img.style.height = '80px';
      img.style.backgroundImage = `url(${imageUrls[i % imageUrls.length]})`;
      img.style.backgroundSize = 'cover';
      img.style.backgroundPosition = 'center';
      img.style.borderRadius = '8px';
      img.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.8)';
      
      // Set position - convert the numeric z-index to a string
      img.style.transform = `translate3d(${x}px, 0, ${z}px) rotateY(${angle * 180 / Math.PI}deg)`;
      img.style.zIndex = z < 0 ? '1' : '2';
      img.style.opacity = (0.7 + 0.3 * (z / radius)).toString();
      img.style.filter = `brightness(${0.7 + 0.3 * (z / radius)})`;
      
      container.appendChild(img);
      images.push({ element: img, angle });
    }
    
    // Animation
    let animationId: number;
    let rotationSpeed = 0.003;
    
    const animate = () => {
      images.forEach((img, i) => {
        img.angle += rotationSpeed;
        
        const angle = img.angle;
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        
        img.element.style.transform = `translate3d(${x}px, 0, ${z}px) rotateY(${angle * 180 / Math.PI}deg)`;
        img.element.style.zIndex = z < 0 ? '1' : '2';
        img.element.style.opacity = (0.7 + 0.3 * (z / radius)).toString();
        img.element.style.filter = `brightness(${0.7 + 0.3 * (z / radius)})`;
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Adjust speed on hover
    const handleMouseEnter = () => {
      rotationSpeed = 0.008;
    };
    
    const handleMouseLeave = () => {
      rotationSpeed = 0.003;
    };
    
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      
      // Remove all created elements
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);
  
  return (
    <div className="my-24 w-full">
      <div className="max-w-screen-lg mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-10 h-[1px] bg-white/20"></div>
            <Sparkles className="w-4 h-4 mx-3 text-white/60" />
            <div className="w-10 h-[1px] bg-white/20"></div>
          </div>
          <h2 className="text-2xl md:text-4xl font-display font-light mb-6">Visual Storytelling</h2>
          <p className="text-white/60 max-w-xl mx-auto">Explore my photography through this interactive 3D showcase. Hover to speed up the rotation.</p>
        </motion.div>
        
        <motion.div 
          className="w-full h-[300px] flex items-center justify-center relative perspective"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div ref={canvasRef} className="w-full h-full relative perspective-[1000px] cursor-pointer"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default PhotographyOrb;
