import { Quote } from "lucide-react";
import Reveal from "./Reveal";

const PLACEHOLDER_TESTIMONIALS = [
  {
    name: "Sample parent, United Kingdom",
    quote:
      "My daughter looks forward to her class every week — the teacher is patient and her Tajweed has improved so much in just a few months.",
  },
  {
    name: "Sample student, United States",
    quote:
      "I started with almost no Arabic. Now I can follow along with translation classes and actually understand what I'm reciting.",
  },
  {
    name: "Sample parent, Australia",
    quote:
      "Scheduling across timezones was our biggest worry before we joined — it turned out to be the easiest part.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-cream py-24">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="font-sans text-gold-dark text-sm uppercase tracking-[0.25em]">
            Testimonials
          </span>
          <h2 className="font-heading text-brown text-3xl md:text-4xl font-medium mt-3">
            What our students and parents say
          </h2>
          <p className="text-brown-light text-xs mt-3 italic">
            Sample quotes shown below — real testimonials coming soon.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mt-14">
          {PLACEHOLDER_TESTIMONIALS.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 0.1}
              className="bg-cream-light rounded-2xl border border-gold/20 p-7"
            >
              <Quote className="text-gold/60" size={26} />
              <p className="text-brown text-sm leading-relaxed mt-4">“{t.quote}”</p>
              <p className="text-brown-light text-xs font-medium mt-5">{t.name}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
