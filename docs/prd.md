# NOREV — Product Requirements Document (PRD)

**Version:** 2.0 (detailed) · **Date:** 2026-09-27 · **Status:** For review
**Product:** NOREV — Indian online clothing store (everyday essentials)
**Live reference:** static site served on `:8000` · **Repo:** `swaruppoddar180-ops/clotheswork` (`main`)

---

## 1. Problem & Goal

### Problem
NOREV (launched 2026, India) needs an online storefront but has no backend budget, no payment gateway yet, and no staff to maintain complex infrastructure. Shoppers distrust generic listings — they want honest prices, visible marketplace comparisons, and a way to reach the seller directly.

### Goal
A fast, mobile-first static storefront that:
1. Showcases 20+ products with real photos, ratings, and honest INR pricing.
2. Shows per-product price comparison (NOREV vs Amazon / Flipkart / Myntra) with card + festive offers.
3. Captures enquiries and orders directly into `norevclothing@gmail.com` with no backend.
4. Is editable by the owner through a single data file (`products.js`).

### Non-goal (this phase)
Online payments, order tracking, inventory, live marketplace pricing, cross-device accounts, admin panel.

---

## 2. Personas

| Persona | Context | Goals | Frustrations |
|---|---|---|---|
| **Priya, 24, student (mobile)** | Shops on phone, compares on Amazon/Flipkart before buying | Find affordable everyday wear; verify she's getting a fair price | Fake MRPs, hidden charges, no easy way to contact small sellers |
| **Rahul, 31, office-goer (desktop)** | Buys shirts/jeans online monthly | Quick filter by category, clear checkout | Sites that force app downloads or accounts before showing prices |
| **Swarup, owner** | Runs NOREV solo, fulfils via email/phone | Add products, update prices, receive enquiries + orders in Gmail | Technical maintenance, paid SaaS fees |

---

## 3. User Stories & Acceptance Criteria

### Discovery
- **US-1 — Browse by category.** As Priya, I tap T-Shirts / Shirts / Jeans & Cargoes / Underwear / Hoodies / Jackets and see only matching products.
  - AC: exactly one `active` filter at a time; grid shows 5/4/4/2/2/4 cards per category (21 total); switching back to All restores all 21.
- **US-2 — Search.** As Rahul, I type "hoodie" and see only the 2 hoodies.
  - AC: case-insensitive match on product name; empty query restores grid; no page reload.
- **US-3 — Sort.** As Priya, I sort by "Best deal (lowest anywhere)".
  - AC: cards reorder ascending by cheapest row in the compare box (incl. store price); Featured restores original order.

### Trust: price comparison
- **US-4 — Compare box.** As Priya, I tap COMPARE PRICES on any card.
  - AC: box expands listing 4 rows (NOREV Store, Amazon, Flipkart, Myntra) sorted lowest-first; cheapest row carries the BEST DEAL badge; each row shows price, `% off (MRP ₹X)`, card offer, festive offer, and a View link opening that site's product search in a new tab.
- **US-5 — Best-deal line.** As Rahul, I see "Best deal: ₹X at Y" under every price without opening the box.

### Purchase intent
- **US-6 — Cart.** As Priya, I add 2 tees + 1 jeans, open the cart, remove one item.
  - AC: count badge = total qty; total = Σ(price × qty) formatted `en-IN`; empty cart shows "Your cart is empty." and blocks checkout with "Your cart is empty!".
- **US-7 — Buy Now.** As Rahul, I tap BUY NOW on a shirt → order modal opens for that item only.
- **US-8 — Checkout.** As Priya, I fill name, DOB, phone, email, address and place the order.
  - AC: all fields required; summary lists items + total; submit opens a pre-filled email to `norevclothing@gmail.com` with subject "New Order Request".

### Contact & account
- **US-9 — Enquiry.** As Rahul, I submit the contact form.
  - AC: status shows "Sending…", then "Enquiry sent! We reply within 24 hours." and the form resets; inbox receives name/email/subject/message. If delivery fails, the email app opens pre-filled instead, with status explaining to press Send.
- **US-10 — Newsletter.** As Priya, I join with name + email → confirmation message naming me; form resets.
- **US-11 — Sign up / log in.** As Rahul, I create an account, reload, and stay logged in; wrong password is rejected; duplicate email is redirected to Log in; Log out returns to logged-out state with the 👤 button reset.

### Brand & theme
- **US-12 — Theme/brand.** As Priya, I toggle ☾/☀ and the whole site (incl. logo wordmark) follows; the NOREV logo + name show in navbar and footer.

---

## 4. Feature Specifications

### 4.1 Catalog data (`products.js`) — the single source of truth
Each product object:

