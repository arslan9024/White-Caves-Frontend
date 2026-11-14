import React from 'react';
import {
  FileText,
  Search,
  MessageSquare,
  Send,
  BarChart3,
  PieChart,
  TrendingUp,
  Download,
} from 'lucide-react';
import { INVOICES, EXPENSES } from './TheodoraFinanceCRM.data';
import { Invoice } from './TheodoraFinanceCRM.types';
import PaymentInstructionDeck from '../../finance/PaymentInstructionDeck';
import KYCAMLDashboard from '../../compliance/KYCAMLDashboard';
import AssistantDocsTab from '../AssistantDocsTab';
import FinanceEngineProductionReleaseGateWidget from '../theodora/FinanceEngineProductionReleaseGateWidget';
import FinanceEngineLedgerBenchmarkWidget from '../theodora/FinanceEngineLedgerBenchmarkWidget';
import FinanceEngineFTAComplianceWidget from '../theodora/FinanceEngineFTAComplianceWidget';
import FinanceEnginePlaywrightE2EWidget from '../theodora/FinanceEnginePlaywrightE2EWidget';
import FinanceEngineVitestUnitTestsWidget from '../theodora/FinanceEngineVitestUnitTestsWidget';
import FinanceRBACWidget from '../theodora/FinanceRBACWidget';
import ZakatCalculatorWidget from '../theodora/ZakatCalculatorWidget';
import IndustryBenchmarkWidget from '../theodora/IndustryBenchmarkWidget';
import InsurancePremiumWidget from '../theodora/InsurancePremiumWidget';
import CryptoPaymentWidget from '../theodora/CryptoPaymentWidget';
import InteractiveChartsWidget from '../theodora/InteractiveChartsWidget';
import FinanceAlertsWidget from '../theodora/FinanceAlertsWidget';
import FinanceI18NWidget from '../theodora/FinanceI18NWidget';
import ArabicRTLInvoiceWidget from '../theodora/ArabicRTLInvoiceWidget';
import MobileFinanceWidget from '../theodora/MobileFinanceWidget';

