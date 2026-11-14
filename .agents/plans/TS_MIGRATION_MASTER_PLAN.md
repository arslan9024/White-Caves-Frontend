# AEGIS V5.0 — White Caves TypeScript Migration Master Plan

> **Codename:** `OPERATION TITANIUM`  
> **Classification:** Strategic Infrastructure Upgrade  
> **Author:** Aegis Sterling (TURING-LAW-000 Compliant)  
> **Date:** 2026-11-14  
> **Status:** 🟡 AWAITING APPROVAL  
> **Governing Laws:** TURING-LAW-000, TURING-ROOT-007, TURING-DEV-SERVER-BAN-013, TURING-SHELL-015, AEG-022/023 (Strict tsc --noEmit)

---

## 0. Executive Summary

Migrate **1,627 JavaScript files** across 3 repositories to strict TypeScript in **5 Phases / 21 Waves**, achieving **100% TypeScript** across the White Caves ecosystem.

| Metric                | Current                        | Target                                |
| --------------------- | ------------------------------ | ------------------------------------- |
| Ecosystem TS Coverage | 67.7% (5,048 TS / 7,458 total) | **100%**                              |
| Compile-Time Safety   | Partial (Frontend only)        | **Full strict mode all repos**        |
| Estimated Total Waves | —                              | **21 waves**                          |
| Files to Convert      | —                              | **1,627**                             |
| Files to Skip         | —                              | **557** (archives, .agents/, configs) |

---

## Phase 1 — Frontend Completion (107 files → 3 Waves)

**Goal:** Bring White-Caves-Frontend from **92.4% → 100% TypeScript**.  
**Prerequisites:** ✅ Already has `tsconfig.json` (strict: true, target: ESNext), TypeScript 5.2 installed.  
**Verification:** `npx tsc --noEmit` after each wave.

### Wave 1.1 — Barrel Re-exports + Static Data (17 files)

**Method:** Zero-token deterministic script (TURING-LAW-000 Rule 4)  
Rename `.js` → `.ts`, fix any import paths. These are trivial re-exports and frozen data objects.

| Category                     | Count | Files                                                               |
| ---------------------------- | ----: | ------------------------------------------------------------------- |
| `index.js` barrel re-exports |    15 | `src/components/*/index.js`, `src/components/layout/index.js`, etc. |
| `.data.js` static data       |     2 | `AgentListingForm.data.js`, `ArcherCRM.data.js`                     |

### Wave 1.2 — Redux Store + Hooks + Utils (44 files)

**Method:** Batch rename → type annotation per file → `tsc --noEmit`.  
These are pure logic files with no JSX — straightforward `.js` → `.ts` conversion.

| Category                    | Count | Key Files                                                             |
| --------------------------- | ----: | --------------------------------------------------------------------- |
| `store/slices/*.js`         |    13 | `leadsSlice`, `kycAmlSlice`, `crmViewSlice`, `landlordSlice`, etc.    |
| `store/*.js`                |     3 | `appSlice`, `contentSlice`, `store.js` (root)                         |
| `store/thunks/*.js`         |     1 | `relationalSidebarThunks.js`                                          |
| `hooks/*.js`                |     5 | `useDarkMode`, `useDashboardData`, `usePWA`, etc.                     |
| `utils/*.js`                |     9 | `validators`, `cacheUtils`, `sessionManager`, `phoneNumberNormalizer` |
| `config/*.js`               |     7 | `assistants`, `navigationMap`, `superAdmin`, `databaseConfig`         |
| `styles/design-tokens/*.js` |     5 | `colors`, `typography`, `animations`, `spacing-shadows`               |
| `redux/slices/*.js`         |     1 | `relationalSidebarSlice`                                              |

### Wave 1.3 — Services + Adapters + Data + Tests (46 files)

**Method:** Add typed interfaces for API return shapes, adapter contracts, and service methods.

