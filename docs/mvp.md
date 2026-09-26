# NOREV — MVP Definition

**Version:** 2.0 (detailed) · **Date:** 2026-09-27

## 1. MVP Statement
A fast, mobile-friendly storefront where shoppers discover 21 NOREV products, compare hand-maintained marketplace prices, and reach the owner by email — with zero backend cost and owner-editable data.

## 2. MVP v0 — Built (evidence)

| Area | Evidence (verify on `:8000`) |
|---|---|
| Catalog | 21 cards render from `products.js`; counts tshirt 5, cargo 4, shirt 4, jacket 4, hoodie 2, underwear 2 |
| Discovery | 6 filters + All; live search; sort Featured / Our price / Best deal |
| Trust | Compare box per card: 4 rows asc, BEST DEAL badge, MRP %, card + festive offers, 63 View links (new tabs) |
| Cart | Drawer, qty badge, `en-IN` totals, remove, empty-cart guard |
| Checkout | Modal (name, DOB, phone, email, address) → pre-filled order email to `norevclothing@gmail.com` |
| Contact | `Sending…` → inbox delivery + reset; offline fallback to email app with instructions |
| Newsletter | Name + email → personalised confirmation |
| Auth (demo) | Signup/login/logout modal; session persists; duplicate + wrong-password handled; 👤 shows first name |
| Brand/theme | `logo.png` + NOREV wordmark (nav + footer); dark default with toggle; 980/640px responsive |
| Inbox wiring | `norevclothing@gmail.com` in About, footer ×3, checkout mailto, contact AJAX + fallback (11 occurrences, 0 old-address leftovers) |

## 3. MVP v1 — Remaining (task list)

| # | Task | Owner | Effort | Done when |
|---|---|---|---|---|
| 1 | Click FormSubmit **activation email** in `norevclothing@gmail.com` (check spam) | Owner | 5 min | Test enquiry arrives in inbox (not fallback) |
| 2 | Deploy folder to Vercel/Netlify (drag-drop or `git push` connect) | Dev | 30 min | Production URL serves; logo + products.js 200 |
| 3 | Production smoke test ( §5 scripts, replace localhost) | Dev | 20 min | All AC-1…AC-5 pass on prod URL |
| 4 | Set price-update cadence (proposed: monthly + Diwali/BBD/EOSS) | Owner | decision | Date in calendar; `workflow.md §3` followed |
| 5 | Decide: payments now or email-orders suffice | Owner | decision | If payments → open Phase 2 (Razorpay) |
| 6 | Decide: keep demo auth or connect Firebase/Supabase | Owner | decision | If real auth → Phase 2 backlog item |

**Explicitly NOT v1:** live price APIs, UPI checkout, tracking, inventory, admin panel, cross-device accounts.

## 4. Acceptance Criteria + Manual Test Scripts

- **AC-1 Enquiry delivery.** Submit contact with unique subject → within 2 min it is in `norevclothing@gmail.com` (sender FormSubmit) with all 4 fields. Then disable network, submit again → email app opens pre-filled + fallback status shows.
- **AC-2 Checkout email.** Add 2× Tee (₹599) + 1× Jeans → total ₹2,997 in drawer and modal summary → submit → mailto body contains items, quantities, total, and all 5 customer fields.
- **AC-3 Links & images.** 21/21 images load (no broken icons); sample 10/63 View links → correct marketplace search page, new tab.
- **AC-4 Mobile + console.** At 360px: nav collapses to ☰ menu; grid 1-col; cart/checkout/auth modals fit; footer 1-col; devtools console has 0 errors through: load → filter ×3 → search → sort ×2 → cart add/remove → checkout open/close → contact validate → signup/login/logout.
- **AC-5 Owner edit.** Add a test product block to `products.js` (unique name) → reload → card appears with working compare toggle, best-deal line, cart buttons; then remove block.

## 5. Definition of Done (any change)
1. `node --check` passes on touched JS.
2. Served-page checks green (markup/strings present, assets 200).
3. AC-relevant manual script re-run, no console errors.
4. `docs/` updated if behavior, fields, or flows changed.
5. Committed on `main` and pushed (`status` clean, `log` shows commit above `origin/main`).

## 6. Roadmap
- **Phase 0 ✅ (done):** static catalog + email flows + demo auth + docs.
- **Phase 1 (MVP v1, next):** tasks §3 → production URL + activated inbox + price routine.
- **Phase 2 (on triggers):** Supabase/Firebase + Razorpay + order dashboard; `products.js` becomes DB seed; compare renderer and modals reused against API.
