import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import useDocumentMeta from "../hooks/useDocumentMeta";
import { MISSION_HEADING, MISSION_INTRO, MISSION_RIGHTS } from "../lib/constants";

export default function MissionPage() {
  useDocumentMeta({
    title: "Our Mission | Assiratul Mustaqeem Institute",
    description:
      "Our mission is to give the Quran its five rights in every student's life: belief, recitation, understanding, application and conveying the message.",
  });

  return (
    <main className="bg-cream pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6 text-left">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-brown-light hover:text-brown"
        >
          <ArrowLeft size={16} /> Back to home
        </Link>

        <span className="block font-sans text-gold-dark text-sm uppercase tracking-[0.25em] mt-8">
          Our Mission
        </span>
        <h1 className="font-heading text-brown text-4xl md:text-6xl font-medium leading-[1.1] mt-3">
          {MISSION_HEADING}
        </h1>
        <p className="text-brown-light text-base md:text-lg leading-relaxed mt-6 max-w-2xl">
          {MISSION_INTRO}
        </p>

        <ol className="mt-12 space-y-5">
          {MISSION_RIGHTS.map((right, i) => (
            <li
              key={right.title}
              className="flex gap-5 bg-cream-light rounded-2xl border border-gold/25 p-6 md:p-7"
            >
              <span className="shrink-0 w-10 h-10 rounded-full bg-gold text-cream-light font-heading text-xl font-semibold flex items-center justify-center">
                {i + 1}
              </span>
              <div>
                <h2 className="font-heading text-brown text-xl md:text-2xl font-semibold">
                  {right.title} <span className="text-gold-dark font-medium">({right.term})</span>
                </h2>
                <p className="text-brown-light text-sm md:text-base leading-relaxed mt-2">
                  {right.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <Link
          to="/who-we-are"
          className="inline-block mt-12 border border-gold-dark/50 text-brown hover:bg-cream-light font-medium px-5 py-2.5 rounded-md transition-colors"
        >
          Read our story
        </Link>
      </div>
    </main>
  );
}
