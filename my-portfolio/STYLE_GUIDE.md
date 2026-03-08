# 🎨 Shivang's Portfolio - Style Guide

## Color System

### Primary Colors
```
Accent (Cyan):   #00c8ff / oklch(0.55 0.25 200)
Primary (Purple): #8055f7 / oklch(0.5 0.22 262.5)
```

### Background & Text
```
Background:      #0f0f0f / oklch(0.06 0 0)
Card:            #1f1f1f / oklch(0.12 0 0)
Foreground:      #f7f7f7 / oklch(0.97 0 0)
Muted:           #404040 / oklch(0.25 0 0)
```

### Usage
- **Accent**: Primary buttons, important text, hover states, glows
- **Primary**: Secondary accents, gradients, decorative elements
- **Muted**: Supporting text, disabled states, placeholders
- **Foreground**: Main text, headings
- **Background/Card**: Surfaces, containers

---

## Typography

### Font Stack
```css
/* Body/Default */
font-family: "Geist", system-ui, sans-serif;

/* Code/Mono */
font-family: "Geist Mono", monospace;
```

### Heading Sizes
```
h1: 3.5rem / 56px (Mobile: 1.875rem / 30px)
h2: 2.25rem / 36px
h3: 1.25rem / 20px
p:  1rem / 16px
small: 0.875rem / 14px
```

### Font Weights
```
Body:       400
Semibold:   600
Bold:       700
Mono Bold:  500
```

### Line Heights
```
Heading: 1.2
Body:    1.6 (leading-relaxed)
```

---

## Spacing Scale

Tailwind default spacing scale used throughout:

```
xs: 0.5rem (8px)
sm: 0.75rem (12px)
1:  0.25rem (4px)
2:  0.5rem (8px)
3:  0.75rem (12px)
4:  1rem (16px)
6:  1.5rem (24px)
8:  2rem (32px)
12: 3rem (48px)
20: 5rem (80px)
```

### Common Patterns
```
Padding: p-4, p-6, p-8
Margin: m-4, mx-auto, mb-8
Gap: gap-2, gap-4, gap-6, gap-8
```

---

## Border Radius

```
Standard: 0.5rem (8px) - used on buttons, cards, inputs
Large:    1rem (16px)  - used on chat window
```

Applied via Tailwind classes:
```
rounded-lg    (8px)
rounded-xl    (12px)
rounded-2xl   (16px)
rounded-full  (circle)
```

---

## Shadows & Glows

### Glow Effects
```css
.glow-accent {
  box-shadow: 
    0 0 30px rgba(0, 200, 255, 0.2),
    inset 0 0 30px rgba(0, 200, 255, 0.05);
}

.glow-accent-sm {
  box-shadow: 0 0 15px rgba(0, 200, 255, 0.15);
}
```

### Used On
- Primary CTA buttons
- Chat window
- Project cards (hover)
- Interactive elements

### Hover States
Most interactive elements use:
```
opacity-90 hover:opacity-100 transition-opacity duration-300
```

---

## Animations

### Float Animation
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

.animate-float { animation: float 4s ease-in-out infinite; }
```

**Used on**: Background blob elements

### Pulse-Glow Animation
```css
@keyframes pulse-glow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
```

**Used on**: Status indicators, subtle accents

### Transitions
```
Standard duration: 300ms
Fast actions: 200ms
Slow reveals: 500ms-700ms
```

### Available Animations
- `animate-in` - Fade and slide in
- `animate-float` - Subtle vertical float
- `animate-pulse` - Built-in pulsing
- `animate-bounce` - Bouncing motion
- `animate-spin` - Rotation

---

## Components & Patterns

### Button Styles

#### Primary Button (Accent)
```tsx
<button className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition glow-accent">
  View My Work
</button>
```

#### Secondary Button
```tsx
<button className="px-8 py-3 border border-accent/50 text-accent rounded-lg font-medium hover:bg-accent/10 transition">
  Download CV
</button>
```

#### Link Button
```tsx
<a href="#" className="text-muted-foreground hover:text-accent transition">
  Link Text
</a>
```

### Card Styles

#### Standard Card
```tsx
<div className="border border-border rounded-xl p-6 bg-card/30 backdrop-blur hover:border-accent/50 transition-colors">
  Card content
</div>
```

#### Accent Border Card
```tsx
<div className="border border-border rounded-xl p-6 bg-card/30">
  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent via-primary to-transparent rounded-l-xl" />
</div>
```

### Badge Styles

#### Tech Badge
```tsx
<span className="px-3 py-1 rounded-full text-xs bg-accent/10 text-accent border border-accent/20">
  Technology
</span>
```

#### Highlight Badge
```tsx
<span className="px-4 py-2 rounded-full border border-accent/30 bg-accent/10 text-accent text-sm">
  Highlight Text
