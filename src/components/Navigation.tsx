
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Camera } from 'lucide-react';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent scrolling when menu is open
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };

  // Close menu when navigating
  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-6 transition-all duration-500 ${
          scrolled ? 'bg-black/80 backdrop-blur-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <NavLink to="/" className="text-xl font-display font-light flex items-center group z-50">
            <span className="relative overflow-hidden inline-block">
              <span className="inline-block group-hover:translate-y-[-100%] transition-transform duration-300">ISMAIL</span>
              <span className="absolute top-0 left-0 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300">ISMAIL</span>
            </span>
            <Camera className="mx-2 w-4 h-4 animate-soft-pulse text-white/80" />
            <span className="relative overflow-hidden inline-block">
              <span className="inline-block group-hover:translate-y-[-100%] transition-transform duration-300">HANSAL</span>
              <span className="absolute top-0 left-0 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300">HANSAL</span>
            </span>
          </NavLink>
          
          <nav className="hidden md:flex space-x-8">
            <NavLink 
              to="/" 
              className={({isActive}) => isActive ? 'nav-link active-nav' : 'nav-link'}
            >
              Home
            </NavLink>
            <NavLink 
              to="/portfolio" 
              className={({isActive}) => isActive ? 'nav-link active-nav' : 'nav-link'}
            >
              Portfolio
            </NavLink>
          </nav>
          
          <button 
            className="md:hidden z-50 relative w-10 h-10 flex items-center justify-center"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={`block transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}>
              <Menu />
            </span>
            <span className={`absolute transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}>
              <X />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div 
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-lg transform transition-transform duration-500 ${
          isMenuOpen ? 'translate-y-0' : 'translate-y-[-100%]'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <nav className="flex flex-col space-y-8 text-center">
            <NavLink 
              to="/" 
              className={({isActive}) => 
                `text-2xl font-display ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`
              }
              onClick={closeMenu}
            >
              Home
            </NavLink>
            <NavLink 
              to="/portfolio" 
              className={({isActive}) => 
                `text-2xl font-display ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`
              }
              onClick={closeMenu}
            >
              Portfolio
            </NavLink>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navigation;
