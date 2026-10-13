import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import ScrollRow from "./ScrollRow";
import { BLOG_CATEGORIES } from "../lib/blog";

// One card per blog category. Cards open that category's page; new kinds of
// content are added as categories in src/lib/blog.js.
export default function Blog() {
  return (
    <section id="blog" className="bg-cream-light py-24">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-left max-w-2xl">
          <span className="font-sans text-gold-dark text-sm uppercase tracking-[0.25em]">Blog</span>
          <h2 className="font-heading text-brown text-3xl md:text-4xl font-medium mt-3">
            Read and learn with us
          </h2>
          <p className="text-brown-light text-sm mt-3">
            Short articles to help you and your family on the journey with the Quran.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <ScrollRow>
            {BLOG_CATEGORIES.map((category) => (
              <Link
                key={category.id}
                to={`/blog/${category.id}`}
                className="group snap-start shrink-0 w-[82%] sm:w-[22rem] flex flex-col bg-cream rounded-2xl border border-gold/25 p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-sans text-xs uppercase tracking-[0.2em] text-gold-dark">
                    Blog
                  </span>
                  {category.posts.length === 0 && (
                    <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-brown-light bg-gold/15 border border-gold/30 rounded-full px-3 py-1">
                      Coming Soon
                    </span>
                  )}
                </div>
                <h3 className="font-heading text-brown text-2xl font-semibold mt-2">
                  {category.title}
                </h3>
                {category.native && (
                  <p dir="rtl" lang={category.language} className="font-arabic text-gold text-xl mt-4">
                    {category.native}
                  </p>
                )}
                <p className="text-brown-light text-sm leading-relaxed mt-3">
                  {category.description}
                </p>
                <span className="mt-auto pt-6 text-brown text-sm font-medium underline underline-offset-4 decoration-gold-dark/60 group-hover:decoration-brown transition-colors self-start">
                  {category.posts.length > 0 ? "Read posts →" : "Open →"}
                </span>
              </Link>
            ))}
          </ScrollRow>
        </Reveal>
      </div>
    </section>
  );
}
