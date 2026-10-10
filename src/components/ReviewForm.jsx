import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import useCountry from "../hooks/useCountry";
import { whatsappLink } from "../lib/constants";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mljrqnlb";

const INPUT_CLASS =
  "w-full rounded-lg border border-gold/30 bg-cream px-3 py-2 text-brown text-sm placeholder:text-brown/40 focus:outline-none focus:ring-2 focus:ring-gold/50";

// A little smaller than INPUT_CLASS, for the short single-line fields.
const SMALL_INPUT_CLASS = INPUT_CLASS.replace("py-2", "py-1.5").replace("text-sm", "text-xs");

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
  const reviewInput = useRef(null);

  // Bring the form into view and ready to type when it opens.
  useEffect(() => {
    panel.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    reviewInput.current?.focus({ preventScroll: true });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    const data = new FormData(event.target);
    data.set("reviewer_role", role);
    data.set("may_publish", "Yes (agreed by sending)");
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
      className="max-w-4xl mx-auto text-left bg-cream-light border border-gold/25 rounded-2xl p-5"
    >
      {status === "success" ? (
        <div>
          <span className="w-10 h-10 rounded-full bg-gold/20 text-gold-dark flex items-center justify-center">
            <Check size={20} />
          </span>
          <h3 className="font-heading text-brown text-xl font-semibold mt-4">
            Jazakallahu khairan
          </h3>
          <p className="text-brown-light text-sm leading-relaxed mt-2">
            Your review has reached us. We read every one, and it will appear on this page once we
            have checked it, insha&apos;Allah.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mt-4 bg-gold hover:bg-gold-dark text-cream-light text-sm font-medium px-4 py-1.5 rounded-md transition-colors"
          >
            Close
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-heading text-brown text-xl font-semibold leading-snug">
              Share your experience
            </h3>
            <fieldset className="flex items-center gap-1.5">
              <legend className="sr-only">I am a</legend>
              {ROLES.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setRole(option.id)}
                  aria-pressed={role === option.id}
                  className={`text-xs font-medium rounded-md px-3 py-1.5 border transition-colors ${
                    role === option.id
                      ? "bg-gold text-cream-light border-gold"
                      : "text-brown-light border-gold/30 hover:border-gold"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </fieldset>
          </div>

          <div>
            <label htmlFor="review-text" className="sr-only">
              Your review
            </label>
            <textarea
              id="review-text"
              ref={reviewInput}
              name="review"
              required
              minLength={20}
              maxLength={1200}
              rows={3}
              placeholder="Your review"
              className={`${INPUT_CLASS} min-h-[5.5rem] resize-y`}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-[13rem_13rem] gap-3">
            <div>
              <label htmlFor="review-name" className="sr-only">
                Name
              </label>
              <input
                id="review-name"
                name="name"
                type="text"
                required
                autoComplete="given-name"
                placeholder="Name"
                className={SMALL_INPUT_CLASS}
              />
            </div>
            <div>
              <label htmlFor="review-country" className="sr-only">
                Country
              </label>
              <input
                id="review-country"
                name="country"
                type="text"
                required
                autoComplete="country-name"
                placeholder="Country"
                value={country ?? detected}
                onChange={(event) => setCountry(event.target.value)}
                className={SMALL_INPUT_CLASS}
              />
            </div>
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

          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 pt-1">
            <p className="text-xs text-brown-light leading-relaxed">
              By sending, you agree we may show your review with your first name and country.
            </p>

            <div className="flex flex-wrap gap-2">
              <button
                type="submit"
                disabled={status === "sending"}
                className="bg-gold hover:bg-gold-dark disabled:opacity-60 text-cream-light text-sm font-medium px-4 py-1.5 rounded-md transition-colors"
              >
                {status === "sending" ? "Sending…" : "Send review"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="border border-gold/40 text-brown-light hover:text-brown hover:border-gold text-sm font-medium px-4 py-1.5 rounded-md transition-colors"
              >
                Cancel
              </button>
            </div>
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
