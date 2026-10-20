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
// A post can also be a set of slides (for example the same slides posted on
// Instagram). Put the image files in public/blog/<slug>/ and add:
//
//     cover: "/blog/<slug>/slide-1.webp",             // thumbnail in the list
//     slides: [{ src: "/blog/<slug>/slide-1.webp", alt: "What the slide says" }],
//
// `body` items can be a paragraph (string), { heading: "..." } or { arabic: "..." }.
//
// To add another kind of content later (for example videos), add another
// category object; the homepage card and the pages appear automatically.
export const BLOG_CATEGORIES = [
  {
    id: "urdu",
    title: "Urdu Blog Post",
    native: "اردو بلاگ",
    description: "Articles in Urdu about learning the Quran, Tajweed and Islamic education.",
    language: "ur",
    posts: [
      {
        slug: "quran-ke-panch-huqooq",
        title: "کیا آپ قرآن کے پانچ حقوق جانتے ہیں؟",
        date: "2026-10-14",
        excerpt: "قرآن کے پانچ حقوق: ایمان، تلاوت، فہم، عمل اور دوسروں تک پہنچانا۔",
        cover: "/blog/quran-ke-panch-huqooq/slide-1.webp",
        slides: [
          {
            src: "/blog/quran-ke-panch-huqooq/slide-1.webp",
            alt: "کیا آپ قرآن کے پانچ حقوق جانتے ہیں؟",
          },
          {
            src: "/blog/quran-ke-panch-huqooq/slide-2.webp",
            alt: "قرآن کے پانچ حقوق: ایمان، تلاوت، فہم، عمل اور دوسروں تک پہنچانا۔",
          },
        ],
        body: [
          "کیا آپ قرآن کے پانچ حقوق جانتے ہیں؟",
          { heading: "1۔ ایمان" },
          "قرآن پر کامل یقین رکھیں کہ یہ اللہ کا کلام ہے۔ اس کا ہر حرف سچا ہے اور اس کا ہر وعدہ برحق ہے۔",
          { heading: "2۔ تلاوت" },
          "قرآن کو تجوید کے ساتھ صحیح اور خوبصورت انداز میں پڑھیں، اور ہر حرف کو اس کے صحیح مخرج اور ادائیگی کے ساتھ ادا کریں۔",
          { heading: "3۔ فہم" },
          "ترجمہ اور تفسیر کے ذریعے قرآن کے معانی کو سمجھیں، تاکہ آپ کی زبان جو تلاوت کرے، آپ کا دل بھی اس کے پیغام کو سمجھ سکے۔",
          { heading: "4۔ عمل" },
          "قرآن کی تعلیمات کو اپنی زندگی میں اپنائیں۔ اس کے احکامات پر عمل کریں اور اپنے کردار، روزمرہ زندگی اور عبادات کو قرآن کے مطابق بنائیں۔",
          { heading: "5۔ دوسروں تک پہنچانا" },
          "قرآن کی تعلیمات دوسروں تک پہنچائیں۔ انہیں سکھائیں، اس کا پیغام عام کریں، اور دوسروں کو اس ہدایت کی طرف بلائیں جو اللہ نے آپ کو عطا فرمائی ہے۔",
        ],
      },
    ],
  },
  {
    id: "english",
    title: "English Blog Post",
    native: null,
    description: "Articles in English about learning the Quran, Tajweed and Islamic education.",
    language: "en",
    posts: [
      {
        slug: "dua-of-prophet-yunus",
        title: "Feeling stuck? The dua of Prophet Yunus",
        date: "2026-10-14",
        excerpt:
          "Prophet Yunus made this dua in the darkest place on earth, and Allah answered him.",
        cover: "/blog/dua-of-prophet-yunus/slide-1.webp",
        slides: [
          {
            src: "/blog/dua-of-prophet-yunus/slide-1.webp",
            alt: "Feeling stuck? Prophet Yunus عليه السلام made this dua in the darkest place on earth.",
          },
          {
            src: "/blog/dua-of-prophet-yunus/slide-2.webp",
            alt: "The Prophet in the darkness, and the dua that came from his heart: There is no deity except You; exalted are You. Indeed, I have been among the wrongdoers.",
          },
          {
            src: "/blog/dua-of-prophet-yunus/slide-3.webp",
            alt: "Allah answered him, and what to remember when you feel there is no way out.",
          },
        ],
        body: [
          "Feeling stuck? Prophet Yunus عليه السلام made this dua in the darkest place on earth.",
          { heading: "The Prophet in the darkness" },
          "Prophet Yunus عليه السلام left his people and was swallowed by a great fish. He found himself in darkness, with no human help available.",
          "But he was not beyond Allah’s reach. Allah heard him even there.",
          { heading: "The dua that came from his heart" },
          "Instead of blaming others, Prophet Yunus عليه السلام turned to Allah and made this beautiful dua:",
          { arabic: "لَا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ" },
          "“There is no deity except You; exalted are You. Indeed, I have been among the wrongdoers.”",
          { heading: "Allah answered him" },
          "Allah says that He answered Yunus عليه السلام and saved him from distress. Allah also says that He saves the believers.",
          "His story reminds us to turn to Allah with humility, admit our mistakes, and never give up on making dua.",
          { heading: "When you feel there is no way out" },
          "You may be facing sadness, regret, fear, or a situation you cannot change. Remember the dua of Prophet Yunus عليه السلام.",
          "Call upon Allah sincerely. Acknowledge your shortcomings. Ask for His help and mercy.",
          "No darkness is beyond Allah’s knowledge, and no sincere dua is hidden from Him.",
        ],
      },
    ],
  },
  // Video categories: posts are added from the admin page (a video file or a
  // YouTube link, plus optional text). `shape` is the video frame on the post page.
  {
    id: "reels",
    title: "Reel Blogs",
    native: null,
    description: "Short video reels about the Quran, Tajweed and everyday Islamic learning.",
    language: "en",
    kind: "video",
    shape: "vertical",
    posts: [],
  },
  {
    id: "sessions",
    title: "Session Blogs",
    native: null,
    description: "Longer recorded sessions and talks from the institute.",
    language: "en",
    kind: "video",
    shape: "wide",
    posts: [],
  },
];

export function getBlogCategory(id) {
  return BLOG_CATEGORIES.find((category) => category.id === id) ?? null;
}

export function sortPosts(posts) {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function formatPostDate(isoDate) {
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
