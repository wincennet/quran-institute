import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Courses from "./components/Courses";
import GlobalReach from "./components/GlobalReach";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// HowItWorks and LearningFormats are parked, not deleted — HowItWorks is
// coming back later, and LearningFormats' picker now lives inside each
// CourseCard instead of its own section.
function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Courses />
        <GlobalReach />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
