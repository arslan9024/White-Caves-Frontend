import type { BusinessDocItem } from '../../types';

export const reraAndOperationsDocs: BusinessDocItem[] = [
  {
    id: 'doc-zoe-02',
    code: 'DOC-BUS-02',
    title: '12 Corporate Departments, Floor Operating Matrices & SLAs',
    category: 'departments',
    departmentFloor: 'All Floors (1 to 13)',
    primaryAssistant: '3.4 Zoe AI (Chief Operations Officer)',
    lastUpdated: '2026-08-26',
    summary:
      'Comprehensive structure of all 12 operational corporate departments, floor assignments, team sizes, and turnaround SLAs.',
    tags: ['Departments', 'Org Chart', 'Floor Matrix', 'SLA', 'Executive Council'],
    subItems: [
      {
        id: 'sec-2-1',
        title: '1. Executive Council & Governance (Floor 13)',
        description: 'MD Office, Chief Architect Ada, and COO Zoe.',
      },
      {
        id: 'sec-2-2',
        title: '2. Commercial Operations (Floors 6–12)',
        description: 'Sales, Leasing, VIP Concierge, Finance & Legal Compliance.',
      },
      {
        id: 'sec-2-3',
        title: '3. Technology & Engineering (Floors 1–5)',
        description: 'Frontend, Backend, Database, Security QA, and DevOps.',
      },
      {
        id: 'sec-2-4',
        title: '4. Department SLA & Escalation Protocol',
        description: 'P0/P1/P2 turnaround SLAs and handoff contracts.',
      },
    ],
    htmlContent: `
<div class="doc-container">
  <div class="doc-header-badge">ORGANIZATIONAL ARCHITECTURE · WHITE CAVES REAL ESTATE LLC · DOCS FOLDER 01</div>
  <h1 class="doc-title">🏢 12 Corporate Departments & Floor Operating Matrix</h1>
  <p class="doc-lead">
    The White Caves operational model is divided into 12 specialized departments across 13 dedicated building floors, coordinating between executive leadership, commercial advisory, and autonomous AI agents.
  </p>

  <h2 class="doc-section-heading" id="sec-2-1">1. Department Master Roster</h2>
  <div class="doc-table-wrap">
    <table class="doc-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Department Name</th>
          <th>Floor</th>
          <th>Lead / Persona</th>
          <th>Core Operating Scope</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><strong>01</strong></td><td>Executive Council & MD Office</td><td>Floor 13</td><td>@Ada (Arch) & @Zoe (COO)</td><td>Strategic vision, sovereign approvals, legal P&L governance.</td></tr>
        <tr><td><strong>02</strong></td><td>Research & Intelligence Division</td><td>Floor 12</td><td>@Elena (CRO) & @Iris</td><td>Market trends, DLD transaction analytics, preflight briefs.</td></tr>
        <tr><td><strong>03</strong></td><td>Sales & Secondary Transactions</td><td>Floor 11</td><td>@Jaime & @Sophia</td><td>Off-plan launches, Form F resale transactions, client negotiation.</td></tr>
        <tr><td><strong>04</strong></td><td>Leasing & Property Management</td><td>Floor 10</td><td>@Victoria & @Daisy</td><td>Ejari attestation, tenant onboarding, landlord portal, PDC vault.</td></tr>
        <tr><td><strong>05</strong></td><td>Legal, Compliance & RERA Governance</td><td>Floor 09</td><td>@Sofia & @Evangeline</td><td>AML/KYC screening, Trakheesi permits, Form 12 notices, PDPL.</td></tr>
        <tr><td><strong>06</strong></td><td>Finance, VAT & Escrow Accounting</td><td>Floor 08</td><td>@Theodora (CFO) & @Invoice</td><td>FTA 5% VAT filings, 42-expense catalog, escrow milestone disbursement.</td></tr>
        <tr><td><strong>07</strong></td><td>VIP & Ultra-High-Net-Worth Concierge</td><td>Floor 07</td><td>@Linda & @Kairos</td><td>Private off-market vault, Rolls-Royce/Yacht viewings, Level 5 NDAs.</td></tr>
        <tr><td><strong>08</strong></td><td>Marketing, PR & WhatsApp Automation</td><td>Floor 06</td><td>@Nadia & @Nina</td><td>Omnichannel ad campaigns, WhatsApp AI concierge, SEO optimization.</td></tr>
        <tr><td><strong>09</strong></td><td>AI Agents & System Integrations</td><td>Floor 05</td><td>@Aurora & @Joelle</td><td>Machine learning personas, document OCR pipelines, webhook bridges.</td></tr>
        <tr><td><strong>10</strong></td><td>Frontend UI/UX & Design System</td><td>Floor 04</td><td>@Una & @Hazel</td><td>React/Vite interfaces, luxury animations, mobile CRM touch suite.</td></tr>
        <tr><td><strong>11</strong></td><td>Database Architecture & Data Pipelines</td><td>Floor 03</td><td>@Barbara & @Willow</td><td>Prisma ORM, PostgreSQL clusters, Redis caching, telemetry.</td></tr>
        <tr><td><strong>12</strong></td><td>DevOps, Cloud & Cyber Security</td><td>Floor 02</td><td>@Gwynne & @Katherine</td><td>CI/CD pipelines, penetration testing, SQA release certifications.</td></tr>
      </tbody>
    </table>
  </div>

  <h2 class="doc-section-heading" id="sec-2-4">2. SLA Standards & Escalation Tiers</h2>
  <p class="doc-body">
    All client inquiries, contract requests, and compliance flags operate under strict Service Level Agreements (SLAs):
  </p>
  <ul>
    <li><strong>P0 (Critical / VIP Inquiry):</strong> 5-Minute response SLA enforced by Nadia WhatsApp Gateway and Floor 7 Concierge.</li>
    <li><strong>P1 (Form A/B Contract Generation):</strong> 15-Minute generation SLA via Henry Document OCR Hub.</li>
    <li><strong>P2 (Routine Maintenance & Ejari Attestation):</strong> 2-Hour turnaround SLA managed by Daisy Leasing Suite.</li>
  </ul>
</div>
`,
  },

  // -------------------------------------------------------------
  // DOC-BUS-03: 03_regulatory_compliance_legal & 05_requirements
  // -------------------------------------------------------------
  {
    id: 'doc-zoe-03',
    code: 'DOC-BUS-03',
    title: 'Trade Licensing, RERA Classification, Unified Forms & Trakheesi',
    category: 'licensing',
    departmentFloor: 'Floor 09 — Legal & Compliance Suite',
    primaryAssistant: '3.4 Zoe AI & 3.15 Laila Compliance',
    lastUpdated: '2026-08-26',
    summary:
      'Statutory requirements for Dubai DET licensing, RERA broker accreditation, Form A/B/I contract drafting, and DLD e-signatures.',
    tags: ['Trade License', 'RERA Form A', 'Form B', 'Form I', 'DLD Trakheesi'],
    subItems: [
      {
        id: 'sec-3-1',
        title: '1. DET Commercial License 1388443',
        description: 'License activities, permitted business lines, and validity.',
      },
      {
        id: 'sec-3-2',
        title: '2. RERA Broker Accreditation (ORN 44483)',
        description: 'Broker license categories and broker card mandates.',
      },
      {
        id: 'sec-3-3',
        title: '3. Mandatory RERA Form Protocols',
        description: 'Form A (Seller), Form B (Buyer), Form I (Agent Split), Form F (MOU).',
      },
      {
        id: 'sec-3-4',
        title: '4. Trakheesi Permit Advertising Rules',
        description: 'QR code verification and statutory penalties.',
      },
    ],
    htmlContent: `
<div class="doc-container">
  <div class="doc-header-badge">REGULATORY PLAYBOOK · DUBAI LAND DEPARTMENT (DLD) & RERA · DOCS FOLDER 03</div>
  <h1 class="doc-title">📜 Trade Licensing, RERA Classification & Form Protocols</h1>
  <p class="doc-lead">
    Under Dubai Real Estate Law No. 85 of 2006, all real estate brokerage operations in the Emirate of Dubai must comply with strict RERA registration, licensing, and standardized contracting standards.
  </p>

  <h2 class="doc-section-heading" id="sec-3-1">1. Commercial License & Scope (DET 1388443)</h2>
  <p class="doc-body">
    White Caves Real Estate LLC is authorized for <strong>Real Estate Buying & Selling Brokerage (Activity Code: 7010.01)</strong> and <strong>Leasing Property Brokerage (Activity Code: 7020.01)</strong> across residential, commercial, and industrial property assets throughout the Emirate of Dubai.
  </p>

  <h2 class="doc-section-heading" id="sec-3-3">2. Standardized RERA Unified Forms</h2>
  <div class="doc-table-wrap">
    <table class="doc-table">
      <thead>
        <tr>
          <th>Form Code</th>
          <th>Official Form Name</th>
          <th>Contracting Parties</th>
          <th>Statutory Purpose</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><strong>Form A</strong></td><td>Seller’s Agency Agreement</td><td>Property Owner ↔ White Caves Real Estate</td><td>Grants marketing mandate, specifies listing price, commission %, and Trakheesi permit rights.</td></tr>
        <tr><td><strong>Form B</strong></td><td>Buyer’s Agency Agreement</td><td>Prospective Buyer ↔ White Caves Real Estate</td><td>Authorizes White Caves to represent buyer, conduct property search, and negotiate acquisitions.</td></tr>
        <tr><td><strong>Form I</strong></td><td>Agent-to-Agent Agreement</td><td>White Caves ↔ External Licensed Broker</td><td>Establishes legally binding commission split percentage for co-brokered sales transactions.</td></tr>
        <tr><td><strong>Form F (Unified MOU)</strong></td><td>Sales & Purchase Contract</td><td>Buyer ↔ Seller ↔ Broker(s)</td><td>Primary legal sale agreement outlining purchase price, 10% deposit cheque, and transfer date. Verified by 3.19 Henry AI Document Studio.</td></tr>
      </tbody>
    </table>
  </div>
</div>
`,
  },

  // -------------------------------------------------------------
  // DOC-BUS-04: 02_leasing_property_management & 09_crm_features
  // -------------------------------------------------------------,
];

