<p align="center">
  <img src="static/logo.svg" alt="Ritmoly" height="84" />
</p>

<h1 align="center">Ritmoly 🎶</h1>

<p align="center">AI‑powered playlist generator and music toolkit built with SvelteKit, TypeScript, Tailwind, MongoDB, and OpenAI. ⚡️</p>

<p align="center">
  <img alt="SvelteKit" src="https://img.shields.io/badge/SvelteKit-2-ff3e00?logo=svelte&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white" />
  <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white" />
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-6-47A248?logo=mongodb&logoColor=white" />
  <img alt="pnpm" src="https://img.shields.io/badge/pnpm-8-F69220?logo=pnpm&logoColor=white" />
</p>

---

## ✨ What it does

- 🔐 Auth + sessions with secure cookies
- 🧠 AI playlist generation via OpenAI
- 💳 Billing hooks (Binance Pay + webhooks)
- 🗄️ MongoDB models for users, plans, playlists, uploads
- 🌍 i18n (en, es) and clean UI components
- 📦 Upload flow (pluggable storage provider)
- 🛠️ Admin dashboard, API routes, and Zod validation

## 🚀 Quick start

```bash
pnpm install
cp .env.example .env   # fill the values below
pnpm run dev
```

## 🔧 Environment

```dotenv
# App
APP_URL=http://localhost:5173
NODE_ENV=development

# Mongo
MONGODB_URI=mongodb://localhost:27017/rittmoly

# Auth/Sessions
SESSION_COOKIE_NAME=rm_session
SESSION_TTL_DAYS=14
PASSWORD_PEPPER=replace_me_with_long_random_string

# OpenAI (backend only)
OPENAI_API_KEY=sk-...

# Storage (placeholder)
STORAGE_PROVIDER=placeholder
STORAGE_BUCKET=rittmoly-temp
STORAGE_PUBLIC_BASE_URL=https://example.com/temp

# Binance
BINANCE_PAY_KEY=replace_me
BINANCE_PAY_WEBHOOK_SECRET=replace_me
USDT_BEP20_WALLET=0xYourWalletHere
```

## 🗂️ Scripts

- dev: vite dev
- build: vite build
- preview: vite preview
- check: svelte-check

---

Made with ❤️ for music lovers. 🎧