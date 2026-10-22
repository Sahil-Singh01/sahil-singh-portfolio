import React, { useState } from 'react';
import { X, Download, FileText, ExternalLink, Printer, Check, Eye } from 'lucide-react';
import { personalInfo, experience, education, certifications, projects, userSocialProfiles } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose, playClick, playHover }) {
  const [viewMode, setViewMode] = useState('pdf'); // 'pdf' | 'text'

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-6 bg-[#080809]/95 backdrop-blur-2xl overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          playClick?.();
          onClose();
        }
      }}
    >
      <div 
        className="relative w-full max-w-4xl bg-[#121214] border border-white/10 rounded-2xl p-5 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.9)] my-auto max-h-[94vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-[#FF365E]/10 border border-[#FF365E]/30">
              <FileText className="w-5 h-5 text-[#FF365E]" />
            </div>
            <div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                Sahil Singh — Curriculum Vitae
              </h3>
              <p className="font-mono-code text-xs text-[#A1A1AA]">
                DATA ANALYST | BUSINESS ANALYST
              </p>
            </div>
          </div>

          {/* Action Buttons: View, Download & Close */}
          <div className="flex items-center gap-2.5">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5 text-xs font-mono-code">
              <button
                onClick={() => setViewMode('pdf')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  viewMode === 'pdf' ? 'bg-[#FF365E] text-white font-bold' : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                PDF VIEW
              </button>
              <button
                onClick={() => setViewMode('text')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  viewMode === 'text' ? 'bg-[#FF365E] text-white font-bold' : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                READABLE
              </button>
            </div>

            {/* Open in New Tab */}
            <a
              href={userSocialProfiles.resumePdfPath}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              title="Open PDF in new tab"
              data-cursor="pointer"
              className="p-2 rounded-lg border border-white/10 text-white/80 hover:text-white hover:border-[#FF365E] hover:bg-[#FF365E]/10 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Download PDF Action */}
            <a
              href={userSocialProfiles.resumePdfPath}
              download="Sahil_Singh_Resume.pdf"
              onMouseEnter={playHover}
              title="Download Resume PDF"
              data-cursor="pointer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white text-[#080809] hover:bg-[#FF365E] hover:text-white font-mono-code text-xs font-bold transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,54,94,0.4)]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD PDF</span>
            </a>

            {/* Close Button */}
            <button
              onClick={() => {
                playClick?.();
                onClose();
              }}
              onMouseEnter={playHover}
              data-cursor="pointer"
              className="p-2 rounded-lg border border-white/10 text-white/70 hover:text-white hover:border-[#FF365E] transition-colors"
              aria-label="Close Resume Modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Main Content Container */}
        <div className="flex-1 overflow-y-auto pr-1">
          {viewMode === 'pdf' ? (
            /* Embedded Native PDF Viewer */
            <div className="w-full h-[68vh] rounded-xl overflow-hidden border border-white/10 bg-[#1c1c20] relative">
              <iframe
                src={`${userSocialProfiles.resumePdfPath}#toolbar=1&navpanes=0`}
                className="w-full h-full rounded-xl border-none"
                title="Sahil Singh Resume Document"
              />
              <div className="sm:hidden absolute bottom-3 left-1/2 -translate-x-1/2 bg-[#080809]/90 border border-white/10 px-4 py-2 rounded-full text-xs font-mono-code text-center">
                <a 
                  href={userSocialProfiles.resumePdfPath}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#FF365E] underline"
                >
                  Open PDF in browser window
                </a>
              </div>
            </div>
          ) : (
            /* Structured Readable View Corresponding 100% to Resume */
            <div className="p-6 rounded-xl border border-white/5 bg-[#080809] flex flex-col gap-8 text-[#F5F5F5]">
              {/* Header Profile */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <h1 className="font-display text-3xl font-extrabold text-white">
                    SAHIL SINGH
                  </h1>
                  <p className="font-mono-code text-xs text-[#FF365E] tracking-wider uppercase mt-1">
                    Data Analyst | Business Analyst | SQL, Python, Power BI, Tableau, Excel
                  </p>
                </div>
                <div className="font-mono-code text-xs text-[#A1A1AA] flex flex-col items-start sm:items-end gap-1">
                  <span>Delhi, India · +91 9667428133</span>
                  <a 
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=sahilsingh.data@gmail.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[#FF365E] hover:underline"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              {/* Professional Summary */}
              <div>
                <h4 className="font-mono-code text-xs tracking-widest text-[#FF365E] uppercase mb-2">
                  PROFESSIONAL SUMMARY
                </h4>
                <p className="font-body text-sm text-[#F5F5F5] leading-relaxed">
                  {personalInfo.summary}
                </p>
              </div>

              {/* Core Skills */}
              <div>
                <h4 className="font-mono-code text-xs tracking-widest text-[#FF365E] uppercase mb-3">
                  CORE SKILLS
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono-code">
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-white font-bold block mb-1">Languages & Analysis:</span>
                    <span className="text-[#A1A1AA]">Python (Pandas, NumPy, Matplotlib, Seaborn, SciPy, scikit-learn), SQL (MySQL, CTEs, Window Functions, Subqueries, Joins, Views)</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-white font-bold block mb-1">BI & Reporting:</span>
                    <span className="text-[#A1A1AA]">Power BI (DAX, Data Modelling, Power Query), Tableau, Advanced Excel (Pivot Tables, XLOOKUP, SUMIFS, Macros), KPI Dashboards</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-white font-bold block mb-1">Analytics & Statistics:</span>
                    <span className="text-[#A1A1AA]">EDA, Hypothesis Testing (t-test, Chi-Square), A/B Testing, Logistic Regression, Random Forest, K-Means Segmentation</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="text-white font-bold block mb-1">Data Engineering & Tools:</span>
                    <span className="text-[#A1A1AA]">ETL Pipelines, 3NF Database Design, Data Validation, Git, GitHub, Jupyter, Streamlit, RAG, Generative AI</span>
                  </div>
                </div>
              </div>

              {/* Projects */}
              <div>
                <h4 className="font-mono-code text-xs tracking-widest text-[#FF365E] uppercase mb-3">
                  FEATURED PROJECTS
                </h4>
                <div className="flex flex-col gap-4">
                  {projects.map((p) => (
                    <div key={p.id} className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                        <span className="font-display font-bold text-white text-base">
                          {p.name}
                        </span>
                        <span className="font-mono-code text-xs text-[#FF365E]">
                          {p.technologies.slice(0, 4).join(', ')}
                        </span>
                      </div>
                      <p className="font-body text-xs text-[#A1A1AA] leading-relaxed mb-3">
                        {p.description}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {p.metrics.map((m, mi) => (
                          <span key={mi} className="font-mono-code text-[11px] text-white/80 bg-white/5 px-2.5 py-1 rounded">
                            {m.label}: <strong className="text-white">{m.value}</strong>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Work Experience */}
              <div>
                <h4 className="font-mono-code text-xs tracking-widest text-[#FF365E] uppercase mb-3">
                  WORK EXPERIENCE
                </h4>
                {experience.map((exp) => (
                  <div key={exp.id} className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                      <span className="font-display font-bold text-white text-base">
                        {exp.role} — {exp.organization}
                      </span>
                      <span className="font-mono-code text-xs text-[#A1A1AA]">
                        {exp.period}
                      </span>
                    </div>
                    <p className="font-body text-xs text-[#A1A1AA] leading-relaxed mb-2">
                      {exp.summary}
                    </p>
                    {exp.responsibilities && (
                      <ul className="text-xs text-[#A1A1AA] space-y-1 list-disc list-inside">
                        {exp.responsibilities.map((r, ri) => (
                          <li key={ri}>{r}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              {/* Education & Certifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                  <h5 className="font-mono-code text-xs text-[#FF365E] uppercase mb-1">EDUCATION</h5>
                  <p className="font-display font-bold text-sm text-white">{education.degree}</p>
                  <p className="font-body text-xs text-[#A1A1AA]">{education.institution} ({education.period})</p>
                </div>
                <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                  <h5 className="font-mono-code text-xs text-[#FF365E] uppercase mb-2">CERTIFICATIONS</h5>
                  <ul className="text-xs text-[#A1A1AA] space-y-1 list-disc list-inside">
                    {certifications.map((c, i) => (
                      <li key={i}>{c.name} ({c.issuer})</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
