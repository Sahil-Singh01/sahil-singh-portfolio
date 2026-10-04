import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Mail, Copy, Check, ExternalLink } from 'lucide-react';
import { userSocialProfiles } from '../data/portfolioData';
import confetti from 'canvas-confetti';

gsap.registerPlugin(ScrollTrigger);

export default function ContactCTA({ playHover, playClick }) {
  const sectionRef = useRef(null);
  const buttonRef = useRef(null);
  const w1Ref = useRef(null);
  const w2Ref = useRef(null);
  const w3Ref = useRef(null);
  const subtextRef = useRef(null);
  const ctaBtnWrapperRef = useRef(null);

  const [copied, setCopied] = useState(false);

  // Progressive scroll reveal for heading and CTA
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'top 35%',
          scrub: 0.3,
        }
      });

      tl.fromTo(w1Ref.current, { opacity: 0.2, y: 20 }, { opacity: 1, y: 0, ease: 'power2.out' }, 0)
        .fromTo(w2Ref.current, { opacity: 0.2, y: 20 }, { opacity: 1, y: 0, ease: 'power2.out' }, 0.1)
        .fromTo(w3Ref.current, { opacity: 0.2, y: 20 }, { opacity: 1, y: 0, ease: 'power2.out' }, 0.2)
        .fromTo(subtextRef.current, { opacity: 0.2, y: 15 }, { opacity: 1, y: 0, ease: 'power2.out' }, 0.3)
        .fromTo(ctaBtnWrapperRef.current, { scale: 0.96, opacity: 0.4 }, { scale: 1, opacity: 1, ease: 'power2.out' }, 0.4);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Lightweight Magnetic Hover Effect on Button without React state re-rendering
  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.hypot(distanceX, distanceY);

    if (distance < 140) {
      const offsetX = distanceX * 0.18;
      const offsetY = distanceY * 0.18;
      buttonRef.current.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
    } else {
      buttonRef.current.style.transform = 'translate3d(0, 0, 0)';
    }
  };

  const handleMouseLeave = () => {
    if (buttonRef.current) {
      buttonRef.current.style.transform = 'translate3d(0, 0, 0)';
    }
  };

  const handleCopyEmail = (e) => {
    e.preventDefault();
    e.stopPropagation();
    playClick?.();
    navigator.clipboard?.writeText(userSocialProfiles.emailAddress)?.catch(() => {});
    setCopied(true);
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FF365E', '#ffffff', '#ff6b81']
    });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section 
      ref={sectionRef}
      id="contact"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-24 pb-20 md:pt-32 md:pb-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5 overflow-hidden select-none scroll-mt-24"
    >
      {/* Background ambient crimson bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] rounded-full bg-[#FF365E]/8 blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        <span className="font-mono-code text-xs text-[#FF365E] tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF365E]" />
          START A CONVERSATION
        </span>

        {/* Large Cinematic Display Heading with Progressive Word Reveal */}
        <h2 className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.92] mb-6 flex flex-col items-center">
          <span ref={w1Ref} className="text-white will-change-transform">
            LET'S BUILD
          </span>
          <span ref={w2Ref} className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-[#FF365E] will-change-transform">
            SOMETHING
          </span>
          <span ref={w3Ref} className="text-white will-change-transform">
            USEFUL.
          </span>
        </h2>

        {/* Supporting Line */}
        <p ref={subtextRef} className="font-heading text-base sm:text-lg text-[#A1A1AA] max-w-xl mb-10 leading-relaxed will-change-transform">
          Available for Data Analyst, Business Intelligence, and analytics-focused opportunities.
        </p>

        {/* Primary CTA Button: Real Working Anchor to Gmail Compose */}
        <div ref={ctaBtnWrapperRef} className="relative z-20 mb-10 will-change-transform">
          <a
            ref={buttonRef}
            href="https://mail.google.com/mail/?view=cm&fs=1&to=sahilsingh.data@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClick?.()}
            onMouseEnter={playHover}
            data-cursor="pointer"
            className="group relative inline-flex items-center gap-4 px-10 py-5 rounded-full bg-white text-[#080809] hover:bg-[#FF365E] hover:text-white font-mono-code text-sm md:text-base font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_35px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,54,94,0.45)] cursor-pointer"
          >
            <span>SEND AN EMAIL</span>
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>

        {/* Quick Contact Hub for Recruiters */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-6 border-t border-white/5 font-mono-code text-xs">
          {/* Small Email: Real Clickable Anchor Link to Gmail Compose */}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=sahilsingh.data@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playClick?.()}
            onMouseEnter={playHover}
            data-cursor="pointer"
            title="Compose email to sahilsingh.data@gmail.com in Gmail"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/[0.02] text-[#A1A1AA] hover:text-white hover:border-[#FF365E] transition-colors group cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-[#FF365E]" />
            <span className="group-hover:text-white transition-colors">{userSocialProfiles.emailAddress}</span>
            <ExternalLink className="w-3 h-3 text-white/40 group-hover:text-[#FF365E] transition-colors" />
          </a>

          {/* Quick Copy Email Button */}
          <button
            onClick={handleCopyEmail}
            onMouseEnter={playHover}
            data-cursor="pointer"
            title="Copy email to clipboard"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 bg-white/[0.02] text-[#A1A1AA] hover:text-white hover:border-[#FF365E] transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#FF365E]" /> : <Copy className="w-3.5 h-3.5 text-white/40" />}
            <span>{copied ? 'COPIED!' : 'COPY'}</span>
          </button>

          {/* LinkedIn Link with target="_blank" and rel="noopener noreferrer" */}
          <a
            href={userSocialProfiles.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            data-cursor="pointer"
            title="Open LinkedIn Profile"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-white/10 bg-white/[0.02] text-[#A1A1AA] hover:text-white hover:border-[#FF365E] transition-colors cursor-pointer"
          >
            <span>LINKEDIN</span>
            <ExternalLink className="w-3 h-3 text-white/40" />
          </a>

          {/* GitHub Link with target="_blank" and rel="noopener noreferrer" */}
          <a
            href={userSocialProfiles.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            data-cursor="pointer"
            title="Open GitHub Profile"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-white/10 bg-white/[0.02] text-[#A1A1AA] hover:text-white hover:border-[#FF365E] transition-colors cursor-pointer"
          >
            <span>GITHUB</span>
            <ExternalLink className="w-3 h-3 text-white/40" />
          </a>
        </div>
      </div>
    </section>
  );
}
