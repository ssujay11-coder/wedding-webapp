# Wedding Planning Module - Feature Specification

## Executive Summary

A comprehensive wedding planning platform for Indian destination weddings, supporting both wedding planners managing multiple client weddings and couples planning their own wedding directly.

---

## 1. User Roles & Personas

### 1.1 Couple (Direct User)
- Planning their own wedding
- Need self-service tools for guest management, RSVP, budgeting
- Want beautiful wedding website to share with guests
- Manage vendors and logistics independently

### 1.2 Wedding Planner (Professional)
- Manages multiple client weddings simultaneously
- Needs client management dashboard
- Requires collaboration tools with couples
- Professional vendor network and preferred pricing

### 1.3 Guest (Public User)
- Views wedding website
- Submits RSVP responses
- Access event details and logistics info
- No account required

---

## 2. Core Modules

### 2.1 Authentication & User Management
**Features:**
- Social login (Google, Facebook, Apple)
- Email/password registration
- Role-based access (Couple, Planner, Admin)
- Multi-tenant architecture
- Profile management

**User Stories:**
- As a couple, I can sign up with my Google account to start planning
- As a wedding planner, I can create a professional account to manage clients
- As a user, I can invite my partner to co-manage our wedding

### 2.2 Wedding Dashboard
**Features:**
- Wedding overview with key metrics
- Timeline/countdown to wedding day
- Quick access to all modules
- Activity feed and notifications
- Budget summary widget
- Guest count tracker

**User Stories:**
- As a couple, I can see my wedding progress at a glance
- As a planner, I can switch between different client weddings
- As a user, I receive notifications for RSVP responses

### 2.3 Guest Management
**Features:**
- Guest list with contact details
- Guest categorization (Family, Friends, Colleagues, VIP)
- Side designation (Bride's side, Groom's side, Mutual)
- Plus-one management
- Dietary restrictions and preferences
- Accommodation requirements tracking
- Guest grouping for table assignments
- Import from CSV/Excel
- Export guest list

**User Stories:**
- As a couple, I can add guests individually or import from spreadsheet
- As a user, I can track which guests have dietary restrictions
- As a planner, I can manage guest lists for multiple events

### 2.4 Wedding Website Builder
**Features:**
- Multiple template designs (Traditional, Modern, Minimalist, Royal)
- Custom subdomain (couple-name.eliteweddings.in)
- Customizable sections:
  - Home/Hero with couple photo
  - Our Story timeline
  - Event schedule
  - Venue information with maps
  - Travel & accommodation guide
  - RSVP form
  - Photo gallery
  - Registry links
  - FAQ section
- Mobile-responsive design
- Password protection option
- Custom domain support
- Social sharing

**User Stories:**
- As a couple, I can create a beautiful website in minutes
- As a guest, I can easily find all wedding details in one place
- As a user, I can customize colors and fonts to match my theme

### 2.5 RSVP Management
**Features:**
- Online RSVP form on wedding website
- Multiple event RSVPs (Mehendi, Sangeet, Wedding, Reception)
- Plus-one confirmation
- Meal preference selection
- Dietary restriction capture
- Accommodation preference
- Real-time response tracking
- Automated reminders
- Deadline management
- Response analytics dashboard

**User Stories:**
- As a guest, I can RSVP for all events in one form
- As a couple, I can see real-time RSVP status
- As a user, I can send reminder emails to pending guests

### 2.6 Vendor Management
**Features:**
- Vendor directory by category:
  - Photographers/Videographers
  - Decorators/Florists
  - Caterers
  - DJs/Entertainment
  - Makeup Artists
  - Mehendi Artists
  - Pandits/Officiants
  - Transportation
  - Accommodation
- Vendor profiles with portfolio
- Booking requests
- Contract management
- Payment tracking
- Review system
- Comparison tool
- Preferred vendor lists (for planners)

**User Stories:**
- As a couple, I can browse and compare vendors
- As a user, I can track vendor payments and contracts
- As a planner, I can recommend preferred vendors to clients

### 2.7 Venue Booking
**Features:**
- Integration with existing 50-venue database
- Availability calendar
- Booking requests
- Multiple venue support (different events)
- Venue comparison
- Virtual tours (embedded)
- Pricing calculator
- Contract tracking

**User Stories:**
- As a couple, I can check venue availability for my dates
- As a user, I can book multiple venues for different functions
- As a planner, I can manage venue relationships

### 2.8 Logistics Management
**Features:**
- Event schedule/itinerary builder
- Transportation planning
- Guest accommodation allocation
- Airport pickup scheduling
- Local travel arrangements
- Emergency contact directory
- Weather tracking for outdoor events
- Checklist templates
- Task assignments
- Vendor coordination schedule

