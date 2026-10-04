import React, { useState, useEffect, useRef } from 'react';
import { capabilities } from '../data/portfolioData';
import { ChevronRight } from 'lucide-react';

export default function WhatCanIDo({ playHover, playClick }) {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
          if (containerHeight <= 0) return;
          
          const scrollProgress = Math.max(0, Math.min(1, -rect.top / containerHeight));
          const index = Math.min(
            capabilities.length - 1,
            Math.floor(scrollProgress * capabilities.length)
          );

          setActiveIndex(index);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentCap = capabilities[activeIndex] || capabilities[0];

  return (
    <section 
      ref={containerRef}
      id="capabilities"
      className="relative h-[115vh] lg:h-[120vh] border-t border-white/5"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen flex flex-col justify-between py-8 md:py-12 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-3 font-mono-code text-[11px] tracking-widest uppercase text-[#A1A1AA]">
          <div className="flex items-center gap-2">
            <span className="text-[#FF365E] font-bold">02</span>
            <span className="text-white/30">//</span>
            <span className="text-white">WHAT CAN I DO</span>
          </div>
          <div className="text-white/50">
            AREAS OF PRACTICE
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center my-auto">
          {/* Left Column: Title & Category Navigation (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <span className="font-mono-code text-xs text-[#FF365E] tracking-[0.25em] uppercase mb-2">
              ANALYTICAL DISCIPLINES
            </span>

            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[0.95] mb-6">
              WHAT<br />
              CAN I DO?
            </h2>

            {/* Category Selector List with high-contrast readable inactive state */}
            <div className="relative pl-4 flex flex-col gap-2.5">
              {/* Category indicator line */}
              <div className="absolute left-0 top-1 bottom-1 w-[2px] bg-white/10">
                <div 
                  className="w-full bg-[#FF365E] shadow-[0_0_10px_#FF365E] transition-all duration-300"
                  style={{
                    height: `${((activeIndex + 1) / capabilities.length) * 100}%`
                  }}
                />
              </div>

              {capabilities.map((cap, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={cap.index}
                    onClick={() => {
                      playClick?.();
                      setActiveIndex(idx);
                    }}
                    onMouseEnter={playHover}
                    data-cursor="pointer"
                    className={`text-left p-3.5 rounded-xl transition-all duration-200 group flex items-center justify-between ${
                      isActive 
                        ? 'bg-white/[0.06] border border-white/15 translate-x-1.5' 
                        : 'border border-transparent hover:border-white/10 hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className={`font-mono-code text-xs font-semibold ${
                        isActive ? 'text-[#FF365E]' : 'text-[#71717A] group-hover:text-[#FF365E]'
                      }`}>
                        {cap.index}
                      </span>
                      <span className={`font-heading text-base sm:text-lg font-bold tracking-tight uppercase transition-colors ${
                        isActive ? 'text-white' : 'text-[#D4D4D8] group-hover:text-white'
                      }`}>
                        {cap.domain}
                      </span>
                    </div>

                    {isActive && (
                      <ChevronRight className="w-4 h-4 text-[#FF365E]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Domain Display Card with smooth transition (7 cols) */}
          <div className="lg:col-span-7">
            <div 
              key={currentCap.index}
              className="relative p-7 sm:p-10 md:p-12 rounded-2xl border border-white/10 bg-[#121214] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300 animate-[fadeIn_0.25s_ease-out]"
            >
              {/* Subtle crimson accent bar */}
              <div className="absolute top-0 left-0 w-20 h-[2px] bg-[#FF365E]" />

              <div className="mb-3">
                <span className="font-mono-code text-xs tracking-widest text-[#FF365E] font-bold">
                  {currentCap.index} — ANALYTICAL DOMAIN
                </span>
              </div>

              {/* Large Active Category Title */}
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
                {currentCap.domain}
              </h3>

              {/* Short Supporting Description */}
              <p className="font-heading text-base sm:text-lg text-[#F5F5F5] mb-4">
                {currentCap.subtitle}
              </p>

              <p className="font-body text-sm sm:text-base text-[#A1A1AA] leading-relaxed mb-8 border-b border-white/5 pb-6">
                {currentCap.details}
              </p>

              {/* Relevant Technologies List */}
              <div className="flex flex-col gap-3">
                <span className="font-mono-code text-xs tracking-wider text-white/50 uppercase">
                  CORE TOOLS & TECHNOLOGIES:
                </span>

                <div className="flex flex-wrap gap-2">
                  {currentCap.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="px-3.5 py-1.5 rounded-md border border-white/10 bg-white/5 text-[#F5F5F5] font-mono-code text-xs tracking-wide transition-all duration-200 cursor-default flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF365E]" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section Footer */}
        <div className="flex items-center justify-between border-t border-white/5 pt-3 font-mono-code text-[11px] text-[#A1A1AA] tracking-widest uppercase">
          <span>SPECIALIZED DOMAINS</span>
          <span className="text-[#FF365E]">0{activeIndex + 1} / 04</span>
        </div>
      </div>
    </section>
  );
}
