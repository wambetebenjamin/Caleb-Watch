create table if not exists public.caleb_watch_groups (
  id uuid primary key default gen_random_uuid(),
  group_name text not null check (char_length(group_name) <= 100),
  group_type text not null check (char_length(group_type) <= 60),
  country text not null check (char_length(country) <= 80),
  county text not null check (char_length(county) <= 100),
  contact_name text not null check (char_length(contact_name) <= 100),
  email text not null check (char_length(email) <= 150),
  phone text not null check (char_length(phone) <= 24),
  language text not null default 'en' check (language in ('en', 'sw', 'fr')),
  consent boolean not null default false check (consent),
  created_at timestamptz not null default now()
);

alter table public.caleb_watch_groups enable row level security;

revoke all on table public.caleb_watch_groups from anon, authenticated;
grant insert on table public.caleb_watch_groups to service_role;
