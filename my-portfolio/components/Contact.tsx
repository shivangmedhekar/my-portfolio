'use client';

import { Mail, Linkedin, Github, Twitter, Link, Copy, Check, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import siteData from '@/data.json';

const { contact } = siteData;

const SOCIAL_ICONS = {
  github: Github,
  twitter: Twitter,
  linkedin: Linkedin,
} as const;

function ContactBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg viewBox="0 0 1200 620" className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
        <defs>
          <linearGradient id="contact-ai-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="color-mix(in oklch, var(--color-border) 70%, transparent)" />
            <stop offset="100%" stopColor="color-mix(in oklch, var(--color-accent) 48%, transparent)" />
          </linearGradient>
        </defs>

        <path d="M90 120 L280 190 L470 140 L640 220 L830 180 L1080 250" stroke="url(#contact-ai-line)" strokeWidth="1.6" fill="none" />
        <path d="M120 320 L310 260 L510 330 L690 280 L890 360 L1090 320" stroke="url(#contact-ai-line)" strokeWidth="1.6" fill="none" />
        <path d="M80 470 L260 410 L450 500 L640 430 L840 510 L1060 450" stroke="url(#contact-ai-line)" strokeWidth="1.6" fill="none" />

        {[
          [90, 120], [280, 190], [470, 140], [640, 220], [830, 180], [1080, 250],
          [120, 320], [310, 260], [510, 330], [690, 280], [890, 360], [1090, 320],
          [80, 470], [260, 410], [450, 500], [640, 430], [840, 510], [1060, 450],
        ].map(([x, y], i) => (
          <circle key={`${x}-${y}-${i}`} cx={x} cy={y} r="5" fill="color-mix(in oklch, var(--color-accent) 58%, transparent)" />
        ))}
      </svg>

      <div className="hidden lg:block absolute top-10 right-10 rounded-md border border-border/35 bg-card/20 px-3 py-1.5 font-mono text-xs text-muted-foreground/70">
        {contact.backdrop.model}
      </div>
      <div className="hidden lg:block absolute bottom-10 left-10 rounded-md border border-border/35 bg-card/20 px-3 py-1.5 font-mono text-xs text-muted-foreground/70">
        {contact.backdrop.embeddings}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/55" />
    </div>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-24 px-6 border-t border-border/40 overflow-hidden">
      <ContactBackdrop />
        <div className="relative max-w-3xl mx-auto space-y-12">

        {/* Headline */}
        <div className="space-y-1">
          <p className="font-mono text-sm text-muted-foreground uppercase tracking-[0.15em]">
            {contact.sectionLabel}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight">{contact.title}</h2>
          <p className="text-lg text-foreground/80 max-w-md pt-1 leading-relaxed">
            {contact.description}
          </p>
        </div>

        {/* Primary contact options */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Email */}
          <div className="flex-1 flex flex-col gap-4 p-5 rounded-lg border border-border bg-card/40 hover:border-border/80 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-muted">
                <Mail className="w-4 h-4 text-foreground" />
              </div>
              <div>
                <p className="text-sm font-mono text-muted-foreground uppercase tracking-wider">Email</p>
                <p className="text-base font-medium text-foreground mt-0.5">{contact.email}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <a
                href={`mailto:${contact.email}`}
                className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-md bg-accent text-accent-foreground text-base font-medium hover:opacity-90 transition-opacity"
              >
                Send Email
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <button
                onClick={copyEmail}
                className="flex items-center gap-1.5 h-9 px-3 rounded-md border border-border text-base text-muted-foreground hover:text-foreground hover:border-border/80 transition-colors"
                aria-label="Copy email address"
              >
                {copied
                  ? <Check className="w-3.5 h-3.5 text-emerald-400" />
                  : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* LinkedIn */}
          <div className="flex-1 flex flex-col gap-4 p-5 rounded-lg border border-border bg-card/40 hover:border-border/80 transition-colors">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-muted">
                <Linkedin className="w-4 h-4 text-foreground" />
              </div>
              <div>
                <p className="text-sm font-mono text-muted-foreground uppercase tracking-wider">LinkedIn</p>
                <p className="text-base font-medium text-foreground mt-0.5">{contact.linkedIn.name}</p>
              </div>
            </div>
            <a
              href={contact.linkedIn.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 h-9 rounded-md bg-[#0A66C2] text-white text-base font-medium hover:opacity-90 transition-opacity"
            >
              Connect
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Other socials — minimal text list */}
        <div className="flex flex-col gap-1 border-t border-border/40 pt-8">
          {contact.socials.map(({ label, href, handle, icon }) => {
            const Icon = SOCIAL_ICONS[icon as keyof typeof SOCIAL_ICONS] ?? Link;
            return (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between py-3 border-b border-border/40 last:border-0 hover:text-foreground transition-colors"
            >
              <span className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="text-base font-medium text-foreground/85 group-hover:text-foreground transition-colors">
                  {label}
                </span>
              </span>
              <span className="flex items-center gap-1 font-mono text-sm text-muted-foreground">
                {handle}
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </span>
            </a>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-border/40">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-base text-muted-foreground">{contact.availability}</span>
          </div>
          <p className="font-mono text-sm text-muted-foreground">
            {contact.copyright}
          </p>
        </div>
      </div>
    </section>
  );
}
