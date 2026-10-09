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

// The headline facts of a fixed-term group course, ready to display.
export function groupFacts(details, isPakistan) {
  const fee = formatPrice(details.price[isPakistan ? "PK" : "default"], isPakistan);
  return [
    { label: "Duration", value: `${details.durationMonths} months` },
    { label: "Classes", value: `${details.daysPerWeek} days a week` },
    { label: "Class length", value: formatMinutes(details.classMinutes) },
    { label: "Monthly fee", value: `${fee} / month` },
  ];
}
