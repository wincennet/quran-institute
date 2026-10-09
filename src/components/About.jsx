import { BookOpenCheck, CalendarCheck, Clock, Gift, HandCoins, HeartHandshake, MonitorSmartphone, Users } from "lucide-react";
import Reveal from "./Reveal";
import ScrollRow from "./ScrollRow";
import { FEATURES } from "../lib/constants";

// One icon per feature, in the same order as FEATURES.
const ICONS = [Gift, HandCoins, CalendarCheck, Users, BookOpenCheck, Clock, HeartHandshake, MonitorSmartphone];

// On a phone the first few points stack, then the rest sit in a sideways row so
// the section doesn't run on and on.
const STACKED_ON_PHONE = 2;

function FeatureCard({ feature, Icon, className = "" }) {
  return (
    <div
      className={`flex items-start gap-4 bg-cream-light rounded-xl border border-gold/20 p-4 text-left ${className}`}
    >
      <div className="w-11 h-11 shrink-0 rounded-full bg-gold/15 flex items-center justify-center">
        <Icon className="text-gold-dark" size={20} />
      </div>
      <div>
        <h3 className="font-heading text-brown text-lg font-semibold leading-snug">
          {feature.title}
        </h3>
        <p className="text-brown-light text-sm mt-1 leading-relaxed">{feature.description}</p>
      </div>
    </div>
  );
}

export default function About() {
  const cards = FEATURES.map((feature, i) => ({ feature, Icon: ICONS[i % ICONS.length] }));

  return (
    <section id="about" className="bg-cream py-24 kufic-pattern">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-left">
          <h2 className="font-heading text-brown text-4xl md:text-6xl font-medium leading-[1.1]">
            Why Choose Us
          </h2>
        </Reveal>

        {/* tablet and desktop: every point in a grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {cards.map(({ feature, Icon }, i) => (
            <Reveal key={feature.title} delay={i * 0.06}>
              <FeatureCard feature={feature} Icon={Icon} className="h-full" />
            </Reveal>
          ))}
        </div>

        {/* phone: first two stacked, the rest scroll sideways */}
        <div className="md:hidden mt-10">
          <div className="space-y-4">
            {cards.slice(0, STACKED_ON_PHONE).map(({ feature, Icon }) => (
              <FeatureCard key={feature.title} feature={feature} Icon={Icon} />
            ))}
          </div>
          <div className="mt-4 -mx-6 px-6">
            <ScrollRow>
              {cards.slice(STACKED_ON_PHONE).map(({ feature, Icon }) => (
                <FeatureCard
                  key={feature.title}
                  feature={feature}
                  Icon={Icon}
                  className="snap-start shrink-0 w-[80%]"
                />
              ))}
            </ScrollRow>
          </div>
        </div>
      </div>
    </section>
  );
}
