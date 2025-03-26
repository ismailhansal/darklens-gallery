
import { Instagram, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-16 px-6 md:px-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-white/5 blur-3xl"></div>
      </div>
      
      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-xl font-display font-light mb-3">Ismail Hansal</h2>
            <p className="text-white/60 text-sm text-center md:text-left">
              Capturing moments and telling stories through the art of photography.
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <h3 className="text-sm uppercase tracking-widest text-white/40 mb-6">Connect</h3>
            <div className="flex space-x-6">
              <a href="#" className="text-white/60 hover:text-white transition-colors duration-300 group">
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors duration-300 group">
                <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors duration-300 group">
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-sm uppercase tracking-widest text-white/40 mb-6">Let's Work Together</h3>
            <a href="mailto:contact@ismailhansal.com" className="group relative">
              <span className="text-white/80 hover:text-white transition-colors duration-300">contact@ismailhansal.com</span>
              <span className="block h-px w-0 bg-white/40 group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5">
          <div className="mb-4 md:mb-0">
            <p className="text-white/40 text-xs">
              &copy; {currentYear} Ismail Hansal. All rights reserved.
            </p>
          </div>
          
          <div>
            <p className="text-white/40 text-xs">
              Created with passion and creativity
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
