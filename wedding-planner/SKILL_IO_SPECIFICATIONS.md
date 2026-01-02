# Skill Input/Output Specifications
## Elite Wedding Planner - Complete Skill System Reference

This document defines the expected **inputs** and **outputs** for each skill, enabling consistent implementation across the wedding webapp.

---

# WEDDING-SPECIFIC SKILLS

---

## 1. wedding-website-template

**Purpose:** Generate beautiful, customized wedding websites for couples

### INPUTS

| Input Field | Type | Required | Description | Example |
|-------------|------|----------|-------------|---------|
| `coupleNames` | object | Yes | Both partners' names | `{ partner1: "Emily", partner2: "Michael" }` |
| `weddingDate` | string | Yes | Wedding date (ISO format) | `"2026-06-15"` |
| `weddingTime` | string | Yes | Ceremony start time | `"17:30"` |
| `venues` | object | Yes | Ceremony & reception locations | See venue schema below |
| `templateStyle` | enum | Yes | Design aesthetic | `"modern-minimalist"`, `"classic-elegance"`, `"romantic-garden"`, `"rustic-charm"`, `"luxury-glamour"`, `"beach-destination"` |
| `colorPalette` | object | Yes | Wedding colors | `{ primary: "#ee2b5b", secondary: "#d4af37", accent: "#1a1a2e" }` |
| `ourStory` | object | No | Relationship timeline | `{ howWeMet: "...", proposal: "...", timeline: [...] }` |
| `weddingParty` | array | No | Bridesmaids/groomsmen | `[{ name, role, photo, bio }]` |
| `photos` | object | No | Image assets | `{ hero: "url", gallery: ["url1", "url2"], engagement: ["url"] }` |
| `travelInfo` | object | No | Hotels, transport | `{ hotels: [...], airports: [...], transportation: [...] }` |
| `registry` | array | No | Gift registry links | `[{ store: "Amazon", url: "..." }]` |
| `faq` | array | No | Common questions | `[{ question: "...", answer: "..." }]` |
| `rsvpEnabled` | boolean | No | Enable RSVP form | `true` |
| `rsvpDeadline` | string | No | RSVP cutoff date | `"2026-05-15"` |
| `mealOptions` | array | No | Dinner choices | `["Chicken", "Fish", "Vegetarian"]` |
| `customDomain` | string | No | Custom URL | `"emilyandmichael.com"` |

**Venue Schema:**
```typescript
{
  ceremony: {
    name: string;
    address: string;
    city: string;
    coordinates: { lat: number; lng: number };
    mapUrl?: string;
  };
  reception: {
    name: string;
    address: string;
    city: string;
    coordinates: { lat: number; lng: number };
    mapUrl?: string;
  };
}
```

### OUTPUTS

| Output | Type | Description |
|--------|------|-------------|
| `websiteUrl` | string | Live website URL |
| `previewUrl` | string | Preview link before publish |
| `pages` | object | Generated page components |
| `rsvpFormId` | string | RSVP form identifier |
| `analytics` | object | Tracking configuration |
| `seoMetadata` | object | SEO tags and Open Graph |
| `qrCode` | string | QR code image for invitations |

**Generated Pages:**
```typescript
{
  home: ReactComponent;         // Hero + countdown
  story: ReactComponent;        // Our story timeline
  details: ReactComponent;      // Event info + maps
  rsvp: ReactComponent;         // RSVP form
  travel: ReactComponent;       // Hotels + transport
  registry: ReactComponent;     // Gift registry links
  gallery: ReactComponent;      // Photo gallery
  faq: ReactComponent;          // FAQ section
  weddingParty: ReactComponent; // Bridesmaids/groomsmen
}
```

---

## 2. wedding-planning-assistant

**Purpose:** AI-powered wedding planning advice and recommendations

### INPUTS

| Input Field | Type | Required | Description | Example |
|-------------|------|----------|-------------|---------|
| `query` | string | Yes | User's question or request | `"What flowers are best for a fall outdoor wedding?"` |
| `context` | object | No | Wedding details for personalization | See context schema |
| `conversationHistory` | array | No | Previous Q&A for continuity | `[{ role: "user", content: "..." }]` |
| `category` | enum | No | Topic filter | `"venues"`, `"budget"`, `"vendors"`, `"decor"`, `"etiquette"`, `"timeline"` |

**Context Schema:**
```typescript
{
  weddingDate: string;
  budget: number;
  guestCount: number;
  location: string;
  style: string;           // "rustic", "modern", "traditional", etc.
  season: string;          // "spring", "summer", "fall", "winter"
  venueType: string;       // "outdoor", "indoor", "beach", "ballroom"
  culturalTraditions: string[];
  priorities: string[];    // ["photography", "food", "music"]
}
```

### OUTPUTS

| Output | Type | Description |
|--------|------|-------------|
| `response` | string | AI-generated answer |
| `recommendations` | array | Specific suggestions |
| `alternatives` | array | Budget-friendly options |
| `relatedQuestions` | array | Follow-up question prompts |
| `resources` | array | Relevant links/articles |
| `confidence` | number | Response confidence (0-1) |

**Recommendation Schema:**
```typescript
{
  title: string;
  description: string;
  priceRange: { min: number; max: number };
  pros: string[];
  cons: string[];
  bestFor: string;
  image?: string;
}
```

---

## 3. wedding-budget-tracker

**Purpose:** Create and manage wedding budgets with expense tracking

