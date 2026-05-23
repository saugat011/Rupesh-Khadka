'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../lib/data';

gsap.registerPlugin(ScrollTrigger);

const ACCENTS = ['#00ff88', '#00aaff', '#aa88ff'];

function ProjectCard({ p, i }: { p: typeof projects[0] & { color?: string }; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const accent  = p.color ?? ACCENTS[i % 3];

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width  - 0.5;
    const y = (e.clientY - top)  / height - 0.5;
    gsap.to(card, {
      rotateY: x * 12,
      rotateX: -y * 8,
      transformPerspective: 800,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const onMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateY: 0, rotateX: 0,
      duration: 0.5, ease: 'power2.out',
    });
  };

  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
    >
      <div
        ref={cardRef}
        className="h-full flex flex-col"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          background: 'rgba(255,255,255,0.025)',
          backdropFilter: 'blur(24px)',
          border: `1px solid rgba(255,255,255,0.06)`,
          borderRadius: 16,
          padding: 28,
          cursor: 'default',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}40`;
          (e.currentTarget as HTMLDivElement).style.boxShadow   = `0 16px 50px rgba(0,0,0,0.5), 0 0 40px ${accent}14`;
        }}
        onMouseOut={e => {
          if (!(e.currentTarget as HTMLDivElement).contains(e.relatedTarget as Node)) {
            (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.06)';
            (e.currentTarget as HTMLDivElement).style.boxShadow   = 'none';
          }
        }}
      >
        {/* Project number */}
        <div className="font-mono text-xs tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.18)' }}>
          PROJ_{String(i + 1).padStart(2, '0')}
        </div>

        {/* Accent bar */}
        <div className="h-0.5 w-12 mb-4 rounded-full" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} />

        {/* Title */}
        <div
          className="font-mono font-black uppercase tracking-wide text-sm mb-3 leading-tight flex-1"
          style={{ color: '#fff' }}
        >
          {p.title}
        </div>

        {/* Description */}
        <p className="font-mono text-xs leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.38)' }}>
          {p.desc}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {p.tech.map((t, ti) => (
            <span
              key={ti}
              className="font-mono text-xs px-2.5 py-1 rounded-md"
              style={{
                background: `${accent}10`,
                border: `1px solid ${accent}28`,
                color: accent + 'cc',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Top-right glow dot */}
        <div
          className="absolute top-4 right-4 w-2 h-2 rounded-full"
          style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
        />
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    // Title reveal
    gsap.fromTo(
      el.querySelector('.proj-title'),
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 75%', once: true },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative z-10 py-28 px-4 md:px-8"
      style={{ maxWidth: 1200, margin: '0 auto' }}
    >
      {/* Title */}
      <div className="proj-title text-center mb-20">
        <div className="font-mono text-xs tracking-[0.6em] mb-4" style={{ color: 'rgba(0,255,136,0.4)' }}>// 04</div>
        <h2
          className="font-mono font-black uppercase mb-4"
          style={{
            fontSize: 'clamp(26px,5vw,50px)',
            color: '#fff',
            letterSpacing: '0.06em',
            textShadow: '0 0 40px rgba(0,255,136,0.18)',
          }}
        >
          Project Archive
        </h2>
        <p className="font-mono text-sm mb-6" style={{ color: 'rgba(0,255,136,0.35)', maxWidth: 480, margin: '0 auto 24px' }}>
          Security tools, ML systems, and full-stack builds
        </p>
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-24" style={{ background: 'linear-gradient(90deg,transparent,rgba(0,255,136,0.4))' }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00ff88' }} />
          <div className="h-px w-24" style={{ background: 'linear-gradient(90deg,rgba(0,255,136,0.4),transparent)' }} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 perspective-1000">
        {projects.map((p, i) => (
          <ProjectCard key={i} p={p as typeof projects[0] & { color?: string }} i={i} />
        ))}
      </div>
    </section>
  );
}