import React from 'react';
import { Shield, Home, CheckCircle2, ChevronRight, X } from 'lucide-react';
import './RoleSelectorModal.css';

interface RoleSelectorModalProps {
  isOpen: boolean;
  onSelectRole: (role: 'managing_director' | 'leasing_agent') => void;
  currentRole?: string | null;
  onClose?: () => void;
}

export const RoleSelectorModal: React.FC<RoleSelectorModalProps> = ({
  isOpen,
  onSelectRole,
  currentRole,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="role-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="role-modal-title"
    >
      <div className="role-modal-container">
        {onClose && (
          <button
            type="button"
            className="role-modal-close-icon"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        )}
        <div className="role-modal-header">
          <div className="role-modal-badge">
            <Shield size={14} />
            <span>Dual Access Portal · Arslan Malik</span>
          </div>
          <h2 id="role-modal-title">Select Your Active Workspace</h2>
          <p className="role-modal-subtitle">
            Toggle instantly between corporate governance and frontline leasing cashflow execution.
          </p>
        </div>

        <div className="role-cards-grid">
          {/* Managing Director Option */}
          <div
            className={`role-option-card ${currentRole === 'managing_director' || currentRole === 'owner' || currentRole === 'lion' ? 'active' : ''}`}
            onClick={() => onSelectRole('managing_director')}
            role="button"
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectRole('managing_director');
              }
            }}
          >
            <div className="role-card-top">
              <div className="role-icon-box md-icon-box">
                <Shield size={26} />
              </div>
              <div className="role-status-indicator">
                <span>Executive Command</span>
              </div>
            </div>
            <div className="role-card-body">
              <h3>Managing Director Dashboard</h3>
              <p>
                Company-wide executive view: 12 Corporate Floors, 108 Managers, AICC-Sanctum, DLD
                compliance, and live P&L.
              </p>
              <ul className="role-features-list">
                <li>
                  <CheckCircle2 size={13} /> Full Corporate Governance & Organogram
                </li>
                <li>
                  <CheckCircle2 size={13} /> 121 Autonomous AI Agent Mesh (Zoe & 12 Directors)
                </li>
                <li>
                  <CheckCircle2 size={13} /> Company-wide Broker Rollup & Escrow Audits
                </li>
              </ul>
            </div>
            <div className="role-card-action">
              <span>Enter MD Suite</span>
              <ChevronRight size={16} />
            </div>
          </div>

          {/* Leasing Agent Option */}
          <div
            className={`role-option-card leasing-card ${currentRole === 'leasing_agent' || currentRole === 'leasing-agent' ? 'active' : ''}`}
            onClick={() => onSelectRole('leasing_agent')}
            role="button"
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectRole('leasing_agent');
              }
            }}
          >
            <div className="role-card-top">
              <div className="role-icon-box leasing-icon-box">
                <Home size={26} />
              </div>
              <div className="role-status-indicator revenue-indicator">
                <span>Direct Revenue & Deals</span>
              </div>
            </div>
            <div className="role-card-body">
              <h3>Leasing Agent Dashboard</h3>
              <p>
                Personal leasing pipeline, ~100 closed deals, DAMAC Hills 2 tenancy contracts,
                commission ledger, and WhatsApp CRM.
              </p>
              <ul className="role-features-list">
                <li>
                  <CheckCircle2 size={13} /> Henry Google Drive Tenancy Extraction & Original Files
                </li>
                <li>
                  <CheckCircle2 size={13} /> Linda WhatsApp Warm Follow-up & Renewal Engine
                </li>
                <li>
                  <CheckCircle2 size={13} /> Solo Broker 100% Commission & Cashflow Tracker
                </li>
              </ul>
            </div>
            <div className="role-card-action revenue-action">
              <span>Enter Leasing Desk</span>
              <ChevronRight size={16} />
            </div>
          </div>
        </div>

        {onClose && (
          <div className="role-modal-footer">
            <button type="button" className="role-modal-close-btn" onClick={onClose}>
              Dismiss for now (Keep current active session)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleSelectorModal;
