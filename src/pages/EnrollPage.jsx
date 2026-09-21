import { useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { COURSES } from "../lib/constants";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mljrqnlb";
const GENDERS = ["Male", "Female"];

export default function EnrollPage() {
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

  const format = searchParams.get("format") || course.formats?.[0] || "";
  // Language only applies to Individual classes — Group runs on a fixed
  // schedule in one language, so don't fall back to a default for it.
  const language =
    format === "Individual" ? searchParams.get("language") || course.languages?.[0] || "" : "";

  return <EnrollForm course={course} language={language} format={format} />;
}

function EnrollForm({ course, language, format }) {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    const form = event.target;
    const data = new FormData(form);
    data.set("course", course.title);
    if (language) data.set("language", language);
    if (format) data.set("format", format);
    data.set("_subject", `Enrollment request: ${course.title}`);

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
      <div className="max-w-2xl mx-auto px-6">
        <Link
          to={`/courses/${course.id}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-brown-light hover:text-brown"
        >
          <ArrowLeft size={16} /> Back to {course.title}
        </Link>

        <div className="bg-cream-light rounded-2xl border border-gold/25 p-8 md:p-10 mt-6">
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-gold-dark">
            Enrollment
          </span>
          <h1 className="font-heading text-brown text-3xl font-semibold mt-2">{course.title}</h1>
          <p className="text-brown-light text-sm mt-1">
            {[language, format && `${format} classes`].filter(Boolean).join(" · ")}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="name" className="text-xs text-brown-light font-medium">
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 w-full rounded-lg border border-gold/30 bg-cream px-4 py-2.5 text-brown text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
              <div>
                <label htmlFor="phone" className="text-xs text-brown-light font-medium">
                  Phone / WhatsApp number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+92 300 1234567"
                  className="mt-1 w-full rounded-lg border border-gold/30 bg-cream px-4 py-2.5 text-brown text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="dob" className="text-xs text-brown-light font-medium">
                  Date of birth
                </label>
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  required
                  className="mt-1 w-full rounded-lg border border-gold/30 bg-cream px-4 py-2.5 text-brown text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
              </div>
              <div>
                <label htmlFor="nationality" className="text-xs text-brown-light font-medium">
                  Nationality
                </label>
                <input
                  id="nationality"
                  name="nationality"
                  type="text"
                  required
                  placeholder="e.g. Pakistani"
                  className="mt-1 w-full rounded-lg border border-gold/30 bg-cream px-4 py-2.5 text-brown text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
              </div>
            </div>

            <div>
              <label htmlFor="qualification" className="text-xs text-brown-light font-medium">
                Qualification
              </label>
              <input
                id="qualification"
                name="qualification"
                type="text"
                required
                placeholder="e.g. Bachelor's, High School, Grade 8"
                className="mt-1 w-full rounded-lg border border-gold/30 bg-cream px-4 py-2.5 text-brown text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
            </div>

            <div>
              <label htmlFor="gender" className="text-xs text-brown-light font-medium">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                required
                defaultValue=""
                className="mt-1 w-full rounded-lg border border-gold/30 bg-cream px-4 py-2.5 text-brown text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
              >
                <option value="" disabled>
                  Select gender
                </option>
                {GENDERS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-gold hover:bg-gold-dark disabled:opacity-60 text-cream-light font-medium py-3 rounded-full transition-colors"
            >
              {status === "sending" ? "Sending…" : "Submit Enrollment"}
            </button>

            {status === "success" && (
              <p className="text-sm text-gold-dark text-center">
                Request sent — we'll message you on WhatsApp shortly to confirm the details.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-700 text-center">
                Something went wrong — please try again or message us on WhatsApp from the Contact
                section.
              </p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
