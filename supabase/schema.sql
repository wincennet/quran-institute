-- Database for the Assiratul Mustaqeem website: blog posts and reviews.
--
-- How to use: in your Supabase project open "SQL Editor", paste this whole file
-- and press Run. It is safe to run more than once.
--
-- Who can do what:
--   * Visitors can read published posts and approved reviews, and can send a new
--     review (it is saved as "not approved" until you approve it).
--   * Only the admin login (assiratulmustaqeeminstitute@gmail.com) can create,
--     edit or delete posts, approve or delete reviews, and upload blog images.

-- ---------------------------------------------------------------- tables

create table if not exists public.posts (
  id           uuid primary key default gen_random_uuid(),
  category     text not null check (category in ('urdu', 'english', 'reels', 'sessions')),
  slug         text not null unique,
  title        text not null check (char_length(title) between 1 and 200),
  excerpt      text,
  body         text not null default '',
  cover_url    text,
  slides       jsonb not null default '[]'::jsonb,
  video_url    text,
  published    boolean not null default false,
  published_at timestamptz,
  created_at   timestamptz not null default now()
);

create table if not exists public.reviews (
  id         uuid primary key default gen_random_uuid(),
  role       text not null check (role in ('Parent', 'Student')),
  name       text not null,
  country    text not null,
  review     text not null,
  approved   boolean not null default false,
  created_at timestamptz not null default now()
);

-- Databases created before video posts existed: allow the Reel and Session
-- sections and add the video column. Safe to run more than once.
alter table public.posts drop constraint if exists posts_category_check;
alter table public.posts
  add constraint posts_category_check
  check (category in ('urdu', 'english', 'reels', 'sessions'));
alter table public.posts add column if not exists video_url text;

alter table public.posts enable row level security;
alter table public.reviews enable row level security;

-- ---------------------------------------------------------------- admin check

create or replace function public.is_site_admin()
returns boolean
language sql
stable
set search_path = ''
as $$
  select coalesce(auth.jwt() ->> 'email', '') = 'assiratulmustaqeeminstitute@gmail.com'
$$;

-- ---------------------------------------------------------------- posts policies

drop policy if exists "Anyone can read published posts" on public.posts;
create policy "Anyone can read published posts"
  on public.posts for select to anon, authenticated
  using (published = true);

drop policy if exists "Admin reads all posts" on public.posts;
create policy "Admin reads all posts"
  on public.posts for select to authenticated
  using (public.is_site_admin());

drop policy if exists "Admin adds posts" on public.posts;
create policy "Admin adds posts"
  on public.posts for insert to authenticated
  with check (public.is_site_admin());

drop policy if exists "Admin edits posts" on public.posts;
create policy "Admin edits posts"
  on public.posts for update to authenticated
  using (public.is_site_admin())
  with check (public.is_site_admin());

drop policy if exists "Admin deletes posts" on public.posts;
create policy "Admin deletes posts"
  on public.posts for delete to authenticated
  using (public.is_site_admin());

-- ---------------------------------------------------------------- reviews policies

drop policy if exists "Anyone can read approved reviews" on public.reviews;
create policy "Anyone can read approved reviews"
  on public.reviews for select to anon, authenticated
  using (approved = true);

drop policy if exists "Anyone can send a review" on public.reviews;
create policy "Anyone can send a review"
  on public.reviews for insert to anon, authenticated
  with check (
    approved = false
    and role in ('Parent', 'Student')
    and char_length(name) between 1 and 80
    and char_length(country) between 1 and 80
    and char_length(review) between 20 and 1200
  );

drop policy if exists "Admin reads all reviews" on public.reviews;
create policy "Admin reads all reviews"
  on public.reviews for select to authenticated
  using (public.is_site_admin());

drop policy if exists "Admin edits reviews" on public.reviews;
create policy "Admin edits reviews"
  on public.reviews for update to authenticated
  using (public.is_site_admin())
  with check (public.is_site_admin());

drop policy if exists "Admin deletes reviews" on public.reviews;
create policy "Admin deletes reviews"
  on public.reviews for delete to authenticated
  using (public.is_site_admin());

-- ---------------------------------------------------------------- image storage

insert into storage.buckets (id, name, public)
values ('blog', 'blog', true)
on conflict (id) do nothing;

drop policy if exists "Admin uploads blog images" on storage.objects;
create policy "Admin uploads blog images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'blog' and public.is_site_admin());

drop policy if exists "Admin replaces blog images" on storage.objects;
create policy "Admin replaces blog images"
  on storage.objects for update to authenticated
  using (bucket_id = 'blog' and public.is_site_admin());

drop policy if exists "Admin deletes blog images" on storage.objects;
create policy "Admin deletes blog images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'blog' and public.is_site_admin());
