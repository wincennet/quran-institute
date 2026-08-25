/**
 * Text-based placeholder wordmark. Swap for the real logo file by dropping it
 * in /public/logo and replacing this component's markup with an <img>.
 */
export default function Logo({ compact = false }) {
  return (
    <div className="flex flex-col items-center leading-none select-none">
      <span
        className="font-heading text-gold tracking-[0.15em] uppercase"
        style={{ fontSize: compact ? "1.05rem" : "1.6rem" }}
      >
        Assiratul Mustaqeem
      </span>
      {!compact && (
        <span className="font-arabic text-gold-dark text-2xl mt-1" dir="rtl">
          أكاديمية صراط المستقيم
        </span>
      )}
      <span
        className="font-sans text-brown tracking-[0.35em] uppercase mt-1"
        style={{ fontSize: compact ? "0.5rem" : "0.65rem" }}
      >
        Sirat-al-Mustaqeem Institute
      </span>
    </div>
  );
}
