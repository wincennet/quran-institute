import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { whatsappLink } from "../lib/constants";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Courses", href: "#courses" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Global Reach", href: "#global-reach" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-cream-light/95 backdrop-blur shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3">
        <a href="#top" className="flex items-center">
          <Logo compact />
        </a>

        <ul className="hidden md:flex items-center gap-8 font-sans text-sm text-brown">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-gold transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={whatsappLink("Assalamu alaikum, I'd like to book a free trial class.")}
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-block bg-gold hover:bg-gold-dark text-cream-light text-sm font-medium px-5 py-2 rounded-full transition-colors"
        >
          Book a Free Trial
        </a>

        <button
          className="md:hidden text-brown"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-cream-light border-t border-gold/20 px-5 py-4">
          <ul className="flex flex-col gap-4 font-sans text-brown">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={whatsappLink("Assalamu alaikum, I'd like to book a free trial class.")}
            target="_blank"
            rel="noreferrer"
            className="mt-4 block text-center bg-gold hover:bg-gold-dark text-cream-light text-sm font-medium px-5 py-2 rounded-full transition-colors"
          >
            Book a Free Trial
          </a>
        </div>
      )}
    </header>
  );
}
