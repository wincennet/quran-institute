import { useMemo, useState } from "react";
import { Link, Navigate, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PickerRow from "../components/PickerRow";
import useCountry from "../hooks/useCountry";
import { COURSES, DAYS_OF_WEEK, PRICING } from "../lib/constants";
import { formatPrice, priceForDays } from "../lib/pricing";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mljrqnlb";
const GENDERS = ["Male", "Female"];
const FILLED_BY_OPTIONS = [
  { id: "parent", label: "I'm a parent or guardian" },
  { id: "adult", label: "I'm an adult student (18+)" },
  { id: "minor", label: "I'm a student under 18" },
];
const INPUT_CLASS =
  "mt-1 w-full rounded-lg border border-gold/30 bg-cream px-4 py-2.5 text-brown text-sm focus:outline-none focus:ring-2 focus:ring-gold/50";

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
  const isIndividual = format === "Individual";

  // Only real weekday names, no duplicates, and never more than the weekly cap,
  // so a hand-edited link can't produce a nonsense fee.
  const days = isIndividual
    ? [...new Set((searchParams.get("days") || "").split(",").map((d) => d.trim()))]
        .filter((d) => DAYS_OF_WEEK.includes(d))
        .slice(0, PRICING.maxDays)
    : [];

  // Individual students choose their days (and see their fee) on the course
  // page first; anyone who lands here without days is sent there.
  if (isIndividual && days.length === 0) {
    return (
      <Navigate to={{ pathname: `/courses/${course.id}`, search: "?format=Individual" }} replace />
    );
  }

  return <EnrollForm course={course} format={format} days={days} />;
}

