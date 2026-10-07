import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// A horizontally scrollable row of course cards: swipe on a phone, scroll or
// use the arrows on a computer. The row is centred when all cards fit, and
// only scrolls when they don't.
export default function CourseRow({ children }) {
  const scroller = useRef(null);
  const [edges, setEdges] = useState({ canPrev: false, canNext: false });

  const updateEdges = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setEdges({
      canPrev: el.scrollLeft > 4,
      canNext: el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
    });
  }, []);

  // ResizeObserver reports once on start and again whenever the row resizes,
  // which keeps the arrows right without reading layout inside an effect body.
  useEffect(() => {
    const el = scroller.current;
    if (!el || typeof ResizeObserver === "undefined") return undefined;
    const observer = new ResizeObserver(updateEdges);
    observer.observe(el);
    return () => observer.disconnect();
  }, [updateEdges]);

  const scrollByCards = (direction) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const arrowClass =
    "hidden md:flex absolute top-1/2 -translate-y-1/2 z-10 h-11 w-11 items-center justify-center rounded-full bg-cream-light border border-gold/40 text-brown shadow-md hover:bg-gold hover:text-cream-light transition-colors";

  return (
    <div className="relative">
      <div
        ref={scroller}
        onScroll={updateEdges}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory w-fit max-w-full mx-auto pt-2 pb-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      {edges.canPrev && (
        <button
          type="button"
          aria-label="Previous courses"
          onClick={() => scrollByCards(-1)}
          className={`${arrowClass} -left-3`}
        >
          <ChevronLeft size={22} />
        </button>
      )}
      {edges.canNext && (
        <button
          type="button"
          aria-label="Next courses"
          onClick={() => scrollByCards(1)}
          className={`${arrowClass} -right-3`}
        >
          <ChevronRight size={22} />
        </button>
      )}
    </div>
  );
}
