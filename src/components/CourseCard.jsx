import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  const ref = useRef(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const [hovering, setHovering] = useState(false);

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
      className={`bg-cream-light rounded-2xl border border-gold/25 p-7 shadow-sm relative ${
        course.comingSoon ? "opacity-90" : ""
      }`}
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

      <p dir="rtl" className="font-arabic text-gold text-xl mt-5 leading-relaxed">
        {course.arabic}
      </p>
      <p className="text-brown-light text-xs italic mt-2">{course.translation}</p>

      <p className="text-brown text-sm leading-relaxed mt-5 pt-5 border-t border-gold/20">
        {course.description}
      </p>

      <Link
        to={`/courses/${course.id}`}
        className="inline-block mt-5 text-sm font-medium text-gold-dark hover:text-gold underline underline-offset-4"
      >
        Learn more →
      </Link>
    </motion.div>
  );
}
