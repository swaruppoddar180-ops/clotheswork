# NOREV — Product Requirements Document (PRD)

**Version:** 1.0 (draft) · **Date:** 2026-09-27 · **Status:** For review
**Product:** NOREV — Indian online clothing store (everyday essentials: tees, shirts, jeans, cargos, hoodies, jackets, underwear)

## 1. Problem & Goal
- **Problem:** NOREV needs a simple, fast storefront to showcase its catalog, capture enquiries/orders by email, and let shoppers compare prices — without backend cost or complexity.
- **Goal:** A mobile-friendly static site that presents 20+ products, collects enquiries directly to `norevclothing@gmail.com`, supports cart → order-by-email, and is editable by a non-developer (one data file).

## 2. Target Users
| User | Needs |
|---|---|
| Shopper (mobile-first, India) | Browse/filter/search, see honest prices + site comparisons, cart, checkout via email, contact support |
| Store owner (Swarup) | Add products, update sample prices/offers, receive enquiries + orders in Gmail inbox |

## 3. Scope — In (built)
1. **Catalog (21 products)** in `products.js` — name, brand, category, price, MRP, rating, tag, image, per-site price rows.
2. **Discovery:** category filters (T-Shirts, Shirts, Jeans & Cargoes, Underwear, Hoodies, Jackets), text search, sort (Featured / Our price / Best deal).
3. **Price comparison box** per product: NOREV Store vs Amazon / Flipkart / Myntra rows, lowest-price "BEST DEAL" badge, MRP discount %, card + festive offer text, outbound "View" search links. Data is **manually maintained samples**, not live API.
4. **Cart drawer:** add/remove, quantities, totals in INR, checkout → order-details modal.
5. **Order flow:** checkout form (name, DOB, phone, email, address) → pre-filled email to `norevclothing@gmail.com`.
6. **Contact form:** direct-to-inbox delivery via FormSubmit AJAX, mailto fallback, inline status, validation.
7. **Accounts (demo):** sign-up / log-in / log-out modal, session persists per device (localStorage).
8. **Branding/theming:** custom logo + wordmark, dark/light mode, responsive layout, About section.

## 4. Scope — Out (explicit non-goals for this phase)
- Real online payments (UPI/cards), live order tracking, inventory management.
- Live price APIs from Amazon/Flipkart (no free public API exists for frontend use).
- Cross-device accounts (needs Firebase/Supabase).
- Admin panel (editing = editing `products.js`).

## 5. Functional Requirements
- FR-1: All 21 product images must load (HTTP 200); grid renders from `products.js` only.
- FR-2: Filters + search + sort operate on rendered cards with no page reload.
- FR-3: Compare box rows sorted lowest-first; badge always on cheapest row.
- FR-4: Empty cart blocks checkout with a clear message.
- FR-5: Contact submit shows Sending → Sent/Fallback status; resets only on success.
- FR-6: Auth: duplicate email rejected, wrong password rejected, session survives reload, logout clears session.

## 6. Non-Functional Requirements
- NFR-1: Static hosting compatible (no server code); works over plain `serve`/any static host.
- NFR-2: Mobile responsive (breakpoints 980px / 640px); usable on 360px screens.
- NFR-3: No build step; edits verifiable with `node --check` + HTTP smoke test.
- NFR-4: No secrets/keys in repo (FormSubmit endpoint is address-only, no token).

## 7. Success Metrics
- Enquiry emails arriving in `norevclothing@gmail.com` (post FormSubmit activation).
- All product/compare links open correct site searches.
- Zero console-breaking JS errors on load, filter, cart, checkout, auth flows.

## 8. Risks & Mitigations
| Risk | Mitigation |
|---|---|
| Sample prices go stale | Owner updates `products.js` on a schedule; UI labels them as maintained samples |
| FormSubmit not activated | Fallback to visitor email app; owner must click one activation email |
| localStorage auth is device-local | Documented as demo; real auth deferred to Phase 2 |
| Mailto checkout depends on visitor email app | Acceptable for MVP; payments backend deferred |

## 9. Open Questions
1. UPI/payment provider choice for Phase 2 (Razorpay vs Stripe)?
2. Who updates sample prices, and how often?
3. Real brand names vs NOREV sub-brands on listings?
