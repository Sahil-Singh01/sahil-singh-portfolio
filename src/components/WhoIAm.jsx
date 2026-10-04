import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { eightCapabilities, personalInfo } from '../data/portfolioData';
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Database, 
  Sliders, 
  Sparkles, 
  Table, 
  CheckCircle2 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const capabilityIcons = [
  TrendingUp,     // 01 Data Analytics
  BarChart3,      // 02 Business Intelligence
  PieChart,       // 03 Data Visualization
  Database,       // 04 Database Management
  Sliders,        // 05 Data Preparation
  Sparkles,       // 06 GenAI & RAG
  Table,          // 07 Spreadsheet Analytics
  CheckCircle2    // 08 Analytical Problem Solving
];

export default function WhoIAm({ playHover }) {
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro entrance
      gsap.fromTo(
        introRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: introRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Fast, crisp staggered cards entrance
      if (cardsRef.current.length > 0) {
        gsap.fromTo(
          cardsRef.current,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.04,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current[0],
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about"
      className="relative z-20 bg-[#080809] py-14 md:py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5"
    >
      {/* Section Top Breadcrumb */}
      <div className="flex items-center justify-between pb-6 border-b border-white/5 font-mono-code text-[11px] tracking-widest uppercase text-[#A1A1AA]">
        <div className="flex items-center gap-2">
          <span className="text-[#FF365E] font-bold">01</span>
          <span className="text-white/30">//</span>
          <span className="text-white">WHO I AM</span>
        </div>
        <div className="text-white/40">
          PROFILE & EXPERTISE
        </div>
      </div>

      {/* Editorial Intro: Who I Am */}
      <div ref={introRef} className="pt-10 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Heading & Role (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[0.95] mb-4">
              WHO<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-[#FF365E]">
                I AM.
              </span>
            </h2>
            <p className="font-heading text-lg sm:text-xl text-[#F5F5F5] font-normal leading-relaxed">
              {personalInfo.heroStatement}
            </p>
          </div>

          {/* Right Column: Natural, Grounded Introduction (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6 max-w-2xl text-base sm:text-[17px] text-[#A1A1AA] leading-[1.8]">
            <p>
              I’m a <strong className="text-white font-medium">Data Analyst</strong> focused on turning complex data into clear, actionable insights. My work spans data cleaning, exploratory analysis, statistical testing, business intelligence, and analytical reporting — using <strong className="text-white font-medium">Python</strong>, <strong className="text-white font-medium">SQL</strong>, <strong className="text-white font-medium">Power BI</strong>, Excel, and MySQL to solve practical business problems.
            </p>
            <p>
              I build analytical solutions end to end, from structuring raw data and uncovering patterns to developing interactive reporting and intelligent <strong className="text-white font-medium">GenAI / RAG</strong> systems. My projects include customer retention analysis across 7,000+ records, supply-chain analytics across 180,000+ records, and evidence-backed AI systems designed to answer business questions with traceable insights.
            </p>
          </div>
        </div>
      </div>

      {/* Section Subheading: My Expertise */}
      <div className="pt-8 pb-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
            MY EXPERTISE
          </h3>
          <p className="font-body text-sm text-[#A1A1AA] mt-1">
            Core analytical disciplines applied across projects.
          </p>
        </div>
      </div>

      {/* Clean 8-Card Responsive CSS Grid with generous whitespace and no hashtag noise */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 pt-4">
        {eightCapabilities.map((cap, idx) => {
          const IconComponent = capabilityIcons[idx] || TrendingUp;
          return (
            <div
              key={cap.number}
              ref={(el) => (cardsRef.current[idx] = el)}
              onMouseEnter={playHover}
              className="group relative p-6 sm:p-7 rounded-xl border border-white/5 bg-[#121214] hover:border-[#FF365E]/40 hover:bg-[#151518] hover:-translate-y-1 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle top crimson indicator line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF365E] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              <div>
                {/* Card Top: Number & Minimal Icon */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono-code text-xs font-semibold text-[#A1A1AA] group-hover:text-[#FF365E] transition-colors">
                    {cap.number}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/60 group-hover:text-[#FF365E] group-hover:border-[#FF365E]/30 transition-all duration-200">
                    <IconComponent className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Heading */}
                <h4 className="font-display text-lg font-bold text-white mb-2 group-hover:text-white transition-colors">
                  {cap.title}
                </h4>

                {/* Short Description */}
                <p className="font-body text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                  {cap.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
