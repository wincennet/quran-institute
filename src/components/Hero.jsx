import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroQuran from "../assets/hero-quran.jpg";
import { whatsappLink } from "../lib/constants";

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay },
});

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-start md:items-center overflow-hidden bg-[#352b23]"
    >
      {/* Background photo. On a phone the photo is too wide to fill the screen
          without cropping the Quran away, so it sits along the bottom edge at a
          size where the whole book shows, and fades into black behind the text.
          From md up it fills the section as before. */}
      <div className="absolute inset-0 isolate bg-[#352b23]">
        <img
          src={heroQuran}
          alt=""
          className="absolute bottom-0 inset-x-0 w-full h-[58%] object-cover object-[12%_center] -scale-x-100 mix-blend-lighten md:inset-0 md:h-full md:object-[68%_center]"
        />
        {/* phone: blend only the top edge of the photo into the dark behind the
            text, so the Quran itself stays fully visible */}
        <div className="absolute bottom-0 inset-x-0 h-[58%] bg-gradient-to-b from-[#352b23] to-transparent to-45% md:hidden" />
        {/* desktop: extra density behind the text, fading out toward the book */}
        <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-[#352b23]/85 via-[#352b23]/45 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-32 md:pt-28 pb-16">
        <div className="max-w-2xl md:max-w-3xl text-left">
          <motion.img
            {...fadeUp(0)}
            src="/logo/mark-light.png"
            alt="Assiratul Mustaqeem Institute"
            className="h-16 md:h-24 w-auto"
          />

          <motion.h1
            {...fadeUp(0.1)}
            className="font-heading text-cream-light text-[2.6rem] sm:text-6xl md:text-7xl leading-[1.05] mt-8 md:mt-10"
          >
            <span className="block font-light text-balance">Where the Quran moves</span>
            <span className="block font-bold">from lips to heart.</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="mt-5 md:mt-6 max-w-xl text-cream-light/70 text-base md:text-lg leading-relaxed"
          >
            Group and one-to-one courses: Tarteel-ul-Quran, Al-Quran-ul-Arabi and Hifz-ul-Quran.
          </motion.p>

          <motion.div {...fadeUp(0.3)} className="mt-8 md:mt-10 flex flex-wrap gap-3 md:gap-4">
            <a
              href={whatsappLink("Assalamu alaikum, I'd like to book a free individual trial class.")}
              target="_blank"
              rel="noreferrer"
              className="bg-gold hover:bg-gold-dark text-cream-light font-medium px-4 md:px-5 py-2.5 text-sm md:text-base rounded-md border border-gold hover:border-gold-dark transition-colors"
            >
              Free Trial
            </a>
            <Link
              to="/courses/tarteel?format=Individual"
              className="border border-cream-light/60 text-cream-light hover:bg-cream-light/10 font-medium px-4 md:px-5 py-2.5 text-sm md:text-base rounded-md transition-colors"
            >
              Enroll Now
            </Link>
            <a
              href="#courses"
              className="hidden sm:inline-block border border-cream-light/60 text-cream-light hover:bg-cream-light/10 font-medium px-4 md:px-5 py-2.5 text-sm md:text-base rounded-md transition-colors"
            >
              Our Courses
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
