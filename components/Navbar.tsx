'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const NAV_ITEMS = [
  { id: 'hero',       label: 'Home',      icon: '' },
  { id: 'about',      label: 'About',     icon: '' },
  { id: 'skills',     label: 'Skills',    icon: '' },
  { id: 'experience', label: 'Experience', icon: '' },
  { id: 'projects',   label: 'Projects',  icon: '' },
  { id: 'research',   label: 'Research',  icon: '' },
   { id: 'gallery',   label: 'Gallery',  icon: '' },
  { id: 'contact',    label: 'Contact',    icon: '' },
];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

export default function Navbar({ active }: { active: string }) {
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const navInnerRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(navRef.current, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 });
  }, []);

  useEffect(() => {
    const updateIndicator = () => {
      const btn = btnRefs.current[active];
      const indicator = indicatorRef.current;
      const navInner = navInnerRef.current;
      if (!btn || !indicator || !navInner) return;
      
      const navInnerRect = navInner.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();

      gsap.to(indicator, {
        x: btnRect.left - navInnerRect.left,
        width: btnRect.width,
        duration: 0.4,
        ease: 'power3.out',
      });
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [active]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[100] transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(1,6,3,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,255,136,0.1)' : '1px solid transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
        <button onClick={() => scrollTo('hero')} className="font-mono font-black text-sm flex items-center gap-2" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <div className="w-8 h-8 flex items-center justify-center text-xs rounded border border-emerald-500/30 bg-emerald-900/10 text-emerald-500">RK</div>
          <span className="text-emerald-500">RUPESH</span>
          <span className="text-emerald-500/30">://</span>
          <span className="text-white/60">BREACH</span>
        </button>

        <div ref={navInnerRef} className="hidden md:flex items-center relative h-full">
          <div
            ref={indicatorRef}
            className="absolute bottom-0 rounded transition-colors duration-300"
            style={{
              background: 'rgba(0,255,136,0.08)', // Soft green tint
              top: '12px',      // Moves the box away from the very bottom
              bottom: '12px',   // Creates the box shape
              zIndex: 0,
            }}
          />
          {NAV_ITEMS.map(({ id, label, icon }) => (
            <button
              key={id}
              ref={el => { btnRefs.current[id] = el; }}
              onClick={() => scrollTo(id)}
              className="relative z-10 font-mono text-xs px-4 py-2 uppercase tracking-widest flex items-center gap-1.5"
              style={{ color: active === id ? '#00ff88' : 'rgba(0,255,136,0.4)' }}
            >
              <span>{icon}</span>{label}
            </button>
          ))}
          
          <div className="flex items-center gap-2 font-mono text-xs ml-6" style={{ color: 'rgba(0,255,136,0.45)' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-[#00ff88] shadow-[0_0_6px_#00ff88] animate-pulse" />
            <span>ONLINE</span>
          </div>
        </div>
      </div>
    </nav>
  );
}