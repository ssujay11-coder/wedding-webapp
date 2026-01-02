---
name: wedding-website-template
description: Design and generate beautiful, modern wedding website templates for couples. Use when creating wedding websites with features like couple's story, event details, RSVP forms, photo galleries, registry links, travel info, and more. Generates multiple stunning template designs in various styles (modern, classic, romantic, rustic, minimalist, luxury). Fully responsive, production-ready React/Next.js components with animations and interactive elements.
---

# Wedding Website Template Designer

Create distinctive, production-ready wedding websites that couples will love to share with guests.

## Core Website Sections

### Essential Pages/Sections
1. **Home/Hero** - Names, date, location, countdown
2. **Our Story** - How we met, proposal story, relationship timeline
3. **Event Details** - Ceremony, reception, timeline, directions
4. **RSVP** - Guest response form with meal choices
5. **Travel & Accommodations** - Hotels, transportation, area info
6. **Registry** - Gift registry links
7. **Photo Gallery** - Engagement photos, relationship photos
8. **FAQ** - Common questions answered
9. **Wedding Party** - Bridesmaids, groomsmen bios

### Optional Sections
10. **Things to Do** - Local attractions and recommendations
11. **Schedule of Events** - Multi-day wedding itinerary
12. **Dress Code** - Attire guidance with visual examples
13. **Guest Book** - Leave messages and well wishes
14. **Live Updates** - Day-of updates and announcements
15. **Livestream** - Virtual attendance option
16. **After Party** - Post-wedding celebration details

## Design Principles

**CRITICAL**: Apply all principles from the frontend-design skill. Wedding websites must be:
- Visually stunning with bold aesthetic choices
- Distinctive typography (avoid generic fonts)
- Cohesive color themes matching wedding colors
- High-impact animations and micro-interactions
- Memorable, not cookie-cutter

### Wedding-Specific Design Elements

**Typography Hierarchy**:
- Couple names: Largest, most elegant (display font)
- Section headings: Secondary hierarchy (serif or refined sans)
- Body text: Readable, refined (quality body font)
- Accents: Script or decorative (for special touches)

**Color Palettes**:
Must match couple's wedding colors. Common palettes:
- **Classic Elegance**: Navy + gold + ivory
- **Romantic Garden**: Blush pink + sage green + cream
- **Modern Minimalist**: Black + white + single accent
- **Rustic Charm**: Terracotta + olive + cream
- **Luxury Glam**: Black + rose gold + champagne
- **Beach Destination**: Turquoise + coral + sand
- **Boho Chic**: Burnt orange + sage + ochre

**Visual Elements**:
- Hero background: Full-bleed couple photo or elegant pattern
- Section dividers: Floral illustrations, geometric shapes, custom flourishes
- Photo treatments: Elegant frames, overlays, hover effects
- Loading animations: Romantic, on-brand transitions
- Cursor effects: Custom cursors for luxury feel (optional)

**Motion & Interaction**:
- Hero entrance animation (names fade in, parallax)
- Scroll-triggered section reveals
- Photo gallery with smooth transitions
- RSVP form validation with delightful feedback
- Countdown timer with animation
- Hover states on all interactive elements

## Template Styles

See [template-gallery.md](references/template-gallery.md) for complete design specifications.

### 1. Modern Minimalist
**Aesthetic**: Clean, sophisticated, lots of whitespace
**Typography**: Sans-serif (Montserrat, Helvetica Neue)
**Layout**: Asymmetric, grid-based, geometric
**Colors**: Monochrome or minimal palette
**Animations**: Subtle, refined transitions

### 2. Classic Elegance
**Aesthetic**: Timeless, formal, traditional
**Typography**: Serif (Playfair Display, Cormorant) + script
**Layout**: Centered, symmetrical, balanced
**Colors**: Navy, gold, ivory, burgundy
**Animations**: Graceful fades, elegant reveals

### 3. Romantic Garden
**Aesthetic**: Soft, whimsical, floral-heavy
**Typography**: Script + delicate serif
**Layout**: Organic flow, floral frames
**Colors**: Blush, sage, lavender, cream
**Animations**: Gentle floating, petal falls

### 4. Rustic Charm
**Aesthetic**: Warm, natural, handcrafted feel
**Typography**: Hand-lettered + organic sans
**Layout**: Informal, layered, textured
**Colors**: Wood tones, kraft, forest green
**Animations**: Subtle parallax, organic movement

### 5. Luxury Glamour
**Aesthetic**: Bold, dramatic, show-stopping
**Typography**: Art deco + high-contrast serif
**Layout**: Geometric, layered, metallic accents
**Colors**: Black, gold, champagne, marble
**Animations**: Bold entrances, shimmer effects

### 6. Beach Destination
**Aesthetic**: Relaxed, breezy, vacation vibe
**Typography**: Casual script + clean sans
**Layout**: Flowing, organic, beachy elements
**Colors**: Turquoise, coral, sand, white
**Animations**: Wave animations, tropical transitions

