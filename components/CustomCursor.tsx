'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const dot  = dotRef.current;
    if (!ring || !dot) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX, ringY = mouseY;

    // Smooth ring follow
    let rafId: number;
    const tick = () => {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      gsap.set(ring, { x: ringX - 20, y: ringY - 20 });
      gsap.set(dot,  { x: mouseX - 3, y: mouseY - 3 });
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onEnterLink = () => {
      gsap.to(ring, { scale: 1.8, borderColor: 'rgba(0,255,136,0.9)', duration: 0.3, ease: 'power2.out' });
      gsap.to(dot,  { scale: 0, duration: 0.2 });
    };
    const onLeaveLink = () => {
      gsap.to(ring, { scale: 1, borderColor: 'rgba(0,255,136,0.45)', duration: 0.3, ease: 'power2.out' });
      gsap.to(dot,  { scale: 1, duration: 0.2 });
    };

    const addHoverListeners = () => {
      document.querySelectorAll('a,button,[data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', onEnterLink);
        el.addEventListener('mouseleave', onLeaveLink);
      });
    };
    
    addHoverListeners();
    const obs = new MutationObserver(addHoverListeners);
    obs.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', onMove);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed z-[9999] pointer-events-none hidden md:block"
        style={{
          width: 40, height: 40,
          borderRadius: '50%',
          border: '1px solid rgba(0,255,136,0.45)',
          boxShadow: '0 0 12px rgba(0,255,136,0.2)',
          top: 0, left: 0,
          willChange: 'transform',
        }}
      />
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed z-[9999] pointer-events-none hidden md:block"
        style={{
          width: 6, height: 6,
          borderRadius: '50%',
          background: '#00ff88',
          top: 0, left: 0,
          boxShadow: '0 0 8px rgba(0,255,136,0.8)',
          willChange: 'transform',
        }}
      />
    </>
  );
}