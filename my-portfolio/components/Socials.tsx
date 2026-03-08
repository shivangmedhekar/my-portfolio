'use client';

import { Github, Linkedin, Twitter, Mail, ExternalLink } from 'lucide-react';

export default function Socials() {
  const socials = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com',
      color: 'hover:text-white',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com',
      color: 'hover:text-blue-400',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://twitter.com',
      color: 'hover:text-cyan-400',
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:shivang@example.com',
      color: 'hover:text-accent',
    },
  ];

  return (
    <section id="socials" className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* CTA Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left content */}
          <div className="space-y-6">
            <h2 className="text-4xl sm:text-5xl font-bold">Let's Build Something Great</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you're looking to discuss a project, explore collaboration opportunities, or just want to chat about AI and engineering, 
              I'm always open to meaningful conversations.
            </p>
            <p className="text-muted-foreground">
              Feel free to reach out through any of the channels below.
            </p>
          </div>

          {/* Social links grid */}
          <div className="grid grid-cols-2 gap-4">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-6 rounded-xl border border-border bg-card/30 backdrop-blur hover:border-accent/50 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity" />
                  <div className="relative flex flex-col items-center gap-3 text-center">
                    <Icon className={`w-8 h-8 text-muted-foreground ${social.color} transition-colors`} />
                    <span className="text-sm font-medium group-hover:text-accent transition-colors">{social.name}</span>
                    <ExternalLink className="w-3 h-3 text-muted-foreground/50 group-hover:text-accent/50 transition-colors" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-border/50">
          {/* Column 1 - About */}
          <div className="space-y-3">
            <h3 className="font-bold text-lg">About</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Senior full-stack engineer passionate about building scalable systems and AI-powered solutions.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div className="space-y-3">
            <h3 className="font-bold text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#experience" className="text-muted-foreground hover:text-accent transition">
                  Experience
                </a>
              </li>
              <li>
                <a href="#projects" className="text-muted-foreground hover:text-accent transition">
                  Projects
                </a>
              </li>
              <li>
                <a href="#education" className="text-muted-foreground hover:text-accent transition">
                  Education
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Status */}
          <div className="space-y-3">
            <h3 className="font-bold text-lg">Status</h3>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-muted-foreground">Open for opportunities</span>
            </div>
            <p className="text-xs text-muted-foreground/60">Based in San Francisco, CA</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border/50 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 Shivang Medhekar. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-accent transition">
              Privacy
            </a>
            <a href="#" className="hover:text-accent transition">
              Terms
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
