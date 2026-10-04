import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/portfolioData';
import ProjectModal from './ProjectModal';
import { ArrowUpRight, Database, Activity, BarChart3, ShoppingBag, ExternalLink, Bot, LineChart, FileText } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function AnimatedMetric({ numeric, value, label, prefix = "", suffix = "" }) {
  const [displayVal, setDisplayVal] = useState(numeric ? 0 : value);
  const ref = useRef(null);

  useEffect(() => {
    if (!numeric) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const duration = 900;
        const startTime = performance.now();
        const step = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const current = Math.floor(ease * numeric);
          setDisplayVal(prefix + current.toLocaleString() + suffix);
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            setDisplayVal(value);
          }
        };
        requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.2 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [numeric, value, prefix, suffix]);

  return (
    <div ref={ref} className="flex flex-col p-3 rounded-lg bg-white/[0.02] border border-white/5">
      <span className="font-mono-code text-xl sm:text-2xl lg:text-3xl font-extrabold text-white group-hover:text-[#FF365E] transition-colors leading-tight">
        {displayVal}
      </span>
      <span className="font-mono-code text-[11px] text-[#A1A1AA] uppercase tracking-wider mt-1">
        {label}
      </span>
    </div>
  );
}

export default function RecentWork({ playHover, playClick }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const containerRef = useRef(null);
  const projectItemRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      projectItemRefs.current.forEach((el) => {
        if (!el) return;

        gsap.fromTo(
          el,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      id="work"
      className="relative py-14 md:py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/5"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 font-mono-code text-[11px] tracking-widest uppercase text-[#A1A1AA] mb-2">
            <span className="text-[#FF365E] font-bold">03</span>
            <span className="text-white/30">//</span>
            <span className="text-white">SELECTED WORK</span>
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[0.95]">
            ANALYTICAL<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-[#FF365E]">
              PROJECTS.
            </span>
          </h2>
        </div>

        <p className="font-body text-sm sm:text-base text-[#A1A1AA] max-w-md leading-relaxed">
          Real-world data analytics projects spanning churn intelligence, large-scale supply chain diagnostics, and interactive BI reporting.
        </p>
      </div>

      {/* Projects List: No Collisions, Generous Spacing, Clean Flow */}
      <div className="flex flex-col gap-10 md:gap-14 pt-8">
        {projects.map((project, idx) => {
          const isRetainRag = project.id === 'retainrag';
          const isDataCo = project.id === 'dataco';
          const isBlinkit = project.id === 'blinkit';

          return (
            <article
              key={project.id}
              ref={(el) => (projectItemRefs.current[idx] = el)}
              data-cursor="project"
              data-cursor-text="VIEW PROJECT →"
              onClick={() => {
                playClick?.();
                setSelectedProject(project);
              }}
              className="group relative rounded-2xl border border-white/10 bg-[#121214] hover:border-[#FF365E]/40 shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-300 overflow-hidden flex flex-col cursor-pointer"
            >
              {/* Top subtle crimson accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF365E] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10" />

              <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
                {/* Left side: Editorial Meta, Title, Description, Metrics (7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    {/* Project Number & Category */}
                    <div className="flex items-center gap-3 mb-2.5">
                      <span className="font-mono-code text-xs text-[#FF365E] font-bold">
                        {project.number}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-white/30" />
                      <span className="font-mono-code text-[11px] tracking-widest text-[#A1A1AA] uppercase">
                        {isRetainRag ? 'PRIMARY FEATURED CASE STUDY' : isDataCo ? 'SUPPLY CHAIN DIAGNOSTICS' : 'RETAIL BI DASHBOARD'}
                      </span>
                    </div>

                    {/* Headline with subtle hover translation */}
                    <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2 leading-tight tracking-tight group-hover:translate-x-1.5 transition-transform duration-300">
                      {project.name}
                    </h3>

                    {/* Subtitle */}
                    <p className="font-heading text-sm sm:text-base text-[#FF365E] mb-4 font-medium">
                      {project.title}
                    </p>

                    {/* Description - Concise 2-3 sentences */}
                    <p className="font-body text-sm sm:text-base text-[#A1A1AA] leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  {/* Animated Count-Up Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
                    {project.metrics.map((metric, mIdx) => (
                      <AnimatedMetric
                        key={mIdx}
                        numeric={metric.numeric}
                        value={metric.value}
                        label={metric.label}
                        prefix={metric.prefix || ""}
                        suffix={metric.suffix || ""}
                      />
                    ))}
                  </div>

                  {/* Tech stack & Action Buttons */}
                  <div className="pt-5 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono-code text-white/90"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          playClick?.();
                          setSelectedProject(project);
                        }}
                        onMouseEnter={playHover}
                        data-cursor="pointer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 bg-white/5 text-xs font-mono-code font-semibold text-white group-hover:border-[#FF365E] group-hover:bg-[#FF365E]/10 transition-colors"
                      >
                        <span>VIEW CASE STUDY</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#FF365E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </button>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          playClick?.();
                        }}
                        onMouseEnter={playHover}
                        data-cursor="pointer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/10 text-xs font-mono-code text-[#A1A1AA] hover:text-white hover:border-white/30 transition-colors"
                      >
                        <span>GITHUB</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right side: Project Visual Preview Area (5 cols) */}
                <div className="lg:col-span-5 flex flex-col">
                  <div 
                    className="w-full min-h-[260px] sm:min-h-[300px] lg:min-h-full rounded-xl border border-white/10 bg-[#080809] p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden group-hover:border-[#FF365E]/30 group-hover:scale-[1.015] transition-all duration-300"
                  >
                    {/* Visualizer Header */}
                    <div className="flex items-center justify-between border-b border-white/5 pb-2.5 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#FF365E]" />
                        <span className="font-mono-code text-[11px] text-[#A1A1AA] tracking-wider uppercase">
                          {isRetainRag ? 'RETAINIQ INTELLIGENCE PLATFORM' : isDataCo ? 'SUPPLY CHAIN DIAGNOSTICS' : 'RETAIL BI DASHBOARD'}
                        </span>
                      </div>
                      <span className="font-mono-code text-[10px] text-white/40">
                        {isRetainRag ? 'STREAMLIT + OLLAMA' : isDataCo ? 'MYSQL 3NF SCHEMA' : 'POWER BI DAX'}
                      </span>
                    </div>

                    {/* Central Preview Content: Sits cleanly in place ready for real screenshots */}
                    {isRetainRag && (
                      <div className="flex flex-col gap-3 my-auto py-1">
                        {/* Clean Streamlit App / Dashboard Mockup Blueprint */}
                        <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col gap-2">
                          <div className="flex items-center justify-between text-xs font-mono-code">
                            <span className="text-white font-medium flex items-center gap-2">
                              <Database className="w-3.5 h-3.5 text-[#FF365E]" />
                              Fact / Dimension Churn Warehouse
                            </span>
                            <span className="text-[#FF365E] font-bold">ARI ~0.99</span>
                          </div>
                          <div className="text-[11px] text-[#A1A1AA] font-body leading-relaxed">
                            7,043 customers partitioned into 3 segments; Emerging Risk cohort identified with 47% churn risk.
                          </div>
                        </div>

                        {/* Hybrid RAG Query Preview */}
                        <div className="p-3 rounded-lg bg-[#FF365E]/5 border border-[#FF365E]/20 flex flex-col gap-1.5">
                          <div className="flex items-center gap-2 text-xs font-mono-code text-[#FF365E]">
                            <Bot className="w-3.5 h-3.5" />
                            <span className="font-semibold">Hybrid RAG + SQL Assistant</span>
                          </div>
                          <p className="text-[11px] font-body text-[#F5F5F5] italic leading-normal">
                            "Top geographic churn concentration isolated in San Diego (64.9% rate across high-value accounts)."
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-[11px] font-mono-code text-[#A1A1AA] pt-1">
                          <span>$3.68M Historical Revenue at Risk</span>
                          <span className="text-[#FF365E]">Qwen3 Local LLM</span>
                        </div>
                      </div>
                    )}

                    {isDataCo && (
                      <div className="flex flex-col gap-3 my-auto py-1">
                        <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col gap-2">
                          <div className="flex items-center justify-between text-xs font-mono-code">
                            <span className="text-white font-medium flex items-center gap-2">
                              <Activity className="w-3.5 h-3.5 text-[#FF365E]" />
                              Logistics Delivery SLA Diagnostics
                            </span>
                            <span className="text-[#FF365E] font-bold">100% Late First Class</span>
                          </div>
                          <div className="text-[11px] text-[#A1A1AA] font-body leading-relaxed">
                            Traced First Class shipment delays to an SLA scheduling mismatch across 180,000+ line items.
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-white/[0.015] border border-white/5 flex items-center justify-between text-xs font-mono-code">
                          <span className="text-[#A1A1AA]">Payment Fraud Channel:</span>
                          <span className="text-[#FF365E] font-bold">TRANSFER (8.2% vs 0%)</span>
                        </div>

                        <div className="flex items-center justify-between text-[11px] font-mono-code text-[#A1A1AA] pt-1">
                          <span>3NF Relational Model (6 Tables)</span>
                          <span className="text-[#FF365E]">60+ Complex Queries</span>
                        </div>
                      </div>
                    )}

                    {isBlinkit && (
                      <div className="flex flex-col gap-3 my-auto py-1">
                        <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col gap-2">
                          <div className="flex items-center justify-between text-xs font-mono-code">
                            <span className="text-white font-medium flex items-center gap-2">
                              <ShoppingBag className="w-3.5 h-3.5 text-[#FF365E]" />
                              Power BI Retail Sales Analytics
                            </span>
                            <span className="text-[#FF365E] font-bold">INR 1.86 Cr</span>
                          </div>
                          <div className="text-[11px] text-[#A1A1AA] font-body leading-relaxed">
                            Supermarket Type1 outlets generated 69% of revenue; Medium outlets drove 63% share.
                          </div>
                        </div>

                        <div className="p-3 rounded-lg bg-white/[0.015] border border-white/5 flex items-center justify-between text-xs font-mono-code">
                          <span className="text-[#A1A1AA]">Geographic Outperformance:</span>
                          <span className="text-[#FF365E] font-bold">Tier 3 vs Tier 1 (+70%)</span>
                        </div>

                        <div className="flex items-center justify-between text-[11px] font-mono-code text-[#A1A1AA] pt-1">
                          <span>Dynamic DAX Slicer Hierarchy</span>
                          <span className="text-[#FF365E]">8,500+ Sales Records</span>
                        </div>
                      </div>
                    )}

                    {/* Visualizer Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/5 font-mono-code text-[11px] text-[#A1A1AA] mt-3">
                      <span>CASE STUDY PREVIEW</span>
                      <span className="text-white/70 group-hover:text-[#FF365E] transition-colors flex items-center gap-1 font-semibold">
                        OPEN DETAILS <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Selected Project Interactive Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          playClick={playClick}
          playHover={playHover}
        />
      )}
    </section>
  );
}
