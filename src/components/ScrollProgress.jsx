import React, { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeSection, setActiveSection] = useState('01');

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentScroll = window.scrollY;
          const pct = docHeight > 0 ? Math.min(100, Math.max(0, (currentScroll / docHeight) * 100)) : 0;
          setScrollPercent(pct);

          const sections = [
            { id: 'hero', code: '01' },
            { id: 'about', code: '01' },
            { id: 'capabilities', code: '02' },
            { id: 'work', code: '03' },
            { id: 'experience', code: '04' },
            { id: 'connect', code: '05' }
          ];

          const scrollPos = currentScroll + window.innerHeight * 0.35;
          for (let i = sections.length - 1; i >= 0; i--) {
            const el = document.getElementById(sections[i].id);
            if (el && scrollPos >= el.offsetTop) {
              setActiveSection(sections[i].code);
              break;
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navSections = [
    { id: 'about', label: '01' },
    { id: 'capabilities', label: '02' },
    { id: 'work', label: '03' },
    { id: 'experience', label: '04' },
    { id: 'connect', label: '05' }
  ];

  return (
    <aside 
      aria-label="Section Progress"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-2.5 select-none pointer-events-none"
    >
      {/* Top Number */}
      <span className="font-mono-code text-[10px] tracking-widest text-white/40">
        01
      </span>

      {/* Vertical Track Line */}
      <div className="relative w-[1px] h-28 bg-white/10 pointer-events-auto">
        <div 
          className="absolute top-0 left-0 w-full bg-[#ff2a4b] shadow-[0_0_8px_#ff2a4b] transition-all duration-150 ease-out"
          style={{ height: `${scrollPercent}%` }}
        />

        {/* Active glowing indicator */}
        <div 
          className="absolute -left-[3px] w-2 h-2 rounded-full bg-[#ff2a4b] shadow-[0_0_10px_#ff2a4b] transition-all duration-150 ease-out"
          style={{ top: `calc(${scrollPercent}% - 4px)` }}
        />
      </div>

      {/* Bottom Number */}
      <span className="font-mono-code text-[10px] tracking-widest text-[#ff4d68] font-bold">
        05
      </span>

      {/* Subtle section jump dots */}
      <div className="flex flex-col gap-1.5 pt-1.5 pointer-events-auto">
        {navSections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => scrollTo(sec.id)}
            title={`Go to Section ${sec.label}`}
            className={`w-1 h-2 rounded-full transition-all duration-200 cursor-pointer ${
              activeSection === sec.label
                ? 'bg-[#ff2a4b] h-3 shadow-[0_0_6px_#ff2a4b]'
                : 'bg-white/20 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </aside>
  );
}