| Category            | Count | Key Files                                                                                         |
| ------------------- | ----: | ------------------------------------------------------------------------------------------------- |
| `services/*.js`     |    14 | `CRMDataService`, `LeadScoringEngine`, `DynamicPricingEngine`, `ComplianceValidationService`      |
| `adapters/*.js`     |     5 | `BayutAdapter`, `DubizzleAdapter`, `PropertyFinderAdapter`, `SkyloovAdapter`, `BasePortalAdapter` |
| `data/**/*.js`      |    10 | `orgStructure`, `employees`, `aiAssistantsRegistry`, `zoeKnowledgeBase`                           |
| `.test.js` files    |    14 | Convert alongside their source modules                                                            |
| `assets/*.js`       |     1 | `flowchartsData.js`                                                                               |
| Non-src convertible |     2 | `tests/load/k6-property-search.js`, `public/custom-sw.js`                                         |

**Wave 1 EXIT GATE:** `npx tsc --noEmit` passes with zero errors. Frontend = **100% TypeScript** ✅

---

## Phase 2 — Server Legacy Migration (837 files → 8 Waves)

**Goal:** Bring White-Caves-Server `server/` directory from **0% → 100% TypeScript**.  
**Prerequisites:** ✅ Already has `tsconfig.json` (strict: true), TypeScript 5.2 installed. The `src/` directory is already 50/50 TS.  
**Strategy:** Bottom-up — models first (typed schemas), then utils/constants, then routes, then services (largest batch).

### Wave 2.1 — Foundation: Models (68 files)

Convert all Mongoose/Prisma models to typed schemas with exported interfaces.

| Category             | Count | Examples                                                                                    |
| -------------------- | ----: | ------------------------------------------------------------------------------------------- |
| `server/models/*.js` |    68 | `Agent.js`, `Commission.js`, `Property.js`, `Transaction.js`, `Lead.js`, `EjariContract.js` |

**Deliverable:** Every model exports a `I{ModelName}` interface + typed Mongoose `Document` type.

### Wave 2.2 — Utils, Constants, Data, Seeds, Lib (15 files)

Small, low-dependency files — easy batch conversion.

| Category                | Count |
| ----------------------- | ----: |
| `server/utils/*.js`     |     5 |
| `server/data/*.js`      |     4 |
| `server/lib/*.js`       |     4 |
| `server/constants/*.js` |     1 |
| `server/seeds/*.js`     |     1 |

### Wave 2.3 — Routes (53 JS files from ~279 total)

53 route files are still `.js` (the rest are already `.ts`). Convert with typed `Request`/`Response` generics.

| Pattern              | Count |
| -------------------- | ----: |
| `server/routes/*.js` |    53 |

**Deliverable:** All Express route handlers use typed request bodies, params, and response shapes.

### Waves 2.4–2.8 — Services (694 files, ~140/wave)

The largest single payload. Split into 5 sub-waves by domain clustering:

| Wave    | Domain Cluster            | ~Files | Examples                                                                     |
| ------- | ------------------------- | -----: | ---------------------------------------------------------------------------- |
| **2.4** | Financial & Commission    |   ~140 | `CommissionService`, `VATCalculator`, `EscrowService`, `InvoiceService`      |
| **2.5** | CRM & Lead Management     |   ~140 | `LeadScoringService`, `ContactService`, `CRMDataService`, `FilterService`    |
| **2.6** | Property & Listing        |   ~140 | `PropertyService`, `ListingService`, `PortalSyncService`, `ValuationService` |
| **2.7** | Compliance & Legal        |   ~140 | `EjariService`, `DLDService`, `KYCService`, `NOCService`, `RERAService`      |
| **2.8** | AI, Analytics & Remaining |   ~134 | `ChatAnalyzer`, `AnalyticsService`, `ConversationBatchProcessor`, remaining  |

**Wave 2 EXIT GATE:** `npx tsc --noEmit` on White-Caves-Server passes. Server = **100% TypeScript** ✅

