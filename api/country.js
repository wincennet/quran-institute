// Vercel serverless function: tells the site which country the visitor is in,
// so Pakistan-only prices can be shown. Vercel sets x-vercel-ip-country itself.
//
// `?country=XX` is a testing override and is ignored on the production
// deployment, so nobody can force the Pakistan prices on the live site.
export default function handler(req, res) {
  const isProduction = process.env.VERCEL_ENV === "production";
  const override = !isProduction ? req.query?.country : undefined;
  const raw = override || req.headers["x-vercel-ip-country"];

  const country =
    typeof raw === "string" && /^[A-Za-z]{2}$/.test(raw) ? raw.toUpperCase() : null;

  res.setHeader("Cache-Control", "private, no-store");
  res.status(200).json({ country });
}
