# NOREV — Tech Stack

**Version:** 1.0 (draft) · **Date:** 2026-09-27

## 1. Current Stack (Phase 1 — in use today)

| Layer | Choice | Why |
|---|---|---|
| Markup | Plain HTML (`index.html`) | No build step; editable directly |
| Styling | Plain CSS (`style.css`, CSS vars) | Light/dark theme via vars; responsive without framework |
| Logic | Vanilla JS (`script.js`, ES6) | Zero dependencies; runs anywhere |
| Product DB | `products.js` (in-file JS objects) | Single source of truth; works via `<script>` on static hosts (no fetch/CORS issues) |
| Demo auth store | `localStorage` | No backend needed; clearly demo-grade |
| Contact delivery | FormSubmit AJAX + mailto fallback | Free, keyless, no server |
| Images | Unsplash CDN (all URLs HTTP-verified) | Free, fast, hotlink-stable |
| Fonts | Google Fonts (Montserrat) | Brand typography |
| Local dev/serve | Node `serve` on `:8000` | Static preview; same as production hosting model |
| Verification | `node --check`, curl smoke tests | Catches syntax + broken assets before release |

**Deliberately NOT used:** React/Next.js, Tailwind, jQuery, npm dependencies, backend runtime, API keys.

## 2. Recommended Target Stack (Phase 2 — real selling)

| Layer | Choice | Why |
|---|---|---|
| Hosting | Vercel or Netlify | Free tier, HTTPS, preview deploys for static + serverless |
| Backend | Supabase (Postgres + Auth + REST) **or** Firebase | No server to manage; auth + DB in one; generous free tier |
| Payments (India) | Razorpay | UPI + cards + netbanking; India-first settlement |
| Images | Cloudinary (or keep Unsplash for placeholders) | Product uploads, resizing, CDN |
| Email | FormSubmit (keep) + backend order mailer | Redundancy for enquiries/orders |
| Analytics (optional) | Plausible / GA4 | Traffic + conversion without heavy SDKs |

## 3. Upgrade Triggers (when to move to Phase 2)
- Real payment required (first paid order intent).
- Order volume makes Gmail-only fulfillment painful.
- Need cross-device accounts or an admin UI for prices.

## 4. Constraints
- No scraping of Amazon/Flipkart (ToS + bot protection); price data stays manual or via paid tracker APIs with keys.
- No secrets committed to repo, ever.
