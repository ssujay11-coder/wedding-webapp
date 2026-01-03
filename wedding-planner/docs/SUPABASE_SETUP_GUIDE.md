# Supabase Setup Guide for Wedding Planning Module

## 1. Database Migration

### Option A: Using Supabase Dashboard (Recommended for first time)

1. Go to your Supabase project: https://supabase.com/dashboard/project/pahtrfafjjbaxschhtdr
2. Navigate to **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `supabase/migrations/20260102000001_wedding_planning_module.sql`
5. Paste it into the SQL editor
6. Click **Run** to execute

### Option B: Using Supabase CLI

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref pahtrfafjjbaxschhtdr

# Push migrations
supabase db push
```

---

## 2. Authentication Setup

### Enable Google OAuth

1. Go to **Authentication** > **Providers** in your Supabase dashboard
2. Find **Google** and click to expand
3. Toggle **Enable Sign in with Google**
4. Add your Google OAuth credentials:
   - **Client ID**: (from Google Cloud Console)
   - **Client Secret**: (from Google Cloud Console)

### Set up Google Cloud Console

1. Go to https://console.cloud.google.com
2. Create a new project or select existing
3. Navigate to **APIs & Services** > **Credentials**
4. Create **OAuth 2.0 Client ID**
5. Set Authorized redirect URIs:
   ```
   https://pahtrfafjjbaxschhtdr.supabase.co/auth/v1/callback
   ```
6. Copy Client ID and Client Secret to Supabase

### Configure Redirect URLs

In Supabase Dashboard > Authentication > URL Configuration:

- **Site URL**: `http://localhost:3000` (for dev) or your production URL
- **Redirect URLs**: Add these:
  ```
  http://localhost:3000/auth/callback
  https://yourdomain.com/auth/callback
  ```

---

## 3. Environment Variables

Create/update `.env.local` in your project root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://pahtrfafjjbaxschhtdr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhaHRyZmFmampiYXhzY2hodGRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcyNjk5NDksImV4cCI6MjA4Mjg0NTk0OX0.XIFVaysJoUxjyTPPeyODt549np_uc0sNqeis72076Ic

# Resend (for emails)
RESEND_API_KEY=your_resend_api_key

# Optional: Anthropic for AI features
ANTHROPIC_API_KEY=your_anthropic_key
```

---

## 4. Enable Row Level Security Policies

The migration includes RLS policies, but verify they're active:

1. Go to **Database** > **Tables**
2. Click on each table (profiles, weddings, guests, etc.)
3. Verify **RLS Enabled** is shown
4. Check **Policies** tab to see active policies

---

## 5. Storage Setup (for images)

1. Go to **Storage** in Supabase dashboard
2. Create these buckets:
   - `wedding-photos` (public)
   - `documents` (private)
   - `avatars` (public)

3. Set up storage policies:

```sql
-- Allow authenticated users to upload to wedding-photos
CREATE POLICY "Allow authenticated uploads to wedding-photos"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'wedding-photos');

-- Allow public read access to wedding-photos
CREATE POLICY "Allow public read from wedding-photos"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'wedding-photos');
```

---

## 6. Verify Setup

After completing the setup, test:

1. **Database**:
   - Go to Table Editor
   - Verify tables exist: profiles, weddings, wedding_members, guests, etc.

2. **Authentication**:
   - Try signing up with email
   - Try Google OAuth login

3. **RLS**:
   - Insert a test row
   - Verify policies restrict access correctly

---

## Tables Created by Migration

| Table | Purpose |
|-------|---------|
| `profiles` | User profiles (extends Supabase auth) |
| `weddings` | Wedding details |
| `wedding_members` | User-Wedding relationships with roles |
| `guests` | Guest list management |
| `wedding_events` | Events (Mehendi, Sangeet, Wedding, etc.) |
| `rsvps` | RSVP responses per event |
| `wedding_websites` | Wedding website configuration |
| `vendor_categories` | Vendor types (Photography, Catering, etc.) |
| `vendors` | Vendor directory |
| `vendor_bookings` | Vendor bookings per wedding |
| `venue_bookings` | Venue reservations |
| `budget_categories` | Budget categories |
| `budget_items` | Budget line items |
| `expenses` | Actual payments |
| `tasks` | Planning checklist items |
| `transportation_bookings` | Guest transport logistics |
| `accommodation_allocations` | Room assignments |
| `activity_log` | Audit trail |
| `notifications` | User notifications |
| `feature_flags` | Feature toggle management |

---

## Troubleshooting

### "relation does not exist" error
- Run the migration SQL again
- Check for syntax errors in the SQL

### Authentication not working
- Verify Site URL matches your app URL
- Check redirect URLs include your callback path
- Ensure Google OAuth credentials are correct

### RLS blocking all queries
- Check that policies are correctly created
- Verify user is authenticated when expected
- Use `service_role` key for admin operations (never in client code)

---

## Next Steps

After setup is complete:

1. Run `npm run dev` to start the development server
2. Navigate to `/signup` to create an account
3. Access `/dashboard` to see the planning interface