| Field | Type | Example | Notes |
|---|---|---|---|
| `id` | slug | `"tee-white-essential"` | unique |
| `name` | string | `"Essential White Tee"` | shown + used as compare/cart key |
| `brand` | string | `"NOREV Essentials"` | shown uppercased next to category |
| `category` | enum | `tshirt\|shirt\|cargo\|underwear\|hoodie\|jacket` | must match a filter button |
| `catLabel` | string | `"T-SHIRT"` | display label |
| `price` / `mrp` | number (INR) | `599` / `899` | store price drives sort + cart |
| `tag` | string\|null | `"NEW"` | badge on photo; null = none |
| `rating` | number | `4.6` | rendered `★ 4.6` |
| `img` | URL | Unsplash CDN `?w=900&q=80` | **must HTTP-200 before use** |
| `query` | string | `"white cotton t-shirt men"` | drives all 3 marketplace search URLs |
| `sites` | 4 × `S()` | Store/Amazon/Flipkart/Myntra | price, mrp, cardOffer, festiveOffer, url |

Current counts: tshirt 5, cargo 4, shirt 4, jacket 4, hoodie 2, underwear 2 = **21**.

### 4.2 Rendering contract
- `renderGrid()` (`script.js:15`) builds all cards from `PRODUCTS` **before** any other binding runs, so filters/search/wishlist/cart attach to real nodes.
- `PRICE_COMPARISON` (`script.js:5`) is derived, never hand-edited: `{ name → { query, sites } }`.
- `renderCompareBoxes()` (`script.js:855`) injects best-deal line + toggle + sorted rows per card.
- `sortProducts(mode)` (`script.js:911`) re-appends cards in order; Featured = reload.

### 4.3 Cart rules
- In-memory `cart` array (`script.js:185`); item = `{ name, price, quantity }`; same-name adds bump quantity.
- Badge = total quantity; total formatted `toLocaleString("en-IN")`; `removeItem(index)` (`script.js:389`) splices + re-renders.
- Checkout with empty cart → alert, no modal. BUY NOW replaces cart with single item then opens the order modal.

### 4.4 Checkout fields (all required)
Full name (text) · Date of birth (date) · Contact no (tel, `+91` placeholder) · Email ID (email) · Full address (textarea). Submit → `mailto:norevclothing@gmail.com?subject=New Order Request&body=…` with customer block + item lines + total.

### 4.5 Contact states
`Sending…` → success (`Enquiry sent!…` + reset) → failure fallback (email app + "press Send" instruction). Empty name/email/message blocked with inline message. Delivery via `POST https://formsubmit.co/ajax/norevclothing@gmail.com` (`_captcha: false`); **requires one-time inbox activation**.

### 4.6 Auth rules (demo-grade, device-local)
- Store: `localStorage["norev_users"]` = `{ email → { name, hash } }`; session: `localStorage["norev_session"]` = email.
- Passwords stored as cyrb53-style hash (`hashPw`, `script.js:731`) — **not production security**; documented in UI code comments.
- Navbar 👤 button shows first name when logged in; account view shows `Name (email)` + Log out.
- All bindings null-guarded so auth can never break compare/sort below it.

### 4.7 Edge cases
- `products.js` fails to load → grid empty; filters operate on empty set (degraded but not crashed).
- Product `category` typo → card invisible under every filter except All (owner must match enum).
- Visitor without email app → contact fallback message explains; checkout still opens mailto (known MVP limit).
- Very long product names → card layout wraps; prices stay aligned (grid rows independent).

---

## 5. Metrics & Targets
- M-1: Enquiry delivery success (inbox receipts / submits) — target 100% post-activation.
- M-2: Zero JS console errors across load → filter → cart → checkout → contact → auth flows.
- M-3: 21/21 images HTTP 200; 63/63 View links open correct searches.
- M-4: Time-to-add-product (owner, `products.js` only) — target < 10 min.
- M-5: Mobile usability pass at 360px (nav, grid 1-col, modals, footer).

## 6. Constraints
- Static hosting only; no server code, no secrets in repo.
- No marketplace scraping (ToS + bot protection) — samples maintained by hand.
- `mailto:` checkout depends on the visitor's email app (accepted MVP limit).

## 7. Glossary
**Best deal** = lowest price across the 4 compare rows. **Sample price** = hand-maintained marketplace figure, not live data. **View link** = outbound marketplace search URL (no affiliate IDs).

## 8. Open Questions
1. Payments in MVP v1 (Razorpay) or stay email-orders?
2. Price-update owner + cadence (monthly + festive sales proposed)?
3. Real brand names vs NOREV sub-brands on listings?
4. Keep demo auth or connect Firebase/Supabase now?
