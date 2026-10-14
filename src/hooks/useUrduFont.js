import { useEffect } from "react";

const FONT_URL =
  "https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;500;600;700&display=swap";

// Urdu is written in Nastaliq, which the site's other fonts do not have. The font
// is fairly large, so it is only requested on pages that actually show Urdu text.
export default function useUrduFont(enabled) {
  useEffect(() => {
    if (!enabled || document.querySelector(`link[href="${FONT_URL}"]`)) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONT_URL;
    document.head.appendChild(link);
  }, [enabled]);
}
