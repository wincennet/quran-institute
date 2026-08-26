/**
 * Real kufic-square mark (cropped from the institute's provided logo artwork).
 * In compact mode (navbar/footer), the mark stands alone as an icon. The
 * full lockup with Arabic + English name is used in the hero.
 *
 * `onDark` swaps in a recolored mark (brown ink -> cream) for use on dark
 * backgrounds like the footer, where the original brown strokes would
 * otherwise blend into the background.
 */
export default function Logo({ compact = false, onDark = false }) {
  const markSrc = onDark ? "/logo/mark-light.png" : "/logo/mark.png";

  if (compact) {
    return <img src={markSrc} alt="Assiratul Mustaqeem Institute" className="h-10 w-auto" />;
  }

  return (
    <div className="flex flex-col items-center leading-none select-none">
      <img
        src={markSrc}
        alt="Assiratul Mustaqeem Institute mark"
        className="h-10 w-auto mb-2"
      />
      <span className="font-arabic-display text-gold" dir="rtl" style={{ fontSize: "2rem" }}>
        أكاديمية الصراط المستقيم
      </span>
      <span
        className={`font-sans tracking-[0.35em] uppercase mt-1 ${onDark ? "text-cream-light" : "text-brown"}`}
        style={{ fontSize: "0.65rem" }}
      >
        Assiratul Mustaqeem Institute
      </span>
    </div>
  );
}
