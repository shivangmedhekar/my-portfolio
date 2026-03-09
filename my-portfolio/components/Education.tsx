'use client';

import { GraduationCap, MapPin, CalendarDays, Sparkles } from 'lucide-react';
import siteData from '@/data.json';

const { education } = siteData;

function EducationBackdrop() {
  const TAGS = education.backdrop.tags;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-12"
        style={{
          backgroundImage:
            'linear-gradient(to right, color-mix(in oklch, var(--color-border) 76%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--color-border) 76%, transparent) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 14%, black 84%, transparent)',
          maskImage: 'linear-gradient(to bottom, transparent, black 14%, black 84%, transparent)',
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 35% at 12% 15%, color-mix(in oklch, var(--color-accent) 7%, transparent), transparent 72%), radial-gradient(42% 30% at 88% 78%, color-mix(in oklch, var(--color-accent) 6%, transparent), transparent 76%)',
        }}
      />

      <div className="hidden lg:block absolute top-14 left-8 w-[330px] rounded-xl border border-border/30 bg-card/20 p-3.5 backdrop-blur-[1px]">
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground/80">research notes</p>
        <pre className="mt-2 font-mono text-[11px] leading-relaxed text-muted-foreground/75 whitespace-pre-wrap">
{education.backdrop.researchNotes}
        </pre>
      </div>

      <div className="hidden lg:block absolute bottom-16 right-8 w-[340px] rounded-xl border border-border/30 bg-card/20 p-3.5 backdrop-blur-[1px]">
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground/80">coursework log</p>
        <pre className="mt-2 font-mono text-[11px] leading-relaxed text-muted-foreground/75 whitespace-pre-wrap">
{education.backdrop.courseworkLog}
        </pre>
      </div>

      <div className="hidden xl:flex absolute top-8 left-1/2 -translate-x-1/2 gap-2 flex-wrap justify-center max-w-[760px]">
        {TAGS.map((tag) => (
          <span key={tag} className="rounded-md border border-border/35 bg-card/25 px-2.5 py-1 font-mono text-[11px] text-muted-foreground/65">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Education() {
  return (
    <section id="education" className="relative py-24 px-6 border-t border-border/40 overflow-hidden">
      <EducationBackdrop />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(800px 300px at 20% 0%, color-mix(in oklch, var(--color-accent) 8%, transparent), transparent 70%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="mb-12 space-y-2">
          <p className="font-mono text-sm text-muted-foreground uppercase tracking-[0.15em]">{education.sectionLabel}</p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">{education.title}</h2>
          <p className="text-lg text-foreground/80 max-w-2xl">
            {education.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {education.items.map((edu, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/45 backdrop-blur-sm p-5 sm:p-6 group hover:border-accent/40 hover:bg-card/75 transition-colors duration-300"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent/50 via-accent to-accent/30 opacity-70" />
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 font-mono text-sm text-muted-foreground uppercase tracking-wider">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {edu.period}
                  </span>
                  <GraduationCap className="w-4 h-4 text-accent/80" />
                </div>

                <div>
                  <p className="text-xl font-semibold text-foreground leading-snug group-hover:text-accent transition-colors">
                    {edu.degree}
                  </p>
                  <p className="text-lg text-foreground/80 mt-0.5 inline-flex items-center gap-1.5">
                    {edu.school}
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <MapPin className="w-3.5 h-3.5" />
                    {edu.location}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-muted/50 border border-border/80 text-sm font-mono text-foreground/90">
                    {edu.focus}
                  </span>
                </div>

                <div className="space-y-2.5">
                  <p className="inline-flex items-center gap-1.5 text-sm font-mono text-muted-foreground uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    Highlights
                  </p>
                </div>

                <ul className="space-y-2">
                  {edu.highlights.map((h, i) => (
                    <li key={i} className="flex gap-3 text-base text-foreground/90 leading-relaxed">
                      <span className="mt-[8px] w-1.5 h-1.5 rounded-full bg-accent/70 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