</span>
```

---

## Gradients

### Text Gradient (Hero Name)
```css
.text-gradient {
  background: linear-gradient(135deg, #00c8ff 0%, #a855f7 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Background Gradients
```
From transparent via accent:
bg-gradient-to-r from-transparent via-accent to-transparent

From accent to primary:
bg-gradient-to-br from-accent to-primary
```

---

## Hover States

### Standard Hover
```css
.element {
  transition: color 300ms, opacity 300ms;
}

.element:hover {
  color: var(--accent);
  opacity: 0.9;
}
```

### Border Hover
```css
border border-border hover:border-accent/50 transition-colors
```

### Scale Hover
```css
scale-100 hover:scale-110 transition-transform duration-300
```

### Glow Hover
```css
hover:shadow-lg hover:shadow-accent/10 transition-shadow
```

---

## Responsive Design

### Breakpoints
```
Mobile:  < 640px  (sm)
Tablet:  >= 640px (md) to 1024px (lg)
Desktop: >= 1024px (lg)
```

### Patterns
```tsx
{/* Hidden on mobile, visible on desktop */}
<nav className="hidden md:flex items-center gap-8">

{/* Stack on mobile, grid on desktop */}
<div className="grid md:grid-cols-2 gap-6">

{/* Responsive text */}
<h1 className="text-2xl sm:text-4xl lg:text-5xl">

{/* Responsive padding */}
<div className="px-4 sm:px-6 lg:px-8">
```

---

## Dark Mode

The entire site is designed with dark mode as default. The color system is built around this.

To switch to light mode (if implemented):
```
Update oklch color values in :root { }
Invert accent/muted relationships
Adjust opacity/backdrop-blur values
```

---

## Accessibility

### Color Contrast
- Text on backgrounds: 4.5:1 ratio (WCAG AA)
- Large text: 3:1 ratio
- Tested with contrast checker tools

### Focus States
```tsx
focus:outline-none focus:ring-2 focus:ring-accent
```

### ARIA Labels
```tsx
<button aria-label="Close chat">
  <X className="w-5 h-5" />
</button>
```

### Semantic HTML
- Use `<header>`, `<nav>`, `<section>`, `<footer>`
- Use `<h1>` through `<h6>` properly
- Use `<button>` for interactive elements
- Use `<a>` for navigation

---

## Custom Utilities

### Grid Pattern Background
```css
.grid-pattern {
  background-image: 
    linear-gradient(rgba(0, 200, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 200, 255, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
}
```

### Scrollbar Hide
```css
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
```

### Text Balance (for headings)
```tsx
<h2 className="text-balance">
  Long heading text that should wrap nicely
</h2>
```

---

## Icon Usage

### From Lucide React
All icons are from the lucide-react library:
```tsx
import { Send, X, MessageSquare, Github, Linkedin } from 'lucide-react';

<Send className="w-4 h-4 text-muted-foreground" />
```

### Icon Sizing
```
Small:  w-3 h-3 or w-4 h-4
Normal: w-5 h-5 or w-6 h-6
Large:  w-8 h-8 or w-12 h-12
```

### Icon Colors
```
Default:     text-foreground
Muted:       text-muted-foreground
Accent:      text-accent
On hover:    group-hover:text-accent
```

---

## Forms & Inputs

### Input Field
```tsx
<input
  type="text"
  className="px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-accent/50 transition"
  placeholder="Placeholder text"
/>
```

### Disabled State
```tsx
disabled:opacity-50 disabled:cursor-not-allowed
```

---

## Animation Timings

```
Fast:    200ms
Normal:  300ms
Slow:    500ms
Reveal:  700ms
```

### Easing Functions
```
Ease in-out: cubic-bezier(0.4, 0, 0.6, 1)
Ease out:    cubic-bezier(0.4, 0, 1, 1)
Linear:      linear
```

---

## Code Examples

### Hero Section Structure
```tsx
<section className="relative min-h-screen flex items-center justify-center px-4">
  {/* Background blobs */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="animate-float" />
  </div>
  
  {/* Content */}
  <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
    <h1 className="text-gradient">Title</h1>
    <p className="text-muted-foreground">Subtitle</p>
  </div>
</section>
```

### Card Component Pattern
```tsx
<div className="group border border-border rounded-xl p-6 bg-card/30 backdrop-blur hover:border-accent/50 transition-all duration-300">
  {/* Content */}
</div>
```

### Hover Animation Pattern
```tsx
<div className="group">
  <span className="group-hover:text-accent transition-colors">Text</span>
  <span className="group-hover:opacity-100 opacity-0 transition-opacity">Icon</span>
</div>
```

---

## Common Issues & Solutions

### Text Not Visible
- Check contrast ratio (4.5:1 minimum)
- Verify `text-foreground` class is applied
- Ensure background color is different enough

### Animation Stuttering
- Use `transform` instead of `top/left`
- Enable hardware acceleration with `transform3d`
- Avoid animating `width` or `height`

### Mobile Layout Issues
- Check responsive classes (md:, lg:, etc.)
- Test on real mobile devices
- Use `overflow-x-hidden` on body

### Blur Effects Not Working
- Ensure `backdrop-blur-md` is used with semi-transparent background
- Safari may need `-webkit-` prefix (handled by Tailwind)

---

## Best Practices

1. **Consistency**: Use the same spacing/colors throughout
2. **Accessibility**: Always include alt text and ARIA labels
3. **Performance**: Avoid unnecessary animations
4. **Mobile First**: Design mobile, enhance for desktop
5. **Testing**: Check on real devices and screen readers
6. **Documentation**: Keep this guide updated
7. **Reusability**: Create components for repeated patterns
8. **Semantics**: Use proper HTML elements

---

## Tools & Resources

- **Color Testing**: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- **Accessibility**: [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- **Icons**: [Lucide React Icons](https://lucide.dev/)
- **Fonts**: [Google Fonts](https://fonts.google.com/)
- **Tailwind**: [Tailwind CSS Docs](https://tailwindcss.com/)

---

**Last Updated**: 2024
**Version**: 1.0.0
**Status**: Production Ready ✅
