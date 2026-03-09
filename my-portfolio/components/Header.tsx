'use client';

import { Sun, Moon, Menu, X } from 'lucide-react';
import { useState } from 'react';
import siteData from '@/data.json';

const { header } = siteData;
const [brandName, brandTld = 'dev'] = header.brand.split('.');

export default function Header({
  theme,
  onToggleTheme,
}: {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 h-14 flex items-center backdrop-blur-md bg-background/80 border-b border-border/60 [will-change:transform]">

      <div className="relative w-full max-w-5xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="font-mono text-base font-semibold text-foreground tracking-tight">
            {brandName}<span className="text-accent">.</span>{brandTld}
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {header.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-base text-muted-foreground hover:text-foreground transition-colors duration-150 font-medium"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-border/60 transition-colors"
          >
            {theme === 'dark'
              ? <Sun className="w-[15px] h-[15px]" />
              : <Moon className="w-[15px] h-[15px]" />}
          </button>

          <a
            href="#contact"
            className="hidden sm:inline-flex items-center h-9 px-3.5 rounded-md bg-accent text-accent-foreground text-base font-medium hover:opacity-90 transition-opacity"
          >
            {header.contactCta}
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-border/60 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-14 inset-x-0 border-b border-border/60 bg-background/95 backdrop-blur-md px-6 py-4 flex flex-col gap-2 md:hidden">
          {header.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="py-2 text-base text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="mt-2 w-fit inline-flex items-center h-9 px-4 rounded-md bg-accent text-accent-foreground text-base font-medium"
          >
            {header.contactCta}
          </a>
        </div>
      )}
    </header>
  );
}
