'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Github, Linkedin } from 'lucide-react';
import siteData from '@/data.json';

/* ─────────────────────────────────────────
   Circuit-board / Neural-network canvas
   ───────────────────────────────────────── */
function CircuitCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const tickRef   = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    /* ── helpers ── */
    const isDark = () =>
      document.documentElement.classList.contains('dark') ||
      !document.documentElement.classList.contains('light');

    /* ── grid geometry ── */
    const CELL = 60; // px per grid unit
    type Point = { x: number; y: number };
    type Node  = Point & { radius: number; pulse: number; pulseSpeed: number };
    type Trace = { pts: Point[]; signal: number; speed: number; active: boolean };

    let W = 0, H = 0;
    let nodes: Node[]   = [];
    let traces: Trace[] = [];

    const snap = (v: number) => Math.round(v / CELL) * CELL;

    const buildLayout = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W;
      canvas.height = H;

      nodes  = [];
      traces = [];

      /* Place nodes on a jittered grid */
      const cols = Math.ceil(W / CELL) + 1;
      const rows = Math.ceil(H / CELL) + 1;

      for (let c = 0; c <= cols; c++) {
        for (let r = 0; r <= rows; r++) {
          if (Math.random() > 0.38) continue;           // sparse
          const x = snap(c * CELL + (Math.random() - 0.5) * CELL * 0.5);
          const y = snap(r * CELL + (Math.random() - 0.5) * CELL * 0.5);
          nodes.push({
            x, y,
            radius: Math.random() * 3 + 2,
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: 0.015 + Math.random() * 0.02,
          });
        }
      }

      /* Build PCB-style L-shaped / straight traces between nearby nodes */
      const used = new Set<string>();
      nodes.forEach((a, i) => {
        nodes.forEach((b, j) => {
          if (j <= i) return;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > CELL * 3.2 || d < CELL * 0.6) return;
          const key = `${Math.min(i,j)}-${Math.max(i,j)}`;
          if (used.has(key)) return;
          used.add(key);

          // 50% straight, 50% L-shaped (PCB trace style)
          const pts: Point[] = [{ x: a.x, y: a.y }];
          if (Math.random() > 0.5) {
            // L-bend: go horizontal first then vertical
            pts.push({ x: b.x, y: a.y });
          }
          pts.push({ x: b.x, y: b.y });

          traces.push({
            pts,
            signal: Math.random(),          // 0..1 position along trace
            speed:  0.002 + Math.random() * 0.003,
            active: Math.random() > 0.4,
          });
        });
      });
    };

    /* ── draw frame ── */
    const draw = () => {
      tickRef.current++;
      ctx.clearRect(0, 0, W, H);

      const dark  = isDark();
      const base  = dark ? 'rgba(99,102,241,' : 'rgba(79,70,229,';
      const nodeC = dark ? 'rgba(129,140,248,' : 'rgba(99,102,241,';
      const sigC  = dark ? '#a5b4fc' : '#6366f1';

      /* Draw traces */
      traces.forEach(tr => {
        const { pts } = tr;
        if (pts.length < 2) return;

        /* Trace line */
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let k = 1; k < pts.length; k++) ctx.lineTo(pts[k].x, pts[k].y);
        ctx.strokeStyle = `${base}0.18)`;
        ctx.lineWidth   = 1.2;
        ctx.stroke();

        /* Traveling signal dot */
        if (!tr.active) return;
        tr.signal = (tr.signal + tr.speed) % 1;

        // Interpolate position along multi-segment path
        const totalLen = pts.reduce((acc, p, i) => {
          if (i === 0) return 0;
          return acc + Math.hypot(p.x - pts[i-1].x, p.y - pts[i-1].y);
        }, 0);

        let remaining = tr.signal * totalLen;
        let sx = pts[0].x, sy = pts[0].y;
        for (let k = 1; k < pts.length; k++) {
          const segLen = Math.hypot(pts[k].x - pts[k-1].x, pts[k].y - pts[k-1].y);
          if (remaining <= segLen) {
            const t = remaining / segLen;
            sx = pts[k-1].x + (pts[k].x - pts[k-1].x) * t;
            sy = pts[k-1].y + (pts[k].y - pts[k-1].y) * t;
            break;
          }
          remaining -= segLen;
        }

        // Glow signal
        const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, 7);
        grd.addColorStop(0,   sigC + 'cc');
        grd.addColorStop(0.4, sigC + '55');
        grd.addColorStop(1,   sigC + '00');
        ctx.beginPath();
        ctx.arc(sx, sy, 7, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(sx, sy, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = sigC;
        ctx.fill();
      });

      /* Draw nodes */
      nodes.forEach(n => {
        n.pulse += n.pulseSpeed;
        const p  = (Math.sin(n.pulse) + 1) / 2;   // 0..1
        const r  = n.radius;

        // Outer ring glow
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 4);
        grd.addColorStop(0,   `${nodeC}${(0.5 + p * 0.4).toFixed(2)})`);
        grd.addColorStop(0.5, `${nodeC}${(0.12 + p * 0.08).toFixed(2)})`);
        grd.addColorStop(1,   `${nodeC}0)`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Inner dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `${nodeC}${(0.55 + p * 0.45).toFixed(2)})`;
        ctx.fill();

        // Ring
        ctx.beginPath();
        ctx.arc(n.x, n.y, r + 2.5, 0, Math.PI * 2);
        ctx.strokeStyle = `${nodeC}${(0.25 + p * 0.25).toFixed(2)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    buildLayout();
    draw();

    const ro = new ResizeObserver(() => { buildLayout(); });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
      style={{ opacity: 0.72 }}
    />
  );
}

/* ── Typing headline ── */
const { hero } = siteData;
const WORDS = hero.typingWords;

function TypingWord() {
  const [wordIdx, setWordIdx]     = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting]   = useState(false);
  const [paused, setPaused]       = useState(false);

  useEffect(() => {
    const target = WORDS[wordIdx];
    if (paused) {
      const t = setTimeout(() => { setDeleting(true); setPaused(false); }, 1600);
      return () => clearTimeout(t);
    }
    if (!deleting && displayed.length < target.length) {
      const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 65);
      return () => clearTimeout(t);
    }
    if (!deleting && displayed.length === target.length) { setPaused(true); return; }
    if (deleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      return () => clearTimeout(t);
    }
    if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIdx(i => (i + 1) % WORDS.length);
    }
  }, [displayed, deleting, paused, wordIdx]);

  return (
    <span className="text-gradient">
      {displayed}
      <span className="inline-block w-[3px] h-[0.85em] bg-accent align-middle ml-0.5 animate-pulse" />
    </span>
  );
}

/* ── Stack pills ── */
const STACK = hero.stack;

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-14">
      {/* Circuit board background */}
      <CircuitCanvas />

      {/* Vignette — fades the circuit toward edges so text stays readable */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse 55% 55% at 50% 50%, transparent 10%, var(--background) 85%)',
            'linear-gradient(to bottom, var(--background) 0%, transparent 18%, transparent 82%, var(--background) 100%)',
          ].join(', '),
        }}
      />

      {/* Name glow plate — sits directly behind the heading */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          top: '50%', left: '50%',
          transform: 'translate(-50%, -62%)',
          width: '720px', height: '220px',
          background: 'radial-gradient(ellipse 100% 100% at 50% 50%, rgba(99,102,241,0.22) 0%, rgba(99,102,241,0.06) 55%, transparent 100%)',
          filter: 'blur(32px)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 flex flex-col items-center text-center gap-8">

        {/* Status badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/60 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
          style={{ animationDelay: '0.05s' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="font-mono text-sm text-muted-foreground tracking-wider uppercase">
            {hero.status}
          </span>
        </div>

        {/* Headline */}
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both" style={{ animationDelay: '0.15s' }}>
          {/* Beam sweep under name */}
          <div className="relative inline-block">
            <span
              aria-hidden="true"
              className="absolute left-0 right-0 -z-10 pointer-events-none"
              style={{
                top: '58%', height: '1px',
                background: 'linear-gradient(90deg, transparent 0%, #818cf8 25%, #c7d2fe 50%, #818cf8 75%, transparent 100%)',
                animation: 'beam-sweep 4s ease-in-out infinite',
              }}
            />
            <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-semibold tracking-tight leading-[1.05] text-foreground">
              {hero.name}
            </h1>
          </div>

          <p className="text-2xl sm:text-3xl font-medium text-foreground/85 leading-snug">
            Building <TypingWord />
          </p>
        </div>

        {/* Bio */}
        <p
          className="text-lg text-foreground/80 leading-relaxed max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
          style={{ animationDelay: '0.25s' }}
        >
          {hero.bio}
        </p>

        {/* Stack pills */}
        <div
          className="flex flex-wrap justify-center gap-1.5 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
          style={{ animationDelay: '0.32s' }}
        >
          {STACK.map(s => (
            <span
              key={s}
              className="px-2.5 py-1 rounded-md bg-card/80 border border-border text-sm font-mono text-foreground/80 hover:border-accent/50 hover:text-foreground transition-colors"
            >
              {s}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div
          className="flex flex-wrap justify-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
          style={{ animationDelay: '0.38s' }}
        >
          <a
            href={hero.ctas.work.href}
            className="inline-flex items-center gap-1.5 h-10 px-5 rounded-md bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            {hero.ctas.work.label} <ArrowRight className="w-3.5 h-3.5" />
          </a>
          <a
            href={hero.ctas.github.href}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 h-10 px-5 rounded-md border border-border text-base font-medium text-foreground/80 hover:text-foreground hover:border-border/80 transition-colors"
          >
            <Github className="w-3.5 h-3.5" /> {hero.ctas.github.label}
          </a>
          <a
            href={hero.ctas.linkedin.href}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 h-10 px-5 rounded-md border border-border text-base font-medium text-foreground/80 hover:text-foreground hover:border-border/80 transition-colors"
          >
            <Linkedin className="w-3.5 h-3.5" /> {hero.ctas.linkedin.label}
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
        style={{ animationDelay: '0.6s' }}
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-border to-transparent" />
        <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">{hero.scrollLabel}</span>
      </div>
    </section>
  );
}