---

## Phase 3 — Linda Bot Bootstrap (Setup → 1 Wave)

**Goal:** Install TypeScript toolchain and create `tsconfig.json` for whatsapp-bot-linda.  
**Prerequisites:** Currently **zero TS infrastructure**. Must bootstrap from scratch.

### Wave 3.0 — TypeScript Bootstrap

1. `npm install --save-dev typescript @types/node` in whatsapp-bot-linda
2. Create `tsconfig.json`:
   ```json
   {
     "compilerOptions": {
       "strict": true,
       "target": "ES2022",
       "module": "NodeNext",
       "moduleResolution": "NodeNext",
       "outDir": "./dist",
       "rootDir": "./src",
       "esModuleInterop": true,
       "resolveJsonModule": true,
       "declaration": true,
       "skipLibCheck": true,
       "forceConsistentCasingInFileNames": true,
       "allowJs": true,
       "checkJs": false
     },
     "include": ["src/**/*"],
     "exclude": ["node_modules", "dist", "archive"]
   }
   ```
3. Set `allowJs: true` initially so existing JS continues to compile alongside new TS
4. Verify: `npx tsc --noEmit` passes (with `allowJs` it will, since `checkJs` is false)

---

## Phase 4 — Linda Core Migration (683 files → 9 Waves)

**Goal:** Bring whatsapp-bot-linda from **0.2% → 100% TypeScript**.  
**Strategy:** Inside-out — core/shared first, then domain modules, then intelligence last (most complex).

### Wave 4.1 — Core Infrastructure (41 files)

Foundation that everything imports from.

| Category      | Count | Key Files                                                               |
| ------------- | ----: | ----------------------------------------------------------------------- |
| `core/`       |    37 | `ServiceRegistry`, `Logger`, `EnvFile`, `BotBootstrap`, `ConfigManager` |
| `shared/`     |     1 | Shared utilities                                                        |
| `middleware/` |     3 | Express middleware                                                      |

**Deliverable:** `ServiceRegistry` exports typed `get<T>()` generics. `Logger` fully typed.

### Wave 4.2 — Anti-Ban + Sessions + Security (33 files)

Well-structured, pure-logic modules with clear inputs/outputs.

| Category    | Count | Key Files                                                                                       |
| ----------- | ----: | ----------------------------------------------------------------------------------------------- |
| `anti-ban/` |    13 | `AccountWarmupScheduler`, `TypingStateGuard`, `ReadReceiptScheduler`, `GaussianJitterScheduler` |
| `sessions/` |    10 | Session persistence, recovery, state managers                                                   |
| `security/` |    10 | Auth, encryption, rate limiting                                                                 |

### Wave 4.3 — Database + API + Analytics (72 files)

| Category     | Count |
| ------------ | ----: |
| `database/`  |    43 |
| `api/`       |    21 |
| `analytics/` |     8 |

### Wave 4.4 — Accounts + Connection + Linking (60 files)

Multi-account management, connection monitoring, device linking.

| Category      | Count |
| ------------- | ----: |
| `accounts/`   |    21 |
| `connection/` |    24 |
| `linking/`    |    15 |

### Wave 4.5 — WhatsApp + Commands (46 files)

WhatsApp client wrappers, command bridge, message routing.

| Category    | Count |
| ----------- | ----: |
| `whatsapp/` |    39 |
| `commands/` |     7 |

### Wave 4.6 — Outreach + Campaigns (79 files)

Campaign execution, dispatch pools, broadcast lists, intent classification.

| Category     | Count |
| ------------ | ----: |
| `outreach/`  |    67 |
| `campaigns/` |    12 |

### Wave 4.7 — Integrations + Services (58 files)

External API wrappers (Google Sheets, Firebase), business services.

| Category        | Count |
| --------------- | ----: |
| `integrations/` |    40 |
| `services/`     |    18 |

### Wave 4.8 — Domain Modules (160 files)

