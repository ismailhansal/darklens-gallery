
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Camera, Zap, ChevronDown, CircleOff, Orbit } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Particles state
  const [particles, setParticles] = useState<Array<{
    x: number;
    y: number;
    size: number;
    color: string;
    vx: number;
    vy: number;
  }>>([]);
  
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  
  useEffect(() => {
    // Generate particles
    const particleCount = isMobile ? 25 : 50; // Fewer particles on mobile
    const newParticles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      color: `hsla(${Math.random() * 360}, 100%, 70%, ${Math.random() * 0.5 + 0.3})`,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5
    }));
    
    setParticles(newParticles);
    
    // Track mouse movement for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5
      });
    };
    
    // Track scroll for effects
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);
  
  // Animate particles
  useEffect(() => {
    const canvas = document.getElementById('particle-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Animation frame
    let animationId: number;
    
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          // Draw particle
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          
          // Connect particles if they're close - fewer connections on mobile
          const connectionDistance = isMobile ? 100 : 150;
          prevParticles.forEach(p2 => {
            const dx = particle.x - p2.x;
            const dy = particle.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < connectionDistance) {
              ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - distance / connectionDistance)})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          });
          
          // Move particle
          let newX = particle.x + particle.vx + mousePosition.x * 2;
          let newY = particle.y + particle.vy + mousePosition.y * 2;
          
          // Bounce off walls
          if (newX < 0 || newX > canvas.width) {
            newX = particle.x;
            particle.vx *= -1;
          }
          
          if (newY < 0 || newY > canvas.height) {
            newY = particle.y;
            particle.vy *= -1;
          }
          
          return {
            ...particle,
            x: newX,
            y: newY
          };
        })
      );
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, [mousePosition, isMobile]);
  
  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* Interactive particle background */}
      <canvas id="particle-canvas" className="absolute inset-0 z-0" />
      
      {/* Glowing orbs - smaller and repositioned on mobile */}
      <div className="absolute inset-0 z-0">
        <div 
          className={`absolute rounded-full blur-3xl ${isMobile ? 'w-40 h-40' : 'w-60 h-60'}`}
          style={{
            background: 'radial-gradient(circle, rgba(120, 70, 190, 0.6) 0%, rgba(90, 50, 180, 0.1) 70%, transparent 100%)',
            top: isMobile ? '10%' : '20%',
            right: isMobile ? '5%' : '15%',
            transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
            transition: 'transform 0.2s cubic-bezier(0.1, 0.8, 0.2, 1)'
          }}
        />
        <div 
          className={`absolute rounded-full blur-3xl ${isMobile ? 'w-48 h-48' : 'w-80 h-80'}`}
          style={{
            background: 'radial-gradient(circle, rgba(70, 120, 190, 0.4) 0%, rgba(50, 90, 180, 0.1) 70%, transparent 100%)',
            bottom: isMobile ? '5%' : '10%',
            left: isMobile ? '2%' : '10%',
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
            transition: 'transform 0.2s cubic-bezier(0.1, 0.8, 0.2, 1)'
          }}
        />
      </div>
      
      {/* Futuristic grid - simplified on mobile */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className={`h-full w-full grid ${isMobile ? 'grid-cols-6' : 'grid-cols-12'}`}>
          {Array.from({ length: isMobile ? 6 : 12 }).map((_, i) => (
            <div key={`col-${i}`} className="border-l border-white/10 h-full"></div>
          ))}
        </div>
        <div className={`h-full w-full grid ${isMobile ? 'grid-rows-6' : 'grid-rows-12'}`}>
          {Array.from({ length: isMobile ? 6 : 12 }).map((_, i) => (
            <div key={`row-${i}`} className="border-t border-white/10 w-full"></div>
          ))}
        </div>
      </div>
      
      {/* Main content */}
      <div className="container max-w-screen-xl mx-auto px-4 md:px-12 z-10 relative" ref={containerRef}>
        <div className="max-w-4xl mx-auto">
          {/* Animated title */}
          <motion.div
            style={{ 
              opacity: titleOpacity,
              scale: titleScale,
              y: titleY
            }}
            className="text-center relative"
          >
            {/* Decorative elements - smaller on mobile */}
            <motion.div 
              className={`absolute -top-10 left-1/2 -translate-x-1/2 ${isMobile ? 'scale-75' : ''}`}
              animate={{
                y: [0, 15, 0],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Orbit className="w-16 h-16 text-white/20" />
            </motion.div>
            
            {/* Profile Image - MEDIA LOCATION #1: Replace the image URL below */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8 relative mx-auto"
            >
              <div className={`mx-auto relative ${isMobile ? 'w-32 h-32' : 'w-40 h-40 md:w-48 md:h-48'}`}>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 animate-slow-spin"></div>
                <motion.div 
                  className="absolute inset-1 rounded-full overflow-hidden bg-black"
                  animate={{ rotate: [0, 5, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* MEDIA LOCATION #1: Hero profile image */}
                  <img 
                    src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=400" 
                    alt="Photographer Portrait" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </motion.div>
              </div>
              <div className={`absolute -bottom-2 -right-2 flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600 border-2 border-black rounded-full ${isMobile ? 'w-10 h-10' : 'w-12 h-12'}`}>
                <Camera className={`text-white ${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`} />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <div className="h-px w-10 bg-white/20"></div>
              <Sparkles className="w-5 h-5 text-white/60 animate-pulse" />
              <div className="h-px w-10 bg-white/20"></div>
            </motion.div>
            
            {/* Main title with letter animation */}
            <h1 className="relative font-display font-light text-3xl md:text-6xl lg:text-7xl mb-6 md:mb-8 px-2">
              {Array.from("Visual Storyteller").map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.03 * index,
                    ease: [0.215, 0.61, 0.355, 1]
                  }}
                  className="inline-block"
                  style={{ 
                    textShadow: '0 0 15px rgba(255,255,255,0.3)',
                    transform: `translateX(${mousePosition.x * (index % 5) * (isMobile ? 5 : 10)}px) translateY(${mousePosition.y * (index % 3) * (isMobile ? 5 : 10)}px)`
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </h1>
            
            {/* Dynamic subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative max-w-2xl mx-auto px-4"
            >
              <p className="text-white/60 text-base md:text-xl mb-8 md:mb-10 leading-relaxed">
                Blending light and shadow to create moments that transcend time through the art of photography.
              </p>
              
              {/* Animated lines */}
              <div className="absolute -bottom-6 left-0 w-full overflow-hidden h-1">
                <motion.div 
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop" 
                  }}
                  className="h-px bg-gradient-to-r from-transparent via-white/50 to-transparent w-full"
                />
              </div>
            </motion.div>
            
            {/* Floating elements - smaller spacing on mobile */}
            <div className={`relative mt-10 ${isMobile ? 'h-20' : 'h-32 mt-16'}`}>
              {/* Only show some floating elements on non-mobile */}
              <motion.div
                className={`absolute left-1/4 top-0 ${isMobile ? 'scale-75' : ''}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                style={{ 
                  x: mousePosition.x * (isMobile ? 15 : 30),
                  y: mousePosition.y * (isMobile ? 15 : 30),
                  transition: 'transform 0.2s cubic-bezier(0.1, 0.8, 0.2, 1)'
                }}
              >
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, -5, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Camera className={`text-white/40 ${isMobile ? 'w-8 h-8' : 'w-12 h-12'}`} />
                </motion.div>
              </motion.div>
              
              {!isMobile && (
                <motion.div
                  className="absolute right-1/4 top-1/2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  style={{ 
                    x: mousePosition.x * -40,
                    y: mousePosition.y * -40,
                    transition: 'transform 0.3s cubic-bezier(0.1, 0.8, 0.2, 1)'
                  }}
                >
                  <motion.div
                    animate={{
                      y: [0, 20, 0],
                      rotate: [0, 10, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <CircleOff className="w-10 h-10 text-white/30" />
                  </motion.div>
                </motion.div>
              )}
              
              {!isMobile && (
                <motion.div
                  className="absolute left-1/3 bottom-0"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  style={{ 
                    x: mousePosition.x * 20,
                    y: mousePosition.y * 20,
                    transition: 'transform 0.25s cubic-bezier(0.1, 0.8, 0.2, 1)'
                  }}
                >
                  <motion.div
                    animate={{
                      y: [0, 10, 0],
                      rotate: [0, -8, 0]
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Zap className="w-8 h-8 text-white/50" />
                  </motion.div>
                </motion.div>
              )}
            </div>
            
            {/* CTA Buttons - Stack on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="flex flex-col sm:flex-row items-center justify-center mt-6 sm:mt-8 gap-4 sm:gap-6 px-4"
            >
              <Link
                to="/portfolio"
                className="group relative py-3 px-6 sm:px-8 overflow-hidden z-10 w-full sm:w-auto text-center"
              >
                <span className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors duration-300 border border-white/20 group-hover:border-white/40"></span>
                <span className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 w-0 group-hover:w-full transition-all duration-500 ease-out"></span>
                <span className="relative z-10 flex items-center justify-center text-white">
                  Explore Work
                  <motion.span 
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >→</motion.span>
                </span>
              </Link>
              
              <Link
                to="/contact"
                className="group relative py-3 px-6 sm:px-8 overflow-hidden z-10 w-full sm:w-auto text-center"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-blue-900/30 group-hover:from-purple-900/40 group-hover:to-blue-900/40 transition-colors duration-300 border border-white/10 group-hover:border-white/20"></span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,white,transparent_70%)] mix-blend-lighten"></div>
                </span>
                <span className="relative z-10">Get in Touch</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
      >
        <ChevronDown className="w-6 h-6 text-white/50" />
      </motion.div>
      
      {/* Diagonal decorative lines */}
      <div className="absolute bottom-0 right-0 w-full h-40 z-0 overflow-hidden">
        <div className="absolute bottom-0 right-0 w-1/3 h-px bg-gradient-to-l from-white/20 to-transparent"></div>
        <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-white/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-px bg-gradient-to-r from-white/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 h-full w-px bg-gradient-to-t from-white/20 to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
