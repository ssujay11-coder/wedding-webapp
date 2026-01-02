# Elite Wedding Planner - World-Class Luxury Wedding Planning Website

![Elite Wedding Planner](https://www.eliteweddingplanner.in/wp-content/uploads/2024/05/EWP-LOGO-WEBP.webp)

A premium, SEO-optimized wedding planning website built with Next.js 16, React 19, and modern web technologies. Features 12 beautifully designed sections, comprehensive email integration, and next-generation image optimization.

## 🌟 Features

### Design & User Experience
- **12 Luxury Homepage Sections**: Hero, Stats, Authority Bar, Philosophy, Featured Weddings, Why Choose Us, Services, Process, Destinations, Testimonials, CTA, Instagram Feed
- **Responsive Design**: Mobile-first approach with smooth animations using Framer Motion
- **Premium Brand Identity**: Custom Elite Wedding Planner color palette (Rose #ee2b5b, Gold #d4af37)
- **Next-Gen Images**: AVIF primary format with WebP fallback for optimal performance
- **Custom Animations**: Fade-in-up, shimmer-gold, float, scale-subtle, bounce-gentle effects

### Navigation & Layout
- **Sticky Navigation**: Transparent-to-solid transition with dropdown menus for Destinations and Services
- **Luxury Footer**: 4-column dark theme (#221015) with social links and contact information
- **Logo Component**: Multi-variant (default/light/dark) responsive branding

### SEO & Performance
- **Comprehensive SEO**: Meta tags, Open Graph, Twitter Cards, Schema.org JSON-LD
- **Sitemap Generation**: Automated XML sitemap with priority and changefreq configuration
- **Robots.txt**: Optimized for search engine crawling
- **Google Analytics Ready**: Integration points for GA4
- **Image Optimization**: Sharp + Plaiceholder for blur placeholders and lazy loading

### Email System
- **Resend Integration**: Beautiful HTML email templates with React Email
- **Dual Emails**: Client confirmation + Admin notification
- **Professional Templates**: Branded emails with Elite color scheme
- **Form Integration**: 6-step lead wizard with email automation

### Technical Stack
- **Framework**: Next.js 16.1.1 (App Router)
- **React**: 19.2.3
- **TypeScript**: 5.x with strict mode
- **Styling**: Tailwind CSS v4 with custom theme
- **Animations**: Framer Motion 12
- **Database**: Supabase
- **Email**: Resend + React Email
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or later
- npm or yarn
- Supabase account (for database)
- Resend account (for emails)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/elite-wedding-planner.git
   cd wedding-planner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your keys:
   ```env
   RESEND_API_KEY=re_your_api_key
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ANTHROPIC_API_KEY=sk-ant-your-api-key
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 📁 Project Structure

```
wedding-planner/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with SEO metadata
│   │   ├── page.tsx             # Enhanced 12-section homepage
│   │   ├── globals.css          # Custom animations & theme
│   │   └── api/
│   │       └── send-inquiry/    # Email API endpoint
│   ├── components/
│   │   ├── layout/
│   │   │   ├── navbar.tsx       # Luxury nav with dropdowns
│   │   │   ├── footer.tsx       # Dark theme footer
│   │   │   └── logo.tsx         # Multi-variant logo
│   │   └── home/
│   │       ├── hero-section.tsx
│   │       ├── as-seen-in.tsx
│   │       ├── featured-weddings.tsx
│   │       ├── signature-process.tsx
│   │       ├── why-choose-us.tsx
│   │       ├── destinations-showcase.tsx
│   │       ├── services-highlight.tsx
│   │       ├── client-testimonials.tsx
│   │       ├── cta-section.tsx
│   │       └── instagram-feed.tsx
│   └── lib/
│       └── supabase/            # Database client
├── emails/
│   ├── inquiry-confirmation.tsx
│   └── admin-notification.tsx
├── public/
│   ├── robots.txt
│   └── images/
├── next-sitemap.config.js       # Sitemap configuration
└── package.json
```

## 🎨 Design System

### Color Palette
- **Primary Rose**: `#ee2b5b` (oklch: 0.60 0.22 15)
- **Secondary Gold**: `#d4af37` (oklch: 0.78 0.14 85)
- **Background Light**: `oklch(0.99 0.005 85)`
- **Dark Theme**: `#221015` (oklch: 0.15 0.02 15)

### Typography
- **Display/Headings**: Playfair Display (serif)
- **Body Text**: Plus Jakarta Sans (sans-serif)
- **Weights**: 300, 400, 500, 600, 700

### Custom Animations
- `fade-in-up`: Entry animation (0.8s)
- `shimmer-gold`: Gold shimmer effect (3s infinite)
- `float`: Gentle floating (3s infinite)
- `scale-subtle`: Subtle scaling (2s infinite)
- `bounce-gentle`: Soft bounce (2s infinite)

## 📧 Email Templates

Two beautifully designed email templates:

### Client Confirmation Email
- Elite branding with logo
- Inquiry details summary
- Next steps timeline
- Portfolio CTA
- Social media links

### Admin Notification Email
- Urgent notification styling
- Complete client information
- Quick reply CTA
- Submission timestamp

## 🔧 Configuration

### Next.js Image Optimization
```typescript
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
}
```

### Sitemap Generation
Automated sitemap generation with custom priorities:
- Homepage: 1.0 (daily)
- Destinations: 0.9 (weekly)
- Services: 0.9 (weekly)
- Portfolio: 0.8 (weekly)

## 📱 Pages Overview

### Homepage (12 Sections)
1. **Hero**: Full-screen luxury wedding imagery with animated CTA
2. **Stats Bar**: 200+ weddings, 14 years, 6 destinations, award-winning
3. **As Seen In**: Authority bar with publication logos
4. **Philosophy**: Brand story and approach
5. **Featured Weddings**: Mosaic grid of destination weddings
6. **Why Choose Us**: 6 value propositions with icons
7. **Services Highlight**: 4 comprehensive service offerings
8. **Signature Process**: 4-step planning methodology
9. **Destinations Showcase**: Goa, Udaipur, Jaipur, Dubai
10. **Client Testimonials**: 3 real couple stories with ratings
11. **CTA Section**: Primary conversion point
12. **Instagram Feed**: Social proof grid

### Other Pages
- **/destinations**: Destination hub (planned)
- **/services**: Service details (planned)
- **/portfolio**: Wedding gallery (planned)
- **/about**: Team information (planned)
- **/contact**: Lead wizard form (implemented)

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel --prod
```

### Environment Variables
Set these in your deployment platform:
- `RESEND_API_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `ANTHROPIC_API_KEY`
- `SITE_URL`

## 📊 Performance

- **Lighthouse Score**: 95+ (target)
- **Core Web Vitals**: Optimized
- **Image Optimization**: AVIF/WebP with lazy loading
- **Bundle Size**: Optimized with code splitting

## 🤝 Contributing

This is a proprietary project for Elite Wedding Planner. For inquiries, contact sales@eliteweddingplanner.in.

## 📄 License

© 2011-2026 Elite Wedding Planner. All rights reserved.

## 📞 Support

- **Email**: sales@eliteweddingplanner.in
- **Phone**: +91-8169255519
- **Website**: https://eliteweddingplanner.in
- **Instagram**: [@eliteweddingplanner](https://instagram.com/eliteweddingplanner)

---

**Built with ❤️ using Next.js, React, and modern web technologies**
