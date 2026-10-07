import { useEffect, useRef, useState } from "react";
import { Quote, X } from "lucide-react";
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

// Every card is the same size. A quote that doesn't fit is cut off after a few
// lines and gets a "View more" link that opens the full text.
function TestimonialCard({ testimonial, onOpen }) {
  const quoteRef = useRef(null);
  const [isCutOff, setIsCutOff] = useState(false);

  // The observer reports once on start and again on any resize, so the link
  // only appears when the text really overflows at the current card width.
  useEffect(() => {
    const el = quoteRef.current;
    if (!el || typeof ResizeObserver === "undefined") return undefined;
    const observer = new ResizeObserver(() => setIsCutOff(el.scrollHeight > el.clientHeight + 1));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="snap-start shrink-0 w-[82%] sm:w-[22rem] h-72 flex flex-col bg-cream-light rounded-2xl border border-gold/20 p-7">
      <Quote className="text-gold/60 shrink-0" size={26} />
      <p ref={quoteRef} className="text-brown text-sm leading-relaxed mt-4 line-clamp-5">
        “{testimonial.quote}”
      </p>
      {isCutOff && (
        <button
          type="button"
          onClick={() => onOpen(testimonial)}
          className="self-start mt-2 text-sm font-medium text-gold-dark hover:text-gold underline underline-offset-4"
        >
          View more
        </button>
      )}
      <p className="text-brown-light text-xs font-medium mt-auto pt-4">{testimonial.name}</p>
    </div>
  );
}

function TestimonialDialog({ testimonial, onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-brown/50 px-4 py-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Full testimonial"
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-cream-light border border-gold/30 rounded-2xl p-8 shadow-xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-brown-light hover:text-brown transition-colors"
        >
          <X size={22} />
        </button>
        <Quote className="text-gold/60" size={28} />
        <p className="text-brown leading-relaxed mt-4">“{testimonial.quote}”</p>
        <p className="text-brown-light text-sm font-medium mt-5">{testimonial.name}</p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [openTestimonial, setOpenTestimonial] = useState(null);

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
              <TestimonialCard
                key={t.name + t.quote.slice(0, 20)}
                testimonial={t}
                onOpen={setOpenTestimonial}
              />
            ))}
          </ScrollRow>
        </Reveal>
      </div>

      {openTestimonial && (
        <TestimonialDialog
          testimonial={openTestimonial}
          onClose={() => setOpenTestimonial(null)}
        />
      )}
    </section>
  );
}
