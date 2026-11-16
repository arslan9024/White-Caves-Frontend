// @ts-nocheck
import { DOCUMENT_TYPES, DOCUMENT_SOURCES } from './documentRegistry.types';

export const auroraPlatformDocs = {
  aurora_database: {
    id: 'aurora_database',
    title: 'Database Schema & Data Dictionary',
    source: DOCUMENT_SOURCES.AURORA,
    type: DOCUMENT_TYPES.HTML,
    category: 'Technical Documentation',
    description: 'Complete database schema with entity relationships',
    version: '2.5',
    lastUpdated: '2026-01-09',
    author: 'Aurora (CTO Intelligence)',
    content: `
      <div class="doc-content">
        <h1>Database Schema & Data Dictionary</h1>
        <p class="doc-meta">Version 2.5 | Database: MongoDB Atlas</p>
        
        <h2>1. Core Collections</h2>
        
        <h3>1.1 Users Collection</h3>
        <table>
          <tr><th>Field</th><th>Type</th><th>Description</th></tr>
          <tr><td>_id</td><td>ObjectId</td><td>Unique identifier</td></tr>
          <tr><td>email</td><td>String</td><td>User email (unique)</td></tr>
          <tr><td>role</td><td>String</td><td>buyer|seller|landlord|tenant|agent|admin|md</td></tr>
          <tr><td>firebaseUid</td><td>String</td><td>Firebase Auth UID</td></tr>
          <tr><td>profile</td><td>Object</td><td>User profile details</td></tr>
          <tr><td>permissions</td><td>Array</td><td>Access permissions</td></tr>
          <tr><td>createdAt</td><td>Date</td><td>Account creation date</td></tr>
        </table>
        
        <h3>1.2 Properties Collection</h3>
        <table>
          <tr><th>Field</th><th>Type</th><th>Description</th></tr>
          <tr><td>_id</td><td>ObjectId</td><td>Unique identifier</td></tr>
          <tr><td>title</td><td>String</td><td>Property title</td></tr>
          <tr><td>type</td><td>String</td><td>villa|apartment|penthouse|townhouse|commercial</td></tr>
          <tr><td>location</td><td>Object</td><td>Address, coordinates, community</td></tr>
          <tr><td>price</td><td>Number</td><td>Listing price in AED</td></tr>
          <tr><td>bedrooms</td><td>Number</td><td>Number of bedrooms</td></tr>
          <tr><td>bathrooms</td><td>Number</td><td>Number of bathrooms</td></tr>
          <tr><td>area</td><td>Number</td><td>Area in sqft</td></tr>
          <tr><td>images</td><td>Array</td><td>Image URLs</td></tr>
          <tr><td>status</td><td>String</td><td>available|sold|rented|reserved</td></tr>
          <tr><td>developer</td><td>String</td><td>Developer name (off-plan)</td></tr>
          <tr><td>agentId</td><td>ObjectId</td><td>Assigned agent reference</td></tr>
        </table>
        
        <h3>1.3 Leads Collection</h3>
        <table>
          <tr><th>Field</th><th>Type</th><th>Description</th></tr>
          <tr><td>_id</td><td>ObjectId</td><td>Unique identifier</td></tr>
          <tr><td>name</td><td>String</td><td>Lead name</td></tr>
          <tr><td>email</td><td>String</td><td>Contact email</td></tr>
          <tr><td>phone</td><td>String</td><td>Contact phone</td></tr>
          <tr><td>source</td><td>String</td><td>Lead source (website, whatsapp, referral)</td></tr>
          <tr><td>status</td><td>String</td><td>new|contacted|qualified|proposal|negotiation|won|lost</td></tr>
          <tr><td>score</td><td>Number</td><td>AI-calculated lead score (0-100)</td></tr>
          <tr><td>assignedAgent</td><td>ObjectId</td><td>Assigned agent reference</td></tr>
          <tr><td>propertyInterests</td><td>Array</td><td>Property preferences</td></tr>
        </table>
        
        <h3>1.4 Transactions Collection</h3>
        <table>
          <tr><th>Field</th><th>Type</th><th>Description</th></tr>
          <tr><td>_id</td><td>ObjectId</td><td>Unique identifier</td></tr>
          <tr><td>type</td><td>String</td><td>sale|rental</td></tr>
          <tr><td>propertyId</td><td>ObjectId</td><td>Property reference</td></tr>
          <tr><td>buyerId/tenantId</td><td>ObjectId</td><td>Client reference</td></tr>
          <tr><td>agentId</td><td>ObjectId</td><td>Agent reference</td></tr>
          <tr><td>amount</td><td>Number</td><td>Transaction amount</td></tr>
          <tr><td>stage</td><td>String</td><td>Current transaction stage</td></tr>
          <tr><td>documents</td><td>Array</td><td>Associated document references</td></tr>
          <tr><td>ejariNumber</td><td>String</td><td>Ejari registration (rentals)</td></tr>
        </table>
        
        <h2>2. Relationships</h2>
        <pre>
Users (1) ──< Properties (many) [as agent]
Users (1) ──< Leads (many) [as assigned agent]
Properties (1) ──< Transactions (many)
Users (1) ──< Transactions (many) [as client]
        </pre>
      </div>
    `,
  },

  aurora_ai_catalog: {
    id: 'aurora_ai_catalog',
    title: 'AI Strategy & Assistant Catalog',
    source: DOCUMENT_SOURCES.AURORA,
    type: DOCUMENT_TYPES.HTML,
    category: 'Technical Documentation',
    description: 'Complete catalog of 38 AI assistants with capabilities',
    version: '2.5',
    lastUpdated: '2026-01-09',
    author: 'Aurora (CTO Intelligence)',
    content: `
      <div class="doc-content">
        <h1>AI Strategy & Assistant Catalog</h1>
        <p class="doc-meta">Version 2.5 | Total Assistants: 38</p>
        
        <h2>1. AI Strategy Overview</h2>
        <p>White Caves employs 38 specialized AI assistants across 11 departments to automate operations, enhance decision-making, and improve customer experience.</p>
        
        <h2>2. Department Structure</h2>
        <h3>Executive (2 Assistants)</h3>
        <table>
          <tr><th>Name</th><th>Role</th><th>Capabilities</th></tr>
          <tr><td>Zoe</td><td>Executive AI</td><td>Strategic intelligence, cross-department analytics, suggestion aggregation</td></tr>
          <tr><td>Phoenix</td><td>Crisis Management</td><td>Emergency response, escalation handling</td></tr>
        </table>
        
        <h3>Technology (8 Assistants)</h3>
        <table>
          <tr><th>Name</th><th>Role</th><th>Capabilities</th></tr>
          <tr><td>Aurora</td><td>CTO Intelligence</td><td>System monitoring, documentation, SDLC management</td></tr>
          <tr><td>Hazel</td><td>Frontend Support</td><td>Component library, UI documentation</td></tr>
          <tr><td>Willow</td><td>Backend Support</td><td>API management, server architecture</td></tr>
          <tr><td>Stella</td><td>Backend Engineer</td><td>API & Server Architecture</td></tr>
          <tr><td>Nova</td><td>Backend Engineer</td><td>Data Processing & Integration</td></tr>
          <tr><td>Ember</td><td>Frontend Engineer</td><td>UI Documentation & Standards</td></tr>
          <tr><td>Marina</td><td>DevOps Engineer</td><td>Deployment & Operations</td></tr>
          <tr><td>Celeste</td><td>AI/ML Engineer</td><td>ML Pipeline Documentation</td></tr>
        </table>
        
        <h3>Sales (5 Assistants)</h3>
        <table>
          <tr><th>Name</th><th>Role</th><th>Capabilities</th></tr>
          <tr><td>Clara</td><td>Lead Manager</td><td>Lead pipeline, qualification, scoring</td></tr>
          <tr><td>Hunter</td><td>Lead Prospecting</td><td>Lead sources, acquisition</td></tr>
          <tr><td>Oliver</td><td>Negotiation AI</td><td>Deal negotiation support</td></tr>
          <tr><td>Kairos</td><td>Luxury Specialist</td><td>VIP client services</td></tr>
          <tr><td>Chloe</td><td>Client Relations</td><td>Customer relationship management</td></tr>
        </table>
        
        <h3>Operations (5 Assistants)</h3>
        <table>
          <tr><th>Name</th><th>Role</th><th>Capabilities</th></tr>
          <tr><td>Mary</td><td>Inventory Manager</td><td>Property data, DAMAC integration</td></tr>
          <tr><td>Daisy</td><td>Property Coordinator</td><td>Property operations</td></tr>
          <tr><td>Sentinel</td><td>Property Analytics</td><td>Property performance metrics</td></tr>
          <tr><td>Atlas</td><td>Project Management</td><td>Off-plan project tracking</td></tr>
          <tr><td>Aria</td><td>Scheduling Assistant</td><td>Appointment management</td></tr>
        </table>
        
        <h3>Communications (5 Assistants)</h3>
        <table>
          <tr><th>Name</th><th>Role</th><th>Capabilities</th></tr>
          <tr><td>Linda</td><td>WhatsApp Manager</td><td>23+ agent WhatsApp accounts</td></tr>
          <tr><td>Nina</td><td>WhatsApp Bot</td><td>Chatbot automation</td></tr>
          <tr><td>Laila</td><td>Arabic Communications</td><td>Arabic language support</td></tr>
          <tr><td>Juno</td><td>Community Manager</td><td>Community engagement</td></tr>
          <tr><td>Echo</td><td>Voice Assistant</td><td>Voice-based queries</td></tr>
        </table>
        
        <h2>3. Event Bus Architecture</h2>
        <p>All assistants communicate via Redux middleware event bus, enabling:</p>
        <ul>
          <li>Cross-department suggestions to Zoe</li>
          <li>Real-time status updates</li>
          <li>Coordinated workflows</li>
          <li>Audit logging</li>
        </ul>
      </div>
    `,
  },

  aurora_roadmap: {
    id: 'aurora_roadmap',
    title: 'Project Roadmap',
    source: DOCUMENT_SOURCES.AURORA,
    type: DOCUMENT_TYPES.HTML,
    category: 'Technical Documentation',
    description: 'Platform development roadmap and milestones',
    version: '2.5',
    lastUpdated: '2026-01-09',
    author: 'Aurora (CTO Intelligence)',
    content: `
      <div class="doc-content">
        <h1>Project Roadmap</h1>
        <p class="doc-meta">Version 2.5 | Current Phase: Production</p>
        
        <h2>Completed Milestones</h2>
        <table>
          <tr><th>Date</th><th>Milestone</th><th>Status</th></tr>
          <tr><td>Jun 2025</td><td>Project Kickoff</td><td>✅ Completed</td></tr>
          <tr><td>Jul 2025</td><td>Core Platform Development</td><td>✅ Completed</td></tr>
          <tr><td>Aug 2025</td><td>Property Management Module</td><td>✅ Completed</td></tr>
          <tr><td>Sep 2025</td><td>Stripe Payment Integration</td><td>✅ Completed</td></tr>
          <tr><td>Oct 2025</td><td>Production Launch v1.0</td><td>✅ Completed</td></tr>
          <tr><td>Oct 2025</td><td>AI Assistants Phase 1 (8)</td><td>✅ Completed</td></tr>
          <tr><td>Nov 2025</td><td>WhatsApp Business Integration</td><td>✅ Completed</td></tr>
          <tr><td>Dec 2025</td><td>AI Assistants Phase 2 (16)</td><td>✅ Completed</td></tr>
          <tr><td>Dec 2025</td><td>DAMAC Inventory Integration</td><td>✅ Completed</td></tr>
          <tr><td>Jan 2026</td><td>AI Assistants Complete (38)</td><td>✅ Completed</td></tr>
        </table>
        
        <h2>Current Sprint</h2>
        <table>
          <tr><th>Feature</th><th>Status</th><th>Target</th></tr>
          <tr><td>Organization Dashboard</td><td>🔄 In Progress</td><td>Jan 2026</td></tr>
          <tr><td>CRM Document Viewer</td><td>🔄 In Progress</td><td>Jan 2026</td></tr>
          <tr><td>Enhanced Navigation</td><td>🔄 In Progress</td><td>Jan 2026</td></tr>
        </table>
        
        <h2>Upcoming Features</h2>
        <table>
          <tr><th>Feature</th><th>Target</th></tr>
          <tr><td>Mobile App (iOS/Android)</td><td>Feb 2026</td></tr>
          <tr><td>UAE Pass Integration</td><td>Mar 2026</td></tr>
          <tr><td>AR Property Tours</td><td>Apr 2026</td></tr>
          <tr><td>Voice Assistant</td><td>May 2026</td></tr>
        </table>
      </div>
    `,
  },

  aurora_feature_registry: {
    id: 'aurora_feature_registry',
    title: 'Feature Registry',
    source: DOCUMENT_SOURCES.AURORA,
    type: DOCUMENT_TYPES.HTML,
    category: 'Technical Documentation',
    description: 'Complete catalog of platform features with status',
    version: '2.5',
    lastUpdated: '2026-01-09',
    author: 'Aurora (CTO Intelligence)',
  },

  aurora_release_history: {
    id: 'aurora_release_history',
    title: 'Release History',
    source: DOCUMENT_SOURCES.AURORA,
    type: DOCUMENT_TYPES.HTML,
    category: 'Technical Documentation',
    description: 'Version release notes and changelog',
    version: '2.5',
    lastUpdated: '2026-01-09',
    author: 'Aurora (CTO Intelligence)',
  },

};

