-- Create leads table
create table if not exists public.leads (
    id uuid not null default gen_random_uuid(),
    created_at timestamp with time zone not null default now(),
    name text not null,
    email text not null,
    phone text,
    wedding_date text,
    guest_count integer,
    budget_range text,
    style_preferences text[],
    status text not null default 'new',
    constraint leads_pkey primary key (id)
);

-- Enable Row Level Security (RLS)
alter table public.leads enable row level security;

-- Create Policy: Allow anonymous users to insert new leads
create policy "Allow anonymous inserts"
    on public.leads
    for insert
    to anon
    with check (true);

-- Create Policy: Allow service role (admin) to view/update everything
create policy "Allow service_role full access"
    on public.leads
    for all
    to service_role
    using (true)
    with check (true);
