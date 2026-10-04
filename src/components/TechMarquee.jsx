import React, { useEffect, useRef, useState } from 'react';
import { techStreams } from '../data/portfolioData';
import { Terminal, Cpu } from 'lucide-react';

export default function TechMarquee({ playHover }) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0].isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="py-12 md:py-14 overflow-hidden border-y border-white/5 bg-[#080809] select-none relative"
    >
      {/* Background ambient crimson center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-20 bg-[#FF365E]/5 blur-3xl pointer-events-none" />

      {/* Marquee Header label */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-5 flex items-center justify-between font-mono-code text-[11px] tracking-widest uppercase text-[#A1A1AA]">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-[#FF365E]" />
          <span>TECHNICAL TOOLKIT</span>
        </div>
        <div className="hidden sm:block text-white/30">
          CORE TOOLS & ANALYTICAL STREAMS
        </div>
      </div>

      {/* Marquee Row 1 (Stream 1: Analytics & BI) */}
      <div className="flex whitespace-nowrap overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div 
          className={`flex gap-4 sm:gap-6 animate-[marquee_45s_linear_infinite] hover:[animation-play-state:paused] ${
            !isVisible ? '[animation-play-state:paused]' : ''
          }`}
        >
          {[...techStreams.stream1, ...techStreams.stream1, ...techStreams.stream1].map((tool, idx) => (
            <div
              key={`${tool}-${idx}`}
              onMouseEnter={playHover}
              data-cursor="pointer"
              className="group inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full border border-white/10 bg-[#121214] hover:border-[#FF365E]/50 hover:bg-white/[0.04] transition-all duration-200"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF365E] group-hover:scale-125 transition-transform" />
              <span className="font-heading text-xs sm:text-sm font-semibold tracking-wide text-[#F5F5F5] group-hover:text-white transition-colors">
                {tool}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 (Stream 2: Modeling & Tools) */}
      <div className="flex whitespace-nowrap overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] mt-3">
        <div 
          className={`flex gap-4 sm:gap-6 animate-[marquee-reverse_50s_linear_infinite] hover:[animation-play-state:paused] ${
            !isVisible ? '[animation-play-state:paused]' : ''
          }`}
        >
          {[...techStreams.stream2, ...techStreams.stream2, ...techStreams.stream2].map((tool, idx) => (
            <div
              key={`${tool}-${idx}`}
              onMouseEnter={playHover}
              data-cursor="pointer"
              className="group inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full border border-white/5 bg-[#121214]/60 hover:border-[#FF365E]/40 hover:bg-white/[0.03] transition-all duration-200"
            >
              <span className="w-1 h-1 rounded-full bg-white/40 group-hover:bg-[#FF365E] transition-colors" />
              <span className="font-mono-code text-xs sm:text-sm font-normal tracking-wider text-[#A1A1AA] group-hover:text-white transition-colors">
                {tool}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
