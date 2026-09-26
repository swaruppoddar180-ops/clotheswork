# NOREV — Architecture

**Version:** 2.0 (detailed) · **Date:** 2026-09-27

## 1. File Inventory (live repo, `main`)

| File | Lines | Role |
|---|---|---|
| `index.html` | ~376 | Structure only — nav, hero, filter/sort controls, empty `#productGrid` shell, promo, about, newsletter, contact (`#contactForm`), footer, cart drawer, checkout modal, auth modal, `<script src="products.js">` then `script.js` |
| `products.js` | ~296 | **Product database.** Helpers `IMG/Q/AMZ/FLP/MYN/S`, constant `FIRST_ORDER`, array `PRODUCTS` (21 items) |
| `script.js` | ~683 | All behavior: render → menu/search/filter → wishlist/cart → checkout → theme/newsletter/contact/auth → compare/sort |
| `style.css` | ~1059 | Theme vars (`--bg`, `--text`, `--accent`, dark overrides), layout, components, compare/auth additions, 980px/640px breakpoints |
| `logo.png` | 540 KB | Brand mark (PNG, magic-verified), navbar (54px) + footer with `NOREV` wordmark |
| `README.md` | — | Run guide + file map + doc links |
| `docs/*.md` | — | This folder |

## 2. Module Map (`script.js`, top → bottom)

| Lines | Module | Key symbols |
|---|---|---|
| 5–58 | Price DB derivation + grid render | `PRICE_COMPARISON`, `renderGrid()`, `bestDealFor()` |
| 61–70 | Mobile menu | `menuBtn`, `.nav-links.active` |
| 73–118 | Search | `searchBtn/Box/Input`; live `input` handler filters `.product-card` by `h3` text |
| 120–159 | Category filter | `.filter` buttons ↔ `data-category`; single `active` class |
| 161–183 | Wishlist | `.wishlist` toggle `liked`, ♡/♥ swap |
| 185–400 | Cart | `cart[]`, `addToCart()`, `buyNow()`, `updateCart()`, `removeItem()`, drawer open/close |
| 402–551 | Checkout modal | `checkoutProduct`, `openCheckoutModal()`, `closeCheckoutModal()`, cart→mailto order email |
| 553–589 | Theme | `applyTheme()`, `body.dark`, persists per click (default dark) |
| 591–614 | Newsletter | name/email → thank-you alert + reset |
| 620–701 | Contact | `contactForm/Status`, `setContactStatus()`, `openMailClient()`, FormSubmit AJAX → mailto fallback |
| 703–841 | Auth (demo) | `readUsers/writeUsers/currentUserEmail/hashPw`, `refreshAuthUI()`, signup/login/logout handlers |
| 843–941 | Compare + sort | `storePriceForCard()`, `productNameForCard()`, `renderCompareBoxes()`, `sortProducts()`, `#sortSelect` |

**Ordering invariant:** render (15) runs before all bindings, so every `querySelectorAll` sees real cards. Auth block is fully null-guarded; nothing below it can be broken by auth.

## 3. Data Schemas

### 3.1 `PRODUCTS[]` item (example)
```js
{
  id: "tee-white-essential", name: "Essential White Tee",
  brand: "NOREV Essentials", category: "tshirt", catLabel: "T-SHIRT",
  price: 599, mrp: 899, tag: "NEW", rating: 4.6,
  img: IMG("photo-1620799140408-edc6dcb6d633"),
  query: "white cotton t-shirt men",
  sites: [
    S("NOREV Store", 599, 899, "—", FIRST_ORDER, "#shop"),
    S("Amazon", 649, 999, "10% off HDFC Bank cards", "Diwali Sale: extra 5% off",
      AMZ("white cotton t-shirt men")),
    S("Flipkart", 629, 999, "10% off ICICI Bank cards", "Big Billion Days: extra Rs.50 off",
      FLP("white cotton t-shirt men")),
    S("Myntra", 699, 1099, "15% off Kotak cards", "End of Season: extra 10% off",
      MYN("white cotton t-shirt men"))
  ]
}
```
`S(site, price, mrp, cardOffer, festiveOffer, url)`; `AMZ/FLP/MYN(q)` build `…/s?k=…`, `…/search?q=…` URLs (patterns HTTP-verified: Flipkart/Myntra 200, Amazon bot-503 on curl but correct pattern in browsers).

