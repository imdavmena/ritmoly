# ✅ RITTMOLY — What’s Missing (Optimal Order) — Theme DONE
---

## 1) 🧩 Enforce Design System Usage (Avoid Styling Drift)

**Goal:** All pages must be composed from atoms/molecules (no ad-hoc Tailwind everywhere).

### Atoms quality pass
- [ ] Button: primary / secondary / ghost / danger / loading / disabled (consistent states)
- [ ] Input + PasswordInput: label style, focus ring, error state, helper text
- [ ] Card: consistent surface/border/radius usage
- [ ] Modal: overlay + surface container + close behavior (ESC/click outside)
- [ ] Toast: variants + stacking + auto-dismiss
- [ ] Tabs, Dropdown, Toggle, ProgressBar, Spinner: consistent visual language

### Molecules quality pass
- [ ] Navbar + Footer consistent across layouts
- [ ] PricingCards must consume `/api/plans` (no hardcoded pricing)
- [ ] UploadDropzone: surface + dashed border + focus/drag states
- [ ] PlaylistTable: row hover, empty state, loading state
- [ ] AuthForm: reuse across login/register/reset screens
- [ ] ErrorBanner + EmptyState: consistent patterns and copy

**DoD:** Pages are mostly composition of reusable components.

---

## 2) 🎛️ User Flow End-to-End (Core MVP Demo Path)

**Goal:** Upload → Generate → View playlist works fully and persists in MongoDB.

### 2.1 Upload (metadata only)
- [ ] Implement `/api/upload/create` (or equivalent):
  - validate file type/size (mp3/wav/mp4)
  - create Upload record in Mongo
  - return `upload_id` + placeholder storage key
- [ ] Wire `/app/upload` UI to the endpoint
- [ ] Ensure rule: **never store raw audio in Mongo**

**DoD:** Upload step creates a Mongo Upload record and returns upload_id.

### 2.2 Playlist generation API
- [ ] Implement `POST /api/playlist/generate`:
  - validate input
  - check quota via `QuotaService`
  - call `PlaylistGeneratorService`
  - store playlist in Mongo (`user_id`, `upload_id`)
  - return playlist id + JSON payload

**DoD:** Generate returns a playlist and saves it in DB.

### 2.3 Playlist pages
- [ ] `/app/playlists`:
  - list playlists by user
  - empty/loading/error states
- [ ] `/app/playlists/[id]`:
  - show title, bpm_range
  - sections: Warmup/Build/Peak/Closing
  - tracks:
    - reason, mix_note
    - platform links (Spotify/Beatport/SoundCloud/YouTube)
    - preview_url nullable

**DoD:** You can generate playlists and browse them after refresh.

---

## 3) 📦 Plans (Admin-managed, No Hardcoding)

**Goal:** Plans are data-driven and used by both pricing and quota.

- [ ] Implement `GET /api/plans` public
- [ ] Implement Admin CRUD endpoints for plans:
  - create/update/delete
  - reorder via `sort_order`
  - toggle `is_active` / `is_featured`
- [ ] Update landing pricing section to load from `/api/plans`
- [ ] Ensure `QuotaService` reads plan limits from DB

**DoD:** Editing a plan in admin updates pricing and quota automatically.

---

## 4) 💳 Billing (Binance Only) — MVP Operational

**Goal:** Monetization works, even if approval is manual initially.

- [ ] `/app/billing` UI:
  - Binance Pay button (placeholder until merchant integration)
  - USDT BEP20 wallet section
  - QR code for wallet
  - tx_hash input + submit
- [ ] Implement `POST /api/billing/checkout`:
  - create `payments` record (pending)
- [ ] Implement `POST /api/billing/verify-wallet`:
  - accept tx_hash
  - keep pending until admin confirms
- [ ] Implement `POST /api/billing/webhook`:
  - placeholder validation + mark confirmed when Binance Pay integrated
- [ ] Connect “confirmed payment” → assign plan to user → quota increases

**DoD:** Payment pending → admin confirms → user plan upgrades and quota increases.

---

## 5) 🛠️ Admin Dashboard (Operate the SaaS)

**Goal:** Operate without manual DB editing.

- [ ] `/admin/dashboard` stats:
  - total users
  - active sessions
  - uploads count
  - playlists generated
  - payments (pending/confirmed)
  - active plans
- [ ] `/admin/plans` UI:
  - CRUD + sorting + featured toggle
- [ ] `/admin/payments` UI:
  - list pending
  - approve/reject
  - on approve: confirm payment + attach plan to user

**DoD:** Admin can manage plans and approve payments entirely via UI.

---

## 6) 🌍 SEO Finalization + Public Pages Polish

**Goal:** Make marketing pages production-ready.

- [ ] sitemap.xml (static or endpoint)
- [ ] robots.txt
- [ ] OpenGraph + Twitter meta per page
- [ ] Confirm JSON-LD is accurate (SoftwareApplication)
- [ ] i18n: EN default + ES fallback + clean switch behavior

**DoD:** Landing is indexable + shareable with rich previews.

---

## 7) 🧪 QA & Hardening

- [ ] Form validation consistency (client + server)
- [ ] Loading states (spinner/skeleton)
- [ ] Empty states everywhere
- [ ] Error handling coverage (toast + banners)
- [ ] Mobile responsiveness pass (landing + app + admin)
- [ ] Remove dead code + TODO cleanup
- [ ] Basic rate limiting on critical endpoints (optional)

**DoD:** MVP is stable, cohesive, and demo-ready.

---

# 🎯 Final MVP Definition of Done

User can:
- [ ] Register / verify / login
- [ ] Upload track metadata
- [ ] Generate playlists with AI
- [ ] View playlists list + detail
- [ ] See pricing from DB
- [ ] Submit payment via Binance methods
- [ ] Get upgraded plan after admin approval

Admin can:
- [ ] See dashboard metrics
- [ ] CRUD plans
- [ ] Approve payments

✅ When all checked: RITTMOLY MVP is complete.
