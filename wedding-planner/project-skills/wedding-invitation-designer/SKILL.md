---
name: wedding-invitation-designer
description: Create stunning, luxury wedding invitations and stationery suite designs (save-the-dates, RSVP cards, menus, programs, place cards, thank you cards). Use this skill when users need to design, customize, or generate wedding invitations or any wedding-related stationery. Supports multiple formats (digital/web, print-ready PDF, email templates) and styles (modern, classic, boho, rustic, luxury, destination). Automatically matches couple's aesthetic preferences and wedding theme.
---

# Wedding Invitation Designer

This skill creates professional, distinctive wedding invitations and complete stationery suites that reflect the couple's unique style and wedding theme.

## Design Thinking

Before creating any invitation, understand:

- **Couple's Story**: Names, wedding date, venue, relationship style
- **Aesthetic Direction**: Modern minimalist, classic elegance, boho chic, rustic, luxury glamour, destination exotic, art deco, garden romantic, beach casual, vintage
- **Color Palette**: Primary colors, accent colors (typically 2-4 colors max)
- **Typography Mood**: Elegant script, modern sans-serif, classic serif, playful, bold
- **Formality Level**: Black-tie formal, semi-formal, casual celebration
- **Cultural Elements**: Religious symbols, cultural traditions, bilingual text

## Invitation Suite Components

A complete wedding stationery suite includes:

1. **Save the Date** - Early announcement (6-8 months before)
2. **Main Invitation** - Formal wedding invitation
3. **RSVP Card** - Response card with deadline
4. **Details Card** - Accommodation, transportation, website
5. **Reception Card** - Dinner/party information
6. **Ceremony Program** - Order of events
7. **Menu Card** - Meal options and courses
8. **Place Card** - Guest seating assignment
9. **Table Number** - Reception table identification
10. **Thank You Card** - Post-wedding gratitude

## Output Formats

### Digital/Web Format
- Responsive HTML/React component
- Optimized for email and web viewing
- Interactive elements (RSVP buttons, map links)
- Shareable on social media

### Print-Ready PDF
- High-resolution (300 DPI minimum)
- CMYK color mode for professional printing
- Standard sizes with bleed (0.125" typical)
- Crop marks and printer instructions included

### Email Template
- Mobile-responsive HTML email
- Email-safe fonts and inline CSS
- Alt text for images
- Plain text fallback

## Design Principles

### Visual Hierarchy
1. **Primary**: Couple's names (largest, most prominent)
2. **Secondary**: Date and venue
3. **Tertiary**: Additional details and instructions
4. **Accent**: Decorative elements, borders, illustrations

### Typography Guidelines
- **Never use generic fonts**: Avoid Arial, Times New Roman, Calibri
- **Pairing strategy**: Pair elegant script with clean serif OR modern sans
- **Hierarchy through size**: 3-5 size variations maximum
- **Readable body text**: Minimum 10pt for print, 14px for digital

### Color Strategy
- **Monochromatic**: Single color with tints/shades (sophisticated)
- **Complementary**: Two opposite colors (vibrant)
- **Analogous**: Adjacent colors (harmonious)
- **Neutral + Accent**: Cream/ivory + metallic gold/rose gold (luxury)

### Layout Approaches
- **Centered Classic**: Formal, traditional, symmetrical
- **Asymmetric Modern**: Dynamic, contemporary, visual interest
- **Border Frame**: Decorative edge, contained design
- **Full Bleed**: Edge-to-edge graphics, bold statement
- **Layered Elements**: Overlapping text and graphics, depth

## Wedding Theme Templates

Reference [theme-templates.md](references/theme-templates.md) for detailed design patterns for each wedding style.

## Assets Library

The `assets/` folder contains:

- **Fonts**: Curated wedding-appropriate font pairings
- **Graphics**: Borders, flourishes, monogram templates, botanical elements
- **Textures**: Paper textures, watercolor washes, foil effects
- **Icons**: Location pins, calendar, hearts, rings, florals
- **Templates**: Base layouts for each invitation type

## Standard Invitation Sizes

### Print
- **Standard**: 5" × 7" (most common)
- **Square**: 5.5" × 5.5" (modern)
- **Tall**: 4" × 9" (elegant)
- **Postcard**: 4" × 6" (casual)
- **Folded Card**: 5" × 7" folded to 5" × 3.5"

### Digital
- **Email**: 600px wide (mobile-friendly)
- **Social Share**: 1080px × 1080px (Instagram), 1200px × 630px (Facebook)
- **Web**: Responsive fluid width, max 800px

## Wording Guidelines

### Formal Traditional
```
Mr. and Mrs. John Smith
request the honor of your presence
at the marriage of their daughter
Emily Rose
to
Michael James Anderson
Saturday, the fifteenth of June
two thousand twenty-six
at half after four in the afternoon
The Grand Ballroom
New York, New York
```

### Modern Casual
```
Emily & Michael
are getting married!
Join us for our wedding celebration
June 15, 2026 | 4:30 PM
The Grand Ballroom, NYC
Dinner, dancing & happily ever after to follow
```

### Couple Hosting
```
Together with their families
Emily Smith & Michael Anderson
invite you to celebrate their marriage
[details follow]
```

See [wording-examples.md](references/wording-examples.md) for more variations.

## Implementation Workflow

1. **Gather Requirements**
   - Couple names, date, venue, time
   - Aesthetic preferences and theme
   - Format needed (digital/print/email)
   - Special requests or cultural elements

2. **Choose Design Direction**
   - Select theme template or create custom
   - Define color palette (2-4 colors)
   - Select font pairing (display + body)
   - Determine layout style

3. **Create Primary Invitation**
   - Design main invitation first
   - Establish visual language and hierarchy
   - Get couple approval on design direction

4. **Design Suite Components**
   - Apply consistent design system to all pieces
   - Maintain typography, colors, decorative elements
   - Ensure cohesive suite aesthetic

5. **Output Generation**
   - Generate requested format(s)
   - Include print specifications for PDFs
   - Provide usage instructions
   - Create variations if needed (color options, sizes)

## Quality Checklist

Before delivering:
- [ ] All names spelled correctly
- [ ] Date and time accurate
- [ ] Venue address complete and correct
- [ ] Typography hierarchy clear and readable
- [ ] Colors harmonious and on-brand
- [ ] Layout balanced and visually appealing
- [ ] Bleed and crop marks included (print)
- [ ] High resolution 300+ DPI (print)
- [ ] Mobile responsive (digital)
- [ ] Proofreading complete (no typos)
- [ ] Consistent design across suite
- [ ] Cultural/religious elements accurate

## Advanced Features

### Personalization
- Guest name personalization for each invitation
- Custom monogram generation
- QR codes for wedding website/RSVP
- Variable data printing support

### Interactive Digital
- Animated entrance effects
- Parallax scrolling
- RSVP form integration
- Add to calendar button
- Google Maps integration
- Photo gallery carousel

### Print Techniques
- Foil stamping simulation
- Letterpress effect
- Embossing visualization
- Vellum overlay design
- Wax seal graphics

## Examples

See [example-invitations.md](references/example-invitations.md) for inspiration gallery spanning all major wedding styles.
