import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Check, Info } from "lucide-react";
import DaysPicker from "../components/DaysPicker";
import PhoneField from "../components/PhoneField";
import PickerRow from "../components/PickerRow";
import useCountry from "../hooks/useCountry";
import useDocumentMeta from "../hooks/useDocumentMeta";
import {
  COURSES,
  DAYS_OF_WEEK,
  FORMSPREE_ENDPOINT,
  LEARNING_FORMATS,
  PRICING,
  whatsappLink,
} from "../lib/constants";
import { WEEKDAYS, formatDuration, formatPrice, groupFacts, planPricing } from "../lib/pricing";

const GENDERS = ["Male", "Female"];
const FILLED_BY_OPTIONS = [
  { id: "parent", label: "I'm a parent", hint: "Enroll one or more children" },
  { id: "student", label: "I'm a student", hint: "Enroll myself" },
];
const MAX_CHILDREN = 6;
const STEPS = ["You & course", "Class format", "Schedule & fee", "Your details"];
const INPUT_CLASS =
  "mt-1 w-full rounded-lg border border-gold/30 bg-cream px-4 py-2.5 text-brown text-sm focus:outline-none focus:ring-2 focus:ring-gold/50";
const PRIMARY_BUTTON =
  "bg-gold hover:bg-gold-dark disabled:opacity-50 disabled:cursor-not-allowed text-cream-light font-medium px-6 py-3 rounded-md transition-colors";
const SECONDARY_BUTTON =
  "border border-gold-dark/50 text-brown hover:bg-cream font-medium px-6 py-3 rounded-md transition-colors";

const enrollableCourses = COURSES.filter((course) => !course.comingSoon);

// Links from the homepage Packages section (/enroll?plan=family&months=6) fill in
// the days, and for the family plan the parent and number of children.
const PLAN_PRESETS = {
  weekdays: { days: WEEKDAYS },
  weekend: { days: PRICING.weekendDays },
  family3: { days: WEEKDAYS, who: "parent", children: 3 },
  family4: { days: WEEKDAYS, who: "parent", children: 4 },
};

export default function EnrollPage() {
  const [searchParams] = useSearchParams();
  useDocumentMeta({
    title: "Enroll | Assiratul Mustaqeem Institute",
    description:
      "Enroll in Quran classes online: choose your course, pick your days and see your fee, then tell us about the student and guardian.",
  });

  // Anything in the link (from a course page, say) is used to pre-fill the
  // choices, but only values that really exist are accepted.
  const courseFromLink = enrollableCourses.find((c) => c.id === searchParams.get("course"));
  const formatFromLink = courseFromLink?.formats?.includes(searchParams.get("format"))
    ? searchParams.get("format")
    : null;
  const daysFromLink = [
    ...new Set((searchParams.get("days") || "").split(",").map((d) => d.trim())),
  ]
    .filter((d) => DAYS_OF_WEEK.includes(d))
    .slice(0, PRICING.maxDays);

  const preset = PLAN_PRESETS[searchParams.get("plan")] ?? null;
  const monthsFromLink = [3, 6].includes(Number(searchParams.get("months")))
    ? Number(searchParams.get("months"))
    : 1;

  return (
    <EnrollFlow
      initialCourseId={courseFromLink?.id ?? null}
      initialFormat={formatFromLink}
      initialDays={preset?.days ?? (formatFromLink === "Individual" ? daysFromLink : [])}
      presetDays={preset?.days ?? []}
      initialWho={preset?.who ?? ""}
      initialChildren={preset?.children ?? 1}
      initialMonths={preset ? monthsFromLink : 1}
    />
  );
}

