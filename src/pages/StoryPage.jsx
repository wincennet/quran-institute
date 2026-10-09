import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import useDocumentMeta from "../hooks/useDocumentMeta";
import { STORY_PARAGRAPHS } from "../lib/constants";

export default function StoryPage() {
  useDocumentMeta({
    title: "Who We Are | Assiratul Mustaqeem Institute",
    description:
      "Assiratul Mustaqeem Institute began at home, with a family teaching the Quran online since 2013. Read our story.",
  });

  return (
    <main className="bg-cream-light pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6 text-left">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-brown-light hover:text-brown"
        >
          <ArrowLeft size={16} /> Back to home
        </Link>

        <span className="block font-sans text-gold-dark text-sm uppercase tracking-[0.25em] mt-8">
          Our Story
        </span>
        <h1 className="font-heading text-brown text-4xl md:text-6xl font-medium leading-[1.1] mt-3">
          Who We Are
        </h1>

        <div className="mt-10 space-y-6 text-brown-light text-base md:text-lg leading-relaxed">
          {STORY_PARAGRAPHS.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>

        <Link
          to="/mission"
          className="inline-block mt-12 bg-gold hover:bg-gold-dark text-cream-light font-medium px-5 py-2.5 rounded-md transition-colors"
        >
          Read our mission
        </Link>
      </div>
    </main>
  );
}
