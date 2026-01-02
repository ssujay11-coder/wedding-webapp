# Improvement Implementation Plan V1
## Elite Wedding Planner - Comprehensive Enhancement Strategy

**Created:** January 2, 2026
**Version:** 1.0
**Objective:** Transform the wedding webapp into a world-class luxury platform

---

# Executive Summary

This plan provides **50+ actionable improvements** organized by priority, with implementation details and estimated effort levels. Each suggestion includes specific code locations and technical approaches.

---

# Priority Matrix

| Priority | Impact | Effort | Timeline |
|----------|--------|--------|----------|
| **P0 - Critical** | High | Low-Medium | Immediate |
| **P1 - High** | High | Medium | Week 1-2 |
| **P2 - Medium** | Medium | Medium | Week 3-4 |
| **P3 - Low** | Medium-Low | High | Month 2+ |

---

# SECTION 1: CRITICAL FIXES (P0)

## 1.1 Portfolio Page Enhancement

**Current Issues in `src/app/portfolio/page.tsx`:**
- Uses `<img>` instead of Next.js `<Image>` (no optimization)
- No footer component
- No lightbox/modal for image viewing
- No filtering by category
- Static hardcoded data

**Implementation:**
```tsx
// Replace <img> with optimized <Image>
import Image from "next/image";

// Add filterable categories
const categories = ["All", "Wedding", "Decor", "Ceremony", "Portrait"];

// Add lightbox modal for full-screen viewing
// Add masonry grid with better layout
// Move gallery data to src/data/portfolio.ts
```

**Files to modify:**
- `src/app/portfolio/page.tsx` - Complete rewrite
- Create `src/data/portfolio.ts` - Gallery data
- Create `src/components/portfolio/gallery-modal.tsx` - Lightbox

**Effort:** Medium (4-6 hours)

---

## 1.2 Missing Footer on Pages

**Issue:** Several pages missing footer component

**Files affected:**
- `src/app/portfolio/page.tsx` - No footer
- Check all pages for consistency

**Fix:**
```tsx
import { Footer } from "@/components/layout/footer";

// Add at end of page JSX
<Footer />
```

**Effort:** Low (30 minutes)

---

## 1.3 Image Optimization Across All Components

**Current Issues:**
- Multiple components use `<img>` instead of `<Image>`
- No blur placeholders on some images
- Missing lazy loading

**Components to audit:**
- `src/components/home/hero-section.tsx`
- `src/components/home/featured-weddings.tsx`
- `src/components/home/destinations-showcase.tsx`
- `src/app/portfolio/page.tsx`

**Solution:**
```tsx
import Image from "next/image";

<Image
  src={imageSrc}
  alt={descriptiveAlt}
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  placeholder="blur"
  blurDataURL={blurHash}
  loading="lazy"
/>
```

**Effort:** Medium (3-4 hours)

---

## 1.4 Accessibility Improvements

**Current Issues:**
- Dropdown menus lack keyboard navigation
- Missing ARIA labels on interactive elements
- Low color contrast in some areas
- No skip-to-content link

**Priority Fixes:**
```tsx
// 1. Add keyboard navigation to mega-menu.tsx
onKeyDown={(e) => {
  if (e.key === 'Enter' || e.key === ' ') toggleMenu();
  if (e.key === 'Escape') closeMenu();
}}

// 2. Add ARIA labels
<button aria-label="Open navigation menu" aria-expanded={isOpen}>

// 3. Add skip link in layout.tsx
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

**Effort:** Medium (2-3 hours)

---

# SECTION 2: HIGH PRIORITY IMPROVEMENTS (P1)

## 2.1 Enhanced SEO Implementation

### 2.1.1 Structured Data (JSON-LD)

**Add to `src/app/layout.tsx`:**
```tsx
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WeddingEventPlanningService",
  "name": "Elite Wedding Planner",
  "description": "Luxury destination wedding planners in India",
  "url": "https://eliteweddingplanner.in",
  "logo": "https://eliteweddingplanner.in/logo.png",
  "priceRange": "$$$$",
  "areaServed": ["India", "Dubai", "Thailand"],
  "telephone": "+91-XXXXXXXXXX",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Mumbai",
    "addressCountry": "IN"
  },
  "sameAs": [
    "https://instagram.com/eliteweddingplanner",
    "https://facebook.com/eliteweddingplanner"
  ]
};

