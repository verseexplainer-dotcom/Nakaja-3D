-- Nakaja Bikes initial Supabase schema.
-- Intent: create isolated tables for the new Astro/Cloudflare stack without touching old Nakaja data.
-- Rollback approach for preview/dev only: drop policies first, then drop these four tables in dependency order.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role text not null default 'user' check (role in ('user', 'staff', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 120),
  phone text not null check (char_length(phone) between 7 and 32),
  model text,
  message text,
  source text not null default 'website' check (source in ('website', 'whatsapp', 'messenger', 'manual')),
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'converted', 'closed')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete set null,
  profile_id uuid references public.profiles(id) on delete set null,
  name text not null check (char_length(name) between 2 and 120),
  phone text not null check (char_length(phone) between 7 and 32),
  model text,
  appointment_at timestamptz not null,
  status text not null default 'scheduled' check (status in ('scheduled', 'confirmed', 'completed', 'cancelled', 'no_show')),
  notes text,
  source text not null default 'website' check (source in ('website', 'whatsapp', 'messenger', 'manual')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.chat_events (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete set null,
  channel text not null check (channel in ('whatsapp', 'messenger', 'website')),
  direction text not null check (direction in ('inbound', 'outbound')),
  external_message_id text,
  sender text,
  message text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_phone_idx on public.leads (phone);
create index if not exists appointments_appointment_at_idx on public.appointments (appointment_at);
create index if not exists chat_events_created_at_idx on public.chat_events (created_at desc);
create index if not exists chat_events_lead_id_idx on public.chat_events (lead_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
before update on public.leads
for each row execute function public.set_updated_at();

drop trigger if exists appointments_set_updated_at on public.appointments;
create trigger appointments_set_updated_at
before update on public.appointments
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.leads enable row level security;
alter table public.appointments enable row level security;
alter table public.chat_events enable row level security;

-- No anonymous policies are created. Browser clients using the anon key cannot read or insert these tables.
-- Cloudflare Pages Functions insert leads with SUPABASE_SERVICE_ROLE_KEY, which bypasses RLS server-side only.

create policy "authenticated users can read own profile"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

create policy "authenticated users can update own profile"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

-- Staff/admin data access policies can be added later after an admin role model is finalized.
