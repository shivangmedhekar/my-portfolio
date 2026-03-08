# ⚡ Quick Start Guide

## 🚀 Launch Your Portfolio in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📝 Customization (Most Important!)

### Update Your Information

#### 1. **Hero Section** (`components/Hero.tsx`)
Find and replace:
- "Shivang" → Your name
- "Medhekar" → Your last name
- Job title in the badge
- Bio text
- Tech stack array

#### 2. **Header Logo** (`components/Header.tsx`)
Change "SM" to your initials:
```tsx
<div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-primary...">
  SM  // ← Change this to your initials
</div>
```

#### 3. **Work Experience** (`components/Experience.tsx`)
Replace the 3 sample positions with your actual:
- Job title
- Company name
- Years worked
- Description
- Key technologies

#### 4. **Education** (`components/Education.tsx`)
Update:
- Your degrees
- Schools
- Graduation years
- GPA
- Focus areas

#### 5. **Projects** (`components/Projects.tsx`)
Replace with 6 of your best projects:
- Project name
- Description
- Technologies used
- GitHub link
- Demo link

#### 6. **Social Links** (`components/Socials.tsx`)
Update URLs:
```tsx
{ url: 'https://github.com/yourusername', ... }
{ url: 'https://linkedin.com/in/yourname', ... }
{ url: 'https://twitter.com/yourhandle', ... }
{ url: 'mailto:your@email.com', ... }
```

#### 7. **Metadata** (`app/layout.tsx`)
Update:
```tsx
title: 'Your Name | Your Title'
description: 'Your professional description here'
```

---

## 🎨 Optional Customization

### Change Colors
Edit `app/globals.css`:
```css
:root {
  --accent: oklch(0.55 0.25 200);      /* Change this for primary color */
  --primary: oklch(0.5 0.22 262.5);    /* Change this for secondary color */
}
```

### Adjust Animation Speed
In `app/globals.css`:
```css
@keyframes float {
  /* Increase 4s to 6s for slower animation */
  animation: float 4s ease-in-out infinite;
}
```

### Modify Section Spacing
Each section in `components/` uses:
```tsx
<section className="py-20 px-4">  {/* Adjust py-20 for spacing */}
```

---

## 📱 Test on Mobile

1. Open DevTools (F12)
2. Click mobile device toggle
3. Test on iPhone, Android sizes
4. Test on tablet sizes

---

## 🚀 Deploy to Vercel (Recommended)

### Option 1: Auto Deploy via GitHub
```bash
# 1. Push to GitHub
git push origin main

# 2. Go to vercel.com
# 3. Import your GitHub repository
# 4. Deploy with one click
```

### Option 2: Deploy via CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 3: Manual Build
```bash
# Build
npm run build

# Start production
npm start
```

---

## 🔗 Add Real Chatbot (Optional)

The chatbot currently simulates responses. To add real AI:

1. Create `/app/api/chat/route.ts`:
```typescript
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  const { messages } = await req.json();
  
  const result = await streamText({
    model: openai('gpt-4-turbo'),
    system: `You are Shivang's AI assistant. Help visitors learn about their background...`,
    messages,
  });

  return result.toDataStreamResponse();
}
```

2. Update `components/ChatBot.tsx` to use real API:
```tsx
import { useChat } from 'ai/react';

const { messages, input, handleInputChange, handleSubmit } = useChat({
  api: '/api/chat',
});
```

---

## 📊 Monitor Performance

### Before Deploying
```bash
# Check Lighthouse scores
npm run build
```

### After Deploying
1. Go to Vercel dashboard
2. Check "Analytics" tab
3. Monitor Core Web Vitals
4. Review page speed metrics

---

## 🎯 Final Checklist Before Launch

- [ ] Updated name and title
- [ ] Added all work experience
- [ ] Added education info
- [ ] Replaced projects with your work
- [ ] Updated social links
- [ ] Tested on mobile
- [ ] Tested in production build (`npm run build`)
- [ ] No console errors
- [ ] Deployed to Vercel or hosting

---

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

### Dependencies Won't Install
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
```

### Build Fails
```bash
# Check TypeScript
npm run type-check

# Check linting
npm run lint
```

### Styles Not Working
```bash
# Rebuild Tailwind
npm run build

# Clear cache
rm -rf .next
npm run dev
```

### Chatbot Not Working
- Check browser console (F12)
- Verify API endpoint exists
- Test with sample message
- Check network tab in DevTools

---

## 📚 Documentation

For more detailed info:
- **Design & Colors**: See `STYLE_GUIDE.md`
- **Full Customization**: See `PORTFOLIO_GUIDE.md`
- **Technical Details**: See `IMPLEMENTATION_NOTES.md`
- **Project Overview**: See `PROJECT_SUMMARY.md`

---

## 💡 Pro Tips

1. **Use Preview Mode**: Click version box to see live changes
2. **Mobile Testing**: Don't just test in browser DevTools
3. **Social Sharing**: Update Open Graph meta tags for nice previews
4. **Analytics**: Add Vercel Analytics to track visitors
5. **Backups**: Commit changes to Git regularly
6. **Updates**: Refresh project portfolio quarterly

---

## 🎉 You're Ready!

Your portfolio is production-ready. Just:

1. **Customize** with your info
2. **Test** on real devices
3. **Deploy** to Vercel
4. **Share** with the world

```
Good luck! Your portfolio looks amazing! 🚀✨
```

---

## 📞 Quick Links

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Lucide Icons**: https://lucide.dev/
- **Shadcn UI**: https://ui.shadcn.com/

---

**Version**: 1.0.0
**Status**: Ready to Launch 🚀