function EnrollForm({ course, format, days }) {
  const [status, setStatus] = useState("idle");
  const isIndividual = format === "Individual";
  const [language, setLanguage] = useState(course.languages?.[0] ?? null);
  const [who, setWho] = useState("");
  const isParent = who === "parent";
  // Under-18 students are asked to get a parent to fill the form, so the rest
  // of the form only opens for a parent/guardian or an adult student.
  const formReady = who === "parent" || who === "adult";

  // Country and time zone are pre-filled from the visitor's location and
  // browser, and stay editable.
  const detectedCountry = useCountry();
  const isPakistan = detectedCountry === "PK";
  const detectedCountryName = useMemo(() => {
    if (!detectedCountry) return "";
    try {
      return new Intl.DisplayNames(["en"], { type: "region" }).of(detectedCountry) ?? "";
    } catch {
      return "";
    }
  }, [detectedCountry]);
  const detectedTimeZone = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    } catch {
      return "";
    }
  }, []);
  const [countryInput, setCountryInput] = useState(null);
  const [timeZoneInput, setTimeZoneInput] = useState(null);
  const country = countryInput ?? detectedCountryName;
  const timeZone = timeZoneInput ?? detectedTimeZone;

  const monthlyFee = isIndividual ? formatPrice(priceForDays(days, isPakistan), isPakistan) : "";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    const form = event.target;
    const data = new FormData(form);
    data.set("course", course.title);
    data.set("filled_by", FILLED_BY_OPTIONS.find((option) => option.id === who)?.label ?? who);
    data.delete("filled_by_choice");
    if (isIndividual && language) data.set("language", language);
    if (format) data.set("format", format);
    if (days.length) data.set("days", days.join(", "));
    if (monthlyFee) data.set("monthly_fee", `${monthlyFee} / month`);
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
          to={{
            pathname: `/courses/${course.id}`,
            search: format ? `?format=${encodeURIComponent(format)}` : "",
          }}
          className="inline-flex items-center gap-2 text-sm font-medium text-brown-light hover:text-brown"
        >
          <ArrowLeft size={16} /> Back to {course.title}
        </Link>

        <div className="bg-cream-light rounded-2xl border border-gold/25 p-8 md:p-10 mt-6">
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-gold-dark">
            Enrollment
          </span>
          <h1 className="font-heading text-brown text-3xl font-semibold mt-2">{course.title}</h1>
          <p className="text-brown-light text-sm mt-1">{format && `${format} classes`}</p>

          {isIndividual && (
            <div className="mt-6 rounded-xl border border-gold/25 bg-cream px-5 py-4">
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold-dark">
                Your plan
              </p>
              <p className="text-brown text-sm mt-2">{days.join(", ")}</p>
              <p className="mt-1">
                <span className="font-heading text-brown text-3xl font-semibold">
                  {monthlyFee}
                </span>
                <span className="text-brown-light text-sm"> / month</span>
              </p>
              <p className="text-brown-light text-xs mt-2">
                {days.length} class{days.length > 1 ? "es" : ""} a week,{" "}
                {PRICING.classMinutes} minutes each. Your first class is free.{" "}
                <Link
                  to={{ pathname: `/courses/${course.id}`, search: "?format=Individual" }}
                  className="text-gold-dark hover:text-gold underline underline-offset-2"
                >
                  Change days
                </Link>
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <fieldset>
              <legend className="font-sans text-xs uppercase tracking-[0.2em] text-gold-dark">
                Who is filling out this form?
              </legend>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {FILLED_BY_OPTIONS.map((option) => (
                  <label
                    key={option.id}
                    className={`cursor-pointer rounded-xl border px-4 py-3 text-sm leading-snug transition-colors ${
                      who === option.id
                        ? "border-gold bg-gold/15 text-brown font-medium"
                        : "border-gold/30 text-brown-light hover:border-gold"
                    }`}
                  >
                    <input
                      type="radio"
                      name="filled_by_choice"
                      value={option.id}
                      checked={who === option.id}
                      onChange={() => setWho(option.id)}
                      required
                      className="sr-only"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </fieldset>

            {who === "minor" && (
              <p className="rounded-xl border border-gold/30 bg-cream px-4 py-3 text-brown text-sm leading-relaxed">
                Students under 18 need a parent or guardian to fill out this form. Please ask
                them to complete it for you, and choose &ldquo;I&apos;m a parent or
                guardian&rdquo; above.
              </p>
            )}

            {formReady && isIndividual && course.languages && (
              <PickerRow
                label="Choose your language"
                options={course.languages}
                selected={language}
                onSelect={setLanguage}
              />
            )}

            {formReady && (
              <>
            <div>
              <label htmlFor="name" className="text-xs text-brown-light font-medium">
                {isParent ? "Child's full name" : "Your full name"}
              </label>
              <input id="name" name="name" type="text" required className={INPUT_CLASS} />
            </div>

            {isParent && (
              <div>
                <label htmlFor="guardian" className="text-xs text-brown-light font-medium">
                  Parent or guardian name
                </label>
                <input id="guardian" name="guardian" type="text" required className={INPUT_CLASS} />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="email" className="text-xs text-brown-light font-medium">
                  {isParent ? "Parent or guardian email" : "Email"}
                </label>
                <input id="email" name="email" type="email" required className={INPUT_CLASS} />
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
                  className={INPUT_CLASS}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="country" className="text-xs text-brown-light font-medium">
                  Country you live in
                </label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  required
                  value={country}
                  onChange={(event) => setCountryInput(event.target.value)}
                  className={INPUT_CLASS}
                />
              </div>
              <div>
                <label htmlFor="timezone" className="text-xs text-brown-light font-medium">
                  Time zone
                </label>
                <input
                  id="timezone"
                  name="timezone"
                  type="text"
                  required
                  value={timeZone}
                  onChange={(event) => setTimeZoneInput(event.target.value)}
                  placeholder="e.g. London (GMT+1)"
                  className={INPUT_CLASS}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="dob" className="text-xs text-brown-light font-medium">
                  {isParent ? "Child's date of birth" : "Date of birth"}
                </label>
                <input id="dob" name="dob" type="date" required className={INPUT_CLASS} />
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
                  className={INPUT_CLASS}
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
                className={INPUT_CLASS}
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
                className={INPUT_CLASS}
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

            <p className="text-brown-light text-xs italic">
              We&apos;ll message you on WhatsApp to agree your class times.
            </p>

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
              </>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
