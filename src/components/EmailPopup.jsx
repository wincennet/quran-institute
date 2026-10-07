import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { MessageCircle, X } from "lucide-react";
import { MAILERLITE_FORM_URL, whatsappLink } from "../lib/constants";

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

    try {
      const response = await fetch(MAILERLITE_FORM_URL, { method: "POST", body: data });
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
        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-cream-light border border-gold/30 rounded-2xl p-7 shadow-xl"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 text-brown-light hover:text-brown transition-colors"
        >
          <X size={22} />
        </button>

        {status === "success" ? (
          <div className="text-center py-4">
            <h2 id="email-popup-title" className="font-heading text-brown text-2xl font-semibold">
              Check your email
            </h2>
            <p className="text-brown-light text-sm leading-relaxed mt-3">
              We&apos;ve sent you the details for your free trial class, insha&apos;Allah. Prefer
              to book right now?
            </p>
            <a
              href={whatsappLink("Assalamu alaikum, I'd like to book a free trial class.")}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 w-full bg-gold hover:bg-gold-dark text-cream-light font-medium py-3 rounded-full transition-colors"
            >
              <MessageCircle size={18} /> Book on WhatsApp
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <span className="font-sans text-gold-dark text-xs uppercase tracking-[0.25em]">
              Free for parents
            </span>
            <h2
              id="email-popup-title"
              className="font-heading text-brown text-2xl font-semibold leading-snug pr-6"
            >
              Get a free trial class and simple Tajweed tips
            </h2>
            <p className="text-brown-light text-sm leading-relaxed">
              Leave your email and we&apos;ll send your trial class details, plus short tips to
              help your child recite the Quran correctly.
            </p>

            <div>
              <label htmlFor="popup-email" className="text-xs text-brown-light font-medium">
                Email
              </label>
              <input
                id="popup-email"
                ref={emailInput}
                name="fields[email]"
                type="email"
                required
                autoComplete="email"
                className="mt-1 w-full rounded-lg border border-gold/30 bg-cream px-4 py-2.5 text-brown text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-gold hover:bg-gold-dark disabled:opacity-60 text-cream-light font-medium py-3 rounded-full transition-colors"
            >
              {status === "sending" ? "Sending…" : "Send me the free trial"}
            </button>

            {status === "error" && (
              <p className="text-sm text-red-700 text-center">
                Something went wrong — please try WhatsApp instead.
              </p>
            )}

            <p className="text-brown-light text-xs text-center leading-relaxed">
              We&apos;ll email you tips and your trial details. Unsubscribe anytime.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
