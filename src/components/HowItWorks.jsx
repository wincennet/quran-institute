import Reveal from "./Reveal";
import { PLATFORMS, STEPS } from "../lib/constants";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-cream-light py-24">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="font-sans text-gold-dark text-sm uppercase tracking-[0.25em]">
            How Classes Work
          </span>
          <h2 className="font-heading text-brown text-3xl md:text-4xl font-medium mt-3">
            Simple to start, easy to keep up with
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-14">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1} className="text-center relative">
              <div className="w-14 h-14 rounded-full bg-gold text-cream-light font-heading text-2xl font-semibold flex items-center justify-center mx-auto">
                {i + 1}
              </div>
              <h3 className="font-heading text-brown text-xl font-semibold mt-5">
                {step.title}
              </h3>
              <p className="text-brown-light text-sm mt-2 leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="mt-16 text-center">
          <p className="text-brown-light text-sm uppercase tracking-[0.2em] mb-5">
            Classes held on
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {PLATFORMS.map((platform) => (
              <span
                key={platform}
                className="bg-cream border border-gold/30 rounded-full px-5 py-2 text-brown text-sm font-medium"
              >
                {platform}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
