import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { MISSION_STATEMENT, whatsappLink } from "../lib/constants";

const HeroScene = lazy(() => import("./HeroScene"));

export default function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const sceneWrapperRef = useRef(null);
  const [sceneSize, setSceneSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = sceneWrapperRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setSceneSize({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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

      <div ref={sceneWrapperRef} className="absolute inset-0" aria-hidden="true">
        {!prefersReducedMotion && sceneSize.width > 0 && sceneSize.height > 0 && (
          <Suspense fallback={null}>
            <HeroScene width={sceneSize.width} height={sceneSize.height} />
          </Suspense>
        )}
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center pt-24 pb-16">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="leading-tight"
        >
          <span dir="rtl" className="block font-arabic-display text-gold text-3xl md:text-5xl">
            أكاديمية الصراط المستقيم
          </span>
          <span className="block font-cinzel text-brown text-lg md:text-xl tracking-[0.1em] uppercase mt-5">
            Assiratul Mustaqeem Institute
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
