import React, { useRef, useState, useEffect } from 'react';
import { avatarConfig } from '../data/avatarConfig';

export default function AvatarHead({ 
  className = "", 
  size = "default", // 'sm' | 'default' | 'lg' | 'hero'
  enableTilt = true,
  glowIntensity = "medium",
  poseId = "primary-neutral",
  imgRef = null
}) {
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [imgError, setImgError] = useState(false);

  // Active pose from config or fallback
  const pose = avatarConfig.alternativePoses.find(p => p.id === poseId) || avatarConfig.defaultPose;

  useEffect(() => {
    if (!enableTilt) return;

    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const normX = (e.clientX - centerX) / (window.innerWidth / 2);
      const normY = (e.clientY - centerY) / (window.innerHeight / 2);

      const maxTilt = avatarConfig.parallax.maxTiltDegrees || 10;
      setTilt({
        x: Math.max(-maxTilt, Math.min(maxTilt, -normY * maxTilt)),
        y: Math.max(-maxTilt, Math.min(maxTilt, normX * maxTilt))
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [enableTilt]);

  const sizeClasses = {
    sm: "w-28 h-28 md:w-36 md:h-36",
    default: "w-44 h-44 md:w-60 md:h-60",
    lg: "w-64 h-64 md:w-80 md:h-80",
    hero: "w-72 h-72 sm:w-88 sm:h-88 md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[480px]"
  }[size] || "w-60 h-60";

  const glowOpacity = {
    low: "opacity-25",
    medium: "opacity-45",
    high: "opacity-75"
  }[glowIntensity] || "opacity-45";

  return (
    <div 
      ref={containerRef}
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ perspective: 1000 }}
    >
      {/* Layer 1: Ambient deep red background glow */}
      <div 
        className={`absolute -inset-10 rounded-full bg-[#ff2a4b] blur-[90px] pointer-events-none transition-opacity duration-700 ${glowOpacity}`} 
      />

      {/* Layer 2: Subtle secondary directional crimson rim */}
      <div 
        className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[#e60028]/25 via-transparent to-white/10 blur-[50px] pointer-events-none" 
      />

      {/* Layer 3: Subtle rotating technical coordinate ring */}
      <div className="absolute -inset-8 border border-[#ff2a4b]/15 rounded-full pointer-events-none animate-[spin_60s_linear_infinite] [mask-image:radial-gradient(ellipse_at_center,transparent_45%,black_75%)]" />

      {/* Layer 4: Head-only Avatar Image with 3D tilt & smooth float */}
      <div
        className="relative z-10 transition-transform duration-300 ease-out will-change-transform"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        <img
          ref={imgRef}
          src={imgError ? pose.fallbackSrc : pose.src}
          onError={() => setImgError(true)}
          alt={pose.alt}
          className={`${sizeClasses} object-contain filter drop-shadow-[0_15px_35px_rgba(255,42,75,0.3)] transition-all duration-500 hover:drop-shadow-[0_20px_45px_rgba(255,42,75,0.5)]`}
          loading="eager"
          decoding="async"
        />
      </div>
    </div>
  );
}
