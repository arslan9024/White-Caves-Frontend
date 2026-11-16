// @ts-nocheck
import { DOCUMENT_TYPES, DOCUMENT_SOURCES } from './documentRegistry.types';

export const auroraTechDocs = {
  aurora_srs: {
    id: 'aurora_srs',
    title: 'Software Requirements Specification (SRS)',
    source: DOCUMENT_SOURCES.AURORA,
    type: DOCUMENT_TYPES.HTML,
    category: 'Technical Documentation',
    description: 'Complete functional and non-functional requirements for White Caves platform',
    version: '2.5',
    lastUpdated: '2026-01-09',
    author: 'Aurora (CTO Intelligence)',
    content: `
      <div class="doc-content">
        <h1>Software Requirements Specification</h1>
        <p class="doc-meta">Version 2.5 | Last Updated: January 9, 2026 | Author: Aurora</p>
        
        <h2>1. Introduction</h2>
        <h3>1.1 Purpose</h3>
        <p>This document specifies the functional and non-functional requirements for the White Caves Real Estate Platform, a comprehensive digital solution for luxury property transactions in Dubai.</p>
        
        <h3>1.2 Scope</h3>
        <p>The platform serves 6 user types with 40 services across 8 categories, implementing a 5-tier access model (Basic, Essential, Premium, Ultra-Premium, Corporate).</p>
        
        <h2>2. System Overview & 1-12-108 Hierarchy Protocol</h2>
        <h3>2.1 System Context</h3>
        <ul>
          <li><strong>Executive Command (Level 0):</strong> Managing Director (Founder) paired with Chief Operations AI (AI Zoe)</li>
          <li><strong>Department Operations (Level 1):</strong> 12 Corporate Departments paired with 12 Human & AI Managers</li>
          <li><strong>Supervisory Mesh (Level 2):</strong> 108 Operational Supervisors (9 per Department × 12 = 108) with typed task execution queues</li>
          <li><strong>Total Autonomous AI Command Grid:</strong> 121 AI Agents (1 Zoe + 12 Managers + 108 Supervisors)</li>
        </ul>
        
        <h3>2.2 Key Metrics</h3>
        <table>
          <tr><th>Metric</th><th>Value</th></tr>
          <tr><td>Active Properties (DAMAC Hills 2 Hub)</td><td>9,378+</td></tr>
          <tr><td>Hierarchy Protocol</td><td>1-12-108 Sovereign Grid</td></tr>
          <tr><td>Executive AI Assistant</td><td>1 (AI Zoe - COO)</td></tr>
          <tr><td>Corporate Departments</td><td>12</td></tr>
          <tr><td>Department Managers (Human + AI)</td><td>12</td></tr>
          <tr><td>Department Supervisors (Human + AI)</td><td>108 (9 per Department)</td></tr>
          <tr><td>Total Autonomous AI Mesh</td><td>121 Agents</td></tr>
        </table>
        
        <h2>3. Functional Requirements</h2>
        <h3>3.1 Property Management</h3>
        <ul>
          <li>FR-001: System shall support property listing with 50+ attributes and sub-10ms in-memory Map lookup</li>
          <li>FR-002: System shall provide advanced search with filters for location, price, type, bedrooms</li>
          <li>FR-003: System shall integrate with DAMAC inventory for 9,378 off-plan and ready units</li>
          <li>FR-004: System shall support virtual tours via Matterport & Pannellum 3D integration</li>
        </ul>
        
        <h3>3.2 Transaction Management</h3>
        <ul>
          <li>FR-010: System shall manage sales pipeline with stage progression and 15-minute SLA watchdog</li>
          <li>FR-011: System shall generate Ejari-compliant tenancy contracts (Form 12)</li>
          <li>FR-012: System shall support digital signatures and DLD trustee appointment coordination</li>
          <li>FR-013: System shall store signed documents in encrypted cloud vaults</li>
        </ul>
        
        <h3>3.3 Payment Processing & Statutory Compliance</h3>
        <ul>
          <li>FR-020: System shall process multi-currency payments with statutory UAE VAT 5% (FTA Form 201)</li>
          <li>FR-021: System shall support Mashreq / Wio Bank ledger reconciliation with DLA balancing</li>
          <li>FR-022: System shall enforce statutory goAML cash threshold screening (> AED 55,000)</li>
          <li>FR-023: System shall calculate tiered agent commissions and Corporate Tax 9% + SBR automatically</li>
        </ul>
        
        <h3>3.4 1-12-108 AI Multi-Agent Command System</h3>
        <ul>
          <li>FR-030: System shall maintain 121 autonomous AI agents across the 1-12-108 Hierarchy Protocol</li>
          <li>FR-031: 108 Department Supervisors shall execute 3 dedicated domain tasks with 15-minute SLA</li>
          <li>FR-032: AI Zoe shall aggregate suggestions from all 12 departments for the Managing Director</li>
          <li>FR-033: AI Aurora shall maintain system architecture, API specifications, and database integrity</li>
        </ul>
        
        <h2>4. Non-Functional Requirements</h2>
        <h3>4.1 Performance</h3>
        <ul>
          <li>NFR-001: Page load time shall be under 2 seconds</li>
          <li>NFR-002: API response time shall be under 100ms average</li>
          <li>NFR-003: System uptime shall be 99.97%</li>
        </ul>
        
        <h3>4.2 Security</h3>
        <ul>
          <li>NFR-010: Authentication via Firebase with social logins</li>
          <li>NFR-011: Role-based access control for all features</li>
          <li>NFR-012: PCI-DSS Level 1 compliance for payments</li>
          <li>NFR-013: UAE PDPL compliance for data protection</li>
        </ul>
        
        <h3>4.3 Compliance</h3>
        <ul>
          <li>NFR-020: RERA certification for real estate operations</li>
          <li>NFR-021: Ejari compliance for tenancy contracts</li>
          <li>NFR-022: KYC/AML monitoring for transactions</li>
        </ul>
      </div>
    `,
  },

  aurora_sad: {
    id: 'aurora_sad',
    title: 'System Architecture Document (SAD)',
    source: DOCUMENT_SOURCES.AURORA,
    type: DOCUMENT_TYPES.HTML,
    category: 'Technical Documentation',
    description: 'High-level architecture patterns and system design',
    version: '2.5',
    lastUpdated: '2026-01-09',
    author: 'Aurora (CTO Intelligence)',
    content: `
      <div class="doc-content">
        <h1>System Architecture Document</h1>
        <p class="doc-meta">Version 2.5 | Last Updated: January 9, 2026 | Author: Aurora</p>
        
        <h2>1. Architecture Overview</h2>
        <h3>1.1 High-Level Architecture</h3>
        <p>White Caves follows a modern three-tier architecture with React frontend, Express.js backend, and MongoDB database.</p>
        
        <h3>1.2 Technology Stack</h3>
        <table>
          <tr><th>Layer</th><th>Technologies</th></tr>
          <tr><td>Frontend</td><td>React 18, Redux Toolkit, Vite 7.3, React Router v6</td></tr>
          <tr><td>Backend</td><td>Express.js, Node.js 22, JWT Auth</td></tr>
          <tr><td>Database</td><td>MongoDB Atlas, PostgreSQL (Neon)</td></tr>
          <tr><td>Auth</td><td>Firebase Authentication</td></tr>
          <tr><td>Payments</td><td>Stripe, Mashreq NEOBiz, Aani</td></tr>
          <tr><td>Storage</td><td>Google Drive API</td></tr>
        </table>
        
        <h2>2. Component Architecture</h2>
        <h3>2.1 Frontend Components</h3>
        <ul>
          <li><strong>DashboardShell:</strong> Main layout for authenticated users</li>
          <li><strong>CRMShell:</strong> MD-only CRM interface with accordion navigation</li>
          <li><strong>AICommandCenter:</strong> 38 AI assistants in right sidebar</li>
          <li><strong>ContextualDashboardRenderer:</strong> Dynamic view routing</li>
        </ul>
        
        <h3>2.2 State Management</h3>
        <ul>
          <li>Redux Toolkit for global state</li>
          <li>Slices: auth, properties, leads, crm, compliance, payments</li>
          <li>Event bus middleware for AI assistant communication</li>
        </ul>
        
        <h2>3. Data Flow</h2>
        <h3>3.1 AI Assistant Event Flow</h3>
        <pre>
User Action → Redux Dispatch → Event Bus Middleware
    → Target Assistant(s) → State Update → UI Refresh
        </pre>
        
        <h3>3.2 Document Flow</h3>
        <pre>
Create Document → Digital Signature → PDF Generation
    → Google Drive Upload → Notification
        </pre>
        
        <h2>4. Integration Points</h2>
        <h3>4.1 External Services</h3>
        <ul>
          <li>Stripe: Payment processing</li>
          <li>Firebase: Authentication</li>
          <li>Google Drive: Document storage</li>
          <li>Google Maps: Property locations</li>
          <li>WhatsApp Business: Customer communication</li>
        </ul>
        
        <h2>5. Deployment Architecture</h2>
        <h3>5.1 Infrastructure</h3>
        <ul>
          <li><strong>Hosting:</strong> Replit Deployments</li>
          <li><strong>Database:</strong> MongoDB Atlas M10</li>
          <li><strong>CDN:</strong> Cloudflare</li>
          <li><strong>Monitoring:</strong> Vercel Speed Insights</li>
        </ul>
      </div>
    `,
  },

  aurora_api: {
    id: 'aurora_api',
    title: 'API Specification',
    source: DOCUMENT_SOURCES.AURORA,
    type: DOCUMENT_TYPES.HTML,
    category: 'Technical Documentation',
    description: 'Complete REST API endpoints documentation',
    version: '2.5',
    lastUpdated: '2026-01-09',
    author: 'Aurora (CTO Intelligence)',
    content: `
      <div class="doc-content">
        <h1>API Specification</h1>
        <p class="doc-meta">Version 2.5 | Base URL: /api</p>
        
        <h2>1. Authentication</h2>
        <h3>POST /api/auth/login</h3>
        <pre>
Request:
{
  "email": "user@example.com",
  "password": "********"
}

Response:
{
  "token": "jwt_token",
  "user": { "id", "email", "role" }
}
        </pre>
        
        <h2>2. Properties</h2>
        <h3>GET /api/properties</h3>
        <p>Retrieve properties with filters</p>
        <pre>
Query Parameters:
- type: villa|apartment|penthouse|townhouse|commercial
- location: string
- minPrice: number
- maxPrice: number
- bedrooms: number
- status: available|sold|rented
        </pre>
        
        <h3>POST /api/properties</h3>
        <p>Create new property listing (Agent/Admin only)</p>
        
        <h2>3. Leads</h2>
        <h3>GET /api/leads</h3>
        <p>Retrieve leads pipeline</p>
        
        <h3>POST /api/leads</h3>
        <p>Create new lead</p>
        
        <h3>PATCH /api/leads/:id/status</h3>
        <p>Update lead status in pipeline</p>
        
        <h2>4. Transactions</h2>
        <h3>GET /api/transactions</h3>
        <p>Retrieve transactions list</p>
        
        <h3>POST /api/transactions/tenancy</h3>
        <p>Create tenancy agreement</p>
        
        <h2>5. Payments</h2>
        <h3>POST /api/payments/create-intent</h3>
        <p>Create Stripe payment intent</p>
        
        <h3>POST /api/payments/aani/generate</h3>
        <p>Generate Aani QR code for payment</p>
        
        <h2>6. Documents</h2>
        <h3>POST /api/documents/sign</h3>
        <p>Submit digital signature</p>
        
        <h3>GET /api/documents/:id</h3>
        <p>Retrieve signed document</p>
      </div>
    `,
  },

};

