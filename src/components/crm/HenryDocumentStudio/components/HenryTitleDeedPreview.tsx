import React, { FC } from 'react';
import { Building, Copy, FileText, Home, RefreshCw, Sparkles } from 'lucide-react';
import { PreviewCanvasCard, ActionButton } from '../styles/HenryDocumentStudio.style';
import {
  PropertyLocationBox,
  AreaMeasurementsBox,
  RegisteredOwnershipBox,
  ConveyancingHistoryBox,
} from './HenryTitleDeedBoxes';

export interface HenryTitleDeedPreviewProps {
  titleDeedData: any;
  isScanning: boolean;
  handleScanTitleDeed: () => void;
  handleCreateCrmListing: () => void;
  handleAutoFillTenancyFromTitleDeed: () => void;
  handleAutoFillFormA: () => void;
  handleCopyTitleDeedJsonVariables: () => void;
}

export const HenryTitleDeedPreview: FC<HenryTitleDeedPreviewProps> = ({
  titleDeedData,
  isScanning,
  handleScanTitleDeed,
  handleCreateCrmListing,
  handleAutoFillTenancyFromTitleDeed,
  handleAutoFillFormA,
  handleCopyTitleDeedJsonVariables,
}) => {
  return (
    <PreviewCanvasCard style={{ padding: '24px', overflowY: 'auto' }}>
      {/* Title Deed Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid #EF4444',
          paddingBottom: '14px',
          marginBottom: '18px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                background: '#EF4444',
                color: 'white',
                padding: '3px 8px',
                borderRadius: '4px',
                fontSize: '11px',
                fontWeight: 800,
              }}
            >
              DLD TITLE DEED AI SCANNER
            </span>
            <span
              style={{ fontSize: '11px', color: 'var(--accent-green, #16A34A)', fontWeight: 800 }}
            >
              DEMO TITLE DEED — NOT OWNERSHIP VERIFICATION
            </span>
          </div>
          <h3
            style={{ margin: '6px 0 2px', color: 'var(--color-1e293b, #1E293B)', fontSize: '18px' }}
          >
            Dubai Land Department (DLD) Title Deed Ingestion Hub
          </h3>
          <p style={{ margin: 0, color: 'var(--text-secondary, #64748B)', fontSize: '12px' }}>
            Demo property fields only. Real extraction depends on visible labels and owner tables;
            missing values remain blank.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <ActionButton
            onClick={() => handleScanTitleDeed()}
            disabled={isScanning}
            title="Rescan DLD Title Deed Document"
          >
            <RefreshCw size={14} className={isScanning ? 'animate-spin' : ''} />
            {isScanning ? 'Scanning...' : 'Rescan Title Deed'}
          </ActionButton>
          <ActionButton
            $primary
            onClick={handleCopyTitleDeedJsonVariables}
            title="Export All 22 Variables as JSON"
          >
            <Copy size={14} /> Export Variables (JSON)
          </ActionButton>
        </div>
      </div>

      {/* Variable Distribution & 1-Click Platform Actions */}
      <div
        style={{
          backgroundColor: '#F8FAFC',
          border: '1px solid #E2E8F0',
          borderRadius: '8px',
          padding: '14px',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            fontSize: '12px',
            fontWeight: 800,
            color: '#1E293B',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Sparkles size={14} color="#EF4444" />
          <span>1-Click Variable Auto-Fill & Platform Distribution:</span>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <ActionButton onClick={handleAutoFillTenancyFromTitleDeed}>
            <Building size={14} color="#16A34A" /> Auto-Fill Tenancy Lease (Property & Landlord)
          </ActionButton>
          <ActionButton onClick={handleCreateCrmListing}>
            <Home size={14} color="#2563EB" /> Create CRM Property Inventory Listing
          </ActionButton>
          <ActionButton onClick={handleAutoFillFormA}>
            <FileText size={14} color="#D97706" /> Auto-Fill Form A Seller Mandate
          </ActionButton>
        </div>
      </div>

      {/* Extracted Fields Table (22 Attributes) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '16px',
          marginBottom: '20px',
        }}
      >
        <PropertyLocationBox titleDeedData={titleDeedData} />
        <AreaMeasurementsBox titleDeedData={titleDeedData} />
        <RegisteredOwnershipBox titleDeedData={titleDeedData} />
        <ConveyancingHistoryBox titleDeedData={titleDeedData} />
      </div>
    </PreviewCanvasCard>
  );
};
