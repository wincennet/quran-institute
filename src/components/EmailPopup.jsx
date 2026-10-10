import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { MessageCircle, X } from "lucide-react";
import { MAILERLITE_FORM_URL, MAILERLITE_STUDENT_FORM_URL, whatsappLink } from "../lib/constants";

const STORAGE_KEY = "emailPopup:v1";
const DISMISS_DAYS = 14;
const SHOW_AFTER_MS = 25_000;
const SHOW_AT_SCROLL = 0.5;

function readState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {};
  } catch {
    return {};
  }
}

function writeState(next) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage can be blocked (private windows); the popup then just shows again next visit.
  }
}

function shouldStayHidden() {
  const { subscribed, dismissedAt } = readState();
  if (subscribed) return true;
  return Boolean(dismissedAt) && Date.now() - dismissedAt < DISMISS_DAYS * 24 * 60 * 60 * 1000;
}

// Collects emails into MailerLite, where an automatic welcome series sends the
// free-trial link and Tajweed tips. Stays hidden until MAILERLITE_FORM_URL is set.
export default function EmailPopup() {
  const { pathname } = useLocation();
  const enabled = Boolean(MAILERLITE_FORM_URL) && !pathname.endsWith("/enroll");

  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("idle");
  const [audience, setAudience] = useState("parent");
  const hasShown = useRef(false);
  const emailInput = useRef(null);

  useEffect(() => {
    if (!enabled || hasShown.current || shouldStayHidden()) return undefined;

    const show = () => {
      if (hasShown.current) return;
      hasShown.current = true;
      setOpen(true);
    };

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0 && window.scrollY / scrollable >= SHOW_AT_SCROLL) show();
    };

    const timer = setTimeout(show, SHOW_AFTER_MS);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [enabled]);

  const close = useCallback(() => {
    writeState({ ...readState(), dismissedAt: Date.now() });
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    emailInput.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    const data = new FormData(event.target);
    data.set("ml-submit", "1");
    data.set("anticsrf", "true");
    // Parents and students are different MailerLite groups, each with its own
    // email series.
    const url =
      audience === "student" && MAILERLITE_STUDENT_FORM_URL
        ? MAILERLITE_STUDENT_FORM_URL
        : MAILERLITE_FORM_URL;

    try {
      const response = await fetch(url, { method: "POST", body: data });
      const result = await response.json().catch(() => null);
      if (response.ok && result?.success !== false) {
        writeState({ subscribed: true });
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (!enabled || !open) return null;

  const asksAudience = Boolean(MAILERLITE_STUDENT_FORM_URL);
  const isStudent = asksAudience && audience === "student";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-brown/50 px-4 py-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="email-popup-title"
        className="relative w-full max-w-sm max-h-[90vh] overflow-y-auto bg-cream-light border border-gold/30 rounded-2xl p-5 shadow-xl"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-3.5 right-3.5 text-brown-light hover:text-brown transition-colors"
        >
          <X size={20} />
        </button>

        {status === "success" ? (
          <div className="text-center py-2">
            <h2 id="email-popup-title" className="font-heading text-brown text-xl font-semibold">
              Check your email
            </h2>
            <p className="text-brown-light text-sm leading-relaxed mt-2">
              We&apos;ve sent you the details for your free trial class, insha&apos;Allah. Prefer to
              book right now?
            </p>
            <a
              href={whatsappLink("Assalamu alaikum, I'd like to book a free trial class.")}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-cream-light text-sm font-medium px-4 py-1.5 rounded-md transition-colors"
            >
              <MessageCircle size={16} /> Book on WhatsApp
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <span className="font-sans text-gold-dark text-xs uppercase tracking-[0.25em]">
              {asksAudience ? "Free trial class" : "Free for parents"}
            </span>
            <h2
              id="email-popup-title"
              className="font-heading text-brown text-xl font-semibold leading-snug pr-6"
            >
              Get a free trial class and simple Tajweed tips
            </h2>
            <p className="text-brown-light text-sm leading-relaxed">
              {isStudent
                ? "Leave your email and we'll send your trial class details, plus short tips to help you recite the Quran correctly."
                : "Leave your email and we'll send your trial class details, plus short tips to help your child recite the Quran correctly."}
            </p>

            {asksAudience && (
              <fieldset className="flex items-center gap-1.5">
                <legend className="sr-only">I am a</legend>
                {[
                  { id: "parent", label: "Parent" },
                  { id: "student", label: "Student" },
                ].map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setAudience(option.id)}
                    aria-pressed={audience === option.id}
                    className={`text-xs font-medium rounded-md px-3 py-1.5 border transition-colors ${
                      audience === option.id
                        ? "bg-gold text-cream-light border-gold"
                        : "text-brown-light border-gold/30 hover:border-gold"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </fieldset>
            )}

            <div>
              <label htmlFor="popup-email" className="sr-only">
                Email
              </label>
              <input
                id="popup-email"
                ref={emailInput}
                name="fields[email]"
                type="email"
                required
                autoComplete="email"
                placeholder="Email"
                className="w-full rounded-lg border border-gold/30 bg-cream px-3 py-2 text-brown text-sm placeholder:text-brown/40 focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-gold hover:bg-gold-dark disabled:opacity-60 text-cream-light text-sm font-medium px-4 py-1.5 rounded-md transition-colors"
            >
              {status === "sending" ? "Sending…" : "Send me the free trial"}
            </button>

            {status === "error" && (
              <p className="text-sm text-red-700">
                Something went wrong — please try WhatsApp instead.
              </p>
            )}

            <p className="text-brown-light text-xs leading-relaxed">
              We&apos;ll email you tips and your trial details. Unsubscribe anytime.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