### INPUTS

| Input Field | Type | Required | Description | Example |
|-------------|------|----------|-------------|---------|
| `totalBudget` | number | Yes | Total wedding budget | `50000` |
| `guestCount` | number | Yes | Expected guests | `150` |
| `weddingDate` | string | Yes | For payment scheduling | `"2026-06-15"` |
| `priorities` | array | No | High-priority categories | `["photography", "venue", "catering"]` |
| `expenses` | array | No | Existing expenses | See expense schema |
| `customCategories` | array | No | Additional budget categories | `["rehearsal-dinner", "honeymoon"]` |
| `currency` | string | No | Currency code | `"INR"`, `"USD"` |

**Expense Schema:**
```typescript
{
  id: string;
  category: string;
  vendor: string;
  description: string;
  estimatedCost: number;
  actualCost: number;
  depositPaid: number;
  depositDate: string;
  balanceDue: number;
  dueDate: string;
  status: "pending" | "partial" | "paid";
  notes: string;
}
```

### OUTPUTS

| Output | Type | Description |
|--------|------|-------------|
| `budgetBreakdown` | object | Allocation by category |
| `expenses` | array | All tracked expenses |
| `summary` | object | Financial summary |
| `alerts` | array | Budget warnings |
| `paymentSchedule` | array | Upcoming payments |
| `reports` | object | Visual reports |

**Budget Breakdown Schema:**
```typescript
{
  venue: { allocated: 15000, spent: 12000, remaining: 3000, percentage: 30 },
  catering: { allocated: 12500, spent: 10000, remaining: 2500, percentage: 25 },
  photography: { allocated: 5000, spent: 5000, remaining: 0, percentage: 10 },
  // ... other categories
}
```

**Summary Schema:**
```typescript
{
  totalBudget: number;
  totalAllocated: number;
  totalSpent: number;
  totalPaid: number;
  totalRemaining: number;
  overUnderBudget: number;
  costPerGuest: number;
  percentComplete: number;
}
```

**Reports Schema:**
```typescript
{
  pieChart: { categoryData: [...] };           // Spending by category
  barChart: { estimatedVsActual: [...] };      // Budget vs actual
  timeline: { paymentSchedule: [...] };        // Payment due dates
  progressBar: { paidVsRemaining: number };    // Completion percentage
}
```

---

## 4. vendor-management

**Purpose:** Track vendors, contracts, payments, and communications

### INPUTS