// Add in <head>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
/>
```

### 2.1.2 FAQ Schema for Service Pages

**Add to each service page:**
```tsx
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};
```

### 2.1.3 Breadcrumb Navigation

**Create `src/components/ui/breadcrumbs.tsx`:**
```tsx
interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
      <ol className="flex items-center gap-2" itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((item, i) => (
          <li key={i} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            {item.href ? (
              <Link href={item.href} itemProp="item">
                <span itemProp="name">{item.label}</span>
              </Link>
            ) : (
              <span itemProp="name">{item.label}</span>
            )}
            <meta itemProp="position" content={String(i + 1)} />
          </li>
        ))}
      </ol>
    </nav>
  );
}
```

**Effort:** Medium (4-5 hours)

---

## 2.2 Performance Optimization

### 2.2.1 Code Splitting & Bundle Optimization

**Update `next.config.ts`:**
```ts
const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
    },
  },
};
```

### 2.2.2 Image CDN Configuration

**Update `next.config.ts`:**
```ts
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 31536000, // 1 year
  dangerouslyAllowSVG: true,
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
}
```

### 2.2.3 Font Optimization

**Update font loading in `layout.tsx`:**
```tsx
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
  preload: true,
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
  preload: true,
});
```

**Effort:** Low (2-3 hours)

---

## 2.3 User Experience Enhancements

### 2.3.1 Loading States & Skeletons

**Create `src/components/ui/skeleton.tsx`:**
```tsx
export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn(
      "animate-pulse rounded-md bg-muted",
      className
    )} />
  );
}

export function CardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}
```

### 2.3.2 Error Boundaries

**Create `src/components/error-boundary.tsx`:**
```tsx
'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-8 text-center">
          <h2>Something went wrong</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
```

### 2.3.3 Toast Notifications

**Install and configure toast system:**
```bash
npm install sonner
```

**Add to `layout.tsx`:**
```tsx
import { Toaster } from 'sonner';

<Toaster
  position="bottom-right"
  toastOptions={{
    style: {
      background: 'var(--background)',
      border: '1px solid var(--border)',
    },
  }}
/>
```

**Effort:** Medium (3-4 hours)

---

## 2.4 Enhanced Contact Form

### 2.4.1 Form Validation Feedback

**Update form components with real-time validation:**
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid Indian mobile number'),
  // ...
});

// Show inline errors
{errors.email && (
  <span className="text-sm text-destructive mt-1">
    {errors.email.message}
  </span>
)}
```

### 2.4.2 Calendar Date Picker

**Install and add calendar:**
```bash
npm install @radix-ui/react-popover @radix-ui/react-calendar date-fns
```

**Create date picker component for wedding date selection**

**Effort:** Medium (3-4 hours)

---

# SECTION 3: MEDIUM PRIORITY (P2)

## 3.1 New Interactive Features

### 3.1.1 Venue Comparison Tool

**Create `src/app/tools/compare/page.tsx`:**
- Side-by-side comparison of up to 3 venues
- Feature checklist comparison
- Price range comparison
- Location map view

### 3.1.2 Wedding Style Quiz

**Create `src/app/tools/quiz/page.tsx`:**
- 5-7 question personality quiz
- AI-powered venue recommendations
- Shareable results
- Lead capture integration

### 3.1.3 Guest List Preview Tool

**Create `src/app/tools/guest-list/page.tsx`:**
- Free tier: 50 guests
- Table assignment preview
- RSVP tracking demo
- Export to spreadsheet

**Effort:** High (10-15 hours each)

---

## 3.2 Content Enhancements

### 3.2.1 Real Wedding Stories

**Create `src/data/real-weddings/` directory:**
```typescript
interface RealWedding {
  id: string;
  coupleNames: string;
  weddingDate: string;
  venue: string;
  location: string;
  guestCount: number;
  services: string[];
  story: string;
  testimonial: string;
  images: string[];
  videoUrl?: string;
  featured: boolean;
}
```

**Create 10+ real wedding story pages**

### 3.2.2 Video Testimonials

**Add video testimonial component:**
```tsx
<VideoTestimonial
  videoUrl="/videos/testimonial-1.mp4"
  thumbnail="/images/testimonial-1-thumb.jpg"
  coupleName="Priya & Rahul"
  weddingDate="December 2024"
/>
```

### 3.2.3 Founder/Team Story Page

**Create `src/app/about/team/page.tsx`:**
- Founder story with emotional hook
- Team member profiles
- Company timeline
- Awards and certifications

**Effort:** Medium (5-8 hours)

---

## 3.3 Blog Enhancements

### 3.3.1 Table of Contents

**Add to long blog posts:**
```tsx
// Auto-generate from headings
const toc = content.match(/^#{2,3}\s.+$/gm)?.map(heading => ({
  level: heading.match(/^#+/)[0].length,
  text: heading.replace(/^#+\s/, ''),
  id: slugify(heading.replace(/^#+\s/, ''))
}));
```

### 3.3.2 Reading Progress Indicator

