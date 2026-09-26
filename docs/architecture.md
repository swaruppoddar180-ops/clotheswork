# NOREV — Architecture

**Version:** 1.0 (draft) · **Date:** 2026-09-27

## 1. Current Architecture (Phase 1 — static, live)

```
Browser
 ├── index.html        (structure: nav, hero, filters, grid shell, promo,
 │                      about, newsletter, contact, footer, cart, checkout modal, auth modal)
 ├── style.css         (theme vars, layout, responsive, component styles)
 ├── products.js       (PRODUCT DATABASE: 21 products + per-site price rows)
 ├── script.js         (render grid → filters/search/sort → compare boxes →
 │                      wishlist/cart → checkout mailto → contact FormSubmit →
 │                      localStorage auth)
 ├── logo.png          (brand mark)
 └── localStorage      (norev_users, norev_session — device-local demo accounts)

External (no keys, no backend):
 ├── images.unsplash.com  (product photography CDN)
 ├── Google Fonts         (Montserrat)
 ├── amazon.in / flipkart.com / myntra.com  (outbound search links only)
 └── formsubmit.co/ajax/norevclothing@gmail.com  (contact delivery; one-time activation)
```

### Data flows
- **Catalog:** `PRODUCTS` → `renderGrid()` → cards; `PRICE_COMPARISON` derived from same objects (single source of truth).
- **Compare:** per-card rows sorted lowest-first in JS; badge on cheapest.
- **Order:** cart state (in-memory) → checkout modal → `mailto:` with encoded order body.
- **Enquiry:** form → `fetch POST formsubmit.co/ajax/…` → inbox; `catch` → mailto fallback.
- **Auth:** sign-up/login read/write `localStorage`; session key gates account view.

### Why this shape
Zero hosting cost, zero secrets, works on any static host, editable via one file. Trade-off: no payments, no server-side truth (prices/sessions live in client).

## 2. Target Architecture (Phase 2 — when ready to sell for real)

```
Browser (same UI, API-backed)
    │ HTTPS/JSON
Backend API (Node/Express or Supabase/Firebase)
    ├── Postgres (products, prices, users, orders, offers)
    ├── Auth (OTP/email sessions, NOT localStorage)
    ├── Orders (stored server-side, emailed + dashboard)
    └── Payments (Razorpay for UPI/cards — India-first)
Static hosting: Vercel / Netlify · Images: same CDN or Cloudinary
```

### Migration notes (designed to be cheap)
- `products.js` schema already mirrors a DB table (id, name, brand, category, price, mrp, rating, tag, img, query, sites[]) → importable as seed data.
- `PRICE_COMPARISON` derivation becomes a `GET /products` + `GET /prices` call; compare-box renderer stays unchanged.
- Replace `mailto:` checkout with `POST /orders` + Razorpay checkout; keep mailto as offline fallback.
- Replace localStorage auth with provider sessions; keep modal UI.
- FormSubmit stays as backup contact channel.

## 3. Key Decisions
- AD-1: Static-first MVP to validate demand before backend spend.
- AD-2: Manual price samples (no scraping; violates marketplace ToS and breaks on captchas).
- AD-3: No secrets in repo; activation-gated third parties only.