| Input Field | Type | Required | Description | Example |
|-------------|------|----------|-------------|---------|
| `action` | enum | Yes | Operation type | `"add"`, `"update"`, `"compare"`, `"search"`, `"getTimeline"` |
| `vendor` | object | Conditional | Vendor details (for add/update) | See vendor schema |
| `vendorIds` | array | Conditional | IDs for comparison | `["v1", "v2", "v3"]` |
| `category` | string | Conditional | Filter by type | `"photographer"`, `"caterer"`, `"florist"` |
| `searchQuery` | string | Conditional | Search term | `"Mumbai photographer" |

**Vendor Schema:**
```typescript
{
  id: string;
  category: "venue" | "photographer" | "videographer" | "caterer" | "florist" | "dj" | "band" | "cake" | "makeup" | "transportation" | "rentals" | "planner" | "officiant" | "other";
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  website?: string;
  address?: string;
  instagram?: string;

  // Service details
  packageName: string;
  packageDetails: string;
  serviceDate: string;
  serviceTime: string;
  setupTime?: string;

  // Financial
  totalCost: number;
  depositAmount: number;
  depositDueDate: string;
  depositPaidDate?: string;
  balanceAmount: number;
  balanceDueDate: string;
  balancePaidDate?: string;

  // Contract
  contractSigned: boolean;
  contractDate?: string;
  contractFile?: string;
  cancellationPolicy?: string;
  insuranceVerified: boolean;

  // Status
  status: "researching" | "contacted" | "meeting-scheduled" | "awaiting-contract" | "booked" | "payment-due" | "fully-paid";
  priority: "urgent" | "high" | "medium" | "low";
  rating?: number;
  notes?: string;

  // Communication log
  communications: Array<{
    date: string;
    method: "email" | "phone" | "meeting" | "text";
    summary: string;
    actionItems?: string[];
    followUpDate?: string;
  }>;
}
```

### OUTPUTS

| Output | Type | Description |
|--------|------|-------------|
| `vendors` | array | List of vendors |
| `comparison` | object | Side-by-side comparison |
| `paymentTimeline` | array | Payment schedule |
| `contactSheet` | object | Day-of contact list |
| `dashboard` | object | Vendor status overview |
| `alerts` | array | Upcoming deadlines |

**Comparison Output:**
```typescript
{
  vendors: [
    { id: "v1", name: "...", price: 50000, rating: 4.5, pros: [...], cons: [...] },
    { id: "v2", name: "...", price: 45000, rating: 4.2, pros: [...], cons: [...] },
  ],
  criteria: ["price", "availability", "portfolio", "reviews", "personality"],
  recommendation: "v1",
  reasoning: "..."
}
```

**Dashboard Output:**
```typescript
{
  totalVendors: 12,
  booked: 8,
  pending: 3,
  researching: 1,
  totalContractValue: 450000,
  totalPaid: 180000,
  totalRemaining: 270000,
  upcomingPayments: [...],
  upcomingMeetings: [...],
  statusBreakdown: {
    "booked": 8,
    "payment-due": 2,
    "meeting-scheduled": 1,
    "researching": 1
  }
}
```

---

## 5. wedding-timeline-builder

**Purpose:** Create planning schedules and day-of timelines

### INPUTS

| Input Field | Type | Required | Description | Example |
|-------------|------|----------|-------------|---------|
| `timelineType` | enum | Yes | Type of timeline | `"day-of"`, `"planning"`, `"vendor"`, `"ceremony"`, `"reception"` |
| `weddingDate` | string | Yes | Wedding date | `"2026-06-15"` |
| `ceremonyTime` | string | Conditional | Ceremony start (for day-of) | `"17:30"` |
| `venues` | object | Conditional | Location details | `{ ceremony: {...}, reception: {...} }` |
| `vendors` | array | Conditional | Vendor list with times | `[{ name, arrivalTime, departureTime }]` |
| `events` | array | No | Custom events to include | `[{ name, time, duration, notes }]` |
| `weddingPartySize` | number | No | Bridesmaids + groomsmen count | `10` |
| `photoStyle` | enum | No | Photography approach | `"first-look"`, `"traditional"` |
| `culturalElements` | array | No | Special traditions | `["haldi", "mehendi", "sangeet"]` |
| `receptionEvents` | array | No | Reception activities | `["first-dance", "toasts", "cake-cutting", "bouquet-toss"]` |

### OUTPUTS

| Output | Type | Description |
|--------|------|-------------|
| `timeline` | array | Complete timeline entries |
| `vendorTimeline` | array | Vendor-specific schedule |
| `planningChecklist` | array | Month-by-month tasks |
| `ceremonyFlow` | array | Ceremony minute-by-minute |
| `alerts` | array | Scheduling conflicts |

**Timeline Entry Schema:**
```typescript
{
  id: string;
  time: string;           // "17:30"
  endTime?: string;       // "18:00"
  duration: number;       // minutes
  event: string;          // "Ceremony begins"
  location?: string;
  participants: string[]; // ["bride", "groom", "wedding-party"]
  vendor?: string;        // Responsible vendor
  notes?: string;
  isBuffer: boolean;      // Buffer time flag
  category: "getting-ready" | "photos" | "ceremony" | "cocktail" | "reception" | "vendor-setup" | "other";
}
```

**Planning Checklist Entry:**
```typescript
{
  id: string;
  monthsOut: number;      // 12, 9, 6, 3, 2, 1, 0
  category: string;
  task: string;
  description?: string;
  status: "pending" | "in-progress" | "completed";
  dueDate?: string;
  assignedTo?: "couple" | "planner" | "vendor";
  priority: "high" | "medium" | "low";
}
```

---

## 6. seating-chart-designer

**Purpose:** Design seating arrangements and manage guest assignments

### INPUTS

| Input Field | Type | Required | Description | Example |
|-------------|------|----------|-------------|---------|
| `guests` | array | Yes | Guest list with details | See guest schema |
| `tables` | array | Yes | Table configuration | See table schema |
| `floorPlan` | object | No | Venue floor plan | `{ width: 100, height: 80, obstacles: [...] }` |
| `constraints` | array | No | Seating rules | `[{ type: "separate", guests: ["g1", "g2"] }]` |
| `preferences` | array | No | Seating preferences | `[{ type: "together", guests: ["g3", "g4"] }]` |
| `vipGuests` | array | No | Priority seating guests | `["g5", "g6"]` |
| `tableStyle` | enum | No | Naming convention | `"numbers"`, `"names"` |
| `tableNames` | array | No | Custom table names | `["Paris", "Rome", "Tokyo"]` |

**Guest Schema:**
```typescript
{
  id: string;
  firstName: string;
  lastName: string;
  plusOne?: string;         // Plus-one name
  relationship: "bride-family" | "groom-family" | "bride-friend" | "groom-friend" | "couple-friend" | "colleague" | "other";
  group?: string;           // "college-friends", "work-team"
  mealChoice?: string;
  dietaryRestrictions?: string[];
  accessibility?: string;   // "wheelchair", "hearing-impaired"
  tableAssignment?: string;
  rsvpStatus: "pending" | "attending" | "declined";
  notes?: string;
}
```

**Table Schema:**
```typescript
{
  id: string;
  number: number;
  name?: string;            // "Table 5" or "Paris"
  shape: "round" | "rectangular" | "square";
  capacity: number;
  position: { x: number; y: number };
  isHeadTable: boolean;
  isVip: boolean;
  assignedGuests: string[]; // guest IDs
}
```

### OUTPUTS

| Output | Type | Description |
|--------|------|-------------|
| `seatingChart` | object | Complete chart data |
| `floorPlanSvg` | string | Visual floor plan |
| `escortCards` | array | Printable escort cards |
| `tableCards` | array | Table assignment lists |
| `alphabeticalList` | array | Guest list with tables |
| `mealCounts` | object | Meals per table |
| `conflicts` | array | Unresolved seating issues |

**Seating Chart Output:**
```typescript
{
  tables: [
    {
      id: "t1",
      number: 1,
      name: "Head Table",
      guests: [
        { id: "g1", name: "Emily Smith", meal: "Chicken" },
        { id: "g2", name: "Michael Johnson", meal: "Fish" }
      ],
      mealCounts: { Chicken: 1, Fish: 1 }
    }
  ],
  unassigned: [...],
  totalGuests: 120,
  totalTables: 12,
  averagePerTable: 10
}
```

**Escort Card Output:**
```typescript
{
  guestName: "Mr. John Smith",
  tableName: "Table 5",
  mealChoice: "Chicken",
  template: "classic-elegance"
}
```

---

## 7. wedding-invitation-designer

**Purpose:** Design digital and printable wedding invitations

### INPUTS

| Input Field | Type | Required | Description | Example |
|-------------|------|----------|-------------|---------|
| `coupleNames` | object | Yes | Names for invitation | `{ partner1: "Emily", partner2: "Michael" }` |
| `weddingDate` | string | Yes | Event date | `"2026-06-15"` |
| `weddingTime` | string | Yes | Ceremony time | `"5:30 PM"` |
| `venue` | object | Yes | Location details | `{ name, address, city }` |
| `style` | enum | Yes | Design aesthetic | `"classic"`, `"modern"`, `"rustic"`, `"romantic"`, `"minimalist"`, `"luxury"` |
| `colorScheme` | object | Yes | Color palette | `{ primary, secondary, accent, background }` |
| `hostLine` | string | No | Hosted by text | `"Together with their families"` |
| `rsvpDetails` | object | No | RSVP information | `{ deadline, method, contact }` |
| `receptionDetails` | object | No | Reception info if separate | `{ venue, time }` |
| `customText` | object | No | Additional text | `{ dressCode, dinnerInfo }` |
| `outputFormats` | array | Yes | Desired formats | `["pdf", "png", "html"]` |
| `dimensions` | object | No | Size specifications | `{ width: 5, height: 7, unit: "inches" }` |

### OUTPUTS

| Output | Type | Description |
|--------|------|-------------|
| `invitation` | object | Main invitation design |
| `saveTheDate` | object | Save-the-date design |
| `rsvpCard` | object | RSVP card design |
| `detailsCard` | object | Additional details card |
| `envelope` | object | Envelope design |
| `suite` | object | Complete stationery suite |

**Invitation Output:**
```typescript
{
  design: {
    html: string;           // HTML version
    pdf: string;            // PDF download URL
    png: string;            // Image version
    svg: string;            // Vector version
  },
  preview: string;          // Preview image URL
  printSpecs: {
    dimensions: { width, height, unit },
    bleed: number,
    resolution: number,
    colorMode: "CMYK" | "RGB"
  },
  digitalVersion: {
    emailHtml: string,
    socialMediaImage: string,
    whatsAppImage: string
  }
}
```

---

## 8. client-wedding-manager

**Purpose:** Wedding planner's client portfolio management system

### INPUTS

| Input Field | Type | Required | Description | Example |
|-------------|------|----------|-------------|---------|
| `action` | enum | Yes | Operation type | `"create"`, `"update"`, `"getStatus"`, `"generateReport"` |
| `client` | object | Conditional | Client details | See client schema |
| `clientId` | string | Conditional | Client identifier | `"c-2026-001"` |
| `reportType` | enum | Conditional | Report to generate | `"progress"`, `"budget"`, `"timeline"`, `"vendor"` |
| `dateRange` | object | No | Filter by dates | `{ start: "2026-01-01", end: "2026-12-31" }` |

**Client Schema:**
```typescript
{
  id: string;

  // Basic info
  partner1: { firstName, lastName, email, phone };
  partner2: { firstName, lastName, email, phone };
  weddingDate: string;

  // Wedding details
  venue: { ceremony, reception };
  guestCount: { estimated, confirmed };
  style: string;
  colorPalette: string[];

  // Service
  packageType: "full-service" | "partial" | "day-of" | "consultation";
  contractDate: string;
  contractValue: number;
  paymentSchedule: Array<{ amount, dueDate, status }>;

  // Status
  status: "onboarding" | "planning" | "final-details" | "week-of" | "completed";
  progressPercent: number;

  // Related data
  vendors: string[];        // vendor IDs
  budgetId: string;
  timelineId: string;
  seatingChartId: string;

  // Communication
  preferredContact: "email" | "phone" | "text" | "whatsapp";
  communicationLog: Array<{ date, type, summary }>;
  nextFollowUp: string;

  // Notes
  specialRequirements: string[];
  familyDynamics: string;
  notes: string;
}
```

### OUTPUTS

| Output | Type | Description |
|--------|------|-------------|
| `client` | object | Client details |
| `clients` | array | Client list |
| `dashboard` | object | Overview stats |
| `progressReport` | object | Planning progress |
| `alerts` | array | Action items |
| `calendar` | array | Upcoming events |

**Dashboard Output:**
```typescript
{
  totalClients: 15,
  activeWeddings: 8,
  upcomingThisMonth: 2,
  recentlyCompleted: 3,

  revenue: {
    total: 2500000,
    collected: 1800000,
    pending: 700000
  },

  byStatus: {
    "onboarding": 2,
    "planning": 4,
    "final-details": 2,
    "week-of": 0,
    "completed": 7
  },

  urgentActions: [
    { clientId: "c1", action: "Send timeline", dueDate: "2026-01-10" }
  ],

  upcomingWeddings: [
    { clientId: "c2", date: "2026-01-20", venue: "..." }
  ]
}
```

---

# GENERAL SKILLS

---

## 9. frontend-design

**Purpose:** Create distinctive, production-grade UI components

### INPUTS

| Input Field | Type | Required | Description | Example |
|-------------|------|----------|-------------|---------|
| `component` | string | Yes | What to build | `"hero-section"`, `"card-grid"`, `"form"` |
| `aesthetic` | string | Yes | Design direction | `"luxury-refined"`, `"modern-minimalist"`, `"romantic-garden"` |
| `framework` | enum | No | Tech stack | `"react"`, `"nextjs"`, `"html"`, `"vue"` |
| `colorPalette` | object | No | Colors to use | `{ primary, secondary, background, text }` |
| `typography` | object | No | Font choices | `{ heading: "Playfair Display", body: "Plus Jakarta Sans" }` |
| `animations` | boolean | No | Include animations | `true` |
| `responsive` | boolean | No | Mobile responsive | `true` |
| `content` | object | No | Content to include | Component-specific data |

### OUTPUTS

| Output | Type | Description |
|--------|------|-------------|
| `code` | string | Component code |
| `styles` | string | CSS/Tailwind styles |
| `preview` | string | Preview image |
| `dependencies` | array | Required packages |
| `usage` | string | Implementation guide |

---

## 10. webapp-testing

**Purpose:** Create and run Playwright tests for the wedding webapp

### INPUTS

| Input Field | Type | Required | Description | Example |
|-------------|------|----------|-------------|---------|
| `testType` | enum | Yes | Test category | `"e2e"`, `"component"`, `"visual"`, `"accessibility"` |
| `target` | string | Yes | What to test | `"contact-form"`, `"navigation"`, `"rsvp-flow"` |
| `baseUrl` | string | No | Application URL | `"http://localhost:3000"` |
| `scenarios` | array | No | Test scenarios | `[{ name, steps, expected }]` |
| `devices` | array | No | Devices to test | `["desktop", "mobile", "tablet"]` |

### OUTPUTS

| Output | Type | Description |
|--------|------|-------------|
| `testFile` | string | Playwright test code |
| `config` | string | Test configuration |
| `results` | object | Test execution results |
| `coverage` | object | Code coverage report |
| `screenshots` | array | Failure screenshots |

---

## 11. canvas-design

**Purpose:** Create visual assets (PNG/PDF) for wedding materials

### INPUTS

| Input Field | Type | Required | Description | Example |
|-------------|------|----------|-------------|---------|
| `assetType` | enum | Yes | Type of asset | `"logo"`, `"social-graphic"`, `"print-material"`, `"banner"` |
| `dimensions` | object | Yes | Size | `{ width: 1080, height: 1080, unit: "px" }` |
| `content` | object | Yes | Text and images | `{ headline, subtext, images }` |
| `style` | string | Yes | Visual style | `"elegant"`, `"playful"`, `"minimal"` |
| `outputFormat` | enum | Yes | File format | `"png"`, `"pdf"`, `"svg"` |
| `colorPalette` | object | No | Colors | `{ primary, secondary, accent }` |

### OUTPUTS

| Output | Type | Description |
|--------|------|-------------|
| `asset` | string | Generated asset file |
| `thumbnail` | string | Preview thumbnail |
| `variants` | array | Size variations |
| `printReady` | string | Print-ready version |

---

## 12. pdf

**Purpose:** Generate PDF documents (contracts, reports, checklists)

### INPUTS

| Input Field | Type | Required | Description | Example |
|-------------|------|----------|-------------|---------|
| `documentType` | enum | Yes | PDF type | `"contract"`, `"timeline"`, `"checklist"`, `"report"`, `"invoice"` |
| `data` | object | Yes | Content data | Document-specific |
| `template` | string | No | Template style | `"professional"`, `"elegant"`, `"minimal"` |
| `branding` | object | No | Company branding | `{ logo, colors, fonts }` |
| `pageSize` | enum | No | Paper size | `"A4"`, `"Letter"` |

### OUTPUTS

| Output | Type | Description |
|--------|------|-------------|
| `pdf` | string | PDF file URL |
| `pageCount` | number | Number of pages |
| `preview` | array | Page preview images |
| `printOptimized` | string | Print-ready version |

---

## 13. xlsx

**Purpose:** Generate Excel spreadsheets (budgets, guest lists, vendor trackers)

### INPUTS

| Input Field | Type | Required | Description | Example |
|-------------|------|----------|-------------|---------|
| `spreadsheetType` | enum | Yes | Type | `"budget"`, `"guest-list"`, `"vendor-tracker"`, `"timeline"`, `"seating"` |
| `data` | array | Yes | Row data | `[{ name, value, ... }]` |
| `columns` | array | Yes | Column definitions | `[{ key, header, type, width }]` |
| `formulas` | array | No | Excel formulas | `[{ cell, formula }]` |
| `formatting` | object | No | Style rules | `{ headerColor, alternateRows }` |
| `sheets` | array | No | Multiple sheets | `[{ name, data }]` |

### OUTPUTS

| Output | Type | Description |
|--------|------|-------------|
| `xlsx` | string | Excel file URL |
| `sheets` | array | Sheet summaries |
| `formulas` | object | Applied formulas |
| `preview` | object | Data preview |

---

# USAGE EXAMPLES

## Creating a Wedding Website

```typescript
// Input
const websiteInput = {
  coupleNames: { partner1: "Emily", partner2: "Michael" },
  weddingDate: "2026-06-15",
  weddingTime: "17:30",
  venues: {
    ceremony: { name: "Taj Lake Palace", address: "Udaipur", coordinates: { lat: 24.5754, lng: 73.6809 } },
    reception: { name: "Taj Lake Palace", address: "Udaipur", coordinates: { lat: 24.5754, lng: 73.6809 } }
  },
  templateStyle: "luxury-glamour",
  colorPalette: { primary: "#d4af37", secondary: "#1a1a2e", accent: "#ee2b5b" },
  rsvpEnabled: true,
  rsvpDeadline: "2026-05-15",
  mealOptions: ["Vegetarian Thali", "Non-Veg Thali", "Jain"]
};

