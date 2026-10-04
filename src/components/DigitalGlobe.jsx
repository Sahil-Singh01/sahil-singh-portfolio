import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { socialStages, userSocialProfiles } from '../data/portfolioData';
import { ArrowUpRight, Check, Globe, Mail, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

const LinkedinIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.91 0-1.64.73-1.64 1.64s.73 1.64 1.64 1.64 1.64-.73 1.64-1.64-.73-1.64-1.64-1.64Z"/>
  </svg>
);

const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

export default function DigitalGlobe({ onOpenResume, playHover, playClick }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const globeRotationTarget = useRef({ x: 0.15, y: 0 });
  const isVisibleRef = useRef(true);

  // Scroll tracking: strictly rotates globe through 4 stages
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
          if (containerHeight <= 0) return;

          const progress = Math.max(0, Math.min(1, -rect.top / containerHeight));
          const stageIdx = Math.min(
            socialStages.length - 1,
            Math.floor(progress * socialStages.length)
          );

          setActiveStageIndex(stageIdx);
          if (!isDragging.current) {
            globeRotationTarget.current.y = progress * Math.PI * 2.0;
            globeRotationTarget.current.x = 0.15 + Math.sin(progress * Math.PI) * 0.18;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Three.js Globe Setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 210;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const group = new THREE.Group();
    scene.add(group);

    // Globe Core with refined radius (reduced ~14% for optimal framing)
    const globeRadius = 67;
    const particleCount = 1800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color('#ffffff');
    const color2 = new THREE.Color('#FF365E');

    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount);
      const theta = Math.sqrt(particleCount * Math.PI) * phi;

      const x = globeRadius * Math.cos(theta) * Math.sin(phi);
      const y = globeRadius * Math.sin(theta) * Math.sin(phi);
      const z = globeRadius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const isCrimson = Math.random() < 0.18;
      const c = isCrimson ? color2 : color1;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.8,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });

    const particles = new THREE.Points(geometry, material);
    group.add(particles);

    // Subtle equatorial rings
    const ringGeo = new THREE.RingGeometry(globeRadius * 1.15, globeRadius * 1.16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xFF365E,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.22,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.2;
    group.add(ringMesh);

    // Drag interaction handlers
    const onMouseDown = (e) => {
      isDragging.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      globeRotationTarget.current.y += deltaX * 0.006;
      globeRotationTarget.current.x += deltaY * 0.006;

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging.current = false;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Responsive resize
    const handleResize = () => {
      if (!canvas) return;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // RAF Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (isVisibleRef.current) {
        group.rotation.y += (globeRotationTarget.current.y - group.rotation.y) * 0.08;
        group.rotation.x += (globeRotationTarget.current.x - group.rotation.x) * 0.08;
        renderer.render(scene, camera);
      }
    };
    animate();

    // IntersectionObserver to pause loop when offscreen
    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  const currentStage = socialStages[activeStageIndex] || socialStages[0];

  const handleStageSelect = (idx) => {
    playClick?.();
    setActiveStageIndex(idx);
    globeRotationTarget.current.y = (idx / socialStages.length) * Math.PI * 2;
  };

  const handleStageAction = (stage) => {
    playClick?.();
    if (stage.id === 'resume') {
      onOpenResume?.();
    } else if (stage.id === 'email') {
      window.open(userSocialProfiles.gmailComposeUrl, '_blank', 'noopener,noreferrer');
      setCopied(true);
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FF365E', '#ffffff', '#ff6b81']
      });
      setTimeout(() => setCopied(false), 2500);
    } else {
      const url = stage.getUrl ? stage.getUrl() : '#';
      if (url && url !== '#') {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    }
  };

  const stageIcons = {
    linkedin: LinkedinIcon,
    github: GithubIcon,
    email: Mail,
    resume: FileText
  };

  const ActiveIcon = stageIcons[currentStage.id] || Globe;

  return (
    <section 
      ref={containerRef}
      id="connect"
      className="relative h-[120vh] lg:h-[130vh] border-t border-white/5"
    >
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen flex flex-col justify-between py-6 md:py-8 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-2.5 font-mono-code text-[11px] tracking-widest uppercase text-[#A1A1AA]">
          <div className="flex items-center gap-2">
            <span className="text-[#FF365E] font-bold">05</span>
            <span className="text-white/30">//</span>
            <span className="text-white">LET'S CONNECT</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#FF365E]">CONNECT:</span>
            <span className="text-white font-bold">{currentStage.stage} / 04</span>
          </div>
        </div>

        {/* Center Content: Digital Globe + Focused Contact Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
          {/* Left Column: 3D Earth Globe (7 cols) */}
          <div className="lg:col-span-7 relative flex items-center justify-center h-[300px] sm:h-[360px] md:h-[400px] lg:h-[420px]">
            {/* Ambient crimson back-lighting */}
            <div className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-[#FF365E]/10 blur-[90px] pointer-events-none" />

            <canvas 
              ref={canvasRef} 
              className="w-full h-full cursor-grab active:cursor-grabbing"
              title="Interactive Digital Globe (Drag to rotate)"
            />
          </div>

          {/* Right Column: Active Social Stage Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="p-7 sm:p-9 md:p-10 rounded-2xl border border-white/10 bg-[#121214] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden transition-all duration-300">
              {/* Crimson Accent */}
              <div className="absolute top-0 right-0 w-24 h-[2px] bg-[#FF365E]" />

              <div className="flex items-center justify-between mb-3">
                <span className="font-mono-code text-xs text-[#FF365E] font-bold tracking-widest uppercase">
                  CONNECT // {currentStage.label}
                </span>
                <ActiveIcon className="w-5 h-5 text-white/50" />
              </div>

              <h3 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
                {currentStage.label}
              </h3>

              <p className="font-heading text-sm sm:text-base text-[#A1A1AA] mb-6">
                {currentStage.sublabel}
              </p>

              {/* Action Button: Opens actual destination */}
              <button
                onClick={() => handleStageAction(currentStage)}
                onMouseEnter={playHover}
                data-cursor="pointer"
                className="w-full py-4 px-6 rounded-xl bg-white text-[#080809] hover:bg-[#FF365E] hover:text-white font-mono-code text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,54,94,0.45)] flex items-center justify-between group"
              >
                <span>
                  {currentStage.id === 'email' && copied
                    ? 'COPIED & OPENED MAILTO!'
                    : currentStage.action}
                </span>
                {currentStage.id === 'email' && copied ? (
                  <Check className="w-4 h-4 text-white" />
                ) : (
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                )}
              </button>

              {/* Quick stage selector pills */}
              <div className="grid grid-cols-4 gap-2 pt-5 mt-5 border-t border-white/10">
                {socialStages.map((stage, idx) => {
                  const isActive = activeStageIndex === idx;
                  return (
                    <button
                      key={stage.id}
                      onClick={() => handleStageSelect(idx)}
                      onMouseEnter={playHover}
                      data-cursor="pointer"
                      className={`py-2 rounded font-mono-code text-[11px] tracking-wider uppercase transition-all ${
                        isActive 
                          ? 'border border-[#FF365E] bg-[#FF365E]/20 text-white font-bold'
                          : 'border border-white/5 bg-white/[0.02] text-[#A1A1AA] hover:text-white'
                      }`}
                    >
                      {stage.id}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Alternative Direct Access: All 4 Links Immediately Clickable */}
            <div className="mt-4 p-3.5 rounded-xl border border-white/5 bg-white/[0.015] flex items-center justify-between text-xs font-mono-code">
              <span className="text-white/40">DIRECT LINKS:</span>
              <div className="flex items-center gap-3">
                <a
                  href={userSocialProfiles.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A1A1AA] hover:text-[#FF365E] transition-colors"
                  title="Open LinkedIn Profile"
                >
                  LinkedIn
                </a>
                <span className="text-white/20">·</span>
                <a
                  href={userSocialProfiles.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A1A1AA] hover:text-[#FF365E] transition-colors"
                  title="Open GitHub Profile"
                >
                  GitHub
                </a>
                <span className="text-white/20">·</span>
                <a
                  href={userSocialProfiles.gmailComposeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A1A1AA] hover:text-[#FF365E] transition-colors"
                  title="Compose Email in Gmail"
                >
                  Email
                </a>
                <span className="text-white/20">·</span>
                <button
                  onClick={onOpenResume}
                  className="text-[#A1A1AA] hover:text-[#FF365E] transition-colors"
                >
                  Resume
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section Footer */}
        <div className="flex items-center justify-between border-t border-white/5 pt-3 font-mono-code text-[11px] text-[#A1A1AA] tracking-widest uppercase">
          <span>CONNECT WITH SAHIL SINGH</span>
          <span className="text-[#FF365E]">0{activeStageIndex + 1} / 04</span>
        </div>
      </div>
    </section>
  );
}
