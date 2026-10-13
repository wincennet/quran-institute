import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import useDocumentMeta from "../hooks/useDocumentMeta";
import { formatPostDate, getBlogCategory, getSortedPosts } from "../lib/blog";

export default function BlogCategoryPage() {
  const { category: categoryId } = useParams();
  const category = getBlogCategory(categoryId);

  useDocumentMeta({
    title: category ? `${category.title} | Assiratul Mustaqeem Institute` : "Blog",
    description: category?.description,
  });

  if (!category) return <Navigate to="/" replace />;

  const posts = getSortedPosts(category);
  const isRtl = category.language === "ur";

  return (
    <main className="bg-cream pt-28 pb-24 min-h-[70vh]">
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

        {posts.length === 0 ? (
          <p className="mt-12 text-brown-light bg-cream-light border border-gold/25 rounded-2xl p-6">
            The first posts are on their way, insha&apos;Allah. Please check back soon.
          </p>
        ) : (
          <ul className="mt-12 space-y-4">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  to={`/blog/${category.id}/${post.slug}`}
                  className="block bg-cream-light border border-gold/25 rounded-2xl p-6 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <h2
                    dir={isRtl ? "rtl" : "ltr"}
                    lang={category.language}
                    className={`text-brown font-semibold ${
                      isRtl ? "font-arabic text-2xl" : "font-heading text-2xl"
                    }`}
                  >
                    {post.title}
                  </h2>
                  <p className="text-brown-light text-xs mt-1">{formatPostDate(post.date)}</p>
                  {post.excerpt && (
                    <p
                      dir={isRtl ? "rtl" : "ltr"}
                      lang={category.language}
                      className="text-brown-light text-sm leading-relaxed mt-3"
                    >
                      {post.excerpt}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
