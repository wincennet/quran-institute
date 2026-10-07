import { Quote } from "lucide-react";
import Reveal from "./Reveal";
import ScrollRow from "./ScrollRow";

const TESTIMONIALS = [
  {
    name: "A student, United States",
    quote:
      "Assalamualaikum. Me, and my 2 brothers have read Quran with this institute for around 8 years. All three of us have finished our qaida, and have finished the Quran back to back twice. The tajweed is very intricate, and we were even taught the translation of the Quran. We were also taught various daily duas, and even taught parts of prayer. I highly recommend signing up with this institute. The teachers are very kind to their students, and will even come to teach you at your own personal timings.",
  },
  {
    name: "A parent, United States",
    quote:
      "The Quran Teacher is very dedicated. She encourages students to practice Quran with tajweed. She is also very patient with her students. Excellent teacher!",
  },
  {
    name: "A parent, Australia",
    quote:
      "We are very happy to have Quran teacher from this institute for our children. She is very knowledgeable, kind, and patient. We have had a memorable and wonderful experience with her as a teacher. May Allah bless her and help her progress in her work. Ameen.",
  },
  {
    name: "A student, United Kingdom",
    quote: "I really enjoy my Quran class and would definitely recommend my institute.",
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
        </Reveal>

        <Reveal className="mt-14">
          <ScrollRow>
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name + t.quote.slice(0, 20)}
                className="snap-start shrink-0 w-[82%] sm:w-[22rem] flex flex-col bg-cream-light rounded-2xl border border-gold/20 p-7"
              >
                <Quote className="text-gold/60" size={26} />
                <p className="text-brown text-sm leading-relaxed mt-4">“{t.quote}”</p>
                <p className="text-brown-light text-xs font-medium mt-auto pt-5">{t.name}</p>
              </div>
            ))}
          </ScrollRow>
        </Reveal>
      </div>
    </section>
  );
}
