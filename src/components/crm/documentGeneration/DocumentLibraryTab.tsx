import React, { FC } from 'react';
import { GeneratedDoc } from './types';
import { RED, WHITE, SLATE, BORDER, CARD_BG, TEXT_MUTED, docTypeLabel, docTypeColor, DOC_FILTER_TYPES } from './constants';

interface DocumentLibraryTabProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterType: string;
  onFilterChange: (type: string) => void;
  generatedDocs: GeneratedDoc[];
  filteredDocs: GeneratedDoc[];
  onPreview: (doc: GeneratedDoc) => void;
  onActionToast: (message: string, color: string) => void;
}

export const DocumentLibraryTab: FC<DocumentLibraryTabProps> = ({
  searchQuery,
  onSearchChange,
  filterType,
  onFilterChange,
  generatedDocs,
  filteredDocs,
  onPreview,
  onActionToast,
}) => {
  const stats = [
    { label: 'Total Documents', value: generatedDocs.length, color: SLATE },
    {
      label: 'Contracts & Leases',
      value: generatedDocs.filter(d => d.type === 'TENANCY_CONTRACT' || d.type === 'MOU_SALE').length,
      color: '#3B82F6',
    },
    {
      label: 'Commission Statements',
      value: generatedDocs.filter(d => d.type === 'COMMISSION_STATEMENT').length,
      color: '#8B5CF6',
    },
    {
      label: 'PDC Schedules',
      value: generatedDocs.filter(d => d.type === 'PDC_SCHEDULE').length,
      color: '#EC4899',
    },
  ];

  return (
    <div>
      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="🔍 Search documents..."
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          style={{
            padding: '8px 12px',
            border: `1px solid ${BORDER}`,
            borderRadius: '6px',
            fontSize: '0.875rem',
            minWidth: '220px',
          }}
        />
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {DOC_FILTER_TYPES.map(type => {
            const isSelected = filterType === type;
            const activeColor = docTypeColor[type] || RED;
            return (
              <button
                key={type}
                onClick={() => onFilterChange(type)}
                style={{
                  background: isSelected ? activeColor : WHITE,
                  color: isSelected ? WHITE : SLATE,
                  border: `1px solid ${isSelected ? activeColor : BORDER}`,
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  fontWeight: 600,
                  transition: 'all 0.15s',
                }}
              >
                {docTypeLabel[type] || type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' }}>
        {stats.map(stat => (
          <div
            key={stat.label}
            style={{
              background: CARD_BG,
              padding: '14px',
              borderRadius: '8px',
              borderLeft: `4px solid ${stat.color}`,
            }}
          >
            <div style={{ fontSize: '0.72rem', color: TEXT_MUTED, textTransform: 'uppercase', fontWeight: 700 }}>
              {stat.label}
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: stat.color, marginTop: '4px' }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Document Table */}
      <div style={{ background: WHITE, borderRadius: '10px', border: `1px solid ${BORDER}`, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: SLATE, color: WHITE }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.8rem', fontWeight: 700 }}>
                DOCUMENT TITLE
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.8rem', fontWeight: 700 }}>TYPE</th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.8rem', fontWeight: 700 }}>
                GENERATED
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '0.8rem', fontWeight: 700 }}>SIZE</th>
              <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '0.8rem', fontWeight: 700 }}>
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredDocs.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: TEXT_MUTED }}>
                  No documents found. Generate a new one from the Generate tab.
                </td>
              </tr>
            ) : (
              filteredDocs.map((doc, idx) => (
                <tr
                  key={doc.id}
                  style={{
                    borderBottom: '1px solid #E2E8F0',
                    background: idx % 2 === 0 ? WHITE : CARD_BG,
                  }}
                >
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem', color: SLATE }}>{doc.title}</div>
                    <div
                      style={{
                        fontSize: '0.72rem',
                        color: TEXT_MUTED,
                        fontFamily: 'monospace',
                        marginTop: '2px',
                      }}
                    >
                      {doc.id}
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span
                      style={{
                        background: `${docTypeColor[doc.type] || RED}20`,
                        color: docTypeColor[doc.type] || RED,
                        padding: '3px 8px',
                        borderRadius: '12px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                      }}
                    >
                      {docTypeLabel[doc.type] || doc.type}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '0.8rem', color: TEXT_MUTED }}>{doc.timestamp}</td>
                  <td style={{ padding: '14px 16px', fontSize: '0.8rem', color: TEXT_MUTED }}>{doc.sizeKb} KB</td>
                  <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                      <button
                        onClick={() => onPreview(doc)}
                        style={{
                          background: '#0284C7',
                          color: WHITE,
                          border: 'none',
                          padding: '6px 10px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                        }}
                      >
                        👁️ Preview
                      </button>
                      <button
                        onClick={() => onActionToast(`⬇ Downloading ${doc.title}.pdf...`, RED)}
                        style={{
                          background: RED,
                          color: WHITE,
                          border: 'none',
                          padding: '6px 10px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                        }}
                      >
                        ⬇ PDF
                      </button>
                      <button
                        onClick={() => onActionToast(`📤 Sending ${doc.title} via WhatsApp / Email...`, SLATE)}
                        style={{
                          background: SLATE,
                          color: WHITE,
                          border: 'none',
                          padding: '6px 10px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                        }}
                      >
                        📤 Send
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
