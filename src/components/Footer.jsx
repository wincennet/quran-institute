import Logo from "./Logo";
import { CONTACT, MISSION_STATEMENT, SOCIALS } from "../lib/constants";
import { FacebookIcon, InstagramIcon, TikTokIcon, XIcon, YoutubeIcon } from "./SocialIcons";

const SOCIAL_ICONS = {
  Facebook: FacebookIcon,
  YouTube: YoutubeIcon,
  TikTok: TikTokIcon,
  X: XIcon,
  Instagram: InstagramIcon,
};

const QUICK_LINKS = [
  { label: "About", href: "#about" },
  { label: "Courses", href: "#courses" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-brown text-cream-light pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Logo compact onDark />
            <p className="text-cream/70 text-sm mt-4 leading-relaxed max-w-xs">
              {MISSION_STATEMENT}
            </p>
          </div>

          <div>
            <p className="font-heading text-gold text-sm uppercase tracking-[0.2em] mb-4">
              Quick Links
            </p>
            <ul className="space-y-2 text-sm text-cream/80">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-gold transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-heading text-gold text-sm uppercase tracking-[0.2em] mb-4">
              Contact
            </p>
            <ul className="space-y-2 text-sm text-cream/80">
              <li>{CONTACT.phoneDisplay}</li>
              <li className="break-all">{CONTACT.email}</li>
              <li>{CONTACT.location}</li>
            </ul>

            <div className="flex items-center gap-4 mt-5">
              {SOCIALS.map((social) => {
                const Icon = SOCIAL_ICONS[social.name];
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.name}
                    className="text-cream/70 hover:text-gold transition-colors"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-cream/15 mt-12 pt-6 text-center text-cream/60 text-xs">
          © {new Date().getFullYear()} Assiratul Mustaqeem Online Quran Institute. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
