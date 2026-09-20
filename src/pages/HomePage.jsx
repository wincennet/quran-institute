import Hero from "../components/Hero";
import About from "../components/About";
import Courses from "../components/Courses";
import GlobalReach from "../components/GlobalReach";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";

// HowItWorks and LearningFormats are parked, not deleted — HowItWorks is
// coming back later, and LearningFormats' picker now lives on each
// course's own page instead of its own section.
export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Courses />
      <GlobalReach />
      <Testimonials />
      <Contact />
    </main>
  );
}
