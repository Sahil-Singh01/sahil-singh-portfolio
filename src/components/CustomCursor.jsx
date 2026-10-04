import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const wrapperRef = useRef(null);
  const ringRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Disable on touch / coarse pointer devices or if reduced motion preferred
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    const dot = dotRef.current;
    const wrapper = wrapperRef.current;
    const ring = ringRef.current;
    const textEl = textRef.current;
    if (!dot || !wrapper || !ring) return;

    document.body.classList.add('custom-cursor-active');

    let mouseX = -100;
    let mouseY = -100;
    let dotX = -100;
    let dotY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;
    let animId = null;
    let currentMode = 'default';

    const applyMode = (mode, customText = '') => {
      if (currentMode === mode && (!customText || textEl.textContent === customText)) return;
      currentMode = mode;

      if (mode === 'project') {
        dot.style.opacity = '0';
        ring.className = 'pointer-events-none translate-x-3.5 translate-y-3.5 px-3.5 py-1.5 rounded-full bg-[#121214]/95 border border-[#FF365E] shadow-[0_0_20px_rgba(255,54,94,0.35)] backdrop-blur-sm flex items-center gap-1.5 select-none whitespace-nowrap transition-all duration-200';
        if (textEl) {
          textEl.textContent = customText || 'VIEW PROJECT →';
          textEl.style.display = 'inline-block';
        }
      } else if (mode === 'clickable') {
        dot.style.opacity = '1';
        ring.className = 'pointer-events-none w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#FF365E]/70 bg-[#FF365E]/15 shadow-[0_0_12px_rgba(255,54,94,0.25)] flex items-center justify-center transition-all duration-200';
        if (textEl) textEl.style.display = 'none';
      } else {
        dot.style.opacity = '1';
        ring.className = 'pointer-events-none w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#FF365E]/30 bg-transparent flex items-center justify-center transition-all duration-200';
        if (textEl) textEl.style.display = 'none';
      }
    };

    const updateHoverTarget = (target) => {
      if (!target || !(target instanceof Element)) {
        applyMode('default');
        return;
      }

      // Check if inside a project card
      const projectEl = target.closest('[data-cursor="project"]');
      if (projectEl) {
        // If directly hovering over a separate external link (e.g. GitHub link), show clickable
        const isExternalBtn = target.closest('a[target="_blank"]');
        if (isExternalBtn) {
          applyMode('clickable');
        } else {
          const text = projectEl.getAttribute('data-cursor-text') || 'VIEW PROJECT →';
          applyMode('project', text);
        }
        return;
      }

      // Check if standard clickable target
      const isClickable = target.closest('a, button, [role="button"], input, select, textarea, [data-cursor="pointer"], [data-cursor="magnetic"]');
      if (isClickable) {
        applyMode('clickable');
        return;
      }

      applyMode('default');
    };

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = currentMode === 'project' ? '0' : '1';
        wrapper.style.opacity = '1';
      }
    };

    const onMouseOver = (e) => {
      updateHoverTarget(e.target);
    };

    const onMouseLeave = () => {
      isVisible = false;
      dot.style.opacity = '0';
      wrapper.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible = true;
      dot.style.opacity = currentMode === 'project' ? '0' : '1';
      wrapper.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // High performance RAF Loop
    const loop = () => {
      dotX += (mouseX - dotX) * 0.6;
      dotY += (mouseY - dotY) * 0.6;

      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;

      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
      wrapper.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* Central precise dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -ml-1 -mt-1 w-2 h-2 rounded-full bg-white opacity-0 shadow-[0_0_8px_#FF365E] will-change-transform transition-[opacity] duration-150"
      />

      {/* Outer Interpolated Ring / Contextual Badge Wrapper */}
      <div
        ref={wrapperRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-0 h-0 opacity-0 will-change-transform"
      >
        <div
          ref={ringRef}
          className="w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#FF365E]/30 bg-transparent flex items-center justify-center transition-all duration-200"
        >
          <span
            ref={textRef}
            style={{ display: 'none' }}
            className="font-mono-code text-[11px] font-bold text-white tracking-wider whitespace-nowrap select-none"
          />
        </div>
      </div>
    </>
  );
}
