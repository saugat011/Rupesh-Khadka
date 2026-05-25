'use client';
import { motion } from 'framer-motion';
import { researchPapers } from '../lib/data';
import { GlassCard } from './GlassCard';

export default function Research() {
  return (
    <section id="research" className="relative z-10 py-28 px-4 md:px-8" style={{ maxWidth: 1200, margin: '0 auto' }}>
      <div className="text-center mb-20">
        <div className="font-mono text-xs tracking-[0.6em] mb-4" style={{ color: 'rgba(0,255,136,0.4)' }}>// 05</div>
        <h2 className="font-mono font-black uppercase mb-4 text-4xl text-white tracking-widest">Research Papers</h2>
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-emerald-500/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-emerald-500/40" />
        </div>
      </div>

      <div className="space-y-6 max-w-4xl mx-auto">
        {researchPapers.map((paper: any, i) => {
          const isPublished = paper.status === 'Published';
          const accent = isPublished ? '#00ff88' : '#00aaff';
          
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}>
              <GlassCard accent={accent} style={{ padding: '32px 36px' }}>
                <div className="flex flex-wrap items-start gap-5">
                  <div className="font-mono font-black shrink-0 text-5xl opacity-10">#{paper.id}</div>

                  <div className="flex-1 min-w-0">
                    <div className="mb-3">
                      <span className="font-mono text-xs px-3 py-1.5 rounded-full uppercase tracking-widest" style={{ background: `${accent}14`, border: `1px solid ${accent}35`, color: accent }}>
                        {isPublished ? '● ' : '◌ '} {paper.status}
                      </span>
                    </div>

                    <h3 className="font-mono font-black uppercase text-sm mb-2 text-white">{paper.title}</h3>
                    <p className="font-mono text-xs text-white/40 mb-4">Authors: {paper.authors}</p>
                    <p className="font-mono text-xs leading-relaxed mb-5 text-white/50">{paper.desc}</p>

                    {/* Clickable Link */}
                    {paper.link && (
                      <a 
                        href={paper.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block font-mono text-xs px-4 py-2 rounded border transition-all duration-300 hover:scale-105"
                        style={{ borderColor: accent, color: accent, background: `${accent}05` }}
                      >
                        READ PAPER →
                      </a>
                    )}
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