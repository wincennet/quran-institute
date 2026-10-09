import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import About from "../components/About";
import useDocumentMeta from "../hooks/useDocumentMeta";
import {
  MISSION_HEADING,
  MISSION_INTRO,
  MISSION_RIGHTS,
  STORY_PARAGRAPHS,
} from "../lib/constants";

const PAGE_META = {
  story: {
    title: "Who We Are | Assiratul Mustaqeem Institute",
    description:
      "Assiratul Mustaqeem Institute began at home, with a family teaching the Quran online since 2013. Read our story.",
  },
  mission: {
    title: "Our Mission | Assiratul Mustaqeem Institute",
    description:
      "Our mission is to give the Quran its five rights in every student's life: belief, recitation, understanding, application and conveying the message.",
  },
};

function StorySection() {
  return (
    <section id="story" className="bg-cream-light pt-32 pb-24">
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
      </div>
    </section>
  );
}

function MissionSection() {
  return (
    <section id="mission-full" className="bg-cream py-24">
      <div className="max-w-4xl mx-auto px-6 text-left">
        <span className="block font-sans text-gold-dark text-sm uppercase tracking-[0.25em]">
          Our Mission
        </span>
        <h2 className="font-heading text-brown text-4xl md:text-6xl font-medium leading-[1.1] mt-3">
          {MISSION_HEADING}
        </h2>
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
                <h3 className="font-heading text-brown text-xl md:text-2xl font-semibold">
                  {right.title} <span className="text-gold-dark font-medium">({right.term})</span>
                </h3>
                <p className="text-brown-light text-sm md:text-base leading-relaxed mt-2">
                  {right.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// Story, Mission and Why Choose Us are one continuous page: scrolling down from
// the story reaches the mission, then Why Choose Us, and scrolling up from the
// mission reaches the story. /who-we-are and /mission only differ in where the
// page starts.
export default function AboutFlowPage({ start }) {
  useDocumentMeta(PAGE_META[start]);

  useEffect(() => {
    if (start !== "mission") return;
    // Wait for the router's scroll-to-top, then jump (instantly) to the mission.
    const frame = requestAnimationFrame(() => {
      const section = document.getElementById("mission-full");
      if (section) {
        window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY, behavior: "instant" });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [start]);

  return (
    <main>
      <StorySection />
      <MissionSection />
      <About />
    </main>
  );
}
