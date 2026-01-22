import React, { useState, useEffect } from 'react';
import { Menu, User, LogOut } from 'lucide-react';

interface NavigationProps {
  onSignInClick: () => void;
  onSignUpClick: () => void;
  isLoggedIn?: boolean;
  onLogout?: () => void;
  currentView?: string;
  onNavigate?: (view: any) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ 
    onSignInClick, 
    onSignUpClick, 
    isLoggedIn = false,
    onLogout,
    currentView = 'landing',
    onNavigate
}) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Links based on login state
    const links = isLoggedIn 
        ? [
            { label: 'Observatory', id: 'observatory' },
            { label: 'Archives', id: 'archives' },
            { label: 'Guides', id: 'guides' },
            { label: 'Corridor', id: 'corridor' },
            { label: 'Pricing', id: 'pricing' }
          ]
        : [
            { label: 'Manifesto', id: 'manifesto' },
            { label: 'Pricing', id: 'pricing' }
          ];

    const handleLinkClick = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        if (!onNavigate) return;
        onNavigate(id);
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-6 lg:px-12 py-6 flex justify-between items-center ${scrolled ? 'bg-paper/90 backdrop-blur-md border-b border-ink/5' : 'bg-transparent'}`}>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate && onNavigate('landing')}>
                <div className="w-6 h-6 bg-ink text-paper flex items-center justify-center font-display text-[10px] rounded-sm">M</div>
                <span className={`font-serif text-lg tracking-wide ${scrolled || isLoggedIn ? 'opacity-100' : 'opacity-0 lg:opacity-100'} transition-opacity`}>MGY</span>
            </div>
            
            <div className="hidden lg:flex gap-8 text-xs uppercase tracking-[0.2em] font-medium text-ink/70">
                {links.map(link => (
                    <a 
                        key={link.id} 
                        href="#" 
                        onClick={(e) => handleLinkClick(e, link.id)}
                        className={`hover:text-ink transition-colors relative group ${currentView === link.id ? 'text-ink' : ''}`}
                    >
                        {link.label}
                        <span className={`absolute -bottom-1 left-0 h-[1px] bg-ink transition-all ${currentView === link.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                    </a>
                ))}
            </div>

            <div className="flex items-center gap-6">
                {!isLoggedIn ? (
                    <>
                        <button 
                            onClick={onSignInClick}
                            className="text-xs uppercase tracking-widest text-ink/70 hover:text-ink transition-colors hidden sm:block"
                        >
                            Sign In
                        </button>
                        <button 
                            onClick={onSignUpClick}
                            className="flex items-center gap-2 text-xs uppercase tracking-widest border border-ink/20 px-5 py-2 hover:bg-ink hover:text-paper transition-all bg-transparent"
                        >
                            <span className="hidden sm:inline">Join</span>
                            <span className="sm:hidden">Menu</span>
                            <Menu size={14} className="sm:hidden" />
                        </button>
                    </>
                ) : (
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => onNavigate && onNavigate('today')}
                            className="flex items-center gap-2 px-4 py-2 bg-ink text-paper text-[10px] uppercase tracking-widest hover:bg-gold transition-colors shadow-md"
                        >
                            Ask Oracle
                        </button>
                        <button 
                            onClick={() => onNavigate && onNavigate('account')}
                            className={`w-8 h-8 rounded-full border flex items-center justify-center hover:bg-ink hover:text-paper transition-colors relative group ${currentView === 'account' ? 'bg-ink text-paper border-ink' : 'border-ink/20'}`}
                        >
                            <User size={14} />
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};