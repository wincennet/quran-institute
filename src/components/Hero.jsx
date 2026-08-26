import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { MISSION_STATEMENT, whatsappLink } from "../lib/constants";

const HeroScene = lazy(() => import("./HeroScene"));

export default function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream"
    >
      {/* static gradient fallback, always present beneath the canvas */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(184,146,77,0.16) 0%, rgba(232,220,198,0) 60%)",
        }}
      />

      {!prefersReducedMotion && (
        <div className="absolute inset-0" aria-hidden="true">
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </div>
      )}

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center pt-24 pb-16">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          dir="rtl"
          className="font-arabic text-gold text-3xl md:text-4xl mb-4"
        >
          وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-heading text-brown text-4xl md:text-6xl font-medium leading-tight"
        >
          Assiratul Mustaqeem
          <span className="block text-gold-dark text-2xl md:text-3xl mt-2">
            Online Quran Institute
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-brown-light text-base md:text-lg leading-relaxed"
        >
          {MISSION_STATEMENT}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={whatsappLink("Assalamu alaikum, I'd like to book a free trial class.")}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto bg-gold hover:bg-gold-dark text-cream-light font-medium px-8 py-3 rounded-full transition-colors"
          >
            Book a Free Trial Class
          </a>
          <a
            href="#courses"
            className="w-full sm:w-auto border border-gold-dark text-brown hover:bg-cream-light font-medium px-8 py-3 rounded-full transition-colors"
          >
            Explore Courses
          </a>
        </motion.div>
      </div>
    </section>
  );
}
