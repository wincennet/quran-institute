import { DAYS_OF_WEEK, PRICING } from "./constants";

// Monthly fee, as a number, for a list of class days.
export function priceForDays(days, isPakistan) {
  const region = isPakistan ? "PK" : "default";
  return days.reduce((total, day) => {
    const rate = PRICING.weekendDays.includes(day) ? PRICING.perDay.weekend : PRICING.perDay.weekday;
    return total + rate[region];
  }, 0);
}

export function formatPrice(amount, isPakistan) {
  return isPakistan ? `${amount.toLocaleString("en-US")} PKR` : `$${amount.toLocaleString("en-US")}`;
}

export const WEEKDAYS = DAYS_OF_WEEK.filter((day) => !PRICING.weekendDays.includes(day));

// Which ready-made plan a list of days is: the full Mon-Fri week, exactly Sat +
// Sun, or neither (a custom mix of days, which has no prepaid packages).
function planKind(days) {
  const has = (list) => days.length === list.length && list.every((day) => days.includes(day));
  if (has(WEEKDAYS)) return "weekdays";
  if (has(PRICING.weekendDays)) return "weekend";
  return null;
}

// Everything the fee box needs for one-to-one classes, as numbers for the whole
// request (all `students` together):
//   monthlyTotal  the monthly fee (the family price when 3 children are on Mon-Fri)
//   monthlyEach   the monthly fee for one student, before any family price
//   family        true when the family price applies
//   monthlyPercentOff  percent the monthly fee is below the regular price (only
//                 the family price is; otherwise 0)
//   packages      the prepaid 3/6-month options, each with its total and the
//                 percent saved against the regular price (each student paying
//                 the normal monthly fee) for the same months
export function planPricing(days, isPakistan, students = 1) {
  const region = isPakistan ? "PK" : "default";
  const kind = planKind(days);
  const monthlyEach = priceForDays(days, isPakistan);
  const familyPlan =
    kind === "weekdays" ? PRICING.families.find((f) => f.children === students) : undefined;
  const family = Boolean(familyPlan);
  const regularMonthly = monthlyEach * students;
  const monthlyTotal = family ? familyPlan.monthly[region] : regularMonthly;
  const percentBelow = (regular, actual) =>
    regular > 0 ? Math.round(((regular - actual) / regular) * 100) : 0;

  let source = [];
  if (family) source = familyPlan.packages;
  else if (kind === "weekdays") source = PRICING.packages;
  else if (kind === "weekend") source = PRICING.weekendPackages;

  const packages = source.map((pack) => {
    const total = family ? pack.price[region] : pack.price[region] * students;
    const usual = regularMonthly * pack.months;
    return { months: pack.months, total, usual, percentOff: percentBelow(usual, total) };
  });
  return {
    kind,
    family,
    monthlyTotal,
    monthlyEach,
    monthlyPercentOff: percentBelow(regularMonthly, monthlyTotal),
    packages,
  };
}

function formatMinutes(minutes) {
  if (minutes % 60 !== 0) return `${minutes} minutes`;
  const hours = minutes / 60;
  return `${hours} hour${hours > 1 ? "s" : ""}`;
}

// "6 months", "1 year", "1.5 years" — years read better than 12 or 18 months.
export function formatDuration(months) {
  if (months < 12 || months % 6 !== 0) return `${months} months`;
  const years = months / 12;
  return `${years} year${years > 1 ? "s" : ""}`;
}

// The headline facts of a fixed-term group course, ready to display.
export function groupFacts(details, isPakistan) {
  const fee = formatPrice(details.price[isPakistan ? "PK" : "default"], isPakistan);
  return [
    { label: "Duration", value: formatDuration(details.durationMonths) },
    { label: "Classes", value: `${details.daysPerWeek} days a week` },
    { label: "Class length", value: formatMinutes(details.classMinutes) },
    { label: "Monthly fee", value: `${fee} / month` },
  ];
}
