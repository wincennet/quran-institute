import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { whatsappLink } from "../lib/constants";

const LINKS = [
  { label: "About", href: "/#about" },
  { label: "Courses", href: "/#courses" },
  { label: "Global Reach", href: "/#global-reach" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Only the homepage opens on a dark hero photo — every other page (and the
  // homepage once scrolled) has a light background right under the navbar.
  const onDarkHero = pathname === "/" && !scrolled;
  const linkColor = onDarkHero
    ? "text-cream-light hover:text-gold"
    : "text-brown hover:text-gold";
  const outlineButtonColor = onDarkHero
    ? "border-cream-light/50 text-cream-light hover:bg-cream-light/10"
    : "border-gold-dark/50 text-brown hover:bg-cream-light";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-cream-light/95 backdrop-blur shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="w-full flex items-center justify-between px-5 sm:px-8 lg:px-12 py-3">
        <Link to="/" className="flex items-center">
          <Logo compact onDark={onDarkHero} />
        </Link>

        <ul className={`hidden md:flex items-center gap-8 font-sans text-sm transition-colors ${linkColor}`}>
          {LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2">
          <a
            href="/#courses"
            className={`border text-sm font-medium px-4 py-2 rounded-full transition-colors ${outlineButtonColor}`}
          >
            Our Courses
          </a>
          <a
            href={whatsappLink("Assalamu alaikum, I'd like to book a free individual trial class.")}
            target="_blank"
            rel="noreferrer"
            className={`border text-sm font-medium px-4 py-2 rounded-full transition-colors ${outlineButtonColor}`}
          >
            Free Trial
          </a>
          <Link
            to="/courses/tarteel/enroll"
            className="bg-gold hover:bg-gold-dark text-cream-light text-sm font-medium px-4 py-2 rounded-full transition-colors"
          >
            Enroll Now
          </Link>
        </div>

        <button
          className={`md:hidden transition-colors ${onDarkHero ? "text-cream-light" : "text-brown"}`}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-cream-light border-t border-gold/20 px-5 sm:px-8 py-4">
          <ul className="flex flex-col gap-4 font-sans text-brown">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-3">
            <a
              href="/#courses"
              onClick={() => setOpen(false)}
              className="block text-center border border-gold-dark/50 text-brown text-sm font-medium px-5 py-2 rounded-full transition-colors"
            >
              Our Courses
            </a>
            <a
              href={whatsappLink("Assalamu alaikum, I'd like to book a free individual trial class.")}
              target="_blank"
              rel="noreferrer"
              className="block text-center border border-gold-dark/50 text-brown text-sm font-medium px-5 py-2 rounded-full transition-colors"
            >
              Free Trial
            </a>
            <Link
              to="/courses/tarteel/enroll"
              onClick={() => setOpen(false)}
              className="block text-center bg-gold hover:bg-gold-dark text-cream-light text-sm font-medium px-5 py-2 rounded-full transition-colors"
            >
              Enroll Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
