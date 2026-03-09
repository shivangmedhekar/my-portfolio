'use client';

import { useState, useEffect, useRef } from 'react';
import { X, ArrowUpRight, ExternalLink, BriefcaseBusiness, MapPin, CalendarDays, ArrowDown } from 'lucide-react';
import siteData from '@/data.json';

interface Job {
  period: string;
  role: string;
  company: string;
  location: string;
  type: string;
  summary: string;
  bullets: string[];
  tech: string[];
  metrics: { label: string; value: string }[];
}

const { experience } = siteData;
const JOBS = experience.jobs as Job[];

function DevBackdrop() {
  const COMMAND_CHIPS = experience.backdrop.commandChips;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-12"
        style={{
          backgroundImage:
            'linear-gradient(to right, color-mix(in oklch, var(--color-border) 78%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--color-border) 78%, transparent) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 16%, black 82%, transparent)',
          maskImage: 'linear-gradient(to bottom, transparent, black 16%, black 82%, transparent)',
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(42% 35% at 18% 18%, color-mix(in oklch, var(--color-accent) 7%, transparent), transparent 72%), radial-gradient(36% 28% at 85% 72%, color-mix(in oklch, var(--color-accent) 6%, transparent), transparent 76%)',
        }}
      />

      <div className="hidden xl:flex absolute top-8 left-1/2 -translate-x-1/2 gap-2 flex-wrap justify-center max-w-[760px]">
        {COMMAND_CHIPS.map((chip) => (
          <span
            key={chip}
            className="rounded-md border border-border/35 bg-card/25 px-2.5 py-1 font-mono text-[11px] text-muted-foreground/65"
          >
            $ {chip}
          </span>
        ))}
      </div>

      <div className="hidden lg:block absolute top-16 left-10 w-[250px] rounded-xl border border-border/30 bg-card/20 p-3">
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground/80">ci status</p>
        <pre className="mt-2 font-mono text-[11px] leading-relaxed text-muted-foreground/75 whitespace-pre-wrap">
{experience.backdrop.ciStatus}
        </pre>
      </div>

      <div className="hidden lg:block absolute top-14 right-8 w-[340px] rounded-xl border border-border/30 bg-card/20 backdrop-blur-[1px] p-3">
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground/80">terminal</p>
        <pre className="mt-2 font-mono text-[11px] leading-relaxed text-muted-foreground/75 whitespace-pre-wrap">
{experience.backdrop.terminal}
        </pre>
      </div>

      <div className="hidden lg:block absolute bottom-20 right-12 w-[285px] rounded-xl border border-border/30 bg-card/20 p-3">
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground/80">service health</p>
        <pre className="mt-2 font-mono text-[11px] leading-relaxed text-muted-foreground/75 whitespace-pre-wrap">
{experience.backdrop.serviceHealth}
        </pre>
      </div>

      <div className="hidden md:block absolute bottom-14 left-8 w-[300px] rounded-xl border border-border/30 bg-card/20 p-3">
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground/80">api logs</p>
        <pre className="mt-2 font-mono text-[11px] leading-relaxed text-muted-foreground/75 whitespace-pre-wrap">
{experience.backdrop.apiLogs}
        </pre>
      </div>

      <div className="hidden md:block absolute bottom-10 left-1/2 -translate-x-1/2 w-[260px] rounded-full border border-border/35 bg-card/20 px-5 py-2 text-center">
        <span className="font-mono text-[11px] tracking-wider text-muted-foreground/80">
          {experience.backdrop.release}
        </span>
      </div>
    </div>
  );
}

