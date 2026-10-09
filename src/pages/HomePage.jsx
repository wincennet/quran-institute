import Hero from "../components/Hero";
import WhoWeAre from "../components/WhoWeAre";
import About from "../components/About";
import LearningFormats from "../components/LearningFormats";
import Courses from "../components/Courses";
import GlobalReach from "../components/GlobalReach";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import WhatsAppButton from "../components/WhatsAppButton";

// HowItWorks is parked, not deleted — it's coming back later.
export default function HomePage() {
  return (
    <main>
      <Hero />
      <WhoWeAre />
      <Courses />
      <LearningFormats />
      <GlobalReach />
      <About />
      <Testimonials />
      <Contact />
      <WhatsAppButton />
    </main>
  );
}