**Add to blog layout:**
```tsx
'use client';

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      setProgress((scrollTop / docHeight) * 100);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 h-1 bg-primary z-50"
         style={{ width: `${progress}%` }} />
  );
}
```

### 3.3.3 Author Bios

**Add author data to blog posts:**
```typescript
interface Author {
  name: string;
  role: string;
  image: string;
  bio: string;
  social: {
    instagram?: string;
    linkedin?: string;
  };
}
```

**Effort:** Low-Medium (3-5 hours)

---

## 3.4 Social Proof Enhancement

### 3.4.1 Google Reviews Integration

**Add Google Places API integration:**
```tsx
// Display real Google reviews
// Show star rating badge
// Link to leave review
```

### 3.4.2 Instagram Live Feed

**Create `src/components/home/instagram-live.tsx`:**
- Use Instagram Basic Display API
- Show latest 6-9 posts
- Click to open Instagram

### 3.4.3 Awards & Certifications Section

**Add to homepage and about page:**
- Industry awards
- Wedding associations (WPI, ILEA)
- Press mentions with real logos

**Effort:** Medium (4-6 hours)

---

# SECTION 4: ADVANCED FEATURES (P3)

## 4.1 AI-Powered Features

### 4.1.1 AI Wedding Chatbot

**Leverage existing Anthropic SDK integration:**
```tsx
// Create chat interface
// FAQ answering
// Venue recommendations
// Budget suggestions
// 24/7 availability
```

**Location:** `src/app/api/chat/route.ts`

### 4.1.2 Smart Venue Matching

**AI-powered venue recommendations based on:**
- Budget
- Guest count
- Preferred style
- Season
- Location preferences

### 4.1.3 Budget Optimizer

**AI suggestions to:**
- Optimize spending allocation
- Suggest alternatives
- Identify savings opportunities

**Effort:** High (20+ hours)

---

## 4.2 Progressive Web App (PWA)

### 4.2.1 Service Worker

**Create `public/sw.js`:**
```js
const CACHE_NAME = 'elite-wedding-v1';
const urlsToCache = [
  '/',
  '/offline',
  '/manifest.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});
```

### 4.2.2 Web App Manifest

**Create `public/manifest.json`:**
```json
{
  "name": "Elite Wedding Planner",
  "short_name": "Elite Wedding",
  "theme_color": "#ee2b5b",
  "background_color": "#ffffff",
  "display": "standalone",
  "start_url": "/",
  "icons": [...]
}
```

### 4.2.3 Offline Page

**Create `src/app/offline/page.tsx`:**
- Cached contact info
- Saved venues (if favorited)
- Basic functionality

**Effort:** High (8-10 hours)

---

## 4.3 Analytics & Tracking

### 4.3.1 Event Tracking

**Add custom events:**
```tsx
// Track key actions
gtag('event', 'form_start', { form_type: 'contact' });
gtag('event', 'venue_view', { venue_name: venue.name });
gtag('event', 'tool_use', { tool_name: 'budget_calculator' });
gtag('event', 'cta_click', { cta_location: 'hero' });
```

### 4.3.2 Heatmaps Integration

**Add Hotjar or similar:**
```tsx
// Track scroll depth
// Click patterns
// Form interaction
```

### 4.3.3 A/B Testing Infrastructure

**Use Vercel Edge Config or similar for:**
- Hero copy variants
- CTA button colors
- Form layouts

**Effort:** Medium (4-6 hours)

---

## 4.4 Internationalization

### 4.4.1 Hindi Language Support

**Add i18n configuration:**
```tsx
// next.config.ts
i18n: {
  locales: ['en', 'hi'],
  defaultLocale: 'en',
}
```

### 4.4.2 Regional Content

**Create location-specific landing pages:**
```
/wedding-planner-mumbai
/wedding-planner-delhi
/wedding-planner-bangalore
/wedding-planner-hyderabad
```

**Effort:** High (15-20 hours)

---

# SECTION 5: DESIGN REFINEMENTS

## 5.1 Visual Enhancements

### 5.1.1 Micro-interactions

**Add subtle animations:**
```css
/* Button hover ripple effect */
.btn-luxury::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
  transform: scale(0);
  transition: transform 0.5s ease-out;
}

.btn-luxury:hover::after {
  transform: scale(2);
}
```

### 5.1.2 Scroll Animations

**Enhance with intersection observer:**
```tsx
// Staggered reveal animations
// Parallax sections
// Number counting animations
```

### 5.1.3 Dark Mode Toggle

**Add to navbar:**
```tsx
'use client';

import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? <Sun /> : <Moon />}
    </button>
  );
}
```

**Effort:** Medium (4-6 hours)

---

## 5.2 Component Library Expansion

