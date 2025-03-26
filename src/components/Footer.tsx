
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-display font-light mb-2">Ismail Hansal</h2>
            <p className="text-white/60 text-sm">Photography Portfolio</p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-white/60 text-sm">
              &copy; {currentYear} Ismail Hansal. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