// Output
const websiteOutput = {
  websiteUrl: "https://emilyandmichael.eliteweddingplanner.in",
  previewUrl: "https://preview.eliteweddingplanner.in/abc123",
  qrCode: "https://cdn.../qr-code.png",
  pages: { home, story, details, rsvp, travel, registry, gallery, faq }
};
```

## Generating a Budget

```typescript
// Input
const budgetInput = {
  totalBudget: 5000000,  // ₹50 Lakhs
  guestCount: 200,
  weddingDate: "2026-06-15",
  priorities: ["venue", "photography", "catering"],
  currency: "INR"
};

// Output
const budgetOutput = {
  budgetBreakdown: {
    venue: { allocated: 1500000, percentage: 30 },
    catering: { allocated: 1250000, percentage: 25 },
    photography: { allocated: 500000, percentage: 10 },
    // ...
  },
  summary: {
    totalBudget: 5000000,
    costPerGuest: 25000,
    percentComplete: 0
  }
};
```

## Creating a Day-of Timeline

```typescript
// Input
const timelineInput = {
  timelineType: "day-of",
  weddingDate: "2026-06-15",
  ceremonyTime: "17:30",
  photoStyle: "first-look",
  receptionEvents: ["first-dance", "toasts", "cake-cutting"]
};