### 5.2.1 New UI Components Needed

- [ ] Accordion (for FAQs)
- [ ] Tabs (for venue details)
- [ ] Modal/Dialog (for lightbox, forms)
- [ ] Carousel/Slider (for testimonials)
- [ ] Progress indicator (for wizard)
- [ ] Rating stars (for reviews)
- [ ] Avatar (for testimonials)
- [ ] Badge (for categories)
- [ ] Tooltip (for info hints)
- [ ] Popover (for filters)

### 5.2.2 Form Components

- [ ] Phone input with country code
- [ ] Date range picker
- [ ] Multi-select dropdown
- [ ] File upload (for inspiration images)
- [ ] Autocomplete (for locations)

**Effort:** Medium-High (6-10 hours)

---

# SECTION 6: TECHNICAL DEBT

## 6.1 Code Quality

### 6.1.1 TypeScript Strictness

**Enable in `tsconfig.json`:**
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUncheckedIndexedAccess": true
  }
}
```

### 6.1.2 ESLint Rules

**Add to `.eslintrc.json`:**
```json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "no-unused-vars": "error",
    "prefer-const": "error",
    "@typescript-eslint/no-explicit-any": "error"
  }
}
```

### 6.1.3 Component Consistency

- Ensure all pages have Footer
- Standardize animation patterns
- Use consistent spacing/padding
- Extract magic numbers to constants

**Effort:** Medium (4-6 hours)

---

## 6.2 Testing Setup

### 6.2.1 Unit Testing

**Install Jest/Vitest:**
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

**Create tests for:**
- Utility functions (`src/lib/blog.ts`, `src/lib/utils.ts`)
- Form validation schemas
- Data transformation functions

### 6.2.2 E2E Testing

**Install Playwright:**
```bash
npm install -D @playwright/test
```

**Test scenarios:**
- Contact form submission
- Navigation flow
- Venue search & filter
- Mobile responsiveness

**Effort:** High (10-15 hours)

---

# SECTION 7: INFRASTRUCTURE

## 7.1 Database Enhancement

### 7.1.1 Supabase Tables to Add

```sql
-- Favorites/Wishlist
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL, -- anonymous session ID
  venue_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter subscribers
CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  source TEXT, -- where they signed up
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

-- Page views analytics
CREATE TABLE page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  viewed_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 7.1.2 API Routes to Add

- `POST /api/favorites` - Save venue to favorites
- `GET /api/favorites` - Get user's favorites
- `POST /api/subscribe` - Newsletter signup
- `POST /api/track` - Analytics tracking

**Effort:** Medium (4-6 hours)

---

## 7.2 Caching Strategy

### 7.2.1 Static Generation

**Enable ISR for key pages:**
```tsx
// Venues page
export const revalidate = 3600; // Revalidate every hour

// Blog posts
export const revalidate = 86400; // Revalidate daily
```

### 7.2.2 API Caching

**Add cache headers:**
```tsx
export async function GET() {
  return Response.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
```

**Effort:** Low (2-3 hours)

---

# IMPLEMENTATION ROADMAP

## Sprint 1 (Week 1-2): Foundation
- [ ] P0: Fix portfolio page with Next.js Image
- [ ] P0: Add missing footers
- [ ] P0: Accessibility fixes
- [ ] P1: Structured data implementation
- [ ] P1: Performance optimization

## Sprint 2 (Week 3-4): User Experience
- [ ] P1: Loading states & skeletons
- [ ] P1: Error boundaries
- [ ] P1: Form validation improvements
- [ ] P2: Breadcrumb navigation
- [ ] P2: Toast notifications

## Sprint 3 (Week 5-6): Content & Features
- [ ] P2: Real wedding stories (5)
- [ ] P2: Blog enhancements
- [ ] P2: Video testimonials
- [ ] P2: Social proof section

## Sprint 4 (Week 7-8): Advanced
- [ ] P2: Venue comparison tool
- [ ] P2: Wedding style quiz
- [ ] P3: AI chatbot (basic)
- [ ] P3: Analytics & tracking

## Sprint 5 (Month 2+): Polish
- [ ] P3: PWA implementation
- [ ] P3: Testing setup
- [ ] P3: Hindi language support
- [ ] P3: Dark mode toggle

---

# QUICK WINS (Can Do Today)

1. **Add Footer to Portfolio** - 5 minutes
2. **Replace `<img>` with `<Image>`** - 30 minutes per page
3. **Add ARIA labels** - 1 hour
4. **Enable stricter TypeScript** - 15 minutes
5. **Add Breadcrumbs component** - 1 hour
6. **Add reading progress to blog** - 30 minutes
7. **Add structured data to layout** - 1 hour
8. **Enable image optimization config** - 15 minutes
9. **Add skip-to-content link** - 10 minutes
10. **Add toast notifications** - 30 minutes