function Field({ id, label, children }) {
  return (
    <div>
      <label htmlFor={id} className="text-xs text-brown-light font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}

// The questions asked about each student (a parent's child, or the student
// themselves). `prefix` makes the field names unique per child, e.g. child_2_name.
function StudentFields({ prefix, idPrefix, showNationality = true }) {
  return (
    <>
      <Field id={`${idPrefix}-name`} label="Full name">
        <input
          id={`${idPrefix}-name`}
          name={`${prefix}name`}
          type="text"
          required
          className={INPUT_CLASS}
        />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field id={`${idPrefix}-dob`} label="Date of birth">
          <input
            id={`${idPrefix}-dob`}
            name={`${prefix}dob`}
            type="date"
            required
            className={INPUT_CLASS}
          />
        </Field>
        <Field id={`${idPrefix}-gender`} label="Gender">
          <select
            id={`${idPrefix}-gender`}
            name={`${prefix}gender`}
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
        </Field>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {showNationality && (
          <Field id={`${idPrefix}-nationality`} label="Nationality">
            <input
              id={`${idPrefix}-nationality`}
              name={`${prefix}nationality`}
              type="text"
              required
              placeholder="e.g. Pakistani"
              className={INPUT_CLASS}
            />
          </Field>
        )}
        <Field id={`${idPrefix}-qualification`} label="Class or qualification">
          <input
            id={`${idPrefix}-qualification`}
            name={`${prefix}qualification`}
            type="text"
            required
            placeholder="e.g. Grade 8, High School, Bachelor's"
            className={INPUT_CLASS}
          />
        </Field>
      </div>
    </>
  );
}

function SectionTitle({ children }) {
  return (
    <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold-dark pt-2 border-t border-gold/20">
      {children}
    </p>
  );
}

function StepIndicator({ step, furthest, onGo }) {
  return (
    <ol className="flex items-center gap-2 sm:gap-3">
      {STEPS.map((label, index) => {
        const number = index + 1;
        const done = number < step;
        const current = number === step;
        const reachable = number <= furthest;
        return (
          <li key={label} className="flex items-center gap-2 sm:gap-3 flex-1 last:flex-none">
            <button
              type="button"
              disabled={!reachable || current}
              onClick={() => onGo(number)}
              aria-current={current ? "step" : undefined}
              className="flex items-center gap-2 text-left disabled:cursor-default"
            >
              <span
                className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-sm font-semibold border ${
                  current
                    ? "bg-gold text-cream-light border-gold"
                    : done
                      ? "bg-gold/20 text-gold-dark border-gold/40"
                      : "text-brown-light border-gold/30"
                }`}
              >
                {done ? <Check size={16} /> : number}
              </span>
              <span
                className={`hidden sm:block text-sm ${current ? "text-brown font-medium" : "text-brown-light"}`}
              >
                {label}
              </span>
            </button>
            {number < STEPS.length && <span className="h-px flex-1 bg-gold/30" />}
          </li>
        );
      })}
    </ol>
  );
}

function EnrollFlow({
  initialCourseId,
  initialFormat,
  initialDays,
  presetDays,
  initialWho,
  initialChildren,
  initialMonths,
}) {
  const [courseId, setCourseId] = useState(initialCourseId);
  const [format, setFormat] = useState(initialFormat);
  const [days, setDays] = useState(initialDays);
  const [language, setLanguage] = useState(null);
  const [planMonths, setPlanMonths] = useState(initialMonths);
  const [who, setWho] = useState(initialWho);
  const [status, setStatus] = useState("idle");

  const course = COURSES.find((c) => c.id === courseId) ?? null;
  const isIndividual = format === "Individual";
  const [childCount, setChildCount] = useState(initialChildren);
  const isParent = who === "parent";
  const formReady = who === "parent" || who === "student";

  // Group classes are for adults, so only a student enrolling themselves can pick them.
  const groupAllowed = who !== "parent";

  // Start at the first step that still needs an answer.
  const needsDays = isIndividual && days.length === 0;
  const startStep = !who || !course ? 1 : !format ? 2 : needsDays ? 3 : 4;
  const [step, setStep] = useState(startStep);
  const [furthest, setFurthest] = useState(startStep);

  const goTo = (next) => {
    setStep(next);
    setFurthest((current) => Math.max(current, next));
    window.scrollTo({ top: 0 });
  };

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

  // Pricing
  const region = isPakistan ? "PK" : "default";
  const weekdayRate = formatPrice(PRICING.perDay.weekday[region], isPakistan);
  const weekendRate = formatPrice(PRICING.perDay.weekend[region], isPakistan);
  const weekdays = WEEKDAYS;
  const groupDetails = course && !isIndividual ? course.groupDetails : undefined;
  const facts = groupDetails ? groupFacts(groupDetails, isPakistan) : [];
  const students = isParent ? childCount : 1;

  // One-to-one fees come from planPricing (it knows the family price for 3
  // children and the prepaid packages). A group fee is per student.
  const plan = isIndividual ? planPricing(days, isPakistan, students) : null;
  const perStudentAmount = isIndividual ? plan.monthlyEach : (groupDetails?.price[region] ?? null);
  const monthlyFee = perStudentAmount === null ? "" : formatPrice(perStudentAmount, isPakistan);
  const totalAmount = isIndividual
    ? plan.monthlyTotal
    : perStudentAmount === null
      ? null
      : perStudentAmount * students;
  const totalFee = totalAmount === null ? "" : formatPrice(totalAmount, isPakistan);

  // Prepaid 3- and 6-month packages exist for the full Mon-Fri and the Sat + Sun
  // plans. If the days change, the chosen package quietly falls back to monthly.
  const packages = plan?.packages ?? [];
  const activePackage = packages.find((pack) => pack.months === planMonths) ?? null;
  const packageTotal = activePackage ? formatPrice(activePackage.total, isPakistan) : "";
  const packageLabel = activePackage ? `${activePackage.months} months` : "";
  // What the student owes in one line, for the summary and the email to us.
  const feeLine = activePackage ? `${packageTotal} for ${packageLabel}` : `${totalFee} / month`;

  const chooseCourse = (id) => {
    if (id === courseId) return;
    const next = COURSES.find((c) => c.id === id);
    const nextFormat = next.formats?.length === 1 ? next.formats[0] : null;
    setCourseId(id);
    setLanguage(null);
    setDays(nextFormat === "Individual" ? presetDays : []);
    // A course with one format is pre-selected; otherwise the student picks.
    setFormat(nextFormat);
  };

  const chooseWho = (value) => {
    setWho(value);
    // A parent can't take a group class; drop a group choice made earlier.
    if (value === "parent" && format === "Group") {
      setFormat(null);
      setDays([]);
    }
  };

  const chooseFormat = (value) => {
    if (value !== format) setDays(value === "Individual" ? presetDays : []);
    setFormat(value);
  };

  const toggleDay = (day) =>
    setDays((current) =>
      current.includes(day) ? current.filter((d) => d !== day) : [...current, day],
    );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    const data = new FormData(event.target);
    data.set("course", course.title);
    data.set("filled_by", isParent ? "Parent" : "Student");
    data.delete("filled_by_choice");
    if (isIndividual) data.set("language", language ?? course.languages?.[0] ?? "");
    data.set("format", format);
    if (days.length) data.set("days", days.join(", "));
    if (monthlyFee) data.set("monthly_fee", `${monthlyFee} / month per student`);
    data.set(
      "billing_plan",
      `${activePackage ? `${packageLabel} prepaid` : "Monthly"}${plan?.family ? " (family package)" : ""}`,
    );
    data.set("total_to_pay", feeLine);
    if (isParent) {
      data.set("children_count", String(childCount));
      if (totalFee) data.set("total_monthly_fee", `${totalFee} / month`);
      // A parent's own name and number are the contact for the whole request.
      data.set("name", data.get("guardian"));
      data.set("phone", data.get("guardian_phone"));
    }
    if (facts.length) data.set("group_terms", facts.map((f) => `${f.label}: ${f.value}`).join("; "));
    data.set(
      "_subject",
      `Enrollment request: ${course.title}${isParent ? ` (${childCount} ${childCount > 1 ? "children" : "child"})` : ""}`,
    );

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      setStatus(response.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <main className="bg-cream pt-32 pb-24">
        <div className="max-w-xl mx-auto px-6 text-left">
          <div className="bg-cream-light rounded-2xl border border-gold/25 p-8 md:p-10">
            <span className="w-12 h-12 rounded-full bg-gold/20 text-gold-dark flex items-center justify-center">
              <Check size={24} />
            </span>
            <h1 className="font-heading text-brown text-3xl font-semibold mt-5">
              Enrollment request sent
            </h1>
            <p className="text-brown-light leading-relaxed mt-3">
              Thank you. We&apos;ll message you on WhatsApp shortly to confirm the details and agree
              your class times.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={whatsappLink("Assalamu alaikum, I just sent an enrollment request.")}
                target="_blank"
                rel="noreferrer"
                className={PRIMARY_BUTTON}
              >
                Message us on WhatsApp
              </a>
              <Link to="/" className={SECONDARY_BUTTON}>
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-cream pt-28 pb-20">
      <div className="max-w-2xl mx-auto px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-brown-light hover:text-brown"
        >
          <ArrowLeft size={16} /> Back to home
        </Link>

        <div className="bg-cream-light rounded-2xl border border-gold/25 p-6 sm:p-8 md:p-10 mt-6 text-left">
          <h1 className="font-heading text-brown text-3xl md:text-4xl font-semibold">Enroll</h1>
          <div className="mt-6">
            <StepIndicator step={step} furthest={furthest} onGo={goTo} />
          </div>

          {/* Step 1: course and format */}
          {step === 1 && (
            <section className="mt-8">
              <fieldset>
                <legend className="font-heading text-brown text-2xl font-semibold">
                  Who is enrolling?
                </legend>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {FILLED_BY_OPTIONS.map((option) => (
                    <label
                      key={option.id}
                      className={`cursor-pointer rounded-xl border px-4 py-3 transition-colors ${
                        who === option.id
                          ? "border-gold bg-gold/15"
                          : "border-gold/30 hover:border-gold"
                      }`}
                    >
                      <input
                        type="radio"
                        name="who_choice"
                        value={option.id}
                        checked={who === option.id}
                        onChange={() => chooseWho(option.id)}
                        className="sr-only"
                      />
                      <span className="block text-sm text-brown font-semibold">{option.label}</span>
                      <span className="block text-brown-light text-xs mt-0.5">{option.hint}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <h2 className="font-heading text-brown text-2xl font-semibold mt-10">
                Choose your course
              </h2>
              <div className="mt-4 space-y-3">
                {enrollableCourses.map((option) => (
                  <label
                    key={option.id}
                    className={`block cursor-pointer rounded-xl border p-4 transition-colors ${
                      courseId === option.id
                        ? "border-gold bg-gold/15"
                        : "border-gold/30 hover:border-gold"
                    }`}
                  >
                    <input
                      type="radio"
                      name="course_choice"
                      checked={courseId === option.id}
                      onChange={() => chooseCourse(option.id)}
                      className="sr-only"
                    />
                    <span className="block font-heading text-brown text-xl font-semibold">
                      {option.title}
                    </span>
                    <span className="block text-brown-light text-sm mt-0.5">{option.subtitle}</span>
                  </label>
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  disabled={!who || !course}
                  onClick={() => goTo(2)}
                  className={PRIMARY_BUTTON}
                >
                  Continue
                </button>
              </div>
            </section>
          )}

          {/* Step 2: class format, with the points of each format side by side */}
          {step === 2 && course && (
            <section className="mt-8">
              <h2 className="font-heading text-brown text-2xl font-semibold">Choose your class format</h2>
              <p className="text-brown-light text-sm mt-1">
                {course.formats.length > 1
                  ? `${course.title} is available in these formats.`
                  : `${course.title} is taught as ${course.formats[0].toLowerCase()} classes.`}
              </p>

              <div
                className={`mt-5 grid grid-cols-1 gap-4 ${course.formats.length > 1 ? "md:grid-cols-2" : ""}`}
              >
                {LEARNING_FORMATS.filter((item) =>
                  course.formats.some((f) => f.toLowerCase() === item.id),
                ).map((item) => {
                  const value = item.id === "group" ? "Group" : "Individual";
                  const locked = value === "Group" && !groupAllowed;
                  const selected = format === value;
                  return (
                    <label
                      key={item.id}
                      className={`block rounded-xl border p-5 transition-colors ${
                        locked
                          ? "border-gold/20 bg-cream/60 opacity-70 cursor-not-allowed"
                          : selected
                            ? "cursor-pointer border-gold bg-gold/15"
                            : "cursor-pointer border-gold/30 hover:border-gold"
                      }`}
                    >
                      <input
                        type="radio"
                        name="format_choice"
                        checked={selected}
                        disabled={locked}
                        onChange={() => chooseFormat(value)}
                        className="sr-only"
                      />
                      <span className="flex items-center justify-between gap-3">
                        <span className="font-heading text-brown text-xl font-semibold">
                          {item.title}
                        </span>
                        {selected && <Check size={18} className="text-gold-dark shrink-0" />}
                      </span>
                      {value === "Group" && (
                        <span className="block font-sans text-xs uppercase tracking-[0.15em] text-gold-dark mt-1">
                          Adults only
                        </span>
                      )}
                      <ul className="mt-3 space-y-2">
                        {item.points.map((point) => (
                          <li key={point} className="flex gap-2 text-brown text-sm">
                            <Check size={14} className="text-gold-dark shrink-0 mt-1" />
                            {point}
                          </li>
                        ))}
                      </ul>
                      {locked && (
                        <span className="block text-brown-light text-xs mt-3">
                          Group classes are for adults, and students enroll themselves. Go back and
                          choose &ldquo;I&apos;m a student&rdquo; if you are an adult joining a group.
                        </span>
                      )}
                    </label>
                  );
                })}
              </div>

              <div className="mt-8 flex justify-between gap-3">
                <button type="button" onClick={() => goTo(1)} className={SECONDARY_BUTTON}>
                  Back
                </button>
                <button
                  type="button"
                  disabled={!format}
                  onClick={() => goTo(3)}
                  className={PRIMARY_BUTTON}
                >
                  Continue
                </button>
              </div>
            </section>
          )}

          {/* Step 3: schedule and fee (Individual) or the fixed batch terms (Group) */}
          {step === 3 && course && (
            <section className="mt-8">
              {isIndividual ? (
                <>
                  <h2 className="font-heading text-brown text-2xl font-semibold">
                    Choose your days
                  </h2>
                  <p className="text-brown-light text-sm mt-1">
                    Pick up to {PRICING.maxDays} days a week. Your monthly fee depends on the days
                    you choose.
                  </p>

                  {isParent && (
                    <div className="mt-5">
                      <Field
                        id="children_count_select"
                        label="How many children do you want to enroll?"
                      >
                        <select
                          id="children_count_select"
                          value={childCount}
                          onChange={(event) => setChildCount(Number(event.target.value))}
                          className={INPUT_CLASS}
                        >
                          {Array.from({ length: MAX_CHILDREN }, (_, i) => i + 1).map((n) => (
                            <option key={n} value={n}>
                              {n}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <p className="text-brown-light text-xs mt-2">
                        {plan?.family
                          ? `Family package: ${childCount} children on Monday to Friday classes get one special price.`
                          : "Enrolling 3 or 4 children on Monday to Friday classes gets our family package price."}
                      </p>
                    </div>
                  )}

                  <div className="mt-5 flex gap-3 rounded-xl border border-gold/30 bg-cream px-4 py-3">
                    <Info className="text-gold-dark shrink-0 mt-0.5" size={18} />
                    <p className="text-brown text-sm leading-relaxed">
                      <strong className="font-semibold">Weekends are priced separately.</strong>{" "}
                      Weekday classes are {weekdayRate} a month for each day you choose; Saturday
                      and Sunday classes are {weekendRate} a month for each day.
                    </p>
                  </div>

                  <div className="mt-6 space-y-5">
                    <DaysPicker
                      label={`Weekdays · ${weekdayRate} / month per day`}
                      options={weekdays}
                      selected={days}
                      onToggle={toggleDay}
                      max={PRICING.maxDays}
                    />
                    <DaysPicker
                      label={`Weekend · ${weekendRate} / month per day`}
                      options={PRICING.weekendDays}
                      selected={days}
                      onToggle={toggleDay}
                      max={PRICING.maxDays}
                    />
                  </div>

                  <div className="mt-6 rounded-xl border border-gold/25 bg-cream px-5 py-4">
                    {days.length > 0 ? (
                      <>
                        <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold-dark">
                          {plan.family ? "Family package, monthly fee" : "Your monthly fee"}
                        </p>
                        <p className="mt-1">
                          <span className="font-heading text-brown text-4xl font-semibold">
                            {totalFee}
                          </span>
                          <span className="text-brown-light text-sm"> / month</span>
                        </p>
                        <p className="text-brown-light text-xs mt-2">
                          {students > 1 &&
                            (plan.family
                              ? `For all ${students} children. `
                              : `${monthlyFee} for each of ${students} children. `)}
                          {days.length} class{days.length > 1 ? "es" : ""} a week,{" "}
                          {PRICING.classMinutes} minutes each. Your first class is free.
                        </p>
                      </>
                    ) : (
                      <p className="text-brown-light text-sm">
                        Pick the days that suit you and your monthly fee will appear here.
                      </p>
                    )}
                  </div>
                  {packages.length > 0 && (
                    <fieldset className="mt-6">
                      <legend className="font-heading text-brown text-lg font-semibold">
                        Pay for more months and save
                      </legend>
                      <div className="mt-3 space-y-2">
                        {[{ months: 1, total: plan.monthlyTotal, percentOff: plan.monthlyPercentOff }, ...packages].map(
                          (option) => (
                            <label
                              key={option.months}
                              className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border px-4 py-3 transition-colors ${
                                (activePackage?.months ?? 1) === option.months
                                  ? "border-gold bg-gold/15"
                                  : "border-gold/30 hover:border-gold"
                              }`}
                            >
                              <input
                                type="radio"
                                name="billing_choice"
                                checked={(activePackage?.months ?? 1) === option.months}
                                onChange={() => setPlanMonths(option.months)}
                                className="sr-only"
                              />
                              <span>
                                <span className="block text-sm text-brown font-semibold">
                                  {option.months === 1
                                    ? "Pay monthly"
                                    : `${option.months} months in one payment`}
                                </span>
                                {option.percentOff > 0 && (
                                  <span className="block text-xs text-gold-dark">
                                    {option.percentOff}% off
                                  </span>
                                )}
                              </span>
                              <span className="text-right">
                                <span className="block font-heading text-brown text-xl font-semibold">
                                  {formatPrice(option.total, isPakistan)}
                                </span>
                                <span className="block text-xs text-brown-light">
                                  {option.months === 1 ? "/ month" : `for ${option.months} months`}
                                </span>
                              </span>
                            </label>
                          ),
                        )}
                      </div>
                    </fieldset>
                  )}
                  <p className="text-brown-light text-xs italic mt-3">
                    Class times are agreed with you on WhatsApp after you enroll.
                  </p>
                </>
              ) : (
                <>
                  <h2 className="font-heading text-brown text-2xl font-semibold">
                    Your group course
                  </h2>
                  {groupDetails ? (
                    <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-5 rounded-xl border border-gold/25 bg-cream px-5 py-5">
                      {facts.map((fact) => (
                        <div key={fact.label}>
                          <dt className="text-brown-light text-xs">{fact.label}</dt>
                          <dd className="font-heading text-brown text-lg font-semibold">
                            {fact.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <p className="text-brown-light text-sm mt-2">
                      Group classes run on a fixed schedule. We&apos;ll share the batch timings
                      with you after you enroll.
                    </p>
                  )}
                </>
              )}

              <div className="mt-8 flex justify-between gap-3">
                <button type="button" onClick={() => goTo(2)} className={SECONDARY_BUTTON}>
                  Back
                </button>
                <button
                  type="button"
                  disabled={isIndividual && days.length === 0}
                  onClick={() => goTo(4)}
                  className={PRIMARY_BUTTON}
                >
                  Continue
                </button>
              </div>
            </section>
          )}

          {/* Step 4: student and guardian details. Kept mounted (just hidden) so
              nothing typed is lost when going back to change the plan. */}
          {course && format && (
            <form
              onSubmit={handleSubmit}
              hidden={step !== 4}
              className="mt-8 space-y-5"
            >
              <div className="rounded-xl border border-gold/25 bg-cream px-5 py-4">
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold-dark">
                  Your enrollment
                </p>
                <p className="font-heading text-brown text-xl font-semibold mt-1">
                  {course.title} · {format}
                </p>
                <p className="text-brown-light text-sm mt-1">
                  {isIndividual
                    ? `${days.join(", ")} · ${feeLine}`
                    : groupDetails
                      ? `${formatDuration(groupDetails.durationMonths)} · ${groupDetails.daysPerWeek} days a week · ${monthlyFee} / month`
                      : "Fixed group schedule"}
                </p>
                {isParent && childCount > 1 && totalFee && (
                  <p className="text-brown text-sm font-medium mt-1">
                    {childCount} children{plan?.family ? ", family package" : ""}: {feeLine} in
                    total
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => goTo(3)}
                  className="text-gold-dark hover:text-gold underline underline-offset-2 text-xs mt-2"
                >
                  Change
                </button>
              </div>

              {formReady && (
                <>
                  {isIndividual && course.languages && (
                    <PickerRow
                      label="Choose your language"
                      options={course.languages}
                      selected={language ?? course.languages[0]}
                      onSelect={setLanguage}
                    />
                  )}

                  {isParent ? (
                    <>
                      <SectionTitle>Parent details</SectionTitle>
                      <Field id="guardian" label="Your full name">
                        <input
                          id="guardian"
                          name="guardian"
                          type="text"
                          required
                          className={INPUT_CLASS}
                        />
                      </Field>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <PhoneField
                          id="guardian_phone"
                          name="guardian_phone"
                          label="Your contact number (WhatsApp)"
                          required
                        />
                        <Field id="email" label="Your email">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className={INPUT_CLASS}
                          />
                        </Field>
                      </div>
                      <Field id="nationality" label="Your nationality">
                        <input
                          id="nationality"
                          name="nationality"
                          type="text"
                          required
                          placeholder="e.g. Pakistani"
                          className={INPUT_CLASS}
                        />
                      </Field>

                      <SectionTitle>Children</SectionTitle>
                      <p className="text-brown-light text-xs">
                        Enrolling {childCount} {childCount > 1 ? "children" : "child"}. To change
                        the number, go back to the days step.
                        {childCount > 1 &&
                          " The course and days you chose apply to each child. If your children need different days, tell us on WhatsApp and we'll arrange it."}
                      </p>

                      {Array.from({ length: childCount }, (_, index) => (
                        <div
                          key={index}
                          className="rounded-xl border border-gold/25 bg-cream p-4 sm:p-5 space-y-4"
                        >
                          <p className="font-heading text-brown text-lg font-semibold">
                            Child {index + 1}
                          </p>
                          <StudentFields
                            prefix={`child_${index + 1}_`}
                            idPrefix={`c${index + 1}`}
                            showNationality={false}
                          />
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      <SectionTitle>Student details</SectionTitle>
                      <StudentFields prefix="" idPrefix="s" />

                      <SectionTitle>Parent or guardian</SectionTitle>
                      <Field id="guardian" label="Guardian's full name">
                        <input
                          id="guardian"
                          name="guardian"
                          type="text"
                          required
                          className={INPUT_CLASS}
                        />
                      </Field>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <PhoneField
                          id="guardian_phone"
                          name="guardian_phone"
                          label="Guardian's contact number (WhatsApp)"
                          required
                        />
                        <Field id="guardian_email" label="Guardian's email">
                          <input
                            id="guardian_email"
                            name="guardian_email"
                            type="email"
                            required
                            className={INPUT_CLASS}
                          />
                        </Field>
                      </div>

                      <SectionTitle>Your contact details</SectionTitle>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Field id="email" label="Your email">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className={INPUT_CLASS}
                          />
                        </Field>
                        <PhoneField
                          id="phone"
                          name="phone"
                          label="Your phone / WhatsApp (optional)"
                        />
                      </div>
                    </>
                  )}

                  <SectionTitle>Location</SectionTitle>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field id="country" label="Country you live in">
                      <input
                        id="country"
                        name="country"
                        type="text"
                        required
                        value={country}
                        onChange={(event) => setCountryInput(event.target.value)}
                        className={INPUT_CLASS}
                      />
                    </Field>
                    <Field id="timezone" label="Time zone">
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
                    </Field>
                  </div>

                  <p className="text-brown-light text-xs italic">
                    We&apos;ll message you on WhatsApp to agree your class times.
                  </p>

                  <div className="flex justify-between gap-3">
                    <button type="button" onClick={() => goTo(3)} className={SECONDARY_BUTTON}>
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className={PRIMARY_BUTTON}
                    >
                      {status === "sending" ? "Sending…" : "Submit enrollment"}
                    </button>
                  </div>

                  {status === "error" && (
                    <p className="text-sm text-red-700">
                      Something went wrong — please try again or message us on WhatsApp.
                    </p>
                  )}
                </>
              )}
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
