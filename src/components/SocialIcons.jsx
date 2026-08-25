// lucide-react dropped brand/social icons; these are minimal stroke-style
// glyphs drawn to match lucide's 24x24 stroke visual language.

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function FacebookIcon({ size = 20, ...props }) {
  return (
    <svg width={size} height={size} {...base} {...props}>
      <path d="M15 3h-2a4 4 0 0 0-4 4v3H6v4h3v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function InstagramIcon({ size = 20, ...props }) {
  return (
    <svg width={size} height={size} {...base} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon({ size = 20, ...props }) {
  return (
    <svg width={size} height={size} {...base} {...props}>
      <rect x="2.5" y="6" width="19" height="12" rx="3.5" />
      <polygon points="10.5 9.5 15.5 12 10.5 14.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTokIcon({ size = 20, ...props }) {
  return (
    <svg width={size} height={size} {...base} {...props}>
      <path d="M14 4v9.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M14 4a5 5 0 0 0 5 5" />
    </svg>
  );
}

export function XIcon({ size = 20, ...props }) {
  return (
    <svg width={size} height={size} {...base} {...props}>
      <path d="M4 4l16 16" />
      <path d="M20 4L4 20" />
    </svg>
  );
}