**User Stories:**
- As a couple, I can plan the entire wedding weekend schedule
- As a user, I can assign pickup times for guests
- As a guest, I can see my personalized itinerary

### 2.9 Budget Management
**Features:**
- Budget planning tool
- Category-wise budget allocation:
  - Venue
  - Catering
  - Decor
  - Photography
  - Entertainment
  - Attire
  - Jewelry
  - Invitations
  - Transportation
  - Accommodation
  - Gifts
  - Miscellaneous
- Expense tracking
- Payment schedule
- Vendor payment tracking
- Budget vs actual comparison
- Currency support (INR primary)
- Export to Excel/PDF

**User Stories:**
- As a couple, I can set and track my wedding budget
- As a user, I can see spending breakdown by category
- As a planner, I can help clients stay within budget

### 2.10 Timeline & Checklist
**Features:**
- Pre-built checklist templates (12-month, 6-month, 3-month)
- Custom task creation
- Task assignment (to partner, planner, family)
- Due date tracking
- Progress visualization
- Reminder notifications
- Milestone celebrations

**User Stories:**
- As a couple, I can follow a proven planning timeline
- As a user, I can customize tasks based on my wedding
- As a planner, I can track client progress

---

## 3. Technical Architecture

### 3.1 Database Schema (Supabase PostgreSQL)

```sql
-- Core Tables
users
weddings
wedding_members (junction: users <-> weddings with roles)

-- Guest Management
guests
guest_categories
guest_groups

-- RSVP
events
rsvps
meal_options

-- Website
wedding_websites
website_sections
website_themes

-- Vendors
vendors
vendor_categories
vendor_bookings
vendor_reviews

-- Venues
venue_bookings
venue_availability

-- Logistics
itinerary_items
transportation_bookings
accommodation_allocations
tasks

-- Budget
budget_categories
budget_items
expenses
payments
```

### 3.2 API Structure

```
/api/auth/*           - Authentication endpoints
/api/weddings/*       - Wedding CRUD
/api/guests/*         - Guest management
/api/rsvp/*           - RSVP handling
/api/vendors/*        - Vendor operations
/api/venues/*         - Venue booking
/api/budget/*         - Budget management
/api/logistics/*      - Logistics coordination
/api/websites/*       - Wedding website management
```

### 3.3 Feature Flags
- `ENABLE_SOCIAL_LOGIN` - Social authentication
- `ENABLE_WEDDING_WEBSITES` - Website builder
- `ENABLE_VENDOR_BOOKING` - Vendor marketplace
- `ENABLE_PAYMENTS` - Payment processing
- `ENABLE_PLANNER_MODE` - Wedding planner features

---

## 4. User Flows

### 4.1 Couple Registration Flow
1. Land on marketing site
2. Click "Start Planning"
3. Choose signup method (Google/Email)
4. Complete profile (names, wedding date, location)
5. Onboarding wizard (budget range, guest count estimate, style preferences)
6. Land on dashboard

### 4.2 RSVP Flow (Guest)
1. Receive wedding website link
2. View wedding details
3. Click RSVP
4. Select attending events
5. Add plus-one details (if applicable)
6. Select meal preferences
7. Note dietary restrictions
8. Confirm submission
9. Receive confirmation email

### 4.3 Wedding Planner Flow
1. Register as professional
2. Verify credentials
3. Create client wedding
4. Invite couple to collaborate
5. Manage multiple weddings from dashboard

---

## 5. Success Metrics

### 5.1 User Engagement
- Daily active users
- Features used per session
- Time spent on platform
- Wedding website visits

### 5.2 Conversion Metrics
- Registration to active wedding ratio
- Guest RSVP completion rate
- Vendor booking conversion

### 5.3 Business Metrics
- Weddings planned through platform
- Vendor referral revenue
- Premium feature adoption

---

## 6. Security Requirements

- Row Level Security (RLS) for all tables
- Secure file uploads for contracts/documents
- PCI compliance for future payments
- GDPR compliance for guest data
- Data encryption at rest
- Rate limiting on public endpoints

---

## 7. Implementation Priority

### Phase 1 (MVP)
1. Authentication with social login
2. Basic dashboard
3. Guest management
4. Simple RSVP

### Phase 2
5. Wedding website builder
6. Budget management
7. Timeline & checklists

### Phase 3
8. Vendor management
9. Venue booking integration
10. Logistics management

### Phase 4
11. Wedding planner multi-tenant
12. Advanced analytics
13. Payment integration

---

## 8. Configuration

- **Methodology**: Traditional (sequential development)
- **Complexity**: Medium
- **Deployment**: Feature Flag controlled
- **Test Coverage**: 80% minimum
- **Performance Budget**: < 200ms API response time
