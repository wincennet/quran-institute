import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// A section that rises into place as it scrolls into view: it slides up from
// below, fades and grows to full size, and its rounded top corners straighten
// out. The motion follows the scroll position, so scrolling back up reverses it.
export default function ScrollPanel({ children }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.3"] });

  const y = useTransform(scrollYProgress, [0, 1], [140, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [40, 0]);

  if (reduceMotion) return <div>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className="overflow-hidden"
      style={{
        y,
        opacity,
        scale,
        borderTopLeftRadius: radius,
        borderTopRightRadius: radius,
        transformOrigin: "top center",
      }}
    >
      {children}
    </motion.div>
  );
}
