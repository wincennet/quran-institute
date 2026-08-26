/**
 * Real kufic-square mark (cropped from the institute's provided logo artwork)
 * paired with live text, so the institute's name stays correctly spelled and
 * editable rather than baked into a raster image.
 */
export default function Logo({ compact = false }) {
  return (
    <div className="flex flex-col items-center leading-none select-none">
      <img
        src="/logo/mark.png"
        alt="Assiratul Mustaqeem Institute mark"
        className={compact ? "h-6 w-auto mb-1" : "h-10 w-auto mb-2"}
      />
      <span
        className="font-heading text-gold tracking-[0.15em] uppercase"
        style={{ fontSize: compact ? "1.05rem" : "1.6rem" }}
      >
        Assiratul Mustaqeem
      </span>
      {!compact && (
        <span className="font-arabic text-gold-dark text-2xl mt-1" dir="rtl">
          أكاديمية الصراط المستقيم
        </span>
      )}
      <span
        className="font-sans text-brown tracking-[0.35em] uppercase mt-1"
        style={{ fontSize: compact ? "0.5rem" : "0.65rem" }}
      >
        Assiratul Mustaqeem Institute
      </span>
    </div>
  );
}
