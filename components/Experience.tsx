'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience } from '../lib/data';
import { GlassCard } from './GlassCard'; // Import from new file

gsap.registerPlugin(ScrollTrigger);

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el   = sectionRef.current;
    const line = lineRef.current;
    if (!el || !line) return;

    // Animate timeline line drawing
    gsap.fromTo(
      line,
      { scaleY: 0, transformOrigin: 'top' },
      {
        scaleY: 1,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 70%', once: true },
      }
    );

    // Animate cards
    gsap.fromTo(
      el.querySelectorAll('.exp-card'),
      { opacity: 0, x: 60 },
      {
        opacity: 1, x: 0,
        duration: 0.7, ease: 'power3.out', stagger: 0.15,
        scrollTrigger: { trigger: el, start: 'top 65%', once: true },
      }
    );

    // Animate dots
    gsap.fromTo(
      el.querySelectorAll('.timeline-dot'),
      { scale: 0 },
      {
        scale: 1,
        duration: 0.4, ease: 'back.out(2)', stagger: 0.15,
        scrollTrigger: { trigger: el, start: 'top 65%', once: true },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative z-10 py-28 px-4 md:px-8"
      style={{ maxWidth: 1200, margin: '0 auto' }}
    >
      {/* Title */}
      <div className="text-center mb-20">
        <div className="font-mono text-xs tracking-[0.6em] mb-4" style={{ color: 'rgba(0,255,136,0.4)' }}>// 03</div>
        <h2
          className="font-mono font-black uppercase mb-4"
          style={{
            fontSize: 'clamp(26px,5vw,50px)',
            color: '#fff',
            letterSpacing: '0.06em',
            textShadow: '0 0 40px rgba(0,255,136,0.18)',
          }}
        >
          Experience Log
        </h2>
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-24" style={{ background: 'linear-gradient(90deg,transparent,rgba(0,255,136,0.4))' }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00ff88' }} />
          <div className="h-px w-24" style={{ background: 'linear-gradient(90deg,rgba(0,255,136,0.4),transparent)' }} />
        </div>
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* Vertical timeline line */}
        <div
          className="absolute top-0 bottom-0"
          style={{ left: 18, width: 1, background: 'rgba(0,255,136,0.07)' }}
        />
        <div
          ref={lineRef}
          className="absolute top-0 bottom-0"
          style={{
            left: 18,
            width: 1,
            background: 'linear-gradient(180deg,rgba(0,255,136,0.6) 0%,rgba(0,255,136,0.1) 100%)',
            boxShadow: '0 0 8px rgba(0,255,136,0.3)',
          }}
        />

        <div className="space-y-8 pl-14 md:pl-16">
          {experience.map((exp, i) => (
            <div key={i} className="relative exp-card">
              {/* Timeline dot */}
              <div
                className="timeline-dot absolute flex items-center justify-center"
                style={{
                  left: -44,
                  top: 24,
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: '#010603',
                  border: '1.5px solid rgba(0,255,136,0.4)',
                  boxShadow: '0 0 12px rgba(0,255,136,0.25)',
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#00ff88',
                    boxShadow: '0 0 8px rgba(0,255,136,0.8)',
                  }}
                />
              </div>

              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.25 }}
              >
                <GlassCard style={{ padding: '24px 28px' }}>
                  {/* Year + Company */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="font-mono text-xs tracking-widest" style={{ color: 'rgba(0,255,136,0.4)' }}>
                      {exp.year}
                    </div>
                    <div
                      className="font-mono text-xs px-2 py-0.5 rounded"
                      style={{
                        background: 'rgba(0,255,136,0.06)',
                        border: '1px solid rgba(0,255,136,0.15)',
                        color: 'rgba(0,255,136,0.5)',
                      }}
                    >
                      {exp.company}
                    </div>
                  </div>

                  {/* Title */}
                  <div
                    className="font-mono font-black uppercase tracking-wide mb-3"
                    style={{ fontSize: 14, color: '#fff', letterSpacing: '0.06em' }}
                  >
                    {exp.title}
                  </div>

                  {/* Description */}
                  <p className="font-mono text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.38)' }}>
                    {exp.desc}
                  </p>

                  {/* Bottom accent line */}
                  <div
                    className="mt-4 h-px"
                    style={{ background: 'linear-gradient(90deg,rgba(0,255,136,0.2),transparent)' }}
                  />
                </GlassCard>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}