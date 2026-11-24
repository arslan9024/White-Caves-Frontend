import React, { FC } from 'react';
import type { Property } from '../../mocks/dubaiRealEstateMocks';
import {
  type EnrichedProperty, type ViewMode,
  RED, WHITE, SLATE, BORDER, CARD_BG, TEXT_MUTED, statusBadge,
} from './PropertySearchSidebar';

interface Props {
  viewMode: ViewMode;
  paged: EnrichedProperty[];
  selectedProperty: Property | null;
  setSelectedProperty: (p: Property | null) => void;
  currency: string;
  priceDisplay: (p: Property) => string;
  page: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const PropertySearchResultsGrid: FC<Props> = ({
  viewMode, paged, selectedProperty, setSelectedProperty, currency, priceDisplay, page, totalPages, setPage,
}) => (
  <>

          {viewMode === 'grid' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                marginBottom: '20px',
              }}
            >
              {paged.map((p: EnrichedProperty) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedProperty(p === selectedProperty ? null : p)}
                  style={{
                    background: WHITE,
                    borderRadius: '12px',
                    border:
                      selectedProperty?.id === p.id ? `2px solid ${RED}` : `1px solid ${BORDER}`,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'box-shadow 0.2s',
                    boxShadow:
                      selectedProperty?.id === p.id
                        ? `0 4px 16px ${RED}30`
                        : '0 1px 4px rgba(0,0,0,0.06)',
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      style={{ width: '100%', height: '160px', objectFit: 'cover' }}
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: statusBadge[p.status]?.bg || CARD_BG,
                        color: statusBadge[p.status]?.color || TEXT_MUTED,
                        padding: '3px 8px',
                        borderRadius: '20px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                      }}
                    >
                      {p.status}
                    </span>
                    <span
                      style={{
                        position: 'absolute',
                        top: '10px',
                        left: '10px',
                        background: 'rgba(15,23,42,0.75)',
                        color: WHITE,
                        padding: '3px 8px',
                        borderRadius: '8px',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        backdropFilter: 'blur(4px)',
                      }}
                    >
                      {p.propType}
                    </span>
                  </div>
                  <div style={{ padding: '12px' }}>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: '0.875rem',
                        color: SLATE,
                        marginBottom: '2px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {p.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: TEXT_MUTED, marginBottom: '8px' }}>
                      {p.community} · {p.developer}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div style={{ fontWeight: 900, fontSize: '1rem', color: RED }}>
                        {priceDisplay(p)}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: TEXT_MUTED }}>
                        {p.beds}bd · {p.baths}ba · {p.sqft.toLocaleString()} sqft
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: '0.65rem',
                        color: TEXT_MUTED,
                        marginTop: '6px',
                        fontFamily: 'monospace',
                      }}
                    >
                      {p.reraPermitNumber}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {viewMode === 'table' && (
            <div
              style={{
                background: WHITE,
                borderRadius: '10px',
                border: `1px solid ${BORDER}`,
                overflow: 'hidden',
                marginBottom: '20px',
              }}
            >
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                <thead>
                  <tr style={{ background: SLATE, color: WHITE }}>
                    <th style={{ padding: '10px 14px', textAlign: 'left' }}>PROPERTY</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left' }}>COMMUNITY</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left' }}>STATUS</th>
                    <th style={{ padding: '10px 14px', textAlign: 'right' }}>
                      PRICE ({currency})
                    </th>
                    <th style={{ padding: '10px 14px', textAlign: 'right' }}>BEDS</th>
                    <th style={{ padding: '10px 14px', textAlign: 'right' }}>SQFT</th>
                    <th style={{ padding: '10px 14px', textAlign: 'left' }}>RERA PERMIT</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.map((p: EnrichedProperty, idx: number) => {
                    const sc = statusBadge[p.status] || { bg: CARD_BG, color: TEXT_MUTED };
                    return (
                      <tr
                        key={p.id}
                        onClick={() => setSelectedProperty(p === selectedProperty ? null : p)}
                        style={{
                          borderBottom: '1px solid #E2E8F0',
                          background:
                            selectedProperty?.id === p.id
                              ? '#FEF2F2'
                              : idx % 2 === 0
                                ? WHITE
                                : CARD_BG,
                          cursor: 'pointer',
                        }}
                      >
                        <td style={{ padding: '10px 14px', fontWeight: 600, color: SLATE }}>
                          {p.title}
                        </td>
                        <td style={{ padding: '10px 14px', color: TEXT_MUTED }}>
                          {p.community} · {p.developer}
                        </td>
                        <td style={{ padding: '10px 14px' }}>
                          <span
                            style={{
                              background: sc.bg,
                              color: sc.color,
                              padding: '2px 8px',
                              borderRadius: '10px',
                              fontWeight: 700,
                              fontSize: '0.72rem',
                            }}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td
                          style={{
                            padding: '10px 14px',
                            textAlign: 'right',
                            fontWeight: 700,
                            color: RED,
                          }}
                        >
                          {priceDisplay(p)}
                        </td>
                        <td style={{ padding: '10px 14px', textAlign: 'right' }}>{p.beds}</td>
                        <td style={{ padding: '10px 14px', textAlign: 'right' }}>
                          {p.sqft.toLocaleString()}
                        </td>
                        <td
                          style={{
                            padding: '10px 14px',
                            fontFamily: 'monospace',
                            fontSize: '0.72rem',
                            color: TEXT_MUTED,
                          }}
                        >
                          {p.reraPermitNumber}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '6px',
              alignItems: 'center',
              marginTop: '4px',
            }}
          >
            <button
              onClick={() => setPage(1)}
              disabled={page === 1}
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                border: `1px solid ${BORDER}`,
                background: WHITE,
                cursor: page === 1 ? 'not-allowed' : 'pointer',
                opacity: page === 1 ? 0.5 : 1,
                fontWeight: 700,
              }}
            >
              «
            </button>
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                border: `1px solid ${BORDER}`,
                background: WHITE,
                cursor: page === 1 ? 'not-allowed' : 'pointer',
                opacity: page === 1 ? 0.5 : 1,
                fontWeight: 700,
              }}
            >
              ‹
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pg = Math.max(1, Math.min(page - 2 + i, totalPages - 4 + i));
              return (
                <button
                  key={`page-btn-${i}-${pg}`}
                  onClick={() => setPage(pg)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: `1px solid ${pg === page ? RED : BORDER}`,
                    background: pg === page ? RED : WHITE,
                    color: pg === page ? WHITE : SLATE,
                    cursor: 'pointer',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                  }}
                >
                  {pg}
                </button>
              );
            })}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                border: `1px solid ${BORDER}`,
                background: WHITE,
                cursor: page === totalPages ? 'not-allowed' : 'pointer',
                opacity: page === totalPages ? 0.5 : 1,
                fontWeight: 700,
              }}
            >
              ›
            </button>
            <button
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                border: `1px solid ${BORDER}`,
                background: WHITE,
                cursor: page === totalPages ? 'not-allowed' : 'pointer',
                opacity: page === totalPages ? 0.5 : 1,
                fontWeight: 700,
              }}
            >
              »
            </button>
          </div>
  </>
);
