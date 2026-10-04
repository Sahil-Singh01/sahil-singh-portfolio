import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Native Responsive Scroll Hook
 * Preserves 100% native browser physics, instant trackpad/wheel response,
 * and eliminates wheel hijacking while keeping GSAP ScrollTrigger in perfect sync.
 */
export function useLenis() {
  useEffect(() => {
    // Enable native smooth scrolling on html
    document.documentElement.style.scrollBehavior = 'smooth';

    const handleScroll = () => {
      ScrollTrigger.update();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
}
