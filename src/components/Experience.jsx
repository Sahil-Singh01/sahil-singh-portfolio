import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience, education, certifications } from '../data/portfolioData';
import { Building2, GraduationCap, Award, CheckCircle2, Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Experience({ playHover }) {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const singleExp = experience[0];

  return (
    <section 
      ref={sectionRef}
      id="experience"
      className="relative py-14 md:py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/5 font-mono-code text-[11px] tracking-widest uppercase text-[#A1A1AA]">
        <div className="flex items-center gap-2">
          <span className="text-[#FF365E] font-bold">04</span>
          <span className="text-white/30">//</span>
          <span className="text-white">EXPERIENCE & EDUCATION</span>
        </div>
        <div className="text-white/40">
          PROFESSIONAL BACKGROUND
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-8 items-start">
        {/* Left Column: Heading & Academic Credentials (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-[0.95] mb-4">
              PROFESSIONAL<br />
              EXPERIENCE.
            </h2>
            <p className="font-body text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
              Professional data analytics experience, structured education, and verified industry certifications.
            </p>
          </div>

          {/* Education Card */}
          <div className="p-5 rounded-xl border border-white/5 bg-[#121214] flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-mono-code text-[#FF365E]">
              <GraduationCap className="w-4 h-4" />
              <span>ACADEMIC BACKGROUND</span>
            </div>
            <h4 className="font-display text-base font-bold text-white">
              {education.degree}
            </h4>
            <p className="font-body text-xs text-[#A1A1AA]">
              {education.institution}
            </p>
            <span className="font-mono-code text-[11px] text-white/40 mt-1">
              {education.period}
            </span>
          </div>

          {/* Professional Certifications */}
          <div className="p-5 rounded-xl border border-white/5 bg-[#121214] flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs font-mono-code text-[#FF365E]">
              <Award className="w-4 h-4" />
              <span>VERIFIED CERTIFICATIONS</span>
            </div>
            <div className="flex flex-col gap-2 pt-1">
              {certifications.map((cert, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF365E] mt-0.5 shrink-0" />
                  <span className="font-body text-[#F5F5F5]">{cert.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Featured Role (7 cols) */}
        <div ref={cardRef} className="lg:col-span-7">
          <div 
            onMouseEnter={playHover}
            className="group relative p-7 sm:p-9 md:p-10 rounded-2xl border border-white/10 bg-[#121214] hover:border-[#FF365E]/40 shadow-[0_20px_50px_rgba(0,0,0,0.45)] transition-all duration-300"
          >
            {/* Top red accent highlight */}
            <div className="absolute top-0 left-0 w-24 h-[2px] bg-[#FF365E]" />

            {/* Top Meta: Organization & Dates */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FF365E]/30 bg-[#FF365E]/10 text-xs font-mono-code text-[#FF365E]">
                <Building2 className="w-3.5 h-3.5" />
                <span>{singleExp.organization}</span>
              </div>

              <span className="font-mono-code text-xs text-[#A1A1AA]">
                {singleExp.period}
              </span>
            </div>

            {/* Role Title */}
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
              {singleExp.role}
            </h3>

            {/* Role Summary */}
            <p className="font-body text-base text-[#F5F5F5] leading-relaxed mb-6">
              {singleExp.summary}
            </p>

            {/* Key Verified Responsibilities */}
            <div className="flex flex-col gap-3.5 py-5 border-y border-white/5 mb-6">
              {singleExp.responsibilities ? (
                singleExp.responsibilities.map((resp, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#FF365E]/10 border border-[#FF365E]/30 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3 h-3 text-[#FF365E]" />
                    </div>
                    <p className="font-body text-sm text-[#A1A1AA] leading-relaxed">
                      {resp}
                    </p>
                  </div>
                ))
              ) : null}
            </div>

            {/* Focused Technology List */}
            <div className="flex flex-wrap gap-2">
              {singleExp.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 rounded-md bg-white/5 border border-white/10 font-mono-code text-xs text-[#F5F5F5]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Professional Availability Note */}
          <div className="mt-5 p-4 rounded-xl border border-dashed border-white/10 bg-white/[0.01] flex items-center justify-between text-xs font-mono-code text-[#A1A1AA]">
            <span className="flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5 text-[#FF365E]" />
              AVAILABLE FOR DATA ANALYST & BUSINESS INTELLIGENCE ROLES
            </span>
            <span className="text-[#FF365E] font-medium">FULL-TIME / CONTRACT</span>
          </div>
        </div>
      </div>
    </section>
  );
}
