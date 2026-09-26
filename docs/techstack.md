# NOREV — Tech Stack

**Version:** 2.0 (detailed) · **Date:** 2026-09-27

## 1. Current Stack (Phase 1 — in use)

| Layer | Choice (version) | Why | Rejected alternative → reason |
|---|---|---|---|
| Markup | Plain HTML5, no template engine | Zero build; owner-readable | React/Next.js → build + hosting complexity for a 21-product static catalog |
| Styling | Vanilla CSS + custom properties | Light/dark via `body.dark` var swaps; 2 breakpoints, no framework weight | Tailwind/Bootstrap → CDN weight + class noise; unnecessary at this size |
| Logic | Vanilla ES6 JS (~683 lines) | No deps, no CVEs to track, runs from `file://` upward | jQuery → obsolete; framework → overkill |
| Product DB | In-file `PRODUCTS` array (`products.js`) | Single source of truth; `<script>`-loaded so zero fetch/CORS risk on any static host | `products.json` + fetch → breaks on `file://`, needs MIME-correct host |
| Demo auth store | `localStorage` (`norev_users`, `norev_session`) | Keyless accounts UI today | Cookies/server sessions → need backend (Phase 2) |
| Contact delivery | FormSubmit AJAX (`/ajax/norevclothing@gmail.com`, `_captcha:false`) + mailto fallback | Free, no key, no server; graceful degradation | Custom SMTP/API → needs secrets + server |
| Order handoff | `mailto:` with encoded body | Zero-cost MVP; owner fulfils from Gmail | Payment gateway → Phase 2 decision |
| Images | Unsplash CDN (`images.unsplash.com`, `w=900&q=80`, lazy) | Free, fast, every URL batch-verified HTTP 200 | Self-hosted → repo bloat; hotlink risk accepted + mitigated by verification |
| Fonts | Google Fonts Montserrat | Brand type; system-sans fallback | Self-hosted fonts → extra weight for one family |
| Logo | `logo.png` (540 KB, PNG-verified) | Owner-supplied monogram | SVG redraw → loses owner's artwork fidelity |
| Local serve | Node 24 `serve` on `:8000` | Mirrors static production hosting | `python http.server` → not installed here; XAMPP → heavy |
| Verification | `node --check` + curl smoke tests | Catches syntax + dead assets pre-commit | Full test harness → disproportionate for static MVP |

### Dev environment (pinned where it matters)
- OS: Windows · Shell: PowerShell · Git 2.55 (via `C:\Program Files\Git\cmd\git.exe`, not on PATH — use full path) · Node v24.19.0 · No Python.
- Commit identity is repo-local (`swaruppoddar180-ops` / `norevclothing@gmail.com`).

## 2. Recommended Target Stack (Phase 2 — real selling)

| Layer | Choice | Why | Cost |
|---|---|---|---|
| Hosting | Vercel or Netlify | Free tier, HTTPS, preview URLs, static + serverless in one | ₹0 to start |
| Backend | Supabase (Postgres + Auth + auto REST) | One service for DB + auth; `PRODUCTS` maps 1:1 to a table; generous free tier | ₹0 to start |
| Alt backend | Firebase (if team knows it) | Equivalent; pick by familiarity, not features | ₹0 to start |
| Payments (India) | Razorpay | UPI + cards + netbanking, Indian settlement, mature docs | Per-transaction fee only |
| Images | Cloudinary | Owner uploads, auto-resize/CDN; keep Unsplash for placeholders | Free tier |
| Email | Backend mailer + keep FormSubmit | Redundant enquiry/order delivery | ₹0 |
| Analytics (optional) | Plausible | Lightweight, no cookie banner drama | Free self-host / cheap cloud |

## 3. Upgrade Triggers (all must be true-ish to justify Phase 2)
1. First real paid-order intent (email orders becoming painful).
2. Need cross-device login or an admin UI for prices (owner editing JS no longer scales).
3. Order volume where Gmail-as-database breaks (search/labels insufficient).

## 4. Cost Summary
- Phase 1: ₹0/month (static host free tier, FormSubmit free, Unsplash free).
- Phase 2 start: ₹0/month fixed (free tiers) + Razorpay per-transaction fee.
- Explicitly avoided: paid price-tracker APIs (unneeded while samples are manual).

## 5. Constraints & Risks
- No Amazon/Flipkart scraping — ToS violation + bot walls (observed: Amazon 503, Ajio 403 to curl).
- No live price API exists for free frontend use — any "live prices" claim requires paid keys + backend proxy.
- Demo auth hash (`hashPw`) is obfuscation, not security — must not survive into Phase 2.
- `mailto:` checkout requires a visitor email app — documented MVP limit, not a bug to patch in Phase 1.
