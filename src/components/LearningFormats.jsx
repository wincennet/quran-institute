import { CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";
import ScrollRow from "./ScrollRow";
import { LEARNING_FORMATS } from "../lib/constants";

// Individual first, matching the order of the course sections below.
const ORDERED_FORMATS = ["individual", "group"].map((id) =>
  LEARNING_FORMATS.find((format) => format.id === id),
);

export default function LearningFormats() {
  return (
    <section id="formats" className="bg-brown py-24">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="font-sans text-gold text-sm uppercase tracking-[0.25em]">
            Class Formats
          </span>
          <h2 className="font-heading text-cream-light text-3xl md:text-4xl font-medium mt-3">
            Choose how you&apos;d like to learn
          </h2>
          <p className="text-cream/75 text-sm mt-3">
            One-to-one lessons built around you, or a group batch on a fixed schedule.
          </p>
        </Reveal>

        {/* A row you swipe sideways on a phone; both cards simply sit side by side
            on larger screens. */}
        <Reveal className="mt-14">
          <ScrollRow>
            {ORDERED_FORMATS.map((format) => (
              <div
                key={format.id}
                className="snap-start shrink-0 w-[82%] sm:w-[24rem] bg-cream-light rounded-2xl border border-gold/25 p-8"
              >
                <h3 className="font-heading text-brown text-2xl font-semibold">{format.title}</h3>
                <ul className="mt-6 space-y-3">
                  {format.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-brown-light text-sm leading-relaxed"
                    >
                      <CheckCircle2 className="text-gold shrink-0 mt-0.5" size={18} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </ScrollRow>
        </Reveal>
      </div>
    </section>
  );
}
