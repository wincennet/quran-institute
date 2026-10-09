import { BookOpenCheck, CalendarCheck, Clock, Gift, HandCoins, HeartHandshake, MonitorSmartphone, Users } from "lucide-react";
import Reveal from "./Reveal";
import { FEATURES } from "../lib/constants";

// One icon per feature, in the same order as FEATURES.
const ICONS = [Gift, HandCoins, CalendarCheck, Users, BookOpenCheck, Clock, HeartHandshake, MonitorSmartphone];


export default function About() {
  return (
    <section id="about" className="bg-cream py-24 kufic-pattern">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-left">
          <h2 className="font-heading text-brown text-4xl md:text-6xl font-medium leading-[1.1]">
            Why Choose Us
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {FEATURES.map((feature, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal
                key={feature.title}
                delay={i * 0.06}
                className="flex items-start gap-4 bg-cream-light rounded-xl border border-gold/20 p-4 text-left"
              >
                <div className="w-11 h-11 shrink-0 rounded-full bg-gold/15 flex items-center justify-center">
                  <Icon className="text-gold-dark" size={20} />
                </div>
                <div>
                  <h3 className="font-heading text-brown text-lg font-semibold leading-snug">
                    {feature.title}
                  </h3>
                  <p className="text-brown-light text-sm mt-1 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
