/**
 * Real kufic-square mark (cropped from the institute's provided logo artwork).
 * In compact mode (navbar), the mark stands alone as an icon. The full
 * lockup with Arabic + English name is used in the hero and footer.
 */
export default function Logo({ compact = false }) {
  if (compact) {
    return (
      <img
        src="/logo/mark.png"
        alt="Assiratul Mustaqeem Institute"
        className="h-10 w-auto"
      />
    );
  }

  return (
    <div className="flex flex-col items-center leading-none select-none">
      <img
        src="/logo/mark.png"
        alt="Assiratul Mustaqeem Institute mark"
        className="h-10 w-auto mb-2"
      />
      <span className="font-arabic-display text-gold" dir="rtl" style={{ fontSize: "2rem" }}>
        أكاديمية الصراط المستقيم
      </span>
      <span
        className="font-sans text-brown tracking-[0.35em] uppercase mt-1"
        style={{ fontSize: "0.65rem" }}
      >
        Assiratul Mustaqeem Institute
      </span>
    </div>
  );
}
