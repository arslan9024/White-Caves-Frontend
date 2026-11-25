import React from 'react';
import { FileSpreadsheet } from 'lucide-react';

export interface IngestPreviewItem {
  phone: string;
  e164: string;
  ownerName: string;
  cluster: string;
  unitRef: string;
  bedrooms: string;
  propertyStatus: string;
  sourceTab: string;
}

interface MarySheetsPreviewTableProps {
  previewList: IngestPreviewItem[];
}

export const MarySheetsPreviewTable: React.FC<MarySheetsPreviewTableProps> = ({ previewList }) => {
  if (!previewList.length) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748B' }}>
        <FileSpreadsheet size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
        <h4 style={{ margin: '0 0 6px', color: '#94A3B8' }}>No Sheet Data Ingested Yet</h4>
        <p style={{ margin: 0, fontSize: '0.85rem' }}>
          Click <strong>"Fetch Live Sheet"</strong> to have AI Sarita query the Google Sheets API.
        </p>
      </div>
    );
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #334155', color: '#94A3B8', textAlign: 'left' }}>
            <th style={{ padding: '8px' }}>Cluster</th>
            <th style={{ padding: '8px' }}>Unit Ref</th>
            <th style={{ padding: '8px' }}>Bedrooms</th>
            <th style={{ padding: '8px' }}>Landlord Name</th>
            <th style={{ padding: '8px' }}>Canonical Phone</th>
            <th style={{ padding: '8px' }}>Source Tab</th>
            <th style={{ padding: '8px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {previewList.map((row, idx) => (
            <tr key={idx} style={{ borderBottom: '1px solid #1E293B' }}>
              <td style={{ padding: '8px', fontWeight: 700, color: '#F8FAFC' }}>{row.cluster}</td>
              <td style={{ padding: '8px', color: '#38BDF8' }}>{row.unitRef}</td>
              <td style={{ padding: '8px', color: '#CBD5E1' }}>{row.bedrooms}</td>
              <td style={{ padding: '8px', color: '#F1F5F9' }}>{row.ownerName}</td>
              <td style={{ padding: '8px', color: '#10B981', fontFamily: 'monospace' }}>
                {row.e164}
              </td>
              <td style={{ padding: '8px', color: '#94A3B8' }}>{row.sourceTab}</td>
              <td style={{ padding: '8px' }}>
                <span
                  style={{
                    background: 'rgba(16, 185, 129, 0.15)',
                    color: '#10B981',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                  }}
                >
                  Verified
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