### 3.2 Derived + client state
- `PRICE_COMPARISON[name] = { query, sites }` — rebuilt from `PRODUCTS` on every load.
- `cart = [{ name, price, quantity }]` — in-memory only (resets on reload; intentional MVP scope).
- `localStorage["norev_users"] = { email: { name, hash } }`; `localStorage["norev_session"] = email`.

## 4. Runtime Flows (sequences)

**F-1 Load:** parse HTML → `products.js` defines `PRODUCTS` → `script.js`: derive prices → `renderGrid()` (21 cards) → bind menu/search/filter/wishlist/cart/checkout/theme/newsletter/contact/auth → `renderCompareBoxes()` (best-deal line + sorted rows) → `refreshAuthUI()`.

**F-2 Compare:** click COMPARE PRICES → toggle `.open` on sibling box (rows pre-sorted asc; index 0 badged BEST DEAL).

**F-3 Sort:** `#sortSelect` change → `sortProducts("store-asc"|"best-asc")` re-appends nodes (Featured = reload).

**F-4 Order:** ADD TO CART × n → cart drawer → CHECKOUT → modal summary → submit → `mailto:` with `Name/Phone/Email/Address + items + total`.

**F-5 Enquiry:** submit → validate → `POST formsubmit.co/ajax/norevclothing@gmail.com {name,email,subject,message,_captcha:false}` → success: status + reset; failure: temp-anchor mailto + "press Send" status.

**F-6 Auth:** signup (unique email, pw ≥ 4) → hash → session set → 👤 shows first name; login verifies hash; logout clears session.

## 5. External Dependencies & Failure Modes

| Dependency | Use | If it fails |
|---|---|---|
| Unsplash CDN | 21 thumbs + hero/about | Broken images; mitigated by pre-verifying every URL (21/21 × 200) |
| Google Fonts | Montserrat | Falls back to system sans (acceptable) |
| formsubmit.co | Contact delivery | Automatic mailto fallback + status text |
| Amazon/Flipkart/Myntra | Outbound View links | Links still open (user searches manually); no app dependency |
| Visitor email app | Checkout delivery | Known MVP limit; documented, Phase 2 replaces with backend orders |

## 6. Performance Notes
- No framework, no bundler; total JS ~40 KB + 540 KB logo; images lazy (`loading="lazy"`) at `w=900&q=80`.
- 21 cards render synchronously (<50 ms typical); compare boxes pre-rendered once, toggled via class.
- Serve with gzip/static host; nothing blocks first paint except font + hero image.

## 7. Target Architecture (Phase 2)
```
Browser (same UI; fetch instead of in-file DB)
  │ HTTPS/JSON
API (Supabase/Firebase or Node/Express)
  ├── Postgres: products, site_prices, offers, users, orders
  ├── Auth: OTP/email sessions (replaces localStorage)
  ├── Orders: POST /orders (replaces mailto), owner dashboard + email
  └── Payments: Razorpay (UPI/cards) → POST /payments/verify
Hosting: Vercel/Netlify · Images: Cloudinary · Email: backend mailer + FormSubmit backup
```
**Migration mapping:** `PRODUCTS[]` → `products` table seed (fields already 1:1); `sites[]` → `site_prices` rows; compare renderer unchanged, fed by `GET /products?include=prices`; checkout modal posts instead of mailto; auth modal calls provider SDK; file `docs/` stays as living documentation.

## 8. Decisions (ADRs, short)
- AD-1 Static-first MVP: validate demand before any backend spend.
- AD-2 Manual price samples: scraping violates marketplace ToS and breaks on captchas/bot walls.
- AD-3 In-file JS DB over JSON+fetch: works on any static host with zero CORS risk.
- AD-4 Demo auth in localStorage: unblocks UI/UX now; explicitly insecure, fenced by comments.
- AD-5 No secrets in repo: FormSubmit is address-only; nothing to leak.
