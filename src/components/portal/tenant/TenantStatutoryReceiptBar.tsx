/**
 * TenantStatutoryReceiptBar.tsx — Active Ejari Badge, 1-Click Sequential Receipt & 5% UAE VAT PDF,
 * plus Move-In / Maintenance & WhatsApp Concierge Shortcuts.
 * Enforces White Caves Brand (#EF4444, #0F172A, #FFFFFF) and lucide-react icons exclusively.
 * Single-purpose module (< 350 lines, AEG-042).
 */

import React, { FC } from 'react';
import {
  ShieldCheck,
  Download,
  FileText,
  Wrench,
  CreditCard,
  MessageCircle,
  CheckCircle2,
} from 'lucide-react';

interface TenantStatutoryReceiptBarProps {
  dealId?: string;
  ejariNumber?: string;
  ejariStatus?: string;
  tenantName?: string | null;
  onNavigateTab: (tab: 'lease' | 'payments' | 'maintenance' | 'documents') => void;
}

export const TenantStatutoryReceiptBar: FC<TenantStatutoryReceiptBarProps> = ({
  dealId = 'WC-DH2-2026-L082',
  ejariNumber = 'EJARI-2026-8891',
  ejariStatus = 'Registered & Active',
  tenantName,
  onNavigateTab,
}) => {
  const receiptPdfUrl = `/api/leasing-formula/tenancy-deals/${dealId}/receipt-pdf`;
  const vatInvoiceUrl = `/api/leasing-formula/tenancy-deals/${dealId}/receipt-pdf?type=vat`;
  const whatsappHref = `https://wa.me/971505760056?text=${encodeURIComponent(
    `Hello White Caves Resident Desk, this is ${tenantName || 'a Tenant'} (${ejariNumber}) requesting move-in or maintenance assistance.`
  )}`;

  return (
    <div
      data-testid="tenant-statutory-receipt-bar"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '14px',
        padding: '16px 20px',
        marginBottom: '18px',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        border: '1px solid rgba(239, 68, 68, 0.35)',
        color: '#FFFFFF',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
          <span
            data-testid="tenant-ejari-status-badge"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '3px 10px',
              borderRadius: '9999px',
              background: 'rgba(16, 185, 129, 0.16)',
              border: '1px solid rgba(16, 185, 129, 0.45)',
              color: '#34D399',
              fontSize: '11px',
              fontWeight: 800,
              textTransform: 'uppercase',
            }}
          >
            <CheckCircle2 size={12} /> Ejari: {ejariStatus}
          </span>
          <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#94A3B8' }}>
            {ejariNumber}
          </span>
        </div>
        <div
          style={{
            fontSize: '14px',
            fontWeight: 800,
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <ShieldCheck size={15} color="#EF4444" />
          Official Tenancy Receipts, 5% UAE VAT Invoices &amp; Move-In Concierge
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
        <a
          href={receiptPdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="tenant-download-sequential-receipt"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '9px 14px',
            borderRadius: '10px',
            background: '#EF4444',
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: 800,
            textDecoration: 'none',
            boxShadow: '0 6px 18px rgba(239, 68, 68, 0.32)',
          }}
        >
          <Download size={14} /> Payment Receipt PDF
        </a>

        <a
          href={vatInvoiceUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="tenant-download-vat-invoice"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '9px 13px',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          <FileText size={14} color="#34D399" /> 5% UAE VAT Invoice
        </a>

        <button
          type="button"
          onClick={() => onNavigateTab('payments')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '9px 12px',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            color: '#E2E8F0',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          <CreditCard size={14} /> PDC Cheques
        </button>

        <button
          type="button"
          onClick={() => onNavigateTab('maintenance')}
          data-testid="tenant-movein-maintenance-cta"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '9px 12px',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            color: '#E2E8F0',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          <Wrench size={14} color="#F59E0B" /> Move-In &amp; Maintenance
        </button>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '9px 12px',
            borderRadius: '10px',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            color: '#34D399',
            fontSize: '12px',
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          <MessageCircle size={14} /> WhatsApp Concierge
        </a>
      </div>
    </div>
  );
};

export default TenantStatutoryReceiptBar;