---

# SUCCESS METRICS

## Technical Metrics
- Lighthouse Performance: 95+
- Lighthouse Accessibility: 100
- Lighthouse SEO: 100
- First Contentful Paint: <1.5s
- Cumulative Layout Shift: <0.1

## Business Metrics
- Form completion rate: +50%
- Bounce rate: <40%
- Pages per session: 4+
- Time on site: 5+ minutes
- Organic traffic: 5x in 6 months

---

# APPENDIX: FILE REFERENCE

## Key Files to Modify
| File | Priority | Changes |
|------|----------|---------|
| `src/app/portfolio/page.tsx` | P0 | Image optimization, footer, lightbox |
| `src/app/layout.tsx` | P1 | Structured data, skip link, fonts |
| `src/components/layout/navbar.tsx` | P1 | Keyboard navigation, ARIA |
| `next.config.ts` | P1 | Image optimization, bundle |
| `src/app/blog/[slug]/page.tsx` | P2 | TOC, progress, author |
| `src/components/home/*.tsx` | P2 | Image optimization |
| `tsconfig.json` | P2 | Stricter options |

## New Files to Create
| File | Priority | Purpose |
|------|----------|---------|
| `src/components/ui/skeleton.tsx` | P1 | Loading states |
| `src/components/ui/breadcrumbs.tsx` | P1 | Navigation |
| `src/components/error-boundary.tsx` | P1 | Error handling |
| `src/data/portfolio.ts` | P0 | Gallery data |
| `src/data/real-weddings/*.json` | P2 | Wedding stories |
| `src/app/tools/compare/page.tsx` | P2 | Venue comparison |
| `src/app/tools/quiz/page.tsx` | P3 | Style quiz |
| `public/manifest.json` | P3 | PWA |
| `public/sw.js` | P3 | Service worker |

---

*This plan provides a structured approach to transforming the Elite Wedding Planner website into a world-class luxury platform. Execute improvements in priority order for maximum impact.*

---

# SECTION 8: SKILL-BASED CONTENT IMPROVEMENTS

This section leverages the project's skill system to create and optimize content.

## 8.1 SEO Content Creation (Using Skills)

### New Blog Articles to Create

Use **seo-content-writer** skill with these inputs:

| Article | Primary Keyword | Word Count | Type |
|---------|-----------------|------------|------|
| Ultimate Guide to Destination Weddings in India 2026 | `destination wedding India` | 3000+ | Ultimate Guide |
| Udaipur vs Goa: Which Destination is Right for Your Wedding? | `Udaipur vs Goa wedding` | 2500 | Comparison |
| How Much Does a Destination Wedding in India Cost? | `destination wedding cost India` | 2500 | Informational |
| Top 25 Palace Wedding Venues in Rajasthan | `palace wedding venues Rajasthan` | 3000 | Listicle |
| Complete Wedding Planning Timeline: 12 Months to Your Big Day | `wedding planning timeline` | 2500 | How-To |
| Best Wedding Decorators in Mumbai, Delhi, Jaipur | `wedding decorators India` | 2000 | Local SEO |
| Indian Wedding Traditions: Complete Guide for Modern Couples | `Indian wedding traditions` | 3500 | Guide |
| Monsoon Wedding in India: Pros, Cons & Best Venues | `monsoon wedding India` | 2000 | Informational |
| Intimate Wedding Ideas: Planning a 50-Guest Celebration | `intimate wedding ideas` | 2000 | Inspirational |
| Wedding Photography Packages: What to Expect & How to Choose | `wedding photography packages` | 2000 | Commercial |

### Skill Workflow for Each Article:

```
1. seo-content-writer
   Input: { topic, primaryKeyword, contentType: "guide", targetWordCount: 2500 }
   Output: Fully structured article with H1-H6, FAQ section

2. geo-content-optimizer
   Input: { content: article, topic }
   Output: AI-citation-ready content with quotable statements

3. meta-tags-optimizer
   Input: { pageUrl, primaryKeyword, pageType: "blog" }
   Output: Title (50-60 chars), meta description (150-160 chars), OG tags

4. schema-markup-generator
   Input: { pageType: "article", content: { headline, author, date } }
   Output: Article + FAQ JSON-LD schema
```

---

## 8.2 Existing Content Refresh (Using content-refresher)

### Blog Posts to Refresh for 2026

| Article | Current Issue | Refresh Priority |
|---------|---------------|------------------|
| wedding-trends-2025.json | Year outdated, old stats | 🔴 High |
| 12-month-wedding-planning-timeline.json | Missing 2026 trends | 🟡 Medium |
| goa-vs-udaipur-destination-wedding.json | Prices outdated | 🟡 Medium |
| luxury-wedding-any-budget.json | Cost examples outdated | 🟡 Medium |
| vendor-selection-guide.json | Add AI vendor matching section | 🟢 Low |

