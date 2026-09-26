# NOREV — Modern Clothing Store

Indian clothing brand (launched 2026): everyday tees, shirts, jeans, cargos, hoodies, jackets and cotton essentials.

## Run it
Static site — no build step. Serve the folder and open it:

```sh
npx serve -l 8000
# → http://localhost:8000
```

## What's inside
| File | Purpose |
|---|---|
| `index.html` | Page structure (nav, shop, promo, about, contact, footer, cart, checkout + auth modals) |
| `style.css` | Theme (light/dark), layout, responsive styles |
| `products.js` | **Product database** — all 21 products + per-site price rows (edit this to add products) |
| `script.js` | Grid render, filters/search/sort, compare boxes, cart, checkout, contact, auth |
| `logo.png` | Brand logo |
| `docs/` | Design docs (see below) |

## Key flows
- **Shop:** filter by category, search, sort by our price or best deal; each product has a compare box (NOREV Store vs Amazon / Flipkart / Myntra sample prices, best-deal badge, card + festive offers).
- **Cart → checkout:** order details open pre-filled to `norevclothing@gmail.com`.
- **Contact:** delivers straight to `norevclothing@gmail.com` (FormSubmit — needs one-time inbox activation), mailto fallback.
- **Accounts:** demo sign-up/log-in stored per-device (localStorage).

## Design docs
- `docs/prd.md` — requirements
- `docs/architecture.md` — current + target architecture
- `docs/techstack.md` — current + recommended stack
- `docs/mvp.md` — MVP scope + acceptance criteria
- `docs/workflow.md` — dev, content, order and release workflows
