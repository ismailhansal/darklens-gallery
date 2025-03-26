
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-6 transition-all duration-500 ${
        scrolled ? 'bg-black/70 backdrop-blur-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <NavLink to="/" className="text-xl font-display font-light">
          ISMAIL HANSAL
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
        
        <div className="md:hidden">
          {/* Mobile menu would go here */}
          <NavLink to="/portfolio" className="nav-link">
            Portfolio
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
