// Public (visitor-side) access to the blog posts and reviews stored in Supabase.
// This uses plain fetch against the REST API, so the visitor bundle does not need
// the Supabase library. The admin page uses the full library separately.
//
// Until SUPABASE_URL and SUPABASE_ANON_KEY are set in constants.js, everything
// here is switched off and the site shows only its built-in posts and reviews.
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./constants";

export const cmsEnabled = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

function headers(extra = {}) {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    ...extra,
  };
}

async function getRows(path) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, { headers: headers() });
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json();
}

// One request per page load, shared by every component that asks.
let reviewsRequest;
export function fetchApprovedReviews() {
  if (!cmsEnabled) return Promise.resolve([]);
  reviewsRequest ??= getRows(
    "reviews?select=id,role,name,country,review&approved=eq.true&order=created_at.desc",
  ).catch(() => []);
  return reviewsRequest;
}

let postsRequest;
export function fetchPublishedPosts() {
  if (!cmsEnabled) return Promise.resolve([]);
  postsRequest ??= getRows(
    "posts?select=id,category,slug,title,excerpt,body,cover_url,slides,published_at&published=eq.true&order=published_at.desc",
  ).catch(() => []);
  return postsRequest;
}

// Saves a review as "not approved". Resolves true when it was stored.
export async function submitReview({ role, name, country, review }) {
  if (!cmsEnabled) return false;
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/reviews`, {
      method: "POST",
      headers: headers({ "Content-Type": "application/json", Prefer: "return=minimal" }),
      body: JSON.stringify({ role, name, country, review }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

// Post text is typed into a plain box in the admin page. Blank lines separate
// paragraphs; a line starting with "## " is a heading; a line starting with "ar: "
// is a line of Arabic (shown larger, right to left).
export function parseBody(text) {
  return String(text ?? "")
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith("## ")) return { heading: block.slice(3).trim() };
      if (block.startsWith("ar: ")) return { arabic: block.slice(4).trim() };
      return block;
    });
}

// Turns a database row into the same shape as the posts written in blog.js.
export function toPost(row) {
  const slides = Array.isArray(row.slides) ? row.slides : [];
  return {
    slug: row.slug,
    title: row.title,
    date: (row.published_at ?? "").slice(0, 10) || "2000-01-01",
    excerpt: row.excerpt ?? "",
    cover: row.cover_url || slides[0]?.src || null,
    slides,
    body: parseBody(row.body),
  };
}

export function reviewToTestimonial(row) {
  return {
    name: `${row.name}, ${String(row.role).toLowerCase()}, ${row.country}`,
    quote: row.review,
  };
}
