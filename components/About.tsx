'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo } from '../lib/data';

gsap.registerPlugin(ScrollTrigger);

// Custom SVG Icons
const IconGithub = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>;
const IconLinkedin = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;
const IconMail = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
const IconFile = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>;

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    gsap.fromTo(el.querySelectorAll('.about-reveal'), 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1, stagger: 0.15, scrollTrigger: { trigger: el, start: 'top 60%' } }
    );
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-28 px-4 md:px-8 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="about-reveal text-center mb-20">
        <span className="font-mono text-emerald-500/60 tracking-[0.5em] text-sm">// 01.IDENTITY</span>
        <h2
          className="font-mono font-black uppercase mb-4"
          style={{
            fontSize: 'clamp(26px,5vw,50px)',
            color: '#fff',
            letterSpacing: '0.06em',
            textShadow: '0 0 40px rgba(0,255,136,0.18)',
          }}
        >
          About_Me
        </h2>
      </div>

      <div className="grid md:grid-cols-12 gap-8 items-start">
        {/* Terminal Card */}
        <motion.div className="md:col-span-5 about-reveal" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
          <div className="rounded-3xl border border-emerald-500/20 bg-black/60 backdrop-blur-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-2 px-5 py-3 bg-white/5 border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
              <span className="font-mono text-[10px] ml-3 text-emerald-500/50 uppercase tracking-widest">root@rupesh:~</span>
            </div>
            
            <div className="p-8 text-center">
              <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-tr from-emerald-900 to-black flex items-center justify-center text-3xl font-black text-emerald-500 border border-emerald-500/30 mb-6 shadow-[0_0_20px_rgba(0,255,136,0.15)]">RK</div>
              <h3 className="text-2xl font-bold text-white tracking-tight">{personalInfo.name}</h3>
              <p className="text-emerald-500 font-mono text-xs uppercase tracking-widest mt-1 mb-8">{personalInfo.role}</p>

              <div className="space-y-4 font-mono text-[11px] text-left border-t border-white/5 pt-6">
                {[ ['OFFICIAL', 'security@munaltech.com'], ['PERSONAL', 'russellkshetri@gmail.com'], ['ACADEMIC', 'rupesh.bit_n2022@padmashreecollege.edu.np'], ['PHONE', personalInfo.phone] ].map(([k, v]) => (
                  <div key={k} className="flex justify-between">
                    <span className="text-white/30 uppercase">{k}</span>
                    <span className="text-emerald-500/80 break-all pl-4 text-right">{v}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-4 mt-8 pt-6 border-t border-white/5">
                {[ { icon: <IconGithub />, href: "https://github.com/Rupeshkhadka4" }, { icon: <IconLinkedin />, href: "https://www.linkedin.com/in/rupesh-khadka453/" }, { icon: <IconFile />, href: "https://orcid.org/0009-0009-8157-4201" }, { icon: <IconMail />, href: "mailto:russellkshetri@gmail.com" } ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" className="p-3 bg-white/5 rounded-xl text-emerald-500 hover:bg-emerald-500 hover:text-black transition-all">
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Biography Content */}
        <div className="md:col-span-7 space-y-6">
          {[personalInfo.aboutText1, personalInfo.aboutText2, personalInfo.aboutText3].map((text, i) => (
            <motion.div key={i} className="about-reveal p-8 rounded-2xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent hover:border-emerald-500/20 transition-all">
              <p className="text-white/60 leading-relaxed font-light tracking-wide">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}