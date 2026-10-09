import { useState } from "react";
import useCountry from "../hooks/useCountry";
import { DEFAULT_DIAL_ISO, DIAL_CODES } from "../lib/dialCodes";

const INPUT_CLASS =
  "w-full rounded-lg border border-gold/30 bg-cream px-4 py-2.5 text-brown text-sm focus:outline-none focus:ring-2 focus:ring-gold/50";

// A phone number with a country-code picker. The code starts as the visitor's
// own country (from their location) and can be changed. The form receives one
// value under `name`, e.g. "+44 7700 900123".
export default function PhoneField({ id, name, label, required = false }) {
  const detected = useCountry();
  const [chosenIso, setChosenIso] = useState(null);
  const [number, setNumber] = useState("");

  const iso = chosenIso ?? (DIAL_CODES.some((c) => c.iso === detected) ? detected : DEFAULT_DIAL_ISO);
  const dial = DIAL_CODES.find((c) => c.iso === iso)?.dial ?? "";
  const trimmed = number.trim();

  return (
    <div>
      <label htmlFor={id} className="text-xs text-brown-light font-medium">
        {label}
      </label>
      <div className="mt-1 flex gap-2">
        <select
          aria-label="Country code"
          value={iso}
          onChange={(event) => setChosenIso(event.target.value)}
          className={`${INPUT_CLASS} !w-[8.5rem] shrink-0 px-2`}
        >
          {DIAL_CODES.map((country) => (
            <option key={country.iso} value={country.iso}>
              {`${country.iso} ${country.dial} · ${country.name}`}
            </option>
          ))}
        </select>
        <input
          id={id}
          type="tel"
          inputMode="tel"
          required={required}
          value={number}
          onChange={(event) => setNumber(event.target.value)}
          placeholder="300 1234567"
          className={INPUT_CLASS}
        />
      </div>
      <input type="hidden" name={name} value={trimmed ? `${dial} ${trimmed}` : ""} />
    </div>
  );
}
