// Domain is PENDING (P2.0 decision). Single source for canonical URLs:
// - NEXT_PUBLIC_SITE_URL when the final domain is provided (deploy env)
// - Vercel's production domain when deployed on Vercel (auto-provided)
// - undefined otherwise — pages then emit relative OG URLs and NO canonical,
//   so a fabricated production domain can never reach an index.
export const productionUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined);

// Absolute-URL consumer fallback (dev/preview only):
export const siteUrl = productionUrl ?? "http://localhost:3000";
