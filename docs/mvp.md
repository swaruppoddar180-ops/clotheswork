# NOREV — MVP Definition

**Version:** 1.0 (draft) · **Date:** 2026-09-27

## 1. MVP Statement
A fast, mobile-friendly storefront that lets shoppers discover 21 NOREV products, compare sample prices across marketplaces, and send enquiries/orders to the owner's Gmail — with zero backend cost.

## 2. MVP Scope — Status

### ✅ Built (MVP v0, live locally)
- [x] 21-product catalog in `products.js` (6 categories, ratings, tags, verified images)
- [x] Filters + search + sort (Featured / Our price / Best deal)
- [x] Per-product compare box (Store vs Amazon/Flipkart/Myntra, best-deal badge, card + festive offers, View links)
- [x] Cart drawer with totals + checkout modal → order email
- [x] Contact form → inbox delivery (FormSubmit AJAX + mailto fallback)
- [x] Sign-up / log-in / log-out modal (device-local demo)
- [x] Logo + wordmark, dark/light mode, responsive, About section
- [x] Owner inbox set to `norevclothing@gmail.com` everywhere

### ⬜ Remaining for sellable MVP (MVP v1)
- [ ] FormSubmit activation clicked in `norevclothing@gmail.com` inbox (5 min, owner task)
- [ ] Deploy static files to Vercel/Netlify + confirm contact + compare links in production
- [ ] Replace demo-auth disclaimer (or connect Firebase/Supabase if accounts matter)
- [ ] Owner routine: update sample prices/offers in `products.js` (define cadence, e.g. monthly + festive sales)
- [ ] Decision: payments now (→ Phase 2, Razorpay) or email-orders suffice

### ❌ Explicitly NOT in MVP
Live price APIs, UPI checkout, order tracking, inventory, admin panel, cross-device accounts.

## 3. Acceptance Criteria (MVP v1)
- AC-1: Test enquiry from production URL lands in `norevclothing@gmail.com`.
- AC-2: Test checkout email contains product, qty, total, name, phone, address.
- AC-3: All 21 images + 63 outbound View links resolve.
- AC-4: Filters, search, sort, cart, compare, auth all work on a 360px mobile screen with no console errors.
- AC-5: New product addable by editing only `products.js` (verified by adding one test item).

## 4. Phased Roadmap
- **Phase 0 (done):** static catalog + email flows + demo auth.
- **Phase 1 (MVP v1):** activate inbox, deploy, price-update routine.
- **Phase 2:** backend + Razorpay + real auth + order dashboard.
