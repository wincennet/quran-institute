import { BookOpenCheck, CalendarCheck, HandCoins, Users } from "lucide-react";
import Reveal from "./Reveal";
import Counter from "./Counter";
import { FEATURES, STATS } from "../lib/constants";

const ICONS = [HandCoins, CalendarCheck, Users, BookOpenCheck];

// Repeating eight-pointed-star tile, drawn in a slightly lighter brown than the
// section background so it reads as a texture, not a pattern.
const PATTERN_TILE = "data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2264%22%20height=%2264%22%20viewBox=%220%200%2064%2064%22%20fill=%22none%22%20stroke=%22%23524437%22%20stroke-width=%221.2%22%3E%3Crect%20x=%2218%22%20y=%2218%22%20width=%2228%22%20height=%2228%22/%3E%3Cpolygon%20points=%2232%2C12.2%2051.8%2C32%2032%2C51.8%2012.2%2C32%22/%3E%3Ccircle%20cx=%2232%22%20cy=%2232%22%20r=%225%22/%3E%3Cpolygon%20points=%220%2C-7%207%2C0%200%2C7%20-7%2C0%22/%3E%3Cpolygon%20points=%2264%2C-7%2071%2C0%2064%2C7%2057%2C0%22/%3E%3Cpolygon%20points=%220%2C57%207%2C64%200%2C71%20-7%2C64%22/%3E%3Cpolygon%20points=%2264%2C57%2071%2C64%2064%2C71%2057%2C64%22/%3E%3C/svg%3E";

export default function About() {
  return (
    <section
      id="about"
      className="bg-[#352b23] py-24"
      style={{ backgroundImage: `url("${PATTERN_TILE}")`, backgroundSize: "64px 64px" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="font-sans text-gold text-sm uppercase tracking-[0.25em]">
            Why Choose Us
          </span>
        </Reveal>

        <div className="grid grid-cols-2 gap-8 mt-10 max-w-xs sm:max-w-sm mx-auto text-center">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <p className="font-heading text-gold text-4xl md:text-5xl font-semibold">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-cream/75 text-sm mt-2">{stat.label}</p>
            </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {FEATURES.map((feature, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal
                key={feature.title}
                delay={i * 0.08}
                className="bg-cream rounded-2xl border border-gold/20 p-6 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto">
                  <Icon className="text-gold-dark" size={22} />
                </div>
                <h3 className="font-heading text-brown text-lg font-semibold mt-4">
                  {feature.title}
                </h3>
                <p className="text-brown-light text-sm mt-2 leading-relaxed">
                  {feature.description}
                </p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
