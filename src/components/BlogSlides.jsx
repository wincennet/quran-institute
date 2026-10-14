import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// A swipeable set of slide images (the same slides that go on Instagram). Uses
// native scroll-snapping, so swiping works on phones and the arrows and dots work
// with a mouse.
export default function BlogSlides({ slides }) {
  const track = useRef(null);
  const [index, setIndex] = useState(0);

  const onScroll = () => {
    const el = track.current;
    if (!el || !el.clientWidth) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  const goTo = (target) => {
    const el = track.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(slides.length - 1, target));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowRight") goTo(index + 1);
    if (event.key === "ArrowLeft") goTo(index - 1);
  };

  const arrowClass =
    "absolute top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-cream-light/90 border border-gold/40 text-brown flex items-center justify-center shadow-sm hover:bg-cream-light transition-colors";

  return (
    <div dir="ltr" className="select-none">
      <div className="relative">
        <div
          ref={track}
          onScroll={onScroll}
          onKeyDown={onKeyDown}
          tabIndex={0}
          role="region"
          aria-label="Post slides"
          className="flex overflow-x-auto snap-x snap-mandatory rounded-2xl border border-gold/25 bg-cream-light focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((slide, position) => (
            <img
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              width={1080}
              height={1350}
              loading={position === 0 ? "eager" : "lazy"}
              draggable={false}
              className="w-full shrink-0 snap-center aspect-[4/5] object-cover"
            />
          ))}
        </div>

        {index > 0 && (
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            aria-label="Previous slide"
            className={`${arrowClass} left-3`}
          >
            <ChevronLeft size={20} />
          </button>
        )}
        {index < slides.length - 1 && (
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            aria-label="Next slide"
            className={`${arrowClass} right-3`}
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>

      <div className="mt-3 flex items-center justify-center gap-2" aria-hidden="true">
        {slides.map((slide, position) => (
          <span
            key={slide.src}
            className={`h-1.5 rounded-full transition-all ${
              position === index ? "w-6 bg-gold" : "w-1.5 bg-gold/30"
            }`}
          />
        ))}
      </div>
      <p className="mt-2 text-center text-xs text-brown-light">
        Slide {index + 1} of {slides.length}. Swipe or use the arrows.
      </p>
    </div>
  );
}
