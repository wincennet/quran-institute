-- Run this once in Supabase: SQL Editor -> paste -> Run.
-- It lets the blog have "Reel Blogs" and "Session Blogs" (video posts).
-- Safe to run more than once. Existing posts are not touched.

alter table public.posts drop constraint if exists posts_category_check;
alter table public.posts
  add constraint posts_category_check
  check (category in ('urdu', 'english', 'reels', 'sessions'));

alter table public.posts add column if not exists video_url text;
