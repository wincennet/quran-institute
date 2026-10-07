import { CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";
import useCountry from "../hooks/useCountry";
import { PRICING, whatsappLink } from "../lib/constants";

export default function Pricing() {
  const country = useCountry();
  const isPakistan = country === "PK";

  return (
    <section id="pricing" className="bg-cream-light py-24">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="font-sans text-gold-dark text-sm uppercase tracking-[0.25em]">
            Pricing
          </span>
          <h2 className="font-heading text-brown text-3xl md:text-4xl font-medium mt-3">
            Simple monthly fees for one-to-one classes
          </h2>
          <p className="text-brown-light mt-4 leading-relaxed">
            Every student starts with a free trial class. Pick the days that suit your family —
            we arrange the timing around your schedule.
          </p>
          {isPakistan && (
            <p className="text-gold-dark text-sm font-medium mt-3">
              Special pricing for students in Pakistan
            </p>
          )}
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-14 max-w-3xl mx-auto">
          {PRICING.plans.map((plan, i) => {
            const price = isPakistan ? plan.price.PK : plan.price.default;
            const points = [
              plan.days,
              `${plan.classesPerWeek} classes a week, ${PRICING.classMinutes} minutes each`,
              "One-to-one with a qualified teacher",
              "Timing arranged around your schedule",
            ];

            return (
              <Reveal key={plan.id} delay={i * 0.1}>
                <div className="h-full flex flex-col bg-cream border border-gold/25 rounded-2xl p-8">
                  <h3 className="font-heading text-brown text-xl font-semibold">{plan.title}</h3>

                  <p className="mt-4">
                    <span className="font-heading text-brown text-5xl font-semibold">{price}</span>
                    <span className="text-brown-light text-sm"> / month</span>
                  </p>

                  <ul className="mt-6 space-y-3 flex-1">
                    {points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-brown-light text-sm leading-relaxed"
                      >
                        <CheckCircle2 className="text-gold shrink-0 mt-0.5" size={16} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={whatsappLink(
                      `Assalamu alaikum, I'd like to book a free trial class (${plan.title}).`,
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 block text-center bg-gold hover:bg-gold-dark text-cream-light font-medium py-3 rounded-full transition-colors"
                  >
                    Book a free trial
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>

        <p className="text-center text-brown-light text-sm mt-8">
          Not sure which plan fits? Book a free trial and we&apos;ll help you choose.
        </p>
      </div>
    </section>
  );
}