// Output
const timelineOutput = {
  timeline: [
    { time: "14:00", event: "Hair & makeup begins", category: "getting-ready" },
    { time: "15:00", event: "Photographer arrives", category: "vendor-setup" },
    { time: "16:00", event: "First look", category: "photos" },
    { time: "17:30", event: "Ceremony begins", category: "ceremony" },
    // ...
  ]
};
```

---

# INTEGRATION NOTES

## Skill Chaining

Skills can be chained together for complex workflows:

1. **New Client Onboarding:**
   - `client-wedding-manager` → Create client
   - `wedding-budget-tracker` → Set up budget
   - `wedding-timeline-builder` → Create planning checklist
   - `vendor-management` → Initialize vendor tracking

2. **Wedding Website Creation:**
   - `wedding-planning-assistant` → Get recommendations
   - `wedding-website-template` → Generate website
   - `wedding-invitation-designer` → Create matching invitations

3. **Day-of Preparation:**
   - `wedding-timeline-builder` → Generate day-of timeline
   - `seating-chart-designer` → Create seating chart
   - `vendor-management` → Generate contact sheet
   - `pdf` → Export all documents

## Data Flow

```
client-wedding-manager
         │
         ├──► wedding-budget-tracker
         │
         ├──► vendor-management
         │
         ├──► wedding-timeline-builder
         │
         └──► seating-chart-designer
                    │
                    └──► pdf (export)
