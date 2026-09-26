# NOREV — Workflows

**Version:** 1.0 (draft) · **Date:** 2026-09-27

## 1. Development Workflow (code changes)
1. Edit `index.html` / `style.css` / `script.js` / `products.js` (small, single-purpose edits).
2. Syntax check: `node --check script.js` (+ `products.js`).
3. Serve: static server on `:8000`; smoke test with HTTP checks:
   - page serves 200; `products.js`, `logo.png` serve 200;
   - new markup/strings present in served HTML/JS;
   - all new image URLs return HTTP 200 (batch-check before committing to them).
4. Regression pass: grid renders 21 cards; filter × search × sort; cart add/remove/total; checkout modal; contact submit status; signup → login → logout.
5. Commit/push (repo: `swaruppoddar180-ops/clotheswork`).

## 2. Content Workflow — Add / Edit a Product (owner-safe)
1. Open `products.js`; copy an existing product block.
2. Set: `id` (unique slug), `name`, `brand`, `category` (tshirt|shirt|cargo|underwear|hoodie|jacket), `catLabel`, `price`, `mrp`, `tag`/`rating`, `img` (Unsplash URL — **verify HTTP 200 first**), `query` (search words).
3. Fill 4 `S(...)` site rows: Store + Amazon + Flipkart + Myntra (price, mrp, card offer, festive offer, search URL via `AMZ()/FLP()/MYN()` helpers).
4. Reload page: card appears with compare box, best-deal badge, sorting support — no other file touched.

## 3. Price & Offer Update Workflow
1. Survey Amazon/Flipkart/Myntra for each product's current price + visible card/festive offers.
2. Update the matching `S(...)` rows in `products.js`; best-deal badge and sort recompute automatically.
3. Recommended cadence: monthly + major sales (Diwali, Big Billion Days, End of Season).

## 4. Order Workflow (current, email-based)
1. Shopper: cart → CHECKOUT → fills details → Place order → email opens pre-filled to `norevclothing@gmail.com` → sends.
2. Owner: reads order in Gmail → confirms on phone/email → ships → replies with tracking.
3. No server record exists — Gmail IS the order book (label/filter orders).

## 5. Enquiry Workflow (current)
1. Shopper: Contact form → Sending… → delivered to inbox (post-activation) or email-app fallback.
2. Owner: reply within 24h (promise shown in UI status text).
3. One-time setup: click FormSubmit activation email in `norevclothing@gmail.com` (re-do if address ever changes).

## 6. Release Checklist (deploy)
- [ ] `node --check` passes; smoke tests green
- [ ] 21/21 images 200; View links spot-checked
- [ ] Contact + checkout test emails received
- [ ] Mobile 360px pass (nav, grid, modals, footer)
- [ ] No secrets in files; inbox address correct everywhere