### Refresh Workflow:

```
1. on-page-seo-auditor
   Input: { pageUrl: "/blog/wedding-trends-2025", targetKeyword }
   Output: Current SEO score, gaps, competitor comparison

2. content-refresher
   Input: { contentUrl, currentYear: 2026 }
   Output: Outdated elements, new sections needed, refresh plan

3. seo-content-writer
   Input: { topic: "new sections", wordCount: 500 per section }
   Output: Fresh content for missing sections

4. geo-content-optimizer
   Input: { content: refreshedArticle }
   Output: Updated with AI citation signals, current statistics
```

---

## 8.3 Service Pages Optimization (Using on-page-seo-auditor)

### Audit Each Service Page:

| Page | Target Keyword | Current Issues |
|------|----------------|----------------|
| /services/full-service | `full service wedding planner India` | Missing FAQ schema |
| /services/destination | `destination wedding planner` | Thin content |
| /services/design | `wedding design services` | No testimonials |
| /services/day-of | `day of coordinator India` | Missing pricing |

### Optimization Workflow:

```
1. on-page-seo-auditor
   Input: { pageUrl: "/services/destination", targetKeyword }
   Output: Score breakdown, content gaps, header issues

2. meta-tags-optimizer
   Input: { pageUrl, pageType: "service", primaryKeyword }
   Output: Optimized title, description, CTR improvements

3. schema-markup-generator
   Input: { pageType: "local-business", content: serviceData }
   Output: WeddingEventPlanningService + FAQ schema
```

---

## 8.4 Destination Pages Enhancement (Using geo-content-optimizer)

### Add GEO Optimization to All Destination Pages:

| Page | AI Queries to Target |
|------|----------------------|
| /destinations/udaipur | "best wedding venues Udaipur", "Udaipur palace wedding cost" |
| /destinations/goa | "beach wedding Goa", "destination wedding Goa cost" |
| /destinations/jaipur | "royal wedding Jaipur", "Jaipur wedding planner" |
| /destinations/jodhpur | "Mehrangarh Fort wedding", "Jodhpur destination wedding" |
| /destinations/dubai | "destination wedding Dubai from India", "luxury Dubai wedding" |

### GEO Enhancement Workflow:

```
1. geo-content-optimizer
   Input: {
     content: currentPageContent,
     targetQueries: ["best wedding venues Udaipur", "Udaipur wedding cost"]
   }
   Output:
   - Clear definitions at start: "Udaipur, known as the 'City of Lakes', is India's premier destination wedding location..."
   - Quotable statistics: "According to WeddingWire India 2025, Udaipur hosts 40% of all luxury destination weddings..."
   - FAQ formatted sections for AI answers
```

---

## 8.5 Technical SEO Audit (Using technical-seo-checker)

### Full Site Audit Checklist:

```
technical-seo-checker
Input: {
  domain: "eliteweddingplanner.in",
  scope: "full",
  focusAreas: ["speed", "mobile", "security", "structured-data"]
}

Expected Output:
- Core Web Vitals scores (LCP, FID, CLS)
- Crawlability issues (robots.txt, sitemap)
- Indexability problems (canonical, noindex)
- Mobile-friendliness report
- Security headers check
- Schema validation across all pages
```

### Priority Technical Fixes:

1. **Core Web Vitals**
   - Add `loading="lazy"` to all images
   - Implement blur placeholders
   - Optimize LCP by preloading hero images

2. **Crawlability**
   - Verify sitemap includes all pages
   - Check robots.txt doesn't block CSS/JS

3. **Structured Data**
   - Add FAQ schema to all service pages
   - Add BreadcrumbList to all pages
   - Add Organization schema to homepage

---

## 8.6 Schema Markup Implementation (Using schema-markup-generator)

### Pages Requiring Schema:

| Page | Schema Types | Priority |
|------|--------------|----------|
| Homepage | Organization, WebSite, BreadcrumbList | 🔴 High |
| Service pages | WeddingEventPlanningService, FAQ | 🔴 High |
| Venue pages | Place, LocalBusiness, Review | 🔴 High |
| Blog posts | Article, FAQ, BreadcrumbList | 🟡 Medium |
| Destination pages | Place, FAQ | 🟡 Medium |
| Contact page | ContactPage, LocalBusiness | 🟢 Low |

### Schema Generation Workflow:

