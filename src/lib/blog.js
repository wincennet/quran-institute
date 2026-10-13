// Blog content lives here. Each category becomes a card on the homepage and its
// own page at /blog/<id>. To add a post, push an object onto that category's
// `posts` array:
//
//   {
//     slug: "short-url-name",        // used in /blog/<category>/<slug>
//     title: "Post title",
//     date: "2026-10-14",            // ISO date, newest first is shown on top
//     excerpt: "One or two lines shown in the list.",
//     body: ["First paragraph.", "Second paragraph."],
//   }
//
// To add another kind of content later (for example videos), add another
// category object; the homepage card and the pages appear automatically.
export const BLOG_CATEGORIES = [
  {
    id: "urdu",
    title: "Urdu Blog",
    native: "اردو بلاگ",
    description: "Articles in Urdu about learning the Quran, Tajweed and Islamic education.",
    language: "ur",
    posts: [],
  },
  {
    id: "english",
    title: "English Blog",
    native: null,
    description: "Articles in English about learning the Quran, Tajweed and Islamic education.",
    language: "en",
    posts: [],
  },
];

export function getBlogCategory(id) {
  return BLOG_CATEGORIES.find((category) => category.id === id) ?? null;
}

export function getSortedPosts(category) {
  return [...category.posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function formatPostDate(isoDate) {
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
