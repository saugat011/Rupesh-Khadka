'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import Canvas3D from './Canvas3D';
import { personalInfo, stats } from '../lib/data';

function useTypewriter(text: string, speed = 60, startDelay = 0) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone]           = useState(false);
  useEffect(() => {
    let i = 0;
    const to = setTimeout(() => {
      const id = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(id); setDone(true); }
      }, speed);
      return () => clearInterval(id);
    }, startDelay);
    return () => clearTimeout(to);
  }, [text, speed, startDelay]);
  return { displayed, done };
}

const ROLES = [
  'Cybersecurity Researcher',
  'Malware Analyst',
  'ML Engineer',
  'Penetration Tester',
  'CTF Competitor',
];

export default function HeroSection() {
  const { displayed: nameTyped, done: nameDone } = useTypewriter('RUPESH KHADKA', 75);
  const [roleIdx, setRoleIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const glitchRef  = useRef<HTMLHeadingElement>(null);

  // Role cycling
  useEffect(() => {
    if (!nameDone) return;
    const id = setInterval(() => setRoleIdx(i => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(id);
  }, [nameDone]);

  // Glitch animation
  useEffect(() => {
    if (!glitchRef.current || !nameDone) return;
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 5 });
    tl.to(glitchRef.current, { skewX: 6, duration: 0.05 })
      .to(glitchRef.current, { skewX: -4, duration: 0.05 })
      .to(glitchRef.current, { skewX: 0, duration: 0.05 })
      .to(glitchRef.current, { x: 4, duration: 0.05 })
      .to(glitchRef.current, { x: -4, duration: 0.05 })
      .to(glitchRef.current, { x: 0, duration: 0.05 });
    return () => { tl.kill(); };
  }, [nameDone]);

  // FIX: Exclude the h1 (name) from GSAP fade-in so it's always visible.
  // Animate only the sibling elements below it, never the name itself.
  useEffect(() => {
    gsap.from('.hero-content-animate', {
      opacity: 0, y: 40,
      duration: 0.6, ease: 'power2.out',
      stagger: 0.07,
    });
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg,#010603 0%,#020a06 60%,#010808 100%)' }}
    >
      <Canvas3D />

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 55% at 50% 50%,rgba(0,255,136,0.055) 0%,transparent 70%)',
      }} />

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(0,255,136,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,136,0.025) 1px,transparent 1px)',
        backgroundSize: '70px 70px',
        maskImage: 'radial-gradient(ellipse at center,black 30%,transparent 80%)',
      }} />

      {/* Scan line */}
      <div
        className="absolute left-0 right-0 pointer-events-none"
        style={{
          height: 2,
          background: 'linear-gradient(90deg,transparent,rgba(0,255,136,0.25),transparent)',
          animation: 'scanLine 6s linear infinite',
        }}
      />

      <div className="hero-content relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">

        {/* Identity badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex items-center gap-3 mb-8 font-mono text-xs tracking-[0.5em]"
          style={{ color: 'rgba(0,255,136,0.5)' }}
        >
          <div className="h-px w-14" style={{ background: 'linear-gradient(90deg,transparent,#00ff88)' }} />
          <span>OPERATOR IDENTITY CONFIRMED</span>
          <div className="h-px w-14" style={{ background: 'linear-gradient(90deg,#00ff88,transparent)' }} />
        </motion.div>

        {/*
          ─── NAME ───────────────────────────────────────────────────────
          KEY FIX: The name h1 is NOT included in the GSAP `.hero-content > *`
          selector (we changed the children to use .hero-content-animate).
          The h1 is always fully visible; only the typewriter controls what
          text is shown. The `!important`-equivalent inline styles guarantee
          no parent class (text-[#00ff88]) or GSAP opacity override wins.
        */}
        <h1
          ref={glitchRef}
          className="font-mono font-black leading-none mb-4 relative"
          style={{
            fontSize: 'clamp(36px,8vw,100px)',
            letterSpacing: '-0.02em',
            color: '#ffffff',
            textShadow: '0 0 15px rgba(0,255,136,0.8), 0 0 30px rgba(0,255,136,0.4)',
            // Force full visibility — GSAP must never touch these
            opacity: 1,
            visibility: 'visible',
            willChange: 'transform', // only transform for glitch, not opacity
          }}
        >
          {/* Show placeholder char so the h1 has height before typing starts */}
          {nameTyped || '\u00A0'}
          <span
            className="inline-block w-[3px] ml-1 align-middle"
            style={{
              height: 'clamp(30px,6.5vw,80px)',
              background: '#00ff88',
              boxShadow: '0 0 10px rgba(0,255,136,0.8)',
              animation: 'blink 0.7s step-end infinite',
            }}
          />
        </h1>

        {/* Animated role subtitle */}
        <div className="hero-content-animate h-8 overflow-hidden mb-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={roleIdx}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="font-mono text-base md:text-xl tracking-widest"
              style={{ color: 'rgba(0,255,136,0.75)', letterSpacing: '0.15em' }}
            >
              {ROLES[roleIdx]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="hero-content-animate flex flex-wrap justify-center gap-3 mb-12"
        >
          {['Kathmandu, Nepal', 'Available for Freelance', 'CTF Competitor', 'CEH Certified'].map((tag, i) => (
            <div
              key={i}
              className="font-mono text-xs px-4 py-2 rounded-full tracking-widest transition-all duration-300 cursor-default"
              style={{
                background: 'rgba(0,255,136,0.05)',
                border: '1px solid rgba(0,255,136,0.15)',
                color: 'rgba(0,255,136,0.6)',
                backdropFilter: 'blur(10px)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,255,136,0.4)';
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,255,136,0.1)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,255,136,0.15)';
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,255,136,0.05)';
              }}
            >
              {tag}
            </div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="hero-content-animate grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 w-full max-w-2xl"
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="text-center px-3 py-5 rounded-xl transition-all duration-300 cursor-default"
              style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(0,255,136,0.1)',
                backdropFilter: 'blur(20px)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,255,136,0.35)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 30px rgba(0,255,136,0.1)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,255,136,0.1)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
              }}
            >
              <div className="font-mono font-black text-2xl mb-1" style={{ color: '#00ff88', textShadow: '0 0 20px rgba(0,255,136,0.5)' }}>
                {s.value}
              </div>
              <div className="font-mono text-xs tracking-widest" style={{ color: 'rgba(0,255,136,0.4)' }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="hero-content-animate flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={() => scrollTo('projects')}
            className="font-mono text-sm tracking-widest uppercase font-black transition-all duration-300"
            style={{
              padding: '14px 36px',
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
              background: 'linear-gradient(135deg,#00ff88,#00dd66)',
              color: '#010603',
              boxShadow: '0 0 30px rgba(0,255,136,0.35), 0 4px 20px rgba(0,0,0,0.4)',
            }}
            onMouseEnter={e => { gsap.to(e.currentTarget, { scale: 1.05, boxShadow: '0 0 50px rgba(0,255,136,0.6)', duration: 0.25 }); }}
            onMouseLeave={e => { gsap.to(e.currentTarget, { scale: 1, boxShadow: '0 0 30px rgba(0,255,136,0.35)', duration: 0.25 }); }}
          >
            ◆ View Projects
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="font-mono text-sm tracking-widest uppercase transition-all duration-300"
            style={{
              padding: '14px 36px',
              borderRadius: 8,
              cursor: 'pointer',
              background: 'transparent',
              color: 'rgba(0,255,136,0.8)',
              border: '1px solid rgba(0,255,136,0.3)',
              backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={e => { gsap.to(e.currentTarget, { scale: 1.04, duration: 0.25 }); (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,255,136,0.08)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,255,136,0.6)'; }}
            onMouseLeave={e => { gsap.to(e.currentTarget, { scale: 1, duration: 0.25 }); (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,255,136,0.3)'; }}
          >
            ◈ Contact Me
          </button>
          <button
            onClick={() => scrollTo('research')}
            className="font-mono text-sm tracking-widest uppercase transition-all duration-300"
            style={{
              padding: '14px 36px',
              borderRadius: 8,
              cursor: 'pointer',
              background: 'transparent',
              color: 'rgba(0,170,255,0.8)',
              border: '1px solid rgba(0,170,255,0.3)',
              backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={e => { gsap.to(e.currentTarget, { scale: 1.04, duration: 0.25 }); (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,170,255,0.08)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,170,255,0.6)'; }}
            onMouseLeave={e => { gsap.to(e.currentTarget, { scale: 1, duration: 0.25 }); (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,170,255,0.3)'; }}
          >
            ◉ Research
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ animation: 'floatDown 2s ease-in-out infinite', color: 'rgba(0,255,136,0.35)' }}
      >
        <div className="font-mono text-xs tracking-[0.5em]">SCROLL</div>
        <div
          className="w-px h-10"
          style={{ background: 'linear-gradient(180deg,rgba(0,255,136,0.4),transparent)', animation: 'growLine 2s ease-in-out infinite' }}
        />
      </div>

      <style>{`
        @keyframes blink     { 0%,100% { opacity:1; } 50% { opacity:0; } }
        @keyframes scanLine  { 0% { top:0%; } 100% { top:100%; } }
        @keyframes floatDown { 0%,100% { transform:translateX(-50%) translateY(0); } 50% { transform:translateX(-50%) translateY(6px); } }
        @keyframes growLine  { 0%,100% { transform:scaleY(0.5); transform-origin:top; } 50% { transform:scaleY(1); } }
      `}</style>
    </section>
  );
}