'use client';
import { motion } from 'framer-motion';
import { researchPapers } from '../lib/data';
import { GlassCard } from './GlassCard'; // FIXED: Updated import path

export default function Research() {
  return (
    <section
      id="research"
      className="relative z-10 py-28 px-4 md:px-8"
      style={{ maxWidth: 1200, margin: '0 auto' }}
    >
      {/* Title */}
      <div className="text-center mb-20">
        <div className="font-mono text-xs tracking-[0.6em] mb-4" style={{ color: 'rgba(0,255,136,0.4)' }}>// 05</div>
        <h2
          className="font-mono font-black uppercase mb-4"
          style={{
            fontSize: 'clamp(26px,5vw,50px)',
            color: '#fff',
            letterSpacing: '0.06em',
            textShadow: '0 0 40px rgba(0,255,136,0.18)',
          }}
        >
          Research Papers
        </h2>
        <p className="font-mono text-sm mb-6" style={{ color: 'rgba(0,255,136,0.35)', maxWidth: 480, margin: '0 auto 24px' }}>
          Published and under-review academic contributions
        </p>
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-24" style={{ background: 'linear-gradient(90deg,transparent,rgba(0,255,136,0.4))' }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00ff88' }} />
          <div className="h-px w-24" style={{ background: 'linear-gradient(90deg,rgba(0,255,136,0.4),transparent)' }} />
        </div>
      </div>

      <div className="space-y-6 max-w-4xl mx-auto">
        {researchPapers.map((paper, i) => {
          const isPublished = paper.status === 'Published';
          const accent = isPublished ? '#00ff88' : '#00aaff';
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <GlassCard accent={accent} style={{ padding: '32px 36px' }}>
                <div className="flex flex-wrap items-start gap-5">
                  <div
                    className="font-mono font-black shrink-0 select-none"
                    style={{
                      fontSize: 'clamp(40px,5vw,64px)',
                      color: `${accent}18`,
                      lineHeight: 1,
                      letterSpacing: '-0.04em',
                    }}
                  >
                    #{paper.id}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="mb-3">
                      <span
                        className="font-mono text-xs px-3 py-1.5 rounded-full tracking-widest uppercase"
                        style={{
                          background: `${accent}14`,
                          border: `1px solid ${accent}35`,
                          color: accent,
                        }}
                      >
                        {isPublished ? '● ' : '◌ '}
                        {paper.status}
                      </span>
                    </div>

                    <h3
                      className="font-mono font-black uppercase text-sm leading-snug mb-2"
                      style={{ color: '#fff', letterSpacing: '0.04em' }}
                    >
                      {paper.title}
                    </h3>

                    <div className="font-mono text-xs mb-4" style={{ color: 'rgba(255,255,255,0.28)' }}>
                      Authors: {paper.authors}
                    </div>

                    <p className="font-mono text-xs leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      {paper.desc}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {paper.tags.map((tag, ti) => (
                        <span
                          key={ti}
                          className="font-mono text-xs px-2.5 py-1 rounded"
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            color: 'rgba(255,255,255,0.28)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}