```
schema-markup-generator
Input: {
  pageType: "local-business",
  content: {
    name: "Elite Wedding Planner",
    description: "Luxury destination wedding planners in India",
    priceRange: "$$$$",
    areaServed: ["India", "Dubai", "Thailand"],
    telephone: "+91-XXXXXXXXXX",
    address: { city: "Mumbai", country: "IN" }
  }
}

Output: Complete JSON-LD for homepage
```

---

## 8.7 Venue Content Enhancement (Using seo-content-writer)

### Create Detailed Venue Guides:

For each of the 50+ venues in the database, create:

1. **Individual Venue Pages** (if not existing)
   ```
   seo-content-writer
   Input: {
     topic: "Taj Lake Palace Wedding",
     primaryKeyword: "Taj Lake Palace wedding cost",
     contentType: "landing-page",
     sections: ["Overview", "Wedding Spaces", "Capacity", "Pricing", "Reviews", "FAQ"]
   }
   ```

2. **Venue Comparison Articles**
   ```
   seo-content-writer
   Input: {
     topic: "Top 10 Palace Wedding Venues in Udaipur",
     contentType: "listicle",
     targetWordCount: 3000
   }
   ```

---

## 8.8 Lead Magnet Content (Using pdf + canvas-design)

### Create Downloadable Resources:

| Resource | Skill | Format |
|----------|-------|--------|
| Wedding Budget Calculator | pdf + xlsx | Printable PDF + Interactive Excel |
| 12-Month Planning Checklist | pdf | Printable PDF |
| Vendor Comparison Template | xlsx | Excel with formulas |
| Wedding Day Timeline Template | pdf | Visual timeline PDF |
| Destination Wedding Guide | pdf | E-book style PDF |
| Venue Comparison Worksheet | pdf | Fillable PDF form |

### Creation Workflow:

```
1. seo-content-writer
   Input: { topic: "Wedding Budget Guide", contentType: "guide" }
   Output: Content for the guide

2. canvas-design
   Input: {
     assetType: "print-material",
     content: guideContent,
     style: "luxury",
     colorPalette: { primary: "#ee2b5b", secondary: "#d4af37" }
   }
   Output: Beautifully designed PDF cover

3. pdf
   Input: {
     documentType: "guide",
     data: guideContent,
     branding: { logo, colors, fonts }
   }
   Output: Professional lead magnet PDF
```

---

## 8.9 Social Media Content (Using canvas-design)

### Create Visual Assets:

| Asset Type | Dimensions | Purpose |
|------------|------------|---------|
| Instagram Posts | 1080x1080 | Wedding inspiration |
| Instagram Stories | 1080x1920 | Behind the scenes |
| Pinterest Pins | 1000x1500 | Venue showcases |
| Facebook Covers | 820x312 | Brand presence |
| OG Images | 1200x630 | Blog post sharing |

### Canvas Design Workflow:

```
canvas-design
Input: {
  assetType: "social-graphic",
  dimensions: { width: 1080, height: 1080 },
  content: {
    headline: "Dreaming of a Palace Wedding?",
    subtext: "Udaipur | Jaipur | Jodhpur",
    image: "/images/palace-wedding.jpg"
  },
  style: "luxury",
  colorPalette: { primary: "#ee2b5b", secondary: "#d4af37" }
}
```

---

## 8.10 Email Templates (Using internal-comms)

### Create Email Sequences:

| Sequence | Emails | Purpose |
|----------|--------|---------|
| Welcome Series | 5 | New subscriber nurture |
| Inquiry Follow-up | 3 | Lead conversion |
| Planning Tips | 12 | Monthly engagement |
| Vendor Showcase | 4 | Partner promotion |
| Post-Wedding | 2 | Testimonial request |

### Email Creation Workflow:

```
internal-comms
Input: {
  messageType: "welcome-sequence",
  audience: "new-subscribers",
  topic: "Welcome to Elite Wedding Planner",
  keyPoints: [
    "Introduction to services",
    "Free planning resources",
    "Success stories",
    "Book consultation CTA"
  ],
  tone: "luxury-friendly"
}
```

---

# SECTION 9: CONTENT CALENDAR

## Monthly Content Plan Using Skills

### Month 1: Foundation
| Week | Content | Skill Used |
|------|---------|------------|
| 1 | Refresh wedding-trends-2025 → 2026 | content-refresher |
| 1 | Add schema to homepage | schema-markup-generator |
| 2 | Write "Destination Wedding Cost Guide" | seo-content-writer |
| 2 | Optimize all service page meta tags | meta-tags-optimizer |
| 3 | Create Budget Calculator PDF | pdf + xlsx |
| 3 | GEO optimize Udaipur page | geo-content-optimizer |
| 4 | Technical SEO audit | technical-seo-checker |
| 4 | Fix critical technical issues | frontend-design |

