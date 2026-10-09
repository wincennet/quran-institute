import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionTeaser from "./SectionTeaser";
import { MISSION_HEADING } from "../lib/constants";

export default function WhoWeAre() {
  return (
    <SectionTeaser
      id="who-we-are"
      background="bg-cream-light"
      label="Our Story"
      heading="Who We Are"
      to="/who-we-are"
      linkText="Read our story"
      extra={
        <div className="mt-12">
          <p className="font-cinzel font-semibold text-brown text-base md:text-lg leading-relaxed max-w-2xl">
            {MISSION_HEADING}
          </p>
          <p className="text-brown-light text-base md:text-lg leading-relaxed mt-3 max-w-2xl">
            We don’t teach the Quran as only a book to read. We teach it as a way of life, through
            five rights it holds over every believer.
          </p>
          <Link
            to="/mission"
            className="group inline-flex items-center gap-2 mt-4 font-light underline underline-offset-4 text-gold-dark hover:text-brown transition-colors"
          >
            Read our mission
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      }
    >
      Assiratul Mustaqeem Institute began at home, with a family that loved Deen-e-Islam. Today
      that family tradition has grown into a proper institute.
    </SectionTeaser>
  );
}
