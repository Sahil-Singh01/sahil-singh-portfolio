import React, { useEffect, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { avatarConfig } from '../data/avatarConfig';

export default function CinematicLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('counting'); // 'counting' | 'avatar' | 'exit'
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete?.();
      return;
    }

    // Step 1: Smooth, rapid progress counter ~1.1s
    const startTime = performance.now();
    const duration = 1100;

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const currentProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        // Step 2: Show avatar head subtly in center
        setStage('avatar');

        // Step 3: Transition out and reveal hero
        const timer1 = setTimeout(() => {
          setStage('exit');
        }, 850);

        const timer2 = setTimeout(() => {
          onComplete?.();
        }, 1350);

        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
        };
      }
    }, 24);

    return () => clearInterval(interval);
  }, [prefersReducedMotion, onComplete]);

  // Click to skip if user clicks anywhere
  const handleSkip = () => {
    setStage('exit');
    setTimeout(() => onComplete?.(), 200);
  };

  if (stage === 'exit') {
    return (
      <div 
        className="fixed inset-0 z-[1000] bg-[#060608] pointer-events-none transition-opacity duration-700 ease-out opacity-0"
      />
    );
  }

  return (
    <div 
      onClick={handleSkip}
      className="fixed inset-0 z-[1000] bg-[#060608] flex flex-col items-center justify-center select-none cursor-pointer overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-[#ff2a4b]/8 blur-[120px] pointer-events-none" />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Step 1: Header typography & progress */}
        <div className={`transition-all duration-500 flex flex-col items-center ${
          stage === 'avatar' ? 'opacity-30 -translate-y-4' : 'opacity-100'
        }`}>
          <span className="font-mono-code text-[11px] tracking-[0.3em] uppercase text-[#ff4d68] mb-3">
            PORTFOLIO
          </span>
          <h1 className="font-display text-2xl md:text-3xl tracking-[0.25em] text-white font-bold mb-1">
            SAHIL SINGH
          </h1>
          <p className="font-mono-code text-xs tracking-[0.25em] text-[#8e8e99] uppercase">
            DATA ANALYST
          </p>

          {/* Minimal progress line */}
          <div className="w-48 h-[1px] bg-white/10 mt-8 relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-[#ff2a4b] transition-all duration-75 ease-out shadow-[0_0_10px_#ff2a4b]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="font-mono-code text-[10px] tracking-widest text-[#666672] mt-3">
            {progress.toString().padStart(3, '0')} / 100
          </div>
        </div>

        {/* Step 2: Avatar head reveal */}
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all duration-700 ease-out pointer-events-none ${
            stage === 'avatar'
              ? 'opacity-100 scale-100 translate-y-[-50%]'
              : 'opacity-0 scale-85 translate-y-[-45%]'
          }`}
        >
          {/* Subtle crimson halo */}
          <div className="absolute inset-0 rounded-full bg-[#ff2a4b]/20 blur-3xl scale-95" />

          {/* Head-only Avatar */}
          <img
            src={avatarConfig.defaultPose.src}
            alt="Sahil Singh Avatar"
            className="w-44 h-44 md:w-52 md:h-52 object-contain relative z-10 filter drop-shadow-[0_10px_30px_rgba(255,42,75,0.35)]"
          />
        </div>
      </div>

      {/* Skip cue */}
      <div className="absolute bottom-8 font-mono-code text-[10px] text-white/30 tracking-widest uppercase">
        CLICK ANYWHERE TO SKIP
      </div>
    </div>
  );
}