```

---

# SEO & CONTENT SKILLS

---

## 14. seo-content-writer

**Purpose:** Create high-quality, SEO-optimized content that ranks

### INPUTS

| Input Field | Type | Required | Description | Example |
|-------------|------|----------|-------------|---------|
| `topic` | string | Yes | Content topic | `"destination wedding in Udaipur"` |
| `primaryKeyword` | string | Yes | Main target keyword | `"Udaipur wedding planner"` |
| `secondaryKeywords` | array | No | Related keywords | `["palace wedding", "royal wedding venue"]` |
| `contentType` | enum | Yes | Type of content | `"blog"`, `"guide"`, `"landing-page"`, `"comparison"` |
| `targetWordCount` | number | No | Desired length | `2000` |
| `searchIntent` | enum | No | User intent | `"informational"`, `"commercial"`, `"transactional"` |
| `targetAudience` | string | No | Who is reading | `"couples planning destination wedding"` |
| `tone` | enum | No | Writing style | `"professional"`, `"friendly"`, `"luxury"` |
| `competitorUrls` | array | No | URLs to outrank | `["competitor1.com/article"]` |

### OUTPUTS

| Output | Type | Description |
|--------|------|-------------|
| `title` | string | SEO-optimized title (50-60 chars) |
| `metaDescription` | string | Click-worthy description (150-160 chars) |
| `content` | string | Full article with H1-H6 structure |
| `faqSection` | array | FAQ questions for snippets |
| `internalLinks` | array | Suggested internal link anchors |
| `externalLinks` | array | Authority sources to cite |
| `seoScore` | number | Content optimization score (0-10) |

---

## 15. geo-content-optimizer

**Purpose:** Optimize content for AI citations (GEO - Generative Engine Optimization)

### INPUTS

| Input Field | Type | Required | Description | Example |
|-------------|------|----------|-------------|---------|
| `content` | string | Yes | Content to optimize | Article text or URL |
| `topic` | string | Yes | Content topic | `"wedding budget planning"` |
| `targetQueries` | array | No | AI queries to target | `["how much does a wedding cost"]` |

### OUTPUTS

| Output | Type | Description |
|--------|------|-------------|
| `optimizedContent` | string | GEO-enhanced content |
| `definitions` | array | Clear, quotable definitions added |
| `quotableStatements` | array | AI-citation-ready statements |
| `authoritySignals` | array | Expert quotes and sources added |
| `geoScore` | object | Before/after GEO score |
| `aiQueryCoverage` | array | Queries this content answers |

---

## 16. meta-tags-optimizer

**Purpose:** Create optimized meta tags for maximum CTR

### INPUTS

| Input Field | Type | Required | Description | Example |
|-------------|------|----------|-------------|---------|
| `pageUrl` | string | Yes | Page to optimize | `/destinations/udaipur` |
| `pageType` | enum | Yes | Type of page | `"blog"`, `"service"`, `"landing"`, `"product"` |
| `primaryKeyword` | string | Yes | Target keyword | `"Udaipur wedding venue"` |
| `uniqueValue` | string | No | What makes page special | `"50+ palace venues listed"` |
| `ctaGoal` | string | No | Desired action | `"Request consultation"` |

### OUTPUTS

| Output | Type | Description |
|--------|------|-------------|
| `titleTag` | object | Title with length and variations |
| `metaDescription` | object | Description with CTA |
| `ogTags` | object | Open Graph tags for social |
| `twitterCard` | object | Twitter-specific tags |
| `canonicalUrl` | string | Canonical URL |
| `structuredData` | object | Recommended schema |
| `ctrPrediction` | number | Expected CTR improvement |

---

## 17. schema-markup-generator

**Purpose:** Generate JSON-LD structured data for rich results

### INPUTS

| Input Field | Type | Required | Description | Example |
|-------------|------|----------|-------------|---------|
| `pageType` | enum | Yes | Content type | `"article"`, `"faq"`, `"product"`, `"local-business"`, `"how-to"`, `"event"` |
| `content` | object | Yes | Page content data | Schema-specific fields |
| `websiteInfo` | object | No | Site-wide info | `{ name, url, logo }` |

### OUTPUTS

| Output | Type | Description |
|--------|------|-------------|
| `schema` | object | JSON-LD markup |
| `htmlScript` | string | Ready-to-paste HTML |
| `richResultType` | string | Eligible SERP feature |
| `validationStatus` | object | Schema.org validation |
| `serpPreview` | string | How it appears in search |

**Schema Types Supported:**
- FAQPage, HowTo, Article, BlogPosting
- LocalBusiness, Organization, WeddingEventPlanningService
- Product, Review, AggregateRating
- Event, BreadcrumbList, VideoObject

---

## 18. on-page-seo-auditor

**Purpose:** Comprehensive on-page SEO audits

### INPUTS

| Input Field | Type | Required | Description | Example |
|-------------|------|----------|-------------|---------|
| `pageUrl` | string | Yes | Page to audit | `/services/destination` |
| `targetKeyword` | string | Yes | Primary keyword | `"destination wedding planner"` |
| `competitorUrls` | array | No | Competitor pages | `["comp1.com/page"]` |

### OUTPUTS

| Output | Type | Description |
|--------|------|-------------|
| `overallScore` | number | SEO score (0-100) |
| `titleAnalysis` | object | Title tag audit |
| `metaAnalysis` | object | Meta description audit |
| `headerAnalysis` | object | H1-H6 structure audit |
| `contentAnalysis` | object | Content quality & keywords |
| `imageAnalysis` | object | Alt text, optimization |
| `linkAnalysis` | object | Internal/external links |
| `technicalAnalysis` | object | URL, canonical, mobile |
| `prioritizedFixes` | array | Ranked recommendations |
| `competitorGaps` | array | What competitors do better |

---

## 19. content-refresher

**Purpose:** Update outdated content to restore rankings

### INPUTS

| Input Field | Type | Required | Description | Example |
|-------------|------|----------|-------------|---------|
| `contentUrl` | string | Yes | Content to refresh | `/blog/wedding-trends-2024` |
| `currentYear` | number | Yes | Update to year | `2026` |
| `performanceData` | object | No | Traffic decline data | `{ before: 5000, after: 2000 }` |

### OUTPUTS

| Output | Type | Description |
|--------|------|-------------|
| `refreshPlan` | object | Detailed update plan |
| `outdatedElements` | array | Stats, dates to update |
| `newSections` | array | Content gaps to fill |
| `seoUpdates` | array | Title, meta changes |
| `geoEnhancements` | array | AI optimization additions |
| `republishStrategy` | object | Date, promotion plan |

---

## 20. technical-seo-checker

**Purpose:** Technical SEO audit for crawlability and indexability

### INPUTS

| Input Field | Type | Required | Description | Example |
|-------------|------|----------|-------------|---------|
| `domain` | string | Yes | Site to audit | `eliteweddingplanner.in` |
| `scope` | enum | No | Audit depth | `"full"`, `"quick"`, `"specific"` |
| `focusAreas` | array | No | Priority areas | `["speed", "mobile", "security"]` |

### OUTPUTS

| Output | Type | Description |
|--------|------|-------------|
| `healthScore` | number | Technical health (0-100) |
| `crawlability` | object | Robots.txt, sitemap audit |
| `indexability` | object | Index blockers, canonicals |
| `coreWebVitals` | object | LCP, FID, CLS scores |
| `mobileScore` | object | Mobile-friendliness |
| `securityAudit` | object | HTTPS, headers |
| `structuredData` | object | Schema validation |
| `criticalIssues` | array | Priority fixes |
| `implementationRoadmap` | array | Week-by-week plan |

---

# ADDITIONAL UTILITY SKILLS

---

## 21. docx

**Purpose:** Generate Word documents (contracts, proposals)

### INPUTS

| Input Field | Type | Required | Description | Example |
|-------------|------|----------|-------------|---------|
| `documentType` | enum | Yes | Document type | `"contract"`, `"proposal"`, `"letter"` |
| `content` | object | Yes | Document content | Document-specific |
| `template` | string | No | Style template | `"professional"`, `"elegant"` |
| `branding` | object | No | Company branding | `{ logo, colors }` |

### OUTPUTS

| Output | Type | Description |
|--------|------|-------------|
| `docx` | string | Word document file |
| `preview` | string | Preview image |

---

## 22. pptx

**Purpose:** Generate PowerPoint presentations

### INPUTS

| Input Field | Type | Required | Description | Example |
|-------------|------|----------|-------------|---------|
| `title` | string | Yes | Presentation title | `"Wedding Proposal - Smith & Johnson"` |
| `slides` | array | Yes | Slide content | `[{ title, content, images }]` |
| `template` | string | No | Design template | `"luxury"`, `"minimal"` |
| `branding` | object | No | Company branding | `{ logo, colors }` |

### OUTPUTS

| Output | Type | Description |
|--------|------|-------------|
| `pptx` | string | PowerPoint file |
| `pdf` | string | PDF version |
| `slides` | array | Individual slide images |

---

## 23. theme-factory

**Purpose:** Apply professional themes to artifacts

### INPUTS

| Input Field | Type | Required | Description | Example |
|-------------|------|----------|-------------|---------|
| `artifact` | string | Yes | File to style | Path to file |
| `theme` | enum | Yes | Pre-set theme | `"Ocean Depths"`, `"Golden Hour"`, `"Desert Rose"` |
| `customColors` | object | No | Custom overrides | `{ primary, secondary }` |

**Available Themes:** Ocean Depths, Sunset Boulevard, Forest Canopy, Modern Minimalist, Golden Hour, Arctic Frost, Desert Rose, Tech Innovation, Botanical Garden, Midnight Galaxy

### OUTPUTS

| Output | Type | Description |
|--------|------|-------------|
| `styledArtifact` | string | Themed file |
| `themeDetails` | object | Applied colors/fonts |
| `preview` | string | Preview image |

---

## 24. algorithmic-art

**Purpose:** Create generative art using p5.js

### INPUTS

| Input Field | Type | Required | Description | Example |
|-------------|------|----------|-------------|---------|
| `concept` | string | Yes | Art theme | `"flowing particles"`, `"organic growth"` |
| `colorPalette` | array | No | Colors to use | `["#ee2b5b", "#d4af37"]` |
| `dimensions` | object | No | Canvas size | `{ width: 1200, height: 1200 }` |
| `seed` | number | No | Reproducibility seed | `12345` |
| `animated` | boolean | No | Create animation | `true` |

### OUTPUTS

| Output | Type | Description |
|--------|------|-------------|
| `artifact` | string | Self-contained HTML with p5.js |
| `philosophy` | string | Design philosophy document |
| `parameters` | object | Tunable parameters |
| `preview` | string | Static preview |

---

## 25. internal-comms

**Purpose:** Draft internal communications in company voice

### INPUTS

| Input Field | Type | Required | Description | Example |
|-------------|------|----------|-------------|---------|
| `messageType` | enum | Yes | Communication type | `"announcement"`, `"update"`, `"faq"` |
| `audience` | string | Yes | Recipients | `"all-staff"`, `"team"`, `"clients"` |
| `topic` | string | Yes | Subject matter | `"New booking system launch"` |
| `keyPoints` | array | Yes | Points to cover | `["feature1", "timeline"]` |
| `tone` | enum | No | Communication style | `"formal"`, `"friendly"` |

### OUTPUTS

| Output | Type | Description |
|--------|------|-------------|
| `message` | string | Drafted communication |
| `subject` | string | Email subject line |
| `variants` | array | Alternative versions |

---

# SKILL CHAINING - COMPLETE WORKFLOWS

## SEO Content Creation Workflow

```
seo-content-writer          (Create optimized content)
        ↓
geo-content-optimizer       (Add AI citation signals)
        ↓
meta-tags-optimizer        (Optimize title/description)
        ↓
schema-markup-generator    (Add structured data)
        ↓
on-page-seo-auditor        (Final SEO check)
```

## Blog Post Publishing Workflow

```
seo-content-writer         (Write article)
        ↓
geo-content-optimizer      (GEO optimize)
        ↓
canvas-design              (Create featured image)
        ↓
meta-tags-optimizer        (Meta tags)
        ↓
schema-markup-generator    (Article + FAQ schema)
```

## Content Refresh Workflow

```
on-page-seo-auditor        (Audit current state)
        ↓
content-refresher          (Plan updates)
        ↓
seo-content-writer         (Write new sections)
        ↓
geo-content-optimizer      (Add AI signals)
        ↓
technical-seo-checker      (Verify technical health)
```

## Client Onboarding Workflow

```
client-wedding-manager     (Create client record)
        ↓
wedding-budget-tracker     (Set up budget)
        ↓
wedding-timeline-builder   (Create checklist)
        ↓
vendor-management          (Initialize tracking)
        ↓
pdf                        (Export welcome packet)
```

---

*This specification enables consistent implementation of all skills across the Elite Wedding Planner platform.*
