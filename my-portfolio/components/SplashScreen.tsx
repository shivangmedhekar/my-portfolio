'use client';

import { useEffect, useRef, useState } from 'react';

export default function SplashScreen({ phase }: { phase: 'show' | 'exit' | 'hidden' }) {
  const visible = phase !== 'hidden';
  const SCRIPT = [
    '$ npm install',
    'npm WARN deprecated @legacy/pkg@1.0.2: use modern alternative',
    'added 412 packages, and audited 413 packages in 2s',
    '68 packages are looking for funding',
    'found 0 vulnerabilities',
    '',
    '$ npm run build',
    '> next build',
    'info  - Creating an optimized production build',
    'info  - Compiled successfully',
    'info  - Collecting page data',
    'info  - Generating static pages (6/6)',
    'info  - Finalizing page optimization',
    'Done in 3.8s.',
    '',
    'shivang.dev ready',
  ];

  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [renderedLines, setRenderedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible) return;
    if (lineIndex >= SCRIPT.length) return;

    const line = SCRIPT[lineIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (charIndex < line.length) {
      timer = setTimeout(() => {
        setCurrentLine(line.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, line.startsWith('$') ? 18 : 10);
    } else {
      timer = setTimeout(() => {
        setRenderedLines((prev) => [...prev, line]);
        setCurrentLine('');
        setCharIndex(0);
        setLineIndex((i) => i + 1);
      }, line === '' ? 120 : 180);
    }

    return () => clearTimeout(timer);
  }, [visible, lineIndex, charIndex]);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [renderedLines, currentLine]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-700 ${
        phase === 'show' ? 'opacity-100' : phase === 'exit' ? 'opacity-0' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!visible}
    >
      <div className="absolute inset-0 bg-background" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 30% at 50% 45%, color-mix(in oklch, var(--color-accent) 14%, transparent), transparent 70%)',
        }}
      />

      <div className="relative w-[min(740px,92vw)] rounded-xl border border-border/60 bg-card/65 backdrop-blur-md shadow-2xl overflow-hidden">
        <div className="h-9 border-b border-border/60 bg-muted/40 px-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <p className="font-mono text-xs text-muted-foreground tracking-wider">shivang.dev / terminal</p>
          <div className="w-10" />
        </div>

        <div
          ref={scrollRef}
          className="px-4 py-4 font-mono text-[13px] leading-6 h-[260px] overflow-y-auto text-foreground/90 scrollbar-hide"
        >
          {renderedLines.map((line, i) => (
            <p key={`${line}-${i}`} className="whitespace-pre-wrap">
              {line}
            </p>
          ))}
          {lineIndex < SCRIPT.length && (
            <p className="whitespace-pre-wrap">
              {currentLine}
              <span className="inline-block w-2 h-4 translate-y-[2px] ml-1 bg-foreground/80 splash-caret" />
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
