import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import EmailPopup from "./components/EmailPopup";
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";
import EnrollPage from "./pages/EnrollPage";
import LegacyEnrollRedirect from "./pages/LegacyEnrollRedirect";
import AboutFlowPage from "./pages/AboutFlowPage";

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/who-we-are" element={<AboutFlowPage start="story" />} />
        <Route path="/mission" element={<AboutFlowPage start="mission" />} />
        <Route path="/courses/:id" element={<CoursePage />} />
        <Route path="/enroll" element={<EnrollPage />} />
        <Route path="/courses/:id/enroll" element={<LegacyEnrollRedirect />} />
      </Routes>
      <Footer />
      <EmailPopup />
    </>
  );
}

export default App;
