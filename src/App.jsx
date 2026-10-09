import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import EmailPopup from "./components/EmailPopup";
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";
import EnrollPage from "./pages/EnrollPage";
import StoryPage from "./pages/StoryPage";
import MissionPage from "./pages/MissionPage";

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/who-we-are" element={<StoryPage />} />
        <Route path="/mission" element={<MissionPage />} />
        <Route path="/courses/:id" element={<CoursePage />} />
        <Route path="/courses/:id/enroll" element={<EnrollPage />} />
      </Routes>
      <Footer />
      <EmailPopup />
    </>
  );
}

export default App;
