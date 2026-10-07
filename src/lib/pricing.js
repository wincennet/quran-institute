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
