'use client';
import { useEffect, useRef } from 'react';

export default function MatrixRain() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const FONT_SIZE = 13;
    const cols     = Math.floor(window.innerWidth / FONT_SIZE);
    const drops: number[] = Array(cols).fill(1);
    const CHARS = '01アイウエオカキクケコサシスセソ@#$%&><{}[]';

    const id = setInterval(() => {
      ctx.fillStyle = 'rgba(1,6,3,0.055)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${FONT_SIZE}px monospace`;
      drops.forEach((y, i) => {
        const bright = Math.random() > 0.94;
        ctx.fillStyle = bright ? 'rgba(200,255,220,0.65)' : 'rgba(0,60,30,0.55)';
        const char    = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillText(char, i * FONT_SIZE, y * FONT_SIZE);

        if (y * FONT_SIZE > canvas.height && Math.random() > 0.977) {
          drops[i] = 0;
        }
        drops[i]++;
      });
    }, 55);

    return () => {
      clearInterval(id);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.032 }}
    />
  );
}