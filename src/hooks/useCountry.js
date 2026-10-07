import { useEffect, useState } from "react";

let countryRequest;

// One request per page load, shared by every component that asks. Resolves to
// a 2-letter country code, or null when it can't be determined (local
// `vite dev` has no /api, so it returns HTML and the JSON parse fails).
function fetchCountry() {
  if (!countryRequest) {
    const override = new URLSearchParams(window.location.search).get("country");
    const url = override ? `/api/country?country=${encodeURIComponent(override)}` : "/api/country";

    countryRequest = fetch(url)
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => data?.country ?? null)
      .catch(() => null);
  }
  return countryRequest;
}

export default function useCountry() {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    let active = true;
    fetchCountry().then((code) => {
      if (active) setCountry(code);
    });
    return () => {
      active = false;
    };
  }, []);

  return country;
}
