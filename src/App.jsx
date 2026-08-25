import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Courses from "./components/Courses";
import HowItWorks from "./components/HowItWorks";
import GlobalReach from "./components/GlobalReach";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Courses />
        <HowItWorks />
        <GlobalReach />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
