# Shivang Medhekar - Portfolio Website

## Overview

A stunning, developer-themed portfolio website featuring:
- **Dark mode aesthetic** with cyan/purple AI-inspired color scheme
- **Interactive sections** showcasing professional work, education, and projects
- **AI-powered chatbot** ("Ask Shivang") for visitor engagement
- **Modern UI components** with smooth animations and transitions
- **Fully responsive design** optimized for all devices

## Project Structure

```
components/
├── Header.tsx           # Navigation header with sticky positioning
├── Hero.tsx            # Hero section with gradient text and animations
├── Experience.tsx      # Professional work history with timeline
├── Education.tsx       # Educational background and certifications
├── Projects.tsx        # Featured projects with tech stack
├── Socials.tsx         # Social links and footer
├── ChatBot.tsx         # Interactive AI assistant
└── SectionDivider.tsx  # Visual separator between sections

app/
├── page.tsx            # Main portfolio page
├── layout.tsx          # Root layout with metadata
└── globals.css         # Global styles, animations, and color tokens
```

## Color Palette

The design uses a carefully curated developer-themed color system:

- **Background**: Deep black (`#0f0f0f`)
- **Card**: Charcoal (`#1f1f1f`)
- **Foreground**: Near white (`#f7f7f7`)
- **Accent**: Electric cyan (`#00c8ff`) - primary AI accent
- **Primary**: Electric purple (`#8055f7`) - secondary accent
- **Muted**: Gray (`#404040`) - supporting text

## Key Features

### 1. **Dynamic Hero Section**
- Animated gradient text with floating background elements
- Tech stack badges with hover effects
- Call-to-action buttons with glow effects

### 2. **Experience Timeline**
- Vertical timeline with left-aligned accent lines
- Hover states reveal more detail
- Technology highlights with semantic badges

### 3. **Education Cards**
- Corner accent effects
- Detailed degree information
- Certification showcase

### 4. **Project Grid**
- 2-column responsive layout
- Tech stack display
- Links to GitHub and live demos
- Hover animations with accent glow

### 5. **Social Integration**
- Icon-based social links
- Multiple connection points
- Footer with quick navigation

### 6. **Ask Shivang Chatbot**
- Floating chat interface
- Message history with animations
- AI-simulated responses
- Suggested questions for first-time users
- Mobile-responsive floating button

## Customization

### Update Personal Information

1. **Header Logo**: Modify the SM initials in `components/Header.tsx`
2. **Hero Section**: Update name and bio in `components/Hero.tsx`
3. **Experience**: Add/edit work history in `components/Experience.tsx`
4. **Education**: Update degrees in `components/Education.tsx`
5. **Projects**: Showcase your work in `components/Projects.tsx`
6. **Social Links**: Update URLs in `components/Socials.tsx`

### Color Customization

Edit the color variables in `app/globals.css`:

```css
:root {
  --accent: oklch(0.55 0.25 200);      /* Cyan - Primary */
  --primary: oklch(0.5 0.22 262.5);    /* Purple - Secondary */
}
```

### Animation Speed

Modify animation values in `app/globals.css`:

```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}
```

## Technologies Used

- **Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS 4
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **Fonts**: Geist (Sans) + Geist Mono
- **Animations**: CSS Keyframes + Tailwind utilities

## Performance Optimizations

- Grid pattern background using CSS gradients (no images)
- Hardware-accelerated animations
- Lazy-loading sections
- Optimized font loading
- Smooth scroll behavior

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

This portfolio is optimized for deployment on Vercel:

1. Push to GitHub
2. Connect repository to Vercel
3. Deploy with zero configuration

## Contact Integration

To enable the chatbot with real AI responses, integrate with:

- **Vercel AI SDK** for LLM integration
- **OpenAI API** or similar for chat responses
- **Database** for persistent conversation history

## Future Enhancements

- [ ] Real AI backend integration
- [ ] Blog or articles section
- [ ] Dark/light mode toggle
- [ ] Testimonials from colleagues
- [ ] Speaking engagements timeline
- [ ] Open source contributions showcase
- [ ] Contact form with email integration

---

**Built with creativity and modern web technologies** ✨
