import React, { FC, useState, useMemo, useCallback } from 'react';
import {
  RED,
  WHITE,
  SLATE,
  GREEN,
  type CommissionRecord,
  COMMISSION_LEDGER,
} from './CommissionManagementPanel.data';
import {
  type ToastItem,
  type CommissionTab,
  computeKpiTotals,
  computeAgentSummary,
} from './commissionPanel/types';
import { CommissionHeaderKpis } from './commissionPanel/CommissionHeaderKpis';
import { CommissionLedgerTable } from './commissionPanel/CommissionLedgerTable';
import { CommissionDetailPanel } from './commissionPanel/CommissionDetailPanel';
import { AgentSummaryGrid } from './commissionPanel/AgentSummaryGrid';
import { CommissionToastStack } from './commissionPanel/CommissionToastStack';

export const CommissionManagementPanel: FC = () => {
  const [records, setRecords] = useState<CommissionRecord[]>(COMMISSION_LEDGER);
  const [filterAgent, setFilterAgent] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterType, setFilterType] = useState('ALL');
  const [selectedRecord, setSelectedRecord] = useState<CommissionRecord | null>(null);
  const [activeTab, setActiveTab] = useState<CommissionTab>('ledger');
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, color = SLATE) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, color }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3200);
  }, []);

  const agents = useMemo(() => Array.from(new Set(COMMISSION_LEDGER.map(r => r.agentName))), []);

  const filtered = useMemo(
    () =>
      records.filter(r => {
        const matchAgent = filterAgent === 'ALL' || r.agentName === filterAgent;
        const matchStatus = filterStatus === 'ALL' || r.status === filterStatus;
        const matchType = filterType === 'ALL' || r.transactionType === filterType;
        return matchAgent && matchStatus && matchType;
      }),
    [records, filterAgent, filterStatus, filterType]
  );

  const totals = useMemo(() => computeKpiTotals(records), [records]);
  const agentSummary = useMemo(() => computeAgentSummary(records, agents), [records, agents]);

  const handleApprove = (id: string) => {
    setRecords(prev => prev.map(r => (r.id === id ? { ...r, status: 'Approved' as const } : r)));
    if (selectedRecord?.id === id)
      setSelectedRecord(prev => (prev ? { ...prev, status: 'Approved' as const } : null));
  };

  const handleMarkPaid = (id: string) => {
    const today = new Date().toISOString().slice(0, 10);
    setRecords(prev =>
      prev.map(r => (r.id === id ? { ...r, status: 'Paid' as const, paymentDate: today } : r))
    );
    if (selectedRecord?.id === id)
      setSelectedRecord(prev =>
        prev ? { ...prev, status: 'Paid' as const, paymentDate: today } : null
      );
  };

  const handleFlagDisputed = (id: string) => {
    setRecords(prev => prev.map(r => (r.id === id ? { ...r, status: 'Disputed' as const } : r)));
    setSelectedRecord(null);
  };

  return (
    <div style={{ padding: '24px', background: WHITE, minHeight: '80vh' }}>
      <CommissionHeaderKpis
        totals={totals}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onExportAll={() =>
          showToast('📥 Generating Q3 commission statement PDFs for all agents...', RED)
        }
      />

      {activeTab === 'ledger' && (
        <CommissionLedgerTable
          agents={agents}
          filtered={filtered}
          filterAgent={filterAgent}
          filterStatus={filterStatus}
          filterType={filterType}
          selectedRecord={selectedRecord}
          onFilterAgentChange={setFilterAgent}
          onFilterStatusChange={setFilterStatus}
          onFilterTypeChange={setFilterType}
          onToggleRecord={r => setSelectedRecord(r === selectedRecord ? null : r)}
          detailPanel={
            selectedRecord && (
              <CommissionDetailPanel
                record={selectedRecord}
                onClose={() => setSelectedRecord(null)}
                onApprove={handleApprove}
                onMarkPaid={handleMarkPaid}
                onFlagDisputed={handleFlagDisputed}
                onGenerateStatement={(agentName, color) =>
                  showToast(`📄 Generating statement PDF for ${agentName}...`, color)
                }
              />
            )
          }
        />
      )}

      {activeTab === 'summary' && (
        <AgentSummaryGrid
          agentSummary={agentSummary}
          onGenerateStatement={agent =>
            showToast(`📄 Agent statement generated for ${agent}`, GREEN)
          }
        />
      )}

      <CommissionToastStack toasts={toasts} />
    </div>
  );
};

export default CommissionManagementPanel;
