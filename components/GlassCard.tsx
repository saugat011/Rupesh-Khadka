'use client';
import { useRef } from 'react';
import gsap from 'gsap';

export function GlassCard({
  children,
  className = '',
  accent = '#00ff88',
  style = {},
}: {
  children: React.ReactNode;
  className?: string;
  accent?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        background: 'rgba(255,255,255,0.025)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 16,
        transition: 'all 0.35s ease',
        ...style,
      }}
      onMouseEnter={(e) => {
        gsap.to(e.currentTarget, {
          borderColor: accent + '44',
          boxShadow: `0 8px 40px rgba(0,0,0,0.4), 0 0 30px ${accent}14`,
          duration: 0.3,
        });
      }}
      onMouseLeave={(e) => {
        gsap.to(e.currentTarget, {
          borderColor: 'rgba(255,255,255,0.06)',
          boxShadow: 'none',
          duration: 0.3,
        });
      }}
    >
      {children}
    </div>
  );
}