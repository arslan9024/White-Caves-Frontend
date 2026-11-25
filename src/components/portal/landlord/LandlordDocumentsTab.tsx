/**
 * LandlordDocumentsTab — Landlord Documents & Sequential Receipt / Drive Vault
 * Decomposed under AEGIS V5.1 AEG-042 (< 350 lines).
 */

import React, { FC, useMemo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Download, FolderOpen } from 'lucide-react';
import type { RootState } from '../../../store/store';
import { authFetch } from '../../../utils/authFetch';
import '../../../pages/RolePages.css';
import {
  FALLBACK_DOCUMENTS,
  leasesToDocuments,
  type ApiLease,
  type DocumentEntry,
} from './documents/landlordDocuments.data';
import { LandlordDocumentDetailModal } from './documents/LandlordDocumentDetailModal';

export { FALLBACK_DOCUMENTS, leasesToDocuments, type ApiLease, type DocumentEntry };

const LandlordDocumentsTab: FC = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'tenancy' | 'ejari' | 'noc' | 'receipt'>(
    'all'
  );
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  const [leases, setLeases] = useState<ApiLease[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser) return;
    let cancelled = false;

    authFetch('/api/leases?role=landlord&pageSize=100')
      .then(r => r.json())
      .then(data => {
        if (!cancelled) {
          setLeases(data.data ?? []);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(null);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [currentUser]);

  const documents: DocumentEntry[] = useMemo(
    () => (leases.length > 0 ? leasesToDocuments(leases) : FALLBACK_DOCUMENTS),
    [leases]
  );

  const filteredDocuments = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();
    return documents.filter(document => {
      const typeMatches = typeFilter === 'all' || document.type === typeFilter;
      const searchMatches =
        normalizedSearch.length === 0 ||
        document.name.toLowerCase().includes(normalizedSearch) ||
        document.property.toLowerCase().includes(normalizedSearch);
      return typeMatches && searchMatches;
    });
  }, [documents, searchQuery, typeFilter]);

  const selectedDocument = useMemo(
    () => documents.find(d => d.id === selectedDocumentId) ?? null,
    [documents, selectedDocumentId]
  );

  if (!currentUser) {
    return (
      <div className="empty-state">
        <p>You must be logged in to view your documents.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="empty-state" data-testid="documents-loading">
        <p>Loading your documents…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="empty-state" data-testid="documents-error">
        <p>{error}</p>
        <button className="btn-secondary" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  const activeDealId = leases[0]?.id ?? 'WC-DH2-2026-L082';

  return (
    <div className="tab-content-section landlord-documents-tab">
      <div className="tab-header">
        <h3>Documents</h3>
        <p>Review tenancy files, Ejari certificates, NOC letters, and receipts.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
          <a
            href={`/api/leasing-formula/tenancy-deals/${activeDealId}/receipt-pdf`}
            target="_blank"
            rel="noreferrer"
            data-testid="landlord-receipt-pdf-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 12px',
              borderRadius: '8px',
              background: '#0F172A',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            <Download size={13} color="#EF4444" /> Sequential Receipt &amp; 5% VAT PDF
          </a>
          <a
            href="https://drive.google.com/drive/search?q=Inventory%20Areas%20Damac%20Hills%202"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 12px',
              borderRadius: '8px',
              background: '#EF4444',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            <FolderOpen size={13} /> DAMAC Hills 2 Drive Vault
          </a>
        </div>
      </div>

      <div className="tab-controls">
        <input
          data-testid="document-search"
          type="text"
          placeholder="Search by document name or property"
          value={searchQuery}
          onChange={event => setSearchQuery(event.target.value)}
        />

        <select
          data-testid="document-type-filter"
          value={typeFilter}
          onChange={event =>
            setTypeFilter(event.target.value as 'all' | 'tenancy' | 'ejari' | 'noc' | 'receipt')
          }
        >
          <option value="all">All Types</option>
          <option value="tenancy">Tenancy Agreement</option>
          <option value="ejari">Ejari Certificate</option>
          <option value="noc">NOC Letter</option>
          <option value="receipt">Receipt</option>
        </select>
      </div>

      {filteredDocuments.length === 0 ? (
        <div className="empty-state" data-testid="documents-empty-state">
          <p>No documents match your filters.</p>
        </div>
      ) : (
        <div className="documents-list" data-testid="documents-list">
          {filteredDocuments.map(document => (
            <div
              key={document.id}
              className="document-row"
              data-testid={`document-row-${document.id}`}
            >
              <div>
                <h4>{document.name}</h4>
                <p>{document.property}</p>
                <p>Issued: {document.issuedDate}</p>
              </div>

              <div>
                <span className={`status-badge type-${document.type}`}>{document.type}</span>
              </div>

              <div>
                {document.url !== '#' ? (
                  <a
                    href={document.url}
                    target="_blank"
                    rel="noreferrer"
                    data-testid={`download-link-${document.id}`}
                  >
                    Download
                  </a>
                ) : (
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    File pending upload
                  </span>
                )}
                <button
                  type="button"
                  className="btn-secondary"
                  data-testid={`view-details-${document.id}`}
                  onClick={() => setSelectedDocumentId(document.id)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedDocument && (
        <LandlordDocumentDetailModal
          document={selectedDocument}
          onClose={() => setSelectedDocumentId(null)}
        />
      )}
    </div>
  );
};

export default LandlordDocumentsTab;
