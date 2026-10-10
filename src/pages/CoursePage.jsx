import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import useCountry from "../hooks/useCountry";
import useDocumentMeta from "../hooks/useDocumentMeta";
import { COURSES, LEARNING_FORMATS } from "../lib/constants";
import { groupFacts } from "../lib/pricing";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mljrqnlb";

export default function CoursePage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
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

  const requestedFormat = searchParams.get("format");
  const initialFormat = course.formats?.includes(requestedFormat)
    ? requestedFormat
    : (course.formats?.[0] ?? null);

  return <CourseDetail course={course} initialFormat={initialFormat} />;
}

function CourseDetail({ course, initialFormat }) {
  const [status, setStatus] = useState("idle");
  const isPakistan = useCountry() === "PK";

  useDocumentMeta({
    title: `${course.title} — ${course.subtitle} | Assiratul Mustaqeem`,
    description: course.description,
  });

  // Format is fixed by which homepage section the student came from
  // (Group or Individual) — this page never offers a way to switch it.
  const selectedFormat = initialFormat;
  const activeFormat = LEARNING_FORMATS.find(
    (format) => format.id === selectedFormat?.toLowerCase(),
  );
  const isIndividual = selectedFormat === "Individual";

  // Only used for the Coming Soon "notify me" form — real courses skip this
  // form entirely and link to the dedicated enroll page instead.
  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    const form = event.target;
    const data = new FormData(form);
    data.set("course", course.title);
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

          {activeFormat && (
            <div className="mt-6 pt-6 border-t border-gold/20">
              {/* Format is fixed to whichever section the student came from —
                  no toggle here, so Individual never offers a Group option. */}
              <div className="rounded-xl border border-gold/20 bg-cream p-5">
                <p className="font-heading text-brown font-semibold">{activeFormat.title}</p>
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

                  {selectedFormat === "Group" && course.groupDetails && (
                    <dl className="mt-5 pt-5 border-t border-gold/15 grid grid-cols-2 gap-x-4 gap-y-5">
                      {groupFacts(course.groupDetails, isPakistan).map((fact) => (
                        <div key={fact.label}>
                          <dt className="font-sans text-xs uppercase tracking-[0.2em] text-gold-dark">
                            {fact.label}
                          </dt>
                          <dd className="font-heading text-brown text-xl font-semibold mt-1">
                            {fact.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
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
                className="w-full bg-gold hover:bg-gold-dark disabled:opacity-60 text-cream-light font-medium py-3 rounded-md transition-colors"
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
                  Something went wrong — please try again or message us on WhatsApp.
                </p>
              )}
            </form>
          ) : (
            // Days, fee and the student's details are all handled on the
            // enrollment page, so the course page just points there.
            <div className="mt-6 pt-6 border-t border-gold/20">
              <Link
                to={{
                  pathname: "/enroll",
                  search: new URLSearchParams({
                    course: course.id,
                    ...(selectedFormat ? { format: selectedFormat } : {}),
                  }).toString(),
                }}
                className="block w-full text-center bg-gold hover:bg-gold-dark text-cream-light font-medium py-3 rounded-md transition-colors"
              >
                Enroll in this course
              </Link>
              {isIndividual && (
                <p className="text-brown-light text-xs text-center mt-3">
                  You&apos;ll choose your days and see your fee on the next page. Your first class
                  is free.
                </p>
              )}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
