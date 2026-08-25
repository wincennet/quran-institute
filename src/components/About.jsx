import { BookOpenCheck, CalendarCheck, HandCoins, Users } from "lucide-react";
import Reveal from "./Reveal";
import Counter from "./Counter";
import { FEATURES, STATS } from "../lib/constants";

const ICONS = [HandCoins, CalendarCheck, Users, BookOpenCheck];

export default function About() {
  return (
    <section id="about" className="bg-cream-light py-24">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="font-sans text-gold-dark text-sm uppercase tracking-[0.25em]">
            Why Choose Us
          </span>
          <h2 className="font-heading text-brown text-3xl md:text-4xl font-medium mt-3">
            13 years teaching students in 45+ countries
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-14 max-w-2xl mx-auto text-center">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <p className="font-heading text-gold text-4xl md:text-5xl font-semibold">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-brown-light text-sm mt-2">{stat.label}</p>
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
