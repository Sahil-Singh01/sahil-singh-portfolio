import React from 'react';
import { ArrowUp, MapPin } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Footer({ playHover, playClick }) {
  const scrollToTop = () => {
    playClick?.();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 md:py-16 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 select-none font-mono-code text-xs text-[#A1A1AA]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10">
        {/* Brand identity: Large bold name & editorial subtext */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF365E] shadow-[0_0_12px_#FF365E]" />
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-white tracking-tight uppercase">
              {personalInfo.name}
            </h2>
          </div>
          <p className="font-mono-code text-xs tracking-wider text-[#A1A1AA] uppercase pl-5">
            DATA ANALYST · BUSINESS INTELLIGENCE · GENAI
          </p>
        </div>

        {/* Location & Back to Top action */}
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02]">
            <MapPin className="w-3.5 h-3.5 text-[#FF365E]" />
            <span className="text-[11px] text-white/80 tracking-wider uppercase">
              DELHI, INDIA
            </span>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            onMouseEnter={playHover}
            data-cursor="pointer"
            className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 hover:border-[#FF365E] text-white/90 hover:text-white transition-all duration-200"
          >
            <span className="text-[11px] tracking-widest uppercase font-semibold">BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#FF365E] group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Bottom copyright line */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5 text-[11px] tracking-widest uppercase text-white/40">
        <div>
          © {new Date().getFullYear()} SAHIL SINGH. ALL RIGHTS RESERVED.
        </div>
        <div>
          PORTFOLIO ARCHITECTURE · DATA & DECISION SYSTEMS
        </div>
      </div>
    </footer>
  );
}
