import { lazy, Suspense } from "react";
import { Globe as GlobeIcon } from "lucide-react";
import Reveal from "./Reveal";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { REACHED_COUNTRIES } from "../lib/constants";

const GlobalReachGlobe = lazy(() => import("./GlobalReachGlobe"));

function CountryList() {
  return (
    <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
      {REACHED_COUNTRIES.map((country) => (
        <span
          key={country.name}
          className="bg-cream border border-gold/25 rounded-full px-4 py-1.5 text-brown text-xs font-medium"
        >
          {country.name}
        </span>
      ))}
    </div>
  );
}

export default function GlobalReach() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section id="global-reach" className="bg-brown py-24 text-cream-light">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Reveal className="max-w-2xl mx-auto">
          <span className="font-sans text-gold text-sm uppercase tracking-[0.25em]">
            Global Reach
          </span>
          <h2 className="font-heading text-cream-light text-3xl md:text-4xl font-medium mt-3">
            Students in 45+ countries, one classroom
          </h2>
          <p className="text-cream/70 text-sm md:text-base mt-4 max-w-xl mx-auto leading-relaxed">
            Drag the globe to explore where our students learn from — a small sample of the
            countries Assiratul Mustaqeem has reached over 13 years.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          {prefersReducedMotion ? (
            <div>
              <GlobeIcon className="text-gold mx-auto mb-6" size={48} strokeWidth={1.2} />
              <CountryList />
            </div>
          ) : (
            <Suspense
              fallback={
                <div className="h-[320px] flex items-center justify-center text-cream/60 text-sm">
                  Loading globe…
                </div>
              }
            >
              <GlobalReachGlobe autoRotate={!prefersReducedMotion} />
            </Suspense>
          )}
        </Reveal>
      </div>
    </section>
  );
}
