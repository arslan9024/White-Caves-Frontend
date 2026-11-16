// @ts-nocheck
import { DOCUMENT_TYPES, DOCUMENT_SOURCES } from './documentRegistry.types';

export const companyDocs = {
  company_rera_compliance: {
    id: 'company_rera_compliance',
    title: 'RERA Compliance Guidelines',
    source: DOCUMENT_SOURCES.COMPANY,
    type: DOCUMENT_TYPES.HTML,
    category: 'Compliance',
    description: 'Dubai Real Estate Regulatory Agency compliance requirements',
    version: '1.0',
    lastUpdated: '2025-12-01',
    author: 'Compliance Department',
    content: `
      <div class="doc-content">
        <h1>RERA Compliance Guidelines</h1>
        <p class="doc-meta">Version 1.0 | Dubai Real Estate Regulatory Agency</p>
        
        <h2>1. Overview</h2>
        <p>All real estate activities must comply with RERA regulations to maintain our license and protect clients.</p>
        
        <h2>2. Agent Requirements</h2>
        <ul>
          <li>Valid RERA broker card</li>
          <li>Annual license renewal</li>
          <li>Mandatory training completion</li>
          <li>Commission disclosure requirements</li>
        </ul>
        
        <h2>3. Transaction Requirements</h2>
        <ul>
          <li>Form A/B for sales transactions</li>
          <li>Ejari registration for all rentals</li>
          <li>DLD registration within 30 days</li>
          <li>Proper escrow account usage</li>
        </ul>
        
        <h2>4. Documentation</h2>
        <ul>
          <li>Title deed verification for all properties</li>
          <li>Developer NOC for off-plan sales</li>
          <li>Service charge clearance certificates</li>
          <li>PDC handling procedures</li>
        </ul>
      </div>
    `,
  },

  company_ejari_guide: {
    id: 'company_ejari_guide',
    title: 'Ejari Registration Guide',
    source: DOCUMENT_SOURCES.COMPANY,
    type: DOCUMENT_TYPES.HTML,
    category: 'Procedures',
    description: 'Step-by-step guide for Ejari tenancy registration',
    version: '1.0',
    lastUpdated: '2025-12-01',
    author: 'Leasing Department',
    content: `
      <div class="doc-content">
        <h1>Ejari Registration Guide</h1>
        <p class="doc-meta">Version 1.0 | Tenancy Contract Registration</p>
        
        <h2>1. What is Ejari?</h2>
        <p>Ejari is the official system for registering tenancy contracts in Dubai, mandatory for all rental agreements.</p>
        
        <h2>2. Required Documents</h2>
        <h3>From Landlord:</h3>
        <ul>
          <li>Title deed copy</li>
          <li>Emirates ID copy</li>
          <li>Passport copy</li>
        </ul>
        
        <h3>From Tenant:</h3>
        <ul>
          <li>Emirates ID copy</li>
          <li>Passport copy</li>
          <li>Visa page copy</li>
        </ul>
        
        <h2>3. Registration Steps</h2>
        <ol>
          <li>Create tenancy contract in system</li>
          <li>Collect digital signatures from both parties</li>
          <li>Upload to RERA portal</li>
          <li>Pay registration fee (AED 220)</li>
          <li>Receive Ejari certificate</li>
        </ol>
        
        <h2>4. Timeline</h2>
        <p>Registration must be completed within 14 days of contract signing.</p>
      </div>
    `,
  },

  company_service_catalog: {
    id: 'company_service_catalog',
    title: 'Service Catalog',
    source: DOCUMENT_SOURCES.COMPANY,
    type: DOCUMENT_TYPES.HTML,
    category: 'Services',
    description: 'Complete catalog of 40 services across 8 categories',
    version: '1.0',
    lastUpdated: '2026-01-01',
    author: 'Operations Department',
    content: `
      <div class="doc-content">
        <h1>Service Catalog</h1>
        <p class="doc-meta">Version 1.0 | 40 Services | 8 Categories</p>
        
        <h2>1. Sales Services</h2>
        <ul>
          <li>Property Sale Consultation</li>
          <li>Market Valuation</li>
          <li>Buyer Matching</li>
          <li>Negotiation Support</li>
          <li>Transaction Management</li>
        </ul>
        
        <h2>2. Rental Services</h2>
        <ul>
          <li>Rental Listing</li>
          <li>Tenant Screening</li>
          <li>Lease Agreement</li>
          <li>Ejari Registration</li>
          <li>Renewal Management</li>
        </ul>
        
        <h2>3. Property Management</h2>
        <ul>
          <li>Maintenance Coordination</li>
          <li>Rent Collection</li>
          <li>Inspection Services</li>
          <li>Handover Coordination</li>
          <li>Snagging Reports</li>
        </ul>
        
        <h2>4. Financial Services</h2>
        <ul>
          <li>Mortgage Consultation</li>
          <li>Payment Processing</li>
          <li>Invoice Generation</li>
          <li>Commission Calculation</li>
        </ul>
        
        <h2>5. Legal Services</h2>
        <ul>
          <li>Contract Review</li>
          <li>Title Deed Transfer</li>
          <li>NOC Processing</li>
          <li>Dispute Resolution</li>
        </ul>
      </div>
    `,
  },
};

