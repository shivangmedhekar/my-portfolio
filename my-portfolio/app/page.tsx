'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import ChatBot from '@/components/ChatBot';
import SplashScreen from '@/components/SplashScreen';

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [splashPhase, setSplashPhase] = useState<'show' | 'exit' | 'hidden'>('show');

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute('href')!.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.classList.toggle('light', theme === 'light');
  }, [theme]);

  useEffect(() => {
    const tExit = setTimeout(() => setSplashPhase('exit'), 4600);
    const tHide = setTimeout(() => {
      setSplashPhase('hidden');
      // Force Safari to reflow the now-visible content so it doesn't
      // lazily rasterise sections as the user scrolls to them.
      requestAnimationFrame(() => {
        void document.body.offsetHeight;
      });
    }, 5400);
    return () => {
      clearTimeout(tExit);
      clearTimeout(tHide);
    };
  }, []);

  return (
    <>
      <SplashScreen phase={splashPhase} />

      <div
        className={`min-h-screen bg-background text-foreground overflow-x-hidden transition-opacity duration-500 ${
          splashPhase === 'show' ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <Header theme={theme} onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} />

        <main>
          <Hero />
          <Experience />
          <Education />
          <Projects />
          <Contact />
        </main>

      </div>

      <ChatBot isOpen={showChat} onToggle={() => setShowChat((s) => !s)} />
    </>
  );
}
