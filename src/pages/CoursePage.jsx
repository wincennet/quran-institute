import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import PickerRow from "../components/PickerRow";
import { COURSES, LEARNING_FORMATS } from "../lib/constants";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mljrqnlb";

export default function CoursePage() {
  const { id } = useParams();
  const course = COURSES.find((c) => c.id === id);

  if (!course) {
    return (
      <main className="max-w-2xl mx-auto px-6 py-32 text-center">
        <h1 className="font-heading text-brown text-3xl font-semibold">Course not found</h1>
        <Link
          to="/"
          className="inline-block mt-6 text-gold-dark hover:text-gold underline underline-offset-4"
        >
          ← Back to home
        </Link>
      </main>
    );
  }

  return <CourseDetail course={course} />;
}

function CourseDetail({ course }) {
  const [selectedLanguage, setSelectedLanguage] = useState(course.languages?.[0] ?? null);
  const [selectedFormat, setSelectedFormat] = useState(course.formats?.[0] ?? null);
  const [status, setStatus] = useState("idle");

  const activeFormat = LEARNING_FORMATS.find(
    (format) => format.id === selectedFormat?.toLowerCase(),
  );

  // Only used for the Coming Soon "notify me" form — real courses skip this
  // form entirely and link to the dedicated enroll page instead.
  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    const form = event.target;
    const data = new FormData(form);
    data.set("course", course.title);
    if (selectedLanguage) data.set("language", selectedLanguage);
    if (selectedFormat) data.set("format", selectedFormat);
    data.set("_subject", `Notify-me request: ${course.title}`);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      setStatus(response.ok ? "success" : "error");
      if (response.ok) form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="bg-cream py-16">
      <div className="max-w-3xl mx-auto px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-brown-light hover:text-brown"
        >
          <ArrowLeft size={16} /> Back to all courses
        </Link>

        <div className="bg-cream-light rounded-2xl border border-gold/25 p-8 md:p-10 mt-6">
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

          <h1 className="font-heading text-brown text-3xl md:text-4xl font-semibold mt-3">
            {course.title}
          </h1>
          <p className="text-brown-light mt-1">{course.subtitle}</p>

          <p dir="rtl" className="font-arabic text-gold text-2xl mt-6 leading-relaxed">
            {course.arabic}
          </p>
          <p className="text-brown-light text-sm italic mt-2">{course.translation}</p>

          <p className="text-brown leading-relaxed mt-6 pt-6 border-t border-gold/20">
            {course.description}
          </p>

          {course.comingSoonNote && (
            <p className="text-gold-dark text-sm font-medium italic mt-3">
              {course.comingSoonNote}
            </p>
          )}

          {course.languages && (
            <div className="mt-6 pt-6 border-t border-gold/20">
              <PickerRow
                label="Choose your language"
                options={course.languages}
                selected={selectedLanguage}
                onSelect={setSelectedLanguage}
              />
            </div>
          )}

          {course.formats && (
            <div className="mt-6 pt-6 border-t border-gold/20">
              <PickerRow
                label="Choose your format"
                options={course.formats}
                selected={selectedFormat}
                onSelect={setSelectedFormat}
              />

              {activeFormat && (
                <ul className="mt-4 space-y-2">
                  {activeFormat.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-brown-light text-sm leading-relaxed"
                    >
                      <CheckCircle2 className="text-gold shrink-0 mt-0.5" size={16} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {course.comingSoon ? (
            <form
              onSubmit={handleSubmit}
              className="mt-6 pt-6 border-t border-gold/20 space-y-4"
            >
              <p className="font-heading text-brown text-lg font-semibold">
                Get notified when this course is ready
              </p>

              <div>
                <label htmlFor="name" className="text-xs text-brown-light font-medium">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-1 w-full rounded-lg border border-gold/30 bg-cream px-4 py-2.5 text-brown text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
              </div>

              <div>
                <label htmlFor="email" className="text-xs text-brown-light font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 w-full rounded-lg border border-gold/30 bg-cream px-4 py-2.5 text-brown text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-gold hover:bg-gold-dark disabled:opacity-60 text-cream-light font-medium py-3 rounded-full transition-colors"
              >
                {status === "sending" ? "Sending…" : "Notify Me"}
              </button>

              {status === "success" && (
                <p className="text-sm text-gold-dark text-center">
                  Got it — we'll let you know as soon as it's ready.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-700 text-center">
                  Something went wrong — please try again or message us on WhatsApp from the
                  Contact section.
                </p>
              )}
            </form>
          ) : (
            <div className="mt-6 pt-6 border-t border-gold/20">
              <Link
                to={{
                  pathname: `/courses/${course.id}/enroll`,
                  search: new URLSearchParams({
                    ...(selectedLanguage ? { language: selectedLanguage } : {}),
                    ...(selectedFormat ? { format: selectedFormat } : {}),
                  }).toString(),
                }}
                className="block w-full text-center bg-gold hover:bg-gold-dark text-cream-light font-medium py-3 rounded-full transition-colors"
              >
                Enroll Now
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
