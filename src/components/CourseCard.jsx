import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";

// A wide, horizontal card: the course name, summary and button on the left,
// the Quranic verse that anchors the course on the right (stacked on phones).
export default function CourseCard({ course, format }) {
  const ref = useRef(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (event) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 3);
    rotateX.set(py * -3);
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
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      animate={{ scale: hovering ? 1.01 : 1 }}
      className={`bg-cream-light rounded-2xl border border-gold/25 shadow-sm relative flex flex-col md:flex-row ${
        course.comingSoon ? "opacity-90" : ""
      }`}
    >
      <div className="flex-1 p-7 md:p-8">
        <div className="flex items-center gap-3">
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-gold-dark">
            Course
          </span>
          {course.comingSoon && (
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-brown-light bg-gold/15 border border-gold/30 rounded-full px-3 py-1">
              Coming Soon
            </span>
          )}
        </div>
        <h3 className="font-heading text-brown text-2xl md:text-3xl font-semibold mt-2">
          {course.title}
        </h3>
        <p className="text-brown-light text-sm mt-1">{course.subtitle}</p>

        <p className="text-brown text-sm leading-relaxed mt-5">{course.description}</p>

        <Link
          to={{
            pathname: `/courses/${course.id}`,
            search: format ? `?format=${encodeURIComponent(format)}` : "",
          }}
          className="inline-block mt-6 bg-gold hover:bg-gold-dark text-cream-light text-sm font-medium px-6 py-2.5 rounded-full transition-colors"
        >
          View course →
        </Link>
      </div>

      <div className="md:w-[38%] shrink-0 flex flex-col justify-center border-t md:border-t-0 md:border-l border-gold/20 p-7 md:p-8">
        <p dir="rtl" className="font-arabic text-gold text-xl md:text-2xl leading-relaxed">
          {course.arabic}
        </p>
        <p className="text-brown-light text-xs italic mt-3">{course.translation}</p>
      </div>
    </motion.div>
  );
}
