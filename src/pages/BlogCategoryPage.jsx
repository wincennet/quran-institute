import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, Play } from "lucide-react";
import useDocumentMeta from "../hooks/useDocumentMeta";
import useBlogPosts from "../hooks/useBlogPosts";
import useUrduFont from "../hooks/useUrduFont";
import { formatPostDate, getBlogCategory } from "../lib/blog";

export default function BlogCategoryPage() {
  const { category: categoryId } = useParams();
  const category = getBlogCategory(categoryId);

  useUrduFont(category?.language === "ur");
  const { posts, loading } = useBlogPosts(categoryId);

  useDocumentMeta({
    title: category ? `${category.title} | Assiratul Mustaqeem Institute` : "Blog",
    description: category?.description,
  });

  if (!category) return <Navigate to="/" replace />;

  const isRtl = category.language === "ur";

  return (
    <main className="bg-cream-light pt-28 pb-24 min-h-[70vh]">
      <div className="max-w-3xl mx-auto px-6 text-left">
        <Link
          to="/#blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-brown-light hover:text-brown"
        >
          <ArrowLeft size={16} /> Back to home
        </Link>

        <h1 className="font-heading text-brown text-4xl md:text-5xl font-medium mt-6">
          {category.title}
        </h1>
        {category.native && (
          <p dir="rtl" lang={category.language} className="font-arabic text-gold text-2xl mt-2">
            {category.native}
          </p>
        )}
        <p className="text-brown-light mt-3">{category.description}</p>

        {posts.length === 0 && loading ? (
          <p className="mt-12 text-brown-light">Loading…</p>
        ) : posts.length === 0 ? (
          <p className="mt-12 text-brown-light bg-cream border border-gold/25 rounded-2xl p-6">
            The first posts are on their way, insha&apos;Allah. Please check back soon.
          </p>
        ) : (
          <ul className="mt-12 space-y-4">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  to={`/blog/${category.id}/${post.slug}`}
                  className="flex gap-4 bg-cream border border-gold/25 rounded-2xl p-4 sm:p-5 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {(post.cover || post.videoUrl) && (
                    <div className="relative w-20 sm:w-24 shrink-0 aspect-[4/5] overflow-hidden rounded-lg border border-gold/20 bg-gold/15">
                      {post.cover && (
                        <img
                          src={post.cover}
                          alt=""
                          width={96}
                          height={120}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      )}
                      {post.videoUrl && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brown/70 text-cream-light">
                            <Play size={16} className="ml-0.5" fill="currentColor" />
                          </span>
                        </span>
                      )}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h2
                      dir={category.kind === "video" ? "auto" : isRtl ? "rtl" : "ltr"}
                      lang={category.language}
                      className={`text-brown font-semibold ${
                        isRtl ? "font-urdu text-xl leading-[2.1]" : "font-heading text-2xl"
                      }`}
                    >
                      {post.title}
                    </h2>
                    <p className="text-brown-light text-xs mt-1">{formatPostDate(post.date)}</p>
                    {post.excerpt && (
                      <p
                        dir={category.kind === "video" ? "auto" : isRtl ? "rtl" : "ltr"}
                        lang={category.language}
                        className="text-brown-light text-sm leading-relaxed mt-3"
                      >
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