### Month 2: Expansion
| Week | Content | Skill Used |
|------|---------|------------|
| 1 | Write "Udaipur vs Goa" comparison | seo-content-writer |
| 1 | Add FAQ schema to all service pages | schema-markup-generator |
| 2 | Create 5 venue detail pages | seo-content-writer |
| 2 | GEO optimize Goa, Jaipur pages | geo-content-optimizer |
| 3 | Write "Palace Venues Rajasthan" listicle | seo-content-writer |
| 3 | Create Planning Checklist PDF | pdf |
| 4 | On-page audit all destination pages | on-page-seo-auditor |
| 4 | Create Instagram visual templates | canvas-design |

### Month 3: Optimization
| Week | Content | Skill Used |
|------|---------|------------|
| 1 | Refresh all blog posts with 2026 data | content-refresher |
| 1 | Create welcome email sequence | internal-comms |
| 2 | Write "Indian Wedding Traditions" guide | seo-content-writer |
| 2 | Add Article schema to all blogs | schema-markup-generator |
| 3 | Create Vendor Comparison Template | xlsx |
| 3 | GEO optimize remaining pages | geo-content-optimizer |
| 4 | Final technical SEO audit | technical-seo-checker |
| 4 | Create Destination Wedding E-book | pdf + canvas-design |

---

# SECTION 10: SKILL USAGE QUICK REFERENCE

## When to Use Each Skill

| Task | Primary Skill | Supporting Skills |
|------|---------------|-------------------|
| Write new blog post | seo-content-writer | geo-content-optimizer, meta-tags-optimizer |
| Update old content | content-refresher | seo-content-writer, on-page-seo-auditor |
| Optimize for AI | geo-content-optimizer | schema-markup-generator |
| Improve CTR | meta-tags-optimizer | on-page-seo-auditor |
| Add rich results | schema-markup-generator | technical-seo-checker |
| Audit page | on-page-seo-auditor | technical-seo-checker |
| Create lead magnet | pdf | canvas-design, seo-content-writer |
| Design visuals | canvas-design | theme-factory |
| Generate reports | xlsx | pdf |
| Draft emails | internal-comms | - |

## Skill Chaining Examples

### New Blog Post (Complete Workflow)
```
seo-content-writer → geo-content-optimizer → meta-tags-optimizer → schema-markup-generator → on-page-seo-auditor
```

### Content Refresh (Complete Workflow)
```
on-page-seo-auditor → content-refresher → seo-content-writer → geo-content-optimizer → technical-seo-checker
```

### Lead Magnet Creation (Complete Workflow)
```
seo-content-writer → canvas-design → pdf → meta-tags-optimizer (landing page)
```

---

# APPENDIX B: SKILL FILE LOCATIONS

| Skill | Location |
|-------|----------|
| seo-content-writer | `seo-geo-claude-skills-main/build/seo-content-writer/SKILL.md` |
| geo-content-optimizer | `seo-geo-claude-skills-main/build/geo-content-optimizer/SKILL.md` |
| meta-tags-optimizer | `seo-geo-claude-skills-main/build/meta-tags-optimizer/SKILL.md` |
| schema-markup-generator | `seo-geo-claude-skills-main/build/schema-markup-generator/SKILL.md` |
| on-page-seo-auditor | `seo-geo-claude-skills-main/optimize/on-page-seo-auditor/SKILL.md` |
| content-refresher | `seo-geo-claude-skills-main/optimize/content-refresher/SKILL.md` |
| technical-seo-checker | `seo-geo-claude-skills-main/optimize/technical-seo-checker/SKILL.md` |
| frontend-design | `project-skills/frontend-design/SKILL.md` |
| canvas-design | `project-skills/canvas-design/SKILL.md` |
| pdf | `project-skills/pdf/SKILL.md` |
| xlsx | `project-skills/xlsx/SKILL.md` |
| internal-comms | `project-skills/internal-comms/SKILL.md` |
| wedding-website-template | `project-skills/wedding-website-template/SKILL.md` |
| wedding-planning-assistant | `project-skills/wedding-planning-assistant/SKILL.md` |
| wedding-budget-tracker | `project-skills/wedding-budget-tracker/SKILL.md` |
| vendor-management | `project-skills/vendor-management/SKILL.md` |
| wedding-timeline-builder | `project-skills/wedding-timeline-builder/SKILL.md` |
| seating-chart-designer | `project-skills/seating-chart-designer/SKILL.md` |
| client-wedding-manager | `project-skills/client-wedding-manager/SKILL.md` |

---

**See also:** [SKILL_IO_SPECIFICATIONS.md](SKILL_IO_SPECIFICATIONS.md) for complete input/output schemas for each skill.
