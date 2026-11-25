/**
 * landlordDocuments.data.ts — Data types & mappers for LandlordDocumentsTab
 * Single-purpose module (< 350 lines, AEG-042).
 */

export interface ApiLease {
  id: string;
  leaseNumber?: string | null;
  startDate: string;
  endDate: string;
  status: string;
  ejariNumber?: string | null;
  ejariStatus?: string | null;
  tenant: { id: string; name: string } | null;
  property: { id: string; title: string } | null;
  documents: string[];
}

export interface DocumentEntry {
  id: string;
  name: string;
  type: 'tenancy' | 'ejari' | 'noc' | 'receipt';
  property: string;
  issuedDate: string;
  url: string;
}

export const FALLBACK_DOCUMENTS: DocumentEntry[] = [
  {
    id: 'doc-001',
    name: 'Marina View Tenancy Agreement',
    type: 'tenancy',
    property: 'Marina View 2BR Apartment',
    issuedDate: 'Jan 1, 2024',
    url: 'https://example.com/docs/doc-001.pdf',
  },
  {
    id: 'doc-002',
    name: 'Ejari Certificate',
    type: 'ejari',
    property: 'Downtown Studio',
    issuedDate: 'Feb 1, 2024',
    url: 'https://example.com/docs/doc-002.pdf',
  },
  {
    id: 'doc-003',
    name: 'JBR Villa NOC Letter',
    type: 'noc',
    property: 'JBR 3BR Villa',
    issuedDate: 'Mar 1, 2024',
    url: 'https://example.com/docs/doc-003.pdf',
  },
  {
    id: 'doc-004',
    name: 'Rent Payment Receipt',
    type: 'receipt',
    property: 'Marina View 2BR Apartment',
    issuedDate: 'Apr 1, 2024',
    url: 'https://example.com/docs/doc-004.pdf',
  },
];

export function leasesToDocuments(leases: ApiLease[]): DocumentEntry[] {
  const docs: DocumentEntry[] = [];

  for (const lease of leases) {
    const propTitle = lease.property?.title ?? 'Unknown Property';
    const tenantName = lease.tenant?.name ?? 'Unknown Tenant';
    const issued = new Date(lease.startDate).toLocaleDateString('en-AE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    docs.push({
      id: `${lease.id}-tenancy`,
      name: `${propTitle} — Tenancy Agreement (${tenantName})`,
      type: 'tenancy',
      property: propTitle,
      issuedDate: issued,
      url: lease.documents?.[0] ?? '#',
    });

    if (lease.ejariNumber) {
      docs.push({
        id: `${lease.id}-ejari`,
        name: `${propTitle} — Ejari Certificate (${lease.ejariNumber})`,
        type: 'ejari',
        property: propTitle,
        issuedDate: issued,
        url: '#',
      });
    }
  }

  return docs;
}
