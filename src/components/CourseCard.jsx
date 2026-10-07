import { Link } from "react-router-dom";
import { whatsappLink } from "../lib/constants";

// One card in the scrolling course row. Fixed width so several sit side by side
// (about one and a bit visible on a phone), and equal height so the buttons line up.
export default function CourseCard({ course, format }) {
  return (
    <div
      className={`snap-start shrink-0 w-[82%] sm:w-[22rem] flex flex-col bg-cream-light rounded-2xl border border-gold/25 p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 ${
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

      {/* The full description lives on the course page, not on the card. */}
      <div className="mt-auto pt-6 flex flex-wrap items-center gap-2.5">
        {/* Free trial is for one-to-one classes, and not for courses still being prepared. */}
        {format === "Individual" && !course.comingSoon && (
          <a
            href={whatsappLink(
              `Assalamu alaikum, I'd like to book a free individual trial class for ${course.title}.`,
            )}
            target="_blank"
            rel="noreferrer"
            className="bg-gold hover:bg-gold-dark text-cream-light text-[13px] font-semibold px-4 py-2 rounded-full shadow-sm transition-colors"
          >
            Book a free trial
          </a>
        )}
        <Link
          to={{
            pathname: `/courses/${course.id}`,
            search: format ? `?format=${encodeURIComponent(format)}` : "",
          }}
          className="bg-cream hover:bg-cream/60 border border-gold/40 text-brown text-[13px] font-medium px-3.5 py-2 rounded-full transition-colors"
        >
          View course →
        </Link>
      </div>
    </div>
  );
}
