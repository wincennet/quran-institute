import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

// A short, left-aligned homepage section: label, big heading, a few lines and a
// link through to the full page.
export default function SectionTeaser({ id, background, label, heading, children, to, linkText, extra }) {
  return (
    <section id={id} className={`${background} py-20 md:py-24`}>
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="max-w-3xl text-left">
          <span className="font-sans text-gold-dark text-sm uppercase tracking-[0.25em]">
            {label}
          </span>
          <h2 className="font-heading text-brown text-4xl md:text-6xl font-medium leading-[1.1] mt-3">
            {heading}
          </h2>
          <p className="text-brown-light text-base md:text-lg leading-relaxed mt-6 max-w-2xl">
            {children}
          </p>
          <Link
            to={to}
            className="group inline-flex items-center gap-2 mt-8 font-medium text-gold-dark hover:text-brown transition-colors"
          >
            {linkText}
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
          {extra}
        </Reveal>
      </div>
    </section>
  );
}
