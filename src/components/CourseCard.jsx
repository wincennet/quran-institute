import { Link } from "react-router-dom";
import { whatsappLink } from "../lib/constants";

// One card in the scrolling course row. Fixed width so several sit side by side
// (about one and a bit visible on a phone), and equal height so the links line up.
//
// Phones and tablets get two buttons. On desktop (lg and up) the card is quieter:
// "View course" is an underlined link, and a "Book a free trial" strip slides up
// from the bottom edge when the pointer is over the card (or a link inside has
// keyboard focus).
export default function CourseCard({ course, format }) {
  const courseLink = {
    pathname: `/courses/${course.id}`,
    search: format ? `?format=${encodeURIComponent(format)}` : "",
  };
  // Free trial is for one-to-one classes, and not for courses still being prepared.
  const trialHref =
    format === "Individual" && !course.comingSoon
      ? whatsappLink(
          `Assalamu alaikum, I'd like to book a free individual trial class for ${course.title}.`,
        )
      : null;

  return (
    <div
      className={`group relative overflow-hidden snap-start shrink-0 w-[82%] sm:w-[22rem] flex flex-col bg-cream rounded-2xl border border-gold/25 p-6 lg:pb-14 shadow-sm transition-transform duration-200 hover:-translate-y-1 ${
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
      {/* Phones and tablets: buttons */}
      <div className="lg:hidden mt-auto pt-6 flex flex-wrap items-center gap-2.5">
        <Link
          to={courseLink}
          className="bg-[#d8c6a2] hover:bg-[#cdb98f] border border-gold/50 text-brown text-[13px] font-medium px-3.5 py-2 rounded-md transition-colors"
        >
          View course →
        </Link>
        {trialHref && (
          <a
            href={trialHref}
            target="_blank"
            rel="noreferrer"
            className="bg-gold hover:bg-gold-dark text-cream-light text-[13px] font-semibold px-4 py-2 rounded-md shadow-sm transition-colors"
          >
            Book a free trial
          </a>
        )}
      </div>

      {/* Desktop: a plain underlined link, plus the hover strip below */}
      <div className="hidden lg:block mt-auto pt-6">
        <Link
          to={courseLink}
          className="text-brown text-sm font-medium underline underline-offset-4 decoration-gold-dark/60 hover:decoration-brown transition-colors"
        >
          View course →
        </Link>
      </div>

      {trialHref && (
        <a
          href={trialHref}
          target="_blank"
          rel="noreferrer"
          className="hidden lg:flex absolute inset-x-0 bottom-0 items-center justify-center bg-gold hover:bg-gold-dark text-cream-light text-sm font-semibold py-3 translate-y-full group-hover:translate-y-0 group-focus-within:translate-y-0 transition-transform duration-200"
        >
          Book a free trial
        </a>
      )}
    </div>
  );
}
