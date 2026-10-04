import React from 'react';
import { X, ExternalLink, Database, Layers, CheckCircle2, Cpu, BarChart2 } from 'lucide-react';

export default function ProjectModal({ project, onClose, playClick, playHover }) {
  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-[#080809]/95 backdrop-blur-2xl overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          playClick?.();
          onClose();
        }
      }}
    >
      <div 
        className="relative w-full max-w-4xl bg-[#121214] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.8)] my-auto max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle crimson ambient glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#FF365E]/10 blur-[90px] pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-3 font-mono-code text-xs text-[#FF365E] tracking-widest uppercase mb-2">
              <span>PROJECT {project.number}</span>
              <span className="text-white/20">/</span>
              <span>{project.name}</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-white mb-2">
              {project.title}
            </h2>
            <p className="font-heading text-sm sm:text-base text-[#A1A1AA]">
              {project.tagline}
            </p>
          </div>

          <button
            onClick={() => {
              playClick?.();
              onClose();
            }}
            onMouseEnter={playHover}
            data-cursor="pointer"
            className="p-2.5 rounded-full border border-white/10 bg-white/5 text-white/70 hover:text-white hover:border-[#FF365E] hover:bg-[#FF365E]/10 transition-colors"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Verified Facts & Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-8">
          {project.metrics.map((m, i) => (
            <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
              <div className="font-mono-code text-xl sm:text-2xl font-bold text-white mb-1">
                {m.value}
              </div>
              <div className="font-mono-code text-[10px] text-[#FF365E] tracking-wider uppercase">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Project Overview */}
        <div className="mb-8">
          <h4 className="font-mono-code text-xs uppercase tracking-widest text-[#A1A1AA] mb-3">
            PROJECT OVERVIEW
          </h4>
          <p className="font-body text-base text-[#F5F5F5] leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Key Highlights from Resume */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="mb-8">
            <h4 className="font-mono-code text-xs uppercase tracking-widest text-[#A1A1AA] mb-4">
              KEY ACHIEVEMENTS & METHODOLOGY
            </h4>
            <div className="flex flex-col gap-2.5">
              {project.highlights.map((highlight, hIdx) => (
                <div key={hIdx} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.015] border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF365E] mt-0.5 shrink-0" />
                  <span className="font-body text-sm text-[#F5F5F5] leading-relaxed">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Architecture & Pipeline Stages */}
        {project.architecture && (
          <div className="mb-8">
            <h4 className="font-mono-code text-xs uppercase tracking-widest text-[#A1A1AA] mb-4">
              SYSTEM ARCHITECTURE & WORKFLOW
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.architecture.map((stage, idx) => (
                <div key={idx} className="p-4 rounded-lg border border-white/5 bg-white/[0.015] flex flex-col justify-between">
                  <span className="font-mono-code text-[10px] text-[#FF365E] font-bold mb-1">
                    {stage.stage}
                  </span>
                  <span className="font-heading text-sm font-semibold text-white mb-2">
                    {stage.name}
                  </span>
                  <span className="font-mono-code text-[11px] text-white/50">
                    {stage.tech}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Core Technologies Pill List */}
        <div className="mb-8">
          <h4 className="font-mono-code text-xs uppercase tracking-widest text-[#A1A1AA] mb-3">
            CORE TECHNOLOGIES
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <span key={t} className="px-3 py-1 rounded border border-white/10 bg-white/5 text-xs font-mono-code text-white">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer / Actions */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <span className="font-mono-code text-xs text-[#A1A1AA]">
            Sourced directly from verified project documentation
          </span>

          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playClick?.()}
              onMouseEnter={playHover}
              data-cursor="pointer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#FF365E] bg-[#FF365E]/10 text-white font-mono-code text-xs tracking-wider uppercase hover:bg-[#FF365E] transition-all"
            >
              <span>GITHUB PROFILE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => {
                playClick?.();
                onClose();
              }}
              className="px-5 py-2.5 rounded-lg border border-white/20 text-white font-mono-code text-xs tracking-wider uppercase hover:border-white/50 transition-colors"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
