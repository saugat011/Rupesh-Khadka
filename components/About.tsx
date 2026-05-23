'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo } from '../lib/data';
import { GlassCard } from './GlassCard'; // Corrected import path

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    gsap.fromTo(
      el.querySelectorAll('.about-reveal'),
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0,
        duration: 0.8, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: el, start: 'top 75%', once: true },
      }
    );
  }, []);

  const contactRows = [
    ['EMAIL',    personalInfo.email],
    ['PHONE',    personalInfo.phone],
    ['LOCATION', personalInfo.location],
    ['STATUS',   personalInfo.availability],
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-10 py-28 px-4 md:px-8"
      style={{ maxWidth: 1200, margin: '0 auto' }}
    >
      {/* Section title */}
      <div className="about-reveal text-center mb-20">
        <div className="font-mono text-xs tracking-[0.6em] mb-4" style={{ color: 'rgba(0,255,136,0.4)' }}>// 01</div>
        <h2
          className="font-mono font-black uppercase mb-4"
          style={{
            fontSize: 'clamp(26px,5vw,50px)',
            color: '#fff',
            letterSpacing: '0.06em',
            textShadow: '0 0 40px rgba(0,255,136,0.18)',
          }}
        >
          About Me
        </h2>
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-24" style={{ background: 'linear-gradient(90deg,transparent,rgba(0,255,136,0.4))' }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00ff88' }} />
          <div className="h-px w-24" style={{ background: 'linear-gradient(90deg,rgba(0,255,136,0.4),transparent)' }} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Identity card */}
        <div className="about-reveal">
          <GlassCard style={{ padding: 40, textAlign: 'center' }}>
            {/* Avatar */}
            <div className="relative inline-flex items-center justify-center mb-8">
              <div
                className="w-36 h-36 rounded-full flex items-center justify-center font-mono font-black text-5xl relative z-10"
                style={{
                  background: 'radial-gradient(circle at 30% 30%,rgba(0,255,136,0.18),rgba(0,255,136,0.02))',
                  border: '1px solid rgba(0,255,136,0.2)',
                  color: '#00ff88',
                  textShadow: '0 0 24px rgba(0,255,136,0.6)',
                }}
              >
                RK
              </div>
            </div>

            <div className="font-mono font-black text-xl tracking-widest mb-1" style={{ color: '#fff' }}>
              {personalInfo.name}
            </div>
            <div className="font-mono text-xs tracking-widest mb-8" style={{ color: 'rgba(0,255,136,0.5)' }}>
              {personalInfo.role}
            </div>

            <div className="space-y-3">
              {contactRows.map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between font-mono text-xs py-2.5 border-b"
                  style={{ borderColor: 'rgba(255,255,255,0.04)' }}
                >
                  <span style={{ color: 'rgba(255,255,255,0.2)' }}>{k}</span>
                  <span style={{ color: 'rgba(0,255,136,0.6)' }}>{v}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* About paragraphs */}
        <div className="space-y-5">
          {[personalInfo.aboutText1, personalInfo.aboutText2, personalInfo.aboutText3].map((text, i) => (
            <motion.div
              key={i}
              className="about-reveal"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: 'easeOut' }}
            >
              <GlassCard style={{ padding: 28 }}>
                <p className="font-mono text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.48)' }}>
                  {text}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}