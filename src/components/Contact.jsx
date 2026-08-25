import { useState } from "react";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import Reveal from "./Reveal";
import { CONTACT, whatsappLink } from "../lib/constants";

// TODO: replace with your real Formspree endpoint.
// Create a free form at https://formspree.io and swap the ID below —
// until then this form won't deliver submissions, so WhatsApp remains
// the primary, reliable contact path.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

export default function Contact() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    const form = event.target;
    const data = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="bg-cream-light py-24">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="font-sans text-gold-dark text-sm uppercase tracking-[0.25em]">
            Contact / Enroll
          </span>
          <h2 className="font-heading text-brown text-3xl md:text-4xl font-medium mt-3">
            Start your journey with the Quran today
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-14">
          <Reveal className="space-y-6">
            <a
              href={whatsappLink("Assalamu alaikum, I'd like to book a free trial class.")}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 bg-gold hover:bg-gold-dark transition-colors text-cream-light rounded-2xl px-6 py-5"
            >
              <MessageCircle size={26} />
              <div>
                <p className="font-heading text-lg font-semibold">Chat on WhatsApp</p>
                <p className="text-sm text-cream-light/85">{CONTACT.phoneDisplay}</p>
              </div>
            </a>

            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-4 bg-cream border border-gold/25 rounded-2xl px-6 py-5"
            >
              <Mail size={24} className="text-gold-dark" />
              <div>
                <p className="font-heading text-brown text-lg font-semibold">Email</p>
                <p className="text-sm text-brown-light break-all">{CONTACT.email}</p>
              </div>
            </a>

            <div className="flex items-center gap-4 bg-cream border border-gold/25 rounded-2xl px-6 py-5">
              <MapPin size={24} className="text-gold-dark" />
              <div>
                <p className="font-heading text-brown text-lg font-semibold">Location</p>
                <p className="text-sm text-brown-light">{CONTACT.location}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="bg-cream border border-gold/25 rounded-2xl p-7 space-y-4"
            >
              <p className="font-heading text-brown text-lg font-semibold">
                Or send us a message
              </p>

              <div>
                <label htmlFor="name" className="text-xs text-brown-light font-medium">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-1 w-full rounded-lg border border-gold/30 bg-cream-light px-4 py-2.5 text-brown text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
              </div>

              <div>
                <label htmlFor="email" className="text-xs text-brown-light font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 w-full rounded-lg border border-gold/30 bg-cream-light px-4 py-2.5 text-brown text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
              </div>

              <div>
                <label htmlFor="message" className="text-xs text-brown-light font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="mt-1 w-full rounded-lg border border-gold/30 bg-cream-light px-4 py-2.5 text-brown text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-gold hover:bg-gold-dark disabled:opacity-60 text-cream-light font-medium py-3 rounded-full transition-colors"
              >
                {status === "sending" ? "Sending…" : "Send Message"}
              </button>

              {status === "success" && (
                <p className="text-sm text-gold-dark text-center">
                  Message sent — we'll get back to you soon, insha'Allah.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-700 text-center">
                  Something went wrong — please try WhatsApp instead.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
