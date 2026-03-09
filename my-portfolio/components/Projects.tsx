'use client';

import { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import siteData from '@/data.json';

const { projects } = siteData;
const PROJECTS = projects.items;

function ProjectsBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg viewBox="0 0 300 640" className="hidden lg:block absolute left-0 top-0 h-full w-[24%] opacity-30" preserveAspectRatio="none">
        <defs>
          <linearGradient id="git-main-left" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="color-mix(in oklch, var(--color-accent) 60%, transparent)" />
            <stop offset="100%" stopColor="color-mix(in oklch, var(--color-accent) 40%, transparent)" />
          </linearGradient>
          <linearGradient id="git-branch-a-left" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="color-mix(in oklch, var(--color-border) 55%, transparent)" />
            <stop offset="100%" stopColor="color-mix(in oklch, var(--color-accent) 45%, transparent)" />
          </linearGradient>
          <linearGradient id="git-branch-b-left" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="color-mix(in oklch, var(--color-border) 52%, transparent)" />
            <stop offset="100%" stopColor="color-mix(in oklch, var(--color-accent) 42%, transparent)" />
          </linearGradient>
        </defs>

        <path d="M150 70 L150 600" stroke="url(#git-main-left)" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M70 160 L70 300 L150 360" stroke="url(#git-branch-a-left)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M235 250 L235 350 L150 420" stroke="url(#git-branch-b-left)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M30 360 L30 460 L150 540" stroke="url(#git-branch-b-left)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {[
          [150, 110], [150, 170], [150, 230], [150, 290], [150, 360], [150, 420], [150, 490], [150, 540],
          [70, 210], [70, 270], [70, 300],
          [235, 280], [235, 330], [235, 350],
          [30, 390], [30, 440], [30, 460],
        ].map(([x, y], i) => (
          <circle key={`l-${x}-${y}-${i}`} cx={x} cy={y} r={4.8} fill="color-mix(in oklch, var(--color-accent) 58%, transparent)" />
        ))}
        {[ [150, 360], [150, 420], [150, 540] ].map(([x, y], i) => (
          <circle
            key={`lm-${x}-${y}-${i}`}
            cx={x}
            cy={y}
            r={7}
            fill="none"
            stroke="color-mix(in oklch, var(--color-accent) 70%, transparent)"
            strokeWidth="1.5"
          />
        ))}
      </svg>

      <svg viewBox="0 0 300 640" className="hidden lg:block absolute right-0 top-0 h-full w-[24%] opacity-30" preserveAspectRatio="none">
        <defs>
          <linearGradient id="activity-line-right" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="color-mix(in oklch, var(--color-border) 50%, transparent)" />
            <stop offset="100%" stopColor="color-mix(in oklch, var(--color-accent) 48%, transparent)" />
          </linearGradient>
          <linearGradient id="activity-bar-right" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="color-mix(in oklch, var(--color-accent) 56%, transparent)" />
            <stop offset="100%" stopColor="color-mix(in oklch, var(--color-accent) 28%, transparent)" />
          </linearGradient>
        </defs>

        {[ 
          [44, 110, 36], [78, 110, 62], [112, 110, 26], [146, 110, 76], [180, 110, 44], [214, 110, 68], [248, 110, 30],
          [44, 215, 52], [78, 215, 30], [112, 215, 70], [146, 215, 42], [180, 215, 56], [214, 215, 34], [248, 215, 66],
          [44, 320, 28], [78, 320, 54], [112, 320, 38], [146, 320, 72], [180, 320, 32], [214, 320, 60], [248, 320, 40],
          [44, 425, 46], [78, 425, 36], [112, 425, 58], [146, 425, 30], [180, 425, 64], [214, 425, 40], [248, 425, 52],
        ].map(([x, y, h], i) => (
          <rect key={`bar-${x}-${y}-${i}`} x={x} y={y - h} width="16" height={h} rx="3" fill="url(#activity-bar-right)" />
        ))}

        {[
          'M34 150 C92 178, 126 190, 190 214 S254 246, 280 280',
          'M30 252 C88 272, 138 300, 196 328 S252 360, 282 394',
          'M36 360 C94 390, 144 420, 196 454 S248 492, 280 532',
        ].map((d, i) => (
          <path key={`flow-${i}`} d={d} stroke="url(#activity-line-right)" strokeWidth="2.1" fill="none" strokeLinecap="round" />
        ))}

        {[
          [58, 170], [104, 188], [156, 206], [210, 232], [246, 252],
          [64, 286], [126, 312], [174, 336], [226, 364], [258, 382],
          [70, 404], [132, 438], [186, 470], [236, 500], [266, 522],
        ].map(([x, y], i) => (
          <circle key={`node-${x}-${y}-${i}`} cx={x} cy={y} r="4.2" fill="color-mix(in oklch, var(--color-accent) 62%, transparent)" />
        ))}
      </svg>

      <div className="hidden lg:block absolute top-10 left-10 font-mono text-xs text-muted-foreground/80 tracking-wide">
        git log --graph --oneline
      </div>
      <div className="hidden lg:block absolute top-10 right-10 font-mono text-xs text-muted-foreground/80 tracking-wide">
        commit activity
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/15 via-transparent to-background/35" />
      <div className="hidden lg:block absolute left-[24%] right-[24%] top-0 bottom-0 bg-background/88" />
    </div>
  );
}

