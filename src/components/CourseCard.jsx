import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { LEARNING_FORMATS, whatsappLink } from "../lib/constants";

export default function CourseCard({ course, expanded, onToggle }) {
  const ref = useRef(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const [hovering, setHovering] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState(course.formats?.[0] ?? null);

  const activeFormat = LEARNING_FORMATS.find(
    (format) => format.id === selectedFormat?.toLowerCase(),
  );

  const handleMouseMove = (event) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 8);
    rotateX.set(py * -8);
  };

  const handleLeave = () => {
    setHovering(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      animate={{ scale: hovering ? 1.02 : 1 }}
      className={`bg-cream-light rounded-2xl border border-gold/25 p-7 shadow-sm cursor-pointer relative ${
        course.comingSoon ? "opacity-90" : ""
      }`}
      onClick={onToggle}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-sans text-xs uppercase tracking-[0.2em] text-gold-dark">
          Course
        </span>
        {course.comingSoon && (
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-brown-light bg-gold/15 border border-gold/30 rounded-full px-3 py-1">
            Coming Soon
          </span>
        )}
      </div>
      <h3 className="font-heading text-brown text-2xl font-semibold mt-2">{course.title}</h3>
      <p className="text-brown-light text-sm mt-1">{course.subtitle}</p>

      {course.languages && (
        <div className="flex flex-wrap gap-2 mt-4">
          {course.languages.map((lang) => (
            <span
              key={lang}
              className="font-sans text-xs text-gold-dark border border-gold/30 rounded-full px-3 py-1"
            >
              {lang}
            </span>
          ))}
        </div>
      )}

      {course.formats && (
        <div className="flex flex-wrap gap-2 mt-2">
          {course.formats.map((format) => (
            <span
              key={format}
              className="font-sans text-xs text-gold-dark border border-gold/30 rounded-full px-3 py-1"
            >
              {format}
            </span>
          ))}
        </div>
      )}

      {course.groupDuration && (
        <p className="text-brown-light text-xs mt-3">
          Group batch duration: <span className="text-gold-dark font-medium">{course.groupDuration}</span>
        </p>
      )}

      <p dir="rtl" className="font-arabic text-gold text-xl mt-5 leading-relaxed">
        {course.arabic}
      </p>
      <p className="text-brown-light text-xs italic mt-2">{course.translation}</p>

      <motion.div
        initial={false}
        animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="text-brown text-sm leading-relaxed mt-5 pt-5 border-t border-gold/20">
          {course.description}
        </p>
        {course.comingSoonNote && (
          <p className="text-gold-dark text-xs font-medium italic mt-3">
            {course.comingSoonNote}
          </p>
        )}

        {course.formats && (
          <div className="mt-5 pt-5 border-t border-gold/20">
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold-dark">
              Choose your format
            </p>
            <div className="flex gap-2 mt-3" onClick={(e) => e.stopPropagation()}>
              {course.formats.map((format) => (
                <button
                  key={format}
                  type="button"
                  onClick={() => setSelectedFormat(format)}
                  aria-pressed={selectedFormat === format}
                  className={`text-sm font-medium rounded-full px-4 py-1.5 border transition-colors ${
                    selectedFormat === format
                      ? "bg-gold text-cream-light border-gold"
                      : "text-brown-light border-gold/30 hover:border-gold"
                  }`}
                >
                  {format}
                </button>
              ))}
            </div>

            {activeFormat && (
              <ul className="mt-4 space-y-2">
                {activeFormat.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-brown-light text-sm leading-relaxed"
                  >
                    <CheckCircle2 className="text-gold shrink-0 mt-0.5" size={16} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <a
          href={whatsappLink(
            course.comingSoon
              ? `Assalamu alaikum, please let me know when ${course.title} becomes available.`
              : `Assalamu alaikum, I'd like to know more about ${course.title}${
                  selectedFormat ? ` (${selectedFormat} classes)` : ""
                }.`,
          )}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-block mt-5 text-sm font-medium text-gold-dark hover:text-gold underline underline-offset-4"
        >
          {course.comingSoon
            ? "Notify me when it's ready on WhatsApp →"
            : "Ask about this course on WhatsApp →"}
        </a>
      </motion.div>

      <button
        className="mt-5 text-sm font-medium text-brown-light"
        aria-expanded={expanded}
      >
        {expanded ? "Show less" : "Learn more"}
      </button>
    </motion.div>
  );
}
