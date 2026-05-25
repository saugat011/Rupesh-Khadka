'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { personalInfo, skillsCategories, projects, SkillCategory } from '../lib/data';

const COMMANDS: Record<string, string[]> = {
  help: [
    '┌─ Available Commands ─────────────────────────────────┐',
    '│  whoami    — identity + bio                         │',
    '│  skills    — full skill matrix                      │',
    '│  projects  — project archive                        │',
    '│  contact   — reach out                              │',
    '│  status    — system status                          │',
    '│  clear     — clear terminal                         │',
    '└──────────────────────────────────────────────────────┘',
  ],
  whoami: [
    `▸ Name     : ${personalInfo.name}`,
    `▸ Role     : ${personalInfo.role}`,
    `▸ Location : ${personalInfo.location}`,
    `▸ Status   : ${personalInfo.availability}`,
    `▸ Focus    : Malware Research · ML Security · CTF`,
  ],
  skills: skillsCategories.map((c: SkillCategory) => `   [${c.icon} ${c.category}] → ${c.skills.join(', ')}`),
  projects: projects.map((p, i) => `   [${String(i + 1).padStart(2, '0')}] ${p.title}`),
  contact: [
    `▸ Email  : ${personalInfo.email}`,
    `▸ Phone  : ${personalInfo.phone}`,
    `▸ Status : ${personalInfo.availability}`,
  ],
  status: [
    '▸ NEURAL_CORE    → ONLINE  ✓',
    '▸ THREAT_ENGINE  → ACTIVE  ✓',
    '▸ FIREWALL       → ARMED   ✓',
    '▸ COMMS          → SECURE  ✓',
    '▸ SHELL_ACCESS   → GRANTED ✓',
  ],
};

const INIT = [
  '╔══════════════════════════════════════════════╗',
  '║   RUPESH KHADAKA · HACKER OS v4.2.1          ║',
  '║   Cybersecurity Researcher & ML Engineer     ║',
  '╚══════════════════════════════════════════════╝',
  '',
  '   Type "help" for available commands.',
  '',
];

type Line = { type: 'init' | 'cmd' | 'out' | 'err'; text: string };

export default function Terminal() {
  const [lines, setLines]   = useState<Line[]>(INIT.map(t => ({ type: 'init', text: t })));
  const [input, setInput]   = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef  = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const appendLines = useCallback((newLines: Line[]) => {
    setTyping(true);
    newLines.forEach((line, i) => {
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        if (i === newLines.length - 1) setTyping(false);
      }, i * 30);
    });
  }, []);

  const run = useCallback((cmd: string) => {
    const key = cmd.trim().toLowerCase();
    if (key === '') return;
    if (key === 'clear') { setLines([]); return; }

    const cmdLine: Line = { type: 'cmd', text: cmd };
    const outLines: Line[] = key in COMMANDS
      ? COMMANDS[key].map(t => ({ type: 'out' as const, text: t }))
      : [{ type: 'err', text: `Command not found: "${key}" — type "help"` }];

    setLines(prev => [...prev, cmdLine, { type: 'out', text: '' }]);
    appendLines(outLines);
    appendLines([{ type: 'out', text: '' }]);

    setHistory(h => [cmd, ...h.slice(0, 49)]);
    setHistIdx(-1);
  }, [appendLines]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim() && !typing) {
      run(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const idx = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(idx);
      setInput(history[idx] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const idx = Math.max(histIdx - 1, -1);
      setHistIdx(idx);
      setInput(idx === -1 ? '' : history[idx]);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const matches = Object.keys(COMMANDS).filter(c => c.startsWith(input));
      if (matches.length === 1) setInput(matches[0]);
    }
  };

  const lineColor = (type: Line['type']) => {
    if (type === 'cmd')  return '#00ff88';
    if (type === 'err')  return '#ff4466';
    if (type === 'init') return 'rgba(0,255,136,0.4)';
    return 'rgba(0,255,136,0.55)';
  };

  return (
    <div
      className="w-full overflow-hidden rounded-2xl"
      style={{
        background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(0,255,136,0.12)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(0,255,136,0.06)',
      }}
    >
      <div
        className="flex items-center gap-2 px-5 py-3 border-b"
        style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}
      >
        {[['#ff5f57', 'close'], ['#febc2e', 'min'], ['#28c840', 'max']].map(([color, label]) => (
          <div
            key={label}
            className="w-3 h-3 rounded-full cursor-pointer"
            style={{ background: color, boxShadow: `0 0 4px ${color}55` }}
            title={label}
          />
        ))}
        <span className="font-mono text-xs ml-3" style={{ color: 'rgba(0,255,136,0.3)' }}>
          rupesh@hacker-os:~
        </span>
        <div className="ml-auto flex items-center gap-1.5 font-mono text-xs" style={{ color: 'rgba(0,255,136,0.25)' }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#00ff88', animation: 'pulse 2s ease infinite' }} />
          LIVE
        </div>
      </div>

      <div
        className="p-5 h-72 overflow-y-auto font-mono text-xs space-y-0.5 cursor-text"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#003311 transparent' }}
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className="leading-relaxed whitespace-pre-wrap"
            style={{ color: lineColor(line.type) }}
          >
            {line.type === 'cmd' && (
              <span style={{ color: 'rgba(0,255,136,0.35)' }}>root@rupesh:~# </span>
            )}
            {line.text}
          </div>
        ))}
        {typing && (
          <div className="flex gap-1 pt-1">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                style={{
                  width: 5, height: 5,
                  borderRadius: '50%',
                  background: '#00ff88',
                  animation: `bounce 0.8s ease ${i * 0.12}s infinite`,
                }}
              />
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div
        className="flex items-center gap-3 px-5 py-3 border-t"
        style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.15)' }}
      >
        <span className="font-mono text-xs shrink-0" style={{ color: 'rgba(0,255,136,0.4)' }}>
          root@rupesh:~#
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          className="flex-1 bg-transparent font-mono text-xs outline-none"
          style={{ color: '#00ff88', caretColor: '#00ff88' }}
          placeholder={typing ? '' : 'type a command...'}
          autoComplete="off"
          spellCheck={false}
          disabled={typing}
          suppressHydrationWarning={true} 
        />
        {input && !typing && (
          <div className="font-mono text-xs shrink-0" style={{ color: 'rgba(0,255,136,0.2)' }}>
            Tab ↹
          </div>
        )}
      </div>

      <style>{`
        @keyframes bounce { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-4px); } }
        @keyframes pulse  { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
      `}</style>
    </div>
  );
}