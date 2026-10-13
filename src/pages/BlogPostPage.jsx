import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import useDocumentMeta from "../hooks/useDocumentMeta";
import { formatPostDate, getBlogCategory } from "../lib/blog";

export default function BlogPostPage() {
  const { category: categoryId, slug } = useParams();
  const category = getBlogCategory(categoryId);
  const post = category?.posts.find((entry) => entry.slug === slug);

  useDocumentMeta({
    title: post ? `${post.title} | Assiratul Mustaqeem Institute` : "Blog",
    description: post?.excerpt,
  });

  if (!category) return <Navigate to="/" replace />;
  if (!post) return <Navigate to={`/blog/${category.id}`} replace />;

  const isRtl = category.language === "ur";

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
              isRtl ? "font-arabic text-4xl leading-relaxed" : "font-heading text-4xl md:text-5xl"
            }`}
          >
            {post.title}
          </h1>
          <p className="text-brown-light text-sm mt-3">{formatPostDate(post.date)}</p>

          <div
            className={`mt-8 space-y-5 text-brown ${
              isRtl ? "font-arabic text-xl leading-[2.2]" : "leading-relaxed"
            }`}
          >
            {post.body.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}
