import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import ScrollRow from "./ScrollRow";
import useCountry from "../hooks/useCountry";
import { PRICING } from "../lib/constants";
import { WEEKDAYS, formatPrice, planPricing } from "../lib/pricing";

// The one-to-one packages: each card lists the monthly price and the 3- and
// 6-month prepaid prices (with the percent saved). Every price row opens the
// enrollment page with that plan already filled in. All the numbers come from
// PRICING in src/lib/constants.js, so changing a price there updates this section.
// The cards are the same size as the course cards and sit in the same swipe row.
const PACKAGES = [
  {
    id: "weekdays",
    title: "Weekday package",
    tag: null,
    summary: "One student · Monday to Friday",
    detail: `5 classes a week, ${PRICING.classMinutes} minutes each`,
    days: WEEKDAYS,
    students: 1,
  },
  ...PRICING.families.map((family) => ({
    id: `family${family.children}`,
    title: `${family.children} children package`,
    tag: null,
    summary: `${family.children} children · Monday to Friday`,
    detail: `One price for all ${family.children} children, 5 classes a week each`,
    days: WEEKDAYS,
    students: family.children,
  })),
  {
    id: "weekend",
    title: "Weekend package",
    tag: null,
    summary: "One student · Saturday and Sunday",
    detail: `2 classes a week, ${PRICING.classMinutes} minutes each`,
    days: PRICING.weekendDays,
    students: 1,
  },
];

export default function Packages() {
  const isPakistan = useCountry() === "PK";

  return (
    <section id="packages" className="bg-cream-light py-24">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-left max-w-2xl">
          <span className="font-sans text-gold-dark text-sm uppercase tracking-[0.25em]">
            Packages
          </span>
          <h2 className="font-heading text-brown text-3xl md:text-4xl font-medium mt-3">
            One-to-one packages that fit your family
          </h2>
          <p className="text-brown-light text-sm mt-3">
            Pay monthly, or pay for 3 or 6 months at once and save. Your first class is free.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <ScrollRow>
            {PACKAGES.map((pack) => {
              const plan = planPricing(pack.days, isPakistan, pack.students);
              const rows = [
                {
                  months: 1,
                  label: "Monthly",
                  total: plan.monthlyTotal,
                  unit: "/ month",
                  off: plan.monthlyPercentOff,
                },
                ...plan.packages.map((option) => ({
                  months: option.months,
                  label: `${option.months} months`,
                  total: option.total,
                  unit: `for ${option.months} months`,
                  off: option.percentOff,
                })),
              ];
              return (
                <div
                  key={pack.id}
                  className={`snap-start shrink-0 w-[82%] sm:w-[22rem] flex flex-col rounded-2xl border bg-cream p-6 shadow-sm ${
                    pack.tag ? "border-gold" : "border-gold/25"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-sans text-xs uppercase tracking-[0.2em] text-gold-dark">
                      Package
                    </span>
                    {pack.tag && (
                      <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-brown bg-gold/20 border border-gold/40 rounded-full px-3 py-1">
                        {pack.tag}
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading text-brown text-2xl font-semibold mt-2">
                    {pack.title}
                  </h3>
                  <p className="text-brown-light text-sm mt-1">{pack.summary}</p>
                  <p className="text-brown-light text-xs mt-1">{pack.detail}</p>

                  <ul className="mt-4 space-y-1.5">
                    {rows.map((row) => (
                      <li key={row.months}>
                        <Link
                          to={{
                            pathname: "/enroll",
                            search: new URLSearchParams({
                              plan: pack.id,
                              ...(row.months > 1 ? { months: String(row.months) } : {}),
                            }).toString(),
                          }}
                          className="group flex items-center justify-between gap-3 rounded-lg border border-gold/30 bg-cream-light px-3.5 py-2 transition-colors hover:border-gold hover:bg-gold/10"
                        >
                          <span className="flex items-baseline gap-2">
                            <span className="text-sm font-semibold text-brown">{row.label}</span>
                            {row.off > 0 && (
                              <span className="text-xs text-gold-dark">{row.off}% off</span>
                            )}
                          </span>
                          <span className="flex items-center gap-2">
                            <span className="text-right leading-tight">
                              <span className="block font-heading text-brown text-lg font-semibold">
                                {formatPrice(row.total, isPakistan)}
                              </span>
                              <span className="block text-[11px] text-brown-light">{row.unit}</span>
                            </span>
                            <ArrowRight
                              size={14}
                              className="text-gold-dark transition-transform group-hover:translate-x-0.5"
                            />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </ScrollRow>
          <p className="text-brown-light text-xs mt-6">
            Want a different mix of days? Choose your own days when you enroll, and the monthly
            fee adjusts to match.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
