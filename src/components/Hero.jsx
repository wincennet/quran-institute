import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroQuran from "../assets/hero-quran.jpg";
import { MISSION_STATEMENT, whatsappLink } from "../lib/constants";

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden">
      {/* background photo */}
      <div className="absolute inset-0">
        <img
          src={heroQuran}
          alt=""
          className="w-full h-full object-cover object-[68%_center]"
        />
        {/* brown tint, low opacity so the photo still reads through */}
        <div className="absolute inset-0 bg-brown/45" />
        {/* extra density behind the text on the left; fades out toward the book on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-brown/85 via-brown/55 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 pt-28 pb-16">
        <div className="max-w-xl text-left">
          <motion.img
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            src="/logo/mark-light.png"
            alt="Assiratul Mustaqeem Institute"
            className="h-14 md:h-16 w-auto mb-8"
          />

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="leading-tight"
          >
            <span dir="rtl" className="block font-arabic-display text-gold text-3xl md:text-5xl">
              أكاديمية الصراط المستقيم
            </span>
            <span className="block font-cinzel text-cream-light text-lg md:text-xl tracking-[0.1em] uppercase mt-5">
              Assiratul Mustaqeem Institute
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-cream-light/85 text-base md:text-lg leading-relaxed"
          >
            {MISSION_STATEMENT}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              to="/courses/tarteel/enroll"
              className="bg-gold hover:bg-gold-dark text-cream-light font-medium px-7 py-3 rounded-full transition-colors"
            >
              Enroll Now
            </Link>
            <a
              href={whatsappLink("Assalamu alaikum, I'd like to book a free individual trial class.")}
              target="_blank"
              rel="noreferrer"
              className="border border-cream-light/60 text-cream-light hover:bg-cream-light/10 font-medium px-7 py-3 rounded-full transition-colors"
            >
              Free Trial
            </a>
            <a
              href="#courses"
              className="border border-cream-light/60 text-cream-light hover:bg-cream-light/10 font-medium px-7 py-3 rounded-full transition-colors"
            >
              Our Courses
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
