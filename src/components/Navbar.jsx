import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, ArrowUpRight } from 'lucide-react';
import { navigationLinks, userSocialProfiles } from '../data/portfolioData';

export default function Navbar({ onOpenResume, playHover, playClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['about', 'capabilities', 'work', 'experience', 'connect'];
      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, target) => {
    e.preventDefault();
    playClick?.();
    setMobileMenuOpen(false);
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'py-3.5 bg-[#080809]/92 backdrop-blur-md border-b border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]' 
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand Monogram & Name */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, '#root')}
            onMouseEnter={playHover}
            data-cursor="pointer"
            className="group flex items-center gap-3 select-none"
          >
            <div className="flex items-center justify-center w-8 h-8 rounded border border-white/20 bg-white/5 transition-colors duration-200 group-hover:border-[#FF365E]">
              <span className="font-mono-code text-xs font-bold text-white group-hover:text-[#FF365E]">
                SS
              </span>
            </div>
            
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-[0.16em] text-white">
                SAHIL SINGH
              </span>
              <span className="font-mono-code text-[10px] tracking-widest text-[#A1A1AA] uppercase">
                DATA ANALYST
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigationLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.target}
                  onClick={(e) => handleNavClick(e, link.target)}
                  onMouseEnter={playHover}
                  data-cursor="pointer"
                  className={`font-mono-code text-xs tracking-wider uppercase transition-colors duration-200 relative py-1 ${
                    isActive 
                      ? 'text-white font-semibold' 
                      : 'text-[#A1A1AA] hover:text-white'
                  }`}
                >
                  <span className={isActive ? 'text-[#FF365E] mr-1' : 'text-white/30 mr-1'}>
                    {link.label.split('/')[0]}/
                  </span>
                  {link.label.split('/')[1]?.trim()}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#FF365E]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Controls: Real Working Resume Button + Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            {/* Functional Resume Button */}
            <button
              onClick={() => {
                playClick?.();
                onOpenResume?.();
              }}
              onMouseEnter={playHover}
              data-cursor="pointer"
              title="View & Download Sahil Singh's Resume"
              className="relative group px-4 py-2 rounded border border-[#FF365E]/70 bg-[#FF365E]/10 text-white font-mono-code text-xs tracking-wider uppercase transition-all duration-200 hover:bg-[#FF365E] hover:shadow-[0_0_20px_rgba(255,54,94,0.35)] flex items-center gap-2"
            >
              <FileText className="w-3.5 h-3.5 text-[#FF365E] group-hover:text-white transition-colors" />
              <span>RESUME ↗</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => {
                playClick?.();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              data-cursor="pointer"
              className="lg:hidden p-2 rounded border border-white/10 text-white hover:border-[#FF365E]"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-[#080809]/98 backdrop-blur-2xl transition-all duration-300 lg:hidden flex flex-col justify-center px-8 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-6">
          <span className="font-mono-code text-xs tracking-[0.25em] text-[#FF365E] uppercase">
            NAVIGATION
          </span>
          {navigationLinks.map((link) => (
            <a
              key={link.id}
              href={link.target}
              onClick={(e) => handleNavClick(e, link.target)}
              className="font-display text-2xl font-bold text-white hover:text-[#FF365E] transition-colors flex items-center justify-between border-b border-white/10 pb-3"
            >
              <span>{link.label}</span>
              <ArrowUpRight className="w-5 h-5 text-[#FF365E]" />
            </a>
          ))}

          <div className="pt-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume?.();
              }}
              className="w-full py-3.5 rounded border border-[#FF365E] bg-[#FF365E]/15 text-white font-mono-code text-xs tracking-widest uppercase flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-[#FF365E]" />
              VIEW RESUME (PDF)
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
