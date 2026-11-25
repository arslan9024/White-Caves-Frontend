/**
 * LandlordDirectMdBanner.tsx — Landlord Executive Channel to Managing Director (+971505760056)
 * Provides 1-click WhatsApp MD channel, DAMAC Hills 2 Drive Vault link, and rapid tab shortcuts.
 * Enforces White Caves Brand (#EF4444, #0F172A, #FFFFFF) and lucide-react icons exclusively.
 * Single-purpose module (< 350 lines, AEG-042).
 */

import React, { FC } from 'react';
import {
  MessageCircle,
  Layers,
  CreditCard,
  FileText,
  Wrench,
  FolderOpen,
  ShieldCheck,
} from 'lucide-react';

export const MD_PRIMARY_WHATSAPP_NUMBER = '+971505760056';

interface LandlordDirectMdBannerProps {
  landlordName?: string | null;
  onSelectTab: (tab: 'properties' | 'payments' | 'maintenance' | 'documents' | 'cockpit') => void;
}

export const LandlordDirectMdBanner: FC<LandlordDirectMdBannerProps> = ({
  landlordName,
  onSelectTab,
}) => {
  const prefilledText = encodeURIComponent(
    `Hello Arslan Malik (MD, White Caves Real Estate), this is ${landlordName || 'a Landlord Partner'} reaching out via the White Caves Landlord Portal regarding my DAMAC Hills 2 portfolio.`
  );
  const whatsappUrl = `https://wa.me/971505760056?text=${prefilledText}`;

  return (
    <div
      data-testid="landlord-md-whatsapp-banner"
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
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11px',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: '#EF4444',
          }}
        >
          <ShieldCheck size={13} /> Direct MD Executive Channel · DAMAC Hills 2 Portfolio
        </div>
        <div style={{ fontSize: '14px', fontWeight: 800, color: '#FFFFFF' }}>
          Arslan Malik — Managing Director Primary Desk ({MD_PRIMARY_WHATSAPP_NUMBER})
        </div>
        <div style={{ fontSize: '12px', color: '#CBD5E1' }}>
          Instant WhatsApp escalation for price negotiations, PDC cheque schedules, Ejari contracts
          &amp; maintenance approvals.
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="landlord-md-whatsapp-cta"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '10px 16px',
            borderRadius: '10px',
            background: '#EF4444',
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: 800,
            textDecoration: 'none',
            boxShadow: '0 6px 18px rgba(239, 68, 68, 0.35)',
          }}
        >
          <MessageCircle size={15} />
          WhatsApp MD (+971 50 576 0056)
        </a>

        <button
          type="button"
          onClick={() => onSelectTab('cockpit')}
          data-testid="landlord-open-deal-cockpit-btn"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '9px 12px',
            borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            color: '#FFFFFF',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          <Layers size={14} color="#EF4444" /> 12-Stage Deal Cockpit
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('payments')}
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
          onClick={() => onSelectTab('documents')}
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
          <FileText size={14} /> Contracts
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('maintenance')}
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
          <Wrench size={14} /> Tickets
        </button>

        <a
          href="https://drive.google.com/drive/search?q=Inventory%20Areas%20Damac%20Hills%202"
          target="_blank"
          rel="noopener noreferrer"
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
            textDecoration: 'none',
          }}
        >
          <FolderOpen size={14} color="#F59E0B" /> DH2 Drive
        </a>
      </div>
    </div>
  );
};

export default LandlordDirectMdBanner;
