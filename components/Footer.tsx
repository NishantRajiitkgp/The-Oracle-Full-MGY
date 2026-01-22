import React from 'react';

interface FooterProps {
    onNavigate?: (view: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (e: React.MouseEvent, view: string) => {
      e.preventDefault();
      if (onNavigate) onNavigate(view);
  };

  return (
    <footer className="bg-paper-light pt-32 pb-12 px-6 border-t border-ink/5">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl lg:text-7xl font-serif text-ink mb-8 leading-tight">
          Ask what you've <br /> been <i className="italic font-light">avoiding.</i>
        </h2>
        
        <button 
            onClick={(e) => handleNav(e, 'today')}
            className="px-10 py-5 bg-ink text-paper text-sm tracking-[0.25em] uppercase hover:scale-105 transition-transform duration-300 shadow-xl mb-24"
        >
          Start Reading
        </button>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-ink/40 uppercase tracking-widest border-t border-ink/10 pt-12">
            <div className="mb-4 md:mb-0">© 2026 MGY Mind Guru Yoga</div>
            <div className="flex gap-8">
                <a href="#" onClick={(e) => handleNav(e, 'manifesto')} className="hover:text-ink transition-colors">Manifesto</a>
                <a href="#" onClick={(e) => handleNav(e, 'status')} className="hover:text-ink transition-colors">Status</a>
                <a href="#" onClick={(e) => handleNav(e, 'account')} className="hover:text-ink transition-colors">Privacy</a>
                <a href="#" onClick={(e) => handleNav(e, 'contact')} className="hover:text-ink transition-colors">Contact</a>
            </div>
        </div>
      </div>
    </footer>
  );
};