## Feature Implementation

### Hero Section
```tsx
Features:
- Full-viewport background image or video
- Couple names with elegant typography
- Wedding date and location
- Countdown timer (days/hours/minutes)
- Scroll indicator (animated chevron)
- Optional: Parallax scrolling effect

Animation sequence:
1. Background fades in (1s)
2. Couple names slide up and fade (1.5s, stagger)
3. Date and location appear (2s)
4. Countdown animates in (2.5s)
```

### Our Story Section
```tsx
Features:
- Timeline of relationship
- "How We Met" story
- Proposal story
- Engagement photos
- Optional: Interactive timeline

Layout options:
- Vertical timeline with photos
- Alternating left/right text and images
- Tabbed interface (Met/Dating/Engaged)
- Accordion expandable sections
```

### Event Details Section
```tsx
Features:
- Ceremony details (time, location, address)
- Reception details (time, location, address)
- Embedded Google Maps
- Get Directions button
- Timeline of day
- Dress code information

Interactive elements:
- Add to Calendar button (Google/Apple/Outlook)
- Map with custom pin/marker
- Weather forecast widget
- Parking and transportation info
```

### RSVP Form
```tsx
Features:
- Guest name(s)
- Attendance selection (Attending/Not Attending)
- Meal preferences (if applicable)
- Dietary restrictions field
- Plus-one handling
- Song requests
- Special notes/message
- Email confirmation

Validation:
- Required fields
- Email format validation
- Phone number format
- Custom error messages

Submission:
- Loading state during submission
- Success confirmation with animation
- Error handling with helpful messages
- Email notification to couple
- Store in database (Supabase)
```

### Travel & Accommodations
```tsx
Features:
- Hotel room blocks with booking links
- Airport information
- Transportation options (shuttle, rental, rideshare)
- Area map with landmarks
- Local recommendations

Design:
- Hotel cards with photos, pricing, distance
- Interactive map with pins
- Book Now buttons linking to hotel sites
- Transportation comparison table
```

### Photo Gallery
```tsx
Features:
- Grid layout (masonry or uniform)
- Lightbox view on click
- Image lazy loading
- Responsive images
- Categories/albums (Engagement, Travel, etc.)

Interactions:
- Smooth zoom on hover
- Click to open full-screen gallery
- Swipe/arrow navigation in lightbox
- Close button and ESC key support
- Optional: Instagram feed integration
```

### Registry Section
```tsx
Features:
- Registry store logos/links
- Brief message about registry
- Cash fund option (Venmo, Zelle, honeymoon fund)
- "Your presence is present enough" option

Design:
- Elegant cards for each registry
- Store logos
- Click to visit registry buttons
- Optional: Direct gift item display via API
```

### FAQ Section
```tsx
Features:
- Common questions and answers
- Collapsible/expandable items
- Search or filter capability
- Categories (Travel, Ceremony, Reception, etc.)

Common questions:
- What should I wear?
- Are children welcome?
- Can I bring a plus-one?
- What time should I arrive?
- Is there parking?
- Will the ceremony be indoors or outdoors?
- What's the weather like?
- Are there vegetarian/vegan options?
```

### Wedding Party Section
```tsx
Features:
- Photos of wedding party members
- Names and titles (Maid of Honor, Best Man, etc.)
- Short bios or fun facts
- Relationship to couple

Layout:
- Grid of cards with photos
- Hover reveals bio/info
- Separate sections for bride's side and groom's side
- Optional: "Meet the Parents" section
```

## Technical Implementation

### Technology Stack
- **Framework**: Next.js 15+ with React 19
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Database**: Supabase (RSVP storage)
- **Hosting**: Vercel (recommended)
- **Images**: Next/Image with optimization
- **Icons**: Lucide React

### Performance Optimization
- Image optimization and lazy loading
- Code splitting by route
- Minimal JavaScript bundle
- Font preloading
- Critical CSS inlining
- Fast page loads (<2s)

### Responsive Design
- Mobile-first approach
- Breakpoints: 640px, 768px, 1024px, 1280px
- Touch-friendly tap targets (44px minimum)
- Hamburger menu on mobile
- Optimized images per device

### SEO & Sharing
```tsx
Meta tags:
- Title: "Emily & Michael | June 15, 2026"
- Description: "Join us for our wedding celebration"
- Open Graph image (couple photo)
- Twitter Card meta
- Canonical URL
```

### Accessibility
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Focus states visible
- Alt text for all images
- Color contrast WCAG AA compliant
- Screen reader friendly

## Template Assets

The `assets/` folder contains:

### Fonts
- Display fonts for couple names
- Heading fonts
- Body fonts
- Script/accent fonts
All web-optimized (WOFF2 format)

### Graphics
- Floral illustrations (SVG)
- Geometric dividers
- Border elements
- Icon sets (rings, hearts, calendar, location)
- Pattern backgrounds

