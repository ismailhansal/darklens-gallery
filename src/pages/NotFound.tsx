
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navigation from '@/components/Navigation';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-display font-light mb-6">404</h1>
          <p className="text-xl text-white/70 mb-8">The page you're looking for doesn't exist</p>
          <Link to="/" className="inline-block py-3 px-8 border border-white/20 text-sm hover:bg-white hover:text-black transition-all duration-300">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
