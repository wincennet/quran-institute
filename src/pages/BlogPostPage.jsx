import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import BlogSlides from "../components/BlogSlides";
import useDocumentMeta from "../hooks/useDocumentMeta";
import useUrduFont from "../hooks/useUrduFont";
import { formatPostDate, getBlogCategory } from "../lib/blog";

// A body item is a plain paragraph (string), a sub-heading ({ heading }) or a line
// of Arabic ({ arabic }), which is shown larger and right-to-left.
function BodyItem({ item, isRtl }) {
  if (typeof item === "string") return <p>{item}</p>;
  if (item.heading) {
    return (
      <h2
        className={`pt-3 text-gold-dark font-semibold ${
          isRtl ? "font-urdu text-lg leading-[2.4]" : "font-heading text-lg uppercase tracking-wide"
        }`}
      >
        {item.heading}
      </h2>
    );
  }
  if (item.arabic) {
    return (
      <p dir="rtl" lang="ar" className="font-arabic text-gold-dark text-3xl leading-[2] text-right">
        {item.arabic}
      </p>
    );
  }
  return null;
}

export default function BlogPostPage() {
  const { category: categoryId, slug } = useParams();
  const category = getBlogCategory(categoryId);
  const post = category?.posts.find((entry) => entry.slug === slug);

  useUrduFont(category?.language === "ur");

  useDocumentMeta({
    title: post ? `${post.title} | Assiratul Mustaqeem Institute` : "Blog",
    description: post?.excerpt,
  });

  if (!category) return <Navigate to="/" replace />;
  if (!post) return <Navigate to={`/blog/${category.id}`} replace />;

  const isRtl = category.language === "ur";
  const hasSlides = Array.isArray(post.slides) && post.slides.length > 0;
  const hasBody = Array.isArray(post.body) && post.body.length > 0;

  return (
    <main className="bg-cream pt-28 pb-24 min-h-[70vh]">
      <article className="max-w-2xl mx-auto px-6">
        <Link
          to={`/blog/${category.id}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-brown-light hover:text-brown"
        >
          <ArrowLeft size={16} /> {category.title}
        </Link>

        <div dir={isRtl ? "rtl" : "ltr"} lang={category.language} className="mt-6 text-start">
          <h1
            className={`text-brown font-medium ${
              isRtl ? "font-urdu text-3xl leading-[2.1]" : "font-heading text-4xl md:text-5xl"
            }`}
          >
            {post.title}
          </h1>
          <p className="text-brown-light text-sm mt-3">{formatPostDate(post.date)}</p>

          {hasSlides && (
            <div className="mt-8 max-w-md mx-auto">
              <BlogSlides slides={post.slides} />
            </div>
          )}

          {hasBody && (
            <div
              className={`mt-10 space-y-5 text-brown ${
                isRtl ? "font-urdu text-lg leading-[2.7]" : "leading-relaxed"
              }`}
            >
              {hasSlides && (
                <p
                  className={`text-gold-dark ${
                    isRtl
                      ? "font-urdu text-sm"
                      : "font-sans text-xs uppercase tracking-[0.2em]"
                  }`}
                >
                  {isRtl ? "متن پڑھیں" : "Read the text"}
                </p>
              )}
              {post.body.map((item, index) => (
                <BodyItem key={index} item={item} isRtl={isRtl} />
              ))}
            </div>
          )}
        </div>
      </article>
    </main>
  );
}
