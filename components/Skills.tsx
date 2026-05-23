'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillsCategories } from '../lib/data';
import { GlassCard } from './GlassCard'; // FIXED: Updated import path

gsap.registerPlugin(ScrollTrigger);

const ACCENTS = ['#00ff88', '#00aaff', '#aa88ff', '#00ff88', '#ff8844', '#00ccff', '#88ff00', '#ff4488', '#00ffcc'];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    gsap.fromTo(
      el.querySelectorAll('.skill-card'),
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.7, ease: 'power3.out', stagger: 0.08,
        scrollTrigger: { trigger: el, start: 'top 70%', once: true },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative z-10 py-28 px-4 md:px-8"
      style={{ maxWidth: 1200, margin: '0 auto' }}
    >
      {/* Title */}
      <div className="text-center mb-20">
        <div className="font-mono text-xs tracking-[0.6em] mb-4" style={{ color: 'rgba(0,255,136,0.4)' }}>// 02</div>
        <h2
          className="font-mono font-black uppercase mb-4"
          style={{
            fontSize: 'clamp(26px,5vw,50px)',
            color: '#fff',
            letterSpacing: '0.06em',
            textShadow: '0 0 40px rgba(0,255,136,0.18)',
          }}
        >
          Skill Matrix
        </h2>
        <p className="font-mono text-sm mb-6" style={{ color: 'rgba(0,255,136,0.35)', maxWidth: 480, margin: '0 auto 24px' }}>
          Tools, languages, and frameworks in the arsenal
        </p>
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-24" style={{ background: 'linear-gradient(90deg,transparent,rgba(0,255,136,0.4))' }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00ff88' }} />
          <div className="h-px w-24" style={{ background: 'linear-gradient(90deg,rgba(0,255,136,0.4),transparent)' }} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {skillsCategories.map((cat, i) => {
          const accent = ACCENTS[i % ACCENTS.length];
          return (
            <motion.div
              key={i}
              className="skill-card"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard accent={accent} style={{ padding: 26, height: '100%' }}>
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0"
                    style={{
                      background: `${accent}14`,
                      border: `1px solid ${accent}30`,
                    }}
                  >
                    {cat.icon ?? '◆'}
                  </div>
                  <div
                    className="font-mono font-black text-xs uppercase tracking-wider leading-tight"
                    style={{ color: 'rgba(255,255,255,0.7)' }}
                  >
                    {cat.category}
                  </div>
                </div>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((sk, si) => (
                    <motion.span
                      key={si}
                      className="font-mono text-xs px-3 py-1.5 rounded-full cursor-default"
                      style={{
                        background: `${accent}08`,
                        border: `1px solid ${accent}20`,
                        color: `${accent}bb`,
                      }}
                      whileHover={{
                        background: `${accent}18`,
                        borderColor: `${accent}50`,
                        color: accent,
                        scale: 1.06,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {sk}
                    </motion.span>
                  ))}
                </div>

                {/* Decorative bottom accent */}
                <div
                  className="mt-5 h-px"
                  style={{ background: `linear-gradient(90deg,${accent}30,transparent)` }}
                />
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}