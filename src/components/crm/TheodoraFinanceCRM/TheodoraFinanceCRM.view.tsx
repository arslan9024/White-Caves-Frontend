import React from 'react';
import { DollarSign, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { TheodoraFinanceCRMProps, TabType } from './TheodoraFinanceCRM.types';
import { STATS, TABS } from './TheodoraFinanceCRM.data';
import { useTheodoraFinanceCRM as useTheodoraFinanceCRMLogic } from './TheodoraFinanceCRM.logic';
import {
  InvoicesViewPanel,
  PaymentsViewPanel,
  ExpensesViewPanel,
  ReportsViewPanel,
  ExtendedWidgetsPanel,
} from './TheodoraFinanceCRM.panels';

export const TheodoraFinanceCRMView: React.FC<TheodoraFinanceCRMProps> = ({
  activeTab: propActiveTab = 'overview',
  onTabChange,
}) => {
  const {
    activeTab,
    selectedInvoice,
    generatedMessage,
    setSelectedInvoice,
    handleTabClick,
    handleGeneratePaymentMessage,
  } = useTheodoraFinanceCRMLogic(propActiveTab, onTabChange);

  return (
    <div className="theodora-finance-crm">
      <div className="crm-header">
        <div className="header-info">
          <h2>Theodora - Finance Engine</h2>
          <p>Multi-currency invoicing, VAT calculation, and automated financial tracking</p>
        </div>
      </div>

      <div className="crm-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.id as TabType)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="crm-content">
        {activeTab === 'overview' && (
          <div className="overview-view">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon revenue">
                  <DollarSign size={24} />
                </div>
                <div className="stat-details">
                  <span className="stat-value">AED {STATS.totalRevenue.toLocaleString()}</span>
                  <span className="stat-label">Total Revenue</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon pending">
                  <Clock size={24} />
                </div>
                <div className="stat-details">
                  <span className="stat-value">
                    AED {STATS.pendingReceivables.toLocaleString()}
                  </span>
                  <span className="stat-label">Pending Receivables</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon rate">
                  <CheckCircle2 size={24} />
                </div>
                <div className="stat-details">
                  <span className="stat-value">{STATS.collectionRate}%</span>
                  <span className="stat-label">Collection Rate</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon vat">
                  <AlertCircle size={24} />
                </div>
                <div className="stat-details">
                  <span className="stat-value">AED {STATS.vatPayable.toLocaleString()}</span>
                  <span className="stat-label">VAT Payable</span>
                </div>
              </div>
            </div>

            <div className="overview-sections">
              <div className="section">
                <h3>Recent Invoices</h3>
                <InvoicesViewPanel />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'invoices' && <InvoicesViewPanel />}

        {activeTab === 'payments' && (
          <PaymentsViewPanel
            selectedInvoice={selectedInvoice}
            setSelectedInvoice={setSelectedInvoice}
            generatedMessage={generatedMessage}
            onGenerateMessage={handleGeneratePaymentMessage}
          />
        )}

        {activeTab === 'expenses' && <ExpensesViewPanel />}

        {activeTab === 'reports' && <ReportsViewPanel />}

        <ExtendedWidgetsPanel activeTab={activeTab} />
      </div>
    </div>
  );
};

