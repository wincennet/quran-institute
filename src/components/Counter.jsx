import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export default function Counter({ value, suffix = "", duration = 1400 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReducedMotion = usePrefersReducedMotion();
  const [display, setDisplay] = useState(prefersReducedMotion ? value : 0);

  useEffect(() => {
    if (!inView || prefersReducedMotion) {
      if (prefersReducedMotion) setDisplay(value);
      return;
    }

    let start = null;
    let frame;

    const step = (timestamp) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setDisplay(Math.round(progress * value));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration, prefersReducedMotion]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
