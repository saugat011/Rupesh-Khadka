'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const BOOT_LINES = [
  { prompt: 'root@rupesh:~#', cmd: 'init --neural-core --stealth-mode', ok: 'OK' },
  { prompt: 'root@rupesh:~#', cmd: 'load --threat-intelligence --federated-net', ok: 'OK' },
  { prompt: 'root@rupesh:~#', cmd: 'bypass --firewall --layer 7 --silent', ok: 'OK' },
  { prompt: 'root@rupesh:~#', cmd: 'inject --payload --target mainframe --zero-day', ok: 'OK' },
  { prompt: 'root@rupesh:~#', cmd: 'escalate --privileges --root --kernel', ok: 'OK' },
  { prompt: 'sys@core:~#',    cmd: '>>> ACCESS GRANTED — RUPESH KHADAKA AUTHENTICATED <<<', ok: '' },
];

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [pct, setPct] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleLines(i);
      setPct(Math.round((i / BOOT_LINES.length) * 100));
      if (i >= BOOT_LINES.length) {
        clearInterval(interval);
        setTimeout(() => {
          if (containerRef.current) {
            gsap.to(containerRef.current, {
              opacity: 0,
              scale: 1.08,
              duration: 0.9,
              ease: 'power2.inOut',
              onComplete: onDone,
            });
          }
        }, 800);
      }
    }, 480);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[300] flex flex-col justify-center px-8 md:px-24 overflow-hidden"
      style={{ background: '#010603' }}
    >
      {/* CRT scanlines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(0deg,rgba(0,0,0,0.18) 0px,rgba(0,0,0,0.18) 1px,transparent 1px,transparent 4px)',
          zIndex: 1,
        }}
      />
      {/* Corner decorations */}
      {['top-4 left-4','top-4 right-4','bottom-4 left-4','bottom-4 right-4'].map((pos, i) => (
        <div key={i} className={`absolute ${pos} w-8 h-8 pointer-events-none`} style={{
          borderTop: i < 2 ? '1px solid rgba(0,255,136,0.2)' : 'none',
          borderBottom: i >= 2 ? '1px solid rgba(0,255,136,0.2)' : 'none',
          borderLeft: i % 2 === 0 ? '1px solid rgba(0,255,136,0.2)' : 'none',
          borderRight: i % 2 === 1 ? '1px solid rgba(0,255,136,0.2)' : 'none',
        }} />
      ))}

      <div className="relative z-10 max-w-3xl w-full mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div
            className="font-mono font-black tracking-widest mb-2"
            style={{
              fontSize: 'clamp(22px,4vw,44px)',
              color: '#ff2244',
              textShadow: '0 0 40px rgba(255,34,68,0.6), 0 0 80px rgba(255,34,68,0.2)',
              letterSpacing: '0.15em',
            }}
          >
             SYSTEM_BREACH_DETECTED
          </div>
          <div className="font-mono text-xs tracking-[0.5em]" style={{ color: 'rgba(255,34,68,0.4)' }}>
            INITIALIZING SECURE SHELL · ESTABLISHING TUNNEL
          </div>
          <div className="mt-3 h-px" style={{ background: 'linear-gradient(90deg,rgba(255,34,68,0.5),transparent)' }} />
        </div>

        {/* Boot lines */}
        <div className="font-mono space-y-2.5" style={{ minHeight: 220 }}>
          {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
            <div
              key={i}
              className="flex items-baseline gap-3 text-xs md:text-sm"
              style={{ animation: 'bootLine 0.25s ease forwards', opacity: 0 }}
            >
              <span style={{ color: line.cmd.includes('GRANTED') ? '#ff2244' : 'rgba(0,255,136,0.5)', flexShrink: 0 }}>
                {line.prompt}
              </span>
              <span style={{ color: line.cmd.includes('GRANTED') ? '#ffffff' : 'rgba(0,255,136,0.75)', flex: 1 }}>
                {line.cmd}
              </span>
              {line.ok && (
                <span className="ml-auto shrink-0 px-2 py-0.5 text-xs" style={{
                  color: '#00ff88',
                  border: '1px solid rgba(0,255,136,0.3)',
                  background: 'rgba(0,255,136,0.06)',
                }}>
                  {line.ok}
                </span>
              )}
            </div>
          ))}
          {visibleLines < BOOT_LINES.length && (
            <div className="flex gap-1.5 pt-1">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  style={{
                    width: 6, height: 6,
                    borderRadius: '50%',
                    background: '#00ff88',
                    animation: `bounce 0.8s ease ${i * 0.15}s infinite`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-10">
          <div className="flex justify-between font-mono text-xs mb-2" style={{ color: 'rgba(0,255,136,0.3)' }}>
            <span>LOADING NEURAL CORE</span>
            <span>{pct}%</span>
          </div>
          <div style={{ height: 2, background: 'rgba(0,255,136,0.08)', borderRadius: 1 }}>
            <div style={{
              height: '100%',
              width: `${pct}%`,
              background: 'linear-gradient(90deg,#00ff88,#00ccff)',
              boxShadow: '0 0 20px rgba(0,255,136,0.6)',
              borderRadius: 1,
              transition: 'width 0.45s cubic-bezier(0.4,0,0.2,1)',
            }} />
          </div>
          <div className="flex gap-1 mt-2">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: 2,
                  background: i < Math.floor(pct / 2.5) ? '#00ff88' : 'rgba(0,255,136,0.08)',
                  transition: 'background 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bootLine { from { opacity:0; transform:translateX(-8px); } to { opacity:1; transform:translateX(0); } }
        @keyframes bounce { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-4px); } }
      `}</style>
    </div>
  );
}