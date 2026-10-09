import SectionTeaser from "./SectionTeaser";
import { MISSION_HEADING } from "../lib/constants";

export default function Mission() {
  return (
    <SectionTeaser
      id="mission"
      background="bg-cream"
      label="Our Mission"
      heading={MISSION_HEADING}
      to="/mission"
      linkText="Read our mission"
    >
      We don’t teach the Quran as only a book to read. We teach it as a way of life, through five
      rights it holds over every believer.
    </SectionTeaser>
  );
}
