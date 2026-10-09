import Reveal from "./Reveal";
import { MISSION_RIGHTS } from "../lib/constants";

export default function Mission() {
  return (
    <section id="mission" className="bg-cream py-24">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="font-sans text-gold-dark text-sm uppercase tracking-[0.25em]">
            Our Mission
          </span>
          <h2 className="font-heading text-brown text-3xl md:text-4xl font-medium mt-3">
            To give the Quran its five rights, in every student’s life.
          </h2>
          <p className="text-brown-light text-base leading-relaxed mt-5">
            At Assiratul Mustaqeem Institute, we don’t teach the Quran as only a book to read. We
            teach it as a way of life, through five rights it holds over every believer:
          </p>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-6 mt-14">
          {MISSION_RIGHTS.map((right, i) => (
            <Reveal
              key={right.title}
              delay={i * 0.08}
              className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] bg-cream-light rounded-2xl border border-gold/25 p-7"
            >
              <span className="w-10 h-10 rounded-full bg-gold text-cream-light font-heading text-xl font-semibold flex items-center justify-center">
                {i + 1}
              </span>
              <h3 className="font-heading text-brown text-xl font-semibold mt-4">
                {right.title}{" "}
                <span className="text-gold-dark font-medium">({right.term})</span>
              </h3>
              <p className="text-brown-light text-sm leading-relaxed mt-2">{right.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
