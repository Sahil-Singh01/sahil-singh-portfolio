import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, FileText, Database, Sparkles } from 'lucide-react';
import AvatarHead from './AvatarHead';
import { personalInfo } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ onOpenResume, playHover, playClick }) {
  const heroRef = useRef(null);
  const sahilRef = useRef(null);
  const singhRef = useRef(null);
  const avatarWrapperRef = useRef(null);
  const statementRef = useRef(null);
  const metricsRef = useRef(null);
  const bgDataRef = useRef(null);

  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Mouse Parallax for Hero
  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const { innerWidth, innerHeight } = window;
          const x = (e.clientX / innerWidth - 0.5) * 14;
          const y = (e.clientY / innerHeight - 0.5) * 14;
          setMouseOffset({ x, y });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // GSAP Scroll Transformations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom 40%',
          scrub: 0.5,
          pin: false,
        }
      });

      // Subtle separation of display names
      tl.to(sahilRef.current, {
        x: -40,
        y: -25,
        opacity: 0.3,
        ease: 'none'
      }, 0);

      tl.to(singhRef.current, {
        x: 40,
        y: -25,
        opacity: 0.3,
        ease: 'none'
      }, 0);

      // Statement moves downward slightly
      tl.to(statementRef.current, {
        y: 20,
        opacity: 0.3,
        ease: 'none'
      }, 0);

      // Avatar softens gently during scroll transition to prevent awkward clipping under navbar
      tl.to(avatarWrapperRef.current, {
        y: -25,
        scale: 0.96,
        opacity: 0.25,
        ease: 'none'
      }, 0);

      tl.to(metricsRef.current, {
        opacity: 0,
        y: -15,
        ease: 'none'
      }, 0);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToWork = (e) => {
    e.preventDefault();
    playClick?.();
    const workSec = document.getElementById('work');
    if (workSec) {
      workSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-between pt-20 md:pt-24 pb-6 px-6 md:px-12 max-w-7xl mx-auto overflow-x-clip select-none"
    >
      {/* Background ambient location coordinate */}
      <div 
        ref={bgDataRef}
        className="absolute inset-0 pointer-events-none transition-transform duration-700 ease-out z-0"
        style={{
          transform: `translate3d(${mouseOffset.x * -0.4}px, ${mouseOffset.y * -0.4}px, 0)`
        }}
      >
        <div className="absolute top-1/2 right-12 font-mono-code text-[10px] text-white/10 tracking-[0.25em]">
          NEW DELHI // 28.6139° N, 77.2090° E
        </div>
      </div>

      {/* Hero Top Status Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2.5 font-mono-code text-[11px] tracking-widest text-[#A1A1AA] uppercase">
          <span className="w-2 h-2 rounded-full bg-[#FF365E] animate-ping" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF365E] -ml-3.5" />
          <span>DATA ANALYST PORTFOLIO</span>
        </div>

        <div className="flex items-center gap-3 font-mono-code text-[11px] tracking-widest text-[#A1A1AA] uppercase">
          <span className="text-[#FF365E]">STATUS</span>
          <span className="text-white/70">AVAILABLE FOR ROLES</span>
        </div>
      </div>

      {/* Hero Main Content: Asymmetric Layout */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto py-4 md:py-6">
        {/* Left Column: Display Typography & CTAs (7 cols) */}
        <div 
          className="lg:col-span-7 flex flex-col justify-center transition-transform duration-500 ease-out"
          style={{
            transform: `translate3d(${mouseOffset.x * 0.3}px, ${mouseOffset.y * 0.3}px, 0)`
          }}
        >
          {/* Subtitle / Focus pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 w-fit mb-5">
            <Database className="w-3 h-3 text-[#FF365E]" />
            <span className="font-mono-code text-[10px] md:text-xs tracking-[0.2em] text-[#F5F5F5] uppercase">
              {personalInfo.tagline}
            </span>
          </div>

          {/* Large Display Typography */}
          <div className="flex flex-col tracking-tighter leading-[0.88] mb-6">
            <h1 ref={sahilRef} className="font-display font-extrabold text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white will-change-transform">
              {personalInfo.firstName}
            </h1>
            <h1 ref={singhRef} className="font-display font-extrabold text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/40 flex items-baseline will-change-transform">
              {personalInfo.lastName}
              <span className="inline-block w-3 h-3 md:w-5 md:h-5 rounded-full bg-[#FF365E] ml-3 shadow-[0_0_20px_#FF365E]" />
            </h1>
          </div>

          {/* Main Statement */}
          <div ref={statementRef} className="flex flex-col gap-6 max-w-xl">
            <p className="font-heading text-xl md:text-2xl lg:text-3xl text-[#F5F5F5] font-normal leading-relaxed">
              Turning <span className="text-white font-medium underline decoration-[#FF365E] decoration-2 underline-offset-8">data into decisions</span>, systems into insight.
            </p>

            <p className="font-body text-sm md:text-base text-[#A1A1AA] leading-relaxed max-w-lg">
              Specialized in end-to-end data analytics, business intelligence dashboards, and intelligent GenAI / RAG analytical pipelines.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#work"
                onClick={scrollToWork}
                onMouseEnter={playHover}
                data-cursor="pointer"
                className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded bg-white text-[#080809] font-mono-code text-xs md:text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-[#FF365E] hover:text-white hover:shadow-[0_0_25px_rgba(255,54,94,0.4)]"
              >
                <span>EXPLORE WORK</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <button
                onClick={() => {
                  playClick?.();
                  onOpenResume?.();
                }}
                onMouseEnter={playHover}
                data-cursor="pointer"
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded border border-white/20 bg-white/5 text-white font-mono-code text-xs md:text-sm tracking-wider uppercase transition-all duration-300 hover:border-[#FF365E] hover:bg-[#FF365E]/10"
              >
                <FileText className="w-4 h-4 text-[#FF365E]" />
                <span>VIEW RESUME ↗</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Floating Avatar Head as Artwork (5 cols) */}
        <div 
          ref={avatarWrapperRef}
          className="lg:col-span-5 flex items-center justify-center relative transition-transform duration-700 ease-out"
          style={{
            transform: `translate3d(${mouseOffset.x * -0.5}px, ${mouseOffset.y * -0.5}px, 0)`
          }}
        >
          {/* Subtle background circular glow behind avatar */}
          <div className="absolute w-[340px] h-[340px] md:w-[440px] md:h-[440px] rounded-full border border-white/5 pointer-events-none" />
          <div className="absolute w-[220px] h-[220px] md:w-[300px] md:h-[300px] rounded-full border border-[#FF365E]/20 pointer-events-none" />
          
          {/* HEAD-ONLY Avatar Component */}
          <AvatarHead 
            size="hero"
            enableTilt={true}
            glowIntensity="high"
          />

          {/* Badge below avatar */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-mono-code text-[11px] text-[#A1A1AA] tracking-widest uppercase flex items-center gap-2 whitespace-nowrap bg-[#121214] border border-white/10 px-4 py-1.5 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
            <Sparkles className="w-3 h-3 text-[#FF365E]" />
            <span>DATA · BI · GENAI ARCHITECTURE</span>
          </div>
        </div>
      </div>

      {/* Hero Bottom Bar: Key Verified Metrics */}
      <div 
        ref={metricsRef}
        className="relative z-10 pt-8 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        {/* Verified Data Fact Pills */}
        <div className="flex flex-wrap items-center gap-6 md:gap-10">
          <div className="flex flex-col">
            <span className="font-mono-code text-xs text-[#FF365E] font-bold">
              7,043 RECORDS
            </span>
            <span className="font-mono-code text-[10px] tracking-wider text-[#A1A1AA] uppercase">
              CHURN & RETENTION PLATFORM
            </span>
          </div>

          <div className="hidden sm:block w-[1px] h-6 bg-white/10" />

          <div className="flex flex-col">
            <span className="font-mono-code text-xs text-white font-bold">
              180,000+ ORDERS
            </span>
            <span className="font-mono-code text-[10px] tracking-wider text-[#A1A1AA] uppercase">
              SUPPLY CHAIN PIPELINE
            </span>
          </div>

          <div className="hidden sm:block w-[1px] h-6 bg-white/10" />

          <div className="flex flex-col">
            <span className="font-mono-code text-xs text-white font-bold">
              ₹1.86 CR SALES
            </span>
            <span className="font-mono-code text-[10px] tracking-wider text-[#A1A1AA] uppercase">
              POWER BI DASHBOARDS
            </span>
          </div>
        </div>

        {/* Scroll prompt */}
        <div className="flex items-center gap-3 font-mono-code text-[10px] tracking-[0.25em] text-[#A1A1AA] uppercase">
          <span>SCROLL TO EXPLORE</span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
            <span className="w-1 h-2 rounded-full bg-[#FF365E] animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
