import { CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";
import { LEARNING_FORMATS } from "../lib/constants";

export default function LearningFormats() {
  return (
    <section id="formats" className="bg-cream py-24 kufic-pattern">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="font-sans text-gold-dark text-sm uppercase tracking-[0.25em]">
            Class Formats
          </span>
          <h2 className="font-heading text-brown text-3xl md:text-4xl font-medium mt-3">
            Choose how you&apos;d like to learn
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-14 max-w-3xl mx-auto">
          {LEARNING_FORMATS.map((format, i) => (
            <Reveal
              key={format.id}
              delay={i * 0.1}
              className="bg-cream-light rounded-2xl border border-gold/25 p-8"
            >
              <h3 className="font-heading text-brown text-2xl font-semibold">{format.title}</h3>
              <ul className="mt-6 space-y-3">
                {format.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-brown-light text-sm leading-relaxed">
                    <CheckCircle2 className="text-gold shrink-0 mt-0.5" size={18} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