Specialized domain modules (community, economics, ERP, spatial, wealth, etc.)

| Category       | Count |
| -------------- | ----: |
| `community/`   |    20 |
| `devops/`      |    20 |
| `economics/`   |    20 |
| `erp/`         |    20 |
| `evolution/`   |    20 |
| `omnichannel/` |    20 |
| `spatial/`     |    20 |
| `wealth/`      |    20 |

### Wave 4.9 — Intelligence + Mesh (123 files)

Most complex: AI services, Gemini SDK, multi-model LLM gateway, conversation analysis.

| Category        | Count |
| --------------- | ----: |
| `intelligence/` |   103 |
| `mesh/`         |    20 |

**Wave 4 EXIT GATE:** `npx tsc --noEmit` on whatsapp-bot-linda passes with strict mode. Linda = **100% TypeScript** ✅

---

## Phase 5 — Final Hardening (1 Wave)

### Wave 5.1 — Ecosystem-Wide Strict Lockdown

1. Remove `allowJs: true` from all `tsconfig.json` files
2. Set `"checkJs": false` → confirm no `.js` remains in `src/`
3. Run `npx tsc --noEmit` across **all 3 repos** — zero errors
4. Update `package.json` scripts: add `"typecheck": "tsc --noEmit"` to all repos
5. Add pre-commit hook: `npx tsc --noEmit` guard (Husky)
6. Update `.agents/book-white-caves/` chronicler with migration completion chapter
7. Final commit: `feat(ecosystem): achieve 100% TypeScript across White Caves monorepo`

---

## Execution Rules (AEGIS V5.0 Compliance)

| Rule                          | Enforcement                                                                               |
| ----------------------------- | ----------------------------------------------------------------------------------------- |
| **TURING-LAW-000 §1**         | All file renames batched in parallel per wave (zero sequential turns for trivial renames) |
| **TURING-LAW-000 §3**         | Verify with `npx tsc --noEmit` per wave (single targeted check, NOT full build)           |
| **TURING-LAW-000 §4**         | Use deterministic Node/PowerShell scripts for batch renames and import path updates       |
| **TURING-DEV-SERVER-BAN-013** | No `npm run dev` or `vite` inside agent sessions — verification only                      |
| **TURING-SHELL-015**          | No `head`, no recursive `Get-ChildItem` on large dirs, `git grep -n` before reads         |
| **AEG-022**                   | `tsc --noEmit` is the mandatory gate — every wave must pass before merge                  |
| **AEG-042**                   | `< 350 lines` per file — if conversion reveals oversized files, split first               |

---

## Risk Register

| Risk                                       | Mitigation                                                                                                              |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| Breaking runtime behavior during rename    | `allowJs: true` bridge — convert incrementally, never big-bang                                                          |
| Import path `.js` → `.ts` extension issues | ESM `moduleResolution: NodeNext` requires `.js` extensions in imports even for `.ts` files — no import rewriting needed |
| Third-party `@types/*` missing             | Install `@types/node`, `@types/express`; for whatsapp-web.js use `declare module` shims                                 |
| 694 server services is a large batch       | Split into 5 domain-clustered sub-waves (~140/wave)                                                                     |
| Linda has no existing type infrastructure  | Phase 3 bootstrap wave handles this before any conversion begins                                                        |
| Concurrent chat workspace safety           | Per TURING-LAW-000 §6 — no `node_modules` wipes, no `git reset --hard`                                                  |

---

## Success Criteria

- [ ] `npx tsc --noEmit` passes in all 3 repos with `strict: true`
- [ ] Zero `.js` files remain in any `src/` or `server/` directory
- [ ] All existing tests continue to pass (`npm test` / `node --test`)
- [ ] Doctor checks pass: `node tools/doctor.js` (Linda)
- [ ] No runtime behavioral regressions
- [ ] `.agents/book-white-caves/` updated with OPERATION TITANIUM completion chapter
