import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// react-router doesn't scroll on navigation by itself — without this, going
// from a scrolled-down Courses section to a course page would land mid-page.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return; // let in-page anchors (e.g. /#contact) do their own thing
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
