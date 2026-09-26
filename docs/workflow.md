# NOREV — Workflows

**Version:** 2.0 (detailed) · **Date:** 2026-09-27

## 0. Environment Cheatsheet
- Repo: `…\clotheswork`, branch `main`, remote `origin` (HTTPS GitHub).
- Git is **not** on PATH — use `& "C:\Program Files\Git\cmd\git.exe" …`.
- Serve: `npx --yes serve -l 8000` (background) → `http://localhost:8000`.
- Push needs auth: if `push` fails, run `gh auth login` or set a PAT credential, then retry. Use `GIT_TERMINAL_PROMPT=0` to fail fast instead of hanging.

## 1. Development Workflow (code changes)
1. **Edit small.** One purpose per edit; prefer the `edit` tool with minimal `oldString`; for multi-line replacements verify omitted lines aren't deletions.
2. **Syntax check.** `node --check script.js` (and `products.js` if touched) — must print no errors.
3. **Serve + smoke test** (examples; adapt strings per change):
   ```powershell
   curl.exe -s http://localhost:8000/ | Select-String -Pattern "sortSelect|authModal|contactStatus"
   curl.exe -s -o NUL -w "products.js HTTP %{http_code}" http://localhost:8000/products.js
   curl.exe -s -o NUL -w "logo.png HTTP %{http_code}" http://localhost:8000/logo.png
   ```
4. **Regression pass** (manual, ~5 min): 21 cards render → filter each category → search "hoodie" → sort both modes → add/remove cart → open/close checkout → contact empty-submit (blocked) → signup → reload (still logged in) → logout. Console: 0 errors.
5. **Commit + push.**
   ```powershell
   & "C:\Program Files\Git\cmd\git.exe" add -A
   & "C:\Program Files\Git\cmd\git.exe" commit -m "<scope>: <what + why>"
   $env:GIT_TERMINAL_PROMPT="0"
   & "C:\Program Files\Git\cmd\git.exe" push origin main
   & "C:\Program Files\Git\cmd\git.exe" status --short --branch  # must be clean, tracking origin/main
   ```

## 2. Content Workflow — Add / Edit a Product (owner-safe, `products.js` only)
1. Copy any existing block in `PRODUCTS`. Set:
   - `id`: unique slug · `name`: unique display name (used as cart/compare key — renames orphan old cart rows, acceptable).
   - `category`: exactly one of `tshirt|shirt|cargo|underwear|hoodie|jacket` (typo = card hidden under filters).
   - `price/mrp/rating/tag/catLabel/brand`.
   - `img`: Unsplash `photo-<id>?auto=format&fit=crop&w=900&q=80` — **verify first:** `curl.exe -s -o NUL -w "%{http_code}" "<url>"` must print `200` (reject 404s).
   - `query`: plain search words, e.g. `"denim jacket men"`.
   - 4× `S("Store|Amazon|Flipkart|Myntra", price, mrp, cardOffer, festiveOffer, AMZ()/FLP()/MYN(query) or "#shop")`.
2. Example skeleton:
   ```js
   {
       id: "hoodie-plain-grey", name: "Plain Grey Hoodie",
       brand: "NOREV Essentials", category: "hoodie", catLabel: "HOODIES",
       price: 1099, mrp: 1699, tag: null, rating: 4.3,
       img: IMG("photo-1556821840-3a63f95609a7"),
       query: "grey hoodie men",
       sites: [
           S("NOREV Store", 1099, 1699, "—", FIRST_ORDER, "#shop"),
           S("Amazon", 1149, 1749, "10% off HDFC Bank cards", "Diwali Sale: extra 5% off", AMZ("grey hoodie men")),
           S("Flipkart", 1049, 1649, "10% off ICICI Bank cards", "Big Billion Days: extra Rs.50 off", FLP("grey hoodie men")),
           S("Myntra", 1199, 1799, "15% off Kotak cards", "End of Season: extra 10% off", MYN("grey hoodie men"))
       ]
   },
   ```
3. Reload → card appears with rating, best-deal line, working compare/cart/sort. Nothing else to touch.

## 3. Price & Offer Update Workflow
1. Survey Amazon/Flipkart/Myntra per product; note price, MRP, visible card + festive offers.
2. Edit the matching `S(...)` rows; badge + sort recompute automatically (no logic changes).
3. Cadence: monthly + major sales (Diwali, Big Billion Days, End of Season). UI never claims "live" prices.

## 4. Order Workflow (email-based, current)
1. Shopper: cart → CHECKOUT → details → Place order → pre-filled email → Send.
2. Owner triage in Gmail: label `NOREV-ORDER`, reply confirming + payment/fulfilment details, ship, reply tracking. **Gmail is the order book** — use filters: `subject:"New Order Request"`.
3. Failure mode: visitor with no email app can't complete checkout → Phase 2 replaces with `POST /orders` + Razorpay; keep mailto as fallback.

## 5. Enquiry Workflow (current)
1. Shopper submits → `Sending…` → inbox (activated) or email-app fallback with instructions.
2. Owner replies within 24h (promise is shown in the UI — keep it).
3. Setup/maintenance: FormSubmit activation is **per address** — if the inbox ever changes, submit one test enquiry and click the new activation email (check spam).

## 6. Troubleshooting
| Symptom | Likely cause → fix |
|---|---|
| Grid empty, filters do nothing | `products.js` failed (404/JS error) → check `<script>` order + `node --check products.js` |
| New card missing under filters | `category` typo → match enum exactly |
| Contact stuck on "Sending…" | FormSubmit blocked/offline → fallback should fire; check console network tab |
| Enquiries not in inbox | Activation not clicked (or address changed) → test submit + activate |
| `git push` hangs/fails | No credentials → `gh auth login`/PAT; use `GIT_TERMINAL_PROMPT=0` to fail fast |
| `python`/`git` not recognized | Use full paths (`C:\Program Files\Git\…`); Node available, Python is not |

## 7. Release Checklist (deploy)
- [ ] `node --check` green; smoke tests green (§1.3)
- [ ] 21/21 images 200; View links spot-checked (≥10)
- [ ] Contact + checkout test emails received at `norevclothing@gmail.com`
- [ ] 360px mobile pass; 0 console errors on full regression (§1.4)
- [ ] No secrets in files; inbox address correct everywhere (`grep` old addresses = 0)
- [ ] `docs/` updated for any behavior/field/flow change; committed + pushed; `status` clean
