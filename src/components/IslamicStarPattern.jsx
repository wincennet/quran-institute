/**
 * Rub el hizb-style eight-pointed star (two overlapping squares) — the
 * traditional Quran section-marker motif — used as a slow-rotating, very
 * low-opacity backdrop. Pure CSS/SVG so it degrades gracefully: the global
 * prefers-reduced-motion rule (src/index.css) freezes the rotation for users
 * who need it, without hiding the artwork itself.
 */
export default function IslamicStarPattern() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="islamic-star-spin"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "min(70vw, 640px)",
        height: "min(70vw, 640px)",
        transform: "translate(-50%, -50%)",
        opacity: 0.14,
      }}
      aria-hidden="true"
    >
      <circle cx="100" cy="100" r="94" fill="none" stroke="#b8924d" strokeWidth="0.6" />
      <rect x="42" y="42" width="116" height="116" fill="none" stroke="#b8924d" strokeWidth="1.2" />
      <rect
        x="42"
        y="42"
        width="116"
        height="116"
        fill="none"
        stroke="#b8924d"
        strokeWidth="1.2"
        transform="rotate(45 100 100)"
      />
      <circle cx="100" cy="100" r="46" fill="none" stroke="#b8924d" strokeWidth="0.6" />
    </svg>
  );
}