export default function Projects() {
  const PROJECTS_PER_PAGE = projects.projectsPerPage;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(PROJECTS.length / PROJECTS_PER_PAGE));

  const pagedProjects = useMemo(() => {
    const start = (page - 1) * PROJECTS_PER_PAGE;
    return PROJECTS.slice(start, start + PROJECTS_PER_PAGE);
  }, [page]);
  const emptySlots = Math.max(0, PROJECTS_PER_PAGE - pagedProjects.length);

  return (
    <section id="projects" className="relative py-24 px-6 border-t border-border/40 overflow-hidden">
      <ProjectsBackdrop />
      <div className="relative max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-10 space-y-1 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
          <p className="font-mono text-sm text-muted-foreground uppercase tracking-[0.15em]">
            {projects.sectionLabel}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight">{projects.title}</h2>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 auto-rows-fr gap-px bg-border/40 border border-border/40 rounded-lg overflow-hidden min-h-[520px]">
          {pagedProjects.map((p, idx) => (
            <a
              key={idx}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 p-5 bg-background hover:bg-card transition-colors duration-150 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both min-h-[250px]"
              style={{ animationDelay: `${0.08 + idx * 0.05}s` }}
            >
              {/* Title */}
              <div className="flex items-start justify-between gap-2">
                <p className="text-base font-semibold text-foreground group-hover:text-accent transition-colors leading-snug">
                  {p.title}
                </p>
              </div>

              {/* Description */}
              <p className="text-base text-foreground/80 leading-relaxed flex-1">{p.desc}</p>

              {/* Footer: tech + arrow */}
              <div className="flex items-end justify-between gap-2 pt-1">
                <div className="flex flex-wrap gap-1">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="px-1.5 py-0.5 rounded-sm bg-muted/30 border border-border/60 text-xs font-mono text-foreground/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent transition-colors shrink-0" />
              </div>
            </a>
          ))}

          {Array.from({ length: emptySlots }).map((_, idx) => (
            <div
              key={`empty-${idx}`}
              className="min-h-[250px] bg-background/35 border border-transparent"
              aria-hidden="true"
            />
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="h-9 px-3 rounded-md border border-border bg-card/50 text-sm font-medium text-foreground/85 hover:text-foreground hover:border-border/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNumber = i + 1;
              const active = pageNumber === page;
              return (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  aria-label={`Go to page ${pageNumber}`}
                  className={`h-8 min-w-8 px-2 rounded-md text-sm font-mono border transition-colors ${
                    active
                      ? 'bg-accent text-accent-foreground border-accent/70'
                      : 'bg-card/40 text-muted-foreground border-border hover:text-foreground hover:border-border/90'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="h-9 px-3 rounded-md border border-border bg-card/50 text-sm font-medium text-foreground/85 hover:text-foreground hover:border-border/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