### Photo Placeholders
- Hero background templates
- Gallery layout examples
- Profile photo frames

### Template Starters
Complete starter templates for each style:
- `/modern-minimalist/` - Full template
- `/classic-elegance/` - Full template
- `/romantic-garden/` - Full template
- `/rustic-charm/` - Full template
- `/luxury-glamour/` - Full template
- `/beach-destination/` - Full template

Each includes:
- All page components
- Complete styling
- Example content
- Animation configurations

## Content Guidelines

### Voice & Tone
- Warm and welcoming
- Authentic to couple's personality
- Clear and informative
- Joyful but not overly cutesy

### Writing Tips
**Our Story**:
- Start with how you met
- Include memorable moments
- Keep it concise (200-400 words)
- End with proposal or looking forward to wedding

**Event Details**:
- Be specific (exact times, addresses)
- Include parking/transportation info
- Note if ceremony and reception are at same venue
- Mention weather considerations

**FAQ**:
- Answer real questions you've received
- Be specific, not vague
- Update as questions come in
- Keep friendly tone

## Generation Workflow

1. **Gather Requirements**
   - Couple names and wedding date
   - Location(s)
   - Wedding colors/theme
   - Preferred style aesthetic
   - Must-have features
   - Photos available

2. **Choose Template Style**
   - Match couple's wedding aesthetic
   - Consider season and venue
   - Review template examples
   - Get couple approval on direction

3. **Customize Design**
   - Apply couple's color palette
   - Select appropriate typography
   - Configure animations
   - Brand with couple's style

4. **Build Core Pages**
   - Implement hero section
   - Add event details
   - Create RSVP form
   - Integrate other essential sections

5. **Add Content**
   - Populate with couple's story
   - Add photos
   - Configure registry links
   - Write FAQ responses

6. **Polish & Refine**
   - Test RSVP submission
   - Verify responsive design
   - Check all links
   - Optimize performance
   - Test on multiple devices

7. **Deploy**
   - Deploy to Vercel/Netlify
   - Configure custom domain (optional)
   - Test in production
   - Share with couple

## Custom Domain Setup

Guide couples through:
1. Purchase domain (theknot.com, namecheap.com)
   - Suggestion format: `emilyandmichael.com` or `smithwedding2026.com`
2. Configure DNS settings
3. Connect to Vercel/Netlify
4. Enable HTTPS
5. Test domain access

## Template Variations

### Single-Page vs Multi-Page
**Single-Page** (Recommended):
- Smooth scrolling
- All content accessible
- Better for mobile
- Simpler navigation

**Multi-Page**:
- Dedicated pages per section
- Better for content-heavy sites
- Traditional navigation
- Easier to update individual pages

### Feature Toggles
Allow enabling/disabling:
- Photo gallery
- RSVP form (if using external tool)
- Registry section
- Wedding party page
- Livestream option
- Song requests
- Guest book

## Integration Options

### RSVP Integration
- Built-in form with Supabase
- Joy.com integration
- The Knot integration
- Zola integration
- Google Forms embed

### Registry Integration
- Amazon Wedding Registry
- Zola
- The Knot
- Target
- Crate & Barrel
- Honeyfund

### Calendar Integration
Generate .ics files for:
- Google Calendar
- Apple Calendar
- Outlook
- Yahoo Calendar

### Email Collection
- Mailchimp integration for updates
- Email notifications on RSVP
- Thank you email automation

## Analytics & Insights

Optionally add:
- Google Analytics
- Page view tracking
- RSVP conversion rate
- Most visited sections
- Device/browser stats

## Quality Checklist

- [ ] All couple information accurate
- [ ] Dates and times correct
- [ ] Addresses complete and correct
- [ ] Maps working and accurate
- [ ] RSVP form tested and functional
- [ ] All links working (registry, hotels)
- [ ] Photos optimized and loading fast
- [ ] Mobile responsive on all devices
- [ ] Typography hierarchy clear
- [ ] Colors matching wedding palette
- [ ] Animations smooth and purposeful
- [ ] Loading speed <3 seconds
- [ ] SEO meta tags configured
- [ ] Accessibility tested
- [ ] Browser compatibility verified
- [ ] SSL/HTTPS enabled
- [ ] Custom domain connected (if applicable)

## Post-Launch Support

Guide couples on:
- How to update content
- Adding/removing guests for RSVP
- Downloading RSVP responses
- Posting day-of updates
- Converting to wedding memories site after wedding
- Archiving site post-wedding

## Example Domains & URLs

Suggest domain patterns:
- `firstnamelastname.com` (emilyandmichael.com)
- `weddinglastname.com` (smithwedding.com)
- `lastnamelastname.com` (smithanderson.com)
- `yearlastname.com` (2026smith.com)
- `getogethertogetherevents.com` (creative unique)

## Template Showcase

See [template-gallery.md](references/template-gallery.md) for:
- Screenshots of each template style
- Live demo links
- Code examples
- Customization options
- Real wedding examples