function JobModal({ job, onClose }: { job: Job; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border/70 bg-card shadow-2xl scrollbar-hide animate-modal-in">
        <div className="h-1.5 w-full bg-gradient-to-r from-accent/70 via-accent to-accent/40" />

        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-card/95 backdrop-blur border-b border-border/60">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-sm text-muted-foreground uppercase tracking-widest">{job.period}</span>
            <span className="w-px h-3 bg-border" />
            <span className="text-sm text-muted-foreground">{job.type}</span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-7 h-7 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-6 space-y-7">
          <div>
            <h2 className="text-[22px] font-semibold text-foreground leading-snug">{job.role}</h2>
            <p className="mt-1 text-base text-foreground/80">{job.company} - {job.location}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-1">
            {job.metrics.map((m) => (
              <div key={m.label} className="rounded-lg border border-border/70 bg-muted/30 px-3 py-2">
                <span className="font-mono text-lg font-semibold text-accent block">{m.value}</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{m.label}</span>
              </div>
            ))}
          </div>

          <p className="text-base text-foreground/80 leading-relaxed">{job.summary}</p>

          <div className="space-y-2.5">
            <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest">Highlights</p>
            <ul className="space-y-3">
              {job.bullets.map((b, i) => (
                <li key={i} className="flex gap-3 text-base text-foreground/80 leading-relaxed">
                  <ArrowUpRight className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2.5">
            <p className="text-sm font-mono text-muted-foreground uppercase tracking-widest">Stack</p>
            <div className="flex flex-wrap gap-2">
              {job.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-md bg-muted/40 border border-border text-sm font-mono text-foreground/80 hover:bg-muted/70 transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function JobRow({ job, index, onClick }: { job: Job; index: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative w-full text-left"
    >
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-accent/0 via-accent/40 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[1px]" />
      <div className="relative rounded-2xl border border-border/70 bg-card/40 backdrop-blur-sm p-5 sm:p-6 hover:bg-card/80 hover:border-accent/40 transition-all duration-300">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5 text-sm font-mono uppercase tracking-wider">
              <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                <CalendarDays className="w-3.5 h-3.5" />
                {job.period}
              </span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                <BriefcaseBusiness className="w-3.5 h-3.5" />
                {job.type}
              </span>
            </div>

            <div>
              <p className="text-lg font-semibold text-foreground leading-snug group-hover:text-accent transition-colors">{job.role}</p>
              <p className="text-base text-foreground/80 mt-0.5 inline-flex items-center gap-1.5">
                {job.company}
                <span className="w-1 h-1 rounded-full bg-border" />
                <MapPin className="w-3.5 h-3.5" />
                {job.location}
              </p>
            </div>
          </div>

          <ExternalLink className="w-4 h-4 text-muted-foreground/70 group-hover:text-accent shrink-0 mt-1 transition-colors" />
        </div>

        <p className="mt-4 text-base text-foreground/80 leading-relaxed max-w-2xl">{job.summary}</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-4">
          {job.metrics.map((m) => (
            <span key={m.label} className="rounded-md border border-border/60 bg-muted/30 px-3 py-2">
              <span className="font-mono text-[13px] font-semibold text-accent block">{m.value}</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wide">{m.label}</span>
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {job.tech.slice(0, 5).map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-md bg-muted/40 border border-border/70 text-sm font-mono text-foreground/80"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-mono uppercase tracking-wider text-muted-foreground group-hover:text-accent transition-colors">
          {experience.openDetailsLabel}
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </button>
  );
}

export default function Experience() {
  const [activeJob, setActiveJob] = useState<Job | null>(null);

  return (
    <section id="experience" className="relative py-24 px-6 border-t border-border/40 overflow-hidden">
      <DevBackdrop />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(900px 360px at 80% 0%, color-mix(in oklch, var(--color-accent) 9%, transparent), transparent 70%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto">
        <div className="mb-12 space-y-2">
          <p className="font-mono text-sm text-muted-foreground uppercase tracking-[0.15em]">{experience.sectionLabel}</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">{experience.title}</h2>
          <p className="text-base text-muted-foreground max-w-2xl">
            {experience.description}
          </p>
        </div>

        <div className="relative">
          <div className="relative max-h-[72vh] overflow-y-auto pr-2 space-y-5">
            <div className="hidden sm:block absolute left-6 top-3 bottom-3 w-px bg-gradient-to-b from-accent/40 via-border to-transparent" />

            {JOBS.map((job, i) => (
              <div key={i} className="relative sm:pl-14">
                <div className="hidden sm:block absolute left-[21px] top-6 w-3 h-3 rounded-full border border-accent/50 bg-background shadow-[0_0_0_4px_color-mix(in_oklch,var(--color-accent)_16%,transparent)]" />
                <JobRow job={job} index={i} onClick={() => setActiveJob(job)} />
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background via-background/85 to-transparent" />
          <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/70 px-3 py-1 text-xs font-mono text-muted-foreground uppercase tracking-wider">
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            {experience.scrollHint}
          </div>
        </div>
      </div>

      {activeJob && <JobModal job={activeJob} onClose={() => setActiveJob(null)} />}
    </section>
  );
}