export const InvoicesViewPanel: React.FC = () => {
  return (
    <div className="invoices-view">
      <div className="view-header">
        <div className="search-box">
          <Search size={16} />
          <input type="text" placeholder="Search invoices..." />
        </div>
        <button className="add-btn">
          <FileText size={16} /> Create Invoice
        </button>
      </div>
      <div className="invoices-table">
        <div className="table-header">
          <span>Invoice #</span>
          <span>Client</span>
          <span>Property</span>
          <span>Amount</span>
          <span>Due Date</span>
          <span>Status</span>
        </div>
        {INVOICES.map(invoice => (
          <div key={invoice.id} className="table-row">
            <span className="invoice-id">{invoice.id}</span>
            <span>{invoice.client}</span>
            <span>{invoice.property}</span>
            <span className="amount">AED {invoice.amount.toLocaleString()}</span>
            <span>{invoice.dueDate}</span>
            <span className={`status-badge ${invoice.status}`}>{invoice.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const PaymentsViewPanel: React.FC<{
  selectedInvoice: Invoice | null;
  setSelectedInvoice: (inv: Invoice | null) => void;
  generatedMessage: string | null;
  onGenerateMessage: (data: { channel: string; message: string }) => void;
}> = ({ selectedInvoice, setSelectedInvoice, generatedMessage, onGenerateMessage }) => {
  return (
    <div className="payments-view">
      <h3>Payment Message Generator</h3>
      <p className="section-desc">
        Generate payment instructions for clients with QR codes, cheque details, or bank transfer
        information.
      </p>

      <div className="payment-form">
        <div className="form-row">
          <div className="form-group">
            <label>Select Invoice</label>
            <select
              value={selectedInvoice?.id || ''}
              onChange={e =>
                setSelectedInvoice(INVOICES.find(inv => inv.id === e.target.value) || null)
              }
            >
              <option value="">Choose an invoice...</option>
              {INVOICES.filter(inv => inv.status !== 'paid').map(inv => (
                <option key={inv.id} value={inv.id}>
                  {inv.id} - {inv.client} - AED {inv.amount.toLocaleString()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {selectedInvoice && (
          <div className="selected-invoice-summary">
            <div className="invoice-detail">
              <span className="label">Client:</span>
              <span className="value">{selectedInvoice.client}</span>
            </div>
            <div className="invoice-detail">
              <span className="label">Property:</span>
              <span className="value">{selectedInvoice.property}</span>
            </div>
            <div className="invoice-detail">
              <span className="label">Amount:</span>
              <span className="value highlight">AED {selectedInvoice.amount.toLocaleString()}</span>
            </div>
            <div className="invoice-detail">
              <span className="label">Due Date:</span>
              <span className="value">{selectedInvoice.dueDate}</span>
            </div>
          </div>
        )}
      </div>

      {selectedInvoice && (
        <PaymentInstructionDeck
          amount={selectedInvoice.amount}
          reference={selectedInvoice.id}
          clientName={selectedInvoice.client}
          invoiceId={selectedInvoice.id}
          onGenerateMessage={onGenerateMessage}
          showMethodSelector={true}
        />
      )}

      {generatedMessage && (
        <div className="generated-message-preview">
          <div className="preview-header">
            <MessageSquare size={16} />
            <h4>Generated Message Preview</h4>
          </div>
          <pre className="message-content">{generatedMessage}</pre>
          <div className="message-actions">
            <button className="action-btn primary">
              <Send size={14} /> Send via WhatsApp
            </button>
            <button className="action-btn secondary">
              <FileText size={14} /> Send via Email
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const ExpensesViewPanel: React.FC = () => {
  return (
    <div className="expenses-view">
      <h3>Recent Expenses</h3>
      <div className="expenses-list">
        {EXPENSES.map(expense => (
          <div key={expense.id} className="expense-card">
            <div className="expense-header">
              <span className="category">{expense.category}</span>
              <span className={`status-badge ${expense.status}`}>{expense.status}</span>
            </div>
            <p className="description">{expense.description}</p>
            <div className="expense-footer">
              <span className="amount">AED {expense.amount.toLocaleString()}</span>
              <span className="date">{expense.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ReportsViewPanel: React.FC = () => {
  return (
    <div className="reports-view">
      <h3>Financial Reports</h3>
      <div className="report-cards">
        <div className="report-card">
          <BarChart3 size={24} />
          <h4>Monthly P&L</h4>
          <p>Profit & Loss Statement</p>
          <button>
            <Download size={14} /> Download
          </button>
        </div>
        <div className="report-card">
          <PieChart size={24} />
          <h4>Expense Breakdown</h4>
          <p>Category-wise analysis</p>
          <button>
            <Download size={14} /> Download
          </button>
        </div>
        <div className="report-card">
          <TrendingUp size={24} />
          <h4>Revenue Trends</h4>
          <p>12-month comparison</p>
          <button>
            <Download size={14} /> Download
          </button>
        </div>
      </div>
    </div>
  );
};

export const ExtendedWidgetsPanel: React.FC<{ activeTab: string }> = ({ activeTab }) => {
  switch (activeTab) {
    case 'aml_monitoring':
      return (
        <KYCAMLDashboard
          assistant="theodora"
          accessLevel="limited"
          showTabs={['alerts', 'sanctions']}
        />
      );
    case 'gate':
      return (
        <div style={{ marginTop: '24px' }}>
          <FinanceEngineProductionReleaseGateWidget />
        </div>
      );
    case 'bench':
      return (
        <div style={{ marginTop: '24px' }}>
          <FinanceEngineLedgerBenchmarkWidget />
        </div>
      );
    case 'docs':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <FinanceEngineFTAComplianceWidget />
          <AssistantDocsTab assistantId="theodora" />
        </div>
      );
    case 'e2e':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <FinanceEnginePlaywrightE2EWidget />
        </div>
      );
    case 'vitest':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <FinanceEngineVitestUnitTestsWidget />
        </div>
      );
    case 'rbac':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <FinanceRBACWidget />
        </div>
      );
    case 'zakat':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <ZakatCalculatorWidget />
        </div>
      );
    case 'benchmark':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <IndustryBenchmarkWidget />
        </div>
      );
    case 'insurance':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <InsurancePremiumWidget />
        </div>
      );
    case 'crypto':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <CryptoPaymentWidget />
        </div>
      );
    case 'charts':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <InteractiveChartsWidget />
        </div>
      );
    case 'alerts':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <FinanceAlertsWidget />
        </div>
      );
    case 'i18n':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <FinanceI18NWidget />
        </div>
      );
    case 'rtl_invoice':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <ArabicRTLInvoiceWidget />
        </div>
      );
    case 'mobile':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <MobileFinanceWidget />
        </div>
      );
    default:
      return null;
  }
};
