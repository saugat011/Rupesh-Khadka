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

  useEffect(() => {
    if (!nameDone) return;
    const id = setInterval(() => setRoleIdx(i => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(id);
  }, [nameDone]);

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
          height: 1,
          background: 'linear-gradient(90deg,transparent,rgba(0,255,136,0.18),transparent)',
          animation: 'scanLine 8s linear infinite',
        }}
      />

      <div className="hero-content relative z-10 text-center w-full max-w-5xl mx-auto flex flex-col items-center"
        style={{ padding: 'clamp(80px, 12vw, 120px) clamp(16px, 5vw, 40px) clamp(60px, 10vw, 100px)' }}
      >

        {/* Identity badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex items-center gap-2 mb-6 font-mono tracking-widest"
          style={{ color: 'rgba(0,255,136,0.5)', fontSize: 'clamp(8px, 2vw, 11px)' }}
        >
          <div className="h-px" style={{ width: 'clamp(24px, 5vw, 56px)', background: 'linear-gradient(90deg,transparent,#00ff88)' }} />
          <span className="whitespace-nowrap">OPERATOR IDENTITY CONFIRMED</span>
          <div className="h-px" style={{ width: 'clamp(24px, 5vw, 56px)', background: 'linear-gradient(90deg,#00ff88,transparent)' }} />
        </motion.div>

        {/* NAME */}
        <h1
          ref={glitchRef}
          className="font-mono font-black leading-none mb-3 relative"
          style={{
            fontSize: 'clamp(32px, 10vw, 100px)',
            letterSpacing: '-0.02em',
            color: '#ffffff',
            textShadow: '0 0 15px rgba(0,255,136,0.8), 0 0 30px rgba(0,255,136,0.4)',
            opacity: 1,
            visibility: 'visible',
            willChange: 'transform',
          }}
        >
          {nameTyped || '\u00A0'}
          <span
            className="inline-block ml-1 align-middle"
            style={{
              width: 'clamp(2px, 0.5vw, 3px)',
              height: 'clamp(26px, 7.5vw, 80px)',
              background: '#00ff88',
              boxShadow: '0 0 10px rgba(0,255,136,0.8)',
              animation: 'blink 0.7s step-end infinite',
            }}
          />
        </h1>

        {/* Role subtitle */}
        <div className="hero-content-animate overflow-hidden mb-6 flex items-center justify-center"
          style={{ height: 'clamp(28px, 6vw, 36px)' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={roleIdx}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="font-mono tracking-widest"
              style={{
                fontSize: 'clamp(11px, 3.5vw, 20px)',
                color: 'rgba(0,255,136,0.75)',
                letterSpacing: '0.12em',
              }}
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
          className="hero-content-animate flex flex-wrap justify-center mb-8"
          style={{ gap: 'clamp(6px, 2vw, 12px)' }}
        >
          {['Kathmandu, Nepal', 'Available for Freelance', 'CTF Competitor', 'CEH Certified'].map((tag, i) => (
            <div
              key={i}
              className="font-mono rounded-full tracking-widest transition-all duration-300 cursor-default"
              style={{
                fontSize: 'clamp(9px, 2.5vw, 11px)',
                padding: 'clamp(5px, 1.5vw, 8px) clamp(10px, 3vw, 16px)',
                background: 'rgba(0,255,136,0.05)',
                border: '1px solid rgba(0,255,136,0.15)',
                color: 'rgba(0,255,136,0.65)',
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
          className="hero-content-animate grid grid-cols-2 md:grid-cols-4 w-full mb-8"
          style={{
            gap: 'clamp(8px, 2vw, 16px)',
            maxWidth: 'clamp(280px, 90vw, 640px)',
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="text-center rounded-xl transition-all duration-300 cursor-default"
              style={{
                padding: 'clamp(12px, 3vw, 20px) clamp(8px, 2vw, 12px)',
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(0,255,136,0.1)',
                backdropFilter: 'blur(20px)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,255,136,0.35)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 24px rgba(0,255,136,0.1)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,255,136,0.1)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
              }}
            >
              <div
                className="font-mono font-black mb-1"
                style={{
                  fontSize: 'clamp(18px, 5vw, 26px)',
                  color: '#00ff88',
                  textShadow: '0 0 20px rgba(0,255,136,0.5)',
                }}
              >
                {s.value}
              </div>
              <div
                className="font-mono tracking-widest"
                style={{
                  fontSize: 'clamp(8px, 2vw, 11px)',
                  color: 'rgba(0,255,136,0.4)',
                }}
              >
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
          className="hero-content-animate flex flex-col sm:flex-row flex-wrap justify-center w-full"
          style={{
            gap: 'clamp(8px, 2vw, 14px)',
            maxWidth: 'clamp(260px, 85vw, 600px)',
          }}
        >
          <button
            onClick={() => scrollTo('projects')}
            className="font-mono tracking-widest uppercase font-black transition-all duration-300 w-full sm:w-auto"
            style={{
              fontSize: 'clamp(10px, 2.8vw, 13px)',
              padding: 'clamp(12px, 3vw, 14px) clamp(20px, 5vw, 36px)',
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
              background: 'linear-gradient(135deg,#00ff88,#00dd66)',
              color: '#010603',
              boxShadow: '0 0 30px rgba(0,255,136,0.35), 0 4px 20px rgba(0,0,0,0.4)',
            }}
            onMouseEnter={e => gsap.to(e.currentTarget, { scale: 1.05, boxShadow: '0 0 50px rgba(0,255,136,0.6)', duration: 0.25 })}
            onMouseLeave={e => gsap.to(e.currentTarget, { scale: 1, boxShadow: '0 0 30px rgba(0,255,136,0.35)', duration: 0.25 })}
          >
            ◆ View Projects
          </button>

          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={() => scrollTo('contact')}
              className="font-mono tracking-widest uppercase transition-all duration-300 flex-1 sm:flex-none"
              style={{
                fontSize: 'clamp(10px, 2.8vw, 13px)',
                padding: 'clamp(12px, 3vw, 14px) clamp(14px, 3.5vw, 28px)',
                borderRadius: 8,
                cursor: 'pointer',
                background: 'transparent',
                color: 'rgba(0,255,136,0.8)',
                border: '1px solid rgba(0,255,136,0.3)',
                backdropFilter: 'blur(10px)',
              }}
              onMouseEnter={e => {
                gsap.to(e.currentTarget, { scale: 1.04, duration: 0.25 });
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,255,136,0.08)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,255,136,0.6)';
              }}
              onMouseLeave={e => {
                gsap.to(e.currentTarget, { scale: 1, duration: 0.25 });
                (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,255,136,0.3)';
              }}
            >
              ◈ Contact
            </button>

            <button
              onClick={() => scrollTo('research')}
              className="font-mono tracking-widest uppercase transition-all duration-300 flex-1 sm:flex-none"
              style={{
                fontSize: 'clamp(10px, 2.8vw, 13px)',
                padding: 'clamp(12px, 3vw, 14px) clamp(14px, 3.5vw, 28px)',
                borderRadius: 8,
                cursor: 'pointer',
                background: 'transparent',
                color: 'rgba(0,170,255,0.8)',
                border: '1px solid rgba(0,170,255,0.3)',
                backdropFilter: 'blur(10px)',
              }}
              onMouseEnter={e => {
                gsap.to(e.currentTarget, { scale: 1.04, duration: 0.25 });
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,170,255,0.08)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,170,255,0.6)';
              }}
              onMouseLeave={e => {
                gsap.to(e.currentTarget, { scale: 1, duration: 0.25 });
                (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,170,255,0.3)';
              }}
            >
              ◉ Research
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator — hidden on very small screens */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden sm:flex"
        style={{ animation: 'floatDown 2s ease-in-out infinite', color: 'rgba(0,255,136,0.35)' }}
      >
        <div className="font-mono text-xs tracking-[0.5em]">SCROLL</div>
        <div
          className="w-px h-8"
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