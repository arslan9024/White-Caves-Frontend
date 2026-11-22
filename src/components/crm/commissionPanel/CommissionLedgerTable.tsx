import React, { FC, ReactNode } from 'react';
import {
  WHITE,
  SLATE,
  BORDER,
  CARD_BG,
  TEXT_MUTED,
  GREEN,
  ORANGE,
  type CommissionRecord,
  statusConfig,
  txTypeColor,
} from '../CommissionManagementPanel.data';

interface CommissionLedgerTableProps {
  agents: string[];
  filtered: CommissionRecord[];
  filterAgent: string;
  filterStatus: string;
  filterType: string;
  selectedRecord: CommissionRecord | null;
  onFilterAgentChange: (value: string) => void;
  onFilterStatusChange: (value: string) => void;
  onFilterTypeChange: (value: string) => void;
  onToggleRecord: (record: CommissionRecord) => void;
  detailPanel?: ReactNode;
}

const selectStyle = {
  padding: '7px 10px',
  border: `1px solid ${BORDER}`,
  borderRadius: '6px',
  fontSize: '0.8rem',
};

export const CommissionLedgerTable: FC<CommissionLedgerTableProps> = ({
  agents,
  filtered,
  filterAgent,
  filterStatus,
  filterType,
  selectedRecord,
  onFilterAgentChange,
  onFilterStatusChange,
  onFilterTypeChange,
  onToggleRecord,
  detailPanel,
}) => {
  return (
    <>
      {/* Filters */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <select
          value={filterAgent}
          onChange={e => onFilterAgentChange(e.target.value)}
          style={selectStyle}
        >
          <option value="ALL">All Agents</option>
          {agents.map(a => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
        <select
          value={filterStatus}
          onChange={e => onFilterStatusChange(e.target.value)}
          style={selectStyle}
        >
          <option value="ALL">All Statuses</option>
          {Object.keys(statusConfig).map(s => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={filterType}
          onChange={e => onFilterTypeChange(e.target.value)}
          style={selectStyle}
        >
          <option value="ALL">All Types</option>
          <option>Sale</option>
          <option>Lease</option>
          <option>Off-Plan</option>
        </select>
        <span
          style={{
            fontSize: '0.8rem',
            color: TEXT_MUTED,
            alignSelf: 'center',
            marginLeft: 'auto',
          }}
        >
          {filtered.length} records
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: selectedRecord ? '1.4fr 1fr' : '1fr',
          gap: '20px',
        }}
      >
        <div
          style={{
            background: WHITE,
            borderRadius: '10px',
            border: `1px solid ${BORDER}`,
            overflow: 'auto',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
            <thead>
              <tr style={{ background: SLATE, color: WHITE }}>
                <th style={{ padding: '10px 12px', textAlign: 'left' }}>DEAL REF</th>
                <th style={{ padding: '10px 12px', textAlign: 'left' }}>AGENT</th>
                <th style={{ padding: '10px 12px', textAlign: 'left' }}>TYPE</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>TX VALUE</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>GROSS COMM</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>AGENT SHARE</th>
                <th style={{ padding: '10px 12px', textAlign: 'right' }}>VAT</th>
                <th style={{ padding: '10px 12px', textAlign: 'left' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r, idx) => {
                const sc = statusConfig[r.status];
                return (
                  <tr
                    key={r.id}
                    onClick={() => onToggleRecord(r)}
                    style={{
                      borderBottom: '1px solid #E2E8F0',
                      background:
                        selectedRecord?.id === r.id ? '#FEF2F2' : idx % 2 === 0 ? WHITE : CARD_BG,
                      cursor: 'pointer',
                    }}
                  >
                    <td
                      style={{
                        padding: '10px 12px',
                        fontFamily: 'monospace',
                        fontSize: '0.72rem',
                        color: TEXT_MUTED,
                      }}
                    >
                      {r.dealReference}
                    </td>
                    <td style={{ padding: '10px 12px', fontWeight: 600 }}>{r.agentName}</td>
                    <td style={{ padding: '10px 12px' }}>
                      <span
                        style={{
                          background: `${txTypeColor[r.transactionType]}20`,
                          color: txTypeColor[r.transactionType],
                          padding: '2px 7px',
                          borderRadius: '8px',
                          fontWeight: 700,
                          fontSize: '0.7rem',
                        }}
                      >
                        {r.transactionType}
                      </span>
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 600 }}>
                      {(r.transactionValueAED / 1000000).toFixed(2)}M
                    </td>
                    <td
                      style={{
                        padding: '10px 12px',
                        textAlign: 'right',
                        fontWeight: 700,
                        color: SLATE,
                      }}
                    >
                      {r.grossCommissionAED.toLocaleString()}
                    </td>
                    <td
                      style={{
                        padding: '10px 12px',
                        textAlign: 'right',
                        fontWeight: 700,
                        color: GREEN,
                      }}
                    >
                      {r.agentEarningsAED.toLocaleString()}
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'right', color: ORANGE }}>
                      {r.vatAED.toLocaleString()}
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <span
                        style={{
                          background: sc.bg,
                          color: sc.color,
                          padding: '2px 7px',
                          borderRadius: '10px',
                          fontWeight: 700,
                          fontSize: '0.7rem',
                        }}
                      >
                        {sc.icon} {r.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr style={{ background: SLATE, color: WHITE }}>
                <td colSpan={4} style={{ padding: '10px 12px', fontWeight: 700 }}>
                  TOTALS ({filtered.length} records)
                </td>
                <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 900 }}>
                  {filtered.reduce((a, r) => a + r.grossCommissionAED, 0).toLocaleString()}
                </td>
                <td
                  style={{
                    padding: '10px 12px',
                    textAlign: 'right',
                    fontWeight: 900,
                    color: 'var(--color-6ee7b7, #6EE7B7)',
                  }}
                >
                  {filtered.reduce((a, r) => a + r.agentEarningsAED, 0).toLocaleString()}
                </td>
                <td
                  style={{
                    padding: '10px 12px',
                    textAlign: 'right',
                    fontWeight: 900,
                    color: 'var(--color-fcd34d, #FCD34D)',
                  }}
                >
                  {filtered.reduce((a, r) => a + r.vatAED, 0).toLocaleString()}
                </td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>

        {detailPanel}
      </div>
    </>
  );
};
