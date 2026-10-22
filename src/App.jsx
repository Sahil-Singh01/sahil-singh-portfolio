import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhoIAm from './components/WhoIAm';
import WhatCanIDo from './components/WhatCanIDo';
import RecentWork from './components/RecentWork';
import Experience from './components/Experience';
import TechMarquee from './components/TechMarquee';
import DigitalGlobe from './components/DigitalGlobe';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import CinematicLoader from './components/CinematicLoader';
import ResumeModal from './components/ResumeModal';
import ScrollProgress from './components/ScrollProgress';
import { useLenis } from './hooks/useLenis';
import { useAudioCue } from './hooks/useAudioCue';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [resumeOpen, setResumeOpen] = useState(false);

  // Initialize native responsive scroll with ScrollTrigger sync
  useLenis();

  // Web Audio subtle UI synthesizer
  const { soundEnabled, toggleSound, playHover, playClick } = useAudioCue();

  return (
    <div className="relative min-h-screen bg-[#080809] text-[#F5F5F5] overflow-x-hidden selection:bg-[#FF365E] selection:text-white">
      {/* 1. Cinematic Initial Loading Sequence */}
      {loading && (
        <CinematicLoader onComplete={() => setLoading(false)} />
      )}

      {/* 2. Custom Glowing Desktop Cursor */}
      <CustomCursor />

      {/* 3. Minimal Desktop Vertical Scroll Progress Indicator */}
      <ScrollProgress />

      {/* 4. Luxury Navigation Bar */}
      <Navbar 
        onOpenResume={() => setResumeOpen(true)}
        soundEnabled={soundEnabled}
        toggleSound={toggleSound}
        playHover={playHover}
        playClick={playClick}
      />

      {/* Main Portfolio Sections */}
      <main className="relative z-10 flex flex-col">
        {/* Section 01: Hero with Head-only Avatar */}
        <Hero 
          onOpenResume={() => setResumeOpen(true)}
          playHover={playHover}
          playClick={playClick}
        />

        {/* Section 02: Who I Am (Redesigned Editorial & 8 Capability Cards) */}
        <WhoIAm 
          playHover={playHover}
        />

        {/* Section 03: What Can I Do? (Streamlined 4 Analytical Domains) */}
        <WhatCanIDo 
          playHover={playHover}
          playClick={playClick}
        />

        {/* Section 04: Selected Projects (3 Verified Case Studies) */}
        <RecentWork 
          playHover={playHover}
          playClick={playClick}
        />

        {/* Section 05: Experience & Credentials (Image Retouch India LLP) */}
        <Experience 
          playHover={playHover}
        />

        {/* Technical Toolkit Marquee */}
        <TechMarquee 
          playHover={playHover}
        />

        {/* Section 06: Social & Digital Globe (Real Verified Profiles) */}
        <DigitalGlobe 
          onOpenResume={() => setResumeOpen(true)}
          playHover={playHover}
          playClick={playClick}
        />

        {/* Section 07: Final Contact Call-to-Action */}
        <ContactCTA 
          playHover={playHover}
          playClick={playClick}
        />
      </main>

      {/* Editorial Footer */}
      <Footer 
        playHover={playHover}
        playClick={playClick}
      />

      {/* Real Resume Modal with In-Browser PDF & Download */}
      <ResumeModal 
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        playHover={playHover}
        playClick={playClick}
      />
    </div>
  );
}
