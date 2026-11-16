import type { BusinessDocItem } from '../../types';

export const telemetryAndGovernanceDocs: BusinessDocItem[] = [
  {
    id: 'doc-zoe-00',
    code: 'DOC-BUS-00',
    title: 'Project Progress Tracker, Wave Velocity & Autopilot Telemetry',
    category: 'progress',
    departmentFloor: 'Floor 13 — Executive Flight Deck & Architecture Suite',
    primaryAssistant: '3.4 Zoe AI & 3.43 Ada Chief Architect',
    lastUpdated: '2026-08-26',
    summary:
      'Real-time project execution telemetry, Waves 1–68 completion status, test suite health metrics (100% green), 0 scanner target issues, and Turn-by-Turn RUP milestones.',
    tags: ['Project Progress', 'Waves 1–68', 'Autopilot Telemetry', 'AEGIS V3', 'Turn 88'],
    subItems: [
      {
        id: 'sec-prog-1',
        title: '1. Executive KPI Summary & Global Health',
        description: 'Wave completion, test suite pass rate, and scanner status.',
      },
      {
        id: 'sec-prog-2',
        title: '2. 12 Corporate Departments Operating Matrix',
        description: 'Floor 1–13 SLA assignments and assistant mesh.',
      },
      {
        id: 'sec-prog-3',
        title: '3. Turn-by-Turn Autopilot Milestones (Turns 82–88)',
        description: 'Detailed log of continuous automated engineering passes.',
      },
      {
        id: 'sec-prog-4',
        title: '4. Full Test Matrix & Build Verification Gates',
        description: 'Vitest, strict TypeScript compiler, and production bundle health.',
      },
    ],
    htmlContent: `
<div class="doc-container">
  <div class="doc-header-badge">AEGIS 3.0 SOVEREIGN ARCHITECTURE · EXECUTIVE TELEMETRY · LIVE PROGRESS</div>
  <h1 class="doc-title">🌟 White Caves Project Progress & Engineering Telemetry</h1>
  <p class="doc-lead">
    Complete real-time platform development report governing all 68 Waves, 44 AI Persona Assistants, 12 Corporate Floors, and zero-defect automated testing gates.
  </p>

  <h2 class="doc-section-heading" id="sec-prog-1">1. Executive KPI Summary & Global Health</h2>
  <div class="doc-card-grid">
    <div class="doc-card">
      <div class="doc-card-label">Global Wave Progress</div>
      <div class="doc-card-value" style="color: #60A5FA;">100%</div>
      <div class="doc-card-sub">Waves 1 to 68 Complete</div>
    </div>
    <div class="doc-card">
      <div class="doc-card-label">Test Suite Pass Rate</div>
      <div class="doc-card-value" style="color: #10B981;">100%</div>
      <div class="doc-card-sub">81/81 Test Files Passing</div>
    </div>
    <div class="doc-card">
      <div class="doc-card-label">Critical Scanner Issues</div>
      <div class="doc-card-value" style="color: #EF4444;">0</div>
      <div class="doc-card-sub">Clean Autopilot Scanner Gate</div>
    </div>
    <div class="doc-card">
      <div class="doc-card-label">AI Persona Mesh</div>
      <div class="doc-card-value" style="color: #8B5CF6;">44</div>
      <div class="doc-card-sub">3.1 Nadia to 3.44 AEGIS</div>
    </div>
  </div>

  <h2 class="doc-section-heading" id="sec-prog-2">2. 12 Corporate Departments Operating Matrix</h2>
  <div class="doc-table-wrap">
    <table class="doc-table">
      <thead>
        <tr>
          <th>Floor</th>
          <th>Department</th>
          <th>Lead Executive</th>
          <th>Primary AI Assistant</th>
          <th>Turnaround SLA</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><strong>Floor 13</strong></td><td>Executive Governance</td><td>Arslan Malik (MD)</td><td>3.4 Zoe AI & 3.43 Ada</td><td>Immediate</td><td><span style="color: #10B981; font-weight: 800;">✓ Active</span></td></tr>
        <tr><td><strong>Floor 12</strong></td><td>Strategic Planning & RUP</td><td>Margaret Lead</td><td>3.42 Margaret AI</td><td>&lt; 30 Mins</td><td><span style="color: #10B981; font-weight: 800;">✓ Active</span></td></tr>
        <tr><td><strong>Floor 11</strong></td><td>Autopilot Systems & DevOps</td><td>Gwynne Lead</td><td>3.44 AEGIS Autopilot</td><td>&lt; 5 Mins</td><td><span style="color: #10B981; font-weight: 800;">✓ Active</span></td></tr>
        <tr><td><strong>Floor 10</strong></td><td>Architecture & Standards</td><td>Ada Lovelace</td><td>3.43 Ada Chief Arch</td><td>&lt; 15 Mins</td><td><span style="color: #10B981; font-weight: 800;">✓ Active</span></td></tr>
        <tr><td><strong>Floor 09</strong></td><td>Legal & Compliance</td><td>Sofia / Laila</td><td>3.15 Laila Compliance</td><td>&lt; 1 Hour</td><td><span style="color: #10B981; font-weight: 800;">✓ Active</span></td></tr>
        <tr><td><strong>Floor 08</strong></td><td>Finance & CFO Treasury</td><td>Theodora CFO</td><td>3.14 Theodora CFO</td><td>&lt; 2 Hours</td><td><span style="color: #10B981; font-weight: 800;">✓ Active</span></td></tr>
        <tr><td><strong>Floor 07</strong></td><td>Marketing & Portals</td><td>Olivia Lead</td><td>3.2 Olivia Marketing</td><td>&lt; 15 Mins</td><td><span style="color: #10B981; font-weight: 800;">✓ Active</span></td></tr>
        <tr><td><strong>Floor 06</strong></td><td>WhatsApp Communications</td><td>Nadia / Nina</td><td>3.1 Nadia & 3.5 Nina</td><td>&lt; 2 Mins</td><td><span style="color: #10B981; font-weight: 800;">✓ Active</span></td></tr>
        <tr><td><strong>Floor 05</strong></td><td>Luxury Sales & Brokerage</td><td>Sophia Lead</td><td>3.3 Sophia Sales</td><td>&lt; 30 Mins</td><td><span style="color: #10B981; font-weight: 800;">✓ Active</span></td></tr>
        <tr><td><strong>Floor 04</strong></td><td>Leasing & Ejari</td><td>Victoria Lead</td><td><a class="doc-link" href="#assistant-3.19">3.19 Henry AI</a></td><td>&lt; 1 Hour</td><td><span style="color: #10B981; font-weight: 800;">✓ Active</span></td></tr>
        <tr><td><strong>Floor 03</strong></td><td>Market Intelligence</td><td>Elena CRO</td><td>3.16 Cipher Market</td><td>&lt; 4 Hours</td><td><span style="color: #10B981; font-weight: 800;">✓ Active</span></td></tr>
        <tr><td><strong>Floor 02</strong></td><td>Conveyancing & Trustee</td><td>Evangeline Lead</td><td>3.17 Evangeline Legal</td><td>&lt; 2 Hours</td><td><span style="color: #10B981; font-weight: 800;">✓ Active</span></td></tr>
      </tbody>
    </table>
  </div>

  <h2 class="doc-section-heading" id="sec-prog-3">3. Autonomous Autopilot Milestones (Turns 82–88)</h2>
  <div class="step-flow">
    <div class="step-box">
      <div class="step-num">Turn 88</div>
      <div class="step-title">Chart of Accounts & Expense Sub-Items</div>
      <div class="step-desc">Standardized 5 core accounting classes, dynamic category pills in Theodora CRM, and synchronized master schema.</div>
    </div>
    <div class="step-arrow">↓</div>
    <div class="step-box">
      <div class="step-num">Turn 87</div>
      <div class="step-title">Structural Rearrangement & 16-Module Zoe Hub</div>
      <div class="step-desc">Upgraded Zoe AI Docs to 16 Hyperlinked HTML modules, shredded duplicate legacy folders, verified build gate.</div>
    </div>
    <div class="step-arrow">↓</div>
    <div class="step-box">
      <div class="step-num">Turns 82–86</div>
      <div class="step-title">5-Turn Scanner Elimination Sprint</div>
      <div class="step-desc">Reduced critical target issues from 56 down to 0, created atomic test suites across all property, security, and PWA components.</div>
    </div>
  </div>

  <h2 class="doc-section-heading" id="sec-prog-4">4. Full Test Matrix & Build Verification Gates</h2>
  <div class="alert-box alert-success">
    <strong>Production Verification Gate:</strong> Strict TypeScript Compiler passed with 0 errors (<code>npm run typecheck</code>), Vite production bundle generated with PWA service worker in 51.90s (<code>npm run build</code>), and Planning Governance verified with 0 drift (<code>npm run plans:validate</code>).
  </div>
</div>
`,
  },
  // -------------------------------------------------------------
  // DOC-BUS-01: 01_company_structure
  // -------------------------------------------------------------
  {
    id: 'doc-zoe-01',
    code: 'DOC-BUS-01',
    title: 'Corporate Identity, Sovereign Profile & Legal Coordinates',
    category: 'corporate',
    departmentFloor: 'Floor 13 — Managing Director Suite',
    primaryAssistant: '3.4 Zoe AI (Executive Intelligence)',
    lastUpdated: '2026-08-26',
    summary:
      'Master corporate profile, brand palette, official coordinates, legal ownership, and executive leadership structure.',
    tags: ['Corporate Profile', 'DET 1388443', 'RERA 44483', 'Arslan Malik', 'Floor 13'],
    subItems: [
      {
        id: 'sec-1-1',
        title: '1. Official Entity Coordinates',
        description: 'DET, RERA, Ejari, and MOL registration numbers.',
      },
      {
        id: 'sec-1-2',
        title: '2. Executive Leadership & Governance',
        description: 'Managing Director authorities and corporate powers.',
      },
      {
        id: 'sec-1-3',
        title: '3. Brand Identity & Visual Standard',
        description: 'RGB/HEX tokens, typography, and hyper-linked HTML rules.',
      },
      {
        id: 'sec-1-4',
        title: '4. Stakeholder & Investor Registry',
        description: 'Shareholders, banking partners, and institutional stakeholders.',
      },
    ],
    htmlContent: `
<div class="doc-container">
  <div class="doc-header-badge">OFFICIAL CORPORATE DOCUMENTATION · WHITE CAVES REAL ESTATE LLC · DOCS FOLDER 01</div>
  <h1 class="doc-title">🏛️ Corporate Identity, Sovereign Profile & Legal Coordinates</h1>
  <p class="doc-lead">
    White Caves Real Estate LLC is an ultra-prime Dubai luxury real estate brokerage established under the statutory authority of Dubai Department of Economy and Tourism (DET) and the Real Estate Regulatory Agency (RERA).
  </p>

  <div class="doc-card-grid" id="sec-1-1">
    <div class="doc-card">
      <div class="doc-card-label">Commercial License (DET)</div>
      <div class="doc-card-value">1388443</div>
      <div class="doc-card-sub">Dubai Economy & Tourism Registered</div>
    </div>
    <div class="doc-card">
      <div class="doc-card-label">RERA Brokerage ORN</div>
      <div class="doc-card-value">44483</div>
      <div class="doc-card-sub">Classification: General Brokerage</div>
    </div>
    <div class="doc-card">
      <div class="doc-card-label">Office Ejari Number</div>
      <div class="doc-card-value">0120250814005322</div>
      <div class="doc-card-sub">Office D-72, El Shaye - 4 Building</div>
    </div>
    <div class="doc-card">
      <div class="doc-card-label">Establishment Card (MOL / ICP)</div>
      <div class="doc-card-value">2/1/1192499</div>
      <div class="doc-card-sub">Federal Immigration & Labor Approved</div>
    </div>
  </div>

  <h2 class="doc-section-heading" id="sec-1-2">1. Executive Leadership & Authority</h2>
  <p class="doc-body">
    The brokerage is managed by <strong>Managing Director Arslan Malik Bashir Ahmad</strong>, holding absolute signing authority under Commercial Power of Attorney and RERA Certified Broker Credentials. All primary corporate agreements, escrow authorizations, employment sponsorship visas, and legal attestation certificates operate through the executive office on Floor 13 with support from <a class="doc-link" href="#assistant-3.19">3.19 Henry AI</a>.
  </p>

  <h2 class="doc-section-heading" id="sec-1-3">2. Brand Identity & Visual Guidelines</h2>
  <div class="doc-table-wrap">
    <table class="doc-table">
      <thead>
        <tr>
          <th>Color Token</th>
          <th>Hex Value</th>
          <th>RGB Specification</th>
          <th>Application Area</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>White Caves Red</strong></td>
          <td><code>#EF4444</code></td>
          <td>rgb(239, 68, 68)</td>
          <td>Primary brand badges, accent buttons, critical alerts, sovereign borders</td>
        </tr>
        <tr>
          <td><strong>Brilliant White</strong></td>
          <td><code>#FFFFFF</code></td>
          <td>rgb(255, 255, 255)</td>
          <td>High-contrast typography, hero titles, card backgrounds in light theme</td>
        </tr>
        <tr>
          <td><strong>Deep Slate Gray</strong></td>
          <td><code>#1E293B</code></td>
          <td>rgb(30, 41, 59)</td>
          <td>Executive dark backdrops, table row striping, card surfaces</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2 class="doc-section-heading" id="sec-1-4">3. Stakeholder & Institutional Banking Registry</h2>
  <p class="doc-body">
    White Caves maintains commercial banking relationships with Emirates NBD and Dubai Islamic Bank for client escrow and operating accounts, fully compliant with UAE Central Bank and RERA Trust Account Law No. 8 of 2007.
  </p>
</div>
`,
  },

  // -------------------------------------------------------------
  // DOC-BUS-02: 01_company_structure (Departments & Floor Matrix)
  // -------------------------------------------------------------
];

