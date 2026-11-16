import type { SoftwareDocItem } from './auroraSoftwareDocs.types';

export const AURORA_SOFTWARE_DOCS_CORE: SoftwareDocItem[] = [
  {
    id: 'doc-aurora-01',
    code: 'DOC-SWE-01',
    title: 'SRS: AI Command Center & 44 Enterprise Assistants Specification',
    category: 'srs',
    phase: 'Construction (Wave 65)',
    primaryAssistant: '3.16 Aurora AI (CTO Architecture)',
    lastUpdated: '2026-08-26',
    summary: 'Functional and non-functional software requirements for all 44 specialized AI assistants across the 12 corporate floors and executive command suite.',
    tags: ['SRS', 'AI Command Center', '44 Assistants', 'Henry AI 3.19', 'Theodora AI 3.14', 'Zoe AI 3.4', 'Margaret AI 3.42', 'Ada AI 3.43', 'AEGIS AI 3.44'],
    subItems: [
      { id: 'sec-srs-1', title: '1. Functional Assistant Matrix (44 Personas)', description: 'Item codes 3.1 to 3.44, capabilities, and system specifications.' },
      { id: 'sec-srs-2', title: '2. Non-Functional Latency & Availability', description: 'Latency SLA < 250ms and 99.99% availability.' },
      { id: 'sec-srs-3', title: '3. Data Security & Isolation Rules', description: 'Role-gated payloads and client credential shielding.' },
      { id: 'sec-srs-4', title: '4. Inter-Assistant Event Protocol', description: 'Real-time telemetry and cross-assistant triggers.' },
    ],
    htmlContent: `
<div class="doc-container">
  <div class="doc-header-badge">SOFTWARE REQUIREMENTS SPECIFICATION (SRS) · ISO/IEC/IEEE 29148</div>
  <h1 class="doc-title">📋 AI Command Center & 44 Enterprise Assistants Specification</h1>
  <p class="doc-lead">
    Formal specification of system requirements governing the White Caves AI Command Center, 44 assistant dispatch protocols, and life-cycle telemetry.
  </p>

  <h2 class="doc-section-heading" id="sec-srs-1">1. Canonical 44-Assistant Functional Architecture</h2>
  <div class="doc-table-wrap">
    <table class="doc-table">
      <thead>
        <tr>
          <th>Item Code</th>
          <th>Assistant Identity</th>
          <th>Operational Domain</th>
          <th>System Specifications</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>3.4</code></td>
          <td><strong>Zoe AI</strong></td>
          <td>Executive Advisory & Governance</td>
          <td>Managing Director executive briefing desk, 12-department SLA monitoring, and DET 1388443 business hub. <a href="#assistant-zoe" class="doc-link">View Module →</a></td>
        </tr>
        <tr>
          <td><code>3.14</code></td>
          <td><strong>Theodora AI</strong></td>
          <td>Finance & Statutory Accounting</td>
          <td>67 Enterprise Reports engine, double-entry general ledger, FTA Form 201 VAT 5% audit, and Corporate Tax 9% ledger. <a href="#assistant-theodora" class="doc-link">View Module →</a></td>
        </tr>
        <tr>
          <td><code>3.15</code></td>
          <td><strong>Laila AI</strong></td>
          <td>Regulatory Compliance & AML</td>
          <td>PEP & sanctions screening, Trakheesi QR verification, goAML statutory risk scorecard, and broker audit file. <a href="#assistant-laila" class="doc-link">View Module →</a></td>
        </tr>
        <tr>
          <td><code>3.16</code></td>
          <td><strong>Aurora AI</strong></td>
          <td>CTO Architecture & APIs</td>
          <td>SRS specifications, SDD topologies, RUP lifecycles, and 4-way folder standards repository. <a href="#assistant-aurora" class="doc-link">View Module →</a></td>
        </tr>
        <tr>
          <td><code>3.19</code></td>
          <td><strong>Henry AI</strong></td>
          <td>Document Studio & OCR Wizard</td>
          <td>Emirates ID OCR, Passport parser, Title Deed validation, Unified Ejari tenancy contracts, and digital signatures. <a href="#assistant-henry" class="doc-link">View Module →</a></td>
        </tr>
        <tr>
          <td><code>3.42</code></td>
          <td><strong>Margaret AI</strong></td>
          <td>Strategic Planning & Backlog</td>
          <td>Master Plan roadmap (Waves 01–65), sprint milestone allocation, and feature coverage traceability matrix. <a href="#assistant-margaret" class="doc-link">View Module →</a></td>
        </tr>
        <tr>
          <td><code>3.43</code></td>
          <td><strong>Ada AI</strong></td>
          <td>Chief Architecture & SDLC</td>
          <td>Zero-token local verification gates, deduplication law, and RBAC 1-12-108 security matrix. <a href="#assistant-ada" class="doc-link">View Module →</a></td>
        </tr>
        <tr>
          <td><code>3.44</code></td>
          <td><strong>AEGIS AI</strong></td>
          <td>Autonomous Autopilot & Swarm</td>
          <td>170-agent mesh orchestrator, live telemetry scanner (0 issues), and daily turn execution chronology. <a href="#assistant-aegis" class="doc-link">View Module →</a></td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2 class="doc-section-heading" id="sec-srs-2">2. Non-Functional Performance Constraints</h2>
  <ul class="doc-list">
    <li><strong>Latency SLA:</strong> Assistant response execution time must remain &lt; 250ms for local calculations and &lt; 1.2s for OCR parses.</li>
    <li><strong>Availability:</strong> 99.99% uptime with offline-first indexed caching fallback.</li>
    <li><strong>Test Coverage:</strong> 100% GREEN Vitest assertion coverage on all logic and style modules.</li>
  </ul>
</div>
`
  },
  {
    id: 'doc-aurora-02',
    code: 'DOC-SWE-02',
    title: 'SDD: System Design & Microservice Topologies',
    category: 'sdd',
    phase: 'Construction (Wave 65)',
    primaryAssistant: '3.11 Aurora AI (Architecture)',
    lastUpdated: '2026-08-26',
    summary: 'High-level system design document, client-server topology, WebSocket event buses, Redis caching layers, and database schemas.',
    tags: ['SDD', 'Architecture Topology', 'Redis', 'WebSockets', 'Chart of Accounts'],
    subItems: [
      { id: 'sec-sdd-1', title: '1. High-Level Data Topology', description: 'Client-server separation, gateway routes, and database tiers.' },
      { id: 'sec-sdd-2', title: '2. Real-Time Event Bus', description: 'WebSocket channels and cross-assistant pub/sub triggers.' },
      { id: 'sec-sdd-3', title: '3. Storage Schemas & Models', description: 'Prisma data models and relational integrity rules.' },
      { id: 'sec-sdd-4', title: '4. Redis Cache & Buffer Tiers', description: 'Key eviction policies and offline IndexedDB sync.' },
    ],
    htmlContent: `
<div class="doc-container">
  <div class="doc-header-badge">SOFTWARE DESIGN DOCUMENT (SDD) · IEEE 1016-2009</div>
  <h1 class="doc-title">📐 System Design & Microservice Topologies</h1>
  <p class="doc-lead">
    Architectural blueprint illustrating data flows, state machines, microservices, and storage layers across White Caves Core.
  </p>

  <h2 class="doc-section-heading" id="sec-sdd-1">1. High-Level Data Topology</h2>
  <div class="code-block">
+-------------------------------------------------------------------------+
|                  REACT 18 / VITE HIGH-DENSITY FRONTEND                  |
|  (4-Way Architecture: Component.tsx | logic/ | styles/ | data/)        |
+--------------------+-----------------------------------+----------------+
                     |                                   |
                     v REST APIs                         v WebSockets (Live Sync)
+--------------------+-----------------------------------+----------------+
|                     EXPRESS 4.x / NODE.JS BACKEND                       |
|  - Auth & RBAC Guard (/api/v1/auth)                                     |
|  - Financial Reporting Engine (/api/finance/reports)                    |
|  - Document OCR & PDF Generator (/api/documents/tenancy)                |
|  - Nadia Lead Dispatch Hub (/api/leads/routing)                         |
+--------------------+-----------------------------------+----------------+
                     |                                   |
                     v Queries                           v Key-Value Cache
+--------------------+-------------------+   +-----------+----------------+
|        MONGODB / PRISMA CLUSTER        |   |      REDIS CACHE POOL      |
|  - Users & Roles (1-12-108)            |   |  - Report Summaries (TTL)  |
|  - Properties Ledger (9,378 units)     |   |  - Session Tokens          |
|  - Double-Entry Journal Lines          |   |  - OCR Result Buffers      |
+----------------------------------------+   +----------------------------+
  </div>

  <h2 class="doc-section-heading" id="sec-sdd-2">2. Real-Time Assistant Interconnect</h2>
  <p>
    AI assistants communicate across an asynchronous message bus. When <a href="#assistant-3.19" class="doc-link">3.19 Henry AI</a> finalizes a lease, an event triggers <a href="#assistant-3.14" class="doc-link">3.14 Theodora AI</a> to book security deposits and commission VAT receivables automatically.
  </p>
</div>
`
  },
  {
    id: 'doc-aurora-03',
    code: 'DOC-SWE-03',
    title: 'Frontend 4-Way Folder Segregation Standard',
    category: 'architecture',
    phase: 'Permanent Standard',
    primaryAssistant: '3.11 Aurora AI (Architecture)',
    lastUpdated: '2026-08-26',
    summary: 'Strict mandatory standard organizing all React components into co-located View, Logic, Style, and Data layers.',
    tags: ['4-Way Standard', 'Component Architecture', 'Refactoring', 'i18n Dictionaries'],
    subItems: [
      { id: 'sec-4way-1', title: '1. Layer Breakdown & File Roles', description: 'View (.tsx), Logic (.logic.ts), Style (.style.ts), Data (.data.ts).' },
      { id: 'sec-4way-2', title: '2. Unit Test Mirroring', description: 'Independent test files for View, Logic, Style, and Data.' },
      { id: 'sec-4way-3', title: '3. Anti-Pattern Prohibitions', description: 'No raw inline hex colors, no monolithic mixed hook files.' },
      { id: 'sec-4way-4', title: '4. Performance Memoization Rules', description: 'useMemo and useCallback enforcement for render optimization.' },
    ],
    htmlContent: `
<div class="doc-container">
  <div class="doc-header-badge">FRONTEND ENGINEERING STANDARD · WHITE CAVES SDLC</div>
  <h1 class="doc-title">🏛️ Frontend 4-Way Folder Segregation Standard</h1>
  <p class="doc-lead">
    Every single frontend component in White Caves must strictly adhere to the 4-way subfolder pattern to guarantee separation of concerns, testability, and zero copy drift.
  </p>

  <div class="doc-card-grid" id="sec-4way-1">
    <div class="doc-card">
      <div class="doc-card-label">1. View Layer</div>
      <div class="doc-card-value">Component.tsx</div>
      <div class="doc-card-sub">Stateless presentational shell drawing variables</div>
    </div>
    <div class="doc-card">
      <div class="doc-card-label">2. Logic Layer</div>
      <div class="doc-card-value">logic/Component.logic.ts</div>
      <div class="doc-card-sub">React hooks, event handlers, and data fetching</div>
    </div>
    <div class="doc-card">
      <div class="doc-card-label">3. Style Layer</div>
      <div class="doc-card-value">styles/Component.style.ts</div>
      <div class="doc-card-sub">Stateless styled-components & tokenized CSS</div>
    </div>
    <div class="doc-card">
      <div class="doc-card-label">4. Data Layer</div>
      <div class="doc-card-value">data/Component.data.ts</div>
      <div class="doc-card-sub">Static text, mock datasets, and translation maps</div>
    </div>
  </div>
</div>
`
  },
];

