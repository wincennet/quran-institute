import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import useCountry from "../hooks/useCountry";
import { whatsappLink } from "../lib/constants";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mljrqnlb";

const INPUT_CLASS =
  "mt-1 w-full rounded-lg border border-gold/30 bg-cream px-4 py-2.5 text-brown text-sm focus:outline-none focus:ring-2 focus:ring-gold/50";

const ROLES = [
  { id: "Parent", label: "Parent" },
  { id: "Student", label: "Student" },
];

function countryName(code) {
  if (!code) return "";
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code) ?? "";
  } catch {
    return "";
  }
}

// Sits inside the Testimonials section (no popup). Reviews are not published
// automatically: each one is emailed to us through the same Formspree form as
// enrollments, with its own subject line, and goes on the site only after we have
// read it and the sender has agreed to it being shown.
export default function ReviewForm({ onClose }) {
  const detected = countryName(useCountry());
  const [role, setRole] = useState("Parent");
  const [country, setCountry] = useState(null);
  const [status, setStatus] = useState("idle");
  const panel = useRef(null);
  const nameInput = useRef(null);

  // Bring the form into view and ready to type when it opens.
  useEffect(() => {
    panel.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    nameInput.current?.focus({ preventScroll: true });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    const data = new FormData(event.target);
    data.set("reviewer_role", role);
    data.set("_subject", `New review to approve (${role})`);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      setStatus(response.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      ref={panel}
      className="max-w-xl mx-auto text-left bg-cream-light border border-gold/25 rounded-2xl p-6 md:p-8"
    >
      {status === "success" ? (
        <div>
          <span className="w-12 h-12 rounded-full bg-gold/20 text-gold-dark flex items-center justify-center">
            <Check size={24} />
          </span>
          <h3 className="font-heading text-brown text-2xl font-semibold mt-5">
            Jazakallahu khairan
          </h3>
          <p className="text-brown-light text-sm leading-relaxed mt-3">
            Your review has reached us. We read every one, and it will appear on this page once we
            have checked it, insha&apos;Allah.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-6 bg-gold hover:bg-gold-dark text-cream-light font-medium px-6 py-2.5 rounded-md transition-colors"
          >
            Close
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="font-heading text-brown text-2xl font-semibold leading-snug">
            Share your experience with us
          </h3>
          <p className="text-brown-light text-sm leading-relaxed">
            A few honest lines are plenty. We read every review before it goes on the website.
          </p>

          <fieldset>
            <legend className="text-xs text-brown-light font-medium">I am a…</legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {ROLES.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setRole(option.id)}
                  aria-pressed={role === option.id}
                  className={`text-sm font-medium rounded-md px-4 py-2 border transition-colors ${
                    role === option.id
                      ? "bg-gold text-cream-light border-gold"
                      : "text-brown-light border-gold/30 hover:border-gold"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="review-name" className="text-xs text-brown-light font-medium">
                Your name (first name is fine)
              </label>
              <input
                id="review-name"
                ref={nameInput}
                name="name"
                type="text"
                required
                autoComplete="given-name"
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label htmlFor="review-country" className="text-xs text-brown-light font-medium">
                Country
              </label>
              <input
                id="review-country"
                name="country"
                type="text"
                required
                autoComplete="country-name"
                value={country ?? detected}
                onChange={(event) => setCountry(event.target.value)}
                className={INPUT_CLASS}
              />
            </div>
          </div>

          <div>
            <label htmlFor="review-text" className="text-xs text-brown-light font-medium">
              Your review
            </label>
            <textarea
              id="review-text"
              name="review"
              required
              minLength={20}
              maxLength={1200}
              rows={5}
              placeholder="What has your class been like? What do you like about the teacher?"
              className={`${INPUT_CLASS} resize-y`}
            />
          </div>

          <div>
            <label htmlFor="review-email" className="text-xs text-brown-light font-medium">
              Email (optional, never shown on the website)
            </label>
            <input
              id="review-email"
              name="email"
              type="email"
              autoComplete="email"
              className={INPUT_CLASS}
            />
          </div>

          {/* Spam trap: people never see this, so any value in it means a bot. */}
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />

          <label className="flex items-start gap-3 text-sm text-brown-light leading-relaxed">
            <input
              type="checkbox"
              name="may_publish"
              value="Yes"
              required
              className="mt-1 accent-[#b8924d]"
            />
            <span>You may show my review on the website with my first name and country.</span>
          </label>

          <div className="flex flex-wrap gap-3 pt-1">
            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-gold hover:bg-gold-dark disabled:opacity-60 text-cream-light font-medium px-6 py-2.5 rounded-md transition-colors"
            >
              {status === "sending" ? "Sending…" : "Send my review"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="border border-gold/40 text-brown-light hover:text-brown hover:border-gold font-medium px-6 py-2.5 rounded-md transition-colors"
            >
              Cancel
            </button>
          </div>

          {status === "error" && (
            <p className="text-sm text-red-700">
              Something went wrong. Please{" "}
              <a
                href={whatsappLink("Assalamu alaikum, I'd like to share a review.")}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                send it on WhatsApp
              </a>{" "}
              instead.
            </p>
          )}
        </form>
      )}
    </div>
  );
}
