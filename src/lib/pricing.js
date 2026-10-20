import { PRICING } from "./constants";

// Monthly fee, as a number, for a list of class days.
export function priceForDays(days, isPakistan) {
  const region = isPakistan ? "PK" : "default";
  return days.reduce((total, day) => {
    const rate = PRICING.weekendDays.includes(day) ? PRICING.perDay.weekend : PRICING.perDay.weekday;
    return total + rate[region];
  }, 0);
}

export function formatPrice(amount, isPakistan) {
  return isPakistan ? `${amount.toLocaleString("en-US")} PKR` : `$${amount}`;
}

function formatMinutes(minutes) {
  if (minutes % 60 !== 0) return `${minutes} minutes`;
  const hours = minutes / 60;
  return `${hours} hour${hours > 1 ? "s" : ""}`;
}

// "6 months", "1 year" — whole years read better than 12 months.
export function formatDuration(months) {
  if (months % 12 !== 0) return `${months} months`;
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
