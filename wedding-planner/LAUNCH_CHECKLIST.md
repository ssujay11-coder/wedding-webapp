# 🚀 Elite Wedding Planner - Launch Checklist

## Pre-Launch Setup (Required)

### 1. Environment Variables Setup ⚙️

Create `.env.local` file in the root directory and add:

```env
# Resend (Email Service)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx

# Supabase (Database)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Anthropic (AI Assistant - Optional)
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxx

# Site Configuration
SITE_URL=https://eliteweddingplanner.in
NEXT_PUBLIC_SITE_NAME=Elite Wedding Planner

# Google Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Email Addresses
FROM_EMAIL=hello@eliteweddingplanner.in
ADMIN_EMAIL=sales@eliteweddingplanner.in
```

### 2. Get API Keys 🔑

#### Resend Setup
1. Go to https://resend.com
2. Sign up for an account
3. Navigate to API Keys section
4. Create a new API key
5. Copy and paste into `.env.local`
6. **Important**: Verify your sending domain (eliteweddingplanner.in)
   - Add DNS records (SPF, DKIM, DMARC)
   - Verify domain ownership
   - This is required for production email sending

#### Supabase Setup
1. Go to https://supabase.com
2. Create a new project (choose region closest to India for best performance)
3. Once created, go to Project Settings → API
4. Copy Project URL and paste as `NEXT_PUBLIC_SUPABASE_URL`
5. Copy `anon public` key and paste as `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Copy `service_role secret` key and paste as `SUPABASE_SERVICE_ROLE_KEY`

#### Create Supabase Database Table
Run this SQL in Supabase SQL Editor:

```sql
-- Create leads table
create table leads (
  id uuid default gen_random_uuid() primary_key,
  name text not null,
  email text not null,
  phone text not null,
  wedding_date text,
  guest_count text,
  budget_range text,
  style_preferences text[],
  status text default 'new',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add RLS (Row Level Security) policies
alter table leads enable row level security;

-- Allow insert for anonymous users
create policy "Anyone can insert leads"
  on leads for insert
  to anon
  with check (true);

-- Allow select for authenticated users only
create policy "Authenticated users can view leads"
  on leads for select
  to authenticated
  using (true);
```

### 3. Test Locally 🧪

```bash
# Install dependencies (if not already done)
npm install

# Run development server
npm run dev

# Open browser to http://localhost:3000
```

**Test these features:**
- [ ] Homepage loads correctly
- [ ] All 12 sections display properly
- [ ] Navigation dropdowns work
- [ ] Footer links are correct
- [ ] Mobile menu functions
- [ ] Contact form wizard works
- [ ] Images load (may use placeholders until domain is configured)

### 4. Build for Production 🏗️

```bash
npm run build
```

**Expected output:**
- ✅ Compiled successfully
- ✅ No TypeScript errors
- ✅ Sitemap generated
- ✅ All routes built

---

## Deployment Options

### Option A: Vercel (Recommended) ⚡

**Why Vercel?**
- Built by Next.js creators
- Zero configuration needed
- Automatic HTTPS
- Global CDN
- Instant deployments
- Free for personal/commercial use

**Steps:**

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

4. **Add Environment Variables**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add all variables from `.env.local`
   - Mark as "Production"

5. **Configure Custom Domain**
   - Go to Vercel Dashboard → Your Project → Settings → Domains
   - Add `eliteweddingplanner.in`
   - Update DNS records at your domain registrar:
     - Type: `A`, Name: `@`, Value: `76.76.21.21`
     - Type: `CNAME`, Name: `www`, Value: `cname.vercel-dns.com`

6. **Redeploy**
   ```bash
   vercel --prod
   ```

### Option B: Netlify 🌐

1. Install Netlify CLI: `npm i -g netlify-cli`
2. Login: `netlify login`
3. Deploy: `netlify deploy --prod`
4. Add environment variables in Netlify dashboard
5. Configure custom domain in Netlify settings

### Option C: Your Own Server 🖥️

1. Build: `npm run build`
2. Copy `.next`, `public`, `package.json` to server
3. On server: `npm install --production`
4. Start: `npm start` (runs on port 3000)
5. Use PM2 or similar for process management
6. Configure nginx/Apache as reverse proxy
7. Set up SSL with Let's Encrypt

---

## Post-Deployment Configuration

### 1. Email Domain Verification (Critical) 📧

**Resend Domain Verification:**
1. Log into Resend dashboard
2. Go to Domains section
3. Add `eliteweddingplanner.in`
4. Copy provided DNS records
5. Add to your DNS provider (GoDaddy, Cloudflare, etc.):
   - SPF record
   - DKIM record
   - DMARC record
6. Wait for verification (can take up to 48 hours)
7. Test email sending once verified

**DNS Records Example:**
```
Type: TXT
Name: @
Value: v=spf1 include:_spf.resend.com ~all

Type: TXT
Name: resend._domainkey
Value: [provided by Resend]

Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:dmarc@eliteweddingplanner.in
```

### 2. Google Search Console Setup 🔍

1. Go to https://search.google.com/search-console
2. Add property: `https://eliteweddingplanner.in`
3. Verify ownership (use HTML tag method or DNS)
4. Submit sitemap: `https://eliteweddingplanner.in/sitemap.xml`
5. Monitor indexing status

### 3. Google Analytics Setup 📊

1. Create GA4 property at https://analytics.google.com
2. Copy Measurement ID (G-XXXXXXXXXX)
3. Add to `.env.local` as `NEXT_PUBLIC_GA_ID`
4. Redeploy website
5. Verify tracking in GA Real-Time reports

### 4. Social Media Integration 🌐

**Instagram:**
- Update handle: `@eliteweddingplanner`
- Link in bio: `eliteweddingplanner.in`
- Post announcement about new website

**Facebook:**
- Update business page URL
- Add "Book Now" button linking to `/contact`
- Create launch post

### 5. Test Production Features ✅

**Critical Tests:**
- [ ] Fill out contact form completely
- [ ] Verify you receive admin notification email
- [ ] Verify client receives confirmation email
- [ ] Check Supabase database for lead entry
- [ ] Test all navigation links
- [ ] Verify all images load correctly
- [ ] Test on mobile devices (iOS + Android)
- [ ] Test in multiple browsers (Chrome, Safari, Firefox, Edge)
- [ ] Check page load speed (should be < 3 seconds)
- [ ] Verify HTTPS is working
- [ ] Test all CTA buttons

### 6. SEO Verification 🎯

**Check these URLs work:**
- https://eliteweddingplanner.in/
- https://eliteweddingplanner.in/sitemap.xml
- https://eliteweddingplanner.in/robots.txt
- https://www.eliteweddingplanner.in (should redirect to non-www)

**Run SEO Audits:**
- Google PageSpeed Insights: https://pagespeed.web.dev
- Lighthouse (Chrome DevTools)
- Check meta tags with: https://metatags.io

**Expected Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

---

## Monitoring & Maintenance

### Daily Checks (First Week)
- [ ] Check email delivery (spam folder too)
- [ ] Monitor error logs (Vercel/Netlify dashboard)
- [ ] Review form submissions in Supabase
- [ ] Check Google Analytics traffic

### Weekly Checks
- [ ] Review contact form submissions
- [ ] Monitor website performance
- [ ] Check search console for errors
- [ ] Update content if needed

### Monthly Tasks
- [ ] Review and respond to all inquiries
- [ ] Update portfolio/weddings showcase
- [ ] Check for broken links
- [ ] Review analytics reports
- [ ] Update npm packages: `npm update`

---

## Troubleshooting Common Issues

### Emails Not Sending
- ✅ Verify Resend API key is correct
- ✅ Check domain is verified in Resend
- ✅ Look for errors in Vercel/Netlify logs
- ✅ Test API route directly: `POST /api/send-inquiry`

### Images Not Loading
- ✅ Check Next.js config has correct remote patterns
- ✅ Verify image URLs are accessible
- ✅ Check browser console for errors
- ✅ Ensure CORS is properly configured

### Build Failures
- ✅ Run `npm run build` locally first
- ✅ Check for TypeScript errors
- ✅ Verify all environment variables are set
- ✅ Check deployment logs for specific errors

### Form Not Submitting
- ✅ Check browser console for errors
- ✅ Verify Supabase connection
- ✅ Check API route is accessible
- ✅ Review network tab in DevTools

---

## Emergency Contacts

**Technical Support:**
- Next.js: https://nextjs.org/docs
- Vercel: https://vercel.com/support
- Resend: https://resend.com/support
- Supabase: https://supabase.com/docs

**Website Issues:**
- Check deployment logs first
- Review browser console errors
- Test in incognito mode
- Clear cache and cookies

---

## Success Metrics to Track

### Week 1
- [ ] Website live and accessible
- [ ] All emails working
- [ ] First form submission received
- [ ] Google indexing started

### Month 1
- [ ] 100+ visitors
- [ ] 10+ form submissions
- [ ] Social media traffic growing
- [ ] Search appearance improving

### Month 3
- [ ] Ranking for target keywords
- [ ] Regular inquiry flow
- [ ] High engagement metrics
- [ ] Positive client feedback

---

## Quick Reference

**Live Website:** https://eliteweddingplanner.in

**Admin Access:**
- Vercel Dashboard: https://vercel.com/dashboard
- Supabase Dashboard: https://supabase.com/dashboard
- Resend Dashboard: https://resend.com/home
- Google Search Console: https://search.google.com/search-console
- Google Analytics: https://analytics.google.com

**Important Emails:**
- Admin: sales@eliteweddingplanner.in
- Support: hello@eliteweddingplanner.in
- Careers: careers@eliteweddingplanner.in

---

## 🎉 Launch Day Announcement

**Sample Social Media Post:**

```
🎊 Introducing Our New Website! 🎊

We're thrilled to unveil our brand-new website at eliteweddingplanner.in!

✨ Explore stunning wedding galleries
💍 Discover our signature planning process
🌍 Browse destinations from Goa to Dubai
📧 Get started with our interactive planner

14 years | 200+ weddings | Your story, perfectly told

Visit us now: eliteweddingplanner.in

#EliteWeddingPlanner #LuxuryWeddings #DestinationWeddings #IndianWeddings
```

---

**Ready to Launch?** Follow this checklist step-by-step, and your world-class wedding planning website will be live! 🚀

For questions or support, refer to the README.md and PROJECT_SUMMARY.md files.
