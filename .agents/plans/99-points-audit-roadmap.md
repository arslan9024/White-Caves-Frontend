# White Caves Ecosystem — 99-Point Architectural Audit, Gap Analysis & Implementation Roadmap

> **Authority:** Aegis Sterling (`TURING-LAW-000`, `TURING-ROOT-007`, `AEG-001`–`AEG-042`)  
> **Scope:** `White-Caves-Server`, `White-Caves-Frontend`, `whatsapp-bot-linda`, `White-Caves-Web`, `Aegis-Sterling`  
> **Date:** 2026-11-15

---

## Executive Summary & Current Baseline

| Repository               | Stack                          | Port (`secrets/ports.ts`) | Current Status / Key Gaps                                                                                                                                                                                |
| :----------------------- | :----------------------------- | :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Monorepo Root**        | npm + `concurrently`           | —                         | `package.json` has `dev:all`, `dev:trio`, `aegis:*`. `secrets/ports.ts` implements `--check` & `--kill`. Missing unified `clean:cache`, `health:all`, and shared `@white-caves/types` workspace linking. |
| **White-Caves-Server**   | Express + Prisma + MongoDB     | `5001`                    | Needs `/health/live` & `/health/ready` standardization, 1500ms gov API timeouts (`AEG-011`), DLD/Ejari idempotency keys (`AEG-012`), PII masking, and sub-router modularization (`< 350` lines).         |
| **White-Caves-Frontend** | React + Vite + RTK + Tailwind  | `3000`                    | Active CRM (`LindaWhatsAppCRM` panes, `inventoryIndex.ts` in progress). Needs `clean:cache` script, strict `tsc --noEmit` zero-error gate, `any` elimination, and chunking for Three.js/Maps.            |
| **whatsapp-bot-linda**   | Node + Baileys/WWebJS + Gemini | `3002` / `4000`           | Port registry uses `3002` (webhook) & `4000` (UI) vs target `3200`. Needs AES-256-GCM session encryption, Redis deduplication, and 08:00 GST daily briefing.                                             |
| **White-Caves-Web**      | Next.js (App Router)           | `3001`                    | Needs RSC property feeds, ISR community guides, JSON-LD `RealEstateListing`, `/ar/` & `/en/` slug routing, and Lighthouse 95+ optimization.                                                              |
| **Aegis-Sterling**       | Sovereign AI Engine            | `3333`                    | `.agents/` control plane active. Needs `aegis-engine.js` path alignment from sub-repos, `<= 8,000` token budget enforcement, and continuous Book of White Caves sync.                                    |

---

## Phased Implementation Roadmap (99 Points)

### Wave 1 — Monorepo & Orchestration Foundation (Points 1–15) — **P0 (Immediate)**

- **Done / Existing:**
  - `secrets/ports.ts` (`--check`, `--kill`, `--env`) — covers Point 5 & Point 10.
  - Monorepo `dev:all`, `dev:trio`, `dev:web-aegis` in `White-Caves/package.json` — covers Point 7.
  - `.agents/` canonical plane (`TURING-ROOT-007`) — covers Point 14.
- **Immediate Actions:**
  - **Point 9:** Add deterministic `clean:cache` script to `White-Caves-Frontend/package.json` (cleans `.vite`, `dist`, `*.tsbuildinfo`).
  - **Point 3:** Standardize `/health/live` and `/health/ready` JSON contract across all 5 services.
  - **Point 1 & 4:** Add `workspaces` + `@white-caves/types` shared DLD/Ejari/CRM contract package.
  - **Point 2:** Centralize `secrets/.env` loader with zero-leak validation.

### Wave 2 — White-Caves-Server Backend & Prisma Engine (Points 16–35) — **P0/P1**

- **P0 Security & Compliance:**
  - **Point 18–20:** JWT rotation/blacklist, PII auto-masking (Emirates ID, Passport, IBAN), and idempotent DLD/Ejari mutation keys (`AEG-012`).
  - **Point 24:** 1,500ms `AbortSignal.timeout(1500)` wrapper for UAE gov/bank APIs (`AEG-011`).
  - **Point 32 & 34:** `x-white-caves-internal` mutual header guard + graceful `SIGTERM`/`SIGINT` Prisma disconnect.
- **P1 Performance & Modularity:**
  - **Point 16–17, 33:** Prisma pool tuning, Redis rate limiting, TTL cache for market/pipeline aggregations.
  - **Point 26, 29–31:** Pino JSON logging with correlation IDs, webhook DLQ, `< 350`-line domain sub-routers, deal/commission audit ledger.

### Wave 3 — White-Caves-Frontend CRM & UI/UX (Points 36–55) — **P0/P1**

- **P0 Stability & Architecture:**
  - **Point 36, 45:** `TURING-NAV-TREE-009` hierarchical tree-state navigation + leaf-task return without full-page reload.
  - **Point 40:** Virtualized `LindaChatListPane` & `LindaChatThreadPane` (currently active in working tree).
  - **Point 43 & 46:** Type-safe `TaxFilingWizard` (5% UAE VAT / 9% Corporate Tax) and systematic `any` removal.
- **P1 Performance & UX:**
  - **Point 37, 53, 55:** Rollup manualChunks for Three.js/Canvas/Maps, `React.Suspense` for charts, bundle visualizer gate.
  - **Point 38, 41, 49:** RTL `dir="rtl"` verification (`AEG-008`), `#EF4444` zero-runtime CSS tokens, Level 5 RBAC gating.

### Wave 4 — Linda WhatsApp Bot Core (Points 56–70) — **P1**

- **Point 56–57, 62, 67:** Multi-device session isolation, humanized jittered pacing, dead-man switch relink, AES-256-GCM session encryption.
- **Point 59–61, 64, 66, 68:** Gemini 2.5 Flash intent recognition, VIP urgency flags, RERA disclaimers, Redis message deduplication, 08:00 GST daily briefing.

### Wave 5 — White-Caves-Web Next.js Portal (Points 71–85) — **P1/P2**

- **Point 71–75, 85:** RSC property feeds, ISR community guides, WebP/AVIF `next/image`, `RealEstateListing` JSON-LD, dynamic XML/RSS sitemap.
- **Point 76–83:** Mortgage/payment plan simulator, live currency converter (AED/USD/EUR/GBP/INR), `/ar/` & `/en/` slug routing, Turnstile bot protection.

### Wave 6 — Aegis-Sterling & Living Book (Points 86–99) — **Continuous**

- **Point 86–88, 95–97:** Keep Book of White Caves synchronized, enforce `SIDDHĀNTA-001`–`003`, ERMS/TMS/DMS separation, and `<= 8,000` token budget per task.
